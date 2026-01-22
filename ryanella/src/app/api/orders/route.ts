import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only";

const orderSchema = z.object({
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        size: z.string().optional(),
        color: z.string().optional(),
    })),
    shippingAddress: z.string(),
});

export async function POST(req: Request) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        const body = await req.json();
        const { items, shippingAddress } = orderSchema.parse(body);

        // 1. Validate Stock & Calculate Total
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product || product.stock < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for product: ${product?.name || item.productId}` },
                    { status: 400 }
                );
            }

            totalAmount += product.priceNGN * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.priceNGN,
                size: item.size,
                color: item.color,
            });
        }

        // 2. Create Order in Transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    shippingAddress,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: { items: true },
            });

            // Stock reduction normally happens after PAID status, 
            // but for "hold", we could do it here or via a reservation.
            // We'll follow the requirement: "Reduce stock after successful payment".

            return newOrder;
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// GET /api/orders/user - Get logged in user's orders
export async function GET(req: Request) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const orders = await prisma.order.findMany({
            where: { userId: decoded.id },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

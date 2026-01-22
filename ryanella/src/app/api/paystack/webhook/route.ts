import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const hash = crypto
            .createHmac("sha512", PAYSTACK_SECRET_KEY)
            .update(JSON.stringify(body))
            .digest("hex");

        // Verify Paystack Signature
        if (hash !== req.headers.get("x-paystack-signature")) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const event = body.event;

        if (event === "charge.success") {
            const { reference, metadata } = body.data;
            const orderId = metadata.orderId;

            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: { items: true },
            });

            if (order && order.paymentStatus !== "PAID") {
                await prisma.$transaction(async (tx) => {
                    // 1. Update order status
                    await tx.order.update({
                        where: { id: orderId },
                        data: { paymentStatus: "PAID" },
                    });

                    // 2. Reduce stock for each item
                    for (const item of order.items) {
                        await tx.product.update({
                            where: { id: item.productId },
                            data: { stock: { decrement: item.quantity } },
                        });
                    }
                });

                console.log(`Order ${orderId} confirmed and stock reduced.`);
            }
        }

        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error("Paystack Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

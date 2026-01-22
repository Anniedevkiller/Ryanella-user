import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    priceNGN: z.number().positive().optional(),
    priceUSD: z.number().optional(),
    categoryId: z.string().optional(),
    images: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    stock: z.number().int().nonnegative().optional(),
    isActive: z.boolean().optional(),
});

// GET /api/products/[id] - Public Detail
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
            include: { category: true },
        });

        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT /api/admin/products/[id] - Admin Update
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Middleware handles auth, but we could double check here
        const body = await req.json();
        const data = updateProductSchema.parse(body);

        const product = await prisma.product.update({
            where: { id: params.id },
            data,
        });

        return NextResponse.json(product);
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE /api/admin/products/[id] - Admin Delete
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.product.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

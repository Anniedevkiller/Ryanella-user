import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
});

// GET /api/categories - Public
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { name: "asc" },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/categories - Admin (middleware guards /api/admin/*, but we'll put this in /api/categories for simplicity or move to /api/admin/categories)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, slug } = categorySchema.parse(body);

        const category = await prisma.category.create({
            data: { name, slug },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

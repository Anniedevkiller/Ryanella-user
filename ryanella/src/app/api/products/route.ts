import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    priceNGN: z.number().positive(),
    priceUSD: z.number().optional(),
    categoryId: z.string(),
    images: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    stock: z.number().int().nonnegative(),
});

// GET /api/products - Public list/filter
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-low") orderBy = { priceNGN: "asc" };
    if (sort === "price-high") orderBy = { priceNGN: "desc" };

    try {
        const where: any = {};
        if (categorySlug) {
            where.category = { slug: categorySlug };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }

        const [products, total] = await Promise.all([
            await prisma.product.findMany({
                where,
                include: { category: true },
                orderBy,
                skip,
                take: limit,
            }),
            await prisma.product.count({ where }),
        ]);

        return NextResponse.json({
            products,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/admin/products - Create (Note: matched via middleware)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = productSchema.parse(body);

        const product = await prisma.product.create({
            data,
            include: { category: true },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

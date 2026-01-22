import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only";

const reviewSchema = z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
});

// GET /api/products/[id]/reviews - Public
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const reviews = await prisma.review.findMany({
            where: { productId: params.id },
            include: {
                user: {
                    select: { name: true }
                }
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/products/[id]/reviews - Auth User
export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const body = await req.json();
        const { rating, comment } = reviewSchema.parse(body);

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                productId: params.id,
                userId: decoded.id,
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only";

export async function GET(req: Request) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const wishlist = await prisma.wishlist.findUnique({
            where: { userId: decoded.id },
            include: { products: true },
        });

        return NextResponse.json(wishlist?.products || []);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const { productId } = await req.json();

        const wishlist = await prisma.wishlist.upsert({
            where: { userId: decoded.id },
            update: {},
            create: { userId: decoded.id },
        });

        const isWishlisted = await prisma.wishlist.findFirst({
            where: {
                id: wishlist.id,
                products: { some: { id: productId } },
            },
        });

        if (isWishlisted) {
            await prisma.wishlist.update({
                where: { id: wishlist.id },
                data: {
                    products: { disconnect: { id: productId } },
                },
            });
            return NextResponse.json({ message: "Removed from wishlist", status: "removed" });
        } else {
            await prisma.wishlist.update({
                where: { id: wishlist.id },
                data: {
                    products: { connect: { id: productId } },
                },
            });
            return NextResponse.json({ message: "Added to wishlist", status: "added" });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

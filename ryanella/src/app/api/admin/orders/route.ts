import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/orders - Admin oversight
export async function GET() {
    try {
        // Middleware handles the role check for /api/admin/*
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                },
                _count: {
                    select: { items: true }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

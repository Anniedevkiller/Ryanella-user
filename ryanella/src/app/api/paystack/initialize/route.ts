import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
    try {
        const { orderId, email } = await req.json();

        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: order.totalAmount * 100, // Paystack uses kobo
                metadata: {
                    orderId,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        await prisma.order.update({
            where: { id: orderId },
            data: { paystackRef: response.data.data.reference },
        });

        return NextResponse.json(response.data.data);
    } catch (error: any) {
        console.error("Paystack Init Error:", error.response?.data || error.message);
        return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
    }
}

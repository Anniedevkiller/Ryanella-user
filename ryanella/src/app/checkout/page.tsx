"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";
import { Separator } from "@/components/ui/separator";
import {
    CreditCard,
    Truck,
    ShieldCheck,
    ChevronRight,
    Loader2
} from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, subtotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const SHIPPING_FEE = 3500;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login?callbackUrl=/checkout");
        }
    }, [router]);

    const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const shippingAddress = `${formData.get("address")}, ${formData.get("city")}, ${formData.get("state")}`;
        const email = formData.get("email") as string;

        try {
            // 1. Create Order
            const orderRes = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // if user is logged in
                },
                body: JSON.stringify({
                    items: cart.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color
                    })),
                    shippingAddress
                }),
            });

            if (!orderRes.ok) throw new Error("Failed to create order");
            const order = await orderRes.json();

            // 2. Initialize Paystack
            const payRes = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: order.id,
                    email: email
                }),
            });

            if (!payRes.ok) throw new Error("Failed to initialize payment");
            const payData = await payRes.json();

            // Clear cart before redirect
            clearCart();

            // 3. Redirect to Paystack
            window.location.href = payData.authorization_url;

        } catch (error) {
            console.error("Order Error:", error);
            alert("Something went wrong while placing your order. Please check your network and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-serif uppercase tracking-widest mb-12 border-b border-border pb-8">
                        Securing pieces
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Checkout Form */}
                        <form onSubmit={handlePlaceOrder} className="space-y-12">
                            <section className="space-y-8">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                                    <Truck className="h-4 w-4" /> 01. Delivery Details
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest">First Name</Label>
                                        <Input id="firstName" name="firstName" required className="rounded-none border-slate-200 focus-visible:ring-luxury-black" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest">Last Name</Label>
                                        <Input id="lastName" name="lastName" required className="rounded-none border-slate-200 focus-visible:ring-luxury-black" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest">Email Address</Label>
                                    <Input id="email" name="email" type="email" required className="rounded-none border-slate-200 focus-visible:ring-luxury-black" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-widest">Shipping Address</Label>
                                    <Input id="address" name="address" required className="rounded-none border-slate-200 focus-visible:ring-luxury-black" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-[10px] font-bold uppercase tracking-widest">City</Label>
                                        <Input id="city" name="city" required className="rounded-none border-slate-200 focus-visible:ring-luxury-black" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state" className="text-[10px] font-bold uppercase tracking-widest">State / Region</Label>
                                        <Input id="state" name="state" required className="rounded-none border-slate-200 focus-visible:ring-luxury-black" />
                                    </div>
                                </div>
                            </section>

                            <Separator className="bg-border" />

                            <section className="space-y-8">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                                    <CreditCard className="h-4 w-4" /> 02. Payment Method
                                </div>
                                <div className="border border-luxury-black p-6 flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-zinc-100 rounded flex items-center justify-center p-1">
                                            <img src="https://checkout.paystack.com/static/media/paystack-logo.9f866465.svg" alt="Paystack" />
                                        </div>
                                        <span className="text-sm font-medium uppercase tracking-[0.2em]">Debit/Credit Card</span>
                                    </div>
                                    <div className="w-4 h-4 rounded-full border-2 border-luxury-black flex items-center justify-center p-0.5">
                                        <div className="w-full h-full rounded-full bg-luxury-black" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest italic">
                                    You will be redirected to Paystack's secure portal to complete your transaction.
                                </p>
                            </section>

                            <Button
                                type="submit"
                                disabled={loading || cart.length === 0}
                                className="w-full bg-luxury-black text-white py-8 rounded-none font-bold uppercase tracking-[0.2em] text-xs gap-3"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                                Confirm Order & Pay ₦{(subtotal + SHIPPING_FEE).toLocaleString()}
                            </Button>
                        </form>

                        {/* Order Summary Sidebar */}
                        <aside className="lg:sticky lg:top-32 bg-white border border-border p-8 lg:p-12 space-y-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-4">Bag Summary</h3>
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                                {cart.map((item: any) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-20 bg-cream border border-border shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-between py-1">
                                            <p className="text-xs font-bold uppercase tracking-wider line-clamp-1">{item.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                                                {item.size} / {item.color} / Qty {item.quantity}
                                            </p>
                                            <p className="text-xs font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-sm italic text-muted-foreground py-8 text-center">Your bag is empty.</p>
                                )}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border">
                                <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
                                    <span>Shipping</span>
                                    <span>₦{SHIPPING_FEE.toLocaleString()}</span>
                                </div>
                                <Separator className="bg-border" />
                                <div className="flex justify-between text-sm font-black uppercase tracking-[0.2em] text-luxury-black">
                                    <span>Total</span>
                                    <span>₦{(subtotal + SHIPPING_FEE).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-cream flex gap-4 items-center rounded-lg border border-slate-100">
                                <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
                                <p className="text-[10px] leading-relaxed uppercase tracking-widest text-slate-500">
                                    Secure transaction guaranteed. Your data is encrypted and never stored on our servers.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

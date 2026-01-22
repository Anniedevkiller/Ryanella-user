"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Registration failed");

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            router.push("/account");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <div className="pt-40 pb-24 px-6 flex items-center justify-center">
                <Card className="w-full max-w-lg rounded-none border-border shadow-2xl bg-white p-8">
                    <CardHeader className="text-center space-y-4 mb-8">
                        <CardTitle className="text-3xl font-serif uppercase tracking-widest">Join the Circle</CardTitle>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Begin your journey with Ryanella</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegister} className="space-y-6">
                            {error && (
                                <div className="bg-destructive/5 text-destructive text-[10px] uppercase font-bold tracking-widest p-4 text-center border border-destructive/10">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</Label>
                                    <Input id="name" name="name" placeholder="Ryanella Muse" required className="rounded-none border-slate-200 focus-visible:ring-gold py-6" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone (Optional)</Label>
                                    <Input id="phone" name="phone" placeholder="+234..." className="rounded-none border-slate-200 focus-visible:ring-gold py-6" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="muse@ryanella.com" required className="rounded-none border-slate-200 focus-visible:ring-gold py-6" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Create Password</Label>
                                <Input id="password" name="password" type="password" placeholder="••••••••" required className="rounded-none border-slate-200 focus-visible:ring-gold py-6" />
                            </div>

                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic text-center">
                                By creating an account, you agree to our Terms of Elegance and Privacy Policy. Enjoy exclusive access to new seasonal drops.
                            </p>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gold text-white py-8 rounded-none font-bold uppercase tracking-[0.2em] text-xs gap-3 hover:bg-zinc-800"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Establish Membership"}
                            </Button>

                            <div className="text-center pt-8 border-t border-slate-100">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Already a member?</p>
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxury-black hover:text-gold transition-colors"
                                >
                                    Sign in to your profile <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    );
}

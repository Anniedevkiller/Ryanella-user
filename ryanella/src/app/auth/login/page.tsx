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

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Login failed");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect based on role
            if (data.user.role === "ADMIN" || data.user.role === "SUPER_ADMIN") {
                router.push("/admin");
            } else {
                router.push("/account");
            }
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
                <Card className="w-full max-w-md rounded-none border-border shadow-2xl bg-white p-8">
                    <CardHeader className="text-center space-y-4 mb-8">
                        <CardTitle className="text-3xl font-serif uppercase tracking-widest">Sign In</CardTitle>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Welcome back to the Ryanella vault</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-8">
                            {error && (
                                <div className="bg-destructive/5 text-destructive text-[10px] uppercase font-bold tracking-widest p-4 text-center border border-destructive/10">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="muse@ryanella.com"
                                    required
                                    className="rounded-none border-slate-200 focus-visible:ring-gold py-6"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</Label>
                                    <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-gold underline underline-offset-4">Forgot?</button>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="rounded-none border-slate-200 focus-visible:ring-gold py-6"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-luxury-black text-white py-8 rounded-none font-bold uppercase tracking-[0.2em] text-xs gap-3 hover:bg-zinc-800"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enter the Boutique"}
                            </Button>

                            <div className="text-center pt-8 border-t border-slate-100">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">New to the family?</p>
                                <Link
                                    href="/auth/register"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-luxury-black transition-colors"
                                >
                                    Create your profile <ArrowRight className="h-3 w-3" />
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

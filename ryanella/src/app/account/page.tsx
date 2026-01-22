"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User,
    ShoppingBag,
    Heart,
    MapPin,
    LogOut,
    Package,
    ChevronRight,
    Clock,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

export default function AccountPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const [ordersRes, wishlistRes] = await Promise.all([
                    fetch("/api/orders/user", { headers: { "Authorization": `Bearer ${token}` } }),
                    fetch("/api/wishlist", { headers: { "Authorization": `Bearer ${token}` } })
                ]);

                const [ordersData, wishlistData] = await Promise.all([
                    ordersRes.json(),
                    wishlistRes.json()
                ]);

                setOrders(ordersData);
                setWishlist(wishlistData);
            } catch (error) {
                console.error("Account data error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-border pb-12">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-4">Membership</h1>
                            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] font-bold">Account Dashboard</p>
                        </div>
                        <Button onClick={handleSignOut} variant="outline" className="rounded-none border-destructive text-destructive hover:bg-destructive/5 text-xs font-bold uppercase tracking-widest gap-2">
                            <LogOut className="h-4 w-4" /> Sign Out
                        </Button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16">
                        <Tabs defaultValue="history" className="w-full flex flex-col lg:flex-row gap-16">
                            <TabsList className="flex flex-col h-auto w-full lg:w-64 bg-transparent p-0 space-y-2 shrink-0">
                                {[
                                    { id: "profile", label: "Profile Details", icon: User },
                                    { id: "history", label: "Order History", icon: ShoppingBag },
                                    { id: "wishlist", label: "My Wishlist", icon: Heart },
                                    { id: "addresses", label: "Saved Addresses", icon: MapPin },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="w-full justify-start gap-4 px-6 py-4 rounded-none border border-border data-[state=active]:border-luxury-black data-[state=active]:bg-white data-[state=active]:text-luxury-black transition-all text-muted-foreground font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="flex-grow">
                                <TabsContent value="history" className="mt-0 outline-none">
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold uppercase tracking-widest">Past Purchases</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{orders.length} orders found</p>
                                        </div>

                                        {loading ? (
                                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                                <Loader2 className="h-8 w-8 animate-spin text-gold" />
                                                <p className="text-xs uppercase tracking-widest text-slate-400">Retrieving order vault...</p>
                                            </div>
                                        ) : orders.length === 0 ? (
                                            <div className="border border-dashed border-border p-24 text-center rounded-lg bg-white/50">
                                                <ShoppingBag className="h-12 w-12 text-slate-200 mx-auto mb-6" />
                                                <p className="text-sm italic text-muted-foreground mb-8">You haven't added any pieces to your history yet.</p>
                                                <Button asChild className="bg-luxury-black text-white rounded-none uppercase tracking-widest text-xs px-12">
                                                    <a href="/category/all">Explore Collection</a>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {orders.map((order) => (
                                                    <div key={order.id} className="bg-white border border-border p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center group hover:border-gold transition-colors">
                                                        <div className="p-4 bg-cream rounded-full">
                                                            <Package className="h-6 w-6 text-luxury-black" />
                                                        </div>
                                                        <div className="flex-grow space-y-2">
                                                            <div className="flex flex-wrap items-center gap-4">
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order #{order.id.slice(-6).toUpperCase()}</span>
                                                                <Badge variant="outline" className={cn(
                                                                    "rounded-none text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1",
                                                                    order.paymentStatus === "PAID" ? "bg-green-50 text-green-700 border-green-200" : "bg-zinc-50 text-zinc-500"
                                                                )}>
                                                                    {order.paymentStatus}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm font-bold uppercase tracking-widest">₦{order.totalAmount.toLocaleString()}</p>
                                                            <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                                                                <Clock className="h-3 w-3" />
                                                                {new Date(order.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 shrink-0">
                                                            <div className="flex -space-x-4">
                                                                {order.items.map((item: any, idx: number) => (
                                                                    <div key={idx} className="w-12 h-16 border-2 border-white rounded overflow-hidden relative shadow-sm">
                                                                        <img src={item.product?.images[0]} alt="preview" className="w-full h-full object-cover" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="wishlist" className="mt-0 outline-none">
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold uppercase tracking-widest">My Saved Pieces</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{wishlist.length} items</p>
                                        </div>

                                        {loading ? (
                                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                                <Loader2 className="h-8 w-8 animate-spin text-gold" />
                                            </div>
                                        ) : wishlist.length === 0 ? (
                                            <div className="border border-dashed border-border p-24 text-center rounded-lg bg-white/50">
                                                <Heart className="h-12 w-12 text-slate-200 mx-auto mb-6" />
                                                <p className="text-sm italic text-muted-foreground mb-8">Your wishlist is waiting to be curated.</p>
                                                <Button asChild className="bg-luxury-black text-white rounded-none uppercase tracking-widest text-xs px-12">
                                                    <a href="/category/all">Start Curating</a>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {wishlist.map((product) => (
                                                    <ProductCard
                                                        key={product.id}
                                                        id={product.id}
                                                        name={product.name}
                                                        price={product.priceNGN}
                                                        priceUSD={product.priceUSD || 0}
                                                        image={product.images[0]}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="profile" className="mt-0 outline-none">
                                    <div className="max-w-xl space-y-12">
                                        <h3 className="text-sm font-bold uppercase tracking-widest">Your Private Profile</h3>
                                        <div className="space-y-6 bg-white border border-border p-12">
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</span>
                                                <p className="text-sm font-bold border-b border-cream pb-4">Ryanella Muse</p>
                                            </div>
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</span>
                                                <p className="text-sm font-bold border-b border-cream pb-4">muse@ryanella.com</p>
                                            </div>
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tier Status</span>
                                                <p className="text-sm font-bold text-gold">Diamond Collector</p>
                                            </div>
                                            <Button className="w-full bg-luxury-black text-white rounded-none uppercase tracking-widest text-xs py-6 mt-8">
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

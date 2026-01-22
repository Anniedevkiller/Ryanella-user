"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
    const { slug } = useParams();
    const [useUSD, setUseUSD] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [products, setProducts] = useState<any[]>([]);
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = `/api/products?category=${slug === "all" ? "" : slug}&sort=${sortBy}`;
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data.products || []);

                // Mock category info if not returned
                setCategory({ name: slug === "all" ? "Full Collection" : slug.toString() });
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, sortBy]);

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <div className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-border pb-12">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-4">
                                {category?.name || "Collection"}
                            </h1>
                            <p className="text-muted-foreground">
                                {loading ? "Discovering..." : `Displaying ${products.length} exquisite pieces`}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setUseUSD(!useUSD)}
                                className="rounded-none border-luxury-black text-xs font-bold uppercase tracking-widest"
                            >
                                {useUSD ? "Showing USD" : "Showing NGN"}
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-none border-luxury-black text-xs font-bold uppercase tracking-widest gap-2">
                                        Sort By: {sortBy} <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-none">
                                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy("popularity")}>Popularity</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <div className="sticky top-24 space-y-12">
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Filter by Size</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                            <button
                                                key={size}
                                                className="w-10 h-10 border border-border text-xs flex items-center justify-center hover:border-luxury-black transition-colors"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Price Range</h3>
                                    <div className="space-y-4">
                                        <input type="range" className="w-full accent-gold" min="0" max="200000" />
                                        <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
                                            <span>₦0</span>
                                            <span>₦200,000+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-grow">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                                    <p className="text-sm font-serif uppercase tracking-widest italic animate-pulse">Curating your experience...</p>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-24">
                                    <p className="text-muted-foreground italic">No products found in this collection.</p>
                                    <Button asChild variant="link" className="mt-4 uppercase tracking-[0.2em] text-xs font-bold text-luxury-black">
                                        <Link href="/category/all">View All Collections</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.priceNGN}
                                            priceUSD={product.priceUSD || 0}
                                            image={product.images[0] || "/hero-banner.png"}
                                            useUSD={useUSD}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}


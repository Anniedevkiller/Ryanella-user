"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    priceUSD: number;
    image: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    useUSD?: boolean;
}

export function ProductCard({
    id,
    name,
    price,
    priceUSD,
    image,
    isNew,
    isBestSeller,
    useUSD = false,
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // In a real app, we'd probably have an IsWishlisted flag on the product model 
        // returned by the API, but for now we check local storage or fetch.
    }, [id]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId: id }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsWishlisted(data.status === "added");
            }
        } catch (error) {
            console.error("Wishlist error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {isNew && (
                        <Badge className="bg-gold text-white border-none rounded-none text-[10px] uppercase px-3 py-1">
                            New
                        </Badge>
                    )}
                    {isBestSeller && (
                        <Badge className="bg-luxury-black text-white border-none rounded-none text-[10px] uppercase px-3 py-1">
                            Best Seller
                        </Badge>
                    )}
                </div>

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleWishlist}
                    disabled={loading}
                    className={cn(
                        "absolute top-4 right-4 z-10 rounded-full bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white",
                        isWishlisted ? "text-destructive opacity-100" : "text-luxury-black"
                    )}
                >
                    <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                </Button>

                {/* Product Image */}
                <Link href={`/product/${id}`}>
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Hover Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent">
                    <Button
                        className="w-full bg-white text-luxury-black hover:bg-accent hover:text-white transition-colors rounded-none font-bold uppercase text-xs tracking-widest gap-2"
                    >
                        <ShoppingBag className="h-4 w-4" /> Add to Cart
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <Link
                    href={`/product/${id}`}
                    className="text-sm font-medium hover:text-accent transition-colors truncate"
                >
                    {name}
                </Link>
                <p className="text-sm font-bold">
                    {useUSD ? `$${priceUSD}` : `₦${price.toLocaleString()}`}
                </p>
            </div>
        </motion.div>
    );
}

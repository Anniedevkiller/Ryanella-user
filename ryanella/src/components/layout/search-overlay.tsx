"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col pt-32 px-6 lg:px-12"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 lg:top-12 lg:right-12 p-3 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="max-w-4xl mx-auto w-full">
                        <div className="relative mb-16">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-luxury-black/20" />
                            <Input
                                autoFocus
                                placeholder="Find your next piece..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus-visible:ring-0 focus-visible:border-luxury-black text-2xl lg:text-5xl font-serif py-12 pl-12 rounded-none placeholder:text-slate-200"
                            />
                            {loading && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-6 w-6 animate-spin text-gold" />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Search Results</h3>
                                <div className="space-y-6">
                                    {results.slice(0, 5).map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            onClick={onClose}
                                            className="flex items-center gap-6 group"
                                        >
                                            <div className="relative w-16 h-20 bg-slate-100 overflow-hidden">
                                                <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="flex-grow border-b border-border pb-4">
                                                <p className="font-serif text-lg group-hover:text-gold transition-colors">{product.name}</p>
                                                <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category?.name}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                                        </Link>
                                    ))}
                                    {query && results.length === 0 && !loading && (
                                        <p className="text-sm italic text-muted-foreground">No pieces match your request. Broaden your horizons.</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-8 hidden md:block">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Popular Categories</h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Silk", "Accessories", "Jewelry", "Linen", "Bridal", "Essentials"].map((cat) => (
                                        <Link
                                            key={cat}
                                            href={`/category/${cat.toLowerCase()}`}
                                            onClick={onClose}
                                            className="px-6 py-3 border border-border hover:border-luxury-black transition-colors text-xs font-bold uppercase tracking-widest"
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>

                                <div className="pt-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Curated Collection</p>
                                    <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                                        <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" alt="Curated" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <span className="text-white font-serif uppercase tracking-[0.5em] text-sm">Summer 26</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

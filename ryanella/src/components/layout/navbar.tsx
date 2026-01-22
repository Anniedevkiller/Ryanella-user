"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/lib/constants";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = CATEGORIES.map(cat => ({
        name: cat.name,
        href: `/category/${cat.slug}`,
        ...cat
    }));

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Promo Ticker */}
            <div className="bg-primary text-primary-foreground py-2 px-4 text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap text-center">
                <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="inline-block"
                >
                    Free International Shipping on Orders Over ₦200,000 • New Collection Just Landed • Join the Circle for 10% Off
                </motion.div>
            </div>

            <nav
                className={cn(
                    "transition-all duration-500 px-6 lg:px-12 flex items-center justify-between relative",
                    isScrolled
                        ? "bg-background/90 backdrop-blur-xl border-b border-border py-4"
                        : "bg-transparent py-6"
                )}
                onMouseLeave={() => setHoveredCategory(null)}
            >
                {/* Mobile Trigger */}
                <div className="flex lg:hidden flex-1">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full sm:w-[400px]">
                            <SheetHeader className="mb-8 text-left">
                                <SheetTitle className="text-3xl font-serif uppercase tracking-tighter italic font-bold">
                                    Ryanella
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-2xl font-serif hover:italic transition-all border-b border-border pb-4"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Menu Left */}
                <div className="hidden lg:flex flex-1 items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-[11px] font-bold tracking-[0.15em] uppercase h-full flex items-center gap-1 group transition-colors relative pb-1",
                                pathname === link.href ? "text-accent" : "hover:text-accent"
                            )}
                            onMouseEnter={() => setHoveredCategory(link.name)}
                        >
                            {link.name}
                            <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", hoveredCategory === link.name ? "rotate-180" : "")} />
                            {pathname === link.href && (
                                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl lg:text-4xl font-serif tracking-[-0.05em] uppercase font-black italic hover:not-italic transition-all duration-700 mx-auto lg:mx-0"
                >
                    Ryanella
                </Link>

                {/* Desktop Right / Icons */}
                <div className="flex-1 flex justify-end items-center gap-1 sm:gap-4">
                    <Button variant="ghost" size="icon" className="hover:bg-transparent" onClick={() => setIsSearchOpen(true)}>
                        <Search className="h-5 w-5" />
                    </Button>
                    <Link href={isLoggedIn ? "/account" : "/auth/login"} className="hidden lg:flex">
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>
                    <CartDrawer />
                </div>

                {/* Mega Menu Overlay */}
                <AnimatePresence>
                    {hoveredCategory && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] hidden lg:block overflow-hidden"
                            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-12 gap-16">
                                {/* Categories Section */}
                                <div className="col-span-3 space-y-8 border-r border-slate-100 pr-16">
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">Collections</h3>
                                        <div className="flex flex-col gap-4">
                                            {navLinks.find(c => c.name === hoveredCategory)?.subcategories?.map((sub, i) => (
                                                <motion.div
                                                    key={sub}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                >
                                                    <Link
                                                        href={`/category/${navLinks.find(c => c.name === hoveredCategory)?.slug}`}
                                                        className="text-xl font-serif hover:italic hover:translate-x-2 transition-all duration-300 block group flex items-center gap-2"
                                                    >
                                                        {sub}
                                                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                    <Button variant="link" className="p-0 h-auto gap-3 uppercase text-[10px] font-bold tracking-[0.3em] text-primary group">
                                        View Entire Collection <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                {/* Visual Section */}
                                <div className="col-span-9 grid grid-cols-2 gap-12">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative aspect-[16/10] overflow-hidden group cursor-pointer"
                                    >
                                        <img
                                            src={navLinks.find(c => c.name === hoveredCategory)?.featuredImage || "/images/ui/women_teaser.png"}
                                            alt={hoveredCategory}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute bottom-8 left-8">
                                            <h4 className="text-white text-4xl font-serif italic uppercase tracking-tighter font-bold drop-shadow-2xl">
                                                {hoveredCategory} <br /> Essentials
                                            </h4>
                                        </div>
                                    </motion.div>

                                    <div className="flex flex-col justify-between py-2">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-px w-8 bg-gold" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">The Seasonal Edit</span>
                                            </div>
                                            <p className="text-2xl font-serif italic leading-relaxed text-luxury-black max-w-sm">
                                                "{navLinks.find(c => c.name === hoveredCategory)?.description || "Timeless pieces designed for the modern muse, blending contemporary luxury with classic sophistication."}"
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                                            <div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Artisanship</span>
                                                <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider">Each piece is handcrafted with precision and soul.</p>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Shipping</span>
                                                <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider">Concierge white-glove delivery on all global orders.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
}

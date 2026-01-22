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
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl hidden lg:block overflow-hidden"
                        >
                            <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-4 gap-12">
                                <div className="col-span-1 space-y-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Shop Categories</h3>
                                    <div className="flex flex-col gap-3">
                                        {navLinks.find(c => c.name === hoveredCategory)?.subcategories?.map(sub => (
                                            <Link key={sub} href={`/category/${navLinks.find(c => c.name === hoveredCategory)?.slug}`} className="text-lg font-serif hover:italic hover:translate-x-2 transition-all">
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                    <Button variant="link" className="p-0 h-auto gap-2 uppercase text-[10px] font-bold tracking-widest">
                                        View All {hoveredCategory} <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="col-span-3 grid grid-cols-2 gap-6">
                                    <div className="relative aspect-[16/9] overflow-hidden group cursor-pointer">
                                        <img
                                            src={navLinks.find(c => c.name === hoveredCategory)?.featuredImage || "/images/ui/women_teaser.png"}
                                            alt={hoveredCategory}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                            <h4 className="text-white text-3xl font-serif italic uppercase tracking-tighter font-bold drop-shadow-lg">
                                                {hoveredCategory} Collection
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="bg-secondary p-8 flex flex-col justify-center gap-4">
                                        <p className="text-sm italic font-serif leading-loose">
                                            "{navLinks.find(c => c.name === hoveredCategory)?.description}"
                                        </p>
                                        <div className="border-l-2 border-primary pl-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">Editor's Pick</span>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">The Seasonal Muse Selection</p>
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

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
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

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Women", href: "/category/women" },
        { name: "Men", href: "/category/men" },
        { name: "Accessories", href: "/category/accessories" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 py-4 flex items-center justify-between",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
                    : "bg-transparent text-foreground"
            )}
        >
            {/* Mobile Menu */}
            <div className="flex items-center lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-inherit">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] bg-background">
                        <SheetHeader className="mb-8 text-left">
                            <SheetTitle className="text-2xl font-serif tracking-widest uppercase">
                                Ryanella
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-lg font-medium transition-colors hover:text-accent uppercase tracking-wider",
                                        pathname === link.href ? "text-accent" : "text-foreground"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
                            <Button variant="outline" className="justify-start gap-2 rounded-none border-luxury-black">
                                <User className="h-4 w-4" /> Account
                            </Button>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">© 2026 Ryanella Boutique</p>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Links Left */}
            <div className="hidden lg:flex items-center gap-8">
                {navLinks.slice(1, 3).map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:text-accent",
                            pathname === link.href ? "text-accent" : (isScrolled ? "text-foreground" : "text-foreground")
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Logo */}
            <Link
                href="/"
                className="text-2xl lg:text-3xl font-serif tracking-[0.2em] uppercase font-bold text-foreground"
            >
                Ryanella
            </Link>

            {/* Desktop Links Right + Icons */}
            <div className="flex items-center gap-2 lg:gap-6">
                <div className="hidden lg:flex items-center gap-8 mr-4">
                    {navLinks.slice(3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:text-accent",
                                pathname === link.href ? "text-accent" : (isScrolled ? "text-foreground" : "text-foreground")
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <Button variant="ghost" size="icon" className="hover:text-accent" onClick={() => setIsSearchOpen(true)}>
                    <Search className="h-5 w-5" />
                </Button>
                <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                <Button variant="ghost" size="icon" className="hover:text-accent hidden sm:flex" asChild>
                    <Link href={isLoggedIn ? "/account" : "/auth/login"}>
                        <User className="h-5 w-5" />
                    </Link>
                </Button>
                <CartDrawer />
            </div>
        </nav>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Redefining Elegance",
        subtitle: "Est. 2026",
        italic: "Elegance",
        image: "/hero-banner.png",
        cta: "Shop Women",
        link: "/category/women"
    },
    {
        id: 2,
        title: "Modern Muse",
        subtitle: "The New Collection",
        italic: "Collection",
        image: "/images/ui/women_teaser.png",
        cta: "Explore Now",
        link: "/category/new-arrivals"
    },
    {
        id: 3,
        title: "Timeless Jewelry",
        subtitle: "Handcrafted Pieces",
        italic: "Jewelry",
        image: "/hero-banner.png", // Reusing for placeholder, ideally unique
        cta: "Shop Jewelry",
        link: "/category/jewelry"
    }
];

export function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-luxury-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover object-center scale-105 animate-slow-zoom"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30 lg:bg-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-cream text-[10px] lg:text-xs font-bold tracking-[0.5em] uppercase mb-6 block">
                            {slides[current].subtitle}
                        </span>
                        <h1 className="text-cream text-4xl md:text-7xl lg:text-8xl font-serif mb-12 tracking-tight leading-tight">
                            {slides[current].title.split(slides[current].italic)[0]}
                            <span className="italic">{slides[current].italic}</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button
                                asChild
                                size="lg"
                                className="bg-cream text-luxury-black hover:bg-gold hover:text-white transition-all duration-500 px-12 py-8 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none min-w-[220px]"
                            >
                                <Link href={slides[current].link}>{slides[current].cta}</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="bg-transparent border-cream text-cream hover:bg-white/10 transition-all duration-500 px-12 py-8 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none min-w-[220px]"
                            >
                                <Link href="/category/all">View All</Link>
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute inset-x-6 lg:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={prev}
                    className="h-12 w-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 pointer-events-auto hidden md:flex"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={next}
                    className="h-12 w-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 pointer-events-auto hidden md:flex"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={cn(
                            "h-1.5 transition-all duration-500 rounded-full",
                            current === idx ? "w-8 bg-cream" : "w-1.5 bg-cream/40"
                        )}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 right-12 z-10 hidden lg:block">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] text-cream/50 font-bold uppercase tracking-[0.3em] rotate-90 origin-right translate-y-12 mb-12">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-16 bg-gradient-to-b from-cream/80 to-transparent"
                    />
                </div>
            </div>
        </section>
    );
}

import { cn } from "@/lib/utils";

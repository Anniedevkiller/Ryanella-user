"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-banner.png"
                    alt="Ryanella High Fashion"
                    fill
                    className="object-cover object-center scale-105 animate-slow-zoom"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-cream text-xs lg:text-sm font-bold tracking-[0.4em] uppercase mb-4 block">
                        Est. 2026
                    </span>
                    <h1 className="text-cream text-5xl md:text-7xl lg:text-8xl font-serif mb-8 tracking-wider">
                        Redefining <br /> <span className="italic">Elegance</span>
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-cream text-luxury-black hover:bg-gold hover:text-white transition-all duration-300 px-10 py-7 text-xs font-bold uppercase tracking-widest rounded-none"
                        >
                            <Link href="/category/women">Shop Women</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="bg-transparent border-cream text-cream hover:bg-white/10 transition-all duration-300 px-10 py-7 text-xs font-bold uppercase tracking-widest rounded-none"
                        >
                            <Link href="/category/men">Shop Men</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-cream/50 mx-auto"
                />
            </div>
        </section>
    );
}

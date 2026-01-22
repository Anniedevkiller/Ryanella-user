"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function FeaturedCollections() {
    const mainCollections = CATEGORIES.slice(0, 3);

    return (
        <section className="py-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-serif leading-[0.8] uppercase tracking-tighter mb-4 italic">
                            The Muse <br /> <span className="not-italic font-black">Selection</span>
                        </h2>
                        <p className="text-muted-foreground uppercase text-[10px] tracking-[0.4em]">Curated Minimalism © 2026</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Main Featured */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:h-[600px] group overflow-hidden bg-secondary"
                    >
                        <img
                            src={mainCollections[0].featuredImage}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            alt={mainCollections[0].name}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start gap-4 text-white">
                            <h3 className="text-4xl md:text-6xl font-serif italic uppercase font-bold leading-tight">
                                {mainCollections[0].name} <br /> Essentials
                            </h3>
                            <Link
                                href={`/category/${mainCollections[0].slug}`}
                                className="bg-white text-luxury-black px-8 py-4 uppercase text-[10px] font-black tracking-widest hover:bg-gold hover:text-white transition-all flex items-center gap-2"
                            >
                                Shop Collection <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Secondary Grid */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        {mainCollections.slice(1).map((cat, i) => (
                            <motion.div
                                key={cat.slug}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative flex-1 group overflow-hidden bg-secondary min-h-[250px]"
                            >
                                <img
                                    src={cat.featuredImage}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt={cat.name}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-serif uppercase tracking-tighter mb-2 italic">{cat.name}</h3>
                                    <Link
                                        href={`/category/${cat.slug}`}
                                        className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white max-w-fit pb-1 hover:text-gold hover:border-gold transition-colors"
                                    >
                                        Explore
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

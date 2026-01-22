"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

export function FeaturedCollections() {
    return (
        <section className="py-24 px-6 lg:px-12 bg-cream">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif mb-4">The Collections</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Discover our curated series of luxury apparel designed for the modern individual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative aspect-[4/5] overflow-hidden group"
                        >
                            {/* placeholder for category image */}
                            <div className="absolute inset-0 bg-secondary group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                                <span className="text-muted-foreground/30 font-serif text-8xl uppercase opacity-20 rotate-[-45deg]">
                                    {category.name}
                                </span>
                            </div>

                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <h3 className="text-3xl font-serif mb-4 tracking-widest uppercase">{category.name}</h3>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-gold hover:border-gold transition-colors"
                                >
                                    Explore Collection
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

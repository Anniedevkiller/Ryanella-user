"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { motion } from "framer-motion";

export function CategoryQuickNav() {
    return (
        <section className="py-12 px-6 lg:px-12 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="max-w-7xl mx-auto flex justify-start md:justify-center items-center gap-6 md:gap-12 min-w-max">
                {CATEGORIES.map((cat, i) => (
                    <motion.div
                        key={cat.slug}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <Link href={`/category/${cat.slug}`} className="flex flex-col items-center gap-3 group">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-300 p-0.5">
                                <div className="w-full h-full rounded-full overflow-hidden bg-secondary">
                                    <img
                                        src={cat.featuredImage || "/hero-banner.png"}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

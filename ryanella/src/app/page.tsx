"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedCollections } from "@/components/sections/featured-collections";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?limit=8");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <FeaturedCollections />

      {/* New Arrivals Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-4">New Arrivals</h2>
              <p className="text-muted-foreground">The latest pieces from our seasonal collection.</p>
            </div>
            <Button variant="link" asChild className="text-luxury-black font-bold uppercase tracking-widest text-xs p-0 h-auto border-b border-luxury-black rounded-none">
              <Link href="/category/all">View All Products</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-secondary animate-pulse" />
                  <div className="h-4 w-3/4 bg-secondary animate-pulse" />
                  <div className="h-4 w-1/2 bg-secondary animate-pulse" />
                </div>
              ))
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground italic">
                Our latest collection is arriving soon. Stay tuned.
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.priceNGN}
                  priceUSD={product.priceUSD || 0}
                  image={product.images[0] || "/hero-banner.png"}
                  isNew={product.isActive} // placeholder
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-serif text-xl uppercase tracking-wider">Premium Quality</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We source the finest materials from around the world to ensure durability and comfort.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-serif text-xl uppercase tracking-wider">Sustainable Luxury</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our production processes prioritize ethics and environmental consciousness.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-serif text-xl uppercase tracking-wider">Global Delivery</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Serving our muses across Nigeria and internationally with reliable door-to-door shipping.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

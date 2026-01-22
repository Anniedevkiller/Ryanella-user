"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { ShoppingBag, Heart, Share2, Loader2, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, reviewsRes] = await Promise.all([
                    fetch(`/api/products/${id}`),
                    fetch(`/api/products/${id}/reviews`)
                ]);

                if (!productRes.ok) throw new Error("Product not found");

                const [productData, reviewsData] = await Promise.all([
                    productRes.json(),
                    reviewsRes.json()
                ]);

                setProduct(productData);
                setReviews(reviewsData);
                if (productData.colors?.length > 0) setSelectedColor(productData.colors[0]);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <Loader2 className="h-12 w-12 animate-spin text-gold" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6">
                <h1 className="text-2xl font-serif mb-4 uppercase tracking-widest">Piece Not Found</h1>
                <Button asChild variant="link" className="text-luxury-black font-bold uppercase tracking-widest">
                    <a href="/category/all">Explore the collection</a>
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-12">
                        <a href="/">Home</a>
                        <ChevronRight className="h-3 w-3" />
                        <a href={`/category/${product.category?.slug}`}>{product.category?.name}</a>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-luxury-black">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <div className="relative aspect-[3/4] bg-white overflow-hidden group">
                                <Image
                                    src={product.images[selectedImage] || "/hero-banner.png"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={cn(
                                            "relative aspect-[3/4] bg-white overflow-hidden border-b-2 transition-all",
                                            selectedImage === idx ? "border-gold" : "border-transparent opacity-60"
                                        )}
                                    >
                                        <img src={img} alt={`${product.name} shadow ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-8 border-b border-border pb-8">
                                <h1 className="text-3xl md:text-5xl font-serif mb-4 uppercase tracking-tighter leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-light text-luxury-black">
                                    ₦{product.priceNGN.toLocaleString()}
                                </p>
                            </div>

                            {/* Selectors */}
                            <div className="space-y-12 mb-12">
                                {/* Colors */}
                                {product.colors && product.colors.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Color: {selectedColor}</h3>
                                        <div className="flex gap-4">
                                            {product.colors.map((color: string) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={cn(
                                                        "w-8 h-8 rounded-full border transition-all p-1",
                                                        selectedColor === color ? "border-luxury-black scale-110" : "border-transparent"
                                                    )}
                                                >
                                                    <div className="w-full h-full rounded-full border border-black/10" style={{ backgroundColor: color.toLowerCase() }} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Sizes */}
                                {product.sizes && product.sizes.length > 0 && (
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <h3 className="text-xs font-bold uppercase tracking-widest">Select Size</h3>
                                            <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4">Size Guide</button>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {product.sizes.map((size: string) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={cn(
                                                        "py-4 border text-xs font-bold uppercase transition-all tracking-widest",
                                                        selectedSize === size
                                                            ? "bg-luxury-black text-white border-luxury-black"
                                                            : "border-slate-200 hover:border-luxury-black text-slate-500"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mb-12">
                                <Button
                                    onClick={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.priceNGN,
                                        image: product.images[0],
                                        size: selectedSize || "M",
                                        color: selectedColor,
                                        quantity: 1
                                    })}
                                    className="w-full bg-luxury-black text-white py-8 rounded-none font-bold uppercase tracking-widest text-xs gap-3 hover:bg-zinc-800"
                                >
                                    <ShoppingBag className="h-4 w-4" /> Add to Shopping Bag
                                </Button>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-grow rounded-none border-slate-200 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
                                        <Heart className="h-3 w-3" /> Wishlist
                                    </Button>
                                    <Button variant="outline" className="flex-grow rounded-none border-slate-200 py-6 uppercase tracking-widest text-[10px] font-bold gap-2">
                                        <Share2 className="h-3 w-3" /> Share
                                    </Button>
                                </div>
                            </div>

                            {/* Info Accordion */}
                            <Accordion type="single" collapsible className="w-full border-t border-border">
                                <AccordionItem value="details" className="border-b border-border">
                                    <AccordionTrigger className="uppercase tracking-[0.2em] text-[10px] font-bold py-6 hover:no-underline">
                                        Product Details
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm leading-relaxed text-slate-600 font-light prose prose-sm max-w-none pb-8">
                                        {product.description}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="shipping" className="border-b border-border">
                                    <AccordionTrigger className="uppercase tracking-[0.2em] text-[10px] font-bold py-6 hover:no-underline">
                                        Shipping & Returns
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm leading-relaxed text-slate-600 font-light pb-8">
                                        <p className="mb-4">Complimentary shipping on orders over ₦250,000.</p>
                                        <p className="mb-4">Delivery between: 2 - 5 business days for Lagos, 5 - 10 business days for other locations.</p>
                                        <p>Free returns within 14 days for all unworn pieces in original packaging.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <section className="mt-32 border-t border-border pt-24">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                            <div>
                                <h2 className="text-3xl font-serif uppercase tracking-widest mb-4">Customer Musings</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-gold">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest">4.9 Average Rating</span>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-none border-luxury-black text-[10px] font-bold uppercase tracking-widest py-6 px-12">
                                Write a Review
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {reviews.length === 0 ? (
                                <p className="col-span-full text-center py-12 italic text-muted-foreground">Be the first to share your experience with this piece.</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="space-y-4">
                                        <div className="flex text-gold">
                                            {Array(review.rating).fill(0).map((_, i) => (
                                                <Star key={i} className="h-3 w-3 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-600 italic">"{review.comment}"</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{review.user.name}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}

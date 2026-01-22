"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // In a real app, fetch from /api/categories
        setCategories([
            { id: "1", name: "Women" },
            { id: "2", name: "Men" },
            { id: "3", name: "Accessories" },
        ]);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            priceNGN: parseFloat(formData.get("priceNGN") as string),
            priceUSD: parseFloat(formData.get("priceUSD") as string),
            categoryId: formData.get("categoryId"),
            stock: parseInt(formData.get("stock") as string),
            images: images,
            sizes: ["S", "M", "L", "XL"], // placeholder
            colors: ["Black", "White"], // placeholder
        };

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/products");
            }
        } catch (error) {
            console.error("Failed to create product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Mock image upload logic
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-luxury-black mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-luxury-black">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="rounded-xl border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Silk Evening Gown" required className="rounded-lg border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Tell the story of this piece..."
                                    className="min-h-[150px] rounded-lg border-slate-200"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-xl border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden group">
                                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <label className="aspect-[3/4] border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                                    <Upload className="h-6 w-6 text-slate-400 mb-2" />
                                    <span className="text-xs text-slate-500 font-medium">Add Image</span>
                                    <input type="file" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="rounded-xl border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Pricing & Inventory</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="priceNGN">Price (NGN)</Label>
                                <Input id="priceNGN" name="priceNGN" type="number" placeholder="85000" required className="rounded-lg border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priceUSD">Price (USD - Optional)</Label>
                                <Input id="priceUSD" name="priceUSD" type="number" placeholder="110" className="rounded-lg border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Inventory Stock</Label>
                                <Input id="stock" name="stock" type="number" placeholder="20" required className="rounded-lg border-slate-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-xl border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="categoryId">Category</Label>
                                <Select name="categoryId" required>
                                    <SelectTrigger className="rounded-lg border-slate-200">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-luxury-black text-white py-6 rounded-none font-bold uppercase tracking-widest text-xs">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Create Product
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </AdminLayout>
    );
}

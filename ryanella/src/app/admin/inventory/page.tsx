"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
    Search,
    MoreHorizontal,
    Edit,
    AlertTriangle,
    Package,
    ArrowUpRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminInventoryPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await fetch("/api/products?limit=100");
                const data = await res.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Failed to fetch inventory:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const lowStockCount = products.filter(p => p.stock < 10).length;

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-luxury-black mb-1">Inventory Management</h1>
                    <p className="text-sm text-slate-500">Monitor stock levels and warehouse status.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-lg flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <div>
                            <p className="text-[10px] uppercase font-bold text-orange-600 tracking-widest">Low Stock</p>
                            <p className="text-sm font-bold text-orange-700">{lowStockCount} Items</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search inventory..."
                            className="pl-10 rounded-lg border-slate-200 focus-visible:ring-gold"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[80px]">Item</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>SKU/Code</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Stock Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-400">Loading inventory data...</TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-400">No inventory found.</TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell>
                                        <div className="relative w-10 h-10 bg-slate-100 rounded overflow-hidden">
                                            <Image
                                                src={product.images[0] || "/hero-banner.png"}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{product.name}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{product.category?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs font-mono text-slate-500">
                                        {product.id.substring(0, 8).toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "font-bold text-sm",
                                                product.stock === 0 ? "text-destructive" : product.stock < 10 ? "text-orange-600" : "text-luxury-black"
                                            )}>
                                                {product.stock}
                                            </span>
                                            <span className="text-[10px] text-slate-400">units</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {product.stock === 0 ? (
                                            <Badge variant="destructive" className="rounded-full text-[10px] animate-pulse">Out of Stock</Badge>
                                        ) : product.stock < 10 ? (
                                            <Badge variant="secondary" className="rounded-full text-[10px] bg-orange-100 text-orange-600 hover:bg-orange-100">Low Stock</Badge>
                                        ) : (
                                            <Badge variant="success" className="rounded-full text-[10px] bg-green-50 text-green-600 hover:bg-green-50 border-green-100">In Stock</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-lg">
                                                <DropdownMenuItem className="gap-2">
                                                    <Edit className="h-4 w-4" /> Update Stock
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2">
                                                    <ArrowUpRight className="h-4 w-4" /> View History
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}

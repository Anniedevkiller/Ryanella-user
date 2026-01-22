"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Ticket,
    Copy,
    Calendar
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

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await fetch("/api/admin/coupons");
                const data = await res.json();
                setCoupons(data || []);
            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Simple alert or toast could go here
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-luxury-black mb-1">Coupons & Discounts</h1>
                    <p className="text-sm text-slate-500">Manage promotional codes for your muse collection.</p>
                </div>
                <Button className="bg-luxury-black text-white hover:bg-zinc-800 rounded-none gap-2">
                    <Plus className="h-4 w-4" /> Create Coupon
                </Button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by code..."
                            className="pl-10 rounded-lg border-slate-200 focus-visible:ring-gold"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Expiry</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-400">Loading coupons...</TableCell>
                            </TableRow>
                        ) : coupons.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-400">No coupons found.</TableCell>
                            </TableRow>
                        ) : (
                            coupons.map((coupon) => (
                                <TableRow key={coupon.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-2 group">
                                            <span className="font-mono font-bold text-sm tracking-widest bg-slate-100 px-2 py-1 rounded">
                                                {coupon.code}
                                            </span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => copyCode(coupon.code)}>
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs uppercase font-bold text-slate-500">{coupon.discountType}</TableCell>
                                    <TableCell className="font-bold">
                                        {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}%` : `₦${coupon.discountValue.toLocaleString()}`}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(coupon.expiresAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={coupon.isActive && new Date(coupon.expiresAt) > new Date() ? "success" : "secondary"} className="rounded-full text-[10px]">
                                            {coupon.isActive && new Date(coupon.expiresAt) > new Date() ? "Active" : "Inactive"}
                                        </Badge>
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
                                                    <Edit className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                                    <Trash2 className="h-4 w-4" /> Delete
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

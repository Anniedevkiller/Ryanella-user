"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TrendingUp,
    ShoppingBag,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

const stats = [
    { name: "Total Revenue", value: "₦1,240,000", icon: DollarSign, trend: "+12.5%", positive: true },
    { name: "Orders", value: "154", icon: ShoppingBag, trend: "+8.2%", positive: true },
    { name: "Customers", value: "1,102", icon: Users, trend: "+3.1%", positive: true },
    { name: "Avg. Order Value", value: "₦45,000", icon: TrendingUp, trend: "-1.5%", positive: false },
];

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-luxury-black mb-1">Dashboard Overview</h1>
                <p className="text-sm text-slate-500">How your boutique is performing today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.name} className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <stat.icon className="h-5 w-5 text-luxury-black" />
                                </div>
                                <div className={cn(
                                    "flex items-center text-xs font-bold",
                                    stat.positive ? "text-green-600" : "text-destructive"
                                )}>
                                    {stat.trend}
                                    {stat.positive ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : <ArrowDownRight className="h-3 w-3 ml-0.5" />}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">{stat.name}</p>
                                <h3 className="text-2xl font-bold text-luxury-black">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 rounded-xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-slate-400">
                        {/* Chart Placeholder */}
                        <div className="text-center">
                            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-10" />
                            <p className="italic text-xs font-serif uppercase tracking-[0.2em]">Chart visualizer loading...</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Recent Customers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200" />
                                <div>
                                    <p className="text-sm font-bold">Customer {i}</p>
                                    <p className="text-xs text-slate-500">customer{i}@email.com</p>
                                </div>
                                <div className="ml-auto text-[10px] font-bold uppercase text-gold">Muse</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

import { cn } from "@/lib/utils";

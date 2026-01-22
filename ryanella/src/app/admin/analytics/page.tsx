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
    ArrowDownRight,
    BarChart3,
    PieChart,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { name: "Total Revenue", value: "₦1,240,000", icon: DollarSign, trend: "+12.5%", positive: true },
    { name: "Orders", value: "154", icon: ShoppingBag, trend: "+8.2%", positive: true },
    { name: "Customers", value: "1,102", icon: Users, trend: "+3.1%", positive: true },
    { name: "Conversion Rate", value: "3.4%", icon: TrendingUp, trend: "+0.5%", positive: true },
];

export default function AdminAnalyticsPage() {
    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-luxury-black mb-1">Analytics Dashboard</h1>
                    <p className="text-sm text-slate-500">Insights into your boutique's growth and performance.</p>
                </div>
                <Button variant="outline" className="rounded-lg gap-2 text-xs">
                    <Calendar className="h-3 w-3" /> Last 30 Days
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.name} className="rounded-xl border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <stat.icon className="h-4 w-4 text-luxury-black" />
                                </div>
                                <div className={cn(
                                    "flex items-center text-[10px] font-bold",
                                    stat.positive ? "text-green-600" : "text-destructive"
                                )}>
                                    {stat.trend}
                                    {stat.positive ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : <ArrowDownRight className="h-3 w-3 ml-0.5" />}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">{stat.name}</p>
                                <h3 className="text-xl font-bold text-luxury-black">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" /> Sales Over Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-10" />
                            <p className="italic text-xs font-serif uppercase tracking-[0.2em]">Sales visualization loading...</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <PieChart className="h-4 w-4" /> Top Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <PieChart className="h-12 w-12 mx-auto mb-4 opacity-10" />
                            <p className="italic text-xs font-serif uppercase tracking-[0.2em]">Category distribution loading...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {[
                            { name: "Infinity Band Ring", sales: 45, revenue: "₦675,000", color: "bg-gold" },
                            { name: "Silk Muse Dress", sales: 32, revenue: "₦480,000", color: "bg-luxury-black" },
                            { name: "Gold Droplet Earrings", sales: 28, revenue: "₦210,000", color: "bg-slate-400" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs", item.color)}>
                                    #{i + 1}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-bold">{item.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase">{item.sales} units sold</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{item.revenue}</p>
                                    <p className="text-[10px] text-green-600 font-bold">+5.2%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

import { Button } from "@/components/ui/button";

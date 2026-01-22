"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ListTree,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Ticket,
    ClipboardList,
    BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: ListTree },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Coupons", href: "/admin/coupons", icon: Ticket },
    { name: "Inventory", href: "/admin/inventory", icon: ClipboardList },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-8">
                    <Link href="/" className="text-xl font-serif tracking-widest uppercase font-bold text-luxury-black">
                        Ryanella <span className="text-[10px] bg-gold text-white px-2 py-0.5 rounded-full font-sans tracking-normal align-middle">Admin</span>
                    </Link>
                </div>

                <nav className="flex-grow px-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
                                    isActive
                                        ? "bg-slate-100 text-luxury-black font-bold"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-luxury-black"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-destructive">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-8 lg:p-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

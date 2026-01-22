"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User,
    Settings,
    Bell,
    Shield,
    CreditCard,
    Save
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettingsPage() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-luxury-black mb-1">Administrative Settings</h1>
                <p className="text-sm text-slate-500">Configure your boutique's operations and security.</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start rounded-none h-auto p-0 gap-8">
                    <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-luxury-black data-[state=active]:bg-transparent pb-3 px-0 text-xs font-bold uppercase tracking-widest text-slate-400 data-[state=active]:text-luxury-black">
                        General
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-luxury-black data-[state=active]:bg-transparent pb-3 px-0 text-xs font-bold uppercase tracking-widest text-slate-400 data-[state=active]:text-luxury-black">
                        Admin Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-luxury-black data-[state=active]:bg-transparent pb-3 px-0 text-xs font-bold uppercase tracking-widest text-slate-400 data-[state=active]:text-luxury-black">
                        Security
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card className="rounded-xl border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Boutique Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="storeName" className="text-[10px] font-bold uppercase tracking-widest">Store Name</Label>
                                    <Input id="storeName" defaultValue="Ryanella" className="rounded-lg border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency" className="text-[10px] font-bold uppercase tracking-widest">Default Currency</Label>
                                    <Input id="currency" defaultValue="NGN (₦)" className="rounded-lg border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail" className="text-[10px] font-bold uppercase tracking-widest">Support Email</Label>
                                    <Input id="contactEmail" defaultValue="muse@ryanella.com" className="rounded-lg border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shippingThreshold" className="text-[10px] font-bold uppercase tracking-widest">Free Shipping Over (₦)</Label>
                                    <Input id="shippingThreshold" defaultValue="200,000" className="rounded-lg border-slate-200" />
                                </div>
                            </div>
                            <Button className="bg-luxury-black text-white hover:bg-zinc-800 rounded-none gap-2 px-8">
                                <Save className="h-4 w-4" /> Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile" className="space-y-6">
                    <Card className="rounded-xl border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                                    <User className="h-10 w-10 text-slate-300" />
                                </div>
                                <Button variant="outline" className="rounded-lg text-xs">Change Avatar</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-widest">Full Name</Label>
                                    <Input id="fullName" defaultValue="Admin User" className="rounded-lg border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="adminEmail" className="text-[10px] font-bold uppercase tracking-widest">Admin Email</Label>
                                    <Input id="adminEmail" defaultValue="admin@ryanella.com" className="rounded-lg border-slate-200" />
                                </div>
                            </div>
                            <Button className="bg-luxury-black text-white hover:bg-zinc-800 rounded-none gap-2 px-8">
                                <Save className="h-4 w-4" /> Update Profile
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}

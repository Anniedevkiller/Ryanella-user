"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, totalItems, subtotal } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="group relative hover:text-accent transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col bg-background p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-xl font-serif uppercase tracking-widest flex items-center justify-between">
                        Shopping Bag
                        <span className="text-xs font-sans font-normal text-muted-foreground tracking-normal lowercase">
                            ({totalItems} items)
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-grow p-6">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground opacity-20" />
                            <p className="text-muted-foreground italic font-serif">Your shopping bag is empty.</p>
                            <Button asChild variant="outline" className="rounded-none border-luxury-black text-xs font-bold uppercase tracking-widest">
                                <Link href="/category/all">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                                    <div className="relative w-20 aspect-[3/4] bg-secondary shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-medium uppercase tracking-wider">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size, item.color)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
                                            {item.color} / {item.size}
                                        </p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <div className="flex items-center border border-border">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                    className="p-1 hover:bg-secondary transition-colors"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="px-3 text-xs font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                    className="p-1 hover:bg-secondary transition-colors"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <p className="text-sm font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {cart.length > 0 && (
                    <SheetFooter className="p-6 border-t flex-col sm:flex-col gap-4">
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                                <span className="font-bold">₦{subtotal.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground italic">Shipping and taxes calculated at checkout.</p>
                        </div>
                        <Button asChild className="w-full bg-luxury-black hover:bg-zinc-800 text-white py-6 rounded-none uppercase font-bold tracking-widest text-xs">
                            <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Secure Worldwide Shipping
                        </p>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}

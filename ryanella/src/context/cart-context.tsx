"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(
                (i) => i.id === item.id && i.size === item.size && i.color === item.color
            );
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.size === item.size && i.color === item.color
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string, size: string, color: string) => {
        setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
    };

    const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((i) =>
                i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

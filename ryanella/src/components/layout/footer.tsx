import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="bg-luxury-black text-cream pt-16 pb-8 px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Info */}
                <div>
                    <h2 className="text-2xl font-serif tracking-widest uppercase mb-6">Ryanella</h2>
                    <p className="text-muted-foreground mb-6 max-w-xs">
                        Redefining elegance with modern, luxurious fashion for the bold and sophisticated.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-gold transition-colors">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-gold transition-colors">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-gold transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Shop Links */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Shop</h3>
                    <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <li><Link href="/category/women" className="hover:text-cream transition-colors">Women's Collection</Link></li>
                        <li><Link href="/category/men" className="hover:text-cream transition-colors">Men's Collection</Link></li>
                        <li><Link href="/category/new" className="hover:text-cream transition-colors">New Arrivals</Link></li>
                        <li><Link href="/category/best-sellers" className="hover:text-cream transition-colors">Best Sellers</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Support</h3>
                    <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-cream transition-colors">Order Tracking</Link></li>
                        <li><Link href="#" className="hover:text-cream transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="#" className="hover:text-cream transition-colors">Size Guide</Link></li>
                        <li><Link href="#" className="hover:text-cream transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Join the Muse</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Subscribe to receive updates, access to exclusive deals, and more.
                    </p>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-zinc-900 border-zinc-800 text-cream focus-visible:ring-gold"
                        />
                        <Button className="bg-gold hover:bg-gold/90 text-luxury-black font-bold uppercase tracking-widest text-xs">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                <p>© 2026 Ryanella Boutique. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-cream transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-cream transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

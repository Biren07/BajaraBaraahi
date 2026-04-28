"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Gift,
  Truck,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

interface CartItem {
  cartItemId: string;
  _id: string;
  title: string;
  author: string;
  price: number;
  original_price?: number;
  discount?: number;
  effectivePrice: number;
  quantity: number;
  subtotal: number;
  cover_Img?: {
    url: string;
  };
  stock: number;
}

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    loading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6 text-gold" />
              <h1 className="text-2xl font-serif font-bold mb-4">
                Loading Cart...
              </h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gold" />
              </div>
              <h1 className="text-3xl font-serif font-bold mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven&apos;t added any books to your cart yet.
                Start exploring our collection!
              </p>
              <Link href="/bestsellers">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-primary-foreground"
                >
                  Browse Best Sellers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Shopping Cart</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground animate-fade-in-up">
            Shopping <span className="text-gold">Cart</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Left: Cart Items ── */}
            <div className="flex-1 min-w-0">
              {/* Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-12 gap-0 px-6 py-3 bg-muted/60 border-b border-border">
                  {[
                    { label: "Product", cls: "col-span-5 text-left" },
                    { label: "Price", cls: "col-span-2 text-center" },
                    { label: "Quantity", cls: "col-span-2 text-center" },
                    { label: "Total", cls: "col-span-2 text-center" },
                    { label: "Action", cls: "col-span-1 text-center" },
                  ].map(({ label, cls }) => (
                    <div
                      key={label}
                      className={`${cls} text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-border/60">
                  {cartItems.map((item, index) => {
                    const imageUrl = item.cover_Img?.url || "/placeholder.jpg";
                    const hasSavings =
                      item.original_price &&
                      item.original_price > item.effectivePrice;

                    return (
                      <div
                        key={item.cartItemId}
                        className="group px-6 py-5 hover:bg-muted/30 transition-colors duration-200 animate-fade-in-up"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* ── Product ── */}
                          <div className="md:col-span-5 flex items-center gap-4">
                            {/* Book Cover */}
                            <div className="relative w-[60px] h-[84px] rounded-lg overflow-hidden bg-muted shrink-0 shadow-md ring-1 ring-black/5">
                              <Image
                                src={imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                              {item.discount && item.discount > 0 && (
                                <div className="absolute top-1 left-1 bg-[#7a0f1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  -{item.discount}%
                                </div>
                              )}
                            </div>

                            {/* Meta */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                by {item.author}
                              </p>
                              {hasSavings && (
                                <p className="text-[11px] text-green-600 font-medium mt-1.5">
                                  You save Rs.{" "}
                                  {(
                                    (item.original_price! -
                                      item.effectivePrice) *
                                    item.quantity
                                  ).toFixed(2)}
                                </p>
                              )}
                              {/* Mobile-only remove */}
                              <button
                                onClick={() => removeItem(item._id)}
                                className="mt-2 text-xs text-red-500 hover:text-red-600 flex items-center gap-1 md:hidden"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>

                          {/* ── Price ── */}
                          <div className="md:col-span-2 flex flex-col items-start md:items-center gap-0.5">
                            <span className="md:hidden text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                              Price
                            </span>
                            <span className="font-semibold text-sm text-gold">
                              Rs. {item.effectivePrice.toFixed(2)}
                            </span>
                            {hasSavings && (
                              <span className="text-xs text-muted-foreground line-through">
                                Rs. {item.original_price!.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* ── Quantity ── */}
                          <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                            <span className="md:hidden text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                              Qty
                            </span>
                            <div className="flex items-center rounded-lg border border-border overflow-hidden bg-background shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-9 text-center text-sm font-semibold tabular-nums border-x border-border">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                disabled={item.quantity >= item.stock}
                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* ── Total ── */}
                          <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                            <span className="md:hidden text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                              Total
                            </span>
                            <span className="font-bold text-base">
                              Rs. {item.subtotal.toFixed(2)}
                            </span>
                          </div>

                          {/* ── Action ── */}
                          <div className="hidden md:flex md:col-span-1 justify-center">
                            <button
                              onClick={() => removeItem(item._id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue Shopping / Clear Cart */}
              <div className="mt-5 flex items-center justify-between">
                <Link href="/bestsellers">
                  <Button
                    variant="outline"
                    className="border-gold/30 hover:bg-gold/10 text-sm h-9 px-4"
                  >
                    ← Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm h-9 px-4"
                  onClick={clearCart}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* ── Right: Cart Summary ── */}
            <div className="lg:w-80">
              <div className="sticky top-32">
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Cart Summary</h3>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span
                      className={cn(
                        shipping === 0 && "text-green-600 font-medium",
                      )}
                    >
                      {shipping === 0 ? "FREE" : `Rs. ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground bg-gold/10 px-3 py-2 rounded-lg">
                      Add Rs. {(50 - subtotal).toFixed(2)} more for FREE
                      shipping
                    </p>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      Rs. {total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    size="lg"
                    className="w-full bg-[#7a0f1e] hover:bg-[#5c0c17] text-white font-semibold py-6 rounded-xl shadow-md transition-all"
                    onClick={() => (window.location.href = "/order")}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span>Secure Checkout</span>
                    <span>·</span>
                    <span>SSL Encrypted</span>
                  </div>
                </div>

                {/* Feature badges */}
                {/* <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
                    <Truck className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-xs font-medium">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">
                        On orders $50+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
                    <Gift className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-xs font-medium">Gift Wrapping</p>
                      <p className="text-xs text-muted-foreground">Available</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

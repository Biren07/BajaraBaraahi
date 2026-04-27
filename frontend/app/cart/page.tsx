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
import toast from "react-hot-toast";

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

// const initialCartItems: CartItem[] = [
//   {
//     id: "1",
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     price: 14.99,
//     originalPrice: 19.99,
//     image:
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
//     quantity: 1,
//   },
//   {
//     id: "2",
//     title: "Atomic Habits",
//     author: "James Clear",
//     price: 16.99,
//     originalPrice: 24.99,
//     image:
//       "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
//     quantity: 2,
//   },
//   {
//     id: "3",
//     title: "Project Hail Mary",
//     author: "Andy Weir",
//     price: 18.99,
//     originalPrice: 26.99,
//     image:
//       "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
//     quantity: 1,
//   },
// ];

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    loading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SUMMER20") {
      setAppliedCoupon("SUMMER20");
      setCouponDiscount(20);
    } else if (couponCode.toUpperCase() === "FIRSTBUY") {
      setAppliedCoupon("FIRSTBUY");
      setCouponDiscount(15);
    } else {
      alert("Invalid coupon code");
    }
  };

  // Use API-provided totals
  const subtotal = totalPrice;
  const savings = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.original_price || item.effectivePrice) - item.effectivePrice) *
        item.quantity,
    0,
  );
  const couponSavings = (subtotal * couponDiscount) / 100;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - couponSavings + shipping;

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
          {/* Breadcrumb */}
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
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-border">
                  {cartItems.map((item, index) => {
                    const imageUrl = item.cover_Img?.url || "/placeholder.jpg";

                    return (
                      <div
                        key={item.cartItemId}
                        className="p-4 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product */}
                          <div className="md:col-span-6 flex items-center gap-4">
                            <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-muted shrink-0">
                              <Image
                                src={imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate hover:text-gold transition-colors cursor-pointer">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                by {item.author}
                              </p>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="mt-2 text-sm text-red-500 hover:text-red-600 flex items-center gap-1 md:hidden"
                              >
                                <Trash2 className="w-3 h-3" />
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                            <span className="md:hidden text-sm text-muted-foreground">
                              Price:
                            </span>
                            <div>
                              <span className="font-semibold text-gold">
                                Rs. {item.effectivePrice.toFixed(2)}
                              </span>
                              {item.original_price &&
                                item.original_price > item.effectivePrice && (
                                  <span className="text-sm text-muted-foreground line-through ml-2">
                                    Rs. {item.original_price.toFixed(2)}
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                            <span className="md:hidden text-sm text-muted-foreground">
                              Qty:
                            </span>
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                className="p-2 hover:bg-muted transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                            <span className="md:hidden text-sm text-muted-foreground">
                              Total:
                            </span>
                            <span className="font-bold text-lg">
                              Rs. {item.subtotal.toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="hidden md:block p-2 text-muted-foreground hover:text-red-500 transition-colors"
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

              {/* Continue Shopping */}
              <div className="mt-6 flex items-center justify-between">
                <Link href="/bestsellers">
                  <Button
                    variant="outline"
                    className="border-gold/30 hover:bg-gold/10"
                  >
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="sticky top-32 space-y-6">
                {/* Coupon Code */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-gold" />
                    Apply Coupon
                  </h3>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-green-600" />
                        <span className="font-mono font-semibold">
                          {appliedCoupon}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponDiscount(0);
                          setCouponCode("");
                        }}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-gold/30 focus:border-gold"
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="border-gold/30 hover:bg-gold hover:text-primary-foreground shrink-0"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: SUMMER20 or FIRSTBUY
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal (
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        items)
                      </span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>You Save</span>
                        <span>- Rs. {savings.toFixed(2)}</span>
                      </div>
                    )}

                    {couponSavings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount ({couponDiscount}%)</span>
                        <span>- Rs. {couponSavings.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Shipping
                      </span>
                      <span className={cn(shipping === 0 && "text-green-600")}>
                        {shipping === 0 ? "FREE" : `Rs. ${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground bg-gold/10 p-2 rounded-lg">
                        Add Rs. {(50 - subtotal).toFixed(2)} more to get FREE
                        shipping!
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      Rs. {total.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-4">
                    <Button
                      size="lg"
                      className="w-full bg-[#7a0f1e] hover:bg-[#5c0c17] text-white font-semibold py-6 rounded-xl shadow-md transition-all"
                      onClick={() => (window.location.href = "/order")}
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span>Secure Checkout</span>
                    <span>SSL Encrypted</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: Truck,
                      label: "Free Shipping",
                      sublabel: "On orders $50+",
                    },
                    {
                      icon: Gift,
                      label: "Gift Wrapping",
                      sublabel: "Available",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                    >
                      <feature.icon className="w-5 h-5 text-gold" />
                      <div>
                        <p className="text-sm font-medium">{feature.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {feature.sublabel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

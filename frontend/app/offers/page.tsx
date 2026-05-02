"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Percent,
  ArrowRight,
  Copy,
  Check,
  Ticket,
} from "lucide-react";
import { offerService } from "@/services/offerService";
import { couponService } from "@/services/couponService";
import toast from "react-hot-toast";

// --- Data Helper Functions ---
function extractBookData(book: any, offer: any) {
  return {
    id: book?._id || offer?._id,
    _id: book?._id || offer?._id,
    title: book?.title || offer?.title || "Untitled",
    author: book?.author || offer?.author || "Unknown",
    price: book?.price || offer?.price || 0,
    discountPrice: calculateDiscountPrice(book, offer),
    image: getImageUrl(book),
    rating: book?.rating || 0,
  };
}

function calculateDiscountPrice(book: any, offer: any) {
  if (!book?.price) return offer?.offer?.offerPrice || 0;
  if (offer?.discount) {
    return book.price - (offer.discount / 100) * book.price;
  }
  return offer?.offer?.offerPrice || book?.price || 0;
}

function getImageUrl(book: any): string {
  return (
    book?.cover_Img?.url ||
    book?.coverImg?.url ||
    book?.image ||
    "/placeholder.png"
  );
}

// --- Optimized Coupon Card (Mini & Professional) ---
function CouponCard({
  coupon,
  onCopy,
}: {
  coupon: any;
  onCopy: (code: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const code = coupon.code || coupon.promoCode || coupon.couponCode || "";
  const discount = coupon.discount || coupon.percentage || "0";
  const description = coupon.description || "Limited time offer";

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy(code);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-all group">
      {/* Ticket Design Left Section */}
      <div className="flex flex-col items-center justify-center bg-gold/10 px-4 py-6 border-r border-dashed border-zinc-300 dark:border-zinc-700 relative">
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-background border border-zinc-200 dark:border-zinc-800 rounded-full" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-background border border-zinc-200 dark:border-zinc-800 rounded-full" />
        <span className="text-xl font-black text-gold leading-none">
          {discount}%
        </span>
        <span className="text-[10px] font-bold text-gold/80 uppercase">
          OFF
        </span>
      </div>

      {/* Coupon Content */}
      <div className="flex-grow px-4 py-3 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Ticket className="w-3 h-3 text-gold" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate uppercase tracking-tight">
            {code}
          </h3>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
          {description}
        </p>
      </div>

      {/* Copy Action */}
      <div className="pr-4">
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className={`h-9 px-3 rounded-lg flex items-center gap-2 border transition-all ${
            copied
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-zinc-50 text-zinc-600 border-zinc-100 group-hover:border-gold group-hover:text-gold group-hover:bg-gold/5"
          }`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span className="text-[10px] font-bold">
            {copied ? "COPIED" : "COPY"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponsLoading, setCouponsLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
    fetchCoupons();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await offerService.getAllOffers();
      setOffers(response?.offers || []);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      toast.error("Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      setCouponsLoading(true);
      const data = await couponService.getAllCoupons();
      const couponsData = data?.promos || [];
      setCoupons(Array.isArray(couponsData) ? couponsData : []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setCoupons([
        { code: "WELCOME10", discount: 10, description: "First order special" },
        { code: "READ20", discount: 20, description: "Orders over Rs. 2000" },
      ]);
    } finally {
      setCouponsLoading(false);
    }
  };

  const weeklyDeals = offers;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/70 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold font-medium">Offers & Deals</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center border-2 border-gold/40">
              <Percent className="w-6 h-6 text-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground">
              Hot <span className="text-gold italic">Deals</span>
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-primary-foreground/85 max-w-2xl">
            Save big on your favorite books with exclusive discounts and
            coupons.
          </p>
        </div>
      </section>

      {/* COUPONS SECTION */}
      <section className="py-12 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold">
                Exclusive <span className="text-gold">Coupons</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Click to copy and use at checkout
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {couponsLoading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-muted animate-pulse rounded-xl"
                  />
                ))
              : coupons.map((coupon, i) => (
                  <CouponCard
                    key={coupon._id || i}
                    coupon={coupon}
                    onCopy={(code) => toast.success(`${code} copied!`)}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* OFFERS DEALS SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold">
                Offers <span className="text-gold italic">Deals</span>
              </h2>
              <div className="h-1 w-12 bg-gold rounded-full" />
            </div>
          </div>

          <div className="space-y-16">
            {loading ? (
              <div className="text-center py-12">Loading deals...</div>
            ) : weeklyDeals.length > 0 ? (
              weeklyDeals.map((offer) => (
                <div key={offer._id} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="font-serif text-xl font-bold border-l-4 border-gold pl-4 uppercase tracking-wide">
                      {offer.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300">
                    {offer.books?.map((book: any, idx: number) => (
                      <BookCard
                        key={book._id || idx}
                        book={extractBookData(book, offer)}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No active offers found.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

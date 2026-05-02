"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Star, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bookService } from "@/services/bookService";
import { useWishlist } from "../context/wishlist-context";
import { useAuth } from "../context/auth-context";
import toast from "react-hot-toast";

interface BookCardProps {
  book: any;
  index?: number;
  initialIsWishlisted?: boolean;
  onWishlistToggle?: (bookId: string, added: boolean) => void;
}

export function BookCard({ book, index = 0, initialIsWishlisted = false, onWishlistToggle }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const router = useRouter();
  const { incrementCount, decrementCount } = useWishlist();
  const { user } = useAuth();

  
  const bookId = book.id || book._id;
  const isOutOfStock = book.stock !== undefined && book.stock <= 0;
  const hasDiscount = book.discountPrice != null && book.price != null && book.discountPrice < book.price;
  const discountPercent = hasDiscount ? Math.round(((book.price - book.discountPrice) / book.price) * 100) : 0;
  const imageSrc = typeof book.image === "string" && book.image.trim() ? book.image : "/placeholder.jpg";

  return (
    <div
      onClick={() => bookId && router.push(`/book/${bookId}`)}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm 
                 transition-all duration-500 hover:shadow-xl overflow-hidden cursor-pointer w-full"
    >
      {/* --- Image Section --- */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-20 pointer-events-none">
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md shadow-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            if (!bookId || !user) {
              if (!user) {
                toast.error("Please login first");
                router.push("/login");
              }
              return;
            }
            try {
              const response = await bookService.toggleWishlist(bookId);
              setIsWishlisted(!isWishlisted);
              onWishlistToggle?.(bookId, response.added);
              response.added ? incrementCount() : decrementCount();
              toast.success(response.message);
            } catch (error) {
              toast.error("Failed to update wishlist");
            }
          }}
          className="absolute top-2 right-2 z-30 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform active:scale-90 sm:opacity-0 group-hover:opacity-100 duration-300"
        >
          <Heart className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400")} />
        </button>

        <Image
          src={imageSrc}
          alt={book.title || "Book Cover"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* --- Content Section --- */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-semibold text-[#7a0f1e]/80 uppercase tracking-wider bg-[#7a0f1e]/5 px-1.5 py-0.5 rounded">
            {book.category || "General"}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-600">{book.rating || "4.5"}</span>
          </div>
        </div>

        {/* Title & Author */}
        <div className="mb-3 h-[40px] md:h-[44px]">
          <h3 className="text-sm md:text-[15px] font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-[#7a0f1e] transition-colors">
            {book.title || "Untitled"}
          </h3>
          <p className="text-[11px] md:text-xs text-slate-500 mt-0.5 truncate">
            by <span className="text-slate-700">{book.author || "Unknown"}</span>
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-2">
          <div className="flex flex-col mb-3">
            {hasDiscount && (
              <span className="text-[10px] md:text-xs text-slate-400 line-through">Rs {book.price}</span>
            )}
            <span className="font-extrabold text-[#7a0f1e] text-base md:text-lg tracking-tight">
              Rs {hasDiscount ? book.discountPrice : (book.price ?? 0)}
            </span>
          </div>

          <Button
            disabled={isOutOfStock}
            className={cn(
              "w-full h-9 md:h-10 text-xs md:text-sm font-bold rounded-lg transition-all group/btn",
              isOutOfStock
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-[#7a0f1e] text-white shadow-lg shadow-slate-100"
            )}
          >
            {isOutOfStock ? "Out of Stock" : (
              <span className="flex items-center gap-2">
                Buy Now
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bookService } from "@/services/bookService";
import { cartService } from "@/services/cartService";
import { useWishlist } from "../context/wishlist-context";
import { useAuth } from "../context/auth-context";
import toast from "react-hot-toast";

interface BookCardProps {
  book: any & { stock?: number };
  index?: number;
  onAddToCart?: (book: any) => void;
  initialIsWishlisted?: boolean;
  onWishlistToggle?: (bookId: string, added: boolean) => void;
}

export function BookCard({ book, index = 0, onAddToCart, initialIsWishlisted = false, onWishlistToggle }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm 
                 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Badges & Actions Overlay */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between items-start pointer-events-none">
        {hasDiscount && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg pointer-events-auto">
            {discountPercent}% OFF
          </span>
        )}
        
        <button
          onClick={async (e) => {
            e.stopPropagation();
            if (!bookId) return;
            if (!user) {
              toast.error("Login or Sign up first");
              router.push("/login");
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
          className={cn(
            "pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border bg-white/90 backdrop-blur-sm",
            isWishlisted ? "scale-110" : "hover:scale-110 opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart className={cn("w-4.5 h-4.5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400")} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <Image
          src={imageSrc}
          alt={book.title || "Book Cover"}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Overlay Darken on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        {/* Rating & Category */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("w-3.5 h-3.5", i < Math.floor(book.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200")}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            {book.category || "General"}
          </span>
        </div>

        {/* Title & Author */}
        <div className="mb-3 min-h-[4rem]">
          <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-[#7a0f1e] transition-colors duration-300">
            {book.title || "Untitled"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 italic">by {book.author || "Unknown Author"}</p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          {hasDiscount ? (
            <>
              <span className="font-black text-[#7a0f1e] text-lg">Rs {book.discountPrice}</span>
              <span className="text-xs text-slate-400 line-through decoration-slate-300">Rs {book.price}</span>
            </>
          ) : (
            <span className="font-black text-slate-900 text-lg">Rs {book.price ?? 0}</span>
          )}
        </div>

        {/* Buy Now Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (!bookId) return;
            if (!user) {
              toast.error("Login or Sign up first");
              router.push("/login");
              return;
            }
            router.push(`/book/${bookId}`);
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full h-11 transition-all duration-300 font-semibold rounded-xl",
            isOutOfStock
              ? "bg-slate-100 text-slate-400"
              : "bg-[#7a0f1e] hover:bg-[#5c0c17] text-white shadow-md hover:shadow-[#7a0f1e]/20"
          )}
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            "Buy Now"
          )}
        </Button>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bookService } from "@/services/bookService";
import { cartService } from "@/services/cartService";
import { useWishlist } from "../context/wishlist-context";
import toast from "react-hot-toast";

interface BookCardProps {
  book: any;
  index?: number;
  onAddToCart?: (book: any) => void;
}

export function BookCard({ book, index = 0, onAddToCart }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  const { incrementCount, decrementCount } = useWishlist();

  // ✅ Ensure ID always exists
  const bookId = book.id || book._id;

  // ✅ Safer discount logic
  const hasDiscount =
    book.discountPrice != null &&
    book.price != null &&
    book.discountPrice < book.price;

  const discountPercent = hasDiscount
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  // ✅ Safe image fallback
  const imageSrc =
    typeof book.image === "string" && book.image.trim()
      ? book.image
      : "/placeholder.jpg";

  return (
    <div
      onClick={() => {
        if (!bookId) {
          console.warn("Missing book ID:", book);
          return;
        }
        router.push(`/book/${bookId}`);
      }}
      className="relative bg-card rounded-xl overflow-hidden border border-border/60
      transition-all duration-300 hover:shadow-lg cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Wishlist */}
      <button
        onClick={async (e) => {
          e.stopPropagation();

          if (!bookId) return;

          try {
            const response = await bookService.toggleWishlist(bookId);
            setIsWishlisted((prev) => !prev);
            if (response.added) {
              incrementCount();
            } else {
              decrementCount();
            }
            toast.success(response.message);
          } catch (error) {
            console.error("Failed to toggle wishlist:", error);
            toast.error("Failed to update wishlist");
          }
        }}
        className="absolute top-3 right-3 z-20 w-9 h-9 bg-white shadow-sm
        rounded-full flex items-center justify-center border transition"
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
          )}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-[3/4] bg-muted">
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {discountPercent}% OFF
          </span>
        )}

        <Image
          src={imageSrc}
          alt={book.title || "Book"}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < Math.floor(book.rating || 0)
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold line-clamp-2 hover:text-[#7a0f1e] transition">
          {book.title || "Untitled"}
        </h3>

        {/* Author */}
        <p className="text-sm text-muted-foreground">
          {book.author || "Unknown Author"}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <p className="font-bold text-[#7a0f1e] text-lg">
                Rs{book.discountPrice}
              </p>
              <p className="text-sm text-gray-400 line-through">
                Rs{book.price}
              </p>
              <span className="text-xs text-green-600 font-medium">
                {discountPercent}% OFF
              </span>
            </>
          ) : (
            <p className="font-bold text-[#7a0f1e] text-lg">
              Rs{book.price ?? 0}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={async (e) => {
            e.stopPropagation();

            if (!bookId) return;

            if (onAddToCart) {
              onAddToCart(book);
            } else {
              try {
                await cartService.addToCart(bookId);
                toast.success("Added to cart!");
              } catch (error: any) {
                console.error("Failed to add to cart:", error);
                toast.error(
                  error?.response?.data?.message ||
                    "Failed to add to cart"
                );
              }
            }
          }}
          className="w-full mt-2 bg-[#7a0f1e] hover:bg-[#5c0c17] text-white rounded-lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
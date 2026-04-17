"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookCardProps {
  book: any
  index?: number
  onAddToCart?: (book: any) => void
}

export function BookCard({
  book,
  index = 0,
  onAddToCart,
}: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/book/${book.id}`)}
      className="relative bg-card rounded-xl overflow-hidden border border-border/60
      transition-all duration-300 hover:shadow-lg cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsWishlisted(!isWishlisted)
        }}
        className="absolute top-3 right-3 z-20 w-9 h-9 bg-white shadow-sm
        rounded-full flex items-center justify-center border transition"
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-500"
          )}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-[3/4] bg-muted">
        <Image
          src={book.image}
          alt={book.title}
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
                i < Math.floor(book.rating)
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold line-clamp-2 hover:text-[#7a0f1e] transition">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-muted-foreground">
          {book.author}
        </p>

        {/* Price */}
        <p className="font-bold text-[#7a0f1e] text-lg">
          ${book.price}
        </p>

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart?.(book)
          }}
          className="w-full mt-2 bg-[#7a0f1e] hover:bg-[#5c0c17] text-white rounded-lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>

      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookCardProps {
  book: any
  index?: number
  onAddToCart?: (book: any) => void
  onQuickView?: (book: any) => void
}

export function BookCard({
  book,
  index = 0,
  onAddToCart,
  onQuickView,
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden border border-border/60
      transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
      hover:border-gold/60"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-20 w-9 h-9 bg-background/80 backdrop-blur-sm
        rounded-full flex items-center justify-center transition-all duration-300
        hover:bg-gold hover:text-primary-foreground"
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isWishlisted ? "fill-gold text-gold" : ""
          )}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
        />

        {/* Overlay Actions */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex items-center justify-center gap-4 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gold hover:bg-gold-dark"
            onClick={() => onAddToCart?.(book)}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 rounded-full border-white text-white hover:bg-white hover:text-primary"
            onClick={() => onQuickView?.(book)}
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < Math.floor(book.rating)
                  ? "fill-gold text-gold"
                  : "text-muted-foreground"
              )}
            />
          ))}
        </div>

        <h3 className="font-semibold line-clamp-2 group-hover:text-gold">
          {book.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-2">
          {book.author}
        </p>

        <p className="font-bold text-gold">${book.price}</p>
      </div>
    </div>
  )
}
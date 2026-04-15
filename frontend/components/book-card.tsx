"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookCardProps {
  book: {
    id: string
    title: string
    author: string
    price: number
    originalPrice?: number
    rating: number
    image: string
    isNew?: boolean
    isBestseller?: boolean
  }
  index?: number
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {book.isNew && (
          <span className="bg-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
        )}
        {book.isBestseller && (
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}
        {discount > 0 && (
          <span className="bg-destructive text-white text-xs font-semibold px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-all",
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
            "object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Quick Actions */}
        <div
          className={cn(
            "absolute inset-0 bg-primary/60 flex items-center justify-center gap-3 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gold hover:bg-gold-dark text-primary-foreground transition-transform hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-transform hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
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
          <span className="text-sm text-muted-foreground ml-1">
            ({book.rating.toFixed(1)})
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-gold transition-colors mb-1">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gold">${book.price.toFixed(2)}</span>
          {book.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button - Mobile */}
        <Button
          className="w-full mt-3 bg-primary hover:bg-gold hover:text-primary-foreground transition-all duration-300 md:hidden"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

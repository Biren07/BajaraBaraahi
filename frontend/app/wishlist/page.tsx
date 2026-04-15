"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, ShoppingCart, Trash2, Share2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface WishlistItem {
  id: string
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  inStock: boolean
}

const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    inStock: true,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    originalPrice: 24.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    inStock: true,
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 18.99,
    originalPrice: 26.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    inStock: false,
  },
  {
    id: "4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 15.99,
    originalPrice: 22.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
    inStock: true,
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist)

  const removeFromWishlist = (id: string) => {
    setWishlist((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: string) => {
    alert(`Added item ${id} to cart!`)
  }

  const addAllToCart = () => {
    const inStockItems = wishlist.filter((item) => item.inStock)
    alert(`Added ${inStockItems.length} items to cart!`)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <Heart className="w-12 h-12 text-gold" />
              </div>
              <h1 className="text-3xl font-serif font-bold mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Start adding books you love to your wishlist. They&apos;ll be saved here for later!
              </p>
              <Link href="/bestsellers">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-primary-foreground">
                  Browse Books
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Wishlist</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-gold fill-gold" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
              My <span className="text-gold">Wishlist</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{wishlist.length}</span> items in your wishlist
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share Wishlist
              </Button>
              <Button
                onClick={addAllToCart}
                className="bg-gold hover:bg-gold-dark text-primary-foreground"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Stock Badge */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-destructive text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Discount Badge */}
                  {item.originalPrice && (
                    <span className="absolute top-3 left-3 bg-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-gold transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">by {item.author}</p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gold">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={cn(
                      "w-full transition-all",
                      item.inStock
                        ? "bg-primary hover:bg-gold hover:text-primary-foreground"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">
              Looking for more? Check out our <span className="text-gold">Best Sellers</span>
            </h2>
            <Link href="/bestsellers">
              <Button size="lg" variant="outline" className="border-gold/30 hover:bg-gold hover:text-primary-foreground">
                Browse Best Sellers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

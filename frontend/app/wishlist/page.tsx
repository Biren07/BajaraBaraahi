"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, ShoppingCart, Share2, ArrowRight, Loader2 } from "lucide-react"
import { bookService } from "@/services/bookService"
import { cartService } from "@/services/cartService"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { BookCard } from "@/components/book-card"
import toast from "react-hot-toast"

interface WishlistItem {
  _id: string
  title: string
  author: string
  price: number
  original_price?: number
  discount?: number
  cover_Img?: string
  stock: number
}

export default function WishlistPage() {
const [wishlist, setWishlist] = useState<WishlistItem[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const { removeFromWishlist: removeFromWishlistContext, refetchWishlist } = useWishlist()
  const { refetchCart } = useCart()

  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await bookService.getWishlist()
      setWishlist(Array.isArray(response) ? response : (response?.data?.favorites || response?.data || response?.favorites || []))
    } catch (err) {
      console.error("Failed to fetch wishlist:", err)
      setError("Failed to load wishlist. Please try again.")
      setWishlist([])
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (id: string) => {
    try {
      await removeFromWishlistContext(id)
      setWishlist((items) => items.filter((item) => item._id !== id))
      toast.success("Removed from wishlist")
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
      toast.error("Failed to remove from wishlist")
    }
  }

  const addToCart = async (id: string) => {
    try {
      setAddingToCart(id)
      await cartService.addToCart(id)
      toast.success("Added to cart")
    } catch (error: any) {
      console.error("Failed to add to cart:", error)
      toast.error(error.response?.data?.message || "Failed to add to cart")
    } finally {
      setAddingToCart(null)
    }
  }

  const addAllToCart = async () => {
    const inStockItems = wishlist.filter((item) => item.stock > 0)
    try {
      for (const item of inStockItems) {
        await cartService.addToCart(item._id)
      }
      await refetchCart()
      toast.success(`${inStockItems.length} items added to cart`)
    } catch (error: any) {
      console.error("Failed to add all to cart:", error)
      toast.error(error.response?.data?.message || "Failed to add items to cart")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6 text-gold" />
              <h1 className="text-2xl font-serif font-bold mb-4">Loading Wishlist...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              {error ? (
                <>
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-red-500" />
                  </div>
                  <h1 className="text-2xl font-serif font-bold mb-4">Error Loading Wishlist</h1>
                  <p className="text-muted-foreground mb-8">{error}</p>
                  <Button onClick={fetchWishlist} className="bg-gold hover:bg-gold-dark text-primary-foreground">
                    Try Again
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-gold fill-gold" />
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
                </>
              )}
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
              <BookCard
                key={item._id}
                book={{
                  id: item._id,
                  _id: item._id,
                  title: item.title,
                  author: item.author,
                  price: item.original_price || item.price,
                  discountPrice: item.price,
                  image: item.cover_Img,
                  stock: item.stock,
                  rating: 0
                }}
                index={index}
                initialIsWishlisted={true}
                onWishlistToggle={(id, added) => {
                  if (!added) {
                    setWishlist(items => items.filter(item => item._id !== id))
                  }
                }}
                onAddToCart={(book) => addToCart(book._id)}
              />
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

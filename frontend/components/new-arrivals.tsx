"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/book-card"
import { bookService } from "@/services/bookService"

export function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewArrivals()
  }, [])

  const fetchNewArrivals = async () => {
    try {
      setLoading(true)
      const response = await bookService.getBooks({
        category: "new-arrivals",
        limit: 4,
      })
      setNewArrivals(response?.books || [])
    } catch (error) {
      console.error("Failed to fetch new arrivals:", error)
      setNewArrivals([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Fresh Off the Press
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            <span className="text-foreground">New</span>{" "}
            <span className="text-gold">Arrivals</span>
          </h2>

          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Explore fresh arrivals and find your next great read.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : newArrivals.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <p className="text-muted-foreground">No new arrivals available</p>
            </div>
          ) : (
            newArrivals.map((book: any, index) => {
              // ✅ Discount logic
              const originalPrice = book.original_price || book.price

              const hasDiscount =
                originalPrice &&
                book.discount &&
                book.discount > 0

              const discountPrice = hasDiscount
                ? Math.round(originalPrice * (1 - book.discount / 100))
                : null

              const mappedBook = {
                id: book._id,
                title: book.title,
                author: book.author,

                // ✅ Correct mapping
                price: originalPrice,
                discountPrice: discountPrice,

                image:
                  typeof book.cover_Img === "string" && book.cover_Img.trim()
                    ? book.cover_Img
                    : "/placeholder.jpg",

                rating: 4.5,
              }

              return (
                <BookCard
                  key={book._id}
                  book={mappedBook}
                  index={index}
                />
              )
            })
          )}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link href="/new-arrivals">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-primary-foreground px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105"
            >
              View All New Arrivals
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
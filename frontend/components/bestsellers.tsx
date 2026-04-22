"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/book-card"
import { bookService } from "@/services/bookService"

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [bestsellers, setBestsellers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBestsellers()
  }, [])

  const fetchBestsellers = async () => {
    try {
      setLoading(true)
      const response = await bookService.getBooks({
        category: "best-selling",
        limit: 10,
      })

      setBestsellers(response?.books || [])
    } catch (error) {
      console.error("Failed to fetch bestsellers:", error)
      setBestsellers([])
    } finally {
      setLoading(false)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const scrollAmount = 320

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Most Popular
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
              <span className="text-foreground">Best</span>{" "}
              <span className="text-gold">Sellers</span>
            </h2>

            <p className="text-muted-foreground mt-3 max-w-lg">
              Find your next great read among our most loved books by readers worldwide.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <Button onClick={() => scroll("left")} variant="outline" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button onClick={() => scroll("right")} variant="outline" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <Link href="/bestsellers">
              <Button variant="ghost" className="text-gold font-semibold group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {loading ? (
            <div className="flex justify-center items-center w-full py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : bestsellers.length === 0 ? (
            <div className="flex justify-center items-center w-full py-12">
              <p className="text-muted-foreground">No bestsellers available</p>
            </div>
          ) : (
            bestsellers.map((book: any, index) => {
              const hasDiscount =
                book.original_price &&
                book.discount &&
                book.discount > 0

              const discountPrice = hasDiscount
                ? Math.round(book.original_price * (1 - book.discount / 100))
                : null

              // ✅ FIXED IMAGE LOGIC (BASED ON YOUR SCHEMA)
              const image =
                typeof book.cover_Img?.url === "string" &&
                book.cover_Img.url.startsWith("http")
                  ? book.cover_Img.url
                  : "/placeholder.jpg"

              const mappedBook = {
                id: book._id,
                title: book.title,
                author: book.author,
                price: book.original_price || book.price,
                discountPrice,
                image,
                rating: 4.5,
              }

              return (
                <div
                  key={book._id}
                  className="flex-shrink-0 w-[280px] snap-start"
                >
                  <BookCard book={mappedBook} index={index} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
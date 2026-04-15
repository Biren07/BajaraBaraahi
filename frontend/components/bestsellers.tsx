"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/book-card"

const bestsellers = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60",
    isBestseller: true,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=60",
    isBestseller: true,
  },
  {
    id: "3",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 12.99,
    originalPrice: 17.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60",
    isBestseller: true,
  },
  {
    id: "4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 18.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&auto=format&fit=crop&q=60",
    isBestseller: true,
  },
  {
    id: "5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 15.99,
    originalPrice: 22.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&auto=format&fit=crop&q=60",
    isBestseller: true,
  },
  {
    id: "6",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 13.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=400&auto=format&fit=crop&q=60",
    isBestseller: true,
  },
]

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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
              <Button
                variant="outline"
                size="icon"
                className="border-gold/30 hover:bg-gold hover:text-primary-foreground hover:border-gold"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gold/30 hover:bg-gold hover:text-primary-foreground hover:border-gold"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <Link href="/bestsellers">
              <Button
                variant="ghost"
                className="text-gold hover:bg-gold/10 font-semibold group"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Books Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bestsellers.map((book, index) => (
            <div
              key={book.id}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <BookCard book={book} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

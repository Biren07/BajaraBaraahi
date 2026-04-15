"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/book-card"

const newArrivals = [
  {
    id: "7",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    price: 17.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&auto=format&fit=crop&q=60",
    isNew: true,
  },
  {
    id: "8",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&auto=format&fit=crop&q=60",
    isNew: true,
  },
  {
    id: "9",
    title: "Sea of Tranquility",
    author: "Emily St. John Mandel",
    price: 14.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=60",
    isNew: true,
  },
  {
    id: "10",
    title: "The House in the Pines",
    author: "Ana Reyes",
    price: 16.99,
    originalPrice: 21.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=60",
    isNew: true,
  },
  {
    id: "11",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    price: 18.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512045482940-f37f5d2a0c01?w=400&auto=format&fit=crop&q=60",
    isNew: true,
  },
  {
    id: "12",
    title: "The Light We Carry",
    author: "Michelle Obama",
    price: 24.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&auto=format&fit=crop&q=60",
    isNew: true,
  },
]

export function NewArrivals() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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
            Explore fresh arrivals and find your next great read from emerging and established authors.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>

        {/* View All Button */}
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

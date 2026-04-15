"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const authors = [
  {
    id: "1",
    name: "James Clear",
    initials: "JC",
    specialty: "Self-Help & Productivity",
    books: 3,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60",
    bgColor: "bg-amber-500",
  },
  {
    id: "2",
    name: "Michelle Obama",
    initials: "MO",
    specialty: "Memoir & Biography",
    books: 2,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    bgColor: "bg-rose-500",
  },
  {
    id: "3",
    name: "Haruki Murakami",
    initials: "HM",
    specialty: "Literary Fiction",
    books: 15,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    bgColor: "bg-blue-500",
  },
  {
    id: "4",
    name: "Colleen Hoover",
    initials: "CH",
    specialty: "Romance & Fiction",
    books: 12,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    bgColor: "bg-pink-500",
  },
  {
    id: "5",
    name: "Robert Greene",
    initials: "RG",
    specialty: "Psychology & Strategy",
    books: 6,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
    bgColor: "bg-emerald-500",
  },
  {
    id: "6",
    name: "Yuval Noah Harari",
    initials: "YH",
    specialty: "History & Philosophy",
    books: 4,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=60",
    bgColor: "bg-purple-500",
  },
]

export function FeaturedAuthors() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Meet the Masters
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
            <span className="text-foreground">Bestselling</span>{" "}
            <span className="text-gold">Authors</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Discover books by bestselling authors in our collection, ranked by popularity.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {authors.map((author, index) => (
            <Link
              key={author.id}
              href={`/author/${author.id}`}
              className={cn(
                "group flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-2",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(author.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div className={cn(
                  "w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-transparent transition-all duration-500",
                  hoveredId === author.id && "ring-gold scale-110"
                )}>
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Book Count Badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gold text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                  {author.books}
                </div>
              </div>

              {/* Info */}
              <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
                {author.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {author.specialty}
              </p>

              {/* View Books - appears on hover */}
              <div className={cn(
                "mt-3 flex items-center gap-1 text-gold text-sm font-medium opacity-0 translate-y-2 transition-all duration-300",
                hoveredId === author.id && "opacity-100 translate-y-0"
              )}>
                View Books
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/authors">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-primary-foreground px-8 py-6 text-lg font-semibold group transition-all duration-300"
            >
              View All Authors
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

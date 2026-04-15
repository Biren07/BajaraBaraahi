"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Lightbulb, Rocket, Heart, GraduationCap, Baby, Briefcase, Feather } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    count: 12500,
    color: "from-amber-500/20 to-amber-600/20",
    description: "Explore imaginative worlds",
  },
  {
    name: "Non-Fiction",
    icon: Lightbulb,
    count: 8900,
    color: "from-blue-500/20 to-blue-600/20",
    description: "Learn from real stories",
  },
  {
    name: "Science & Tech",
    icon: Rocket,
    count: 4500,
    color: "from-purple-500/20 to-purple-600/20",
    description: "Discover innovations",
  },
  {
    name: "Romance",
    icon: Heart,
    count: 6200,
    color: "from-pink-500/20 to-pink-600/20",
    description: "Stories of love",
  },
  {
    name: "Academic",
    icon: GraduationCap,
    count: 3800,
    color: "from-green-500/20 to-green-600/20",
    description: "Educational resources",
  },
  {
    name: "Children",
    icon: Baby,
    count: 5100,
    color: "from-orange-500/20 to-orange-600/20",
    description: "Books for young minds",
  },
  {
    name: "Business",
    icon: Briefcase,
    count: 4200,
    color: "from-slate-500/20 to-slate-600/20",
    description: "Grow your career",
  },
  {
    name: "Literature",
    icon: Feather,
    count: 7800,
    color: "from-rose-500/20 to-rose-600/20",
    description: "Classic masterpieces",
  },
]

export function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Browse by Genre
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
            <span className="text-primary-foreground">Explore</span>{" "}
            <span className="text-gold">Categories</span>
          </h2>
          <p className="text-primary-foreground/70 mt-3 max-w-lg mx-auto">
            Discover books across all genres. From thrilling fiction to insightful non-fiction.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(/ & /g, "-")}`}
                className={cn(
                  "group relative bg-primary-foreground/5 hover:bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all duration-500 overflow-hidden",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    category.color
                  )}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-4 transition-all duration-500",
                    hoveredIndex === index && "bg-gold scale-110"
                  )}>
                    <Icon className={cn(
                      "w-7 h-7 text-gold transition-colors duration-500",
                      hoveredIndex === index && "text-primary"
                    )} />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg text-primary-foreground group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/60 mt-1">
                    {category.description}
                  </p>
                  <p className="text-xs text-gold mt-2 font-medium">
                    {category.count.toLocaleString()} Books
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gold/0 group-hover:bg-gold flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

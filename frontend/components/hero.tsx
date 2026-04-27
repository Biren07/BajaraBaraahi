"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    title: "Discover Your Next",
    highlight: "Great Read",
    description:
      "Explore our curated collection of bestsellers, classics, and hidden gems from around the world.",
    image: "../images/hero1.jpg",
  },
  {
    title: "New Arrivals",
    highlight: "Just Landed",
    description:
      "Be the first to discover the latest releases from your favorite authors and emerging voices.",
    image: "../images/hero2.avif",
  },
  {
    title: "Up to 40% Off",
    highlight: "Summer Sale",
    description:
      "Grab your favorite books at unbeatable prices. Limited time offer on bestsellers.",
    image: "../images/hero3.jpeg",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const slide = slides[currentSlide]

  return (
    <section
      className="relative min-h-[100vh] flex items-center bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url('${slide.image}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-3xl text-center lg:text-left text-white">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Book Collection
          </div>

          <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {slide.title}
            <br />
            <span className="text-red-600">{slide.highlight}</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-lg">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            
            {/* Shop Now -> Cart Page */}
            <Link href="/bestsellers">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-800 px-8 py-6 text-lg font-semibold"
              >
                Shop now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-red-600 hover:text-white px-8 py-6 text-lg font-semibold"
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-red-500 w-8"
                : "bg-white/50 w-3"
            )}
          />
        ))}
      </div>
    </section>
  )
}
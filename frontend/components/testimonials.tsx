"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Book Enthusiast",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    rating: 5,
    text: "BajarBook has transformed my reading experience. The curated collection and fast delivery have made it my go-to bookstore.",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Literature Professor",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    rating: 5,
    text: "As an educator, I appreciate the wide range of academic and literary works available. The quality is consistently excellent.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Avid Reader",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    rating: 5,
    text: "The personalized recommendations are spot-on. Every book I’ve ordered has exceeded expectations.",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Book Collector",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
    rating: 5,
    text: "Finding rare books has never been easier. Excellent service and careful handling of valuable editions.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((p) => (p + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(
      (p) => (p - 1 + testimonials.length) % testimonials.length
    )
    setTimeout(() => setIsAnimating(false), 400)
  }

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[currentIndex]

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">

      {/* Decorative glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold text-sm uppercase tracking-[0.25em] font-medium">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            What Our Readers Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Real feedback from readers who love discovering books with us
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="relative max-w-5xl mx-auto">

          {/* Nav Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="absolute left-0 md:-left-10 top-1/2 -translate-y-1/2 rounded-full border-gold/30 hover:bg-gold hover:text-black transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 rounded-full border-gold/30 hover:bg-gold hover:text-black transition"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Card */}
          <div
            className={cn(
              "relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500",
              isAnimating ? "opacity-0 translate-y-3 scale-[0.98]" : "opacity-100"
            )}
          >

            {/* Quote mark */}
            <Quote className="absolute top-6 left-6 w-14 h-14 text-gold/20" />

            <div className="flex flex-col md:flex-row items-center gap-10">

              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-gold/20 shadow-lg">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">

                {/* Stars */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < t.rating ? "text-gold fill-gold" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
                  “{t.text}”
                </p>

                {/* Author */}
                <div className="mt-6">
                  <p className="font-semibold text-lg">{t.name}</p>
                  <p className="text-muted-foreground text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "transition-all duration-300 rounded-full",
                currentIndex === i
                  ? "w-8 h-2 bg-gold"
                  : "w-2 h-2 bg-gold/30 hover:bg-gold/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
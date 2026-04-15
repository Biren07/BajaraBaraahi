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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    rating: 5,
    text: "BajarBook has transformed my reading experience. The curated collection and fast delivery have made it my go-to bookstore. I&apos;ve discovered so many hidden gems!",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Literature Professor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    rating: 5,
    text: "As an educator, I appreciate the wide range of academic and literary works available. The quality of used books is exceptional, and the prices are unbeatable.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Avid Reader",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60",
    rating: 5,
    text: "The personalized recommendations are spot-on! Every book I&apos;ve ordered has exceeded my expectations. BajarBook truly understands what readers want.",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Book Collector",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    rating: 5,
    text: "Finding rare and collectible books has never been easier. The customer service is outstanding, and they handle precious editions with utmost care.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 text-gold/5">
        <Quote className="w-48 h-48" />
      </div>
      <div className="absolute bottom-20 right-10 text-gold/5 rotate-180">
        <Quote className="w-48 h-48" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            What Our Readers Say
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
            <span className="text-foreground">Customer</span>{" "}
            <span className="text-gold">Reviews</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 border-gold/30 hover:bg-gold hover:text-primary-foreground hover:border-gold"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 border-gold/30 hover:bg-gold hover:text-primary-foreground hover:border-gold"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Card */}
            <div
              className={cn(
                "bg-card rounded-3xl p-8 md:p-12 border border-border shadow-xl transition-all duration-500",
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-gold/30">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-gold mb-4 mx-auto md:mx-0" />

                  {/* Rating */}
                  <div className="flex items-center gap-1 justify-center md:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < testimonial.rating
                            ? "fill-gold text-gold"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
                    {`"${testimonial.text}"`}
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "bg-gold w-8"
                    : "bg-gold/30 hover:bg-gold/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

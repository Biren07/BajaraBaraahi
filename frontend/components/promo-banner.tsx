"use client"

import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/90" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      
      {/* Floating Books */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-10"
            style={{
              left: `${15 + i * 20}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            <BookOpen className="w-16 h-16 text-gold" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground leading-tight">
              Used Books Starting at{" "}
              <span className="text-gold">Just $5</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mt-4 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Explore a wide range of popular used books in excellent condition. 
              Great reads at unbeatable prices!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link href="/used-books">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-primary-foreground px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Explore Books
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/sell-books">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-6 text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
                >
                  Sell Your Books
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl md:text-5xl font-bold text-gold">$5</p>
              <p className="text-primary-foreground/80 mt-2">Starting Price</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl md:text-5xl font-bold text-gold">10K+</p>
              <p className="text-primary-foreground/80 mt-2">Used Books</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl md:text-5xl font-bold text-gold">A+</p>
              <p className="text-primary-foreground/80 mt-2">Quality Grade</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl md:text-5xl font-bold text-gold">Free</p>
              <p className="text-primary-foreground/80 mt-2">Over $50</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

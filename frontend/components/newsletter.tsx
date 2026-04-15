"use client"

import { useState } from "react"
import { Mail, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <Mail className="w-10 h-10 text-gold" />
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            <span className="text-foreground">Stay</span>{" "}
            <span className="text-gold">Updated</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg leading-relaxed">
            Subscribe to our newsletter and be the first to know about new arrivals, 
            exclusive offers, and reading recommendations.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {["New Releases", "Exclusive Deals", "Author Events", "Reading Tips"].map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-background px-3 py-1 rounded-full border border-border"
              >
                <Sparkles className="w-3 h-3 text-gold" />
                {benefit}
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitted}
                  className="w-full h-14 pl-12 pr-4 border-gold/30 focus:border-gold focus:ring-gold/20 rounded-full text-lg"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || isSubmitted}
                className={cn(
                  "h-14 px-8 rounded-full text-lg font-semibold transition-all duration-300",
                  isSubmitted
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gold hover:bg-gold-dark text-primary-foreground hover:scale-105"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Subscribed!
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
          </form>

          {/* Privacy Note */}
          <p className="text-sm text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

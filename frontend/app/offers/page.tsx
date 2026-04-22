"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, Percent, Gift, Tag, Zap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const flashDeals = [
  {
    id: "f1",
    title: "The Complete Works of Shakespeare",
    author: "William Shakespeare",
    price: 29.99,
    originalPrice: 89.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: "f2",
    title: "Encyclopedia of Science",
    author: "Various Authors",
    price: 24.99,
    originalPrice: 79.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: "f3",
    title: "World History Collection",
    author: "Dr. John Smith",
    price: 19.99,
    originalPrice: 59.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: "f4",
    title: "Masterclass in Photography",
    author: "Annie Leibovitz",
    price: 34.99,
    originalPrice: 99.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
  },
]

const weeklyDeals = [
  {
    id: "w1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 9.99,
    originalPrice: 24.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
  },
  {
    id: "w2",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 7.99,
    originalPrice: 19.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: "w3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 11.99,
    originalPrice: 26.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: "w4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 8.99,
    originalPrice: 22.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: "w5",
    title: "Educated",
    author: "Tara Westover",
    price: 10.99,
    originalPrice: 21.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
  },
  {
    id: "w6",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 6.99,
    originalPrice: 17.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
  },
  {
    id: "w7",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 5.99,
    originalPrice: 16.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: "w8",
    title: "Think Again",
    author: "Adam Grant",
    price: 12.99,
    originalPrice: 25.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
]

const bundleDeals = [
  {
    id: "b1",
    title: "Fiction Lovers Bundle",
    description: "5 bestselling fiction novels",
    price: 49.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    books: 5,
  },
  {
    id: "b2",
    title: "Self-Improvement Pack",
    description: "Transform your life with these 4 books",
    price: 39.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
    books: 4,
  },
  {
    id: "b3",
    title: "Business Masterclass",
    description: "6 essential books for entrepreneurs",
    price: 59.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    books: 6,
  },
]

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2">
      {[
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
        { value: timeLeft.seconds, label: "SEC" },
      ].map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg min-w-[50px] text-center">
            <span className="text-xl font-bold">{String(item.value).padStart(2, "0")}</span>
            <p className="text-[10px] opacity-70">{item.label}</p>
          </div>
          {index < 2 && <span className="text-2xl font-bold text-gold">:</span>}
        </div>
      ))}
    </div>
  )
}

export default function OffersPage() {
  const flashSaleEnd = new Date()
  flashSaleEnd.setHours(flashSaleEnd.getHours() + 12)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_var(--gold)_0%,_transparent_50%)] opacity-10" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_var(--gold)_0%,_transparent_50%)] opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Offers & Deals</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center animate-pulse">
              <Percent className="w-6 h-6 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground animate-fade-in-up">
              Hot <span className="text-gold">Deals</span>
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Save big on your favorite books! Limited-time offers, flash sales, and exclusive bundles at unbeatable prices.
          </p>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-12 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-y border-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center animate-pulse">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold">Flash Sale</h2>
                <p className="text-muted-foreground">Up to 70% off - Limited time only!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-gold" />
              <span className="text-sm text-muted-foreground">Ends in:</span>
              <CountdownTimer targetDate={flashSaleEnd} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Coupon Codes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
            Exclusive <span className="text-gold">Coupon Codes</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { code: "SUMMER20", discount: "20% OFF", description: "On all fiction books", expiry: "Valid till Aug 31" },
              { code: "FIRSTBUY", discount: "15% OFF", description: "For new customers", expiry: "One-time use" },
              { code: "BUNDLE25", discount: "25% OFF", description: "On bundle purchases", expiry: "Valid till Sep 15" },
            ].map((coupon, index) => (
              <div
                key={coupon.code}
                className="relative p-6 bg-card rounded-xl border-2 border-dashed border-gold/50 hover:border-gold transition-colors group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-gold text-primary-foreground">
                    <Tag className="w-3 h-3 mr-1" />
                    {coupon.discount}
                  </Badge>
                </div>
                <div className="pt-2">
                  <p className="text-muted-foreground text-sm mb-2">{coupon.description}</p>
                  <div className="flex items-center justify-between">
                    <code className="text-xl font-mono font-bold text-gold bg-gold/10 px-4 py-2 rounded-lg">
                      {coupon.code}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gold/50 hover:bg-gold hover:text-primary-foreground"
                      onClick={() => navigator.clipboard.writeText(coupon.code)}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{coupon.expiry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Deals */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Weekly Deals</h2>
              <p className="text-muted-foreground">50-70% off on selected titles</p>
            </div>
            <Link href="/bestsellers" className="hidden md:flex items-center gap-2 text-gold hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyDeals.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              <Gift className="w-8 h-8 text-gold inline-block mr-2 -mt-1" />
              Bundle & Save
            </h2>
            <p className="text-muted-foreground">Get more for less with our curated book bundles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundleDeals.map((bundle, index) => (
              <div
                key={bundle.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={bundle.image}
                    alt={bundle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-gold text-primary-foreground">
                      {bundle.books} Books Included
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-gold transition-colors">
                    {bundle.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{bundle.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gold">Rs. {bundle.price}</span>
                      <span className="text-sm text-muted-foreground line-through">Rs. {bundle.originalPrice}</span>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      Save Rs. {(bundle.originalPrice - bundle.price).toFixed(0)}
                    </Badge>
                  </div>

                  <Button className="w-full mt-4 bg-gold hover:bg-gold-dark text-primary-foreground">
                    Get Bundle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Free Shipping on Orders Over $50
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Plus, get an extra 10% off when you sign up for our newsletter. Stay updated on the latest deals!
          </p>
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-primary-foreground">
            Shop Now & Save
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

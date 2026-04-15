"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Sparkles, Calendar, TrendingUp } from "lucide-react"

const newBooks = {
  thisWeek: [
    {
      id: "n1",
      title: "The Last Symphony",
      author: "Elena Martinez",
      price: 18.99,
      originalPrice: 24.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "n2",
      title: "Digital Minds",
      author: "Dr. James Chen",
      price: 22.99,
      originalPrice: 29.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "n3",
      title: "Whispers in the Dark",
      author: "Sarah Blake",
      price: 15.99,
      originalPrice: 21.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "n4",
      title: "The Art of Resilience",
      author: "Michael Stone",
      price: 19.99,
      originalPrice: 26.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
      isNew: true,
    },
  ],
  thisMonth: [
    {
      id: "m1",
      title: "Echoes of Tomorrow",
      author: "Amanda Rivers",
      price: 16.99,
      originalPrice: 22.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m2",
      title: "The Hidden Garden",
      author: "Victoria Wells",
      price: 14.99,
      originalPrice: 19.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m3",
      title: "Code of Honor",
      author: "Robert Quinn",
      price: 20.99,
      originalPrice: 27.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m4",
      title: "Beyond the Stars",
      author: "Dr. Neil Foster",
      price: 24.99,
      originalPrice: 32.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m5",
      title: "The Silent Truth",
      author: "Kate Morrison",
      price: 17.99,
      originalPrice: 23.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m6",
      title: "Mindful Leadership",
      author: "David Chang",
      price: 21.99,
      originalPrice: 28.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m7",
      title: "The Lost Island",
      author: "Thomas Reed",
      price: 13.99,
      originalPrice: 18.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "m8",
      title: "Financial Freedom",
      author: "Lisa Park",
      price: 19.99,
      originalPrice: 25.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      isNew: true,
    },
  ],
  preOrder: [
    {
      id: "p1",
      title: "The Quantum Effect",
      author: "Dr. Richard Hayes",
      price: 26.99,
      originalPrice: 34.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "p2",
      title: "Secrets of the Deep",
      author: "Marina Costa",
      price: 23.99,
      originalPrice: 31.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "p3",
      title: "The Crown of Shadows",
      author: "Christopher Knight",
      price: 21.99,
      originalPrice: 28.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
      isNew: true,
    },
    {
      id: "p4",
      title: "AI Revolution",
      author: "Dr. Sarah Lin",
      price: 29.99,
      originalPrice: 39.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      isNew: true,
    },
  ],
}

export default function NewArrivalsPage() {
  const [activeTab, setActiveTab] = useState("thisWeek")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold rounded-full animate-pulse" style={{ animationDelay: "500ms" }} />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">New Arrivals</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-gold animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground animate-fade-in-up">
              New <span className="text-gold">Arrivals</span>
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Be the first to discover our latest additions. Fresh from the press, these titles are making waves in the literary world.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="thisWeek" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12">
              <TabsList className="bg-card border border-border p-1 rounded-full">
                <TabsTrigger
                  value="thisWeek"
                  className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground rounded-full px-6 py-2 transition-all"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  This Week
                </TabsTrigger>
                <TabsTrigger
                  value="thisMonth"
                  className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground rounded-full px-6 py-2 transition-all"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  This Month
                </TabsTrigger>
                <TabsTrigger
                  value="preOrder"
                  className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground rounded-full px-6 py-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Pre-Order
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="thisWeek" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">Fresh This Week</h2>
                <p className="text-muted-foreground">Hot off the press - just arrived in our collection</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newBooks.thisWeek.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="thisMonth" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">Monthly Highlights</h2>
                <p className="text-muted-foreground">All the exciting new releases from this month</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newBooks.thisMonth.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preOrder" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">Coming Soon</h2>
                <p className="text-muted-foreground">Reserve your copy before release - exclusive pre-order prices</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newBooks.preOrder.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Newsletter CTA */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl border border-gold/20 text-center">
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold mb-2">Never Miss a New Release</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to get instant notifications when your favorite authors release new books.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gold/30 bg-background focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              />
              <Button className="bg-gold hover:bg-gold-dark text-primary-foreground px-8 rounded-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

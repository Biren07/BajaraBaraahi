"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Sparkles, Calendar, TrendingUp, Loader2 } from "lucide-react"
import { bookService } from "@/services/bookService"



export default function NewArrivalsPage() {
  const [activeTab, setActiveTab] = useState("thisWeek")
  const [books, setBooks] = useState<{
    thisWeek: any[]
    thisMonth: any[]
    preOrder: any[]
  }>({
    thisWeek: [],
    thisMonth: [],
    preOrder: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNewArrivals()
  }, [])

  const fetchNewArrivals = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await bookService.getBooks({
        category: "new-arrivals",
        limit: 20, // Get enough books to distribute across tabs
      })

      const allBooks = response?.books || []

      // Map API response to component format
      const mappedBooks = allBooks.map((book: any) => {
        const originalPrice = book.original_price || book.price
        const hasDiscount = originalPrice && book.discount && book.discount > 0
        const discountPrice = hasDiscount
          ? Math.round(originalPrice * (1 - book.discount / 100))
          : null

        return {
          id: book._id,
          title: book.title,
          author: book.author,
          price: discountPrice || originalPrice,
          originalPrice: originalPrice,
          rating: 4.5, // Default rating since API doesn't provide
          image:
            typeof book.cover_Img?.url === "string" &&
            book.cover_Img.url.startsWith("http")
              ? book.cover_Img.url
              : "/placeholder.jpg",
          isNew: true,
        }
      })

      // Distribute books across tabs
      const totalBooks = mappedBooks.length
      const thisWeekCount = Math.min(4, totalBooks)
      const thisMonthCount = Math.min(8, Math.max(0, totalBooks - thisWeekCount))
      const preOrderCount = Math.max(0, totalBooks - thisWeekCount - thisMonthCount)

      setBooks({
        thisWeek: mappedBooks.slice(0, thisWeekCount),
        thisMonth: mappedBooks.slice(thisWeekCount, thisWeekCount + thisMonthCount),
        preOrder: mappedBooks.slice(thisWeekCount + thisMonthCount, thisWeekCount + thisMonthCount + preOrderCount),
      })
    } catch (err) {
      console.error("Failed to fetch new arrivals:", err)
      setError("Failed to load new arrivals")
    } finally {
      setLoading(false)
    }
  }

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
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : books.thisWeek.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No new arrivals this week</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {books.thisWeek.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="thisMonth" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">Monthly Highlights</h2>
                <p className="text-muted-foreground">All the exciting new releases from this month</p>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : books.thisMonth.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No new arrivals this month</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {books.thisMonth.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="preOrder" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">Coming Soon</h2>
                <p className="text-muted-foreground">Reserve your copy before release - exclusive pre-order prices</p>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : books.preOrder.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No pre-orders available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {books.preOrder.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                  ))}
                </div>
              )}
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

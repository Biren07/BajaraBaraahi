"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal, Grid3X3, LayoutList, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const allBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Fiction",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    originalPrice: 24.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Self-Help",
  },
  {
    id: "3",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 12.99,
    originalPrice: 17.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Fiction",
  },
  {
    id: "4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 15.99,
    originalPrice: 22.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Business",
  },
  {
    id: "5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 18.99,
    originalPrice: 26.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Science Fiction",
  },
  {
    id: "6",
    title: "The Four Winds",
    author: "Kristin Hannah",
    price: 13.99,
    originalPrice: 18.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Fiction",
  },
  {
    id: "7",
    title: "Think Again",
    author: "Adam Grant",
    price: 17.99,
    originalPrice: 25.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Self-Help",
  },
  {
    id: "8",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 11.99,
    originalPrice: 16.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Thriller",
  },
  {
    id: "9",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 19.99,
    originalPrice: 28.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Non-Fiction",
  },
  {
    id: "10",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Fiction",
  },
  {
    id: "11",
    title: "Educated",
    author: "Tara Westover",
    price: 15.99,
    originalPrice: 21.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Memoir",
  },
  {
    id: "12",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 9.99,
    originalPrice: 14.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    isBestseller: true,
    category: "Fiction",
  },
]

const categories = ["All", "Fiction", "Non-Fiction", "Self-Help", "Business", "Thriller", "Science Fiction", "Memoir"]

export default function BestsellersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [showFilters, setShowFilters] = useState(false)

  const filteredBooks = allBooks.filter((book) => {
    const inPriceRange = book.price >= priceRange[0] && book.price <= priceRange[1]
    const inCategory = selectedCategories.includes("All") || selectedCategories.includes(book.category)
    return inPriceRange && inCategory
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return 0
      default:
        return 0
    }
  })

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"])
    } else {
      const newCategories = selectedCategories.filter((c) => c !== "All")
      if (newCategories.includes(category)) {
        const filtered = newCategories.filter((c) => c !== category)
        setSelectedCategories(filtered.length === 0 ? ["All"] : filtered)
      } else {
        setSelectedCategories([...newCategories, category])
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gold/50 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Best Sellers</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in-up">
            Best <span className="text-gold">Sellers</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Discover our most loved books, handpicked by readers worldwide. From gripping fiction to life-changing non-fiction.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-32 space-y-8 bg-card p-6 rounded-xl border border-border">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-gold" />
                    Filters
                  </h3>
                </div>

                {/* Categories Filter */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <Label htmlFor={category} className="text-sm cursor-pointer hover:text-gold transition-colors">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full border-gold/30 hover:bg-gold/10 hover:text-gold"
                  onClick={() => {
                    setSelectedCategories(["All"])
                    setPriceRange([0, 50])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Books Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  {/* Mobile Filters Toggle */}
                  <Button
                    variant="outline"
                    className="lg:hidden border-gold/30 hover:bg-gold/10"
                    onClick={() => setShowFilters(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{sortedBooks.length}</span> books
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 border-gold/30">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "p-2 transition-colors",
                        viewMode === "grid" ? "bg-gold text-primary-foreground" : "hover:bg-muted"
                      )}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "p-2 transition-colors",
                        viewMode === "list" ? "bg-gold text-primary-foreground" : "hover:bg-muted"
                      )}
                    >
                      <LayoutList className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Books */}
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                )}
              >
                {sortedBooks.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-primary-foreground px-12">
                  Load More Books
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-gold" />
                Filters
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={`mobile-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <Label htmlFor={`mobile-${category}`} className="text-sm cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50}
                step={1}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full bg-gold hover:bg-gold-dark text-primary-foreground"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="w-full border-gold/30"
                onClick={() => {
                  setSelectedCategories(["All"])
                  setPriceRange([0, 50])
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

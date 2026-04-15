"use client"

import { useState } from "react"
import Link from "next/link"
import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal, Grid3X3, LayoutList, X, ChevronRight, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const categoryData: Record<string, { name: string; description: string }> = {
  fiction: { name: "Fiction", description: "Immerse yourself in captivating stories and imaginative worlds" },
  "non-fiction": { name: "Non-Fiction", description: "Expand your knowledge with real-world insights and wisdom" },
  business: { name: "Business & Finance", description: "Master the art of business, investing, and entrepreneurship" },
  "self-help": { name: "Self-Help", description: "Transform your life with personal development and wellness" },
  academic: { name: "Academic & Education", description: "Excel in your studies with comprehensive educational resources" },
  children: { name: "Children & Young Adults", description: "Nurture young minds with age-appropriate adventures" },
  science: { name: "Science & Technology", description: "Explore the wonders of science and cutting-edge technology" },
  arts: { name: "Arts & Photography", description: "Celebrate creativity through visual arts and design" },
  travel: { name: "Travel & Adventure", description: "Explore the world through travel guides and adventure stories" },
  history: { name: "History & Politics", description: "Understand our past to shape the future" },
  music: { name: "Music & Entertainment", description: "Dive into the world of music and entertainment" },
  cooking: { name: "Cooking & Food", description: "Discover culinary delights and cooking techniques" },
  sports: { name: "Sports & Fitness", description: "Stay active with sports and fitness guides" },
  movies: { name: "Film & Media", description: "Explore cinema history and media studies" },
  thriller: { name: "Thriller & Mystery", description: "Edge-of-your-seat suspense and gripping mysteries" },
  "science fiction": { name: "Science Fiction", description: "Journey to distant worlds and future possibilities" },
  memoir: { name: "Memoir & Biography", description: "Real stories from extraordinary lives" },
}

const generateBooks = (category: string) => {
  const authors = ["James Patterson", "Stephen King", "J.K. Rowling", "Dan Brown", "Michelle Obama", "Malcolm Gladwell", "Brené Brown", "Cal Newport"]
  const titles = [
    "The Hidden Path", "Midnight Echoes", "Beyond Tomorrow", "The Last Chapter",
    "Silent Whispers", "Infinite Horizons", "The Art of Wonder", "Timeless Journey",
    "Sacred Grounds", "The Final Hour", "Starlight Dreams", "Ocean of Secrets"
  ]
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: titles[i % titles.length],
    author: authors[i % authors.length],
    price: Number((9.99 + Math.random() * 20).toFixed(2)),
    originalPrice: Number((19.99 + Math.random() * 30).toFixed(2)),
    rating: Number((4 + Math.random()).toFixed(1)),
    image: `https://images.unsplash.com/photo-${
      ["1544947950-fa07a98d237f", "1512820790803-83ca734da794", "1543002588-bfa74002ed7e", "1592496431122-2349e0fbc666", "1495446815901-a7297e633e8d"][i % 5]
    }?w=400&h=600&fit=crop`,
    isBestseller: i < 3,
    isNew: i >= 9,
    category,
  }))
}

const subcategories = ["All", "Bestsellers", "New Releases", "Award Winners", "Editor Picks", "Under $10", "Classic"]

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const category = categoryData[slug] || { name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "), description: "Explore our collection" }
  const books = generateBooks(slug)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(["All"])
  const [showFilters, setShowFilters] = useState(false)

  const toggleSubcategory = (sub: string) => {
    if (sub === "All") {
      setSelectedSubcategories(["All"])
    } else {
      const newSubs = selectedSubcategories.filter((s) => s !== "All")
      if (newSubs.includes(sub)) {
        const filtered = newSubs.filter((s) => s !== sub)
        setSelectedSubcategories(filtered.length === 0 ? ["All"] : filtered)
      } else {
        setSelectedSubcategories([...newSubs, sub])
      }
    }
  }

  const filteredBooks = books.filter((book) => {
    return book.price >= priceRange[0] && book.price <= priceRange[1]
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/categories" className="hover:text-gold transition-colors">Categories</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{category.name}</span>
          </nav>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground animate-fade-in-up">
              {category.name}
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {category.description}
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

                {/* Subcategories Filter */}
                <div>
                  <h4 className="font-medium mb-3">Subcategories</h4>
                  <div className="space-y-2">
                    {subcategories.map((sub) => (
                      <div key={sub} className="flex items-center gap-2">
                        <Checkbox
                          id={sub}
                          checked={selectedSubcategories.includes(sub)}
                          onCheckedChange={() => toggleSubcategory(sub)}
                          className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <Label htmlFor={sub} className="text-sm cursor-pointer hover:text-gold transition-colors">
                          {sub}
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

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {["4 & above", "3 & above", "2 & above", "All ratings"].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <Checkbox
                          id={rating}
                          className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <Label htmlFor={rating} className="text-sm cursor-pointer hover:text-gold transition-colors">
                          {rating}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full border-gold/30 hover:bg-gold/10 hover:text-gold"
                  onClick={() => {
                    setSelectedSubcategories(["All"])
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

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button variant="outline" className="border-gold/30" disabled>
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={cn(
                      page === 1
                        ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                        : "border-gold/30 hover:bg-gold/10"
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  Next
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

            {/* Subcategories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Subcategories</h4>
              <div className="space-y-2">
                {subcategories.map((sub) => (
                  <div key={sub} className="flex items-center gap-2">
                    <Checkbox
                      id={`mobile-${sub}`}
                      checked={selectedSubcategories.includes(sub)}
                      onCheckedChange={() => toggleSubcategory(sub)}
                      className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <Label htmlFor={`mobile-${sub}`} className="text-sm cursor-pointer">
                      {sub}
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
                  setSelectedSubcategories(["All"])
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

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  X,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { bookService } from "@/services/bookService";
import toast from "react-hot-toast";

// Categories for filtering (matches backend GENRES)
const categories = [
  "All",
  "fiction",
  "romance",
  "action",
  "thriller",
  "horror",
  "fantasy",
  "biography",
  "self-help",
  "other",
];

export default function BestsellersPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch bestsellers from API
  useEffect(() => {
    fetchBestsellers();
  }, []);

  const fetchBestsellers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.getBooks({
        category: "best-selling",
      });

      setBooks(response?.books || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch bestsellers:", err);
      console.error("🔍 Error details:", {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      });

      setError(
        `Failed to load bestsellers: ${err.message || err.response?.data?.message || "Network error - check if backend is running"}`,
      );
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book: any) => {
    // Calculate discounted price
    const discountedPrice =
      book.original_price && book.discount
        ? book.original_price * (1 - book.discount / 100)
        : book.price;

    const inPriceRange =
      discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    const inCategory =
      selectedCategories.includes("All") ||
      selectedCategories.includes(book.genre || book.category);
    return inPriceRange && inCategory;
  });

  const sortedBooks = [...filteredBooks].sort((a: any, b: any) => {
    const getPrice = (book: any) => {
      return book.original_price && book.discount
        ? book.original_price * (1 - book.discount / 100)
        : book.price;
    };

    switch (sortBy) {
      case "price-low":
        return getPrice(a) - getPrice(b);
      case "price-high":
        return getPrice(b) - getPrice(a);
      case "rating":
        return (b.rating || 4.5) - (a.rating || 4.5);
      case "newest":
        return 0; // API doesn't provide date info
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const newCategories = selectedCategories.filter((c) => c !== "All");
      if (newCategories.includes(category)) {
        const filtered = newCategories.filter((c) => c !== category);
        setSelectedCategories(filtered.length === 0 ? ["All"] : filtered);
      } else {
        setSelectedCategories([...newCategories, category]);
      }
    }
  };

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
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Best Sellers</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in-up">
            Best <span className="text-gold">Sellers</span>
          </h1>
          <p
            className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Discover our most loved books, handpicked by readers worldwide. From
            gripping fiction to life-changing non-fiction.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}

            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#7a0f1e]" />
                    Filters
                  </h3>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 hover:text-[#7a0f1e]"
                    onClick={() => {
                      setSelectedCategories(["All"]);
                      setPriceRange([0, 20000]);
                    }}
                  >
                    Reset
                  </Button>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Categories */}
                <div>
                  <h4 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wide">
                    Categories
                  </h4>

                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category}
                        htmlFor={category}
                        className="flex items-center justify-between cursor-pointer rounded-md px-2 py-2 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                            className="h-4 w-4 border-gray-300 
                data-[state=checked]:bg-[#7a0f1e] 
                data-[state=checked]:border-[#7a0f1e]"
                          />
                          <span className="text-sm hover:text-[#7a0f1e] transition">
                            {category}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wide">
                    Price Range
                  </h4>

                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000}
                    step={100}
                    className="mb-5"
                  />

                  <div className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-md">
                    <span className="font-medium text-[#7a0f1e]">
                      Rs. {priceRange[0]}
                    </span>
                    <span className="text-gray-400">to</span>
                    <span className="font-medium text-[#7a0f1e]">
                      Rs. {priceRange[1]}
                    </span>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <Button
                  variant="outline"
                  className="w-full border-[#7a0f1e]/40 text-[#7a0f1e] hover:bg-[#7a0f1e]/10 hover:border-[#7a0f1e]"
                  onClick={() => {
                    setSelectedCategories(["All"]);
                    setPriceRange([0, 100]);
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
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {sortedBooks.length}
                    </span>{" "}
                    books
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
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "p-2 transition-colors",
                        viewMode === "grid"
                          ? "bg-gold text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "p-2 transition-colors",
                        viewMode === "list"
                          ? "bg-gold text-primary-foreground"
                          : "hover:bg-muted",
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
                    : "grid-cols-1",
                )}
              >
                {loading ? (
                  <div className="col-span-full flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gold" />
                  </div>
                ) : error ? (
                  <div className="col-span-full flex justify-center items-center py-12">
                    <div className="text-center">
                      <p className="text-red-600 mb-4">{error}</p>
                      <Button
                        onClick={fetchBestsellers}
                        className="bg-gold hover:bg-gold-dark text-primary-foreground"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : sortedBooks.length === 0 ? (
                  <div className="col-span-full flex justify-center items-center py-12">
                    <p className="text-muted-foreground">
                      No books found matching your filters.
                    </p>
                  </div>
                ) : (
                  sortedBooks.map((book: any, index) => {
                    // Map API data to BookCard format
                    const discountedPrice =
                      book.original_price && book.discount
                        ? book.original_price * (1 - book.discount / 100)
                        : book.price;

                    const mappedBook = {
                      id: book._id,
                      title: book.title,
                      author: book.author,
                      price: discountedPrice,
                      discountPrice:
                        book.original_price && book.discount
                          ? discountedPrice
                          : null,
                      originalPrice: book.original_price,
                      image:
                        book.cover_Img?.url &&
                        typeof book.cover_Img.url === "string" &&
                        book.cover_Img.url.trim()
                          ? book.cover_Img.url
                          : "/placeholder.jpg",
                      rating: 4.5, // Default rating since API doesn't provide it
                    };

                    return (
                      <BookCard
                        key={book._id}
                        book={mappedBook}
                        index={index}
                      />
                    );
                  })
                )}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-primary-foreground px-12"
                >
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
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-gold" />
                Filters
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
              >
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
                    <Label
                      htmlFor={`mobile-${category}`}
                      className="text-sm cursor-pointer"
                    >
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
                max={20000}
                step={100}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Rs. {priceRange[0]}</span>
                <span>Rs. {priceRange[1]}</span>
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
                  setSelectedCategories(["All"]);
                  setPriceRange([0, 20000]);
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
  );
}

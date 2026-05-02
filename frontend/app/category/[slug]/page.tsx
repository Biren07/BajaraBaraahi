"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { bookService } from "@/services/bookService";

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
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const category = categoryData[slug] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    description: "Explore our collection",
  };

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [slug]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.getBooks({ limit: 100 });
      const allBooks = response?.books || response?.data || response || [];
      
      // Filter books by genre matches slug
      const filteredByGenre = allBooks.filter((b: any) => b.genre === slug);
      setBooks(filteredByGenre);
    } catch (err: any) {
      console.error("Failed to fetch books:", err);
      setError("Failed to load books. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const mapBook = (book: any) => {
    const originalPrice = book.original_price || book.price || 0;
    const hasDiscount = book.discount && book.discount > 0;
    const discountedPrice = hasDiscount
      ? Math.round(originalPrice * (1 - book.discount / 100))
      : originalPrice;

    return {
      id: book._id,
      title: book.title,
      author: book.author,
      price: discountedPrice,
      discountPrice: hasDiscount ? discountedPrice : null,
      originalPrice: originalPrice,
      image: typeof book.cover_Img?.url === "string" && book.cover_Img.url.trim()
          ? book.cover_Img.url
          : "/placeholder.jpg",
      rating: book.rating || 4.5,
      stock: book.stock,
      category: category.name,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
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
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up">
            {category.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchBooks} variant="outline" className="border-gold text-gold">
                Try Again
              </Button>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No books found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book, index) => (
                <BookCard key={book._id} book={mapBook(book)} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
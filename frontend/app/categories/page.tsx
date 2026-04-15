"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  BookOpen, 
  Lightbulb, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Baby, 
  Beaker, 
  Palette,
  Globe,
  History,
  Music,
  Utensils,
  Dumbbell,
  Film,
  ChevronRight,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const mainCategories = [
  {
    id: "fiction",
    name: "Fiction",
    icon: BookOpen,
    description: "Immerse yourself in captivating stories and imaginative worlds",
    bookCount: 2450,
    color: "from-amber-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
    subcategories: ["Literary Fiction", "Mystery & Thriller", "Science Fiction", "Fantasy", "Romance", "Historical Fiction"]
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    icon: Lightbulb,
    description: "Expand your knowledge with real-world insights and wisdom",
    bookCount: 1890,
    color: "from-blue-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    subcategories: ["Biography", "History", "Science", "Philosophy", "True Crime", "Essays"]
  },
  {
    id: "business",
    name: "Business & Finance",
    icon: Briefcase,
    description: "Master the art of business, investing, and entrepreneurship",
    bookCount: 980,
    color: "from-green-500/20 to-emerald-500/20",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=400&fit=crop",
    subcategories: ["Entrepreneurship", "Leadership", "Marketing", "Investing", "Economics", "Personal Finance"]
  },
  {
    id: "self-help",
    name: "Self-Help",
    icon: Heart,
    description: "Transform your life with personal development and wellness",
    bookCount: 1250,
    color: "from-pink-500/20 to-rose-500/20",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&h=400&fit=crop",
    subcategories: ["Motivation", "Mindfulness", "Relationships", "Productivity", "Mental Health", "Spirituality"]
  },
  {
    id: "academic",
    name: "Academic & Education",
    icon: GraduationCap,
    description: "Excel in your studies with comprehensive educational resources",
    bookCount: 3200,
    color: "from-purple-500/20 to-violet-500/20",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=400&fit=crop",
    subcategories: ["Textbooks", "Study Guides", "Reference", "Test Prep", "Language Learning", "Professional Development"]
  },
  {
    id: "children",
    name: "Children & Young Adults",
    icon: Baby,
    description: "Nurture young minds with age-appropriate adventures",
    bookCount: 1680,
    color: "from-yellow-500/20 to-amber-500/20",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
    subcategories: ["Picture Books", "Early Readers", "Middle Grade", "Young Adult", "Educational", "Activity Books"]
  },
  {
    id: "science",
    name: "Science & Technology",
    icon: Beaker,
    description: "Explore the wonders of science and cutting-edge technology",
    bookCount: 890,
    color: "from-teal-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    subcategories: ["Physics", "Biology", "Chemistry", "Computer Science", "Engineering", "Mathematics"]
  },
  {
    id: "arts",
    name: "Arts & Photography",
    icon: Palette,
    description: "Celebrate creativity through visual arts and design",
    bookCount: 560,
    color: "from-indigo-500/20 to-purple-500/20",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=400&fit=crop",
    subcategories: ["Fine Art", "Photography", "Graphic Design", "Architecture", "Fashion", "Film & Cinema"]
  },
]

const additionalCategories = [
  { id: "travel", name: "Travel & Adventure", icon: Globe, count: 450 },
  { id: "history", name: "History & Politics", icon: History, count: 780 },
  { id: "music", name: "Music & Entertainment", icon: Music, count: 320 },
  { id: "cooking", name: "Cooking & Food", icon: Utensils, count: 540 },
  { id: "sports", name: "Sports & Fitness", icon: Dumbbell, count: 380 },
  { id: "movies", name: "Film & Media", icon: Film, count: 290 },
]

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold rounded-full animate-pulse" style={{ animationDelay: "500ms" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gold/50 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Categories</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in-up">
            Browse <span className="text-gold">Categories</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Explore our extensive collection organized by genre. Find your perfect read from over 15,000 titles across 20+ categories.
          </p>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity duration-500", category.color)} />
                  
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500",
                        "bg-gold/20 group-hover:bg-gold group-hover:scale-110"
                      )}>
                        <Icon className="w-7 h-7 text-gold group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
                        {category.bookCount.toLocaleString()} Books
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-gold transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>

                    {/* Subcategories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 4).map((sub) => (
                        <span
                          key={sub}
                          className="text-xs px-2 py-1 bg-background/50 rounded-full text-muted-foreground"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 4 && (
                        <span className="text-xs px-2 py-1 bg-gold/20 rounded-full text-gold">
                          +{category.subcategories.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-gold font-medium">
                      <span>Explore Category</span>
                      <ArrowRight className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        hoveredCategory === category.id ? "translate-x-2" : ""
                      )} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Categories */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">
            More <span className="text-gold">Categories</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-medium text-center text-sm mb-1 group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {category.count} Books
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Category Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop"
                alt="Featured Category"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <span className="inline-block px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-medium mb-4">
                  Featured Category
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
                  Literary Fiction Collection
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mb-6">
                  Dive into thought-provoking narratives that explore the human condition. Our curated selection features award-winning authors and timeless classics.
                </p>
                <Link
                  href="/category/fiction"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-primary-foreground font-semibold rounded-full hover:bg-gold-dark transition-all duration-300 hover:scale-105"
                >
                  Explore Fiction
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex gap-4">
                <div className="w-32 h-44 bg-gold/20 rounded-lg transform rotate-6 shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
                    alt="Book"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="w-32 h-44 bg-gold/20 rounded-lg transform -rotate-3 shadow-xl hidden sm:block">
                  <Image
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop"
                    alt="Book"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Categories" },
              { value: "15,000+", label: "Books Available" },
              { value: "500+", label: "Authors" },
              { value: "50,000+", label: "Happy Readers" },
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

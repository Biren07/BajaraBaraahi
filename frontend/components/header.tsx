"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science & Technology",
  "Business",
  "Self-Help",
  "Children",
  "Academic",
  "Literature",
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-gold/20"
          : "bg-transparent"
      )}
    >
      {/* Top Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <p className="animate-pulse">Free shipping on orders over $50</p>
          <div className="flex items-center gap-6">
            <Link href="/track-order" className="hover:text-gold transition-colors">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-gold transition-colors">
              Help & Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
              <span className="text-primary transition-colors group-hover:text-gold">Bajar</span>
              <span className="text-gold">Book</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-gold transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full"
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-gold transition-colors font-medium">
                Categories <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-card border-gold/20">
                <DropdownMenuItem className="hover:bg-gold/10 cursor-pointer font-semibold">
                  <Link href="/categories" className="w-full text-gold">
                    All Categories
                  </Link>
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} className="hover:bg-gold/10 cursor-pointer">
                    <Link href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="w-full">
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/bestsellers"
              className="text-foreground hover:text-gold transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full"
            >
              Best Sellers
            </Link>
            <Link
              href="/new-arrivals"
              className="text-foreground hover:text-gold transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full"
            >
              New Arrivals
            </Link>
            <Link
              href="/offers"
              className="text-gold font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full"
            >
              Offers
            </Link>
            <Link
              href="/ledger"
              className="text-foreground hover:text-gold transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              Ledger
            </Link>
            <Link
              href="/circle"
              className="text-foreground hover:text-gold transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Circle
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Input
                type="text"
                placeholder="Search for books, authors..."
                className="w-full pl-10 pr-4 py-2 border-gold/30 focus:border-gold focus:ring-gold/20 rounded-full transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gold/10 hover:text-gold"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-gold/10 hover:text-gold"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gold/10 hover:text-gold relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex hover:bg-gold/10 hover:text-gold"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gold/10 hover:text-gold"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isSearchOpen ? "max-h-20 mt-4" : "max-h-0"
          )}
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for books, authors..."
              className="w-full pl-10 pr-4 py-2 border-gold/30 focus:border-gold rounded-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-md",
          isMobileMenuOpen ? "max-h-screen border-t border-gold/20" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="py-2 text-foreground hover:text-gold transition-colors font-medium border-b border-border"
          >
            Home
          </Link>
          <div className="py-2 border-b border-border">
            <Link href="/categories" className="font-medium text-gold mb-2 block hover:underline">
              All Categories
            </Link>
            <div className="grid grid-cols-2 gap-2 pl-4 mt-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="text-sm py-1 text-foreground hover:text-gold transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/bestsellers"
            className="py-2 text-foreground hover:text-gold transition-colors font-medium border-b border-border"
          >
            Best Sellers
          </Link>
          <Link
            href="/new-arrivals"
            className="py-2 text-foreground hover:text-gold transition-colors font-medium border-b border-border"
          >
            New Arrivals
          </Link>
          <Link
            href="/offers"
            className="py-2 text-gold font-semibold border-b border-border"
          >
            Offers
          </Link>
          <Link
            href="/ledger"
            className="py-2 text-foreground hover:text-gold transition-colors font-medium border-b border-border flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Ledger
          </Link>
          <Link
            href="/circle"
            className="py-2 text-foreground hover:text-gold transition-colors font-medium border-b border-border flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Circle
          </Link>
          <div className="flex items-center gap-4 pt-2">
            <Button variant="outline" className="flex-1 border-gold/30 hover:bg-gold/10 hover:text-gold">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Link href="/wishlist" className="flex-1">
              <Button className="w-full bg-gold text-primary-foreground hover:bg-gold-dark">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWishlist } from "../context/wishlist-context";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  BookOpen,
  Users,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Logo from "./ui/logo";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science & Technology",
  "Business",
  "Self-Help",
  "Children",
  "Academic",
  "Literature",
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [openCategories, setOpenCategories] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-red/20"
          : "bg-transparent",
      )}
    >
     {/* Top Bar */}
<div className="hidden md:block bg-primary text-primary-foreground py-2 border-b border-white/5">
  <div className="container mx-auto px-4 flex items-center justify-center relative">
    
    {/* Animated Text Container */}
    <div className="flex items-center justify-center min-w-[300px]"> 
      <span className="typing-animation-loop text-md font-bold tracking-wider">
        Welcome to the BajraBarahi Book Suppliers
      </span>
    </div>

    {/* Help & Support (Right side) */}
    <div className="absolute right-4">
      <Link href="/help" className="text-[11px] uppercase font-bold opacity-70 hover:opacity-100 transition-opacity">
        Help & Support
      </Link>
    </div>
    
  </div>
</div>
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home */}
            <Link
              href="/"
              className="text-foreground hover:text-red transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red after:transition-all hover:after:w-full"
            >
              Home
            </Link>

            {/* Categories */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-red transition-colors font-medium">
                Genres <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-card border-red/20">
                <DropdownMenuItem className="hover:bg-red/10 cursor-pointer font-semibold">
                  <Link href="/categories" className="w-full text-red">
                    All Geners
                  </Link>
                </DropdownMenuItem>

                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className="hover:bg-red/10 cursor-pointer"
                  >
                    <Link
                      href={`/categories/${category
                        .toLowerCase()
                        .replace(/ & /g, "-")
                        .replace(/ /g, "-")}`}
                      className="w-full"
                    >
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Best Sellers */}
            <Link
              href="/bestsellers"
              className="text-foreground hover:text-red transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red after:transition-all hover:after:w-full"
            >
              Store Books
            </Link>

            {/* New Arrivals */}
            <Link
              href="/new-arrivals"
              className="text-foreground hover:text-red transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red after:transition-all hover:after:w-full"
            >
              New Arrivals
            </Link>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-red transition-colors font-medium">
                More <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-44 bg-card border-red/20">
                <DropdownMenuItem className="hover:bg-red/10 cursor-pointer">
                  <Link href="/offers" className="w-full">
                    Offers
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-red/10 cursor-pointer flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <Link href="/ledger" className="w-full">
                    Ledger
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-red/10 cursor-pointer flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <Link href="/circle" className="w-full">
                    Circle
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Input
                type="text"
                placeholder="Search for books, authors..."
                className="w-full pl-10 pr-4 py-2 border-red/30 focus:border-red focus:ring-red/20 rounded-full transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-red transition-colors" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-red/10 hover:text-red"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex hover:bg-red/10 hover:text-red relative"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-red/10 hover:text-red relative"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
            {/* User Profile Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex hover:bg-red/10 hover:text-red"
                  >
                    {user?.profileImage?.url ? (
                      <img
                        src={user?.profileImage?.url}
                        alt="Profile"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-card border-red/20">
                  <DropdownMenuItem className="hover:bg-red/10 cursor-pointer">
                    <Link
                      href="/profile"
                      className="w-full flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Visit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-red/10 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-red/10 hover:text-red"
                asChild
              >
                <Link href="/login">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            )}
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-red/10 hover:text-red"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isSearchOpen ? "max-h-20 mt-4" : "max-h-0",
          )}
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for books, authors..."
              className="w-full pl-10 pr-4 py-2 border-red/30 focus:border-red rounded-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
     <div
  className={cn(
    "lg:hidden fixed inset-x-0 top-[header-height] bg-background/98 backdrop-blur-md transition-all duration-300 ease-in-out overflow-y-auto border-t border-red/10",
    isMobileMenuOpen 
      ? "opacity-100 translate-y-0 visible h-[calc(100vh-70px)]" 
      : "opacity-0 -translate-y-4 invisible h-0"
  )}
>
  <nav className="container mx-auto px-6 py-8 flex flex-col gap-2">
    {/* AUTH BUTTONS Section */}
    <div className="grid grid-cols-2 gap-3 pb-6 border-b border-red/5">
      {user ? (
        <>
          <Button className="w-full bg-red text-white" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/profile" className="flex items-center justify-center">
              <User className="w-4 h-4 mr-2" /> Profile
            </Link>
          </Button>
          <Button variant="outline" className="w-full border-red/20" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" className="w-full border-red/20" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button className="w-full bg-red text-white" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/wishlist">Wishlist</Link>
          </Button>
        </>
      )}
    </div>

    {/* Navigation Links */}
    <div className="flex flex-col">
      <Link
        href="/"
        onClick={() => setIsMobileMenuOpen(false)}
        className="py-4 border-b border-red/5 text-lg font-medium active:text-red transition-colors"
      >
        Home
      </Link>

      {/* Categories Accordion */}
      <div className="border-b border-red/5">
        <button
          onClick={() => setOpenCategories(!openCategories)}
          className="flex items-center justify-between w-full py-4 text-lg font-medium"
        >
          Categories
          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", openCategories && "rotate-180")} />
        </button>
        <div className={cn(
          "grid grid-cols-2 gap-2 overflow-hidden transition-all duration-300",
          openCategories ? "max-h-64 pb-4" : "max-h-0"
        )}>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm py-2 text-muted-foreground hover:text-red"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/bestsellers"
        onClick={() => setIsMobileMenuOpen(false)}
        className="py-4 border-b border-red/5 text-lg font-medium"
      >
        Best Sellers
      </Link>

      {/* More Accordion */}
      <div className="border-b border-red/5">
        <button
          onClick={() => setOpenMore(!openMore)}
          className="flex items-center justify-between w-full py-4 text-lg font-medium"
        >
          More
          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", openMore && "rotate-180")} />
        </button>
        <div className={cn(
          "flex flex-col gap-3 overflow-hidden transition-all duration-300",
          openMore ? "max-h-40 pb-4" : "max-h-0"
        )}>
          <Link href="/offers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm py-1">
            Offers
          </Link>
          <Link href="/ledger" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm py-1">
            <BookOpen className="w-4 h-4" /> Ledger
          </Link>
        </div>
      </div>
    </div>
  </nav>
</div>    </header>
  );
}

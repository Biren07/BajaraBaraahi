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
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <p className="animate-pulse">Free shipping on orders over $50</p>
          <div className="flex items-center gap-6">
            <Link href="/help" className="hover:text-red transition-colors">
              Help & Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo/>
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
                Categories <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-card border-red/20">
                <DropdownMenuItem className="hover:bg-red/10 cursor-pointer font-semibold">
                  <Link href="/categories" className="w-full text-red">
                    All Categories
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
                        src={user.profileImage.url}
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
                    <Link href="/profile" className="w-full flex items-center gap-2">
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
          "lg:hidden overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-md",
          isMobileMenuOpen ? "max-h-screen border-t border-red/20" : "max-h-0",
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-4 pt-2">
            {user ? (
              <>
                <Button className="w-full bg-red text-primary-foreground hover:bg-red-dark" asChild>
                  <Link href="/profile">
                    {user.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt="Profile"
                        className="w-4 h-4 rounded-full object-cover mr-2"
                      />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red/30 hover:bg-red/10 hover:text-red"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full border-red/30 hover:bg-red/10 hover:text-red"
                  asChild
                >
                  <Link href="/login">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button className="w-full bg-red text-primary-foreground hover:bg-red-dark" asChild>
                  <Link href="/wishlist">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Link>
                </Button>
              </>
            )}
          </div>
          {/* Home */}
          <Link
            href="/"
            className="py-2 border-b border-border font-medium hover:text-red"
          >
            Home
          </Link>

          {/* Categories Dropdown */}
          <div className="border-b border-border pb-2">
            <button
              onClick={() => setOpenCategories(!openCategories)}
              className="flex items-center justify-between w-full py-2 font-medium hover:text-red"
            >
              Categories
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openCategories ? "rotate-180" : ""
                }`}
              />
            </button>

            {openCategories && (
              <div className="grid grid-cols-2 gap-2 pl-3 mt-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${category
                      .toLowerCase()
                      .replace(/ & /g, "-")
                      .replace(/ /g, "-")}`}
                    className="text-sm hover:text-red"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Best Sellers */}
          <Link
            href="/bestsellers"
            className="py-2 border-b border-border font-medium hover:text-red"
          >
            Best Sellers
          </Link>

          {/* New Arrivals */}
          <Link
            href="/new-arrivals"
            className="py-2 border-b border-border font-medium hover:text-red"
          >
            New Arrivals
          </Link>

          {/* MORE Dropdown */}
          <div className="border-b border-border pb-2">
            <button
              onClick={() => setOpenMore(!openMore)}
              className="flex items-center justify-between w-full py-2 font-medium hover:text-red"
            >
              More
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openMore ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMore && (
              <div className="flex flex-col gap-2 pl-3 mt-2">
                <Link href="/offers" className="hover:text-red">
                  Offers
                </Link>

                <Link
                  href="/ledger"
                  className="flex items-center gap-2 hover:text-red"
                >
                  <BookOpen className="w-4 h-4" />
                  Ledger
                </Link>

                <Link
                  href="/circle"
                  className="flex items-center gap-2 hover:text-red"
                >
                  <Users className="w-4 h-4" />
                  Circle
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

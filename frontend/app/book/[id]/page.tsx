"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { bookService } from "@/services/bookService";
import { cartService } from "@/services/cartService";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";

export default function BookPage() {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { refetchCart } = useCart();
  const { user } = useAuth();

  // Fetch book data
  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  // Check wishlist status when book or wishlist changes
  useEffect(() => {
    if (book && wishlist.length >= 0) {
      const isInWishlist = wishlist.some((item: any) => item._id === bookId);
      setLiked(isInWishlist);
    }
  }, [book, wishlist, bookId]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Since there's no individual book endpoint, fetch all books and find the matching one
      const response = await bookService.getBooks({ limit: 100 });
      const foundBook = response.books?.find((b: any) => b._id === bookId);

      if (!foundBook) {
        setError("Book not found");
        return;
      }

      setBook(foundBook);
    } catch (err: any) {
      console.error("Failed to fetch book details:", err);
      setError(err.response?.data?.message || "Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!book || addingToCart) return;

    if (!user) {
      toast.error("Login or Sign up first");
      return;
    }

    setAddingToCart(true);
    try {
      await cartService.addToCart(book._id, 1);
      await refetchCart();
      toast.success("Added to cart!");
    } catch (error: any) {
      console.error("Failed to add to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!book) return;

    if (!user) {
      toast.error("Login or Sign up first");
      return;
    }

    try {
      if (liked) {
        await removeFromWishlist(book._id);
        setLiked(false);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(book._id);
        setLiked(true);
        toast.success("Added to wishlist");
      }
    } catch (error: any) {
      console.error("Failed to toggle wishlist:", error);
      toast.error(error.message || "Failed to update wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6 text-gold" />
              <h1 className="text-2xl font-serif font-bold mb-4">Loading Book...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <h1 className="text-2xl font-serif font-bold mb-4">
                {error || "Book not found"}
              </h1>
              <Button onClick={fetchBookDetails} className="bg-gold hover:bg-gold-dark text-primary-foreground">
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discountedPrice = book.original_price && book.discount
    ? book.original_price * (1 - book.discount / 100)
    : book.price;

  const hasDiscount = book.original_price && book.discount && book.discount > 0;
  const savings = hasDiscount ? book.original_price - discountedPrice : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* MAIN */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="relative w-[320px] h-[440px] rounded-2xl overflow-hidden shadow-lg border">
              <Image
                src={book.cover_Img?.url || "/placeholder.jpg"}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">

            {/* TITLE */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {book.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                by {book.author}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">4.5</span>
              <span className="text-sm text-muted-foreground">
                (Based on reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#7a0f1e]">
                Rs. {discountedPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg line-through text-muted-foreground">
                    Rs. {book.original_price.toFixed(2)}
                  </span>
                  <span className="text-green-600 text-sm font-medium">
                    Save Rs. {savings.toFixed(2)} ({book.discount}% off)
                  </span>
                </>
              )}
            </div>

            {/* STOCK INFO */}
            <div className="text-sm">
              <span className={`font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {book.stock > 0 ? `In Stock (${book.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-2">

              {/* ADD TO CART */}
              <Button
                onClick={handleAddToCart}
                disabled={addingToCart || book.stock === 0}
                className="bg-[#7a0f1e] hover:bg-[#5c0c17] disabled:opacity-50 text-white px-8 py-6 text-base rounded-xl shadow-md transition-all"
              >
                {addingToCart ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>

              {/* WISHLIST */}
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                className={`px-6 py-6 rounded-xl border transition ${
                  liked
                    ? "border-red-500 text-red-500"
                    : "hover:border-[#7a0f1e] hover:text-[#7a0f1e]"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    liked ? "fill-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* DESCRIPTION */}
            <div className="pt-4 border-t">
              <h3 className="text-xl font-semibold mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* BOOK DETAILS */}
            <div className="pt-4 border-t">
              <h3 className="text-xl font-semibold mb-3">
                Book Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Genre:</span>
                  <span className="ml-2 capitalize">{book.genre}</span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Category:</span>
                  <span className="ml-2 capitalize">{book.category}</span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">ISBN:</span>
                  <span className="ml-2">{book.isbn}</span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Weight:</span>
                  <span className="ml-2">{book.weight}g</span>
                </div>
              </div>
            </div>

            {/* EXTRA INFO */}
            <div className="flex gap-6 text-sm text-muted-foreground pt-4">
              <span>📦 Free Delivery</span>
              <span>🔒 Secure Payment</span>
              <span>↩ Easy Returns</span>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
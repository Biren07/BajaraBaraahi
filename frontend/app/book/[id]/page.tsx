"use client";

import Image from "next/image";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";

const book = {
  id: "1",
  title: "Atomic Habits",
  author: "James Clear",
  price: 16.99,
  originalPrice: 24.99,
  rating: 4.9,
  description:
    "Atomic Habits is a powerful guide to building good habits and breaking bad ones. Transform your life with small changes that lead to remarkable results.",
  image:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
};

export default function BookPage() {
  const [liked, setLiked] = useState(false);

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
                src={book.image}
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
              <span className="font-medium">{book.rating}</span>
              <span className="text-sm text-muted-foreground">
                (1,200 reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#7a0f1e]">
                ${book.price}
              </span>
              <span className="text-lg line-through text-muted-foreground">
                ${book.originalPrice}
              </span>
              <span className="text-green-600 text-sm font-medium">
                Save ${(book.originalPrice - book.price).toFixed(2)}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-2">

              {/* ADD TO CART */}
              <Button
                className="bg-[#7a0f1e] hover:bg-[#5c0c17] text-white px-8 py-6 text-base rounded-xl shadow-md transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              {/* WISHLIST */}
              <Button
                variant="outline"
                onClick={() => setLiked(!liked)}
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
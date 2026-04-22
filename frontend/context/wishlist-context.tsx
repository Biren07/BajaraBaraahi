"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { bookService } from "@/services/bookService";

interface WishlistContextType {
  wishlist: any[];
  count: number;
  loading: boolean;
  incrementCount: () => void;
  decrementCount: () => void;
  addToWishlist: (bookId: string) => Promise<void>;
  removeFromWishlist: (bookId: string) => Promise<void>;
  refetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const count = wishlist.length;

  // ✅ Detect login properly (reactive)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Refetch when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else if (isLoggedIn === false) {
      setWishlist([]);
      setLoading(false);
    }
  }, [isLoggedIn]);

  // ✅ Fetch wishlist from API
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await bookService.getWishlist();

      const favorites =
        response?.favorites ||
        response?.data?.favorites ||
        response?.data ||
        [];

      setWishlist(Array.isArray(favorites) ? favorites : []);
    } catch (err: any) {
      console.error("Failed to fetch wishlist:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const incrementCount = () => {
    setWishlist((prev) => [...prev, {}]);
  };

  const decrementCount = () => {
    setWishlist((prev) => prev.slice(0, -1));
  };

  // ✅ Add item
  const addToWishlist = async (bookId: string) => {
    if (!isLoggedIn) {
      throw new Error("Please login first");
    }

    try {
      await bookService.toggleWishlist(bookId);

      // 🔥 instant UI update (optional but better UX)
      setWishlist((prev) => [...prev, { _id: bookId }]);

      // 🔁 sync with backend
      await fetchWishlist();
    } catch (error) {
      console.error("Failed to add:", error);
    }
  };

  const removeFromWishlist = async (bookId: string) => {
    if (!isLoggedIn) {
      throw new Error("Please login first");
    }

    try {
      await bookService.toggleWishlist(bookId);

      // 🔥 instant UI update
      setWishlist((prev) => prev.filter((item) => item._id !== bookId));
    } catch (error) {
      console.error("Failed to remove:", error);
    }
  };

  const refetchWishlist = async () => {
    await fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        count,
        loading,
        incrementCount,
        decrementCount,
        addToWishlist,
        removeFromWishlist,
        refetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
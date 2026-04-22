"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { cartService } from "@/services/cartService";

interface CartContextType {
  cartItems: any[];
  count: number;
  loading: boolean;
  refetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ ALWAYS fetch on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await cartService.getCart();

      // FIX: normalize response
      setCartItems(res?.data || res?.items || []);
    } catch (err) {
      console.error("Cart fetch failed", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const refetchCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, count, loading, refetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { cartService } from "@/services/cartService";
import toast from "react-hot-toast";

interface CartItem {
  cartItemId: string;
  _id: string;
  title: string;
  author: string;
  price: number;
  original_price?: number;
  discount?: number;
  effectivePrice: number;
  quantity: number;
  subtotal: number;
  cover_Img?: {
    url: string;
  };
  stock: number;
}

interface CartContextType {
  cartItems: CartItem[];
  count: number;
  loading: boolean;
  totalPrice: number;
  refetchCart: () => Promise<void>;
  updateQuantity: (bookId: string, newQuantity: number) => Promise<void>;
  removeItem: (bookId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

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

  const updateQuantity = async (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const itemIndex = cartItems.findIndex((item) => item._id === bookId);
    if (itemIndex === -1) return;

    const oldQuantity = cartItems[itemIndex].quantity;
    const oldSubtotal = cartItems[itemIndex].subtotal;
    const newSubtotal = cartItems[itemIndex].effectivePrice * newQuantity;

    // Optimistically update
    setCartItems((prev) =>
      prev.map((item, index) =>
        index === itemIndex
          ? { ...item, quantity: newQuantity, subtotal: newSubtotal }
          : item,
      ),
    );

    try {
      await cartService.updateCartQuantity(bookId, newQuantity);
      toast.success("Quantity updated");
    } catch (error: any) {
      // Revert
      setCartItems((prev) =>
        prev.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: oldQuantity, subtotal: oldSubtotal }
            : item,
        ),
      );

      console.error("Failed to update quantity:", error);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeItem = async (bookId: string) => {
    const itemIndex = cartItems.findIndex((item) => item._id === bookId);
    if (itemIndex === -1) return;

    const removedItem = cartItems[itemIndex];

    // Optimistically remove
    setCartItems((prev) => prev.filter((item) => item._id !== bookId));

    try {
      await cartService.removeFromCart(bookId);
      toast.success("Item removed from cart");
    } catch (error: any) {
      // Add back
      setCartItems((prev) => {
        const newItems = [...prev];
        newItems.splice(itemIndex, 0, removedItem);
        return newItems;
      });

      console.error("Failed to remove item:", error);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    if (!confirm("Are you sure you want to clear your entire cart?")) return;

    const oldItems = [...cartItems];

    setCartItems([]);

    try {
      await cartService.clearCart();
      toast.success("Cart cleared");
    } catch (error: any) {
      setCartItems(oldItems);

      console.error("Failed to clear cart:", error);
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        count,
        loading,
        totalPrice,
        refetchCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  addCartItem,
  getCartTotals,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart";
import type { AddToCartInput, CartItem, CartTotals } from "@/types/cart";

type CartContextValue = CartTotals & {
  items: CartItem[];
  addItem: (item: AddToCartInput) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
};

export const CART_STORAGE_KEY = "viesta-cart-v3";
const LEGACY_CART_STORAGE_KEYS = ["viesta-cart-v2"];

export const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    LEGACY_CART_STORAGE_KEYS.forEach((key) => {
      window.localStorage.removeItem(key);
    });

    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
    return rawValue ? (JSON.parse(rawValue) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readStoredCart());
      setHasHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [hasHydrated, items]);

  const addItem = useCallback((item: AddToCartInput) => {
    setItems((currentItems) => addCartItem(currentItems, item));
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((currentItems) => removeCartItem(currentItems, cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    setItems((currentItems) => updateCartItemQuantity(currentItems, cartItemId, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => getCartTotals(items), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ...totals,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [addItem, clearCart, items, removeItem, totals, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

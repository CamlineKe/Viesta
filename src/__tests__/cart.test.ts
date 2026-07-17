import { describe, expect, it } from "vitest";

import { CART_STORAGE_KEY } from "@/context/CartContext";
import {
  addCartItem,
  clampQuantity,
  getCartTotals,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart";
import type { CartItem } from "@/types/cart";

const item: CartItem = {
  id: "test-product:buy-1",
  productId: "test-product",
  name: "Test Product",
  slug: "test-product",
  offerId: "test-product-buy-1",
  offerLabel: "Buy 1",
  paidQuantity: 1,
  freeQuantity: 0,
  packsPerBundle: 1,
  packSize: "30 capsules",
  price: 1500,
  image: "/images/products/test-product.webp",
  quantity: 1,
};

describe("cart utilities", () => {
  it("uses a new storage namespace for the retail offer contract", () => {
    expect(CART_STORAGE_KEY).toBe("viesta-cart-v3");
  });

  it("adds new items and increments existing items", () => {
    const withItem = addCartItem([], item);
    const updated = addCartItem(withItem, { ...item, quantity: 2 });

    expect(updated).toHaveLength(1);
    expect(updated[0].quantity).toBe(3);
  });

  it("keeps product offers separate when their cart ids differ", () => {
    const firstOffer = {
      ...item,
      id: "test-product:buy-1",
      offerId: "buy-1",
      offerLabel: "Buy 1",
      price: 2800,
    };
    const secondOffer = {
      ...item,
      id: "test-product:buy-2-get-1-free",
      offerId: "buy-2-get-1-free",
      offerLabel: "Buy 2 Get 1 Free",
      paidQuantity: 2,
      freeQuantity: 1,
      packsPerBundle: 3,
      price: 4999,
    };

    const updated = addCartItem(addCartItem([], firstOffer), secondOffer);

    expect(updated).toHaveLength(2);
    expect(getCartTotals(updated)).toEqual({
      subtotal: 7799,
      itemCount: 4,
      bundleCount: 2,
    });
  });

  it("updates quantity and calculates totals", () => {
    const updated = updateCartItemQuantity([item], item.id, 3);

    expect(updated[0].quantity).toBe(3);
    expect(getCartTotals(updated)).toEqual({
      subtotal: 4500,
      itemCount: 3,
      bundleCount: 3,
    });
  });

  it("removes items", () => {
    expect(removeCartItem([item], item.id)).toEqual([]);
  });

  it("clamps invalid and excessive quantities", () => {
    expect(clampQuantity(Number.NaN)).toBe(1);
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(120)).toBe(99);
  });
});

import { describe, expect, it } from "vitest";

import {
  addCartItem,
  clampQuantity,
  getCartTotals,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart";
import type { CartItem } from "@/types/cart";

const item: CartItem = {
  id: "test-product",
  name: "Test Product",
  slug: "test-product",
  price: 1500,
  image: "/images/products/test-product.webp",
  quantity: 1,
};

describe("cart utilities", () => {
  it("adds new items and increments existing items", () => {
    const withItem = addCartItem([], item);
    const updated = addCartItem(withItem, { ...item, quantity: 2 });

    expect(updated).toHaveLength(1);
    expect(updated[0].quantity).toBe(3);
  });

  it("keeps product variants separate when their cart ids differ", () => {
    const firstVariant = {
      ...item,
      id: "test-product:small",
      variantId: "small",
      packSize: "20 sachets",
      price: 300,
    };
    const secondVariant = {
      ...item,
      id: "test-product:large",
      variantId: "large",
      packSize: "40 sachets",
      price: 450,
    };

    const updated = addCartItem(addCartItem([], firstVariant), secondVariant);

    expect(updated).toHaveLength(2);
    expect(getCartTotals(updated)).toEqual({ subtotal: 750, itemCount: 2 });
  });

  it("updates quantity and calculates totals", () => {
    const updated = updateCartItemQuantity([item], item.id, 3);

    expect(updated[0].quantity).toBe(3);
    expect(getCartTotals(updated)).toEqual({ subtotal: 4500, itemCount: 3 });
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

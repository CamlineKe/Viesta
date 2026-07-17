import type { AddToCartInput, CartItem, CartTotals } from "@/types/cart";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return MIN_QUANTITY;
  }

  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(quantity)));
}

export function addCartItem(items: CartItem[], input: AddToCartInput): CartItem[] {
  const quantity = clampQuantity(input.quantity ?? 1);
  const existingItem = items.find((item) => item.id === input.id);

  if (!existingItem) {
    return [...items, { ...input, quantity }];
  }

  return items.map((item) =>
    item.id === input.id ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
  );
}

export function removeCartItem(items: CartItem[], cartItemId: string): CartItem[] {
  return items.filter((item) => item.id !== cartItemId);
}

export function updateCartItemQuantity(
  items: CartItem[],
  cartItemId: string,
  quantity: number,
): CartItem[] {
  return items.map((item) =>
    item.id === cartItemId ? { ...item, quantity: clampQuantity(quantity) } : item,
  );
}

export function getCartTotals(items: CartItem[]): CartTotals {
  return items.reduce<CartTotals>(
    (totals, item) => ({
      subtotal: totals.subtotal + item.price * item.quantity,
      itemCount: totals.itemCount + item.packsPerBundle * item.quantity,
      bundleCount: totals.bundleCount + item.quantity,
    }),
    { subtotal: 0, itemCount: 0, bundleCount: 0 },
  );
}

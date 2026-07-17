import type { ProductPriceStatus } from "@/types/product";

import { formatKES } from "./currency";

type ProductPriceInput = {
  price: number;
  priceStatus?: ProductPriceStatus;
  offers?: Array<{ price: number }>;
};

export function hasConfirmedPrice(price: number): boolean {
  return Number.isFinite(price) && price > 0;
}

export function formatProductPrice(
  price: number,
  priceStatus?: ProductPriceStatus,
): string {
  if (priceStatus === "unconfirmed" || !hasConfirmedPrice(price)) {
    return "Price unconfirmed";
  }

  return formatKES(price);
}

export function formatProductDisplayPrice(product: ProductPriceInput): string {
  const price = formatProductPrice(product.price, product.priceStatus);
  const hasMultipleOptions = Boolean(
    product.offers?.length && product.offers.length > 1,
  );

  return hasMultipleOptions && hasConfirmedPrice(product.price)
    ? `From ${price}`
    : price;
}

export function formatProductCompareAtPrice(
  compareAtPrice?: number,
): string | null {
  return compareAtPrice && hasConfirmedPrice(compareAtPrice)
    ? `Was ${formatKES(compareAtPrice)}`
    : null;
}

export function formatProductLineTotal(
  price: number,
  quantity: number,
): string {
  return hasConfirmedPrice(price)
    ? formatProductPrice(price * quantity)
    : "Price unconfirmed";
}

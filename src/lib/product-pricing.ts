import type { ProductPriceStatus } from "@/types/product";

import { formatKES } from "./currency";

type TransitionalPriceStatus = ProductPriceStatus | "estimated";

type ProductPriceInput = {
  price: number;
  priceStatus?: TransitionalPriceStatus;
  offers?: Array<{ price: number }>;
  variants?: Array<{ price: number }>;
};

export function hasConfirmedPrice(price: number): boolean {
  return Number.isFinite(price) && price > 0;
}

export function hasEstimatedPrice(
  priceStatus: TransitionalPriceStatus | undefined,
): boolean {
  return priceStatus === "estimated";
}

export function formatProductPrice(
  price: number,
  priceStatus?: TransitionalPriceStatus,
): string {
  if (priceStatus === "unconfirmed" || !hasConfirmedPrice(price)) {
    return "Price unconfirmed";
  }

  const formattedPrice = formatKES(price);

  return hasEstimatedPrice(priceStatus)
    ? `Estimated ${formattedPrice}`
    : formattedPrice;
}

export function formatProductDisplayPrice(product: ProductPriceInput): string {
  const price = formatProductPrice(product.price, product.priceStatus);
  const hasMultipleOptions = Boolean(
    (product.offers?.length && product.offers.length > 1) ||
      (product.variants?.length && product.variants.length > 1),
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
  priceStatus?: TransitionalPriceStatus,
): string {
  return hasConfirmedPrice(price)
    ? formatProductPrice(price * quantity, priceStatus)
    : "Price unconfirmed";
}

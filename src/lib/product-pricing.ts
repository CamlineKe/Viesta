import { formatKES } from "./currency";

type ProductPriceInput = {
  price: number;
  priceStatus?: "confirmed" | "estimated";
  variants?: Array<{ price: number }>;
};

export function hasConfirmedPrice(price: number): boolean {
  return Number.isFinite(price) && price > 0;
}

export function hasEstimatedPrice(priceStatus: "confirmed" | "estimated" | undefined): boolean {
  return priceStatus === "estimated";
}

export function formatProductPrice(
  price: number,
  priceStatus?: "confirmed" | "estimated",
): string {
  if (!hasConfirmedPrice(price)) {
    return "Price to confirm";
  }

  const formattedPrice = formatKES(price);

  return hasEstimatedPrice(priceStatus) ? `Estimated ${formattedPrice}` : formattedPrice;
}

export function formatProductDisplayPrice(product: ProductPriceInput): string {
  const price = formatProductPrice(product.price, product.priceStatus);

  return product.variants?.length && hasConfirmedPrice(product.price) ? `From ${price}` : price;
}

export function formatProductLineTotal(
  price: number,
  quantity: number,
  priceStatus?: "confirmed" | "estimated",
): string {
  return hasConfirmedPrice(price) ? formatProductPrice(price * quantity, priceStatus) : "Price to confirm";
}

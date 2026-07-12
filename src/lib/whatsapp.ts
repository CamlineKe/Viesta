import type { CartItem } from "@/types/cart";
import type { CheckoutFormValues } from "@/types/checkout";

import { formatKES } from "./currency";
import { formatProductLineTotal, formatProductPrice, hasConfirmedPrice } from "./product-pricing";
import { getShippingZone } from "./shipping";
import { normalizeKenyanPhone } from "./validation";

type WhatsAppMessageInput = {
  items: CartItem[];
  checkout: CheckoutFormValues;
  subtotal: number;
  shippingFee: number | null;
  grandTotal: number | null;
  paymentInstruction: string;
};

type WhatsAppInquiryMessageInput = {
  siteName: string;
};

function formatOrderItemName(item: CartItem): string {
  return item.packSize ? `${item.name} - ${item.packSize}` : item.name;
}

export function buildWhatsAppMessage({
  items,
  checkout,
  subtotal,
  shippingFee,
  grandTotal,
  paymentInstruction,
}: WhatsAppMessageInput): string {
  const deliveryZone = getShippingZone(checkout.deliveryLocation);
  const hasUnpricedItems = items.some((item) => !hasConfirmedPrice(item.price));
  const hasEstimatedPrices = items.some((item) => item.priceStatus === "estimated");
  const productLines = items
    .map(
      (item) =>
        `- ${formatOrderItemName(item)} x${item.quantity} (${formatProductLineTotal(
          item.price,
          item.quantity,
          item.priceStatus,
        )})`,
    )
    .join("\n");
  const shippingText = shippingFee === null ? "Contact for shipping fee" : formatKES(shippingFee);
  const subtotalText = hasUnpricedItems
    ? "To be confirmed"
    : formatProductPrice(subtotal, hasEstimatedPrices ? "estimated" : undefined);
  const totalText =
    hasUnpricedItems || grandTotal === null
      ? "To be confirmed"
      : formatProductPrice(grandTotal, hasEstimatedPrices ? "estimated" : undefined);
  const address = checkout.deliveryAddress?.trim() || "Not provided";
  const orderNotes = checkout.orderNotes?.trim();

  const messageLines = [
    "Hello! I'd like to place an order:",
    "",
    "Products:",
    productLines,
    "",
    `Name: ${checkout.fullName.trim()}`,
    `Phone: ${normalizeKenyanPhone(checkout.phone)}`,
    `Delivery location: ${deliveryZone?.name ?? "Not selected"}`,
    `Delivery address: ${address}`,
  ];

  if (orderNotes) {
    messageLines.push(`Order notes: ${orderNotes}`);
  }

  return [
    ...messageLines,
    "",
    `Subtotal: ${subtotalText}`,
    `Shipping: ${shippingText}`,
    `Total: ${totalText}`,
    ...(hasEstimatedPrices ? ["", "Note: One or more product prices are estimated. Please confirm final pricing."] : []),
    "",
    paymentInstruction,
    "Please confirm my order.",
  ].join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const normalizedPhone = phoneNumber.replace(/[^\d]/g, "");

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppInquiryMessage({ siteName }: WhatsAppInquiryMessageInput): string {
  return [
    `Hello ${siteName},`,
    "",
    "I'd like to ask about your products, pricing, or delivery options.",
    "Please assist me.",
  ].join("\n");
}

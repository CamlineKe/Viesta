import type { CartItem } from "@/types/cart";
import type { CheckoutFormValues } from "@/types/checkout";

import { formatKES } from "./currency";
import { formatProductLineTotal, hasConfirmedPrice } from "./product-pricing";
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
  return `${item.name} - ${item.offerLabel}`;
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
  const productLines = items
    .map((item) => {
      const bundleLabel = `offer bundle${item.quantity === 1 ? "" : "s"}`;
      const totalPacks = item.packsPerBundle * item.quantity;

      return [
        `- ${formatOrderItemName(item)}: `,
        `${item.quantity} ${bundleLabel}, `,
        `${totalPacks} × ${item.packSize} total `,
        `(${formatProductLineTotal(item.price, item.quantity)})`,
      ].join("");
    })
    .join("\n");
  const shippingText =
    shippingFee === null ? "Contact for shipping fee" : formatKES(shippingFee);
  const subtotalText = hasUnpricedItems
    ? "To be confirmed"
    : formatKES(subtotal);
  const totalText =
    hasUnpricedItems || grandTotal === null
      ? "To be confirmed"
      : formatKES(grandTotal);
  const address = checkout.deliveryAddress?.trim() || "Not provided";
  const orderNotes = checkout.orderNotes?.trim();

  const messageLines = [
    "Hello! I'd like to request this order:",
    "",
    "Products:",
    productLines,
    "",
    `Name: ${checkout.fullName.trim()}`,
    `Phone: ${normalizeKenyanPhone(checkout.phone)}`,
    `Delivery location: ${deliveryZone?.name ?? "Not selected"}`,
    `Delivery address: ${address}`,
    ...(checkout.acceptedLegalPolicies
      ? [
          "Policy acknowledgement: I agreed to the Terms of Service and acknowledged the Privacy Policy.",
        ]
      : []),
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
    "",
    paymentInstruction,
    "Please confirm availability, the final total, delivery terms, payment instructions, and acceptance of this order.",
  ].join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const normalizedPhone = phoneNumber.replace(/[^\d]/g, "");

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppInquiryMessage({
  siteName,
}: WhatsAppInquiryMessageInput): string {
  return [
    `Hello ${siteName},`,
    "",
    "I'd like to ask about your products, pricing, or delivery options.",
    "Please assist me.",
  ].join("\n");
}

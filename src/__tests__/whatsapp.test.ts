import { describe, expect, it } from "vitest";

import {
  buildWhatsAppInquiryMessage,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

describe("WhatsApp utilities", () => {
  it("builds an order message with products and totals", () => {
    const message = buildWhatsAppMessage({
      items: [
        {
          id: "prod-004:bio1-sterol-capsules-buy-2-get-1-free",
          productId: "prod-004",
          name: "Bio1 Sterol",
          slug: "bio1-sterol-capsules",
          offerId: "bio1-sterol-capsules-buy-2-get-1-free",
          offerLabel: "Buy 2 Get 1 Free",
          paidQuantity: 2,
          freeQuantity: 1,
          packsPerBundle: 3,
          packSize: "30 capsules",
          price: 4999,
          image: "/images/products/bio1_sterol_capsule-cutout.webp",
          quantity: 2,
        },
      ],
      checkout: {
        fullName: "Jane Doe",
        phone: "0712345678",
        deliveryLocation: "nairobi",
        deliveryAddress: "Westlands",
        orderNotes: "Deliver after 5pm.",
        acceptedLegalPolicies: true,
      },
      subtotal: 9998,
      shippingFee: 0,
      grandTotal: 9998,
      paymentInstruction: "Send payment confirmation on WhatsApp.",
    });

    expect(message).toContain("Bio1 Sterol - Buy 2 Get 1 Free");
    expect(message).toContain(
      "2 offer bundles, 6 × 30 capsules total (Ksh 9,998)",
    );
    expect(message).toContain("Ksh");
    expect(message).toContain("Jane Doe");
    expect(message).toContain("Phone: +254712345678");
    expect(message).toContain("Delivery location: Nairobi");
    expect(message).toContain("Delivery address: Westlands");
    expect(message).toContain("Order notes: Deliver after 5pm.");
    expect(message).toContain("Total: Ksh");
    expect(message).toContain("I'd like to request this order");
    expect(message).toContain(
      "Policy acknowledgement: I agreed to the Terms of Service",
    );
    expect(message).toContain("Please confirm availability");
    expect(message).not.toContain("estimated");
  });

  it("withholds totals defensively when an invalid cart price is received", () => {
    const message = buildWhatsAppMessage({
      items: [
        {
          id: "test-product-pending-price",
          productId: "test-product-pending-price",
          name: "Test Product Pending Price",
          slug: "test-product-pending-price",
          offerId: "test-product-pending-price-buy-1",
          offerLabel: "Buy 1",
          paidQuantity: 1,
          freeQuantity: 0,
          packsPerBundle: 1,
          packSize: "30 capsules",
          price: 0,
          image: "/images/products/test-product.webp",
          quantity: 2,
        },
      ],
      checkout: {
        fullName: "Jane Doe",
        phone: "0712345678",
        deliveryLocation: "nairobi",
        deliveryAddress: "Westlands",
        orderNotes: "",
        acceptedLegalPolicies: true,
      },
      subtotal: 0,
      shippingFee: 0,
      grandTotal: 0,
      paymentInstruction: "Send payment confirmation on WhatsApp.",
    });

    expect(message).toContain("Test Product Pending Price - Buy 1");
    expect(message).toContain("Subtotal: To be confirmed");
    expect(message).toContain("Total: To be confirmed");
  });

  it("builds a wa.me URL", () => {
    expect(buildWhatsAppUrl("+254 700 000 000", "Hello")).toBe(
      "https://wa.me/254700000000?text=Hello",
    );
  });

  it("builds a general inquiry message", () => {
    expect(buildWhatsAppInquiryMessage({ siteName: "Viesta Nutrition" })).toBe(
      [
        "Hello Viesta Nutrition,",
        "",
        "I'd like to ask about your products, pricing, or delivery options.",
        "Please assist me.",
      ].join("\n"),
    );
  });
});

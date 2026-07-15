import { describe, expect, it } from "vitest";

import { buildWhatsAppInquiryMessage, buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

describe("WhatsApp utilities", () => {
  it("builds an order message with products and totals", () => {
    const message = buildWhatsAppMessage({
      items: [
        {
          id: "prod-026:bio-gluco-tea-bags-20",
          productId: "prod-026",
          name: "Bio Gluco Tea Bags",
          slug: "bio-gluco-tea-bags",
          variantId: "bio-gluco-tea-bags-20",
          variantLabel: "20 sachets",
          packSize: "20 sachets",
          minimumOrderQuantity: 100,
          price: 300,
          image: "/images/products/bio_gluco_teabags-cutout.webp",
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
      subtotal: 600,
      shippingFee: 0,
      grandTotal: 600,
      paymentInstruction: "Send payment confirmation on WhatsApp.",
    });

    expect(message).toContain("Bio Gluco Tea Bags - 20 sachets x2");
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
    expect(message).not.toContain("One or more product prices are estimated");
  });

  it("adds a pricing note when the order contains estimated prices", () => {
    const message = buildWhatsAppMessage({
      items: [
        {
          id: "test-product-pending-price",
          productId: "test-product-pending-price",
          name: "Test Product Pending Price",
          slug: "test-product-pending-price",
          packSize: "30s",
          minimumOrderQuantity: 100,
          price: 350,
          priceStatus: "estimated",
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
      subtotal: 700,
      shippingFee: 0,
      grandTotal: 700,
      paymentInstruction: "Send payment confirmation on WhatsApp.",
    });

    expect(message).toContain(
      "Test Product Pending Price - 30s x2 (Estimated Ksh",
    );
    expect(message).toContain("Total: Estimated Ksh");
    expect(message).toContain("One or more product prices are estimated. Please confirm final pricing.");
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

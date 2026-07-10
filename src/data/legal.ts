import type { LegalPage } from "@/types/content";

export const legalPages: LegalPage[] = [
  {
    slug: "returns-refund-policy",
    title: "Returns & Refund Policy",
    updatedAt: "2026-07-07",
    sections: [
      {
        heading: "Policy status",
        body: "This is draft legal content. The final returns and refund policy must be provided or reviewed before launch.",
      },
      {
        heading: "Order review",
        body: "Customers should review product names, quantities, delivery location, and payment instructions before sending an order through WhatsApp.",
      },
      {
        heading: "Returns and refunds",
        body: "Return windows, refund eligibility, damaged goods handling, and unopened product requirements need final business confirmation.",
      },
    ],
    needsConfirmation: ["final legal text", "return window", "refund eligibility"],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updatedAt: "2026-07-07",
    sections: [
      {
        heading: "Policy status",
        body: "This is draft legal content. The final privacy policy must confirm data collection, WhatsApp handoff, analytics, and contact form handling.",
      },
      {
        heading: "Information collected",
        body: "Checkout collects customer name, phone number, delivery location, optional address, and cart details to prepare a WhatsApp order message.",
      },
      {
        heading: "Third-party services",
        body: "Orders are handed off to WhatsApp. Any analytics, contact form tooling, or tracking scripts must be confirmed before launch and reflected in the final policy.",
      },
    ],
    needsConfirmation: ["final legal text", "analytics provider", "contact form handling"],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    updatedAt: "2026-07-07",
    sections: [
      {
        heading: "Policy status",
        body: "This is draft legal content. Final terms must be confirmed before launch.",
      },
      {
        heading: "Product information",
        body: "Product descriptions are for general wellness information and should not be treated as medical advice. Final product labels and claims need confirmation.",
      },
      {
        heading: "Orders and payment",
        body: "Orders are confirmed manually after the customer sends the WhatsApp order and payment confirmation. Paybill/Till details must be finalized before launch.",
      },
    ],
    needsConfirmation: ["final legal text", "payment terms", "order confirmation process"],
  },
];

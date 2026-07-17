import type { FAQ } from "@/types/content";

export const faqs: FAQ[] = [
  {
    id: "faq-shipping-001",
    category: "shipping",
    question: "Where do you deliver?",
    answer:
      "Viesta plans to deliver across Kenya. Nairobi and Kiambu are free zones, while Mombasa, Kisumu, Nakuru, and Eldoret have a KES 500 flat fee. Other locations need shipping confirmation.",
  },
  {
    id: "faq-shipping-002",
    category: "shipping",
    question: "How are shipping fees calculated?",
    answer:
      "Shipping is calculated during checkout from the selected delivery location. Nairobi and Kiambu are free, selected major towns are KES 500, and other locations are confirmed on WhatsApp.",
  },
  {
    id: "faq-orders-001",
    category: "orders",
    question: "How do I place an order?",
    answer:
      "Add products to your cart, complete checkout, agree to the Terms of Service and acknowledge the Privacy Policy, then send the prepared order request through WhatsApp. Viesta confirms availability, the final total, delivery terms, payment instructions, and acceptance in the conversation.",
  },
  {
    id: "faq-orders-002",
    category: "orders",
    question: "How do I confirm payment?",
    answer:
      "Wait for Viesta to confirm the order and the correct M-Pesa Paybill or Till details through WhatsApp before paying. After payment, share the confirmation message or screenshot in that conversation so payment can be verified.",
  },
  {
    id: "faq-products-001",
    category: "products",
    question: "Are product details final?",
    answer:
      "Confirmed retail promotional prices are currently available for Bio1 Sterol, Bio1 Gluco, BioRelief, BioForge, and BioFlex. Other products show Price unconfirmed and cannot be added to the cart. Product label details, ingredients, usage directions, warnings, stock status, and health claims still require business confirmation.",
  },
  {
    id: "faq-products-002",
    category: "products",
    question: "Can Viesta recommend a supplement for a medical condition?",
    answer:
      "Blog and product content is educational and general. Customers with medical conditions, pregnancy, allergies, or prescription medication should speak with a qualified healthcare professional before using supplements.",
  },
  {
    id: "faq-returns-001",
    category: "returns",
    question: "What is the returns policy?",
    answer:
      "Viesta reviews damaged, defective, expired, missing, or incorrectly supplied products when they are reported within the applicable period. Visible damage, missing items, and incorrect items should be reported within 48 hours; expiry or a qualifying defect should be reported within 7 days.",
  },
  {
    id: "faq-returns-002",
    category: "returns",
    question: "Can opened supplements be returned?",
    answer:
      "Opened products are generally not returnable unless opening was reasonably necessary to discover a qualifying defect, expiry issue, incorrect supply, or another consumer right that cannot lawfully be excluded. Contact Viesta before returning a product.",
  },
];

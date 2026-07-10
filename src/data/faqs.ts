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
      "Add products to your cart, fill in checkout details, then use the WhatsApp order button to send your order summary to Viesta.",
  },
  {
    id: "faq-orders-002",
    category: "orders",
    question: "How do I confirm payment?",
    answer:
      "Checkout displays the Paybill/Till payment instructions. After payment, share the confirmation message or screenshot in the WhatsApp conversation so the order can be confirmed manually.",
  },
  {
    id: "faq-products-001",
    category: "products",
    question: "Are product details final?",
    answer:
      "All product prices are confirmed. Some product entries still contain draft label details, ingredients, usage directions, and product claims that must be confirmed before launch.",
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
      "The returns and refund policy is currently draft content and needs confirmation before launch.",
  },
  {
    id: "faq-returns-002",
    category: "returns",
    question: "Can opened supplements be returned?",
    answer:
      "Final return eligibility needs confirmation. For launch, keep return language conservative and confirm whether opened, damaged, or incorrectly delivered products are handled differently.",
  },
];

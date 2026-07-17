import type { NavItem, SiteContent } from "@/types/content";

export const siteContent: SiteContent = {
  name: "Viesta Nutrition",
  legalName: "Viesta Health Nutrition",
  tagline: "Nutrition and wellness products for Kenya.",
  description:
    "A static storefront for nutrition and health supplements with Kenyan delivery context, KES pricing, and WhatsApp checkout.",
  url: "https://viestanutrition.com",
  logo: "/icons/logo.svg",
  announcement: "Free shipping in Nairobi & Kiambu",
  currency: "KES",
  contact: {
    phone: "+254 707 440 013",
    whatsapp: "+254707440013",
    email: "viestaltd@gmail.com",
    address: "New Horizon Industrial Park, Ruiru, Kenya",
    needsConfirmation: false,
  },
  payment: {
    method: "Paybill/Till",
    displayName: "M-Pesa details confirmed on WhatsApp",
    accountLabel: "Account",
    accountValue: "Use your name or order number",
    instructions: "Viesta will confirm final M-Pesa Paybill/Till details on WhatsApp before you pay.",
    needsConfirmation: true,
  },
  seo: {
    defaultTitle: "Viesta Nutrition",
    defaultDescription:
      "Nutrition and wellness products in Kenya with WhatsApp ordering and local delivery.",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

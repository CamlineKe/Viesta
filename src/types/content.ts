export type NavItem = {
  label: string;
  href: string;
};

export type FAQCategory = "shipping" | "products" | "orders" | "returns";

export type FAQ = {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export type LegalPage = {
  slug: "returns-refund-policy" | "privacy-policy" | "terms-of-service";
  title: string;
  updatedAt: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  needsConfirmation?: string[];
};

export type SiteContent = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  announcement: string;
  currency: "KES";
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    needsConfirmation: boolean;
  };
  payment: {
    method: "Paybill/Till";
    displayName: string;
    accountLabel: string;
    accountValue: string;
    instructions: string;
    needsConfirmation: boolean;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
};

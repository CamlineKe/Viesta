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

export type LegalPageSlug =
  | "returns-refund-policy"
  | "privacy-policy"
  | "terms-of-service";

export type LegalReviewStatus =
  | "business-approved-legal-review-pending"
  | "legally-approved";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalPage = {
  slug: LegalPageSlug;
  title: string;
  summary: string;
  effectiveDate: string | null;
  updatedAt: string;
  reviewStatus: LegalReviewStatus;
  sections: LegalSection[];
  contactChannels: Array<"email" | "phone" | "whatsapp">;
  relatedPolicies: LegalPageSlug[];
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

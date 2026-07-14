export type BlogCategory =
  | "heart-blood-pressure"
  | "diabetes-support"
  | "detox-weight-wellness"
  | "immunity"
  | "joint-mobility"
  | "mens-womens-health"
  | "herbal-tea"
  | "customer-stories";

export type BlogPublicationStatus = "draft" | "published";

export type BlogCoverImage = {
  src: string;
  alt: string;
};

export type BlogParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type BlogHeadingBlock = {
  type: "heading";
  level: 2 | 3;
  id: string;
  text: string;
};

export type BlogListBlock = {
  type: "list";
  style: "ordered" | "unordered";
  items: string[];
};

export type BlogTableBlock = {
  type: "table";
  caption: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

export type BlogCalloutBlock = {
  type: "callout";
  kind: "information" | "key-takeaway" | "professional-help" | "warning";
  title: string;
  paragraphs: string[];
};

export type BlogContentBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogListBlock
  | BlogTableBlock
  | BlogCalloutBlock;

export type BlogSource = {
  title: string;
  publisher: string;
  url: string;
  reviewedAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  coverImage: BlogCoverImage;
  author: string;
  status: BlogPublicationStatus;
  publishedAt?: string;
  updatedAt?: string;
  readTimeMinutes: number;
  content: BlogContentBlock[];
  sources: BlogSource[];
  relatedProductSlugs?: string[];
  featured: boolean;
};

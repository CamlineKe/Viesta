export type BlogCategory = "nutrition-tips" | "fitness" | "ingredients" | "wellness";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
  content: string[];
  featured: boolean;
  needsConfirmation?: string[];
};

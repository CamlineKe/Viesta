export type ProductCategorySlug =
  | "blood-pressure-heart-health"
  | "joint-mobility-support"
  | "detox-digestive-wellness"
  | "immunity-general-wellness"
  | "mens-wellness"
  | "womens-wellness"
  | "diabetes";

export type ProductSubCategory = "mens-health" | "womens-health" | null;

export type ProductPriceStatus = "confirmed" | "unconfirmed";

export type ProductOffer = {
  id: string;
  label: string;
  paidQuantity: number;
  freeQuantity: number;
  totalQuantity: number;
  packSize: string;
  price: number;
  compareAtPrice?: number;
};

export type ProductVariant = {
  id: string;
  label: string;
  packSize: string;
  price: number;
  priceStatus?: ProductPriceStatus;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategorySlug;
  subCategory: ProductSubCategory;
  price: number;
  priceStatus: ProductPriceStatus;
  packSize?: string;
  offers?: ProductOffer[];
  variants?: ProductVariant[];
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  benefits: string[];
  usage: string;
  ingredients?: string;
  warnings?: string[];
  featured: boolean;
  inStock: boolean;
  needsConfirmation?: string[];
};

export type ProductCategory = {
  id: ProductCategorySlug;
  name: string;
  slug: ProductCategorySlug;
  description: string;
  image: string;
  featured: boolean;
};

export type ProductSortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

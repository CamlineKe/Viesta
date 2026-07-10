export type CartItem = {
  id: string;
  productId?: string;
  name: string;
  slug: string;
  variantId?: string;
  variantLabel?: string;
  packSize?: string;
  minimumOrderQuantity?: number;
  price: number;
  priceStatus?: "confirmed" | "estimated";
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type AddToCartInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

export type CartTotals = {
  subtotal: number;
  itemCount: number;
};

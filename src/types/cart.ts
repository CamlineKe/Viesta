export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  offerId: string;
  offerLabel: string;
  paidQuantity: number;
  freeQuantity: number;
  packsPerBundle: number;
  packSize: string;
  price: number;
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
  bundleCount: number;
};

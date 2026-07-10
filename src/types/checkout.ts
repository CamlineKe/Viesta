export type ShippingZoneId =
  | "nairobi"
  | "kiambu"
  | "mombasa"
  | "kisumu"
  | "nakuru"
  | "eldoret"
  | "other";

export type ShippingFee = number | null;

export type ShippingZone = {
  id: ShippingZoneId;
  name: string;
  fee: ShippingFee;
  description: string;
  requiresContact: boolean;
};

export type CheckoutFormValues = {
  fullName: string;
  phone: string;
  deliveryLocation: ShippingZoneId;
  deliveryAddress?: string;
  orderNotes?: string;
};

export type CheckoutValidationErrors = Partial<Record<keyof CheckoutFormValues, string>>;

import type { CheckoutFormValues, CheckoutValidationErrors } from "@/types/checkout";

const KENYA_PHONE_PATTERN = /^(?:\+254|254|0)?(7|1)\d{8}$/;

export function normalizeKenyanPhone(phone: string): string {
  const compact = phone.replace(/\s+/g, "");

  if (compact.startsWith("+254")) {
    return compact;
  }

  if (compact.startsWith("254")) {
    return `+${compact}`;
  }

  if (compact.startsWith("0")) {
    return `+254${compact.slice(1)}`;
  }

  return compact;
}

export function validateCheckout(values: CheckoutFormValues): CheckoutValidationErrors {
  const errors: CheckoutValidationErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!KENYA_PHONE_PATTERN.test(values.phone.replace(/\s+/g, ""))) {
    errors.phone = "Enter a valid Kenyan phone number.";
  }

  if (!values.deliveryLocation) {
    errors.deliveryLocation = "Select a delivery location.";
  }

  return errors;
}

export function hasCheckoutErrors(errors: CheckoutValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

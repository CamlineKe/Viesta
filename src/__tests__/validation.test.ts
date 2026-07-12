import { describe, expect, it } from "vitest";

import { hasCheckoutErrors, normalizeKenyanPhone, validateCheckout } from "@/lib/validation";

describe("checkout validation", () => {
  it("normalizes Kenyan phone numbers", () => {
    expect(normalizeKenyanPhone("0712 345 678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("254712345678")).toBe("+254712345678");
  });

  it("validates required checkout fields", () => {
    const errors = validateCheckout({
      fullName: "",
      phone: "123",
      deliveryLocation: "",
    });

    expect(hasCheckoutErrors(errors)).toBe(true);
    expect(errors.fullName).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.deliveryLocation).toBeDefined();
  });
});

import { describe, expect, it } from "vitest";

import {
  formatProductCompareAtPrice,
  formatProductDisplayPrice,
  formatProductLineTotal,
  formatProductPrice,
} from "@/lib/product-pricing";

describe("product pricing helpers", () => {
  it("formats confirmed and unconfirmed retail prices distinctly", () => {
    expect(formatProductPrice(2800, "confirmed")).toBe("Ksh 2,800");
    expect(formatProductPrice(2800, "unconfirmed")).toBe(
      "Price unconfirmed",
    );
  });

  it("formats a valid previous retail price", () => {
    expect(formatProductCompareAtPrice(5999)).toBe("Was Ksh 5,999");
    expect(formatProductCompareAtPrice()).toBeNull();
  });

  it("formats confirmed offer line totals", () => {
    expect(formatProductLineTotal(4999, 2)).toBe("Ksh 9,998");
  });

  it("formats multi-offer product prices from the lowest offer", () => {
    expect(
      formatProductDisplayPrice({
        price: 2800,
        priceStatus: "confirmed",
        offers: [{ price: 2800 }, { price: 4999 }, { price: 6999 }],
      }),
    ).toBe("From Ksh 2,800");
  });

  it("does not prefix an unconfirmed product price with From", () => {
    expect(
      formatProductDisplayPrice({
        price: 0,
        priceStatus: "unconfirmed",
      }),
    ).toBe("Price unconfirmed");
  });
});

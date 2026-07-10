import { describe, expect, it } from "vitest";

import { formatProductDisplayPrice, formatProductLineTotal, formatProductPrice } from "@/lib/product-pricing";

describe("product pricing helpers", () => {
  it("formats confirmed and estimated prices distinctly", () => {
    expect(formatProductPrice(350, "confirmed")).toBe("Ksh 350");
    expect(formatProductPrice(350, "estimated")).toBe("Estimated Ksh 350");
  });

  it("formats estimated line totals", () => {
    expect(formatProductLineTotal(300, 2, "estimated")).toBe("Estimated Ksh 600");
  });

  it("formats variant product display prices from the base price", () => {
    expect(
      formatProductDisplayPrice({
        price: 750,
        variants: [{ price: 750 }, { price: 1300 }],
      }),
    ).toBe("From Ksh 750");
  });
});

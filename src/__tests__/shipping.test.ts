import { describe, expect, it } from "vitest";

import { calculateGrandTotal, getShippingFee } from "@/lib/shipping";

describe("shipping utilities", () => {
  it("returns free shipping for Nairobi and Kiambu", () => {
    expect(getShippingFee("nairobi")).toBe(0);
    expect(getShippingFee("kiambu")).toBe(0);
  });

  it("returns KES 500 for paid zones", () => {
    expect(getShippingFee("mombasa")).toBe(500);
    expect(calculateGrandTotal(2000, "mombasa")).toBe(2500);
  });

  it("requires contact for other locations", () => {
    expect(getShippingFee("other")).toBeNull();
    expect(calculateGrandTotal(2000, "other")).toBeNull();
  });

  it("does not calculate shipping before a location is selected", () => {
    expect(getShippingFee("")).toBeNull();
    expect(calculateGrandTotal(2000, "")).toBeNull();
  });
});

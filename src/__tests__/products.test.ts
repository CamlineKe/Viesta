import { describe, expect, it } from "vitest";

import { products } from "@/data/products";

function getProduct(slug: string) {
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    throw new Error(`Product not found: ${slug}`);
  }

  return product;
}

describe("product pricing metadata", () => {
  it("keeps the inventory catalog at 26 products", () => {
    expect(products).toHaveLength(26);
  });

  it("has a price for every inventory product", () => {
    expect(products.every((product) => product.price > 0)).toBe(true);
  });

  it("tracks confirmed prices across the entire catalog", () => {
    expect(products.filter((product) => product.priceStatus === "estimated")).toHaveLength(0);
    expect(products.filter((product) => product.priceStatus === "confirmed")).toHaveLength(26);
  });

  it("applies exact single-pack pricing with pack size and MOQ", () => {
    expect(getProduct("bio1-sterol-capsules")).toMatchObject({
      price: 350,
      packSize: "30s",
      minimumOrderQuantity: 100,
    });

    expect(getProduct("bio1-gluco-plus")).toMatchObject({
      price: 450,
      packSize: "60s",
      minimumOrderQuantity: 100,
    });
  });

  it("applies variant pricing while using the lowest variant as the base price", () => {
    const product = getProduct("viesta-slimming-coffee");

    expect(product.price).toBe(750);
    expect(product.variants).toEqual([
      {
        id: "viesta-slimming-coffee-90",
        label: "90 capsules",
        packSize: "90 capsules",
        price: 750,
        minimumOrderQuantity: 100,
      },
      {
        id: "viesta-slimming-coffee-200",
        label: "200 capsules",
        packSize: "200 capsules",
        price: 1300,
        minimumOrderQuantity: 100,
      },
    ]);
  });

  it("applies the confirmed prices for formerly estimated products", () => {
    const confirmedPrices = {
      "bio1-gluco-capsules": 4000,
      "bio1-gluco-powder": 1500,
      "bio1-gluco-teabags": 2000,
      "bio1-sterol-powder": 1500,
      "bio1-sterol-teabags": 2500,
      "bio-power-for-arthritis": 2000,
      "bio2-acidity-h-pylori": 3500,
      "bio-optic-capsules-vision-eye-health-support": 3500,
    };

    for (const [slug, price] of Object.entries(confirmedPrices)) {
      expect(getProduct(slug)).toMatchObject({ price, priceStatus: "confirmed" });
    }
  });

  it("removes price and stock confirmations only for products with confirmed prices", () => {
    expect(getProduct("bio1-sterol-capsules").needsConfirmation).not.toContain("price");
    expect(getProduct("bio1-sterol-capsules").needsConfirmation).not.toContain("stock status");
  });

  it("removes price and stock confirmations for newly confirmed products", () => {
    const confirmedProduct = getProduct("bio1-gluco-powder");

    expect(confirmedProduct.needsConfirmation).not.toContain("price");
    expect(confirmedProduct.needsConfirmation).not.toContain("stock status");
  });
});

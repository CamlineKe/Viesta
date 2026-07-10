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

  it("tracks confirmed and estimated price status across the catalog", () => {
    expect(products.filter((product) => product.priceStatus === "estimated")).toHaveLength(8);
    expect(products.filter((product) => product.priceStatus === "confirmed")).toHaveLength(18);
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

  it("marks previously ambiguous or missing prices as estimated", () => {
    expect(getProduct("bio1-gluco-capsules")).toMatchObject({
      price: 350,
      priceStatus: "estimated",
      packSize: "30s",
      minimumOrderQuantity: 100,
    });

    expect(getProduct("bio1-gluco-teabags")).toMatchObject({
      price: 300,
      priceStatus: "estimated",
      packSize: "20 tea bags",
      minimumOrderQuantity: 100,
    });

    expect(getProduct("bio-power-for-arthritis")).toMatchObject({
      price: 500,
      priceStatus: "estimated",
      packSize: "30s",
      minimumOrderQuantity: 100,
    });
  });

  it("removes price and stock confirmations only for products with confirmed prices", () => {
    expect(getProduct("bio1-sterol-capsules").needsConfirmation).not.toContain("price");
    expect(getProduct("bio1-sterol-capsules").needsConfirmation).not.toContain("stock status");
  });

  it("keeps price confirmation but removes stock confirmation for estimated prices", () => {
    const estimatedProduct = getProduct("bio1-gluco-powder");

    expect(estimatedProduct.needsConfirmation).toContain("price");
    expect(estimatedProduct.needsConfirmation).not.toContain("stock status");
  });
});

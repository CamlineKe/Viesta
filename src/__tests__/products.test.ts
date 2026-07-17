import { describe, expect, it } from "vitest";

import { products } from "@/data/products";

const expectedSlugs = [
  "bio1-sterol-capsules",
  "bio1-sterol-plus",
  "bio1-sterol-sachets",
  "biorelief-capsules",
  "biorelief-plus",
  "biorelief-cream",
  "bio2-total-body-detox",
  "bio2-nutraceutical-tea",
  "bio-immune-booster-immunity-support-formula",
  "bio1-metabalance-metabolism-energy-support",
  "bioforge-capsules",
  "bioforge-plus",
  "bioflex",
  "bioflex-plus",
  "viesta-slimming-coffee",
  "bio1-gluco",
  "bio1-gluco-plus",
  "bio-gluco-tea-bags",
] as const;

const confirmedProducts = {
  "bio1-sterol-capsules": "Bio1 Sterol",
  "biorelief-capsules": "BioRelief",
  "bioforge-capsules": "BioForge",
  bioflex: "BioFlex",
  "bio1-gluco": "Bio1 Gluco",
} as const;

const expectedOffers = [
  {
    label: "Buy 1",
    paidQuantity: 1,
    freeQuantity: 0,
    totalQuantity: 1,
    packSize: "30 capsules",
    price: 2800,
    compareAtPrice: 5999,
  },
  {
    label: "Buy 2 Get 1 Free",
    paidQuantity: 2,
    freeQuantity: 1,
    totalQuantity: 3,
    packSize: "30 capsules",
    price: 4999,
    compareAtPrice: undefined,
  },
  {
    label: "Buy 3 Get 2 Free",
    paidQuantity: 3,
    freeQuantity: 2,
    totalQuantity: 5,
    packSize: "30 capsules",
    price: 6999,
    compareAtPrice: undefined,
  },
] as const;

const expectedCategoryCounts = {
  "blood-pressure-heart-health": 3,
  "joint-mobility-support": 3,
  "detox-digestive-wellness": 2,
  "immunity-general-wellness": 2,
  "mens-wellness": 2,
  "womens-wellness": 3,
  diabetes: 3,
};

describe("product inventory and retail pricing metadata", () => {
  it("contains exactly the 18 products in the current inventory", () => {
    expect(products.map((product) => product.slug)).toEqual(expectedSlugs);
  });

  it("matches the five confirmed retail promotion matrices", () => {
    const confirmed = products.filter(
      (product) => product.priceStatus === "confirmed",
    );

    expect(confirmed).toHaveLength(5);

    for (const product of confirmed) {
      expect(product.name).toBe(
        confirmedProducts[product.slug as keyof typeof confirmedProducts],
      );
      expect(product.packSize).toBe("30 capsules");
      expect(product.price).toBe(2800);
      expect(
        product.offers?.map((offer) => ({
          label: offer.label,
          paidQuantity: offer.paidQuantity,
          freeQuantity: offer.freeQuantity,
          totalQuantity: offer.totalQuantity,
          packSize: offer.packSize,
          price: offer.price,
          compareAtPrice: offer.compareAtPrice,
        })),
      ).toEqual(expectedOffers);
      expect(product.needsConfirmation).not.toContain("price");
      expect(product.needsConfirmation).toContain("stock status");
    }
  });

  it("keeps the remaining 13 products visible with unconfirmed prices", () => {
    const unconfirmed = products.filter(
      (product) => product.priceStatus === "unconfirmed",
    );

    expect(unconfirmed).toHaveLength(13);

    for (const product of unconfirmed) {
      expect(product.price).toBe(0);
      expect(product.offers).toBeUndefined();
      expect(product.packSize).toBeTruthy();
      expect(product.needsConfirmation).toContain("price");
    }
  });

  it("does not expose wholesale minimum-order metadata", () => {
    for (const product of products) {
      expect("minimumOrderQuantity" in product).toBe(false);
      expect(
        product.offers?.some(
          (offer) => "minimumOrderQuantity" in offer,
        ) ?? false,
      ).toBe(false);
    }
  });

  it("matches the documented seven-category distribution", () => {
    const actualCategoryCounts = products.reduce<Record<string, number>>(
      (counts, product) => {
        counts[product.category] = (counts[product.category] ?? 0) + 1;
        return counts;
      },
      {},
    );

    expect(actualCategoryCounts).toEqual(expectedCategoryCounts);
  });
});

import { describe, expect, it } from "vitest";

import { products } from "@/data/products";

const expectedCatalog = {
  "bio1-sterol-capsules": {
    name: "Bio1 Sterol",
    packs: [{ packSize: "30s", price: 350 }],
  },
  "bio1-sterol-plus": {
    name: "Bio1 Sterol Plus",
    packs: [{ packSize: "60s", price: 450 }],
  },
  "bio1-sterol-sachets": {
    name: "Bio1 Sterol Sachets",
    packs: [
      { packSize: "20 sachets", price: 300 },
      { packSize: "40 sachets", price: 450 },
    ],
  },
  "biorelief-capsules": {
    name: "BioRelief",
    packs: [{ packSize: "30s", price: 350 }],
  },
  "biorelief-plus": {
    name: "BioRelief Plus",
    packs: [{ packSize: "60s", price: 450 }],
  },
  "biorelief-cream": {
    name: "BioRelief Cream",
    packs: [{ packSize: "50gms", price: 350 }],
  },
  "bio2-total-body-detox": {
    name: "Bio2 Total Body Detox",
    packs: [
      { packSize: "20 sachets", price: 300 },
      { packSize: "40 sachets", price: 450 },
    ],
  },
  "bio2-nutraceutical-tea": {
    name: "Bio2 Nutraceutical Tea",
    packs: [
      { packSize: "10 tea bags", price: 100 },
      { packSize: "20 tea bags", price: 200 },
    ],
  },
  "bio-immune-booster-immunity-support-formula": {
    name: "Bio1 Immune Booster",
    packs: [
      { packSize: "20 sachets", price: 350 },
      { packSize: "40 sachets", price: 500 },
    ],
  },
  "bio1-metabalance-metabolism-energy-support": {
    name: "Bio Metabalance",
    packs: [{ packSize: "30s", price: 500 }],
  },
  "bioforge-capsules": {
    name: "BioForge",
    packs: [{ packSize: "30s", price: 350 }],
  },
  "bioforge-plus": {
    name: "BioForge Plus",
    packs: [{ packSize: "60s", price: 450 }],
  },
  bioflex: {
    name: "BioFlex",
    packs: [{ packSize: "30s", price: 350 }],
  },
  "bioflex-plus": {
    name: "BioFlex Plus",
    packs: [{ packSize: "60s", price: 450 }],
  },
  "viesta-slimming-coffee": {
    name: "Viesta Slimming Coffee",
    packs: [
      { packSize: "90 capsules", price: 750 },
      { packSize: "200 capsules", price: 1300 },
    ],
  },
  "bio1-gluco": {
    name: "Bio1 Gluco",
    packs: [{ packSize: "30s", price: 350 }],
  },
  "bio1-gluco-plus": {
    name: "Bio1 Gluco Plus",
    packs: [{ packSize: "60s", price: 450 }],
  },
  "bio-gluco-tea-bags": {
    name: "Bio Gluco Tea Bags",
    packs: [
      { packSize: "20 sachets", price: 300 },
      { packSize: "40 sachets", price: 450 },
    ],
  },
} as const;

const expectedCategoryCounts = {
  "blood-pressure-heart-health": 3,
  "joint-mobility-support": 3,
  "detox-digestive-wellness": 2,
  "immunity-general-wellness": 2,
  "mens-wellness": 2,
  "womens-wellness": 3,
  diabetes: 3,
};

describe("product inventory and pricing metadata", () => {
  it("contains exactly the 18 products in the current inventory", () => {
    expect(products.map((product) => product.slug)).toEqual(
      Object.keys(expectedCatalog),
    );
  });

  it("matches all 24 confirmed pack and price combinations", () => {
    let packCount = 0;

    for (const product of products) {
      const expected = expectedCatalog[product.slug as keyof typeof expectedCatalog];
      const actualPacks = product.variants?.length
        ? product.variants.map(({ packSize, price }) => ({ packSize, price }))
        : [{ packSize: product.packSize, price: product.price }];

      expect(product.name).toBe(expected.name);
      expect(actualPacks).toEqual(expected.packs);
      expect(product.price).toBe(
        Math.min(...expected.packs.map((pack) => pack.price)),
      );
      expect(product.priceStatus).toBe("confirmed");
      expect(
        product.minimumOrderQuantity ??
          product.variants?.[0]?.minimumOrderQuantity,
      ).toBe(100);
      expect(
        product.variants?.every(
          (variant) => variant.minimumOrderQuantity === 100,
        ) ?? true,
      ).toBe(true);

      packCount += actualPacks.length;
    }

    expect(packCount).toBe(24);
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

  it("does not request price or stock confirmation for confirmed inventory", () => {
    for (const product of products) {
      expect(product.needsConfirmation).not.toContain("price");
      expect(product.needsConfirmation).not.toContain("stock status");
    }
  });
});

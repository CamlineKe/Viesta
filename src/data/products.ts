import type {
  Product,
  ProductCategorySlug,
  ProductPriceStatus,
  ProductSubCategory,
  ProductVariant,
} from "@/types/product";

type ProductFormat =
  | "capsules"
  | "powder"
  | "teabags"
  | "sachets"
  | "cream"
  | "formula"
  | "tea"
  | "coffee";

type CategoryDraftContent = {
  label: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  usageNote: string;
  warnings: string[];
  needsConfirmation: string[];
};

type ProductSeed = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategorySlug;
  subCategory: ProductSubCategory;
  price?: number;
  priceStatus?: ProductPriceStatus;
  packSize?: string;
  minimumOrderQuantity?: number;
  variants?: ProductVariant[];
  image: string;
  format: ProductFormat;
  featured: boolean;
};

const standardConfirmations = [
  "price",
  "label description",
  "usage directions",
  "ingredients",
  "warnings",
  "stock status",
  "health claims",
];

const medicalConfirmations = [
  ...standardConfirmations,
  "medical-safe wording",
  "category overlap with blood sugar support",
];

const confirmedCommerceFields = new Set(["price", "stock status"]);

function getBasePrice(product: ProductSeed): number {
  if (typeof product.price === "number") {
    return product.price;
  }

  if (product.variants?.length) {
    return Math.min(...product.variants.map((variant) => variant.price));
  }

  return 0;
}

function hasConfirmedCommerceData(product: ProductSeed): boolean {
  return getBasePrice(product) > 0 && Boolean(product.packSize || product.variants?.length);
}

function getPriceStatus(product: ProductSeed): ProductPriceStatus | undefined {
  if (!hasConfirmedCommerceData(product)) {
    return undefined;
  }

  return product.priceStatus ?? "confirmed";
}

function getNeedsConfirmation(product: ProductSeed, content: CategoryDraftContent): string[] {
  if (!hasConfirmedCommerceData(product)) {
    return content.needsConfirmation;
  }

  if (getPriceStatus(product) === "estimated") {
    return content.needsConfirmation.filter((item) => item !== "stock status");
  }

  return content.needsConfirmation.filter((item) => !confirmedCommerceFields.has(item));
}

const categoryContent: Record<ProductCategorySlug, CategoryDraftContent> = {
  "blood-sugar-support": {
    label: "Blood Sugar Support",
    shortDescription: "Routine support for customers looking after everyday blood sugar wellness.",
    description:
      "This product is positioned for blood sugar wellness routines alongside balanced meals, movement, hydration, and regular monitoring where advised.",
    benefits: [
      "Supports a blood sugar wellness routine",
      "Fits structured daily health habits",
      "Listed for customers comparing glucose-support options",
    ],
    usageNote: "Use consistently with meals or timing guidance from the product label once confirmed.",
    warnings: [
      "Consult a qualified healthcare professional if you are managing diabetes, using glucose-lowering medication, pregnant, nursing, or under medical care.",
      "This product should not replace prescribed medicine, clinical monitoring, or medical advice.",
    ],
    needsConfirmation: medicalConfirmations,
  },
  "blood-pressure-heart-health": {
    label: "Blood Pressure & Heart Health",
    shortDescription: "Heart-conscious support for daily blood pressure and cardiovascular wellness routines.",
    description:
      "This product is positioned for heart-conscious wellness routines that may include balanced nutrition, physical activity, hydration, and regular blood pressure checks.",
    benefits: [
      "Supports a heart-conscious wellness routine",
      "Suitable for customers comparing blood pressure support options",
      "Designed for structured daily use once label directions are confirmed",
    ],
    usageNote: "Use only as directed on the confirmed label, especially if you monitor blood pressure regularly.",
    warnings: [
      "Consult a qualified healthcare professional if you have hypertension, heart disease, kidney disease, or use blood pressure or heart medication.",
      "This product should not replace prescribed medicine, clinical monitoring, or medical advice.",
    ],
    needsConfirmation: [...standardConfirmations, "medical-safe wording"],
  },
  "joint-mobility-support": {
    label: "Joint & Mobility Support",
    shortDescription: "Daily support for joint comfort, flexibility, and mobility wellness routines.",
    description:
      "This product is positioned for customers building a joint and mobility routine around active living, movement, recovery, and general musculoskeletal wellness.",
    benefits: [
      "Supports joint and mobility wellness routines",
      "Useful for active daily lifestyle support",
      "Available in formats that fit different routine preferences",
    ],
    usageNote: "Use as directed on the confirmed label and pair with appropriate movement and recovery habits.",
    warnings: [
      "Consult a qualified healthcare professional if you have a chronic joint condition, use medication, are pregnant, nursing, or under medical care.",
      "Stop use and seek advice if irritation or unexpected discomfort occurs.",
    ],
    needsConfirmation: standardConfirmations,
  },
  "detox-digestive-wellness": {
    label: "Detox & Digestive Wellness",
    shortDescription: "Gentle support for digestive comfort, detox routines, and everyday gut wellness.",
    description:
      "This product is positioned for digestive wellness routines focused on comfort, hydration, mindful eating, and gentle daily support.",
    benefits: [
      "Supports digestive wellness routines",
      "Fits gentle detox and hydration habits",
      "Useful for customers comparing gut-care options",
    ],
    usageNote: "Use as directed on the confirmed label and maintain adequate hydration.",
    warnings: [
      "Consult a qualified healthcare professional if you have ulcers, persistent acidity, H. pylori concerns, digestive disease, are pregnant, nursing, or use medication.",
      "This product should not replace diagnosis, treatment, or medical advice.",
    ],
    needsConfirmation: [...standardConfirmations, "medical-safe wording"],
  },
  "immunity-general-wellness": {
    label: "Immunity & General Wellness",
    shortDescription: "Everyday support for immunity, energy, vision, and general wellness routines.",
    description:
      "This product is positioned for general wellness routines that may include immune support, energy support, vision support, or daily nutritional habits depending on the final label.",
    benefits: [
      "Supports everyday wellness routines",
      "Helps customers compare general health support options",
      "Designed for daily use once label directions are confirmed",
    ],
    usageNote: "Use as directed on the confirmed label and follow any product-specific timing guidance.",
    warnings: [
      "Consult a qualified healthcare professional if you are pregnant, nursing, managing a health condition, or using medication.",
      "This product should not replace a balanced diet, prescribed treatment, or medical advice.",
    ],
    needsConfirmation: standardConfirmations,
  },
  "mens-wellness": {
    label: "Men's Wellness",
    shortDescription: "Targeted support for men's vitality and daily wellness routines.",
    description:
      "This product is positioned for men's wellness routines focused on vitality, consistency, and general daily health support.",
    benefits: [
      "Supports men's wellness routines",
      "Fits daily vitality support habits",
      "Useful for customers comparing targeted men's health options",
    ],
    usageNote: "Use as directed on the confirmed label and follow any age or medication guidance.",
    warnings: [
      "Consult a qualified healthcare professional if you use medication, have a chronic condition, or are under medical care.",
      "This product should not replace prescribed treatment or medical advice.",
    ],
    needsConfirmation: standardConfirmations,
  },
  "womens-wellness": {
    label: "Women's Wellness",
    shortDescription: "Targeted support for women's balance, beauty, and daily wellness routines.",
    description:
      "This product is positioned for women's wellness routines that may include balance, beauty, energy, or weight-management support depending on the final product label.",
    benefits: [
      "Supports women's wellness routines",
      "Fits daily balance and beauty support habits",
      "Useful for customers comparing targeted women's health options",
    ],
    usageNote: "Use as directed on the confirmed label and follow any product-specific preparation guidance.",
    warnings: [
      "Consult a qualified healthcare professional if you are pregnant, nursing, using medication, managing a health condition, or planning a weight-management routine.",
      "This product should not replace prescribed treatment, a balanced diet, or medical advice.",
    ],
    needsConfirmation: standardConfirmations,
  },
  diabetes: {
    label: "Diabetes",
    shortDescription: "Diabetes-category products for customers comparing glucose wellness options.",
    description:
      "This product is listed in the Diabetes category from the current inventory. Keep this category separate for now, but confirm whether it should merge with Blood Sugar Support before launch.",
    benefits: [
      "Listed for diabetes-category product discovery",
      "Supports comparison of glucose wellness options",
      "Designed for use only after label and medical-safe wording are confirmed",
    ],
    usageNote: "Use only as directed on the confirmed label and alongside professional guidance where applicable.",
    warnings: [
      "Consult a qualified healthcare professional before use if you are managing diabetes, using glucose-lowering medication, pregnant, nursing, or under medical care.",
      "This product should not replace prescribed medicine, blood sugar monitoring, diagnosis, treatment, or medical advice.",
    ],
    needsConfirmation: medicalConfirmations,
  },
};

const formatDetails: Record<ProductFormat, { benefit: string; usage: string }> = {
  capsules: {
    benefit: "Capsule format for straightforward daily use",
    usage: "Take the capsules",
  },
  powder: {
    benefit: "Powder format for flexible preparation",
    usage: "Prepare the powder",
  },
  teabags: {
    benefit: "Tea bag format for a simple beverage routine",
    usage: "Brew the tea bags",
  },
  sachets: {
    benefit: "Sachet format for convenient measured use",
    usage: "Prepare the sachets",
  },
  cream: {
    benefit: "Topical format for focused external application",
    usage: "Apply the cream externally",
  },
  formula: {
    benefit: "Formula option for targeted routine support",
    usage: "Use the formula",
  },
  tea: {
    benefit: "Tea format for a warm wellness routine",
    usage: "Brew the tea",
  },
  coffee: {
    benefit: "Coffee format for a familiar daily routine",
    usage: "Prepare the coffee",
  },
};

const productSeeds: ProductSeed[] = [
  {
    id: "prod-004",
    name: "Bio1 Sterol",
    slug: "bio1-sterol-capsules",
    category: "blood-pressure-heart-health",
    subCategory: null,
    price: 350,
    packSize: "30s",
    minimumOrderQuantity: 100,
    image: "/images/products/bio1_sterol_capsule-cutout.webp",
    format: "capsules",
    featured: true,
  },
  {
    id: "prod-007",
    name: "Bio1 Sterol Plus",
    slug: "bio1-sterol-plus",
    category: "blood-pressure-heart-health",
    subCategory: null,
    price: 450,
    packSize: "60s",
    minimumOrderQuantity: 100,
    image: "/images/products/bio1_sterol_plus-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-008",
    name: "Bio1 Sterol Sachets",
    slug: "bio1-sterol-sachets",
    category: "blood-pressure-heart-health",
    subCategory: null,
    variants: [
      {
        id: "bio1-sterol-sachets-20",
        label: "20 sachets",
        packSize: "20 sachets",
        price: 300,
        minimumOrderQuantity: 100,
      },
      {
        id: "bio1-sterol-sachets-40",
        label: "40 sachets",
        packSize: "40 sachets",
        price: 450,
        minimumOrderQuantity: 100,
      },
    ],
    image: "/images/products/bio1_sterol_sachets-cutout.webp",
    format: "sachets",
    featured: false,
  },
  {
    id: "prod-009",
    name: "BioRelief",
    slug: "biorelief-capsules",
    category: "joint-mobility-support",
    subCategory: null,
    price: 350,
    packSize: "30s",
    minimumOrderQuantity: 100,
    image: "/images/products/biorelief_capsules-cutout.webp",
    format: "capsules",
    featured: true,
  },
  {
    id: "prod-010",
    name: "BioRelief Plus",
    slug: "biorelief-plus",
    category: "joint-mobility-support",
    subCategory: null,
    price: 450,
    packSize: "60s",
    minimumOrderQuantity: 100,
    image: "/images/products/biorelief_plus-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-011",
    name: "BioRelief Cream",
    slug: "biorelief-cream",
    category: "joint-mobility-support",
    subCategory: null,
    price: 350,
    packSize: "50gms",
    minimumOrderQuantity: 100,
    image: "/images/products/biorelief_cream-cutout.webp",
    format: "cream",
    featured: false,
  },
  {
    id: "prod-013",
    name: "Bio2 Total Body Detox",
    slug: "bio2-total-body-detox",
    category: "detox-digestive-wellness",
    subCategory: null,
    variants: [
      {
        id: "bio2-total-body-detox-20",
        label: "20 sachets",
        packSize: "20 sachets",
        price: 300,
        minimumOrderQuantity: 100,
      },
      {
        id: "bio2-total-body-detox-40",
        label: "40 sachets",
        packSize: "40 sachets",
        price: 450,
        minimumOrderQuantity: 100,
      },
    ],
    image: "/images/products/bio2_total_body-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-014",
    name: "Bio2 Nutraceutical Tea",
    slug: "bio2-nutraceutical-tea",
    category: "detox-digestive-wellness",
    subCategory: null,
    variants: [
      {
        id: "bio2-nutraceutical-tea-10",
        label: "10 tea bags",
        packSize: "10 tea bags",
        price: 100,
        minimumOrderQuantity: 100,
      },
      {
        id: "bio2-nutraceutical-tea-20",
        label: "20 tea bags",
        packSize: "20 tea bags",
        price: 200,
        minimumOrderQuantity: 100,
      },
    ],
    image: "/images/products/bio2_neutraceutical-cutout.webp",
    format: "tea",
    featured: false,
  },
  {
    id: "prod-016",
    name: "Bio1 Immune Booster",
    slug: "bio-immune-booster-immunity-support-formula",
    category: "immunity-general-wellness",
    subCategory: null,
    variants: [
      {
        id: "bio-immune-booster-20",
        label: "20 sachets",
        packSize: "20 sachets",
        price: 350,
        minimumOrderQuantity: 100,
      },
      {
        id: "bio-immune-booster-40",
        label: "40 sachets",
        packSize: "40 sachets",
        price: 500,
        minimumOrderQuantity: 100,
      },
    ],
    image: "/images/products/bio_immune_booster-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-018",
    name: "Bio Metabalance",
    slug: "bio1-metabalance-metabolism-energy-support",
    category: "immunity-general-wellness",
    subCategory: null,
    price: 500,
    packSize: "30s",
    minimumOrderQuantity: 100,
    image: "/images/products/bio1_metabalance-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-019",
    name: "BioForge",
    slug: "bioforge-capsules",
    category: "mens-wellness",
    subCategory: "mens-health",
    price: 350,
    packSize: "30s",
    minimumOrderQuantity: 100,
    image: "/images/products/bioforge_capsules-cutout.webp",
    format: "capsules",
    featured: true,
  },
  {
    id: "prod-020",
    name: "BioForge Plus",
    slug: "bioforge-plus",
    category: "mens-wellness",
    subCategory: "mens-health",
    price: 450,
    packSize: "60s",
    minimumOrderQuantity: 100,
    image: "/images/products/bioforge_plus-cutout.webp",
    format: "formula",
    featured: false,
  },
  {
    id: "prod-021",
    name: "BioFlex",
    slug: "bioflex",
    category: "womens-wellness",
    subCategory: "womens-health",
    price: 350,
    packSize: "30s",
    minimumOrderQuantity: 100,
    image: "/images/products/bioflex-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-022",
    name: "BioFlex Plus",
    slug: "bioflex-plus",
    category: "womens-wellness",
    subCategory: "womens-health",
    price: 450,
    packSize: "60s",
    minimumOrderQuantity: 100,
    image: "/images/products/bioflex_plus-cutout.webp",
    format: "formula",
    featured: false,
  },
  {
    id: "prod-023",
    name: "Viesta Slimming Coffee",
    slug: "viesta-slimming-coffee",
    category: "womens-wellness",
    subCategory: "womens-health",
    variants: [
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
    ],
    image: "/images/products/viesta_slimming_coffee-cutout.webp",
    format: "coffee",
    featured: true,
  },
  {
    id: "prod-024",
    name: "Bio1 Gluco",
    slug: "bio1-gluco",
    category: "diabetes",
    subCategory: null,
    price: 350,
    packSize: "30s",
    minimumOrderQuantity: 100,
    image: "/images/products/bio1_gluco-cutout.webp",
    format: "formula",
    featured: true,
  },
  {
    id: "prod-025",
    name: "Bio1 Gluco Plus",
    slug: "bio1-gluco-plus",
    category: "diabetes",
    subCategory: null,
    price: 450,
    packSize: "60s",
    minimumOrderQuantity: 100,
    image: "/images/products/bio1_gluco_plus-cutout.webp",
    format: "formula",
    featured: false,
  },
  {
    id: "prod-026",
    name: "Bio Gluco Tea Bags",
    slug: "bio-gluco-tea-bags",
    category: "diabetes",
    subCategory: null,
    variants: [
      {
        id: "bio-gluco-tea-bags-20",
        label: "20 sachets",
        packSize: "20 sachets",
        price: 300,
        minimumOrderQuantity: 100,
      },
      {
        id: "bio-gluco-tea-bags-40",
        label: "40 sachets",
        packSize: "40 sachets",
        price: 450,
        minimumOrderQuantity: 100,
      },
    ],
    image: "/images/products/bio_gluco_teabags-cutout.webp",
    format: "teabags",
    featured: false,
  },
];

export const products: Product[] = productSeeds.map((product) => {
  const content = categoryContent[product.category];
  const format = formatDetails[product.format];
  const price = getBasePrice(product);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    subCategory: product.subCategory,
    price,
    priceStatus: getPriceStatus(product),
    packSize: product.packSize,
    minimumOrderQuantity: product.minimumOrderQuantity,
    variants: product.variants,
    image: product.image,
    gallery: [product.image],
    shortDescription: `${content.shortDescription} ${format.benefit}.`,
    description: `This product is listed as ${product.name} under ${content.label}. ${content.description} This is draft storefront copy and should be checked against the product label before launch.`,
    benefits: [...content.benefits, format.benefit],
    usage: `${format.usage} as directed on the confirmed product label. ${content.usageNote}`,
    ingredients: "Ingredients to be confirmed against the product label.",
    warnings: content.warnings,
    featured: product.featured,
    inStock: true,
    needsConfirmation: getNeedsConfirmation(product, content),
  };
});

export const featuredProducts = products.filter((product) => product.featured);

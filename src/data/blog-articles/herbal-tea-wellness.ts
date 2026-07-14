import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "A warm cup of tea can be part of a pleasant daily routine, but the word herbal does not automatically mean gentle, effective, or suitable for everyone. Herbs contain active compounds, products vary in strength and composition, and some ingredients can cause side effects or interact with medicines.",
  },
  {
    type: "heading",
    level: 2,
    id: "start-with-the-label",
    text: "Start with the confirmed label",
  },
  {
    type: "paragraph",
    text: "The product label should identify the ingredients, serving or preparation instructions, warnings, storage guidance, and intended use. Do not infer an ingredient from a product's name or storefront category. If the ingredient list or directions are incomplete, pause and request confirmed information before using it.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Check every ingredient, including blends and added sweeteners.",
      "Follow the stated amount, water volume, brewing time, and frequency.",
      "Look for warnings about age, pregnancy, nursing, allergies, health conditions, or medication.",
      "Avoid combining several herbal products simply because each one is described as natural.",
      "Stop and seek advice if you develop an unexpected reaction.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "natural-does-not-mean-interaction-free",
    text: "Natural does not mean interaction-free",
  },
  {
    type: "paragraph",
    text: "NCCIH notes that herbal products can interact with prescription and over-the-counter medicines. An herb may increase side effects, reduce a medicine's effect, or alter how the body processes it. Interaction information is also incomplete for many products, which makes caution especially important when a medicine requires precise dosing.",
  },
  {
    type: "callout",
    kind: "warning",
    title: "Ask before combining products",
    paragraphs: [
      "Speak with a qualified clinician or pharmacist before using concentrated herbal products with medicines for blood pressure, diabetes, blood clotting, seizures, cancer, transplant care, mental health, or other chronic conditions. Bring the exact ingredient list rather than only the product name.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "make-tea-part-of-a-routine",
    text: "Make tea part of a routine, not a treatment promise",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Choose a consistent time that does not conflict with medicine instructions.",
      "Count sweeteners and other additions as part of the drink.",
      "Use safe water and clean preparation equipment.",
      "Store the product according to the label and keep it away from children.",
      "Treat the tea as one part of your overall food and fluid intake, not as a substitute for meals or care.",
    ],
  },
  {
    type: "paragraph",
    text: "Evidence about one herb cannot automatically be transferred to a different herb, a blend, or a finished product. Similarly, a tea sold in a diabetes, blood-pressure, or detox category should not be described as treating that condition without product-specific evidence and approved wording.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Stop using a product and seek advice for rash, swelling, breathing difficulty, persistent vomiting or diarrhoea, fainting, unusual bleeding, or symptoms of very high or low blood pressure or glucose. Breathing difficulty, facial swelling, or collapse requires urgent local medical help.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Enjoy herbal tea as an informed routine: know the ingredients, follow the label, check interactions, and keep treatment claims out of the cup. Natural products still require careful choices.",
    ],
  },
] satisfies BlogContentBlock[];

export const herbalTeaWellnessPost: BlogPost = {
  id: "blog-herbal-tea-wellness",
  title: "Herbal Tea Wellness: Routines, Safety, and Informed Choices",
  slug: "herbal-tea-wellness",
  category: "herbal-tea",
  excerpt:
    "Build an enjoyable tea routine while checking ingredients, preparation instructions, side effects, and medicine interactions.",
  coverImage: {
    src: "/images/blog/herbal-tea-wellness.webp",
    alt: "Herbal tea being prepared in a warm and calm kitchen setting",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.nccihHerbs, blogSources.nccihHerbInteractions, blogSources.whoSelfCare],
  relatedProductSlugs: ["bio2-nutraceutical-tea", "bio-gluco-tea-bags", "bio1-sterol-sachets"],
  featured: false,
};

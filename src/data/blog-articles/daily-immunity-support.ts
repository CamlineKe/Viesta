import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "The immune system is a complex network of physical barriers, cells, tissues, and signalling processes. It does not have one simple score, and a single food or supplement cannot guarantee protection from infection. A better goal is to support normal immune function through adequate nutrition, sleep, movement, recommended preventive care, and attention to your individual health needs.",
  },
  {
    type: "heading",
    level: 2,
    id: "nutrition-and-immune-function",
    text: "Nutrition and normal immune function",
  },
  {
    type: "paragraph",
    text: "NIH guidance explains that adequate amounts of several vitamins and minerals, including vitamins A, C, D, and E, selenium, and zinc, are important for normal immune function. Deficiency can impair that function, but this does not mean that taking more than you need creates a stronger immune response. High doses may cause side effects or interact with medicines.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Aim for varied meals rather than relying on one so-called immunity food.",
      "Use supplements to address an identified need or follow qualified advice, not as a replacement for balanced meals.",
      "Check serving amounts and avoid stacking products that contain the same vitamins or minerals.",
      "Tell a clinician or pharmacist about herbal products and supplements when you also use medication.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "habits-that-support-wellbeing",
    text: "Habits that support overall wellbeing",
  },
  {
    type: "paragraph",
    text: "Immune health sits within a wider health picture. Regular sleep, suitable physical activity, food safety, tobacco avoidance, and recommended vaccination or clinical care each have a role that cannot be replaced by a supplement marketed for immunity.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Keep a consistent sleep and waking routine where possible.",
      "Include movement you can sustain and adapt it when you are unwell or recovering.",
      "Wash hands and prepare and store food safely.",
      "Plan meals before a busy week so variety is easier to maintain.",
      "Discuss recommended preventive care with a qualified healthcare professional.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "be-careful-with-boosting-claims",
    text: "Be careful with “boosting” claims",
  },
  {
    type: "paragraph",
    text: "Words such as boost, shield, and fight can make a product sound as if it prevents illness. The current Viesta inventory confirms product names and formats but does not provide product-specific clinical evidence or approved label claims. Any related product should therefore be explored as part of the catalog, not described as preventing or treating an infection.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Seek qualified advice for persistent fever, difficulty breathing, dehydration, severe weakness, confusion, symptoms that are worsening, or illness in someone at higher risk of complications. A supplement should not delay testing or treatment.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Support normal immune function with adequate nutrition and repeatable health habits. Treat deficiency, high-dose supplementation, and illness as matters for appropriate professional guidance rather than promises from a single product.",
    ],
  },
] satisfies BlogContentBlock[];

export const dailyImmunitySupportPost: BlogPost = {
  id: "blog-daily-immunity-support",
  title: "Everyday Immunity Support: Sleep, Nutrition, and Healthy Habits",
  slug: "daily-immunity-support",
  category: "immunity",
  excerpt:
    "Learn how adequate nutrition and repeatable daily habits support normal immune function without relying on exaggerated boosting claims.",
  coverImage: {
    src: "/images/blog/daily-immunity-support.webp",
    alt: "A person preparing a nutritious meal in a bright everyday setting",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.nihImmuneFunction, blogSources.whoSelfCare, blogSources.whoPhysicalActivity],
  relatedProductSlugs: ["bio-immune-booster-immunity-support-formula"],
  featured: false,
};

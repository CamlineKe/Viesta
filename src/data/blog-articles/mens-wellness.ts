import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "Men's wellness includes everyday health habits as well as paying attention to changes that are easy to dismiss. Urinary symptoms are one example. The prostate commonly changes with age, but difficulty urinating can have several causes and cannot be diagnosed from symptoms or a supplement advertisement alone.",
  },
  {
    type: "heading",
    level: 2,
    id: "understanding-prostate-changes",
    text: "Understanding prostate changes",
  },
  {
    type: "paragraph",
    text: "The prostate is part of the male reproductive system and tends to grow as a man ages. Common prostate conditions include inflammation, benign enlargement, and prostate cancer. These conditions are different, and similar urinary symptoms do not tell you which one is present. A clinician may use your history, an examination, urine or blood tests, and other investigations to understand the cause.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Difficulty starting urination or needing to strain",
      "A weak or interrupted urine stream",
      "Urgency, increased frequency, or waking often at night to urinate",
      "A feeling that the bladder has not emptied",
      "Pain, blood in urine or semen, or a noticeable change from your usual pattern",
    ],
  },
  {
    type: "callout",
    kind: "information",
    title: "Symptoms do not automatically mean cancer",
    paragraphs: [
      "Urinary changes can occur with benign enlargement, inflammation, infection, diabetes, bladder conditions, medication effects, and other causes. They still deserve assessment, especially when they are new, changing, or affecting daily life.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "screening-is-a-shared-decision",
    text: "Screening is a shared decision",
  },
  {
    type: "paragraph",
    text: "Prostate screening has potential benefits and harms, and there is no single routine that suits every person. Age, family history, other risk factors, personal preferences, and local clinical guidance all matter. Discuss whether testing is appropriate with a qualified healthcare professional who can explain what a result may lead to.",
  },
  {
    type: "heading",
    level: 2,
    id: "support-everyday-health",
    text: "Support everyday health",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Eat a varied diet based mainly on minimally processed foods available to you.",
      "Include regular physical activity suited to your ability and medical context.",
      "Avoid tobacco and discuss alcohol use honestly during health reviews.",
      "Keep routine appointments and do not wait for severe symptoms before seeking advice.",
      "Review every supplement with the same care you would give another active health product.",
    ],
  },
  {
    type: "paragraph",
    text: "A men's-wellness or prostate-category product is not evidence that it treats enlargement, improves urinary symptoms, prevents cancer, or protects the prostate. The current Viesta catalog can support product discovery, but product-specific outcomes require verified label wording and appropriate evidence.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Arrange an assessment for new or worsening urinary symptoms, pain, blood in urine or semen, erectile changes, or concern about your prostate risk. Seek urgent local medical help if you cannot pass urine, have severe pain, or become acutely unwell.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Notice changes, discuss screening rather than assuming it is automatic, and use professional assessment to separate common benign problems from conditions needing treatment. Supplements do not replace that process.",
    ],
  },
] satisfies BlogContentBlock[];

export const mensWellnessPost: BlogPost = {
  id: "blog-mens-wellness",
  title: "Men's Wellness and Prostate Awareness",
  slug: "mens-wellness",
  category: "mens-womens-health",
  excerpt:
    "Understand common prostate changes, urinary symptoms, and why screening and supplements both require informed decisions.",
  coverImage: {
    src: "/images/blog/mens-wellness.webp",
    alt: "A mature man having a thoughtful health conversation in a relaxed setting",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.nciProstateChanges, blogSources.nciProstateScreening, blogSources.whoSelfCare],
  relatedProductSlugs: ["bioforge-capsules", "bioforge-plus"],
  featured: false,
};

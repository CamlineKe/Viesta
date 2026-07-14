import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "Blood glucose changes throughout the day as food, activity, medication, stress, sleep, and illness affect how the body uses energy. A laboratory or clinical test can help identify prediabetes or diabetes, while personal targets for someone already diagnosed should come from their healthcare team.",
  },
  {
    type: "heading",
    level: 2,
    id: "common-glucose-tests",
    text: "What common glucose tests measure",
  },
  {
    type: "paragraph",
    text: "A fasting blood glucose test is performed after an overnight fast. HbA1c estimates average blood glucose over roughly two to three months. A random glucose test can be taken without fasting, but it does not have general CDC categories for normal and prediabetes. Results need clinical interpretation, and diagnosis may require confirmation.",
  },
  {
    type: "table",
    caption: "CDC diagnostic reference ranges",
    headers: ["Test", "Normal", "Prediabetes", "Diabetes"],
    rows: [
      ["Fasting blood glucose", "99 mg/dL or below", "100–125 mg/dL", "126 mg/dL or above"],
      ["HbA1c", "Below 5.7%", "5.7–6.4%", "6.5% or above"],
      ["Random blood glucose", "Not applicable", "Not applicable", "200 mg/dL or above"],
    ],
    note: "These values are diagnostic references, not personalized treatment targets. A qualified healthcare professional should interpret results and confirm a diagnosis.",
  },
  {
    type: "callout",
    kind: "warning",
    title: "Do not use the random test like a fasting test",
    paragraphs: [
      "The supplied blog brief listed general normal and prediabetes ranges for a random test. CDC does not define those categories. The time since eating and the person's symptoms and medical context matter, so a random result should be discussed with a clinician.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "a-practical-daily-routine",
    text: "A practical daily routine",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Plan balanced meals around foods available to you, with variety and appropriate portions.",
      "Follow the monitoring schedule and medication plan provided by your healthcare team.",
      "Keep water available and choose unsweetened drinks more often.",
      "Include regular movement, such as walking, when it is safe and suitable for you.",
      "Record unusual readings, symptoms, meals, or missed medication so you can discuss patterns at a review.",
      "Protect sleep and build routines that are realistic enough to repeat.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "supplements-and-herbal-products",
    text: "Supplements and herbal products",
  },
  {
    type: "paragraph",
    text: "A product placed in a diabetes category is not automatically proven to lower glucose or manage diabetes. If you use glucose-lowering medicine, adding a supplement or concentrated herbal product without professional advice may complicate your routine or create interaction risks. Review the confirmed label and discuss the complete ingredient list with a qualified clinician or pharmacist.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Contact your healthcare team about repeated readings outside your agreed target, symptoms of very high or low glucose, or uncertainty about medication. Seek urgent local medical help for severe symptoms such as confusion, fainting, difficulty breathing, seizures, or inability to keep fluids down.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Use the right test for the right purpose, avoid diagnosing yourself from one result, and build daily habits around the plan agreed with your healthcare team. Products and teas do not replace monitoring, prescribed medicine, or medical care.",
    ],
  },
] satisfies BlogContentBlock[];

export const diabetesWellnessPost: BlogPost = {
  id: "blog-diabetes-wellness",
  title: "Diabetes Wellness: Understanding Tests and Everyday Routines",
  slug: "diabetes-wellness",
  category: "diabetes-support",
  excerpt:
    "Understand fasting glucose, HbA1c, and random tests, then build practical routines around professional diabetes care.",
  coverImage: {
    src: "/images/blog/diabetes-wellness.webp",
    alt: "A balanced meal being prepared as part of an everyday wellness routine",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.cdcDiabetesTesting, blogSources.whoHealthyDiet, blogSources.whoPhysicalActivity],
  relatedProductSlugs: ["bio1-gluco", "bio1-gluco-plus", "bio-gluco-tea-bags"],
  featured: true,
};

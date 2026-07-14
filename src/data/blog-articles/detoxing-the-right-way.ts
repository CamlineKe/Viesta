import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "“Detox” is used to describe everything from ordinary healthy habits to restrictive diets, juice-only plans, laxatives, supplements, and commercial cleanses. Those approaches are not equivalent. In medicine, detoxification can describe specific treatment for a harmful substance; in marketing, the word often makes broad promises without defining the toxin, measurement, or evidence.",
  },
  {
    type: "heading",
    level: 2,
    id: "what-the-evidence-says",
    text: "What the evidence says",
  },
  {
    type: "paragraph",
    text: "NCCIH reports that only a small number of human studies have examined commercial detox programs and that the available studies have important limitations. Evidence does not support promising lasting weight loss or toxin removal from a short cleanse. Some programs may also cause dehydration, nutrient shortfalls, diarrhoea, or electrolyte problems.",
  },
  {
    type: "callout",
    kind: "information",
    title: "Your body is already doing ongoing work",
    paragraphs: [
      "The liver, kidneys, digestive system, lungs, and skin all contribute to processing or eliminating substances as part of normal physiology. A tea or juice should not be described as switching those systems on or cleansing an organ.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "sustainable-wellness-habits",
    text: "Choose sustainable wellness habits",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Drink water regularly, adjusting for climate, activity, and professional advice about any fluid restriction.",
      "Eat varied meals that include vegetables, fruit, pulses, whole grains, and other fibre-containing foods available to you.",
      "Reduce reliance on heavily processed foods without turning meals into an extreme all-or-nothing plan.",
      "Move regularly and protect sleep as part of overall wellbeing.",
      "Give persistent digestive symptoms a clinical assessment instead of repeatedly masking them with a cleanse.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "questions-before-a-detox-product",
    text: "Questions to ask before using a detox product",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "What exactly does the label say the product contains?",
      "Are the amounts, preparation instructions, warnings, and intended duration clear?",
      "Does it include a laxative, diuretic, stimulant, or herb that could interact with medication?",
      "Is the claim specific and supported, or does it only use words such as cleanse, flush, or reset?",
      "Could the routine be risky with diabetes, kidney disease, heart disease, pregnancy, nursing, or a digestive condition?",
    ],
  },
  {
    type: "paragraph",
    text: "A product name that contains the word detox is not proof that it removes toxins. Treat it as a product to evaluate carefully: read the confirmed label, use only as directed, and ask a qualified healthcare professional or pharmacist when your health or medication makes the decision more complex.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Stop a restrictive or cleansing routine and seek advice if you develop fainting, persistent vomiting or diarrhoea, severe weakness, confusion, signs of dehydration, or worsening symptoms. People with diabetes or kidney, heart, or digestive disease should get guidance before making major dietary changes.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Skip dramatic promises. Regular meals, fibre-containing foods, appropriate hydration, movement, sleep, and professional care are more sustainable than a short commercial cleanse. No tea or supplement should be presented as a medical detoxification treatment.",
    ],
  },
] satisfies BlogContentBlock[];

export const detoxingTheRightWayPost: BlogPost = {
  id: "blog-detoxing-the-right-way",
  title: "Detoxing the Right Way: What the Evidence Says",
  slug: "detoxing-the-right-way",
  category: "detox-weight-wellness",
  excerpt:
    "Separate sustainable wellness habits from commercial cleanse claims and learn what to check before trying a detox product.",
  coverImage: {
    src: "/images/blog/detoxing-the-right-way.webp",
    alt: "Water, vegetables, fruit, and tea arranged for balanced everyday meals",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.nccihDetoxes, blogSources.whoHealthyDiet],
  relatedProductSlugs: ["bio2-total-body-detox", "bio2-nutraceutical-tea"],
  featured: true,
};

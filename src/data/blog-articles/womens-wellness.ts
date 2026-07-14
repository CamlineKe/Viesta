import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "Women's wellbeing changes across life stages and cannot be reduced to one idea of “hormonal balance.” Energy, sleep, menstrual patterns, pregnancy, contraception, menopause, nutrition, stress, medication, and health conditions can all shape how someone feels. Persistent symptoms deserve careful assessment rather than a diagnosis based on a social-media checklist.",
  },
  {
    type: "heading",
    level: 2,
    id: "build-a-realistic-foundation",
    text: "Build a realistic foundation",
  },
  {
    type: "paragraph",
    text: "WHO describes self-care as a combination of healthy practices and appropriate health interventions that complement formal care. Everyday foundations include adequate and varied food, suitable physical activity, sleep, avoiding tobacco, limiting alcohol, social connection, and using health services when they are needed.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Plan varied meals around adequacy, balance, moderation, and diversity rather than restrictive wellness rules.",
      "Build movement into the week and adapt it for pregnancy, recovery, disability, pain, or a clinician's advice.",
      "Track recurring symptoms and menstrual changes with enough detail to support a useful clinical conversation.",
      "Protect sleep where possible and notice when fatigue persists despite reasonable rest.",
      "Keep preventive and reproductive healthcare decisions connected to qualified professional guidance.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "avoid-self-diagnosing-imbalance",
    text: "Avoid self-diagnosing a hormonal imbalance",
  },
  {
    type: "paragraph",
    text: "Fatigue, mood changes, altered periods, skin changes, and weight changes can have many explanations. Calling them a hormonal imbalance without an assessment may delay care for anaemia, thyroid disease, pregnancy, medication effects, sleep problems, mental health needs, or other conditions. A useful evaluation begins with the pattern, duration, severity, and personal health context.",
  },
  {
    type: "callout",
    kind: "information",
    title: "Prepare for a helpful appointment",
    paragraphs: [
      "Record when symptoms began, how often they occur, changes in bleeding or pain, current medicines and supplements, pregnancy possibility, and anything that improves or worsens the pattern. This information can be more useful than choosing a supplement based on a broad symptom list.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "supplements-need-context",
    text: "Supplements need context",
  },
  {
    type: "paragraph",
    text: "A women's-wellness label does not establish that a product balances hormones, treats PMS, corrects a nutrient deficiency, supports fertility, or restores energy. Confirm the ingredients and directions, avoid combining products with overlapping nutrients, and seek advice during pregnancy, nursing, fertility treatment, chronic illness, or medication use.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Arrange care for persistent fatigue, major menstrual changes, worsening pelvic pain, symptoms affecting daily life, or concerns about pregnancy or menopause. Seek urgent local medical help for severe pain, fainting, very heavy bleeding, breathing difficulty, or other sudden severe symptoms.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Everyday habits support wellbeing, but they are not a diagnosis or a cure. Treat persistent symptoms as information worth investigating and assess supplements in the context of your health, medicines, and life stage.",
    ],
  },
] satisfies BlogContentBlock[];

export const womensWellnessPost: BlogPost = {
  id: "blog-womens-wellness",
  title: "Women's Everyday Wellness: Energy, Nutrition, and Self-Care",
  slug: "womens-wellness",
  category: "mens-womens-health",
  excerpt:
    "Build practical wellbeing habits while avoiding broad hormonal claims and knowing when persistent symptoms deserve assessment.",
  coverImage: {
    src: "/images/blog/womens-wellness.webp",
    alt: "A woman following a calm and balanced everyday wellness routine",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.whoSelfCare, blogSources.whoHealthyDiet, blogSources.whoPhysicalActivity],
  relatedProductSlugs: ["bioflex", "bioflex-plus"],
  featured: false,
};

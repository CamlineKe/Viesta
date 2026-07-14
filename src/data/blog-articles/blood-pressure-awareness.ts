import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "Blood pressure is the force of circulating blood against the walls of your blood vessels. It is recorded as two numbers: systolic pressure while the heart contracts and diastolic pressure while the heart rests between beats. Because high blood pressure often causes no obvious symptoms, measurement is the practical way to know whether a reading needs attention.",
  },
  {
    type: "heading",
    level: 2,
    id: "understanding-your-reading",
    text: "Understanding your reading",
  },
  {
    type: "paragraph",
    text: "A reading is written with the systolic number first, such as 120/80 mmHg. One result is only a snapshot. Recent activity, stress, caffeine, pain, posture, the cuff size, and the way a measurement is taken can all affect it. A qualified healthcare professional considers repeated readings and your wider health context before making a diagnosis.",
  },
  {
    type: "table",
    caption: "American Heart Association adult blood-pressure categories",
    headers: ["Category", "Systolic", "Relationship", "Diastolic"],
    rows: [
      ["Normal", "Below 120", "and", "Below 80"],
      ["Elevated", "120–129", "and", "Below 80"],
      ["Stage 1 hypertension", "130–139", "or", "80–89"],
      ["Stage 2 hypertension", "140 or higher", "or", "90 or higher"],
    ],
    note: "Values are in mmHg. This is the AHA classification, not a universal diagnostic framework. WHO describes hypertension as readings of at least 140/90 mmHg on two different days.",
  },
  {
    type: "callout",
    kind: "information",
    title: "Why two frameworks are shown",
    paragraphs: [
      "WHO uses 140/90 mmHg or higher on two different days when describing a hypertension diagnosis. The AHA classification identifies an earlier Stage 1 range beginning at 130 systolic or 80 diastolic. Naming the framework helps you understand why advice may differ between settings.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "a-reliable-home-routine",
    text: "Build a more reliable home routine",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Follow the monitor manufacturer's instructions and use a cuff that fits your arm.",
      "Avoid measuring immediately after exercise, smoking, or a caffeinated drink.",
      "Sit quietly with your back supported, feet on the floor, and arm supported before measuring.",
      "Record the date, time, and result instead of relying on memory.",
      "Share a pattern of readings with a qualified healthcare professional rather than interpreting one number alone.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "everyday-heart-conscious-habits",
    text: "Everyday heart-conscious habits",
  },
  {
    type: "paragraph",
    text: "WHO highlights a healthy diet with less salt, regular physical activity, avoiding tobacco, and following prescribed care as important parts of blood-pressure management. These habits work best as a sustainable routine. They do not replace clinical assessment or medication when treatment has been prescribed.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Choose varied, minimally processed foods and be mindful of salt in packaged meals and seasonings.",
      "Build movement into the week at a level appropriate for your health and mobility.",
      "Keep monitoring and clinic appointments if you have been asked to track your pressure.",
      "Take prescribed medicine exactly as directed and discuss side effects instead of stopping it yourself.",
      "Tell your clinician or pharmacist about every supplement and herbal product you use.",
    ],
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Arrange a clinical review for repeated high readings or any result you do not understand. Seek urgent local medical help for a very high reading accompanied by symptoms such as chest pain, severe shortness of breath, weakness, difficulty speaking, or a sudden change in vision.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Know which framework you are reading, measure consistently, look for patterns, and involve a qualified professional. A wellness product should never be presented as a substitute for diagnosis, monitoring, or prescribed treatment.",
    ],
  },
] satisfies BlogContentBlock[];

export const bloodPressureAwarenessPost: BlogPost = {
  id: "blog-blood-pressure-awareness",
  title: "Understanding Blood Pressure: Numbers, Habits, and When to Get Help",
  slug: "blood-pressure-awareness",
  category: "heart-blood-pressure",
  excerpt:
    "Learn what blood-pressure numbers mean, why major frameworks use different thresholds, and how to build a reliable monitoring routine.",
  coverImage: {
    src: "/images/blog/blood-pressure-awareness.webp",
    alt: "An adult calmly checking their blood pressure at home",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.whoHypertension, blogSources.ahaBloodPressure],
  relatedProductSlugs: ["bio1-sterol-capsules", "bio1-sterol-plus", "bio1-sterol-sachets"],
  featured: true,
};

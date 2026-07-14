import type { BlogCategory } from "@/types/blog";

type BlogCategoryDefinition = {
  label: string;
  description: string;
};

export const blogCategoryDefinitions = {
  "heart-blood-pressure": {
    label: "Heart & Blood Pressure",
    description: "Blood-pressure awareness and heart-conscious everyday habits.",
  },
  "diabetes-support": {
    label: "Diabetes Support",
    description: "General education about glucose tests and everyday wellness routines.",
  },
  "detox-weight-wellness": {
    label: "Detox & Weight Wellness",
    description: "Evidence-aware guidance for sustainable digestive and weight-wellness habits.",
  },
  immunity: {
    label: "Immunity",
    description: "Nutrition, sleep, movement, and other everyday immune-wellness habits.",
  },
  "joint-mobility": {
    label: "Joint & Mobility",
    description: "Movement, strength, and informed joint-care education.",
  },
  "mens-womens-health": {
    label: "Men's & Women's Health",
    description: "Practical education for men's and women's everyday wellbeing.",
  },
  "herbal-tea": {
    label: "Herbal Tea",
    description: "Herbal-tea routines, safety, and informed product choices.",
  },
  "customer-stories": {
    label: "Customer Stories",
    description: "Approved and consented customer wellness experiences.",
  },
} satisfies Record<BlogCategory, BlogCategoryDefinition>;

export const plannedBlogCategories: BlogCategory[] = [
  "heart-blood-pressure",
  "diabetes-support",
  "detox-weight-wellness",
  "immunity",
  "joint-mobility",
  "mens-womens-health",
  "herbal-tea",
  "customer-stories",
];

export function getBlogCategoryLabel(category: BlogCategory): string {
  return blogCategoryDefinitions[category].label;
}

export function getBlogCategoriesForPosts(categories: BlogCategory[]): BlogCategory[] {
  const presentCategories = new Set(categories);

  return (Object.keys(blogCategoryDefinitions) as BlogCategory[]).filter((category) =>
    presentCategories.has(category),
  );
}

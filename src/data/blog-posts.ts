import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "How to Choose Supplements for Your Daily Routine",
    slug: "how-to-choose-supplements-daily-routine",
    category: "nutrition-tips",
    excerpt:
      "A practical guide to reading labels, checking serving sizes, and choosing supplements that fit your goals.",
    image: "/images/blog/nutrition.png",
    author: "Viesta Nutrition",
    publishedAt: "2026-07-01",
    readTime: "4 min read",
    content: [
      "Start with the basics: check the product name, serving size, suggested use, ingredients, warnings, and any storage instructions on the label.",
      "A supplement should fit a clear routine. Think about when you will take it, whether it pairs with meals, and whether the format is convenient for daily use.",
      "Customers managing a medical condition, using prescription medication, pregnant, nursing, or dealing with allergies should speak with a qualified healthcare professional before using supplements.",
    ],
    featured: true,
    needsConfirmation: ["final article copy", "references", "health claims"],
  },
  {
    id: "blog-002",
    title: "Understanding Protein Powders",
    slug: "understanding-protein-powders",
    category: "fitness",
    excerpt:
      "A simple overview of protein powder formats and what to check before adding one to your routine.",
    image: "/images/blog/fitness.png",
    author: "Viesta Nutrition",
    publishedAt: "2026-07-02",
    readTime: "5 min read",
    content: [
      "Protein powders are commonly used for convenience, especially when someone wants a measured option after training or as part of a planned nutrition routine.",
      "Before choosing one, review the protein source, serving size, flavouring, sweeteners, allergens, and preparation instructions.",
      "Protein supplements should support a balanced diet rather than replace regular meals unless a qualified professional has advised a specific plan.",
    ],
    featured: true,
    needsConfirmation: ["final article copy", "references", "health claims"],
  },
  {
    id: "blog-003",
    title: "A Gentle Introduction to Gut Health",
    slug: "gentle-introduction-to-gut-health",
    category: "wellness",
    excerpt:
      "Learn the basics of digestive wellness and the questions to ask when comparing gut health products.",
    image: "/images/blog/wellness.png",
    author: "Viesta Nutrition",
    publishedAt: "2026-07-03",
    readTime: "4 min read",
    content: [
      "Digestive wellness is influenced by everyday habits such as meals, hydration, movement, sleep, and how consistently you follow a routine.",
      "When comparing digestive wellness products, check the intended use, ingredients, preparation method, warnings, and whether the product suits your personal health context.",
      "Persistent digestive symptoms should be discussed with a qualified healthcare professional instead of relying on supplements alone.",
    ],
    featured: true,
    needsConfirmation: ["final article copy", "references", "health claims"],
  },
  {
    id: "blog-004",
    title: "Reading Supplement Labels Without Guesswork",
    slug: "reading-supplement-labels-without-guesswork",
    category: "ingredients",
    excerpt:
      "A careful checklist for reviewing ingredients, directions, warnings, and serving information before ordering.",
    image: "/images/blog/nutrition.png",
    author: "Viesta Nutrition",
    publishedAt: "2026-07-04",
    readTime: "4 min read",
    content: [
      "A supplement label should help you understand what the product is, how it is intended to be used, and what precautions apply.",
      "Look for serving size, directions, ingredient list, storage guidance, warning statements, and any age or medical cautions.",
      "If a product description online is unclear, use the confirmed label as the primary reference before making a purchase decision.",
    ],
    featured: false,
    needsConfirmation: ["references", "label examples", "health claims"],
  },
  {
    id: "blog-005",
    title: "Building a Simple Fitness Nutrition Routine",
    slug: "building-simple-fitness-nutrition-routine",
    category: "fitness",
    excerpt:
      "How to think about consistency, hydration, meals, and supplements in an active lifestyle routine.",
    image: "/images/blog/fitness.png",
    author: "Viesta Nutrition",
    publishedAt: "2026-07-05",
    readTime: "5 min read",
    content: [
      "A fitness nutrition routine works best when it is simple enough to repeat. Start with regular meals, hydration, and a plan that matches your training schedule.",
      "Supplements can be convenient, but they should be chosen around a clear goal and used according to confirmed product directions.",
      "If you are training with an injury, managing a health condition, or following a medical nutrition plan, get professional guidance before changing your routine.",
    ],
    featured: false,
    needsConfirmation: ["references", "final article copy", "health claims"],
  },
  {
    id: "blog-006",
    title: "Wellness Habits That Support Consistency",
    slug: "wellness-habits-that-support-consistency",
    category: "wellness",
    excerpt:
      "Practical habit cues for staying consistent with nutrition, hydration, movement, and supplement routines.",
    image: "/images/blog/wellness.png",
    author: "Viesta Nutrition",
    publishedAt: "2026-07-06",
    readTime: "4 min read",
    content: [
      "Consistency is easier when routines are visible, realistic, and connected to habits you already have.",
      "Keep products in a safe, dry place, follow the confirmed label directions, and avoid doubling up when you miss a routine unless the label or a professional says otherwise.",
      "Wellness routines should be adjusted carefully for pregnancy, medication use, chronic conditions, allergies, or any symptoms that need clinical attention.",
    ],
    featured: false,
    needsConfirmation: ["references", "final article copy", "health claims"],
  },
];

export const featuredBlogPosts = blogPosts.filter((post) => post.featured);

import { calculateBlogReadTime } from "@/data/blog-editorial";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

import { blogSources } from "./sources";

const content = [
  {
    type: "paragraph",
    text: "Joint pain and stiffness can have many causes, including injury, osteoarthritis, inflammatory conditions, infection, or strain around the joint. That variety matters: advice that is suitable for ordinary stiffness may be wrong for a new injury or a hot, swollen joint. A qualified assessment is the safest starting point when symptoms are persistent, severe, or unexplained.",
  },
  {
    type: "heading",
    level: 2,
    id: "movement-with-a-purpose",
    text: "Movement with a purpose",
  },
  {
    type: "paragraph",
    text: "NIAMS describes exercise as an important part of osteoarthritis care because it can help reduce pain and stiffness while supporting flexibility, strength, and endurance. The right plan depends on the joint, your current ability, other health conditions, and whether a clinician or physical therapist has given you specific restrictions.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Range-of-motion activities move a joint gently through the movement available to you.",
      "Strength work supports the muscles around a joint and should progress gradually.",
      "Low-impact activities such as walking, cycling, swimming, or water exercise may reduce impact while keeping you active.",
      "Balance activities can support confidence and everyday function.",
      "Rest and recovery matter, particularly after a change in activity or a flare in symptoms.",
    ],
  },
  {
    type: "callout",
    kind: "information",
    title: "Start from your current level",
    paragraphs: [
      "More is not always better. Begin slowly, watch how the joint responds during the following day, and ask a qualified professional how to adapt activity if pain, instability, or another condition limits you.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "support-the-whole-routine",
    text: "Support the whole routine",
  },
  {
    type: "paragraph",
    text: "Joint care can include movement, appropriate footwear or assistive devices, weight management when relevant, sleep, and a treatment plan for a diagnosed condition. Heat or cold may help some people manage symptoms, but safe use depends on sensation, circulation, skin health, and professional advice.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Notice which activities improve movement and which repeatedly worsen symptoms.",
      "Break long periods of sitting into comfortable movement when possible.",
      "Use stable footwear and equipment suited to the activity.",
      "Follow prescribed rehabilitation or medication instead of replacing it with a supplement.",
      "Review product labels for ingredients, warnings, and possible medicine interactions.",
    ],
  },
  {
    type: "heading",
    level: 2,
    id: "what-products-can-and-cannot-claim",
    text: "What products can and cannot claim",
  },
  {
    type: "paragraph",
    text: "The Viesta catalog includes a joint-and-mobility range, but the inventory alone does not establish that a product treats arthritis, repairs cartilage, reduces inflammation, or relieves pain. Product discovery must remain separate from diagnosis and treatment advice until verified label wording and supporting evidence are available.",
  },
  {
    type: "callout",
    kind: "professional-help",
    title: "When to seek professional help",
    paragraphs: [
      "Arrange an assessment for persistent pain, progressive stiffness, repeated instability, or symptoms that limit daily activity. Seek prompt care for a joint that becomes hot, very swollen, suddenly painful, deformed after injury, or impossible to bear weight on, especially when fever or illness is present.",
    ],
  },
  {
    type: "callout",
    kind: "key-takeaway",
    title: "The practical takeaway",
    paragraphs: [
      "Use gradual, suitable movement to support mobility, but do not assume every painful joint has the same cause. Persistent or concerning symptoms deserve assessment, and no supplement should replace an established care plan.",
    ],
  },
] satisfies BlogContentBlock[];

export const jointMobilityWellnessPost: BlogPost = {
  id: "blog-joint-mobility-wellness",
  title: "Joint Mobility Wellness: Movement, Strength, and Daily Care",
  slug: "joint-mobility-wellness",
  category: "joint-mobility",
  excerpt:
    "Explore gradual movement, strength, and recovery habits while learning which joint symptoms need professional assessment.",
  coverImage: {
    src: "/images/blog/joint-mobility-wellness.webp",
    alt: "A mature adult practising gentle movement outdoors",
  },
  author: "Viesta Wellness Team",
  status: "published",
  publishedAt: "2026-07-14",
  readTimeMinutes: calculateBlogReadTime(content),
  content,
  sources: [blogSources.niamsOsteoarthritis, blogSources.whoPhysicalActivity],
  relatedProductSlugs: ["biorelief-capsules", "biorelief-plus", "biorelief-cream"],
  featured: false,
};

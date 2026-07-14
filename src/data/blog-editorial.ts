import type { BlogContentBlock } from "@/types/blog";

export type BlogTableOfContentsItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

export const BLOG_MEDICAL_DISCLAIMER =
  "This article provides general wellness information and is not medical advice. It does not diagnose, treat, cure, or prevent any disease and does not replace care from a qualified healthcare professional. Ask a qualified professional before using supplements or herbal products if you have a medical condition, take medication, are pregnant, or are nursing.";

export function getBlogReadTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getBlogTableOfContents(
  blocks: BlogContentBlock[],
): BlogTableOfContentsItem[] {
  return blocks.flatMap((block) =>
    block.type === "heading"
      ? [{ id: block.id, label: block.text, level: block.level }]
      : [],
  );
}

export function calculateBlogReadTime(blocks: BlogContentBlock[]): number {
  const text = blocks
    .flatMap((block) => {
      switch (block.type) {
        case "paragraph":
        case "heading":
          return [block.text];
        case "list":
          return block.items;
        case "table":
          return [block.caption, ...block.headers, ...block.rows.flat(), block.note ?? ""];
        case "callout":
          return [block.title, ...block.paragraphs];
      }
    })
    .join(" ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

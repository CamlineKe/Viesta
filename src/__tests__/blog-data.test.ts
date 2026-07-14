import { existsSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { calculateBlogReadTime } from "@/data/blog-editorial";
import {
  blogPosts,
  featuredBlogPosts,
  getPublishedBlogPosts,
  publishedBlogPosts,
} from "@/data/blog-posts";
import { products } from "@/data/products";

const expectedArticleSlugs = [
  "blood-pressure-awareness",
  "diabetes-wellness",
  "detoxing-the-right-way",
  "daily-immunity-support",
  "joint-mobility-wellness",
  "womens-wellness",
  "mens-wellness",
  "herbal-tea-wellness",
];

const expectedFeaturedSlugs = [
  "blood-pressure-awareness",
  "diabetes-wellness",
  "detoxing-the-right-way",
];

describe("blog publication data", () => {
  it("contains the approved eight-article publication inventory", () => {
    expect(blogPosts.map((post) => post.slug)).toEqual(expectedArticleSlugs);
    expect(publishedBlogPosts).toHaveLength(8);
    expect(featuredBlogPosts.map((post) => post.slug)).toEqual(expectedFeaturedSlugs);
  });

  it("keeps identifiers, slugs, and heading anchors unique", () => {
    expect(new Set(blogPosts.map((post) => post.id)).size).toBe(blogPosts.length);
    expect(new Set(blogPosts.map((post) => post.slug)).size).toBe(blogPosts.length);

    for (const post of blogPosts) {
      const headingIds = post.content.flatMap((block) =>
        block.type === "heading" ? [block.id] : [],
      );

      expect(new Set(headingIds).size).toBe(headingIds.length);
    }
  });

  it("requires complete publication, image, source, and reading metadata", () => {
    for (const post of blogPosts) {
      expect(post.status).toBe("published");
      expect(post.author).toBe("Viesta Wellness Team");
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.coverImage.src).toMatch(/^\/images\/blog\/.+\.webp$/);
      expect(post.coverImage.alt.trim().length).toBeGreaterThan(20);
      expect(existsSync(`public${post.coverImage.src}`)).toBe(true);
      expect(post.content.length).toBeGreaterThan(5);
      expect(post.sources.length).toBeGreaterThan(0);
      expect(post.readTimeMinutes).toBe(calculateBlogReadTime(post.content));

      for (const source of post.sources) {
        expect(source.url).toMatch(/^https:\/\//);
        expect(source.title.trim()).not.toBe("");
        expect(source.publisher.trim()).not.toBe("");
        expect(source.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it("keeps every structured table rectangular and labelled", () => {
    const tables = blogPosts.flatMap((post) =>
      post.content.filter((block) => block.type === "table"),
    );

    expect(tables.length).toBeGreaterThan(0);

    for (const table of tables) {
      expect(table.caption.trim()).not.toBe("");
      expect(table.headers.length).toBeGreaterThan(1);

      for (const row of table.rows) {
        expect(row).toHaveLength(table.headers.length);
      }
    }
  });

  it("links only to products that exist in the catalog", () => {
    const productSlugs = new Set(products.map((product) => product.slug));

    for (const post of blogPosts) {
      for (const productSlug of post.relatedProductSlugs ?? []) {
        expect(productSlugs.has(productSlug)).toBe(true);
      }
    }
  });

  it("does not reference the retired generic covers", () => {
    const retiredCovers = new Set([
      "/images/blog/nutrition.webp",
      "/images/blog/fitness.webp",
      "/images/blog/wellness.webp",
    ]);

    for (const post of blogPosts) {
      expect(retiredCovers.has(post.coverImage.src)).toBe(false);
    }
  });

  it("excludes drafts from public article selectors", () => {
    const draft = { ...blogPosts[0], id: "draft-test", slug: "draft-test", status: "draft" as const };

    expect(getPublishedBlogPosts([...blogPosts, draft])).not.toContain(draft);
  });
});

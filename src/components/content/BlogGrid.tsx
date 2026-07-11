"use client";

import { useMemo, useState } from "react";

import type { BlogCategory, BlogPost } from "@/types/blog";
import { cn } from "@/lib/class-names";

import { BlogCard } from "./BlogCard";

type BlogGridProps = {
  posts: BlogPost[];
};

const categoryLabels: Record<BlogCategory | "all", string> = {
  all: "All",
  "nutrition-tips": "Nutrition Tips",
  fitness: "Fitness",
  ingredients: "Ingredients",
  wellness: "Wellness",
};

const categories: Array<BlogCategory | "all"> = ["all", "nutrition-tips", "fitness", "ingredients", "wellness"];

export function BlogGrid({ posts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const visiblePosts = useMemo(() => {
    if (activeCategory === "all") {
      return posts;
    }

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <div className="min-w-0 mt-10">
      <div
        aria-label="Filter articles by category"
        className="-mx-4 flex w-[calc(100%_+_2rem)] snap-x gap-2 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:mx-0 sm:w-auto sm:flex-wrap sm:px-0"
        role="group"
      >
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={activeCategory === category}
            className={cn(
              "shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-bold transition",
              activeCategory === category
                ? "border-brand-primary bg-brand-primary text-brand-charcoal shadow-glow"
                : "border-brand-border-soft bg-white text-brand-charcoal hover:border-brand-primary hover:bg-brand-primary-muted",
            )}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

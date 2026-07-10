"use client";

import { SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/class-names";
import type { ProductCategory, ProductCategorySlug } from "@/types/product";

type CategoryFilterValue = ProductCategorySlug | "all";

type CategoryFilterProps = {
  categories: ProductCategory[];
  selectedCategory: CategoryFilterValue;
  onChange: (category: CategoryFilterValue) => void;
  productCounts: Record<string, number>;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
  productCounts,
}: CategoryFilterProps) {
  const categoryOptions: Array<{
    id: CategoryFilterValue;
    name: string;
    count: number;
  }> = [
    { id: "all", name: "All products", count: productCounts.all ?? 0 },
    ...categories.map((category) => ({
      id: category.id,
      name: category.name,
      count: productCounts[category.id] ?? 0,
    })),
  ];

  return (
    <>
      <section className="lg:hidden" aria-label="Product category filters">
        <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              className={cn(
                "shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-bold transition",
                selectedCategory === category.id
                  ? "border-brand-primary bg-brand-primary text-brand-charcoal shadow-glow"
                  : "border-brand-border bg-white text-brand-charcoal hover:border-brand-primary hover:bg-brand-primary-muted",
              )}
              type="button"
              onClick={() => onChange(category.id)}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">{category.count}</span>
            </button>
          ))}
        </div>
      </section>

      <aside className="hidden rounded-2xl border border-neutral-200/70 bg-white/90 p-5 shadow-sm backdrop-blur-md lg:sticky lg:top-24 lg:block">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-4">
          <SlidersHorizontal
            aria-hidden="true"
            className="h-5 w-5 text-brand-charcoal"
          />
          <h2 className="font-heading text-lg font-extrabold text-brand-charcoal">
            Categories
          </h2>
        </div>

        <fieldset className="mt-5 space-y-2">
          <legend className="sr-only">Filter products by category</legend>
          {categoryOptions.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-brand-primary-muted"
            >
              <span className="flex items-center gap-3">
                <input
                  checked={selectedCategory === category.id}
                  className="h-4 w-4 accent-brand-primary"
                  name="category"
                  type="radio"
                  onChange={() => onChange(category.id)}
                />
                <span className="text-sm font-bold text-brand-charcoal">
                  {category.name}
                </span>
              </span>
              <span className="text-xs font-bold text-brand-muted">
                {category.count}
              </span>
            </label>
          ))}
        </fieldset>
      </aside>
    </>
  );
}

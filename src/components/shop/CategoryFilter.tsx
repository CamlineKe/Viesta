"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

import { cardClassName } from "@/components/ui/Card";
import { cn } from "@/lib/class-names";
import type { ProductCategory, ProductCategorySlug } from "@/types/product";

type CategoryFilterValue = ProductCategorySlug | "all";

type CategoryFilterProps = {
  categories: ProductCategory[];
  selectedCategory: CategoryFilterValue;
  onChange: (category: CategoryFilterValue) => void;
  productCounts: Record<string, number>;
  variant: "mobile" | "desktop";
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
  productCounts,
  variant,
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
  const selectedCategoryName =
    categoryOptions.find((category) => category.id === selectedCategory)?.name ??
    "All products";

  if (variant === "mobile") {
    return (
      <details className="group rounded-brand-md border border-brand-border-soft bg-white lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-brand-md px-3 text-sm font-bold text-brand-charcoal transition hover:border-brand-primary hover:bg-brand-primary-muted [&::-webkit-details-marker]:hidden">
          <span className="flex min-w-0 items-center gap-2">
            <SlidersHorizontal
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            <span className="shrink-0">Filters</span>
            <span className="min-w-0 truncate text-xs font-semibold text-brand-muted">
              {selectedCategoryName}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            {selectedCategory !== "all" ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-xs font-extrabold text-brand-charcoal">
                1
              </span>
            ) : null}
            <ChevronDown
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-open:rotate-180"
            />
          </span>
        </summary>

        <fieldset className="grid gap-2 border-t border-brand-border-soft p-3 sm:grid-cols-2">
          <legend className="sr-only">Filter products by category</legend>
          {categoryOptions.map((category) => (
            <label
              key={category.id}
              className={cn(
                "flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-brand-md px-3 py-2.5 transition hover:bg-brand-primary-muted",
                selectedCategory === category.id &&
                  "bg-brand-primary-muted ring-1 ring-brand-primary/50",
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <input
                  checked={selectedCategory === category.id}
                  className="h-4 w-4 shrink-0 accent-brand-primary"
                  name="mobile-category"
                  type="radio"
                  onChange={() => onChange(category.id)}
                />
                <span className="min-w-0 text-sm font-bold text-brand-charcoal">
                  {category.name}
                </span>
              </span>
              <span className="shrink-0 text-xs font-bold text-brand-muted">
                {category.count}
              </span>
            </label>
          ))}
        </fieldset>
      </details>
    );
  }

  return (
    <aside
      className={cardClassName({
        className: "hidden lg:sticky lg:top-24 lg:block",
        variant: "raised",
      })}
    >
      <div className="flex items-center gap-2 border-b border-brand-border-soft pb-4">
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
            className={cn(
              "flex cursor-pointer items-center justify-between gap-3 rounded-brand-md px-3 py-2.5 transition hover:bg-brand-primary-muted",
              selectedCategory === category.id &&
                "bg-brand-primary-muted ring-1 ring-brand-primary/50",
            )}
          >
            <span className="flex min-w-0 items-center gap-3">
              <input
                checked={selectedCategory === category.id}
                className="h-4 w-4 shrink-0 accent-brand-primary"
                name="desktop-category"
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
  );
}

"use client";

import type { ProductSortOption } from "@/types/product";

type SortSelectProps = {
  value: ProductSortOption;
  onChange: (value: ProductSortOption) => void;
};

const sortOptions: Array<{ value: ProductSortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-bold text-brand-charcoal sm:flex-row sm:items-center">
      <span>Sort by</span>
      <select
        className="min-h-11 rounded-md border border-neutral-200 bg-white px-3 text-sm font-semibold text-brand-charcoal outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
        value={value}
        onChange={(event) => onChange(event.target.value as ProductSortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

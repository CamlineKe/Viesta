"use client";

import { useId } from "react";

import { getFieldControlClassName } from "@/components/ui/FormField";
import { cn } from "@/lib/class-names";
import type { ProductSortOption } from "@/types/product";

type SortSelectProps = {
  value: ProductSortOption;
  onChange: (value: ProductSortOption) => void;
  className?: string;
};

const sortOptions: Array<{ value: ProductSortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];

export function SortSelect({ value, onChange, className }: SortSelectProps) {
  const selectId = useId();

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2 text-sm font-bold text-brand-charcoal sm:flex-row sm:items-center",
        className,
      )}
    >
      <label htmlFor={selectId}>Sort by</label>
      <select
        className={getFieldControlClassName({
          className:
            "mt-0 min-h-11 min-w-0 px-3 text-sm font-semibold sm:w-auto",
        })}
        id={selectId}
        name="sort"
        value={value}
        onChange={(event) => onChange(event.target.value as ProductSortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

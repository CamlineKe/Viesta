"use client";

import { useMemo } from "react";
import { Search, X } from "lucide-react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { cardClassName } from "@/components/ui/Card";
import {
  FormField,
  getFieldControlClassName,
} from "@/components/ui/FormField";
import type {
  Product,
  ProductCategory,
  ProductCategorySlug,
  ProductSortOption,
} from "@/types/product";

import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";
import { SortSelect } from "./SortSelect";

type CategoryFilterValue = ProductCategorySlug | "all";

type ProductGridProps = {
  products: Product[];
  categories: ProductCategory[];
};

const sortOptions: ProductSortOption[] = [
  "featured",
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
];

function getSafeCategory(
  category: string,
  categories: ProductCategory[],
): CategoryFilterValue {
  return categories.some((item) => item.id === category)
    ? (category as ProductCategorySlug)
    : "all";
}

function getSafeSort(sort: string): ProductSortOption {
  return sortOptions.includes(sort as ProductSortOption)
    ? (sort as ProductSortOption)
    : "featured";
}

function sortProducts(products: Product[], sortOption: ProductSortOption) {
  const sortedProducts = [...products];

  switch (sortOption) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
    default:
      return sortedProducts.sort(
        (a, b) => Number(b.featured) - Number(a.featured),
      );
  }
}

export function ProductGrid({ products, categories }: ProductGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = getSafeCategory(
    searchParams.get("category") ?? "all",
    categories,
  );
  const sortOption = getSafeSort(searchParams.get("sort") ?? "featured");
  const query = searchParams.get("q") ?? "";

  const categoryNameById = useMemo(() => {
    return categories.reduce<Record<string, string>>(
      (categoryNames, category) => ({
        ...categoryNames,
        [category.id]: category.name,
      }),
      {},
    );
  }, [categories]);

  const updateUrlState = (nextState: {
    category?: CategoryFilterValue;
    sort?: ProductSortOption;
    query?: string;
  }) => {
    const nextCategory = nextState.category ?? selectedCategory;
    const nextSort = nextState.sort ?? sortOption;
    const nextQuery = nextState.query ?? query;
    const params = new URLSearchParams(searchParams.toString());

    if (nextCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", nextCategory);
    }

    if (nextSort === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", nextSort);
    }

    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    } else {
      params.delete("q");
    }

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(nextUrl as Route, { scroll: false });
  };

  const handleCategoryChange = (category: CategoryFilterValue) => {
    updateUrlState({ category });
  };

  const handleSortChange = (sort: ProductSortOption) => {
    updateUrlState({ sort });
  };

  const handleQueryChange = (nextQuery: string) => {
    updateUrlState({ query: nextQuery });
  };

  const resetFilters = () => {
    router.replace(pathname as Route, { scroll: false });
  };

  const productCounts = useMemo(() => {
    return products.reduce<Record<string, number>>(
      (counts, product) => ({
        ...counts,
        all: (counts.all ?? 0) + 1,
        [product.category]: (counts[product.category] ?? 0) + 1,
      }),
      { all: 0 },
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const visibleProducts =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);
    const searchedProducts = normalizedQuery
      ? visibleProducts.filter((product) => {
          const searchableText = [
            product.name,
            product.shortDescription,
            product.description,
            categoryNameById[product.category],
            product.packSize,
            ...(product.variants?.map((variant) => variant.packSize) ?? []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedQuery);
        })
      : visibleProducts;

    return sortProducts(searchedProducts, sortOption);
  }, [categoryNameById, products, query, selectedCategory, sortOption]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    sortOption !== "featured" ||
    query.trim().length > 0;
  const activeQuery = query.trim();

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
      <CategoryFilter
        categories={categories}
        productCounts={productCounts}
        selectedCategory={selectedCategory}
        variant="desktop"
        onChange={handleCategoryChange}
      />

      <section aria-label="Product catalog" className="min-w-0">
        <div
          className={cardClassName({
            className: "mb-5 space-y-4",
            padding: "sm",
            variant: "raised",
          })}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <FormField id="product-search" label="Search products">
                {({ describedBy, id, invalid }) => (
                  <div className="relative mt-2">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
                    />
                    <input
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={getFieldControlClassName({
                        className: "mt-0 pl-10 text-sm font-semibold",
                        invalid,
                      })}
                      id={id}
                      name="q"
                      placeholder="Search by name, category, or pack size"
                      type="search"
                      value={query}
                      onChange={(event) =>
                        handleQueryChange(event.target.value)
                      }
                    />
                  </div>
                )}
              </FormField>
            </div>
            <SortSelect
              className="hidden lg:flex"
              value={sortOption}
              onChange={handleSortChange}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-3 lg:hidden">
            <CategoryFilter
              categories={categories}
              productCounts={productCounts}
              selectedCategory={selectedCategory}
              variant="mobile"
              onChange={handleCategoryChange}
            />
            <SortSelect value={sortOption} onChange={handleSortChange} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              aria-live="polite"
              className="text-sm font-bold text-brand-muted"
              role="status"
            >
              Showing{" "}
              <span className="text-brand-charcoal">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="text-brand-charcoal">{products.length}</span>{" "}
              products
            </p>
            {hasActiveFilters ? (
              <Button
                className="self-start sm:self-auto"
                size="sm"
                variant="outline"
                onClick={resetFilters}
              >
                <X aria-hidden="true" className="h-4 w-4" />
                Reset filters
              </Button>
            ) : null}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-brand-lg border border-dashed border-brand-border-soft bg-white px-4 py-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
              {activeQuery
                ? `No products found for "${activeQuery}"`
                : "No products found"}
            </h2>
            <p className="mt-3 text-brand-muted">
              {activeQuery
                ? "Try another search term, reset filters, or use the WhatsApp button to ask about availability."
                : "Try another category or reset the filter to all products."}
            </p>
            {hasActiveFilters ? (
              <Button className="mt-6" size="md" onClick={resetFilters}>
                Reset filters
              </Button>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}

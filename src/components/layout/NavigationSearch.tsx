"use client";

import { Search, X } from "lucide-react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { cn } from "@/lib/class-names";

type NavigationSearchVariant = "header" | "mobile";

type NavigationSearchProps = {
  id: string;
  variant: NavigationSearchVariant;
  className?: string;
  onSearch?: () => void;
};

type NavigationSearchFormProps = NavigationSearchProps & {
  initialQuery: string;
  onClearQuery: () => void;
  onSubmitQuery: (query: string) => void;
};

export function NavigationSearch({ id, variant, className, onSearch }: NavigationSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = pathname === "/shop" ? (searchParams.get("q") ?? "") : "";
  const searchStateKey = `${variant}:${pathname}:${initialQuery}`;

  const handleSubmitQuery = (nextQuery: string) => {
    const trimmedQuery = nextQuery.trim();
    const params = new URLSearchParams();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }

    const nextUrl = params.toString() ? `/shop?${params.toString()}` : "/shop";
    router.push(nextUrl as Route);
    onSearch?.();
  };

  const handleClearQuery = () => {
    if (pathname === "/shop") {
      router.push("/shop" as Route);
    }
  };

  return (
    <NavigationSearchForm
      key={searchStateKey}
      className={className}
      id={id}
      initialQuery={initialQuery}
      variant={variant}
      onClearQuery={handleClearQuery}
      onSearch={onSearch}
      onSubmitQuery={handleSubmitQuery}
    />
  );
}

function NavigationSearchForm({
  id,
  variant,
  className,
  initialQuery,
  onClearQuery,
  onSubmitQuery,
}: NavigationSearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitQuery(query);
  };

  const handleClear = () => {
    setQuery("");
    onClearQuery();
  };

  if (variant === "mobile") {
    return (
      <form
        aria-label="Search products"
        className={cn(
          "mb-5 rounded-brand-lg border border-brand-border-soft bg-brand-botanical p-3",
          className,
        )}
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-heading font-extrabold text-brand-charcoal" htmlFor={id}>
          Search products
        </label>
        <div className="mt-2 flex min-h-11 items-center gap-2 rounded-md border border-brand-border-soft bg-white px-3 transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/30">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-muted" />
          <input
            id={id}
            className="min-h-10 min-w-0 flex-1 bg-transparent text-sm font-semibold text-brand-charcoal outline-none placeholder:text-brand-muted"
            placeholder="Search products"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button
              aria-label="Clear product search"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-brand-muted transition hover:bg-brand-primary-muted hover:text-brand-charcoal"
              type="button"
              onClick={handleClear}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
          <button
            className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-md bg-brand-charcoal px-3 font-heading text-xs font-bold text-white transition hover:bg-neutral-800"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      aria-label="Search products"
      className={cn(
        "hidden h-11 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2 text-white transition focus-within:border-brand-primary focus-within:bg-white/15 lg:flex",
        className,
      )}
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={id}>
        Search products
      </label>
      <input
        id={id}
        className="h-10 w-24 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/55 xl:w-40"
        placeholder="Search products"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query ? (
        <button
          aria-label="Clear product search"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white/65 transition hover:bg-white/10 hover:text-white"
          type="button"
          onClick={handleClear}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
      <button
        aria-label="Search products"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-primary text-brand-charcoal transition hover:bg-brand-primary-hover"
        type="submit"
      >
        <Search aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">Search products</span>
      </button>
    </form>
  );
}

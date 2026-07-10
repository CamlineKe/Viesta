"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/class-names";
import type { FAQ, FAQCategory } from "@/types/content";

type FAQAccordionProps = {
  faqs: FAQ[];
};

const categoryLabels: Record<FAQCategory | "all", string> = {
  all: "All",
  shipping: "Shipping",
  products: "Products",
  orders: "Orders",
  returns: "Returns",
};

const categories: Array<FAQCategory | "all"> = [
  "all",
  "products",
  "shipping",
  "orders",
  "returns",
];

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">(
    "all",
  );
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [query, setQuery] = useState("");

  const visibleFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, faqs, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border border-neutral-200/70 bg-white/90 p-4 shadow-sm backdrop-blur-md lg:sticky lg:top-24 lg:self-start">
        <label className="block">
          <span className="text-sm font-bold text-brand-charcoal">
            Search questions
          </span>
          <input
            className="mt-2 min-h-11 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
            placeholder="Search FAQs"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-2 lg:flex-col">
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "rounded-md px-3 py-2 text-left text-sm font-bold transition",
                activeCategory === category
                  ? "bg-brand-primary text-brand-charcoal"
                  : "bg-brand-primary-muted text-brand-charcoal hover:bg-brand-primary",
              )}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </aside>

      <section className="space-y-3" aria-live="polite">
        {visibleFaqs.length > 0 ? (
          visibleFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <article
                key={faq.id}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white shadow-sm transition",
                  isOpen ? "border-brand-primary" : "border-neutral-200/70",
                )}
              >
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      {categoryLabels[faq.category]}
                    </span>
                    <span className="mt-1 block font-heading text-lg font-extrabold text-brand-charcoal">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 shrink-0 transition",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-neutral-200 bg-brand-cream px-5 py-4">
                    <p className="text-sm leading-7 text-brand-muted">
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </article>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
            <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
              No FAQs found
            </h2>
            <p className="mt-3 text-brand-muted">
              Try another search term or category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

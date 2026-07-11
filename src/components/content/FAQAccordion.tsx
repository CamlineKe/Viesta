"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cardClassName } from "@/components/ui/Card";
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
    <div className="grid min-w-0 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside
        className={cardClassName({
          className: "min-w-0 lg:sticky lg:top-24 lg:self-start",
          padding: "sm",
          variant: "raised",
        })}
      >
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
              aria-pressed={activeCategory === category}
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

      <section className="min-w-0 space-y-3" aria-live="polite">
        {visibleFaqs.length > 0 ? (
          visibleFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <article
                key={faq.id}
                className={cn(
                  cardClassName({
                    className: "min-w-0 overflow-hidden p-0 transition",
                    variant: "flat",
                  }),
                  isOpen && "border-brand-primary shadow-brand-sm",
                )}
              >
                <button
                  aria-expanded={isOpen}
                  className="flex w-full min-w-0 items-center justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      {categoryLabels[faq.category]}
                    </span>
                    <span className="mt-1 block break-words font-heading text-base font-extrabold text-brand-charcoal sm:text-lg">
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
                  <div className="border-t border-brand-border-soft bg-brand-botanical px-4 py-4 sm:px-5">
                    <p className="text-sm leading-7 text-brand-muted">
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </article>
            );
          })
        ) : (
          <div className="rounded-brand-lg border border-dashed border-brand-border-soft bg-white px-4 py-8 text-center sm:p-10">
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

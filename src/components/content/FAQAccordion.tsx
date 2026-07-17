"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cardClassName } from "@/components/ui/Card";
import {
  FormField,
  getFieldControlClassName,
} from "@/components/ui/FormField";
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

function filterFaqs(
  faqs: FAQ[],
  activeCategory: FAQCategory | "all",
  query: string,
) {
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
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">(
    "all",
  );
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [query, setQuery] = useState("");

  const visibleFaqs = useMemo(
    () => filterFaqs(faqs, activeCategory, query),
    [activeCategory, faqs, query],
  );

  const resultCountLabel = `Showing ${visibleFaqs.length} ${
    visibleFaqs.length === 1 ? "question" : "questions"
  }${
    activeCategory === "all"
      ? ""
      : ` in ${categoryLabels[activeCategory]}`
  }`;

  function resetFilters() {
    setActiveCategory("all");
    setQuery("");
    setOpenId(faqs[0]?.id ?? null);
  }

  function reconcileOpenQuestion(nextVisibleFaqs: FAQ[]) {
    setOpenId((currentOpenId) => {
      if (currentOpenId === null) {
        return null;
      }

      return nextVisibleFaqs.some((faq) => faq.id === currentOpenId)
        ? currentOpenId
        : (nextVisibleFaqs[0]?.id ?? null);
    });
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    reconcileOpenQuestion(filterFaqs(faqs, activeCategory, nextQuery));
  }

  function updateCategory(nextCategory: FAQCategory | "all") {
    setActiveCategory(nextCategory);
    reconcileOpenQuestion(filterFaqs(faqs, nextCategory, query));
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside
        className={cardClassName({
          className: "min-w-0 lg:sticky lg:top-24 lg:self-start",
          padding: "sm",
          variant: "raised",
        })}
      >
        <FormField id="faq-search" label="Search questions">
          {({ describedBy, id, invalid }) => (
            <input
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={getFieldControlClassName({
                className: "text-sm",
                invalid,
              })}
              id={id}
              placeholder="Search FAQs"
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          )}
        </FormField>

        <div
          aria-label="Filter questions by category"
          className="mt-5 flex flex-wrap gap-2 lg:flex-col"
          role="group"
        >
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={activeCategory === category}
              className={cn(
                "inline-flex min-h-11 items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-bold transition duration-200 ease-out-expo",
                activeCategory === category
                  ? "bg-brand-primary text-brand-charcoal shadow-brand-sm ring-1 ring-brand-charcoal/10"
                  : "bg-brand-primary-muted text-brand-charcoal hover:bg-brand-primary",
              )}
              type="button"
              onClick={() => updateCategory(category)}
            >
              <span>{categoryLabels[category]}</span>
              {activeCategory === category ? (
                <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
              ) : null}
            </button>
          ))}
        </div>
      </aside>

      <section aria-label="Frequently asked questions" className="min-w-0">
        <p
          aria-live="polite"
          className="mb-4 text-sm font-bold text-brand-muted"
          role="status"
        >
          {resultCountLabel}
        </p>

        <div className="space-y-3">
          {visibleFaqs.length > 0 ? (
            visibleFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              const triggerId = `faq-trigger-${faq.id}`;
              const panelId = `faq-panel-${faq.id}`;

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
                    id={triggerId}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="flex min-h-12 w-full min-w-0 items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-brand-primary-muted/40 sm:gap-4 sm:px-5"
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
                    <div
                      id={panelId}
                      aria-labelledby={triggerId}
                      className="border-t border-brand-border-soft bg-brand-botanical px-4 py-4 sm:px-5"
                      role="region"
                    >
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
              <Button
                className="mt-5"
                size="md"
                type="button"
                variant="outline"
                onClick={resetFilters}
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Reset search and filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

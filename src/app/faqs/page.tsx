import type { Metadata } from "next";
import {
  ArrowDown,
  HelpCircle,
  PackageSearch,
  ReceiptText,
  RotateCcw,
  Truck,
} from "lucide-react";

import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/faqs";

export const metadata = {
  title: "FAQs",
  description: "Common questions about Viesta products, orders, shipping, and returns.",
} satisfies Metadata;

const faqTopics = [
  { label: "Products", icon: PackageSearch },
  { label: "Shipping", icon: Truck },
  { label: "Orders", icon: ReceiptText },
  { label: "Returns", icon: RotateCcw },
];

export default function FAQsPage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.04]"
        >
          <defs>
            <pattern
              id="faqs-hero-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="42%" height="100%" fill="url(#faqs-hero-dots)" />
        </svg>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[44%] text-brand-success opacity-[0.08] lg:block"
          fill="none"
          viewBox="0 0 560 640"
        >
          <path
            d="M454 640C400 536 382 438 396 340C410 242 450 150 520 52"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M398 458C326 422 284 368 268 300C334 310 378 348 400 410M416 330C370 280 358 224 380 164C426 198 438 248 416 330M454 222C446 168 464 118 510 78C532 132 514 180 454 222M432 528C474 480 516 458 554 462"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-[18%] h-72 w-72 rounded-full bg-brand-success/10 blur-3xl"
        />

        <Container className="relative grid min-h-[62svh] items-center gap-12 py-14 lg:min-h-[600px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-20">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/80 px-4 py-2 shadow-brand-sm backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-charcoal sm:text-sm">
                Viesta FAQs
              </p>
            </div>
            <h1 className="mt-6 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              Clear answers for confident next steps.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Find answers about product information, ordering, payment
              confirmation, shipping, and returns.
            </p>
            <a
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-brand-charcoal active:scale-[0.97]"
              href="#faq-browser"
            >
              Browse common questions
              <ArrowDown aria-hidden="true" className="ml-2 h-5 w-5" />
            </a>
          </div>

          <div className="relative min-w-0 animate-scale-in">
            <div
              aria-hidden="true"
              className="absolute -left-5 -top-5 h-24 w-24 rounded-brand-xl bg-brand-primary sm:-left-7 sm:-top-7"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 h-32 w-32 rounded-brand-xl border-2 border-brand-success/20 sm:-bottom-7 sm:-right-7"
            />
            <div className="glass-surface relative overflow-hidden rounded-brand-xl p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-brand-lg bg-brand-charcoal p-6 text-white sm:p-8 lg:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-primary/10 blur-3xl"
                />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-brand-lg bg-white/10 text-brand-primary">
                    <HelpCircle aria-hidden="true" className="h-7 w-7" />
                  </div>
                  <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-primary sm:text-sm">
                    Browse by topic
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                    Begin with the area closest to your question.
                  </h2>
                  <ul className="mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                    {faqTopics.map((topic) => {
                      const Icon = topic.icon;

                      return (
                        <li
                          key={topic.label}
                          className="flex min-w-0 items-center gap-3 rounded-brand-md bg-white/[0.06] p-3 text-sm font-bold text-white/75"
                        >
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 text-brand-primary"
                          />
                          <span className="min-w-0 break-words">
                            {topic.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="faq-browser"
        className="section-botanical relative scroll-mt-28 overflow-hidden py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-20 h-52 w-52 rounded-full border border-brand-success/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-32 h-36 w-36 rounded-full border border-brand-success/10"
        />
        <Container className="relative">
          <SectionHeader
            eyebrow="Questions and Answers"
            title="Find the answer you need"
            description="Search every answer or narrow the list by product, shipping, order, or return questions."
            className="mb-10"
          />
          <FAQAccordion faqs={faqs} />
        </Container>
      </section>
    </main>
  );
}

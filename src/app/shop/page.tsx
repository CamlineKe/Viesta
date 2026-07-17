import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

import { ProductGrid } from "@/components/shop/ProductGrid";
import { cardClassName } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop",
  description: "Browse Viesta nutrition and health supplements in Kenya.",
} satisfies Metadata;

export default function ShopPage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden border-b border-brand-border-soft">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.035]"
        >
          <defs>
            <pattern
              id="shop-intro-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="36%" height="100%" fill="url(#shop-intro-dots)" />
        </svg>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 hidden h-full w-[38%] text-brand-success opacity-[0.065] lg:block"
          fill="none"
          viewBox="0 0 520 420"
        >
          <path
            d="M416 420C378 350 366 282 378 214C390 146 424 82 486 20"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M380 302C326 276 294 238 282 188C330 196 364 224 382 270M398 218C364 180 356 140 372 96C408 120 418 158 398 218M426 142C420 102 436 66 474 38C488 76 474 112 426 142M404 352C438 318 474 304 510 310"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-8 h-52 w-52 rounded-full bg-brand-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-[16%] h-56 w-56 rounded-full bg-brand-success/[0.08] blur-3xl"
        />

        <Container className="relative grid gap-10 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:py-16">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-muted"
            >
              <Link className="transition hover:text-brand-charcoal" href="/">
                Home
              </Link>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
              <span className="text-brand-charcoal">Shop</span>
            </nav>

            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/85 px-4 py-2 shadow-brand-sm backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-charcoal sm:text-sm">
                Viesta Shop
              </p>
            </div>
            <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl lg:text-5xl">
              Find wellness products for your everyday goals.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Browse Viesta supplements by health goal, compare prices, and add
              products to your cart before WhatsApp checkout.
            </p>
            <a
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-brand-charcoal active:scale-[0.97]"
              href="#product-catalog"
            >
              Browse all products
              <ArrowDown aria-hidden="true" className="ml-2 h-5 w-5" />
            </a>
          </div>

          <aside className="surface-raised relative min-w-0 overflow-hidden rounded-brand-xl p-5 sm:p-6 lg:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-primary/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-brand-lg bg-brand-charcoal text-brand-primary">
                <ShoppingBag aria-hidden="true" className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-success">
                Clear product discovery
              </p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold leading-tight text-brand-charcoal">
                Start with what matters to you.
              </h2>
              <ul className="mt-5 space-y-3 border-t border-brand-border-soft pt-5">
                {[
                  "Browse by wellness goal",
                  "Compare confirmed prices",
                  "Prepare checkout on WhatsApp",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-bold text-brand-muted"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-brand-success"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section
        id="product-catalog"
        className="scroll-mt-28 bg-brand-canvas py-10 lg:py-14"
      >
        <Container>
          <Suspense
            fallback={
              <div
                className={cardClassName({
                  className: "text-brand-muted",
                  padding: "lg",
                  variant: "raised",
                })}
              >
                Loading products...
              </div>
            }
          >
            <ProductGrid categories={categories} products={products} />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}

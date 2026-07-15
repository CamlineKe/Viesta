import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { BlogCard } from "@/components/content/BlogCard";
import { TrustBadges } from "@/components/product/TrustBadges";
import { ProductCard } from "@/components/shop/ProductCard";
import { cardClassName } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredBlogPosts } from "@/data/blog-posts";
import { categories } from "@/data/categories";
import { featuredProducts, products } from "@/data/products";

const heroTrustItems = [
  { label: "Free Nairobi & Kiambu delivery", icon: Truck },
  { label: "Clear product information", icon: ShieldCheck },
  { label: "Simple WhatsApp ordering", icon: MessageCircle },
];

const categoryCounts = products.reduce<Record<string, number>>(
  (counts, product) => {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
    return counts;
  },
  {},
);

export default function HomePage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.035]"
        >
          <defs>
            <pattern id="home-hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="42%" height="100%" fill="url(#home-hero-dots)" />
        </svg>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-4 hidden h-[92%] w-[46%] text-brand-success opacity-[0.08] md:block"
          fill="none"
          viewBox="0 0 560 720"
        >
          <path
            d="M470 716C404 590 390 475 408 360C426 245 468 143 536 44"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M410 494C334 450 291 390 276 314C345 329 392 373 414 446M429 351C379 294 363 233 381 166C434 202 454 255 429 351M466 226C454 166 469 112 512 65C540 123 524 177 466 226M445 572C493 510 540 481 558 475"
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
          className="pointer-events-none absolute -bottom-24 right-[16%] h-72 w-72 rounded-full bg-brand-success/10 blur-3xl"
        />

        <Container className="relative grid min-h-[70svh] items-center gap-12 py-14 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-20">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/80 px-4 py-2 shadow-brand-sm backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-charcoal sm:text-sm">
                Health, Beauty &amp; Wellness
              </p>
            </div>
            <h1 className="mt-6 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              Wellness products for better everyday choices.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Discover thoughtfully selected supplements and everyday wellness
              essentials, with clear product information and convenient
              WhatsApp ordering in Kenya.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-brand-charcoal active:scale-[0.97]"
              >
                Explore products
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-border bg-white/80 px-6 font-heading font-extrabold text-brand-charcoal backdrop-blur-sm transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary-muted focus-visible:outline-brand-charcoal active:scale-[0.97]"
              >
                Learn about Viesta
              </Link>
            </div>
            <div className="mt-8 grid overflow-hidden rounded-brand-lg border border-white/80 bg-white/80 shadow-brand-sm backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-brand-border-soft">
              {heroTrustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex min-w-0 items-center gap-2 border-b border-brand-border-soft px-4 py-3 text-sm font-bold leading-5 text-brand-charcoal last:border-b-0 sm:border-b-0"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-brand-success"
                    />
                    {item.label}
                  </div>
                );
              })}
            </div>
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
              <div className="relative aspect-[16/10] overflow-hidden rounded-brand-lg bg-brand-primary-muted">
                <Image
                  fill
                  priority
                  alt="Herbal tea, plant ingredients, and nutrition capsules representing nature-inspired wellness"
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  src="/images/brand/hero.webp"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 max-w-lg p-5 text-white sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-primary sm:text-sm">
                    Rooted in wellness
                  </p>
                  <p className="mt-2 max-w-md font-heading text-xl font-extrabold leading-tight sm:text-2xl">
                    Nature-inspired everyday wellness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-botanical py-16 lg:py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Shop by Category"
            title="Find support for your wellness routine"
            description="Browse Viesta categories by health goal, then move quickly into products that fit your routine."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const count = categoryCounts[category.id] ?? 0;

              return (
                <Link
                  key={category.id}
                  href={{
                    pathname: "/shop",
                    query: { category: category.slug },
                  }}
                  aria-label={`Browse ${category.name} products`}
                  className={cardClassName({
                    className:
                      "group overflow-hidden p-0 focus-visible:outline-offset-4",
                    variant: "interactive",
                  })}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-botanical via-brand-canvas to-brand-sun-wash">
                    <Image
                      fill
                      alt=""
                      className="object-contain p-4 transition duration-500 ease-out-expo group-hover:scale-105 group-focus-visible:scale-105"
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 42vw, 92vw"
                      src={category.image}
                    />
                  </div>
                  <div className="min-w-0 p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="break-words font-heading text-lg font-extrabold text-brand-charcoal">
                          {category.name}
                        </h3>
                        <p className="mt-2 text-sm font-bold text-brand-muted">
                          {count} product{count === 1 ? "" : "s"}
                        </p>
                      </div>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 h-5 w-5 shrink-0 text-brand-charcoal transition duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-brand-success group-focus-visible:translate-x-1 group-focus-visible:text-brand-success"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-brand-canvas py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Best Sellers"
              title="Popular wellness picks"
              description="Featured products from the Viesta catalog with clear pricing status, pack options, and WhatsApp checkout."
            />
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
            >
              View all products
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div
            aria-label="Featured products"
            className="-mx-4 mt-10 flex w-[calc(100%_+_2rem)] snap-x gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 md:mx-0 md:grid md:w-auto md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 2xl:grid-cols-4"
            role="region"
          >
            {featuredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="min-w-[82vw] snap-start sm:min-w-[340px] md:min-w-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-sun-wash py-16 lg:py-20">
        <Container>
          <TrustBadges />
        </Container>
      </section>

      <section className="section-botanical py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Wellness Journal"
              title="Start with three essential guides"
              description="Understand blood pressure, glucose testing, and evidence-aware detox choices through practical, source-led education."
            />
            <Link
              href="/blog#browse-guides"
              className="inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
            >
              Browse all wellness guides
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div
            aria-label="Featured wellness guides"
            className="-mx-4 mt-10 flex w-[calc(100%_+_2rem)] snap-x gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 md:mx-0 md:grid md:w-auto md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3"
            role="region"
          >
            {featuredBlogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="min-w-[82vw] snap-start sm:min-w-[340px] md:min-w-0"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-charcoal py-16 text-white lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-primary">
              Explore With Clarity
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Make your next wellness choice with clearer context.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Read practical Viesta Wellness Journal guides, compare the
              available product range, or contact Viesta when you have a
              specific product or order question.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-primary-hover"
                href="/blog"
              >
                Read wellness guides
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 bg-white/5 px-6 font-heading font-extrabold text-white transition hover:-translate-y-0.5 hover:border-brand-primary hover:bg-white/10"
                href="/contact"
              >
                Contact Viesta
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Droplets,
  Footprints,
  HeartPulse,
  MoonStar,
  Salad,
  Stethoscope,
} from "lucide-react";

import { BlogCard } from "@/components/content/BlogCard";
import { BlogGrid } from "@/components/content/BlogGrid";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Badge } from "@/components/ui/Badge";
import { cardClassName } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBlogCategoryLabel } from "@/data/blog-categories";
import { getBlogReadTimeLabel } from "@/data/blog-editorial";
import { featuredBlogPosts, publishedBlogPosts } from "@/data/blog-posts";
import { siteContent } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Wellness Blog",
  description:
    "Practical, source-led wellness guides covering blood pressure, diabetes, nutrition, movement, immunity, and informed herbal-product choices.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Viesta Wellness Blog",
    description:
      "Practical wellness education for informed everyday health decisions.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/images/blog/blood-pressure-awareness.webp",
        width: 1600,
        height: 1000,
        alt: "An adult calmly checking their blood pressure at home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viesta Wellness Blog",
    description:
      "Practical wellness education for informed everyday health decisions.",
    images: ["/images/blog/blood-pressure-awareness.webp"],
  },
} satisfies Metadata;

const livingEssentials = [
  {
    title: "Hydrate consistently",
    description: "Keep water available and adjust your intake for activity, climate, and professional advice.",
    icon: Droplets,
  },
  {
    title: "Build balanced meals",
    description: "Choose varied, minimally processed foods and routines that are realistic for your household.",
    icon: Salad,
  },
  {
    title: "Move regularly",
    description: "Use walking, mobility work, or other suitable activity to break up long periods of sitting.",
    icon: Footprints,
  },
  {
    title: "Protect your sleep",
    description: "Create a repeatable wind-down routine and take persistent sleep difficulties seriously.",
    icon: MoonStar,
  },
  {
    title: "Track meaningful changes",
    description: "Record readings or recurring symptoms so professional conversations are more useful.",
    icon: HeartPulse,
  },
  {
    title: "Keep professional care connected",
    description: "Use wellness education to prepare better questions, not to replace diagnosis or treatment.",
    icon: Stethoscope,
  },
];

export default function BlogPage() {
  const leadingPost = featuredBlogPosts[0];
  const updatesUrl = buildWhatsAppUrl(
    siteContent.contact.whatsapp,
    "Hello Viesta Nutrition, I'd like to receive practical wellness tips and new blog updates on WhatsApp.",
  );

  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.035]"
        >
          <defs>
            <pattern id="blog-hero-dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="44%" height="100%" fill="url(#blog-hero-dots)" />
        </svg>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-5 hidden h-[95%] w-[45%] text-brand-success opacity-[0.08] lg:block"
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
          className="pointer-events-none absolute -left-20 top-16 h-60 w-60 rounded-full bg-brand-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 right-[15%] h-72 w-72 rounded-full bg-brand-success/10 blur-3xl"
        />

        <Container className="relative grid min-h-[70svh] items-center gap-12 py-14 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 lg:py-20">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/80 px-4 py-2 shadow-brand-sm backdrop-blur-sm">
              <BookOpenText aria-hidden="true" className="h-4 w-4 text-brand-success" />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] sm:text-sm">
                Viesta Wellness Journal
              </p>
            </div>
            <h1 className="mt-6 break-words font-heading text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl">
              Your daily guide to better health decisions.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Explore source-led wellness guidance designed to make blood pressure, diabetes,
              nutrition, movement, and herbal-product choices easier to understand.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover active:scale-[0.97]"
                href="#browse-guides"
              >
                Browse all guides
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-border bg-white/80 px-6 font-heading font-extrabold backdrop-blur-sm transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary-muted active:scale-[0.97]"
                href="#healthy-living"
              >
                Daily essentials
              </Link>
            </div>
            <div className="mt-8 border-l-2 border-brand-primary pl-4">
              <p className="text-sm font-bold leading-6">
                Practical education
                <span aria-hidden="true" className="mx-2 text-brand-muted/60">·</span>
                Named sources
                <span aria-hidden="true" className="mx-2 text-brand-muted/60">·</span>
                Clear safety guidance
              </p>
            </div>
          </div>

          {leadingPost ? (
            <article className="relative min-w-0 animate-scale-in">
              <div
                aria-hidden="true"
                className="absolute -left-5 -top-5 h-24 w-24 rounded-brand-xl bg-brand-primary sm:-left-7 sm:-top-7"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 h-32 w-32 rounded-brand-xl border-2 border-brand-success/20 sm:-bottom-7 sm:-right-7"
              />
              <div className="glass-surface relative overflow-hidden rounded-brand-xl p-3 sm:p-4">
                <Link
                  aria-label={`Read ${leadingPost.title}`}
                  className="group block"
                  href={`/blog/${leadingPost.slug}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-brand-lg bg-brand-primary-muted sm:aspect-[16/10]">
                    <Image
                      fill
                      priority
                      alt={leadingPost.coverImage.alt}
                      className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 52vw, 92vw"
                      src={leadingPost.coverImage.src}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="default">{getBlogCategoryLabel(leadingPost.category)}</Badge>
                        <span className="text-xs font-bold text-white/80">
                          {getBlogReadTimeLabel(leadingPost.readTimeMinutes)}
                        </span>
                      </div>
                      <h2 className="mt-4 max-w-2xl font-heading text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                        {leadingPost.title}
                      </h2>
                      <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-primary transition group-hover:gap-3">
                        Read the featured guide
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </article>
          ) : null}
        </Container>
      </section>

      <section className="section-botanical relative overflow-hidden py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-16 h-52 w-52 rounded-full border border-brand-success/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-28 h-36 w-36 rounded-full border border-brand-success/10"
        />
        <Container className="relative">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Start Here"
              title="Three essential wellness guides"
              description="Begin with clear explanations of blood pressure, glucose testing, and evidence-aware detox choices."
            />
            <Link
              className="inline-flex items-center gap-2 font-heading text-sm font-extrabold transition hover:gap-3"
              href="#browse-guides"
            >
              Explore every topic
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div
            aria-label="Featured wellness guides"
            className="-mx-4 mt-10 flex w-[calc(100%_+_2rem)] snap-x gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 md:mx-0 md:grid md:w-auto md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3"
            role="region"
          >
            {featuredBlogPosts.map((post) => (
              <div key={post.id} className="min-w-[82vw] snap-start sm:min-w-[340px] md:min-w-0">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="browse-guides" className="section-canvas scroll-mt-24 py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
            <SectionHeader
              eyebrow="Browse by Topic"
              title="Wellness guidance for everyday questions"
              description="Filter the journal by topic, then choose the guide that best matches what you want to understand."
            />
            <div className="border-l-2 border-brand-primary pl-5 sm:pl-7">
              <p className="font-heading text-xl font-extrabold leading-8 sm:text-2xl">
                Read with context, not quick promises.
              </p>
              <p className="mt-3 text-base leading-8 text-brand-muted">
                Each guide identifies its sources, separates education from product discovery, and
                explains when professional care matters.
              </p>
            </div>
          </div>
          <BlogGrid posts={publishedBlogPosts} />
        </Container>
      </section>

      <section id="healthy-living" className="section-sun-wash scroll-mt-24 py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow="Healthy Living Essentials"
            title="Small actions that strengthen the whole routine"
            description="A simple checklist for busy days—use it as a foundation, then adapt it to your health and professional guidance."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {livingEssentials.map((essential) => {
              const Icon = essential.icon;

              return (
                <article
                  key={essential.title}
                  className={cardClassName({
                    className: "flex min-w-0 gap-4 p-5 sm:p-6",
                    variant: "flat",
                  })}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-extrabold">{essential.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{essential.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-brand-lg border border-brand-primary/40 bg-white/70 p-4 backdrop-blur-sm sm:p-5">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-success" />
            <p className="text-sm leading-7 text-brand-muted">
              These are general wellness habits, not personalized targets. Adapt food, fluids,
              movement, monitoring, and supplements with qualified advice when a health condition,
              medication, pregnancy, or recovery changes what is appropriate for you.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-charcoal py-16 text-white lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-success/15 blur-3xl"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-primary">
              Stay Connected
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Keep practical wellness guidance close.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/70">
              Ask to receive new Viesta guides and product-education updates through WhatsApp—no
              unsupported email subscription required.
            </p>
            <a
              className="mt-8 inline-flex min-h-12 max-w-full items-center justify-center rounded-md bg-brand-primary px-5 text-center font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-brand-primary-hover active:scale-[0.97] sm:px-6"
              href={updatesUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get blog updates on WhatsApp
              <WhatsAppIcon aria-hidden="true" className="ml-2 h-5 w-5" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

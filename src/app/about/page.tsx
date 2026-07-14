import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  FlaskConical,
  HeartPulse,
  ShieldCheck,
  Target,
} from "lucide-react";

import { cardClassName } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "About",
  description: "Learn about Viesta Nutrition and its wellness mission in Kenya.",
} satisfies Metadata;

const brandPillars = [
  {
    title: "Quality-led selection",
    description:
      "Premium supplements, personal care products, and wellness solutions selected to support healthier everyday routines.",
    icon: FlaskConical,
  },
  {
    title: "Natural wellness focus",
    description:
      "A considered focus on natural and sustainably sourced ingredients across the Viesta wellness range.",
    icon: HeartPulse,
  },
  {
    title: "Informed choices",
    description:
      "Clear product education and attentive customer care to help people make more confident wellness decisions.",
    icon: ShieldCheck,
  },
];

const wellnessAreas = [
  {
    title: "Everyday wellness",
    items: [
      "Health supplements",
      "Immunity products",
      "Weight management",
      "Vision support",
    ],
  },
  {
    title: "Targeted support",
    items: [
      "Blood sugar support",
      "Blood pressure support",
      "Joint & mobility care",
    ],
  },
  {
    title: "Personal wellbeing",
    items: ["Men's health", "Women's wellness", "Beauty & skincare"],
  },
];

const trustReasons = [
  {
    title: "Thoughtfully selected products",
    description:
      "A considered range of supplements, personal care products, and wellness solutions for different everyday needs.",
  },
  {
    title: "Natural wellness focus",
    description:
      "An emphasis on natural ingredients and sustainably minded sourcing as the Viesta product range grows.",
  },
  {
    title: "Clearer wellness decisions",
    description:
      "Useful product information and customer education designed to support more informed choices.",
  },
  {
    title: "Care grounded in integrity",
    description:
      "Customer care shaped by honest guidance, attentive support, and respect for each person's wellness journey.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.04]"
        >
          <defs>
            <pattern
              id="about-hero-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="42%" height="100%" fill="url(#about-hero-dots)" />
        </svg>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-4 hidden h-[92%] w-[46%] text-brand-success opacity-[0.08] lg:block"
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
          className="pointer-events-none absolute -bottom-24 right-[18%] h-72 w-72 rounded-full bg-brand-success/10 blur-3xl"
        />

        <Container className="relative grid min-h-[70svh] items-center gap-12 py-14 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-20">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/80 px-4 py-2 shadow-brand-sm backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-charcoal sm:text-sm">
                About Viesta
              </p>
            </div>
            <h1 className="mt-6 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              Wellness built around better everyday choices.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Viesta Health Shop is a Kenyan health and wellness brand helping
              individuals and families improve their wellbeing through quality
              health, beauty, and wellness products.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover active:scale-[0.97]"
                href="/shop"
              >
                Explore our products
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-border bg-white/80 px-6 font-heading font-extrabold text-brand-charcoal backdrop-blur-sm transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary-muted active:scale-[0.97]"
                href="#our-approach"
              >
                Our wellness approach
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 border-l-2 border-brand-primary pl-4">
              <p className="text-sm font-bold leading-6 text-brand-charcoal">
                Quality
                <span aria-hidden="true" className="mx-2 text-brand-muted/60">
                  ·
                </span>
                Integrity
                <span aria-hidden="true" className="mx-2 text-brand-muted/60">
                  ·
                </span>
                Customer care
              </p>
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
              <div className="relative aspect-[830/457] overflow-hidden rounded-brand-lg bg-brand-primary-muted">
                <Image
                  fill
                  priority
                  alt="A selection of Viesta teas, coffees, and nutrition products"
                  className="object-cover"
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  src="/images/brand/about_1.webp"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-primary sm:text-sm">
                    Rooted in everyday wellbeing
                  </p>
                  <p className="mt-2 hidden max-w-md font-heading text-2xl font-extrabold leading-tight sm:block sm:text-3xl">
                    Health, beauty, and wellness for individuals and families.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="our-approach"
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <SectionHeader
              eyebrow="Who We Are"
              title="A thoughtful approach to everyday wellbeing"
              description="Viesta brings together premium supplements, personal care products, and natural wellness solutions for individuals and families in Kenya."
            />
            <div className="border-l-2 border-brand-primary pl-5 sm:pl-7">
              <p className="font-heading text-xl font-extrabold leading-8 text-brand-charcoal sm:text-2xl sm:leading-9">
                We believe people should be able to approach wellness with
                greater clarity and confidence.
              </p>
              <p className="mt-4 text-base leading-8 text-brand-muted">
                That means combining a quality-led product range with integrity,
                useful education, and customer care that supports informed
                decisions.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {brandPillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className={cardClassName({
                    className: "min-w-0 p-4 sm:p-6",
                    variant: "flat",
                  })}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
                      <Icon aria-hidden="true" className="h-7 w-7" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-heading text-3xl font-extrabold text-brand-charcoal/10"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 break-words font-heading text-xl font-extrabold">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-sun-wash relative overflow-hidden py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-brand-primary/10"
        />
        <Container className="relative">
          <SectionHeader
            eyebrow="Our Purpose"
            title="Guided by purpose, growing with integrity"
            description="Our mission defines the difference we want to make today, while our vision sets the standard we are working toward across East Africa."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
            <article className="surface-raised min-w-0 rounded-brand-xl p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
                  <Target aria-hidden="true" className="h-7 w-7" />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-muted">
                  Present purpose
                </p>
              </div>
              <p className="mt-8 text-sm font-bold uppercase tracking-wide text-brand-success">
                Our Mission
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                Empower healthier choices
              </h3>
              <div className="mt-6 h-1 w-14 rounded-full bg-brand-primary" />
              <p className="mt-6 text-base leading-8 text-brand-muted">
                To empower people to take control of their health by providing
                safe, effective, and natural wellness solutions.
              </p>
            </article>

            <article className="min-w-0 overflow-hidden rounded-brand-xl bg-brand-charcoal p-6 text-white shadow-brand-lg sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-brand-lg bg-white/10 text-brand-primary">
                  <Eye aria-hidden="true" className="h-7 w-7" />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/55">
                  Future direction
                </p>
              </div>
              <p className="mt-8 text-sm font-bold uppercase tracking-wide text-brand-primary">
                Our Vision
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                Earn trust across East Africa
              </h3>
              <div className="mt-6 h-1 w-14 rounded-full bg-brand-primary" />
              <p className="mt-6 text-base leading-8 text-white/70">
                To become East Africa&apos;s most trusted health and wellness
                brand, recognized for quality, integrity, innovation, and
                customer care.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-canvas relative overflow-hidden py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border-[56px] border-brand-success/[0.06]"
        />
        <Container className="relative">
          <SectionHeader
            align="center"
            eyebrow="Core Highlights"
            title="Wellness support for different stages of life"
            description="Our growing range brings together everyday supplements, targeted wellness support, and personal care to serve a wide range of individual and family needs."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
            <figure className="relative min-w-0">
              <div
                aria-hidden="true"
                className="absolute -left-5 -top-5 h-full w-full rounded-brand-xl bg-brand-primary sm:-left-7 sm:-top-7"
              />
              <div className="surface-raised relative overflow-hidden rounded-brand-xl p-3 sm:p-4">
                <div className="relative aspect-[891/600] overflow-hidden rounded-brand-lg bg-white">
                  <Image
                    fill
                    alt="A selection of Viesta supplement products representing several wellness categories"
                    className="object-cover"
                    sizes="(min-width: 1024px) 44vw, 92vw"
                    src="/images/brand/product_categories.webp"
                  />
                </div>
                <figcaption className="flex items-start gap-3 px-2 pb-2 pt-5 sm:px-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-success"
                  />
                  <div>
                    <p className="font-heading text-lg font-extrabold text-brand-charcoal">
                      A growing wellness range
                    </p>
                    <p className="mt-1 text-sm leading-6 text-brand-muted">
                      Premium-quality products selected across everyday and
                      targeted wellness needs.
                    </p>
                  </div>
                </figcaption>
              </div>
            </figure>

            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-brand-border-soft bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-brand-charcoal shadow-brand-sm">
                  Premium-quality products
                </span>
                <span className="rounded-full border border-brand-border-soft bg-brand-botanical px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-brand-charcoal">
                  Natural ingredient focus
                </span>
              </div>

              <div className="mt-7 divide-y divide-brand-border-soft border-y border-brand-border-soft">
                {wellnessAreas.map((area, index) => (
                  <article
                    key={area.title}
                    className="grid gap-4 py-6 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className="font-heading text-sm font-extrabold text-brand-success"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl font-extrabold text-brand-charcoal">
                        {area.title}
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {area.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-brand-md border border-brand-border-soft bg-white px-3 py-2 text-sm font-bold leading-5 text-brand-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex gap-3 rounded-brand-lg border border-brand-success/15 bg-brand-botanical p-4 sm:p-5">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
                />
                <p className="text-sm leading-6 text-brand-muted">
                  Across every category, Viesta is committed to helping
                  customers make informed wellness decisions through trusted
                  products and customer education.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-botanical relative overflow-hidden py-16 lg:py-20">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 hidden h-[85%] w-[38%] text-brand-success opacity-[0.07] lg:block"
          fill="none"
          viewBox="0 0 480 620"
        >
          <path
            d="M40 620C94 510 122 408 124 314C126 220 106 126 64 32"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M122 384C184 338 222 282 236 216C178 230 140 268 122 328M112 250C62 220 30 180 16 132C68 140 102 172 112 224M124 472C184 460 234 474 274 514C216 532 166 518 124 472"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Why Choose Viesta"
              title="A wellness partner built on clarity and care"
              description="We want every interaction with Viesta to feel considered—from the products we bring together to the information and support that surround them."
            />

            <ol className="mt-8 divide-y divide-brand-border-soft border-y border-brand-border-soft">
              {trustReasons.map((reason, index) => (
                <li
                  key={reason.title}
                  className="grid gap-4 py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary font-heading text-sm font-extrabold text-brand-charcoal"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-extrabold text-brand-charcoal sm:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-brand-muted">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="relative min-w-0 lg:pl-4">
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-5 h-full w-[88%] rounded-brand-xl border-2 border-brand-success/15 sm:-right-7 sm:-top-7"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-1 h-32 w-32 rounded-brand-xl bg-brand-primary sm:-bottom-7 sm:-left-3"
            />
            <div className="surface-raised relative overflow-hidden rounded-brand-xl p-3 sm:p-4">
              <div className="relative aspect-[890/790] overflow-hidden rounded-brand-lg bg-brand-botanical">
                <Image
                  fill
                  alt="A person enjoying water beside fresh fruit in a bright, plant-filled room"
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  src="/images/brand/why_choose_viesta.webp"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/55 via-transparent to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-primary sm:text-sm">
                    The Viesta approach
                  </p>
                  <p className="mt-2 font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                    Thoughtful choices. Everyday support.
                  </p>
                </figcaption>
              </div>
            </div>
          </figure>
        </Container>
      </section>
    </main>
  );
}

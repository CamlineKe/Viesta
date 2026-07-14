import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  ShieldCheck,
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

export default function AboutPage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-muted">
              About Viesta
            </p>
            <h1 className="mt-3 break-words font-heading text-3xl font-extrabold leading-tight text-brand-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              Wellness built around better everyday choices.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Viesta Health Shop is a Kenyan health and wellness brand helping
              individuals and families improve their wellbeing through quality
              health, beauty, and wellness products.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
                href="/shop"
              >
                Explore our products
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-200 bg-white px-6 font-heading font-extrabold text-brand-charcoal transition hover:border-brand-primary"
                href="/contact"
              >
                Contact Viesta
              </Link>
            </div>
          </div>

          <div
            className={cardClassName({
              className: "rounded-brand-xl p-4 sm:p-5",
              variant: "raised",
            })}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-brand-lg bg-brand-primary-muted">
              <Image
                fill
                priority
                alt="A selection of Viesta teas, coffees, and nutrition products"
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 92vw"
                src="/images/brand/about_1.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/65 via-brand-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-heading text-2xl font-extrabold sm:text-3xl">
                  Wellbeing for individuals and families
                </p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Supplements, personal care products, and natural wellness
                  solutions for healthier lifestyles.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-botanical py-16 lg:py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Who We Are"
            title="A thoughtful approach to everyday wellbeing"
            description="Viesta brings together premium supplements, personal care products, and natural wellness solutions, with a commitment to quality, integrity, and customer education."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {brandPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className={cardClassName({
                    className: "min-w-0 p-4 sm:p-6",
                    variant: "flat",
                  })}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
                    <Icon aria-hidden="true" className="h-7 w-7" />
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

      <section className="section-sun-wash py-16 lg:py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Our Purpose"
            title="Guided by purpose, growing with integrity"
            description="Our mission defines the difference we want to make today, while our vision sets the standard we are working toward across East Africa."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article
              className={cardClassName({
                className: "min-w-0 p-6 sm:p-8",
                variant: "raised",
              })}
            >
              <p className="text-sm font-bold uppercase tracking-wide text-brand-success">
                Our Mission
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">
                Empower healthier choices
              </h3>
              <p className="mt-4 text-base leading-8 text-brand-muted">
                To empower people to take control of their health by providing
                safe, effective, and natural wellness solutions.
              </p>
            </article>

            <article
              className={cardClassName({
                className: "min-w-0 p-6 sm:p-8",
                variant: "raised",
              })}
            >
              <p className="text-sm font-bold uppercase tracking-wide text-brand-success">
                Our Vision
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">
                Earn trust across East Africa
              </h3>
              <p className="mt-4 text-base leading-8 text-brand-muted">
                To become East Africa&apos;s most trusted health and wellness
                brand, recognized for quality, integrity, innovation, and
                customer care.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-brand-canvas py-16 lg:py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Core Highlights"
            title="Wellness support for different stages of life"
            description="Our growing range brings together everyday supplements, targeted wellness support, and personal care to serve a wide range of individual and family needs."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {wellnessAreas.map((area) => (
              <article
                key={area.title}
                className={cardClassName({
                  className: "min-w-0 p-5 sm:p-6",
                  variant: "flat",
                })}
              >
                <h3 className="font-heading text-xl font-extrabold">
                  {area.title}
                </h3>
                <ul className="mt-5 space-y-4">
                  {area.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
                      />
                      <span className="text-sm leading-6 text-brand-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

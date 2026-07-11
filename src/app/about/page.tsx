import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, HeartPulse, ShieldCheck } from "lucide-react";

import { TestimonialCard } from "@/components/content/TestimonialCard";
import { cardClassName } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

export const metadata = {
  title: "About",
  description: "Learn about Viesta Nutrition and its wellness mission in Kenya.",
} satisfies Metadata;

export default function AboutPage() {
  const values = [
    {
      title: "Clinical clarity",
      description: "Product information should be easy to scan, compare, and confirm before ordering.",
      icon: FlaskConical,
    },
    {
      title: "Local convenience",
      description: "KES pricing, Kenyan delivery zones, M-Pesa instructions, and WhatsApp ordering stay central.",
      icon: HeartPulse,
    },
    {
      title: "Trust before purchase",
      description: "Missing product facts, legal text, and health claims are flagged until confirmed.",
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="About Viesta"
              title="Your trusted partner in health, beauty & wellness."
              description="At Viesta, we believe good health is the foundation of a fulfilling life. We provide thoughtfully selected supplements, wellness solutions, and personal care products to support everyday wellbeing."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
                href="/shop"
              >
                Shop products
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
                <p className="font-heading text-3xl font-extrabold">Wellness for everyday life</p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Thoughtfully selected products to help you feel well and live fully.
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
            eyebrow="Quality Promise"
            title="Built around transparent product decisions"
            description="The site keeps the purchase path simple while clearly separating educational wellness copy from facts that still need business confirmation."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className={cardClassName({
                    padding: "lg",
                    variant: "flat",
                  })}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary-muted text-brand-charcoal">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </div>
                  <h2 className="mt-5 font-heading text-xl font-extrabold">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{value.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-sun-wash py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Launch Notes"
              title="What still needs final confirmation"
              description="Before launch, Viesta should confirm the business and legal facts that affect customer trust and order handling."
            />
          </div>
          <div className="space-y-4">
            {[
              "Final product names, prices, ingredients, dosage, and compliant claims.",
              "Paybill/Till number, phone, email, physical address, and delivery operations.",
              "Returns, refunds, privacy policy, terms of service, and testimonial permissions.",
            ].map((item) => (
              <div
                key={item}
                className={cardClassName({
                  className: "flex gap-3",
                  padding: "sm",
                  variant: "flat",
                })}
              >
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-success" />
                <p className="text-sm leading-6 text-brand-muted">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-canvas py-16 lg:py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Customer Signals"
            title="Early feedback themes"
            description="Replace these with real customer testimonials only after permission to publish."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

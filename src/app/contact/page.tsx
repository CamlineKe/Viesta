import type { Metadata } from "next";
import {
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { WhatsAppInquiryForm } from "@/components/contact/WhatsAppInquiryForm";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Alert } from "@/components/ui/Alert";
import { cardClassName } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Contact Viesta Nutrition in Kenya.",
} satisfies Metadata;

const contactMethods = [
  {
    label: "Phone",
    value: siteContent.contact.phone,
    href: `tel:${siteContent.contact.phone}`,
    icon: Phone,
  },
  {
    label: "Email",
    value: siteContent.contact.email,
    href: `mailto:${siteContent.contact.email}`,
    icon: Mail,
  },
  {
    label: "Address",
    value: siteContent.contact.address,
    href: null,
    icon: MapPin,
  },
];

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteContent.contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.04]"
        >
          <defs>
            <pattern
              id="contact-hero-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="42%" height="100%" fill="url(#contact-hero-dots)" />
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
                Contact Viesta
              </p>
            </div>
            <h1 className="mt-6 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              Let&apos;s find the right next step together.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Reach Viesta for product questions, delivery coordination, payment
              confirmation, or support with an existing order.
            </p>
            <a
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-brand-charcoal active:scale-[0.97]"
              href="#contact-options"
            >
              Choose how to reach us
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
                    <MessageCircle aria-hidden="true" className="h-7 w-7" />
                  </div>
                  <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-primary sm:text-sm">
                    Helpful, direct support
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                    Start with the channel that works for you.
                  </h2>
                  <ul className="mt-7 space-y-4 border-t border-white/10 pt-6">
                    {[
                      "WhatsApp inquiry",
                      "Phone or email",
                      "Ruiru location details",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-bold text-white/75 sm:text-base"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-brand-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="contact-options"
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
            eyebrow="Contact Options"
            title="Talk to the Viesta team"
            description="Prepare an inquiry for WhatsApp or use the direct contact details that work best for you."
          />

          {siteContent.contact.needsConfirmation ? (
            <Alert
              className="mt-6 max-w-3xl"
              icon={<AlertTriangle className="h-5 w-5" />}
              title="Contact details need confirmation"
              variant="warning"
            >
              Contact details are placeholders until launch. Use this page to
              confirm the intended support experience, then replace the phone,
              email, WhatsApp, and address before publishing.
            </Alert>
          ) : null}

          <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <WhatsAppInquiryForm
              whatsappNumber={siteContent.contact.whatsapp}
            />

            <aside className="min-w-0 space-y-6">
              <div
                className={cardClassName({
                  className: "min-w-0 p-5 sm:p-6",
                  variant: "featured",
                })}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand-lg bg-brand-whatsapp text-white shadow-brand-sm">
                    <WhatsAppIcon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-success">
                      Direct chat
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-extrabold sm:text-2xl">
                      Prefer a quick WhatsApp conversation?
                    </h2>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-brand-muted">
                  Open a direct chat for a general question, or use the form to
                  prepare a more detailed inquiry first.
                </p>
                <a
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-whatsapp px-4 text-center font-heading font-extrabold text-white shadow-soft transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-brand-charcoal active:translate-y-0 active:scale-[0.97] sm:px-6"
                  href={whatsappUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <WhatsAppIcon aria-hidden="true" className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
                  Other contact options
                </p>
                <h2 className="mt-1 font-heading text-xl font-extrabold">
                  Phone, email, and location
                </h2>
                <div className="mt-3 space-y-3">
                  {contactMethods.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div
                        className={cardClassName({
                          className: "min-w-0 flex gap-4 p-4 sm:p-5",
                          variant: item.href ? "interactive" : "flat",
                        })}
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand-lg bg-brand-primary-muted">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                            {item.label}
                          </p>
                          <p
                            className={`mt-1 font-heading font-extrabold ${
                              item.label === "Email"
                                ? "break-all"
                                : "break-words"
                            }`}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a key={item.label} href={item.href}>
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, FileCheck2, Mail, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteContent } from "@/data/site";
import type { LegalPage, LegalPageSlug } from "@/types/content";

import { Alert } from "../ui/Alert";
import { cardClassName } from "../ui/Card";
import { Container } from "../ui/Container";

type LegalPageLayoutProps = {
  page: LegalPage;
};

const policyDetails: Record<
  LegalPageSlug,
  { title: string; description: string }
> = {
  "returns-refund-policy": {
    title: "Returns & Refund Policy",
    description: "Eligibility, reporting periods, remedies, and refund timing.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "How customer information is prepared, used, shared, and retained.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    description: "Ordering, payment, delivery, and storefront-use terms.",
  },
};

function formatPolicyDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function TableOfContents({ page }: LegalPageLayoutProps) {
  return (
    <nav aria-label={`On this page: ${page.title}`}>
      <p className="font-heading text-sm font-extrabold uppercase tracking-[0.14em] text-brand-charcoal">
        On this page
      </p>
      <ol className="mt-4 space-y-1 border-l border-brand-border-soft">
        {page.sections.map((section, index) => (
          <li key={section.id}>
            <a
              className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 border-l-2 border-transparent py-2 pl-3 text-sm leading-5 text-brand-muted transition hover:border-brand-primary hover:text-brand-charcoal focus-visible:border-brand-primary focus-visible:text-brand-charcoal focus-visible:outline-none"
              href={`#${section.id}`}
            >
              <span
                aria-hidden="true"
                className="text-xs font-bold text-brand-success"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LegalPageLayout({ page }: LegalPageLayoutProps) {
  const isPendingLegalReview =
    page.reviewStatus === "business-approved-legal-review-pending";
  const lastUpdatedLabel = formatPolicyDate(page.updatedAt);
  const effectiveDateLabel = page.effectiveDate
    ? formatPolicyDate(page.effectiveDate)
    : "Pending legal review";

  const contactLinks = {
    email: {
      label: "Email",
      value: siteContent.contact.email,
      href: `mailto:${siteContent.contact.email}`,
      icon: <Mail aria-hidden="true" className="h-5 w-5" />,
    },
    phone: {
      label: "Phone",
      value: siteContent.contact.phone,
      href: `tel:${siteContent.contact.phone}`,
      icon: <Phone aria-hidden="true" className="h-5 w-5" />,
    },
    whatsapp: {
      label: "WhatsApp",
      value: siteContent.contact.phone,
      href: `https://wa.me/${siteContent.contact.whatsapp.replace(/[^\d]/g, "")}`,
      icon: <WhatsAppIcon aria-hidden="true" className="h-5 w-5" />,
    },
  } as const;

  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <header className="section-botanical relative isolate overflow-hidden border-b border-brand-border-soft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-brand-success/[0.06]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-[12%] h-64 w-64 rounded-full bg-brand-primary/15 blur-3xl"
        />

        <Container className="relative py-12 lg:py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border-soft bg-white/80 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-charcoal shadow-brand-sm backdrop-blur-sm">
              <FileCheck2
                aria-hidden="true"
                className="h-4 w-4 text-brand-success"
              />
              Legal information
            </div>
            <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-tight text-brand-charcoal sm:text-4xl lg:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-brand-muted sm:text-lg">
              {page.summary}
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="font-bold text-brand-charcoal">Effective date</dt>
                <dd className="mt-1 text-brand-muted">
                  {page.effectiveDate ? (
                    <time dateTime={page.effectiveDate}>
                      {effectiveDateLabel}
                    </time>
                  ) : (
                    effectiveDateLabel
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-brand-charcoal">Last updated</dt>
                <dd className="mt-1 text-brand-muted">
                  <time dateTime={page.updatedAt}>{lastUpdatedLabel}</time>
                </dd>
              </div>
              <div>
                <dt className="font-bold text-brand-charcoal">Applies in</dt>
                <dd className="mt-1 text-brand-muted">Kenya</dd>
              </div>
            </dl>
          </div>
        </Container>
      </header>

      <section className="section-canvas py-10 lg:py-14">
        <Container>
          {isPendingLegalReview ? (
            <Alert
              className="max-w-4xl"
              icon={<FileCheck2 className="h-5 w-5" />}
              title="Business-approved draft pending legal review"
              variant="warning"
            >
              <p>
                This policy reflects Viesta&apos;s approved business rules but is
                awaiting qualified Kenyan legal review. Its effective date will
                be set after approval.
              </p>
            </Alert>
          ) : null}

          <details
            className={cardClassName({
              className: "mt-6 p-4 lg:hidden",
              variant: "flat",
            })}
          >
            <summary className="cursor-pointer font-heading font-extrabold text-brand-charcoal marker:text-brand-success">
              Browse policy sections
            </summary>
            <div className="mt-5">
              <TableOfContents page={page} />
            </div>
          </details>

          <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,52rem)] lg:items-start lg:gap-10">
            <aside
              className={cardClassName({
                className:
                  "hidden max-h-[calc(100vh-8rem)] overflow-y-auto p-5 lg:sticky lg:top-28 lg:block",
                variant: "flat",
              })}
            >
              <TableOfContents page={page} />
            </aside>

            <div className="min-w-0">
              <article
                className={cardClassName({
                  className: "p-5 sm:p-7 lg:p-10",
                  variant: "raised",
                })}
              >
                {page.sections.map((section, index) => (
                  <section
                    id={section.id}
                    key={section.id}
                    className={
                      index > 0
                        ? "mt-9 scroll-mt-28 border-t border-brand-border-soft pt-9"
                        : "scroll-mt-28"
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-4">
                      <span
                        aria-hidden="true"
                        className="pt-1 font-heading text-xs font-extrabold text-brand-success"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h2 className="break-words font-heading text-xl font-extrabold leading-tight text-brand-charcoal sm:text-2xl">
                          {section.heading}
                        </h2>
                        <div className="mt-4 space-y-4">
                          {section.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="break-words leading-8 text-brand-muted"
                            >
                              {paragraph}
                            </p>
                          ))}
                          {section.items?.length ? (
                            <ul className="space-y-3 leading-7 text-brand-muted">
                              {section.items.map((item) => (
                                <li
                                  key={item}
                                  className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-[0.65rem] h-2 w-2 rounded-full bg-brand-primary"
                                  />
                                  <span className="break-words">{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </article>

              <section className="mt-8 rounded-brand-lg border border-brand-success/15 bg-brand-botanical p-5 sm:p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-success">
                  Questions about this policy?
                </p>
                <h2 className="mt-2 font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
                  Contact {siteContent.legalName}
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-brand-muted">
                  Use one of the approved contact channels below. For an order,
                  return, or privacy request, include enough information for
                  Viesta to identify and respond to the matter.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {page.contactChannels.map((channel) => {
                    const contact = contactLinks[channel];

                    return (
                      <a
                        key={channel}
                        className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-md border border-brand-border bg-white px-4 py-2 text-sm font-extrabold text-brand-charcoal transition hover:border-brand-primary hover:bg-brand-primary-muted focus-visible:outline-brand-charcoal"
                        href={contact.href}
                        rel={
                          channel === "whatsapp"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        target={channel === "whatsapp" ? "_blank" : undefined}
                      >
                        <span className="shrink-0">{contact.icon}</span>
                        <span
                          className={
                            channel === "email" ? "break-all" : "break-words"
                          }
                        >
                          {contact.label}: {contact.value}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </section>

              <nav className="mt-10" aria-label="Related legal policies">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
                  Related policies
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {page.relatedPolicies.map((slug) => {
                    const policy = policyDetails[slug];

                    return (
                      <Link
                        key={slug}
                        className={cardClassName({
                          className:
                            "group flex min-w-0 items-start justify-between gap-4 p-5",
                          variant: "interactive",
                        })}
                        href={`/${slug}`}
                      >
                        <span className="min-w-0">
                          <span className="block font-heading text-lg font-extrabold text-brand-charcoal">
                            {policy.title}
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-brand-muted">
                            {policy.description}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="mt-1 h-5 w-5 shrink-0 text-brand-success transition group-hover:translate-x-1"
                        />
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

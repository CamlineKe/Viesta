import type { LegalPage } from "@/types/content";

import { Alert } from "../ui/Alert";
import { cardClassName } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

type LegalPageLayoutProps = {
  page: LegalPage;
};

export function LegalPageLayout({ page }: LegalPageLayoutProps) {
  return (
    <main className="section-canvas py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Legal"
          title={page.title}
          description={`Last updated: ${page.updatedAt}. This page currently includes draft launch text that needs final review.`}
        />

        {page.needsConfirmation?.length ? (
          <Alert
            className="mt-8 max-w-3xl"
            title="Needs confirmation before launch"
            variant="warning"
          >
            <p>{page.needsConfirmation.join(", ")}</p>
          </Alert>
        ) : null}

        <div
          className={cardClassName({
            className: "mt-10 max-w-3xl",
            padding: "lg",
            variant: "raised",
          })}
        >
          {page.sections.map((section, index) => (
            <section
              key={section.heading}
              className={
                index > 0
                  ? "mt-8 border-t border-brand-border-soft pt-8"
                  : undefined
              }
            >
              <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
                {section.heading}
              </h2>
              <p className="mt-3 leading-8 text-brand-muted">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}

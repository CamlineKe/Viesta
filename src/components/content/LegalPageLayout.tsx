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
          description={page.summary}
        />

        <p className="mt-4 text-sm font-semibold text-brand-muted">
          Effective date: {page.effectiveDate ?? "Pending legal review"}. Last
          updated: {page.updatedAt}.
        </p>

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
            className: "mt-10 max-w-3xl p-4 sm:p-6",
            variant: "raised",
          })}
        >
          {page.sections.map((section, index) => (
            <section
              id={section.id}
              key={section.id}
              className={
                index > 0
                  ? "mt-8 border-t border-brand-border-soft pt-8"
                  : undefined
              }
            >
              <h2 className="break-words font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="break-words leading-8 text-brand-muted"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="list-disc space-y-2 pl-6 leading-7 text-brand-muted">
                    {section.items.map((item) => (
                      <li key={item} className="break-words pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}

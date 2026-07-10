import type { LegalPage } from "@/types/content";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

type LegalPageLayoutProps = {
  page: LegalPage;
};

export function LegalPageLayout({ page }: LegalPageLayoutProps) {
  return (
    <main className="bg-white py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Legal"
          title={page.title}
          description={`Last updated: ${page.updatedAt}. This page currently includes draft launch text that needs final review.`}
        />

        {page.needsConfirmation?.length ? (
          <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            <p className="font-heading font-extrabold">Needs confirmation before launch</p>
            <p className="mt-1">{page.needsConfirmation.join(", ")}</p>
          </div>
        ) : null}

        <div className="mt-10 max-w-3xl space-y-6">
          {page.sections.map((section) => (
            <section key={section.heading} className="rounded-2xl border border-neutral-200/70 bg-brand-cream p-6">
              <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">{section.heading}</h2>
              <p className="mt-3 leading-8 text-brand-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}

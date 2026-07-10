import type { Metadata } from "next";

import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/faqs";

export const metadata = {
  title: "FAQs",
  description: "Common questions about Viesta products, orders, shipping, and returns.",
} satisfies Metadata;

export default function FAQsPage() {
  return (
    <main className="bg-brand-cream py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Answers about product information, ordering, payment confirmation, shipping zones, and returns."
          align="center"
          className="mb-10"
        />
        <FAQAccordion faqs={faqs} />
      </Container>
    </main>
  );
}

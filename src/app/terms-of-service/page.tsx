import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/content/LegalPageLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { legalPages } from "@/data/legal";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read the terms for using the Viesta storefront and requesting products for delivery within Kenya through WhatsApp.",
  alternates: {
    canonical: "/terms-of-service",
  },
  robots: {
    index: false,
    follow: true,
  },
} satisfies Metadata;

export default function TermsOfServicePage() {
  const page = legalPages.find((item) => item.slug === "terms-of-service");

  if (!page) {
    return (
      <main className="section-canvas py-16">
        <Container>
          <SectionHeader
            title="Terms of Service"
            description="Terms of service content is missing."
          />
        </Container>
      </main>
    );
  }

  return <LegalPageLayout page={page} />;
}

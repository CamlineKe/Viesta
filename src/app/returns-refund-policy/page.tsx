import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/content/LegalPageLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { legalPages } from "@/data/legal";

export const metadata = {
  title: "Returns & Refund Policy",
  description:
    "Review Viesta Health Nutrition's return eligibility, reporting periods, remedies, and refund timing for orders delivered in Kenya.",
  alternates: {
    canonical: "/returns-refund-policy",
  },
  robots: {
    index: false,
    follow: true,
  },
} satisfies Metadata;

export default function ReturnsRefundPolicyPage() {
  const page = legalPages.find((item) => item.slug === "returns-refund-policy");

  if (!page) {
    return (
      <main className="section-canvas py-16">
        <Container>
          <SectionHeader
            title="Returns & Refund Policy"
            description="Returns content is missing."
          />
        </Container>
      </main>
    );
  }

  return <LegalPageLayout page={page} />;
}

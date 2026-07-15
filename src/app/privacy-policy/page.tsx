import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/content/LegalPageLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { legalPages } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Viesta Health Nutrition handles information used for inquiries, WhatsApp orders, payment confirmation, and delivery in Kenya.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: false,
    follow: true,
  },
} satisfies Metadata;

export default function PrivacyPolicyPage() {
  const page = legalPages.find((item) => item.slug === "privacy-policy");

  if (!page) {
    return (
      <main className="section-canvas py-16">
        <Container>
          <SectionHeader
            title="Privacy Policy"
            description="Privacy policy content is missing."
          />
        </Container>
      </main>
    );
  }

  return <LegalPageLayout page={page} />;
}

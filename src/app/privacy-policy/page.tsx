import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LegalPageLayout } from "@/components/content/LegalPageLayout";
import { legalPages } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy",
  description: "Viesta Nutrition privacy policy.",
} satisfies Metadata;

export default function PrivacyPolicyPage() {
  const page = legalPages.find((item) => item.slug === "privacy-policy");

  if (!page) {
    return (
      <main className="bg-white py-16">
        <Container>
          <SectionHeader title="Privacy Policy" description="Privacy policy content is missing." />
        </Container>
      </main>
    );
  }

  return <LegalPageLayout page={page} />;
}

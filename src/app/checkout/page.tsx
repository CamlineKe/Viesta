import type { Metadata } from "next";

import { CheckoutView } from "@/components/checkout/CheckoutView";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Checkout",
  description: "Complete your Viesta order and send it through WhatsApp.",
} satisfies Metadata;

export default function CheckoutPage() {
  return (
    <main className="bg-brand-cream py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Checkout"
          title="Complete your WhatsApp order"
          description="Enter customer and delivery details, review totals, then send your order summary to Viesta on WhatsApp."
          className="mb-8"
        />
        <CheckoutView />
      </Container>
    </main>
  );
}

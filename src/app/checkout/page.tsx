import type { Metadata } from "next";

import { CheckoutView } from "@/components/checkout/CheckoutView";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Checkout",
  description:
    "Prepare a Viesta order request and send it through WhatsApp for availability, delivery, payment, and acceptance confirmation.",
} satisfies Metadata;

export default function CheckoutPage() {
  return (
    <main className="bg-brand-canvas py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Checkout"
          title="Prepare your WhatsApp order request"
          description="Enter customer and delivery details, review totals and policies, then send the prepared request to Viesta on WhatsApp for confirmation."
          className="mb-8"
        />
        <CheckoutView />
      </Container>
    </main>
  );
}

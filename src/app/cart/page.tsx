import type { Metadata } from "next";

import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Cart",
  description: "Review your Viesta cart before checkout.",
} satisfies Metadata;

export default function CartPage() {
  return (
    <main className="bg-brand-cream py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Cart"
          title="Review your order"
          description="Edit quantities, remove products, and continue to checkout when your wellness order is ready."
          className="mb-8"
        />
        <CartView />
      </Container>
    </main>
  );
}

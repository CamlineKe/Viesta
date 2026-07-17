import type { Metadata } from "next";

import { CheckoutView } from "@/components/checkout/CheckoutView";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Checkout",
  description:
    "Prepare a Viesta order request and send it through WhatsApp for availability, delivery, payment, and acceptance confirmation.",
} satisfies Metadata;

export default function CheckoutPage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden border-b border-brand-border-soft">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.02]"
        >
          <defs>
            <pattern
              id="checkout-intro-dots"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="24%" height="100%" fill="url(#checkout-intro-dots)" />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-44 w-44 rounded-full bg-brand-primary/[0.08] blur-3xl"
        />

        <Container className="relative py-9 lg:py-12">
          <div className="min-w-0 max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/90 px-4 py-2 shadow-brand-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-charcoal sm:text-sm">
                Secure checkout
              </p>
            </div>
            <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl lg:text-5xl">
              Prepare your WhatsApp order request.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Add customer and delivery details, review policies and totals,
              then send the prepared request to Viesta for confirmation.
            </p>
          </div>
        </Container>
      </section>

      <section
        id="checkout-workspace"
        className="bg-brand-canvas py-8 lg:py-12"
      >
        <Container>
          <CheckoutView />
        </Container>
      </section>
    </main>
  );
}

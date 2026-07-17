import type { Metadata } from "next";
import { CheckCircle2, ShoppingCart } from "lucide-react";

import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Cart",
  description: "Review your Viesta cart before checkout.",
} satisfies Metadata;

export default function CartPage() {
  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <section className="section-canvas relative isolate overflow-hidden border-b border-brand-border-soft">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.025]"
        >
          <defs>
            <pattern
              id="cart-intro-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="28%" height="100%" fill="url(#cart-intro-dots)" />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-4 h-48 w-48 rounded-full bg-brand-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 right-[14%] h-52 w-52 rounded-full bg-brand-success/[0.06] blur-3xl"
        />

        <Container className="relative grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-center lg:gap-16 lg:py-14">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-border-soft bg-white/90 px-4 py-2 shadow-brand-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-charcoal sm:text-sm">
                Your Cart
              </p>
            </div>
            <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-[1.08] text-brand-charcoal sm:text-4xl lg:text-5xl">
              Review your wellness order.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Confirm products and quantities before continuing to delivery,
              policy acknowledgement, and WhatsApp checkout.
            </p>
          </div>

          <aside className="surface-flat min-w-0 rounded-brand-xl p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
                <ShoppingCart aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-success">
                  Before checkout
                </p>
                <h2 className="mt-1 font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
                  Check every item first.
                </h2>
              </div>
            </div>
            <div className="mt-5 flex gap-3 border-t border-brand-border-soft pt-5">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
              />
              <p className="text-sm leading-6 text-brand-muted">
                Shipping, policies, and the final WhatsApp order request follow
                in checkout.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section
        id="cart-workspace"
        className="bg-brand-canvas py-10 lg:py-14"
      >
        <Container>
          <CartView />
        </Container>
      </section>
    </main>
  );
}

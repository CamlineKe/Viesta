import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { cardClassName } from "@/components/ui/Card";

export function EmptyCartState() {
  return (
    <section
      className={cardClassName({
        className: "min-w-0 px-6 py-14 text-center sm:py-16",
        variant: "raised",
      })}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-brand-xl bg-brand-primary-muted text-brand-charcoal">
        <ShoppingCart aria-hidden="true" className="h-10 w-10" />
      </div>
      <h2 className="mt-6 font-heading text-3xl font-extrabold text-brand-charcoal">
        Your cart is empty
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-brand-muted">
        Add supplements from the shop, then return here to review quantities
        before checkout.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
      >
        Start shopping
      </Link>
    </section>
  );
}

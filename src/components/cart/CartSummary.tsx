import Link from "next/link";
import { ArrowRight, CreditCard, Truck } from "lucide-react";

import { siteContent } from "@/data/site";
import { formatKES } from "@/lib/currency";
import { formatProductPrice } from "@/lib/product-pricing";
import { Alert } from "@/components/ui/Alert";
import { cardClassName } from "@/components/ui/Card";

type CartSummaryProps = {
  subtotal: number;
  itemCount: number;
  hasEstimatedPrices?: boolean;
};

export function CartSummary({
  subtotal,
  itemCount,
  hasEstimatedPrices = false,
}: CartSummaryProps) {
  return (
    <aside
      className={cardClassName({
        className: "lg:sticky lg:top-24",
        variant: "raised",
      })}
    >
      <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
        Cart summary
      </h2>

      <dl className="mt-6 space-y-4 border-b border-brand-border-soft pb-5">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm font-semibold text-brand-muted">Items</dt>
          <dd className="font-heading font-extrabold text-brand-charcoal">
            {itemCount}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm font-semibold text-brand-muted">Subtotal</dt>
          <dd className="font-heading font-extrabold text-brand-charcoal">
            {hasEstimatedPrices
              ? formatProductPrice(subtotal, "estimated")
              : formatKES(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm font-semibold text-brand-muted">Shipping</dt>
          <dd className="text-right text-sm font-bold text-brand-success">
            Calculated at checkout
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="font-heading text-lg font-extrabold text-brand-charcoal">
          Estimated total
        </span>
        <span className="font-heading text-2xl font-extrabold text-brand-charcoal">
          {hasEstimatedPrices
            ? formatProductPrice(subtotal, "estimated")
            : formatKES(subtotal)}
        </span>
      </div>

      {hasEstimatedPrices ? (
        <Alert className="mt-4 font-semibold" variant="warning">
          This cart includes estimated prices. Viesta will confirm final pricing
          on WhatsApp.
        </Alert>
      ) : null}

      <div className="mt-6 rounded-brand-lg border border-brand-border-soft bg-brand-botanical p-4">
        <div className="flex gap-3">
          <Truck
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
          />
          <p className="text-sm leading-6 text-brand-muted">
            Nairobi and Kiambu delivery are free. Other delivery fees are
            confirmed during checkout.
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <CreditCard
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-charcoal"
          />
          <p className="text-sm leading-6 text-brand-muted">
            {siteContent.payment.displayName}
          </p>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
      >
        Proceed to checkout
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </Link>

      <p className="mt-4 text-center text-xs font-semibold leading-5 text-brand-muted">
        Checkout prepares your WhatsApp order summary for confirmation.
      </p>
    </aside>
  );
}

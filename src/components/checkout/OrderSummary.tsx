"use client";

import Image from "next/image";
import Link from "next/link";
import { Copy, CreditCard, ShieldCheck, Truck } from "lucide-react";

import { useToast } from "@/context/ToastContext";
import { siteContent } from "@/data/site";
import { Alert } from "@/components/ui/Alert";
import { cardClassName } from "@/components/ui/Card";
import { formatKES } from "@/lib/currency";
import {
  formatProductLineTotal,
  formatProductPrice,
  hasConfirmedPrice,
} from "@/lib/product-pricing";
import { getShippingZone } from "@/lib/shipping";
import { hasCheckoutErrors, validateCheckout } from "@/lib/validation";
import type { CartItem } from "@/types/cart";
import type {
  CheckoutFormValues,
  CheckoutValidationErrors,
} from "@/types/checkout";

import { WhatsAppOrderButton } from "./WhatsAppOrderButton";

type OrderSummaryProps = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number | null;
  grandTotal: number | null;
  values: CheckoutFormValues;
  errors: CheckoutValidationErrors;
  whatsAppUrl: string;
  onValidationErrors: (errors: CheckoutValidationErrors) => void;
};

export function OrderSummary({
  items,
  itemCount,
  subtotal,
  shippingFee,
  grandTotal,
  values,
  errors,
  whatsAppUrl,
  onValidationErrors,
}: OrderSummaryProps) {
  const { showToast } = useToast();
  const zone = getShippingZone(values.deliveryLocation);
  const validationErrors = validateCheckout(values);
  const hasUnpricedItems = items.some((item) => !hasConfirmedPrice(item.price));
  const hasEstimatedPrices = items.some(
    (item) => item.priceStatus === "estimated",
  );
  const isDisabled =
    hasCheckoutErrors({ ...validationErrors, ...errors }) ||
    items.length === 0 ||
    hasUnpricedItems;
  const paymentNeedsConfirmation = siteContent.payment.needsConfirmation;
  const shippingLabel =
    shippingFee === null
      ? "Contact for fee"
      : shippingFee === 0
        ? "Free"
        : formatKES(shippingFee);
  const subtotalLabel = hasUnpricedItems
    ? "Price to confirm"
    : formatProductPrice(
        subtotal,
        hasEstimatedPrices ? "estimated" : undefined,
      );
  const totalLabel =
    hasUnpricedItems || grandTotal === null
      ? "To be confirmed"
      : formatProductPrice(
          grandTotal,
          hasEstimatedPrices ? "estimated" : undefined,
        );
  const paymentDetails = [
    siteContent.payment.displayName,
    `${siteContent.payment.accountLabel}: ${siteContent.payment.accountValue}`,
    siteContent.payment.instructions,
  ].join("\n");

  const handleCopyPayment = async () => {
    if (paymentNeedsConfirmation) {
      showToast(
        "Payment details need final confirmation before copying.",
        "info",
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(paymentDetails);
      showToast("Payment details copied.", "success");
    } catch {
      showToast(
        "Could not copy payment details. Please copy them manually.",
        "error",
      );
    }
  };

  return (
    <aside
      className={cardClassName({
        className: "lg:sticky lg:top-24",
        variant: "raised",
      })}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
            Order summary
          </h2>
          <p className="mt-1 text-sm text-brand-muted">
            {itemCount} item{itemCount === 1 ? "" : "s"} in this order.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-md px-2 py-1 text-sm font-bold text-brand-charcoal transition hover:bg-brand-primary-muted"
          href="/cart"
        >
          Edit cart
        </Link>
      </div>

      <div className="mt-6 space-y-4 border-b border-brand-border-soft pb-5">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <Link
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-brand-lg bg-brand-primary-muted"
              href={`/products/${item.slug}`}
            >
              <Image
                fill
                alt={`${item.name} product image`}
                className="object-contain p-1.5"
                sizes="56px"
                src={item.image}
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                className="line-clamp-2 text-sm font-bold leading-5 text-brand-charcoal transition hover:text-brand-muted"
                href={`/products/${item.slug}`}
              >
                {item.name}
              </Link>
              {item.packSize ? (
                <p className="mt-1 text-xs font-semibold text-brand-muted">
                  Pack: {item.packSize}
                </p>
              ) : null}
              <p className="mt-1 text-xs font-semibold text-brand-muted">
                Quantity: {item.quantity}
              </p>
            </div>
            <p className="shrink-0 text-sm font-extrabold text-brand-charcoal">
              {formatProductLineTotal(
                item.price,
                item.quantity,
                item.priceStatus,
              )}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-5 space-y-4 border-b border-brand-border-soft pb-5">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm font-semibold text-brand-muted">Subtotal</dt>
          <dd className="font-heading font-extrabold text-brand-charcoal">
            {subtotalLabel}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm font-semibold text-brand-muted">
            Shipping ({zone.name})
          </dt>
          <dd className="text-right text-sm font-bold text-brand-success">
            {shippingLabel}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 pt-2">
          <dt className="font-heading text-lg font-extrabold text-brand-charcoal">
            Grand total
          </dt>
          <dd className="text-right font-heading text-2xl font-extrabold text-brand-charcoal">
            {totalLabel}
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-brand-lg bg-brand-primary p-4 text-brand-charcoal">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CreditCard aria-hidden="true" className="h-5 w-5" />
            <h3 className="font-heading font-extrabold">
              {paymentNeedsConfirmation
                ? "Payment confirmation"
                : "Payment instructions"}
            </h3>
          </div>
          <button
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md bg-white/75 px-3 text-xs font-extrabold text-brand-charcoal transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={paymentNeedsConfirmation}
            type="button"
            onClick={handleCopyPayment}
          >
            <Copy aria-hidden="true" className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
        <div className="mt-3 space-y-2 text-sm font-semibold leading-6">
          <p>{siteContent.payment.displayName}</p>
          {!paymentNeedsConfirmation ? (
            <p>
              {siteContent.payment.accountLabel}:{" "}
              {siteContent.payment.accountValue}
            </p>
          ) : null}
          <p>{siteContent.payment.instructions}</p>
        </div>
        {paymentNeedsConfirmation ? (
          <p className="mt-3 rounded-md bg-white/70 px-3 py-2 text-xs font-bold">
            You can still send the order. Viesta will confirm payment details in
            WhatsApp before you pay.
          </p>
        ) : null}
      </div>

      {shippingFee === null ? (
        <Alert
          className="mt-4"
          icon={<Truck className="h-5 w-5" />}
          variant="warning"
        >
          <p>
            Shipping for this location will be confirmed on WhatsApp before
            payment.
          </p>
        </Alert>
      ) : null}

      {hasUnpricedItems ? (
        <Alert
          className="mt-4"
          icon={<CreditCard className="h-5 w-5" />}
          variant="warning"
        >
          <p>
            One or more products need price confirmation before WhatsApp
            checkout can continue.
          </p>
        </Alert>
      ) : null}

      {hasEstimatedPrices ? (
        <Alert
          className="mt-4"
          icon={<CreditCard className="h-5 w-5" />}
          variant="warning"
        >
          <p>
            This order includes estimated product prices. Viesta will confirm
            final pricing on WhatsApp.
          </p>
        </Alert>
      ) : null}

      <div className="mt-4 flex gap-3 rounded-brand-lg border border-brand-border-soft bg-brand-botanical p-4 text-sm leading-6 text-brand-muted">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
        />
        <p>
          Your order opens in WhatsApp with products, contact details, delivery
          details, and totals.
          {paymentNeedsConfirmation
            ? " Viesta will confirm payment details in the conversation before you pay."
            : " Payment confirmation instructions are included."}
        </p>
      </div>

      <WhatsAppOrderButton
        disabled={isDisabled}
        href={whatsAppUrl}
        values={values}
        onValidationErrors={onValidationErrors}
      />
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ShoppingBag, ShoppingCart } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cardClassName } from "@/components/ui/Card";
import { siteContent } from "@/data/site";
import { useCart } from "@/hooks/useCart";
import { calculateGrandTotal, getShippingFee } from "@/lib/shipping";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CheckoutFormValues, CheckoutValidationErrors } from "@/types/checkout";

import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";

const initialFormValues: CheckoutFormValues = {
  fullName: "",
  phone: "",
  deliveryLocation: "nairobi",
  deliveryAddress: "",
  orderNotes: "",
};

const progressSteps = [
  { label: "Cart", status: "complete" },
  { label: "Checkout", status: "current" },
  { label: "WhatsApp", status: "upcoming" },
] as const;

export function CheckoutView() {
  const { items, subtotal, itemCount } = useCart();
  const [values, setValues] = useState<CheckoutFormValues>(initialFormValues);
  const [errors, setErrors] = useState<CheckoutValidationErrors>({});

  const shippingFee = getShippingFee(values.deliveryLocation);
  const grandTotal = calculateGrandTotal(subtotal, values.deliveryLocation);

  const whatsAppMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        items,
        checkout: values,
        subtotal,
        shippingFee,
        grandTotal,
        paymentInstruction: siteContent.payment.instructions,
      }),
    [grandTotal, items, shippingFee, subtotal, values],
  );
  const whatsAppUrl = buildWhatsAppUrl(siteContent.contact.whatsapp, whatsAppMessage);

  if (items.length === 0) {
    return (
      <section
        className={cardClassName({
          className: "px-6 py-16 text-center",
          variant: "raised",
        })}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-primary-muted text-brand-charcoal">
          <ShoppingCart aria-hidden="true" className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-heading text-3xl font-extrabold text-brand-charcoal">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-brand-muted">
          Add products to your cart before starting WhatsApp checkout.
        </p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
          href="/shop"
        >
          Shop products
        </Link>
      </section>
    );
  }

  return (
    <>
      <nav
        aria-label="Checkout progress"
        className={cardClassName({
          className: "mb-8",
          padding: "sm",
          variant: "flat",
        })}
      >
        <ol className="grid gap-3 sm:grid-cols-3">
          {progressSteps.map((step, index) => (
            <li
              key={step.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                step.status === "current"
                  ? "bg-brand-primary-muted text-brand-charcoal"
                  : "text-brand-muted"
              }`}
            >
              {step.status === "complete" ? (
                <Link
                  className="flex items-center gap-3 rounded-lg transition hover:text-brand-charcoal"
                  href="/cart"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-success text-sm font-extrabold text-white">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="font-heading text-sm font-extrabold">{step.label}</span>
                </Link>
              ) : (
                <>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${
                      step.status === "current"
                        ? "bg-brand-primary text-brand-charcoal"
                        : "bg-brand-light text-brand-muted"
                    }`}
                  >
                    {step.status === "upcoming" ? (
                      <WhatsAppIcon className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="font-heading text-sm font-extrabold">{step.label}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div
        className={cardClassName({
          className:
            "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
          padding: "sm",
          variant: "flat",
        })}
      >
        <p className="text-sm font-semibold leading-6 text-brand-muted">
          Need to change quantities, choose another pack, or keep browsing?
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-brand-border-soft bg-white px-4 font-heading text-sm font-extrabold text-brand-charcoal transition hover:border-brand-primary hover:bg-brand-primary-muted"
            href="/cart"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to cart
          </Link>
          <Link
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-brand-primary px-4 font-heading text-sm font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
            href="/shop"
          >
            <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <CheckoutForm errors={errors} values={values} onErrorsChange={setErrors} onValuesChange={setValues} />
        <OrderSummary
          errors={errors}
          grandTotal={grandTotal}
          itemCount={itemCount}
          items={items}
          shippingFee={shippingFee}
          subtotal={subtotal}
          values={values}
          whatsAppUrl={whatsAppUrl}
          onValidationErrors={setErrors}
        />
      </div>
    </>
  );
}

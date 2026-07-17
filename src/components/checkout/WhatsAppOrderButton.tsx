"use client";

import type { MouseEvent } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { validateCheckout } from "@/lib/validation";
import type {
  CheckoutFormValues,
  CheckoutValidationErrors,
} from "@/types/checkout";

const checkoutFieldOrder: (keyof CheckoutValidationErrors)[] = [
  "fullName",
  "phone",
  "deliveryLocation",
  "acceptedLegalPolicies",
];

type WhatsAppOrderButtonProps = {
  href: string;
  values: CheckoutFormValues;
  disabled: boolean;
  requirementsMessage: string;
  onValidationErrors: (errors: CheckoutValidationErrors) => void;
};

export function WhatsAppOrderButton({
  href,
  values,
  disabled,
  requirementsMessage,
  onValidationErrors,
}: WhatsAppOrderButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const errors = validateCheckout(values);
    onValidationErrors(errors);

    if (disabled || Object.keys(errors).length > 0) {
      event.preventDefault();

      const firstInvalidField = checkoutFieldOrder.find(
        (field) => errors[field],
      );

      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }
    }
  };

  return (
    <div className="mt-6">
      <p
        id="whatsapp-order-requirements"
        className={`rounded-brand-lg border px-4 py-3 text-sm font-semibold leading-6 ${
          disabled
            ? "border-amber-200 bg-amber-50 text-amber-950"
            : "border-green-200 bg-green-50 text-green-950"
        }`}
        role="status"
      >
        {requirementsMessage}
      </p>
      <a
        aria-describedby="whatsapp-order-requirements"
        aria-disabled={disabled}
        className={`mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-4 text-center font-heading font-extrabold text-white shadow-soft transition sm:px-6 ${
          disabled
            ? "pointer-events-auto cursor-not-allowed bg-neutral-400"
            : "bg-brand-whatsapp hover:brightness-95"
        }`}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        onClick={handleClick}
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send order request via WhatsApp
      </a>
    </div>
  );
}

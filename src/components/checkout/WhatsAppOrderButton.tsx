"use client";

import type { MouseEvent } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { validateCheckout } from "@/lib/validation";
import type { CheckoutFormValues, CheckoutValidationErrors } from "@/types/checkout";

type WhatsAppOrderButtonProps = {
  href: string;
  values: CheckoutFormValues;
  disabled: boolean;
  onValidationErrors: (errors: CheckoutValidationErrors) => void;
};

export function WhatsAppOrderButton({
  href,
  values,
  disabled,
  onValidationErrors,
}: WhatsAppOrderButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const errors = validateCheckout(values);
    onValidationErrors(errors);

    if (disabled || Object.keys(errors).length > 0) {
      event.preventDefault();
    }
  };

  return (
    <a
      aria-disabled={disabled}
      className={`mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 font-heading font-extrabold text-white shadow-soft transition ${
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
      Order via WhatsApp
    </a>
  );
}

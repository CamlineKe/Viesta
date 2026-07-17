"use client";

import Link from "next/link";
import { MapPin, MessageSquare, ShieldCheck, User } from "lucide-react";

import { validateCheckout } from "@/lib/validation";
import type {
  CheckoutFormValues,
  CheckoutValidationErrors,
} from "@/types/checkout";
import { cardClassName } from "@/components/ui/Card";
import { FormField, getFieldControlClassName } from "@/components/ui/FormField";

import { DeliverySelector } from "./DeliverySelector";

type CheckoutFormProps = {
  values: CheckoutFormValues;
  errors: CheckoutValidationErrors;
  onValuesChange: (values: CheckoutFormValues) => void;
  onErrorsChange: (errors: CheckoutValidationErrors) => void;
};

export function CheckoutForm({
  values,
  errors,
  onValuesChange,
  onErrorsChange,
}: CheckoutFormProps) {
  const updateValues = (nextValues: CheckoutFormValues) => {
    onValuesChange(nextValues);

    if (Object.keys(errors).length > 0) {
      onErrorsChange(validateCheckout(nextValues));
    }
  };

  const handleBlur = () => {
    onErrorsChange(validateCheckout(values));
  };

  return (
    <form className="min-w-0 space-y-6" noValidate>
      <section
        className={cardClassName({
          className: "min-w-0 p-4 sm:p-5",
          variant: "raised",
        })}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <User aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
              Customer details
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Used only to prepare your WhatsApp order request.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField error={errors.fullName} id="fullName" label="Full name">
            {({ describedBy, id, invalid }) => (
              <input
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={getFieldControlClassName({ invalid })}
                id={id}
                name="fullName"
                placeholder="Jane Doe"
                required
                type="text"
                value={values.fullName}
                onBlur={handleBlur}
                onChange={(event) =>
                  updateValues({ ...values, fullName: event.target.value })
                }
              />
            )}
          </FormField>

          <FormField error={errors.phone} id="phone" label="Phone number">
            {({ describedBy, id, invalid }) => (
              <input
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={getFieldControlClassName({ invalid })}
                id={id}
                name="phone"
                placeholder="0712 345 678"
                required
                type="tel"
                value={values.phone}
                onBlur={handleBlur}
                onChange={(event) =>
                  updateValues({ ...values, phone: event.target.value })
                }
              />
            )}
          </FormField>
        </div>
      </section>

      <section
        className={cardClassName({
          className: "min-w-0 p-4 sm:p-5",
          variant: "raised",
        })}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <MapPin aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
              Delivery details
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Shipping updates as you choose a location.
            </p>
          </div>
        </div>

        <DeliverySelector
          error={errors.deliveryLocation}
          value={values.deliveryLocation}
          onChange={(deliveryLocation) =>
            updateValues({ ...values, deliveryLocation })
          }
        />

        <div className="mt-5">
          <FormField
            hint="Optional, but helpful for delivery."
            id="deliveryAddress"
            label="Delivery address or landmark"
          >
            {({ describedBy, id }) => (
              <textarea
                aria-describedby={describedBy}
                className={getFieldControlClassName({
                  className: "min-h-28 resize-y py-3",
                })}
                id={id}
                name="deliveryAddress"
                placeholder="Apartment, street, house number, or nearest landmark..."
                value={values.deliveryAddress ?? ""}
                onBlur={handleBlur}
                onChange={(event) =>
                  updateValues({
                    ...values,
                    deliveryAddress: event.target.value,
                  })
                }
              />
            )}
          </FormField>
        </div>
      </section>

      <section
        className={cardClassName({
          className: "min-w-0 p-4 sm:p-5",
          variant: "raised",
        })}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <MessageSquare aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
              Order notes
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Optional instructions for WhatsApp confirmation.
            </p>
          </div>
        </div>

        <FormField
          hint="These notes will be included in the WhatsApp message."
          id="orderNotes"
          label="Special instructions"
        >
          {({ describedBy, id }) => (
            <textarea
              aria-describedby={describedBy}
              className={getFieldControlClassName({
                className: "min-h-28 resize-y py-3",
              })}
              id={id}
              name="orderNotes"
              placeholder="Preferred delivery time, product questions, or payment note..."
              value={values.orderNotes ?? ""}
              onBlur={handleBlur}
              onChange={(event) =>
                updateValues({ ...values, orderNotes: event.target.value })
              }
            />
          )}
        </FormField>
      </section>

      <section
        className={cardClassName({
          className: "min-w-0 p-4 sm:p-5",
          variant: "raised",
        })}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-extrabold text-brand-charcoal sm:text-2xl">
              Review and acknowledgement
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Required before the order request can open in WhatsApp.
            </p>
          </div>
        </div>

        <div
          className={`rounded-brand-lg border p-4 ${
            errors.acceptedLegalPolicies
              ? "border-red-300 bg-red-50"
              : "border-brand-border-soft bg-brand-botanical"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              aria-describedby={
                errors.acceptedLegalPolicies
                  ? "acceptedLegalPolicies-description acceptedLegalPolicies-error"
                  : "acceptedLegalPolicies-description"
              }
              aria-invalid={Boolean(errors.acceptedLegalPolicies)}
              checked={values.acceptedLegalPolicies}
              className="mt-1 h-5 w-5 shrink-0 rounded border-brand-border text-brand-success accent-brand-success focus:ring-2 focus:ring-brand-primary/40"
              id="acceptedLegalPolicies"
              name="acceptedLegalPolicies"
              required
              type="checkbox"
              onBlur={handleBlur}
              onChange={(event) =>
                updateValues({
                  ...values,
                  acceptedLegalPolicies: event.target.checked,
                })
              }
            />
            <div className="min-w-0">
              <label
                className="text-sm font-bold leading-6 text-brand-charcoal"
                htmlFor="acceptedLegalPolicies"
              >
                I have read and agree to the{" "}
                <Link
                  className="underline decoration-brand-primary decoration-2 underline-offset-2 hover:text-brand-muted"
                  href="/terms-of-service"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Terms of Service
                </Link>{" "}
                and acknowledge the{" "}
                <Link
                  className="underline decoration-brand-primary decoration-2 underline-offset-2 hover:text-brand-muted"
                  href="/privacy-policy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                .
              </label>
              <p
                className="mt-2 text-xs leading-5 text-brand-muted"
                id="acceptedLegalPolicies-description"
              >
                Your details remain in this browser until you open WhatsApp.
                WhatsApp and Meta may then process the prepared content; Viesta
                receives it when you send the message. Eligible order issues
                are handled under the{" "}
                <Link
                  className="font-bold underline underline-offset-2"
                  href="/returns-refund-policy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Returns &amp; Refund Policy
                </Link>
                .
              </p>
              {errors.acceptedLegalPolicies ? (
                <p
                  className="mt-2 text-sm font-semibold text-red-700"
                  id="acceptedLegalPolicies-error"
                  role="alert"
                >
                  {errors.acceptedLegalPolicies}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

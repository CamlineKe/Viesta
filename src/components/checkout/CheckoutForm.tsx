"use client";

import { MapPin, MessageSquare, User } from "lucide-react";

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
    <form className="space-y-6" noValidate>
      <section className={cardClassName({ variant: "raised" })}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <User aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
              Customer details
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Used only to prepare your WhatsApp order.
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

      <section className={cardClassName({ variant: "raised" })}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <MapPin aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
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

      <section className={cardClassName({ variant: "raised" })}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal">
            <MessageSquare aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
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
    </form>
  );
}

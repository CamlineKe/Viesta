"use client";

import { shippingZones } from "@/data/shipping-zones";
import { formatKES } from "@/lib/currency";
import { getFieldControlClassName } from "@/components/ui/FormField";
import type { DeliveryLocation } from "@/types/checkout";

type DeliverySelectorProps = {
  value: DeliveryLocation;
  error?: string;
  onChange: (location: DeliveryLocation) => void;
};

export function DeliverySelector({
  value,
  error,
  onChange,
}: DeliverySelectorProps) {
  const selectedZone = shippingZones.find((zone) => zone.id === value);
  const descriptionId = error
    ? "deliveryLocation-error"
    : selectedZone
      ? "deliveryLocation-description"
      : undefined;

  return (
    <div>
      <label
        className="block text-sm font-bold text-brand-charcoal"
        htmlFor="deliveryLocation"
      >
        Delivery location
      </label>
      <select
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error)}
        className={getFieldControlClassName({ invalid: Boolean(error) })}
        id="deliveryLocation"
        name="deliveryLocation"
        required
        value={value}
        onChange={(event) => onChange(event.target.value as DeliveryLocation)}
      >
        <option disabled value="">
          Select your delivery location
        </option>
        {shippingZones.map((zone) => {
          const feeLabel =
            zone.fee === null
              ? "Contact for fee"
              : zone.fee === 0
                ? "Free"
                : formatKES(zone.fee);

          return (
            <option key={zone.id} value={zone.id}>
              {zone.name} — {feeLabel}
            </option>
          );
        })}
      </select>
      {error ? (
        <p
          className="mt-2 break-words text-sm font-semibold text-brand-danger"
          id="deliveryLocation-error"
          role="alert"
        >
          {error}
        </p>
      ) : selectedZone ? (
        <p
          className="mt-2 text-xs font-semibold leading-5 text-brand-muted"
          id="deliveryLocation-description"
        >
          {selectedZone.description}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { shippingZones } from "@/data/shipping-zones";
import { formatKES } from "@/lib/currency";
import type { ShippingZoneId } from "@/types/checkout";

type DeliverySelectorProps = {
  value: ShippingZoneId;
  error?: string;
  onChange: (location: ShippingZoneId) => void;
};

export function DeliverySelector({ value, error, onChange }: DeliverySelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-bold text-brand-charcoal">Delivery location</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {shippingZones.map((zone) => {
          const isSelected = zone.id === value;
          const feeLabel =
            zone.fee === null ? "Contact for fee" : zone.fee === 0 ? "Free" : formatKES(zone.fee);

          return (
            <label
              key={zone.id}
              className={`cursor-pointer rounded-brand-lg border p-4 transition ${
                isSelected
                  ? "border-brand-primary bg-brand-sun-wash shadow-brand-sm"
                  : "border-brand-border-soft bg-white hover:border-brand-primary"
              }`}
            >
              <span className="flex items-start gap-3">
                <input
                  checked={isSelected}
                  className="mt-1 h-4 w-4 accent-brand-primary"
                  name="deliveryLocation"
                  type="radio"
                  value={zone.id}
                  onChange={() => onChange(zone.id)}
                />
                <span>
                  <span className="block font-heading font-extrabold text-brand-charcoal">{zone.name}</span>
                  <span className="mt-1 block text-sm font-bold text-brand-success">{feeLabel}</span>
                  <span className="mt-1 block text-xs leading-5 text-brand-muted">{zone.description}</span>
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-sm font-semibold text-brand-danger">{error}</p> : null}
    </fieldset>
  );
}

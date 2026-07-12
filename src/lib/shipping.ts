import { shippingZones } from "@/data/shipping-zones";
import type { DeliveryLocation } from "@/types/checkout";

export function getShippingZone(location: DeliveryLocation) {
  return shippingZones.find((zone) => zone.id === location);
}

export function getShippingFee(location: DeliveryLocation): number | null {
  return getShippingZone(location)?.fee ?? null;
}

export function calculateGrandTotal(subtotal: number, location: DeliveryLocation): number | null {
  const fee = getShippingFee(location);

  if (fee === null) {
    return null;
  }

  return subtotal + fee;
}

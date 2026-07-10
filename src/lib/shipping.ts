import { shippingZones } from "@/data/shipping-zones";
import type { ShippingZoneId } from "@/types/checkout";

export function getShippingZone(location: ShippingZoneId) {
  return shippingZones.find((zone) => zone.id === location) ?? shippingZones[shippingZones.length - 1];
}

export function getShippingFee(location: ShippingZoneId): number | null {
  return getShippingZone(location).fee;
}

export function calculateGrandTotal(subtotal: number, location: ShippingZoneId): number | null {
  const fee = getShippingFee(location);

  if (fee === null) {
    return null;
  }

  return subtotal + fee;
}

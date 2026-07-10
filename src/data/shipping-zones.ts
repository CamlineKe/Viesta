import type { ShippingZone } from "@/types/checkout";

export const shippingZones: ShippingZone[] = [
  {
    id: "nairobi",
    name: "Nairobi",
    fee: 0,
    description: "Free delivery within Nairobi.",
    requiresContact: false,
  },
  {
    id: "kiambu",
    name: "Kiambu",
    fee: 0,
    description: "Free delivery within Kiambu.",
    requiresContact: false,
  },
  {
    id: "mombasa",
    name: "Mombasa",
    fee: 500,
    description: "Flat-rate delivery outside the free zone.",
    requiresContact: false,
  },
  {
    id: "kisumu",
    name: "Kisumu",
    fee: 500,
    description: "Flat-rate delivery outside the free zone.",
    requiresContact: false,
  },
  {
    id: "nakuru",
    name: "Nakuru",
    fee: 500,
    description: "Flat-rate delivery outside the free zone.",
    requiresContact: false,
  },
  {
    id: "eldoret",
    name: "Eldoret",
    fee: 500,
    description: "Flat-rate delivery outside the free zone.",
    requiresContact: false,
  },
  {
    id: "other",
    name: "Other / Rest of Kenya",
    fee: null,
    description: "Contact Viesta to confirm the delivery fee.",
    requiresContact: true,
  },
];

import { BadgeCheck, CreditCard, ShieldCheck, Truck } from "lucide-react";

import { cardClassName } from "@/components/ui/Card";

const trustBadges = [
  {
    label: "Thoughtfully Selected",
    sublabel: "Products for everyday wellness",
    icon: ShieldCheck,
  },
  {
    label: "Clear Information",
    sublabel: "Details for informed choices",
    icon: BadgeCheck,
  },
  {
    label: "Kenya Delivery",
    sublabel: "Kenya delivery support",
    icon: Truck,
  },
  {
    label: "M-Pesa Support",
    sublabel: "Details confirmed on WhatsApp",
    icon: CreditCard,
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trustBadges.map((badge) => {
        const Icon = badge.icon;

        return (
          <article
            key={badge.label}
            className={cardClassName({
              className: "min-w-0 flex items-center gap-4",
              padding: "sm",
              variant: "flat",
            })}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary-muted text-brand-charcoal">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="break-words font-heading font-extrabold text-brand-charcoal">
                {badge.label}
              </p>
              <p className="mt-1 text-sm text-brand-muted">
                {badge.sublabel}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

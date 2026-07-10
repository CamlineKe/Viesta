import { BadgeCheck, CreditCard, ShieldCheck, Truck } from "lucide-react";

const trustBadges = [
  {
    label: "Quality Guaranteed",
    sublabel: "Carefully selected products",
    icon: ShieldCheck,
  },
  {
    label: "Lab Tested",
    sublabel: "Product facts to confirm",
    icon: BadgeCheck,
  },
  {
    label: "Fast Delivery",
    sublabel: "Kenya delivery support",
    icon: Truck,
  },
  {
    label: "M-Pesa Ready",
    sublabel: "Paybill/Till checkout",
    icon: CreditCard,
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trustBadges.map((badge) => {
        const Icon = badge.icon;

        return (
          <div
            key={badge.label}
            className="flex items-center gap-4 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm backdrop-blur-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary-muted text-brand-charcoal">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-brand-charcoal">{badge.label}</p>
              <p className="mt-1 text-sm text-brand-muted">{badge.sublabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/class-names";

type BadgeVariant = "default" | "muted" | "success" | "warning" | "danger" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-brand-primary text-brand-charcoal",
  muted: "bg-brand-primary-muted text-brand-charcoal",
  success: "bg-green-50 text-brand-success",
  warning: "bg-orange-50 text-brand-warning",
  danger: "bg-red-50 text-brand-danger",
  info: "bg-blue-50 text-brand-info",
};

export function Badge({ className, variant = "muted", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-brand-sm",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

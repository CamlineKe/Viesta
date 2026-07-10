import type { HTMLAttributes } from "react";

import { cn } from "@/lib/class-names";

type CardVariant = "default" | "cream" | "interactive";
type CardPadding = "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
};

const variants: Record<CardVariant, string> = {
  default:
    "border border-neutral-200/70 bg-white/90 shadow-brand-sm backdrop-blur-md",
  cream: "border border-neutral-200/70 bg-brand-cream",
  interactive:
    "border border-neutral-200/70 bg-white/90 shadow-brand-sm backdrop-blur-md transition duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-primary hover:shadow-brand-xl focus-within:border-brand-primary focus-within:shadow-soft",
};

const paddings: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function cardClassName({
  variant = "default",
  padding = "md",
  className,
}: Pick<CardProps, "variant" | "padding" | "className"> = {}) {
  return cn(
    "rounded-brand-lg",
    variants[variant],
    paddings[padding],
    className,
  );
}

export function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div
      className={cardClassName({ className, variant, padding })}
      {...props}
    />
  );
}

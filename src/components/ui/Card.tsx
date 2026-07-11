import type { HTMLAttributes } from "react";

import { cn } from "@/lib/class-names";

type CardVariant =
  | "default"
  | "flat"
  | "raised"
  | "cream"
  | "interactive"
  | "featured";
type CardPadding = "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
};

const variants: Record<CardVariant, string> = {
  default:
    "border border-neutral-200/70 bg-white/90 shadow-brand-sm backdrop-blur-md",
  flat: "border border-brand-border-soft bg-brand-surface-solid",
  raised:
    "border border-brand-border-soft bg-brand-surface-solid shadow-brand-md",
  cream: "border border-brand-border-soft bg-brand-cream",
  interactive:
    "border border-brand-border-soft bg-brand-surface-solid shadow-brand-sm transition duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-primary/80 hover:shadow-brand-lg focus-within:border-brand-primary focus-within:shadow-brand-md",
  featured:
    "border border-brand-border-soft bg-brand-botanical shadow-brand-md",
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

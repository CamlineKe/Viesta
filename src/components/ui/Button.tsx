import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/class-names";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-brand-charcoal shadow-glow hover:-translate-y-0.5 hover:bg-brand-primary-hover active:translate-y-0 active:scale-[0.97]",
  secondary:
    "bg-brand-charcoal text-white shadow-soft hover:-translate-y-0.5 hover:bg-neutral-800 active:translate-y-0 active:scale-[0.97]",
  outline:
    "border border-brand-border bg-white text-brand-charcoal hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary-muted active:translate-y-0 active:scale-[0.97]",
  ghost:
    "bg-transparent text-brand-charcoal hover:bg-brand-primary-muted active:scale-[0.97]",
  whatsapp:
    "bg-brand-whatsapp text-white shadow-soft hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.97]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
  icon: "h-11 w-11 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={isLoading || undefined}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-heading font-bold transition duration-200 ease-out-expo focus-visible:outline-brand-primary disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}

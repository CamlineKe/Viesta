"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/class-names";

type QuantityControlsProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityControls({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityControlsProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "inline-flex h-12 items-center overflow-hidden rounded-md border border-brand-border-soft bg-white",
        className,
      )}
    >
      <button
        aria-label="Decrease quantity"
        className="flex h-full w-12 items-center justify-center text-brand-charcoal transition hover:bg-brand-primary-muted disabled:cursor-not-allowed disabled:opacity-40"
        disabled={value <= min}
        type="button"
        onClick={decrease}
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>
      <span className="flex h-full min-w-12 items-center justify-center border-x border-brand-border-soft px-3 font-heading font-extrabold text-brand-charcoal">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className="flex h-full w-12 items-center justify-center text-brand-charcoal transition hover:bg-brand-primary-muted disabled:cursor-not-allowed disabled:opacity-40"
        disabled={value >= max}
        type="button"
        onClick={increase}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}

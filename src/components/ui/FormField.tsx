import type { ReactNode } from "react";

import { cn } from "@/lib/class-names";

export const fieldControlClassName =
  "mt-2 min-h-12 w-full rounded-brand-sm border border-neutral-200 bg-white px-4 text-brand-charcoal outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: (field: {
    id: string;
    describedBy?: string;
    invalid: boolean;
  }) => ReactNode;
};

export function FormField({
  children,
  error,
  hint,
  id,
  label,
}: FormFieldProps) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label
        className="block text-sm font-bold text-brand-charcoal"
        htmlFor={id}
      >
        {label}
      </label>
      {children({ id, describedBy: messageId, invalid: Boolean(error) })}
      {error ? (
        <p
          id={messageId}
          className="mt-2 text-sm font-semibold text-brand-danger"
          role="alert"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={messageId}
          className="mt-2 text-xs font-semibold text-brand-muted"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function getFieldControlClassName({
  className,
  invalid = false,
}: { className?: string; invalid?: boolean } = {}) {
  return cn(
    fieldControlClassName,
    invalid &&
      "border-brand-danger focus:border-brand-danger focus:ring-brand-danger/30",
    className,
  );
}

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/class-names";

type AlertVariant = "success" | "warning" | "danger" | "info";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
};

const variants: Record<AlertVariant, string> = {
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-orange-200 bg-orange-50 text-orange-800",
  danger: "border-red-200 bg-red-50 text-red-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
};

export function Alert({
  children,
  className,
  icon,
  role,
  title,
  variant = "info",
  ...props
}: AlertProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-brand-lg border p-4 text-sm leading-6",
        variants[variant],
        className,
      )}
      role={role ?? (variant === "danger" ? "alert" : "status")}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className="mt-0.5 shrink-0">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0">
        {title ? (
          <p className="font-heading text-base font-extrabold">{title}</p>
        ) : null}
        <div className={title ? "mt-1" : undefined}>{children}</div>
      </div>
    </div>
  );
}

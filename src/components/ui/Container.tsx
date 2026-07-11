import type { HTMLAttributes } from "react";

import { cn } from "@/lib/class-names";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}

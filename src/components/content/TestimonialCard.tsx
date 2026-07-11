import { Quote, Star } from "lucide-react";

import type { Testimonial } from "@/types/content";

import { cardClassName } from "../ui/Card";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article
      className={cardClassName({
        className: "min-w-0 p-4 sm:p-5",
        variant: "raised",
      })}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary-muted text-brand-success">
          <Quote aria-hidden="true" className="h-5 w-5" />
        </div>
        <div
          className="flex gap-0.5 text-brand-accent"
          aria-label="5 star review"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-brand-muted">
        {testimonial.quote}
      </p>
      <div className="mt-5 border-t border-brand-border-soft pt-4">
        <p className="break-words font-heading font-extrabold text-brand-charcoal">
          {testimonial.name}
        </p>
        <p className="mt-1 break-words text-xs font-bold uppercase tracking-wide text-brand-muted">
          {testimonial.role} - Verified
        </p>
      </div>
    </article>
  );
}

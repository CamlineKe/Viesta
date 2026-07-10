import { Quote, Star } from "lucide-react";

import type { Testimonial } from "@/types/content";

import { cardClassName } from "../ui/Card";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className={cardClassName()}>
      <div className="flex items-center justify-between gap-4">
        <Quote aria-hidden="true" className="h-6 w-6 text-brand-primary" />
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
      <div className="mt-5 border-t border-neutral-200 pt-4">
        <p className="font-heading font-extrabold text-brand-charcoal">
          {testimonial.name}
        </p>
        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-muted">
          {testimonial.role} - Verified
        </p>
      </div>
    </article>
  );
}

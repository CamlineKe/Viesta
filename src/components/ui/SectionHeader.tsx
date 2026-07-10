import { cn } from "@/lib/class-names";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-muted">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-3xl font-extrabold leading-tight text-brand-charcoal sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-brand-muted">{description}</p> : null}
    </div>
  );
}

import type { BlogTableOfContentsItem } from "@/data/blog-editorial";
import { cn } from "@/lib/class-names";

type BlogTableOfContentsProps = {
  items: BlogTableOfContentsItem[];
};

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Article table of contents"
      className="rounded-brand-lg border border-brand-border-soft bg-white/80 p-5 shadow-brand-sm backdrop-blur-sm"
    >
      <p className="font-heading text-sm font-extrabold uppercase tracking-[0.14em] text-brand-charcoal">
        On this page
      </p>
      <ol className="mt-4 space-y-3 border-l border-brand-border-soft pl-4">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level === 3 && "pl-3")}>
            <a
              className="text-sm font-semibold leading-5 text-brand-muted transition hover:text-brand-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

import { ExternalLink } from "lucide-react";

import type { BlogSource } from "@/types/blog";

type BlogSourcesProps = {
  sources: BlogSource[];
};

export function BlogSources({ sources }: BlogSourcesProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="article-sources" className="border-t border-brand-border-soft pt-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-success">
        Further reading
      </p>
      <h2 id="article-sources" className="mt-2 font-heading text-2xl font-extrabold text-brand-charcoal">
        Sources
      </h2>
      <p className="mt-3 text-sm leading-6 text-brand-muted">
        These authoritative references informed the general health guidance in this article.
      </p>
      <ol className="mt-5 space-y-3">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              className="group flex items-start justify-between gap-4 rounded-brand-lg border border-brand-border-soft bg-brand-canvas p-4 transition hover:border-brand-primary hover:bg-brand-primary-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              href={source.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="min-w-0">
                <span className="block font-heading text-sm font-extrabold leading-6 text-brand-charcoal">
                  {source.title}
                </span>
                <span className="mt-1 block text-xs font-semibold text-brand-muted">
                  {source.publisher}
                </span>
              </span>
              <ExternalLink
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-brand-success transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

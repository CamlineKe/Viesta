import { cn } from "@/lib/class-names";
import type { BlogContentBlock } from "@/types/blog";

type BlogArticleBodyProps = {
  blocks: BlogContentBlock[];
};

const calloutStyles: Record<Extract<BlogContentBlock, { type: "callout" }>["kind"], string> = {
  information: "border-brand-border bg-brand-canvas",
  "key-takeaway": "border-brand-primary bg-brand-sun-wash",
  "professional-help": "border-brand-success/40 bg-brand-success/5",
  warning: "border-orange-200 bg-orange-50",
};

export function BlogArticleBody({ blocks }: BlogArticleBodyProps) {
  return blocks.map((block, index) => {
    const key = `${block.type}-${index}`;

    switch (block.type) {
      case "paragraph":
        return (
          <p key={key} className="text-base leading-8 text-brand-muted sm:text-lg sm:leading-9">
            {block.text}
          </p>
        );
      case "heading": {
        const className = "scroll-mt-28 font-heading font-extrabold text-brand-charcoal";

        return block.level === 2 ? (
          <h2 key={key} id={block.id} className={cn(className, "pt-3 text-2xl sm:text-3xl")}>
            {block.text}
          </h2>
        ) : (
          <h3 key={key} id={block.id} className={cn(className, "pt-2 text-xl sm:text-2xl")}>
            {block.text}
          </h3>
        );
      }
      case "list": {
        const List = block.style === "ordered" ? "ol" : "ul";

        return (
          <List
            key={key}
            className={cn(
              "space-y-3 pl-6 text-base leading-8 text-brand-muted sm:text-lg",
              block.style === "ordered" ? "list-decimal" : "list-disc",
            )}
          >
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </List>
        );
      }
      case "table":
        return (
          <figure key={key} className="min-w-0">
            <div className="overflow-x-auto rounded-brand-lg border border-brand-border-soft">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="bg-brand-canvas px-4 py-3 text-left font-heading font-extrabold text-brand-charcoal">
                  {block.caption}
                </caption>
                <thead className="bg-brand-primary-muted text-brand-charcoal">
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header} scope="col" className="border-t border-brand-border-soft px-4 py-3 font-bold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`${row.join("-")}-${rowIndex}`} className="border-t border-brand-border-soft">
                      {row.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <th key={`${cell}-${cellIndex}`} scope="row" className="px-4 py-3 font-bold text-brand-charcoal">
                            {cell}
                          </th>
                        ) : (
                          <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-brand-muted">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {block.note ? <figcaption className="mt-3 text-sm leading-6 text-brand-muted">{block.note}</figcaption> : null}
          </figure>
        );
      case "callout":
        return (
          <aside key={key} className={cn("rounded-brand-lg border-l-4 p-5", calloutStyles[block.kind])}>
            <p className="font-heading font-extrabold text-brand-charcoal">{block.title}</p>
            <div className="mt-2 space-y-2 text-sm leading-7 text-brand-muted">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </aside>
        );
    }
  });
}

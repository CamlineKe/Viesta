import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("responsive foundations", () => {
  it("keeps shared page content fluid, shrinkable, and constrained", () => {
    const markup = renderToStaticMarkup(<Container>Content</Container>);

    expect(markup).toContain("w-full");
    expect(markup).toContain("min-w-0");
    expect(markup).toContain("max-w-7xl");
    expect(markup).toContain("px-4");
    expect(markup).toContain("sm:px-6");
    expect(markup).toContain("lg:px-8");
  });

  it("scales shared section headings from mobile to larger screens", () => {
    const markup = renderToStaticMarkup(
      <SectionHeader
        description="Responsive supporting copy."
        title="Responsive heading"
      />,
    );

    expect(markup).toContain("text-3xl");
    expect(markup).toContain("sm:text-4xl");
    expect(markup).toContain("max-w-3xl");
  });
});

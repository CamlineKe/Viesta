import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BlogArticleBody } from "@/components/content/BlogArticleBody";
import { BlogSources } from "@/components/content/BlogSources";
import { BlogTableOfContents } from "@/components/content/BlogTableOfContents";
import { getBlogTableOfContents } from "@/data/blog-editorial";
import { blogPosts } from "@/data/blog-posts";

const bloodPressurePost = blogPosts.find((post) => post.slug === "blood-pressure-awareness");

describe("structured blog rendering", () => {
  afterEach(cleanup);

  it("renders semantic headings, lists, callouts, and accessible tables", () => {
    if (!bloodPressurePost) {
      throw new Error("Blood-pressure article fixture is missing");
    }

    const { getAllByRole, getByRole } = render(
      <BlogArticleBody blocks={bloodPressurePost.content} />,
    );

    expect(getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(0);
    expect(getByRole("table", { name: /American Heart Association/i })).not.toBeNull();
    expect(
      getByRole("region", { name: /Scroll horizontally to view all columns/i }).getAttribute(
        "tabindex",
      ),
    ).toBe("0");
    expect(getAllByRole("list").length).toBeGreaterThan(0);
    expect(getAllByRole("complementary").length).toBeGreaterThan(0);
  });

  it("builds table-of-contents links from article heading anchors", () => {
    if (!bloodPressurePost) {
      throw new Error("Blood-pressure article fixture is missing");
    }

    const items = getBlogTableOfContents(bloodPressurePost.content);
    const { getByRole } = render(<BlogTableOfContents items={items} />);

    expect(getByRole("navigation", { name: "Article table of contents" })).not.toBeNull();

    for (const item of items) {
      expect(getByRole("link", { name: item.label }).getAttribute("href")).toBe(`#${item.id}`);
    }
  });

  it("renders descriptive external source links safely", () => {
    if (!bloodPressurePost) {
      throw new Error("Blood-pressure article fixture is missing");
    }

    const { getByRole } = render(<BlogSources sources={bloodPressurePost.sources} />);

    for (const source of bloodPressurePost.sources) {
      const link = getByRole("link", { name: new RegExp(source.title, "i") });

      expect(link.getAttribute("href")).toBe(source.url);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });
});

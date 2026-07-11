import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BlogGrid } from "@/components/content/BlogGrid";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { blogPosts } from "@/data/blog-posts";
import { faqs } from "@/data/faqs";

vi.mock("next/image", () => ({
  default: () => null,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props} />
  ),
}));

describe("responsive editorial discovery", () => {
  afterEach(cleanup);

  it("contains blog category scrolling and exposes the selected filter", () => {
    const fitnessPost = blogPosts.find((post) => post.category === "fitness");
    const nutritionPost = blogPosts.find(
      (post) => post.category === "nutrition-tips",
    );
    const { getByRole, queryByText } = render(<BlogGrid posts={blogPosts} />);

    const filterGroup = getByRole("group", {
      name: "Filter articles by category",
    });
    const fitnessFilter = getByRole("button", { name: "Fitness" });

    expect(filterGroup.className).toContain("overscroll-x-contain");

    fireEvent.click(fitnessFilter);

    expect(fitnessFilter.getAttribute("aria-pressed")).toBe("true");
    expect(queryByText(fitnessPost?.title ?? "missing fitness post")).not.toBeNull();
    expect(queryByText(nutritionPost?.title ?? "missing nutrition post")).toBeNull();
  });

  it("filters FAQs without removing the mobile-first filter surface", () => {
    const { getByRole, queryByText } = render(<FAQAccordion faqs={faqs} />);

    fireEvent.change(getByRole("searchbox", { name: "Search questions" }), {
      target: { value: "opened supplements" },
    });

    expect(queryByText("Can opened supplements be returned?")).not.toBeNull();
    expect(queryByText("Where do you deliver?")).toBeNull();
  });
});

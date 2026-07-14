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
    const diabetesPost = blogPosts.find((post) => post.category === "diabetes-support");
    const bloodPressurePost = blogPosts.find(
      (post) => post.category === "heart-blood-pressure",
    );
    const { getByRole, queryByText } = render(<BlogGrid posts={blogPosts} />);

    const filterGroup = getByRole("group", {
      name: "Filter articles by category",
    });
    const diabetesFilter = getByRole("button", { name: "Diabetes Support" });

    expect(filterGroup.className).toContain("overscroll-x-contain");

    fireEvent.click(diabetesFilter);

    expect(diabetesFilter.getAttribute("aria-pressed")).toBe("true");
    expect(queryByText(diabetesPost?.title ?? "missing diabetes post")).not.toBeNull();
    expect(queryByText(bloodPressurePost?.title ?? "missing blood pressure post")).toBeNull();
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

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props} />
  ),
}));

import FAQsPage from "@/app/faqs/page";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { faqs } from "@/data/faqs";
import { siteContent } from "@/data/site";
import { buildWhatsAppInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

describe("FAQ page", () => {
  afterEach(cleanup);

  it("presents one page heading, the editorial surfaces, and support actions", () => {
    const { container, getByRole } = render(<FAQsPage />);
    const pageHeading = getByRole("heading", {
      level: 1,
      name: "Clear answers for confident next steps.",
    });
    const supportHeading = getByRole("heading", {
      name: "Still need help with your question?",
    });
    const expectedWhatsAppUrl = buildWhatsAppUrl(
      siteContent.contact.whatsapp,
      buildWhatsAppInquiryMessage({ siteName: siteContent.name }),
    );

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(pageHeading.closest("section")?.className).toContain(
      "section-canvas",
    );
    const faqBrowserClassName =
      container.querySelector("#faq-browser")?.className;

    expect(faqBrowserClassName).toContain("section-botanical");
    expect(faqBrowserClassName).toContain("overflow-hidden");
    expect(supportHeading.closest("section")?.className).toContain(
      "section-sun-wash",
    );
    expect(
      getByRole("link", { name: "Visit Contact" }).getAttribute("href"),
    ).toBe("/contact");
    expect(
      getByRole("link", { name: "Ask Viesta on WhatsApp" }).getAttribute(
        "href",
      ),
    ).toBe(expectedWhatsAppUrl);
  });

  it("connects the open question trigger and answer region", () => {
    const { getByRole } = render(<FAQAccordion faqs={faqs} />);
    const trigger = getByRole("button", { name: /Where do you deliver/i });
    const panelId = trigger.getAttribute("aria-controls");
    const answerRegion = getByRole("region", {
      name: /Where do you deliver/i,
    });

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(panelId).toBe("faq-panel-faq-shipping-001");
    expect(answerRegion.id).toBe(panelId);
    expect(answerRegion.getAttribute("aria-labelledby")).toBe(trigger.id);
  });

  it("announces category results and reconciles the open question", () => {
    const { getByRole, queryByText } = render(<FAQAccordion faqs={faqs} />);
    const filterGroup = getByRole("group", {
      name: "Filter questions by category",
    });
    const productsFilter = getByRole("button", { name: "Products" });

    fireEvent.click(productsFilter);

    expect(filterGroup).not.toBeNull();
    expect(productsFilter.getAttribute("aria-pressed")).toBe("true");
    expect(productsFilter.querySelector("svg")).not.toBeNull();
    expect(getByRole("status").textContent).toBe(
      "Showing 2 questions in Products",
    );
    expect(queryByText("Where do you deliver?")).toBeNull();
    expect(
      getByRole("button", { name: /Are product details final/i }).getAttribute(
        "aria-expanded",
      ),
    ).toBe("true");
  });

  it("recovers from an empty search and restores the initial view", () => {
    const { getByRole, queryByText } = render(<FAQAccordion faqs={faqs} />);
    const searchInput = getByRole("searchbox", { name: "Search questions" });

    fireEvent.change(searchInput, {
      target: { value: "question that does not exist" },
    });

    expect(getByRole("status").textContent).toBe("Showing 0 questions");
    expect(queryByText("No FAQs found")).not.toBeNull();

    fireEvent.click(
      getByRole("button", { name: "Reset search and filters" }),
    );

    expect((searchInput as HTMLInputElement).value).toBe("");
    expect(
      getByRole("button", { name: "All" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(getByRole("status").textContent).toBe(
      `Showing ${faqs.length} questions`,
    );
    expect(queryByText("Where do you deliver?")).not.toBeNull();
  });
});

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LegalPageLayout } from "@/components/content/LegalPageLayout";
import { legalPages } from "@/data/legal";
import { siteContent } from "@/data/site";

describe("legal content", () => {
  afterEach(cleanup);

  it("defines all legal routes with unique structured sections", () => {
    expect(legalPages.map((page) => page.slug)).toEqual([
      "returns-refund-policy",
      "privacy-policy",
      "terms-of-service",
    ]);

    for (const page of legalPages) {
      expect(page.reviewStatus).toBe("business-approved-legal-review-pending");
      expect(page.effectiveDate).toBeNull();
      expect(page.needsConfirmation).toContain("qualified Kenyan legal review");
      expect(page.sections.length).toBeGreaterThan(0);
      expect(new Set(page.sections.map((section) => section.id)).size).toBe(
        page.sections.length,
      );

      for (const section of page.sections) {
        expect(section.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.paragraphs.length).toBeGreaterThan(0);
      }
    }
  });

  it("records the approved returns and retention rules", () => {
    const returnsPage = legalPages.find(
      (page) => page.slug === "returns-refund-policy",
    );
    const privacyPage = legalPages.find((page) => page.slug === "privacy-policy");

    expect(JSON.stringify(returnsPage)).toContain("within 7 business days");
    expect(JSON.stringify(returnsPage)).toContain("within 48 hours");
    expect(JSON.stringify(privacyPage)).toContain(
      "within 30 days after the last activity",
    );
    expect(JSON.stringify(privacyPage)).toContain(
      "within 30 days after delivery or final issue resolution",
    );
  });

  it("separates the public brand from the registered legal business", () => {
    expect(siteContent.name).toBe("Viesta Nutrition");
    expect(siteContent.legalName).toBe("Viesta Health Nutrition");
    expect(JSON.stringify(legalPages)).toContain(siteContent.legalName);
    expect(JSON.stringify(legalPages)).not.toContain("Viesta Health Shop");
  });

  it("renders structured paragraphs and lists in the shared layout", () => {
    const returnsPage = legalPages.find(
      (page) => page.slug === "returns-refund-policy",
    );

    if (!returnsPage) {
      throw new Error("Returns policy fixture is missing.");
    }

    const { getAllByRole, getByRole, getByText } = render(
      <LegalPageLayout page={returnsPage} />,
    );

    expect(
      getByRole("heading", { name: "Returns & Refund Policy", level: 1 }),
    ).toBeDefined();
    expect(
      getByRole("heading", { name: "Eligible returns", level: 2 }),
    ).toBeDefined();
    expect(
      getByText(
        "A product that arrived visibly damaged, reported within 48 hours after delivery.",
      ),
    ).toBeDefined();
    expect(getByText("Pending legal review")).toBeDefined();
    expect(getAllByRole("link", { name: /Scope/ }).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(
      getByRole("link", { name: /Terms of Service/ }).getAttribute("href"),
    ).toBe("/terms-of-service");
    expect(
      getByRole("link", { name: /Phone:/ }).getAttribute("href"),
    ).toMatch(/^tel:/);
  });
});

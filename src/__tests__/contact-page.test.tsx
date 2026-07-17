import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockSiteContent = vi.hoisted(() => ({
  contact: {
    phone: "+254 700 000 001",
    whatsapp: "+254700000001",
    email: "support@example.com",
    address: "Ruiru, Kenya",
    needsConfirmation: true,
  },
}));

vi.mock("@/data/site", () => ({
  siteContent: mockSiteContent,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props} />
  ),
}));

import ContactPage from "@/app/contact/page";
import { WhatsAppInquiryForm } from "@/components/contact/WhatsAppInquiryForm";

describe("contact page", () => {
  afterEach(cleanup);

  it("presents the editorial surfaces, contact methods, and confirmation warning", () => {
    const { container, getByRole, getByText } = render(<ContactPage />);

    expect(
      getByRole("heading", {
        level: 1,
        name: "Let's find the right next step together.",
      }).closest("section")?.className,
    ).toContain("section-canvas");
    expect(container.querySelector("#contact-options")?.className).toContain(
      "section-botanical",
    );
    expect(
      getByRole("heading", {
        name: "Start with the reason for your inquiry",
      }).closest("section")?.className,
    ).toContain("section-sun-wash");

    expect(getByRole("status").textContent).toContain(
      "Contact details need confirmation",
    );
    expect(
      getByRole("link", { name: /Phone.*\+254 700 000 001/i }).getAttribute(
        "href",
      ),
    ).toBe("tel:+254 700 000 001");
    expect(
      getByRole("link", { name: /Email.*support@example.com/i }).getAttribute(
        "href",
      ),
    ).toBe("mailto:support@example.com");
    expect(getByText("Ruiru, Kenya")).not.toBeNull();
    expect(
      getByRole("link", { name: "Chat on WhatsApp" }).getAttribute("href"),
    ).toBe("https://wa.me/254700000001");
  });

  it("explains a blocked inquiry and focuses each missing required field", () => {
    const { getByLabelText, getByRole, getByText } = render(
      <WhatsAppInquiryForm whatsappNumber="+254700000001" />,
    );
    const nameInput = getByLabelText("Full name (required)");
    const messageInput = getByLabelText("Message (required)");
    const inquiryLink = getByRole("link", {
      name: "Open WhatsApp inquiry",
    });

    fireEvent.click(inquiryLink);

    expect(getByText("Enter your full name.").getAttribute("role")).toBe(
      "alert",
    );
    expect(
      getByText("Enter a message for the Viesta team.").getAttribute("role"),
    ).toBe("alert");
    expect(document.activeElement).toBe(nameInput);

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.click(inquiryLink);

    expect(document.activeElement).toBe(messageInput);
  });

  it("prepares the selected inquiry for WhatsApp when required fields are complete", () => {
    const { getByLabelText, getByRole } = render(
      <WhatsAppInquiryForm whatsappNumber="+254700000001" />,
    );

    fireEvent.change(getByLabelText("Full name (required)"), {
      target: { value: " Jane Doe " },
    });
    fireEvent.change(getByLabelText("Inquiry type"), {
      target: { value: "Shipping question" },
    });
    fireEvent.change(getByLabelText("Message (required)"), {
      target: { value: " Please help with delivery. " },
    });

    const inquiryLink = getByRole("link", {
      name: "Open WhatsApp inquiry",
    });
    const inquiryUrl = new URL(inquiryLink.getAttribute("href") ?? "");

    expect(inquiryLink.hasAttribute("aria-disabled")).toBe(false);
    expect(`${inquiryUrl.origin}${inquiryUrl.pathname}`).toBe(
      "https://wa.me/254700000001",
    );
    expect(inquiryUrl.searchParams.get("text")).toContain("Name: Jane Doe");
    expect(inquiryUrl.searchParams.get("text")).toContain(
      "Inquiry type: Shipping question",
    );
    expect(inquiryUrl.searchParams.get("text")).toContain(
      "Message: Please help with delivery.",
    );
  });
});

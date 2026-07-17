import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { DeliverySelector } from "@/components/checkout/DeliverySelector";
import { WhatsAppOrderButton } from "@/components/checkout/WhatsAppOrderButton";

describe("responsive commerce controls", () => {
  afterEach(cleanup);

  it("presents delivery options in an accessible compact selector", () => {
    const handleChange = vi.fn();
    const { getByRole, getByText } = render(
      <DeliverySelector value="" onChange={handleChange} />,
    );

    const selector = getByRole("combobox", { name: "Delivery location" });

    fireEvent.change(selector, { target: { value: "mombasa" } });

    expect(handleChange).toHaveBeenCalledWith("mombasa");
    expect(getByText("Mombasa — Ksh 500")).toBeDefined();
  });

  it("prevents a disabled WhatsApp order and reports validation errors", () => {
    const handleValidationErrors = vi.fn();
    const { getByRole } = render(
      <WhatsAppOrderButton
        disabled
        href="https://wa.me/254700000000"
        requirementsMessage="Complete the required checkout details."
        values={{
          fullName: "",
          phone: "",
          deliveryLocation: "nairobi",
          deliveryAddress: "",
          orderNotes: "",
          acceptedLegalPolicies: false,
        }}
        onValidationErrors={handleValidationErrors}
      />,
    );

    const orderLink = getByRole("link", {
      name: "Send order request via WhatsApp",
    });
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    orderLink.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
    expect(orderLink.getAttribute("aria-describedby")).toBe(
      "whatsapp-order-requirements",
    );
    expect(handleValidationErrors).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: expect.any(String),
        phone: expect.any(String),
        acceptedLegalPolicies: expect.any(String),
      }),
    );
  });

  it("presents policy links and records checkout acknowledgement", () => {
    const handleValuesChange = vi.fn();
    const handleErrorsChange = vi.fn();
    const { getByRole } = render(
      <CheckoutForm
        errors={{
          acceptedLegalPolicies:
            "Accept the Terms of Service and acknowledge the Privacy Policy to continue.",
        }}
        values={{
          fullName: "Jane Doe",
          phone: "0712345678",
          deliveryLocation: "nairobi",
          deliveryAddress: "Westlands",
          orderNotes: "",
          acceptedLegalPolicies: false,
        }}
        onErrorsChange={handleErrorsChange}
        onValuesChange={handleValuesChange}
      />,
    );

    const checkbox = getByRole("checkbox", {
      name: /I have read and agree to the Terms of Service/i,
    });

    expect(
      getByRole("link", { name: "Terms of Service" }).getAttribute("href"),
    ).toBe("/terms-of-service");
    expect(
      getByRole("link", { name: "Privacy Policy" }).getAttribute("href"),
    ).toBe("/privacy-policy");
    expect(
      getByRole("link", {
        name: "Returns & Refund Policy",
      }).getAttribute("href"),
    ).toBe("/returns-refund-policy");

    fireEvent.click(checkbox);

    expect(handleValuesChange).toHaveBeenCalledWith(
      expect.objectContaining({ acceptedLegalPolicies: true }),
    );
    expect(handleErrorsChange).toHaveBeenCalledWith({});
  });
});

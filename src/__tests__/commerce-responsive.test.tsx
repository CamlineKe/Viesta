import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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
        values={{
          fullName: "",
          phone: "",
          deliveryLocation: "nairobi",
          deliveryAddress: "",
          orderNotes: "",
        }}
        onValidationErrors={handleValidationErrors}
      />,
    );

    const orderLink = getByRole("link", { name: "Order via WhatsApp" });
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    orderLink.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
    expect(handleValidationErrors).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: expect.any(String),
        phone: expect.any(String),
      }),
    );
  });
});

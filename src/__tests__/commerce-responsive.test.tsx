import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DeliverySelector } from "@/components/checkout/DeliverySelector";
import { WhatsAppOrderButton } from "@/components/checkout/WhatsAppOrderButton";

describe("responsive commerce controls", () => {
  afterEach(cleanup);

  it("keeps delivery options as accessible radios in a mobile-first grid", () => {
    const handleChange = vi.fn();
    const { container, getByRole } = render(
      <DeliverySelector value="nairobi" onChange={handleChange} />,
    );

    expect(container.querySelector(".sm\\:grid-cols-2")).not.toBeNull();

    fireEvent.click(getByRole("radio", { name: /^Mombasa/ }));

    expect(handleChange).toHaveBeenCalledWith("mombasa");
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

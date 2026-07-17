import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import CheckoutPage from "@/app/checkout/page";
import { CartContext } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import type { CartItem } from "@/types/cart";

const mockSiteContent = vi.hoisted(() => ({
  contact: {
    whatsapp: "+254700000001",
  },
  payment: {
    displayName: "M-Pesa details confirmed on WhatsApp",
    accountLabel: "Account",
    accountValue: "Use your name or order number",
    instructions:
      "Viesta will confirm final M-Pesa Paybill/Till details on WhatsApp before you pay.",
    needsConfirmation: true,
  },
}));

vi.mock("@/data/site", () => ({
  siteContent: mockSiteContent,
}));

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

const checkoutItem: CartItem = {
  id: "prod-004:bio1-sterol-capsules-buy-2-get-1-free",
  productId: "prod-004",
  name: "Bio1 Sterol",
  slug: "bio1-sterol-capsules",
  offerId: "bio1-sterol-capsules-buy-2-get-1-free",
  offerLabel: "Buy 2 Get 1 Free",
  paidQuantity: 2,
  freeQuantity: 1,
  packsPerBundle: 3,
  packSize: "30 capsules",
  price: 4999,
  image: "/images/products/bio1_sterol_capsule-cutout.webp",
  quantity: 1,
};

function renderCheckout(items: CartItem[] = [checkoutItem]) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return render(
    <ToastProvider>
      <CartContext.Provider
        value={{
          items,
          itemCount: items.reduce(
            (total, item) => total + item.packsPerBundle * item.quantity,
            0,
          ),
          bundleCount: items.reduce(
            (total, item) => total + item.quantity,
            0,
          ),
          subtotal,
          addItem: vi.fn(),
          removeItem: vi.fn(),
          updateQuantity: vi.fn(),
          clearCart: vi.fn(),
        }}
      >
        <CheckoutPage />
      </CartContext.Provider>
    </ToastProvider>,
  );
}

describe("Checkout page", () => {
  afterEach(() => {
    cleanup();
    mockSiteContent.payment.needsConfirmation = true;
  });

  it("uses a minimal commerce intro and a recoverable empty state", () => {
    const { container, getByRole } = renderCheckout([]);
    const pageHeading = getByRole("heading", {
      level: 1,
      name: "Prepare your WhatsApp order request.",
    });
    const workspace = container.querySelector("#checkout-workspace");

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(pageHeading.closest("section")?.className).toContain(
      "section-canvas",
    );
    expect(workspace?.className).toContain("bg-brand-canvas");
    expect(workspace?.className).not.toContain("section-botanical");
    expect(workspace?.querySelector("svg pattern")).toBeNull();
    expect(
      workspace?.querySelector(".pointer-events-none.absolute"),
    ).toBeNull();
    expect(
      getByRole("heading", { level: 2, name: "Your cart is empty" }),
    ).not.toBeNull();
    expect(
      getByRole("link", { name: "Shop products" }).getAttribute("href"),
    ).toBe("/shop");
  });

  it("keeps progress, forms, totals, payment, and policies on protected surfaces", () => {
    const { getByRole, getByText } = renderCheckout();
    const currentStep = getByText("Checkout", { selector: "span" }).closest(
      "li",
    );
    const customerSection = getByRole("heading", {
      name: "Customer details",
    }).closest("section");
    const summary = getByRole("heading", { name: "Order summary" }).closest(
      "aside",
    );

    expect(currentStep?.getAttribute("aria-current")).toBe("step");
    expect(customerSection?.className).toContain("bg-brand-surface-solid");
    expect(customerSection?.className).toContain("min-w-0");
    expect(summary?.className).toContain("bg-brand-surface-solid");
    expect(summary?.className).toContain("lg:sticky");
    expect(summary?.className).toContain("lg:top-24");
    expect(customerSection?.parentElement?.className).toContain("min-w-0");
    expect(
      getByText("Subtotal").parentElement?.querySelector("dd")?.textContent,
    ).toContain("4,999");
    expect(getByText("Buy 2 Get 1 Free")).not.toBeNull();
    expect(getByText("Packs: 3 × 30 capsules")).not.toBeNull();
    expect(
      getByText("Grand total").parentElement?.querySelector("dd")
        ?.textContent,
    ).toBe("Select location");
    expect(getByText("Payment confirmation")).not.toBeNull();
    expect(
      getByRole("button", { name: "Copy" }).hasAttribute("disabled"),
    ).toBe(true);
    expect(
      getByRole("link", { name: "Terms of Service" }).getAttribute("href"),
    ).toBe("/terms-of-service");
    expect(
      getByRole("link", { name: "Privacy Policy" }).getAttribute("href"),
    ).toBe("/privacy-policy");
  });

  it("explains a blocked order and focuses the first invalid field", () => {
    const { getByLabelText, getByRole, getByText } = renderCheckout();
    const fullName = getByLabelText("Full name");
    const orderLink = getByRole("link", {
      name: "Send order request via WhatsApp",
    });

    expect(
      getByText(
        "Complete your full name, Kenyan phone number, delivery location, and policy acknowledgement to continue.",
      ).getAttribute("id"),
    ).toBe("whatsapp-order-requirements");
    expect(orderLink.getAttribute("aria-describedby")).toBe(
      "whatsapp-order-requirements",
    );

    fireEvent.click(orderLink);

    expect(document.activeElement).toBe(fullName);
    expect(getByText("Enter your full name.").getAttribute("role")).toBe(
      "alert",
    );
  });

  it("exposes confirmed payment details when copying is permitted", () => {
    mockSiteContent.payment.needsConfirmation = false;
    const { getByRole, getByText } = renderCheckout();

    expect(getByText("Payment instructions")).not.toBeNull();
    expect(
      getByText(/Account: Use your name or order number/),
    ).not.toBeNull();
    expect(
      getByRole("button", { name: "Copy" }).hasAttribute("disabled"),
    ).toBe(false);
  });

  it("prepares a valid order handoff after every required field is complete", () => {
    const { getByLabelText, getByRole, getByText } = renderCheckout();

    fireEvent.change(getByLabelText("Full name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(getByLabelText("Phone number"), {
      target: { value: "0712 345 678" },
    });
    fireEvent.change(getByLabelText("Delivery location"), {
      target: { value: "nairobi" },
    });
    fireEvent.click(
      getByRole("checkbox", {
        name: /I have read and agree to the Terms of Service/i,
      }),
    );

    const orderLink = getByRole("link", {
      name: "Send order request via WhatsApp",
    });
    const orderUrl = new URL(orderLink.getAttribute("href") ?? "");
    const message = orderUrl.searchParams.get("text") ?? "";

    expect(orderLink.getAttribute("aria-disabled")).toBe("false");
    expect(
      getByText(
        "Your required checkout details are complete. WhatsApp will open with the prepared order request.",
      ),
    ).not.toBeNull();
    expect(`${orderUrl.origin}${orderUrl.pathname}`).toContain(
      "https://wa.me/",
    );
    expect(message).toContain("Bio1 Sterol - Buy 2 Get 1 Free");
    expect(message).toContain("1 offer bundle, 3 × 30 capsules total");
    expect(message).toContain("Name: Jane Doe");
    expect(message).toContain("Phone: +254712345678");
    expect(message).toContain("Delivery location: Nairobi");
    expect(message).toContain("Policy acknowledgement:");
  });
});

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import CartPage from "@/app/cart/page";
import { CartContext } from "@/context/CartContext";
import type { CartItem } from "@/types/cart";

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

const cartItem: CartItem = {
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

describe("Cart page", () => {
  afterEach(cleanup);

  it("uses the compact commerce intro and presents a recoverable empty state", () => {
    const { container, getByRole } = render(
      <CartContext.Provider
        value={{
          items: [],
          itemCount: 0,
          bundleCount: 0,
          subtotal: 0,
          addItem: vi.fn(),
          removeItem: vi.fn(),
          updateQuantity: vi.fn(),
          clearCart: vi.fn(),
        }}
      >
        <CartPage />
      </CartContext.Provider>,
    );
    const pageHeading = getByRole("heading", {
      level: 1,
      name: "Review your wellness order.",
    });
    const workspace = container.querySelector("#cart-workspace");

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
      getByRole("link", { name: "Start shopping" }).getAttribute("href"),
    ).toBe("/shop");
  });

  it("keeps filled-cart actions and transactional surfaces explicit", () => {
    const clearCart = vi.fn();
    const removeItem = vi.fn();
    const updateQuantity = vi.fn();
    const { getByRole, getByText } = render(
      <CartContext.Provider
        value={{
          items: [cartItem],
          itemCount: 3,
          bundleCount: 1,
          subtotal: 4999,
          addItem: vi.fn(),
          removeItem,
          updateQuantity,
          clearCart,
        }}
      >
        <CartPage />
      </CartContext.Provider>,
    );

    expect(getByRole("status").textContent).toBe(
      "3 packs across 1 offer bundle.",
    );
    const lineItem = getByRole("heading", { name: cartItem.name }).closest(
      "article",
    );
    const summary = getByRole("heading", { name: "Cart summary" }).closest(
      "aside",
    );

    expect(lineItem?.className).toContain("bg-brand-surface-solid");
    expect(lineItem?.className).toContain("min-w-0");
    expect(summary?.className).toContain("bg-brand-surface-solid");
    expect(summary?.className).toContain("min-w-0");
    expect(summary?.className).toContain("lg:sticky");
    expect(summary?.className).toContain("lg:top-24");
    expect(
      getByRole("link", { name: "Proceed to checkout" }).getAttribute(
        "href",
      ),
    ).toBe("/checkout");
    expect(
      getByText("Subtotal").parentElement?.querySelector("dd")?.textContent,
    ).toContain("4,999");
    expect(
      getByText("Estimated total").parentElement?.textContent,
    ).toContain("4,999");
    expect(getByText("Buy 2 Get 1 Free")).toBeDefined();
    expect(getByText("3 packs total")).toBeDefined();

    fireEvent.click(getByRole("button", { name: "Clear cart" }));
    fireEvent.click(getByRole("button", { name: "Remove" }));
    fireEvent.click(getByRole("button", { name: "Increase quantity" }));

    expect(clearCart).toHaveBeenCalledOnce();
    expect(removeItem).toHaveBeenCalledWith(cartItem.id);
    expect(updateQuantity).toHaveBeenCalledWith(cartItem.id, 2);
  });
});

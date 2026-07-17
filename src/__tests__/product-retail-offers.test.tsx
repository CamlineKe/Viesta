import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const cartMocks = vi.hoisted(() => ({
  addItem: vi.fn(),
  openCartDrawer: vi.fn(),
  showToast: vi.fn(),
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

vi.mock("@/hooks/useCart", () => ({
  useCart: () => ({ addItem: cartMocks.addItem }),
}));

vi.mock("@/context/ToastContext", () => ({
  useToast: () => ({ showToast: cartMocks.showToast }),
}));

vi.mock("@/lib/cart-drawer-events", () => ({
  openCartDrawer: cartMocks.openCartDrawer,
}));

import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/data/products";

const confirmedProduct = products.find(
  (product) => product.slug === "bio1-sterol-capsules",
)!;
const unconfirmedProduct = products.find(
  (product) => product.slug === "bio1-sterol-plus",
)!;

describe("retail product offers", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("presents every confirmed offer on the product card", () => {
    const { container, getByRole, getByText } = render(
      <ProductCard product={confirmedProduct} />,
    );

    expect(container.querySelector("article")?.className).toContain(
      "min-w-0",
    );
    expect(getByText("Retail offers")).toBeDefined();
    expect(getByText("Was Ksh 5,999")).toBeDefined();
    expect(getByText("Buy 1")).toBeDefined();
    expect(getByText("Buy 2 Get 1 Free")).toBeDefined();
    expect(getByText("Buy 3 Get 2 Free")).toBeDefined();
    expect(
      getByRole("link", { name: "Choose offer" }).getAttribute("href"),
    ).toBe("/products/bio1-sterol-capsules");
  });

  it("shows an unconfirmed card without a purchase action", () => {
    const { getByRole, getAllByText } = render(
      <ProductCard product={unconfirmedProduct} />,
    );

    expect(getAllByText("Price unconfirmed").length).toBeGreaterThan(0);
    expect(
      getByRole("button", { name: "Price unconfirmed" }).hasAttribute(
        "disabled",
      ),
    ).toBe(true);
  });

  it("adds the selected offer bundle from the product page", () => {
    const { getAllByRole, getByRole } = render(
      <ProductInfo product={confirmedProduct} />,
    );

    const offerButton = getByRole("button", {
      name: /Buy 2 Get 1 Free.*Ksh\s4,999.*3 packs total/i,
    });

    fireEvent.click(offerButton);
    expect(offerButton.className).toContain("min-w-0");
    fireEvent.click(getByRole("button", { name: "Add selected offer" }));

    expect(offerButton.getAttribute("aria-pressed")).toBe("true");
    expect(cartMocks.addItem).toHaveBeenCalledWith({
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
    });
    expect(cartMocks.showToast).toHaveBeenCalledWith(
      "Bio1 Sterol - Buy 2 Get 1 Free added to cart.",
      "success",
    );
    expect(cartMocks.openCartDrawer).toHaveBeenCalledOnce();
    expect(
      getAllByRole("status").some((status) =>
        status.textContent?.includes("1 offer bundle added to cart."),
      ),
    ).toBe(true);
  });

  it("keeps unconfirmed product pages non-purchasable", () => {
    const { getAllByRole, getByRole, queryByText } = render(
      <ProductInfo product={unconfirmedProduct} />,
    );

    expect(queryByText("Choose a retail offer")).toBeNull();
    expect(
      getByRole("button", { name: "Price unconfirmed" }).hasAttribute(
        "disabled",
      ),
    ).toBe(true);
    expect(
      getAllByRole("status").some((status) =>
        status.textContent?.includes(
          "Retail pricing is unconfirmed for this product.",
        ),
      ),
    ).toBe(true);
    expect(cartMocks.addItem).not.toHaveBeenCalled();
  });
});

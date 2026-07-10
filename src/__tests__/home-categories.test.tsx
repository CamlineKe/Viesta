import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/page";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

vi.mock("next/image", () => ({
  default: () => null,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    ...props
  }: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string | { pathname: string; query?: Record<string, string> };
  }) => {
    const resolvedHref =
      typeof href === "string"
        ? href
        : `${href.pathname}${href.query ? `?${new URLSearchParams(href.query)}` : ""}`;

    return <a href={resolvedHref} {...props} />;
  },
}));

const categoryLinks = [
  ["Blood Sugar Support", "blood-sugar-support"],
  ["Blood Pressure & Heart Health", "blood-pressure-heart-health"],
  ["Joint & Mobility Support", "joint-mobility-support"],
  ["Detox & Digestive Wellness", "detox-digestive-wellness"],
  ["Immunity & General Wellness", "immunity-general-wellness"],
  ["Men's Wellness", "mens-wellness"],
  ["Women's Wellness", "womens-wellness"],
  ["Diabetes", "diabetes"],
] as const;

describe("homepage category cards", () => {
  afterEach(cleanup);

  it("renders every category with its accessible label and shop filter URL", () => {
    const { getByRole } = render(
      <ToastProvider>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </ToastProvider>,
    );

    for (const [name, slug] of categoryLinks) {
      const link = getByRole("link", { name: `Browse ${name} products` });

      expect(link.getAttribute("href")).toBe(`/shop?category=${slug}`);
    }
  });
});

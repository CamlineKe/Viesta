import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const navigationState = vi.hoisted(() => ({ search: "" }));
const replaceRoute = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  usePathname: () => "/shop",
  useRouter: () => ({ replace: replaceRoute }),
  useSearchParams: () => new URLSearchParams(navigationState.search),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props} />
  ),
}));

vi.mock("@/components/shop/ProductCard", () => ({
  ProductCard: ({ product }: { product: { name: string } }) => (
    <article>{product.name}</article>
  ),
}));

import ShopPage from "@/app/shop/page";
import { ProductGrid, sortProducts } from "@/components/shop/ProductGrid";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

describe("Shop page", () => {
  afterEach(() => {
    cleanup();
    navigationState.search = "";
    replaceRoute.mockReset();
  });

  it("presents one page heading and keeps decoration outside the catalog", () => {
    const { container, getByRole } = render(<ShopPage />);
    const pageHeading = getByRole("heading", {
      level: 1,
      name: "Find wellness products for your everyday goals.",
    });
    const catalog = container.querySelector("#product-catalog");
    const categoryPanel = getByRole("heading", { name: "Categories" }).closest(
      "aside",
    );
    const productCatalog = getByRole("region", {
      name: "Product catalog",
    });

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(pageHeading.closest("section")?.className).toContain(
      "section-canvas",
    );
    expect(catalog?.className).toContain("bg-brand-canvas");
    expect(catalog?.className).not.toContain("section-botanical");
    expect(catalog?.querySelector("svg pattern")).toBeNull();
    expect(catalog?.querySelector(".blur-3xl")).toBeNull();
    expect(productCatalog.className).toContain("min-w-0");
    expect(productCatalog.parentElement?.className).toContain("min-w-0");
    expect(categoryPanel?.className).toContain("bg-brand-surface-solid");
    expect(categoryPanel?.className).toContain("lg:sticky");
    expect(categoryPanel?.className).toContain("lg:top-24");
    expect(getByRole("status").textContent).toContain(
      `Showing ${products.length} of ${products.length} products`,
    );
  });

  it("writes search, sort, and category changes to Shop URL state", () => {
    const { getAllByRole, getByRole } = render(
      <ProductGrid categories={categories} products={products} />,
    );

    fireEvent.change(getByRole("searchbox", { name: "Search products" }), {
      target: { value: "slimming coffee" },
    });
    expect(replaceRoute).toHaveBeenLastCalledWith(
      "/shop?q=slimming+coffee",
      { scroll: false },
    );

    fireEvent.change(getAllByRole("combobox", { name: "Sort by" })[0], {
      target: { value: "price-asc" },
    });
    expect(replaceRoute).toHaveBeenLastCalledWith("/shop?sort=price-asc", {
      scroll: false,
    });

    fireEvent.click(
      getAllByRole("radio", { name: /^Joint & Mobility Support/ })[0],
    );
    expect(replaceRoute).toHaveBeenLastCalledWith(
      "/shop?category=joint-mobility-support",
      { scroll: false },
    );
  });

  it("keeps unconfirmed products after confirmed products for price sorting", () => {
    for (const sortOption of ["price-asc", "price-desc"] as const) {
      const sortedProducts = sortProducts(products, sortOption);
      const firstUnconfirmedIndex = sortedProducts.findIndex(
        (product) => product.priceStatus === "unconfirmed",
      );

      expect(firstUnconfirmedIndex).toBe(5);
      expect(
        sortedProducts
          .slice(0, firstUnconfirmedIndex)
          .every((product) => product.priceStatus === "confirmed"),
      ).toBe(true);
      expect(
        sortedProducts
          .slice(firstUnconfirmedIndex)
          .every((product) => product.priceStatus === "unconfirmed"),
      ).toBe(true);
    }
  });

  it("announces an empty result and provides filter recovery", () => {
    navigationState.search = "q=question-that-will-not-match-a-product";
    const { getAllByRole, getByRole, queryByText } = render(
      <ProductGrid categories={categories} products={products} />,
    );

    expect(getByRole("status").textContent).toContain(
      `Showing 0 of ${products.length} products`,
    );
    expect(
      queryByText(
        'No products found for "question-that-will-not-match-a-product"',
      ),
    ).not.toBeNull();

    fireEvent.click(getAllByRole("button", { name: "Reset filters" })[0]);

    expect(replaceRoute).toHaveBeenCalledWith("/shop", { scroll: false });
  });
});

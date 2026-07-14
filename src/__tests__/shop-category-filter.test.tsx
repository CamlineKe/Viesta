import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { categories } from "@/data/categories";

const productCounts = {
  all: 6,
  "blood-pressure-heart-health": 3,
  "joint-mobility-support": 3,
};

describe("shop category filter", () => {
  afterEach(cleanup);

  it("renders mobile categories in a collapsible disclosure without a horizontal rail", () => {
    const { container, getAllByText, getByText } = render(
      <CategoryFilter
        categories={categories.slice(0, 2)}
        productCounts={productCounts}
        selectedCategory="blood-pressure-heart-health"
        variant="mobile"
        onChange={() => undefined}
      />,
    );

    expect(container.querySelector("details")).not.toBeNull();
    expect(getByText("Filters")).not.toBeNull();
    expect(getAllByText("Blood Pressure & Heart Health")).toHaveLength(2);
    expect(container.innerHTML).not.toContain("overflow-x-auto");
  });

  it("reports the selected mobile category through the shared change handler", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <CategoryFilter
        categories={categories.slice(0, 2)}
        productCounts={productCounts}
        selectedCategory="all"
        variant="mobile"
        onChange={handleChange}
      />,
    );

    fireEvent.click(
      getByRole("radio", { name: /^Joint & Mobility Support/ }),
    );

    expect(handleChange).toHaveBeenCalledWith(
      "joint-mobility-support",
    );
  });
});

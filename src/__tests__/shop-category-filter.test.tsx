import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { categories } from "@/data/categories";

const productCounts = {
  all: 5,
  "blood-sugar-support": 2,
  "blood-pressure-heart-health": 3,
};

describe("shop category filter", () => {
  afterEach(cleanup);

  it("renders mobile categories in a collapsible disclosure without a horizontal rail", () => {
    const { container, getAllByText, getByText } = render(
      <CategoryFilter
        categories={categories.slice(0, 2)}
        productCounts={productCounts}
        selectedCategory="blood-sugar-support"
        variant="mobile"
        onChange={() => undefined}
      />,
    );

    expect(container.querySelector("details")).not.toBeNull();
    expect(getByText("Filters")).not.toBeNull();
    expect(getAllByText("Blood Sugar Support")).toHaveLength(2);
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
      getByRole("radio", { name: /^Blood Pressure & Heart Health/ }),
    );

    expect(handleChange).toHaveBeenCalledWith(
      "blood-pressure-heart-health",
    );
  });
});

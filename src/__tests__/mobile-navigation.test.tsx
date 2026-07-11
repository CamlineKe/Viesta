import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MobileNavigation } from "@/components/layout/MobileNavigation";

vi.mock("next/image", () => ({
  default: () => null,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : ""} {...props} />
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("MobileNavigation", () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  it("notifies the header and opens a viewport-safe, scrollable drawer", () => {
    const onOpen = vi.fn();
    const { getByRole } = render(<MobileNavigation onOpen={onOpen} />);

    fireEvent.click(getByRole("button", { name: "Open navigation" }));

    const drawer = getByRole("dialog", { name: "Mobile navigation" });
    const scrollRegion = drawer.querySelector(".overflow-y-auto");

    expect(onOpen).toHaveBeenCalledOnce();
    expect(drawer.className).toContain("drawer-viewport");
    expect(drawer.className).toContain("drawer-safe-padding");
    expect(drawer.className).toContain("max-w-[420px]");
    expect(scrollRegion).not.toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes the drawer with Escape and restores page scrolling", () => {
    const { getByRole, queryByRole } = render(<MobileNavigation />);

    fireEvent.click(getByRole("button", { name: "Open navigation" }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(queryByRole("dialog", { name: "Mobile navigation" })).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("portals the drawer outside a filtered header containing context", () => {
    const { getByRole, getByTestId } = render(
      <header className="backdrop-blur-md" data-testid="filtered-header">
        <MobileNavigation />
      </header>,
    );

    fireEvent.click(getByRole("button", { name: "Open navigation" }));

    const header = getByTestId("filtered-header");
    const drawer = getByRole("dialog", { name: "Mobile navigation" });

    expect(header.contains(drawer)).toBe(false);
    expect(drawer.parentElement?.parentElement).toBe(document.body);
  });
});

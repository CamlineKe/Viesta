import { describe, expect, it } from "vitest";

import { formatKES } from "@/lib/currency";

describe("formatKES", () => {
  it("formats Kenya shilling prices without decimals", () => {
    expect(formatKES(1500)).toBe("Ksh 1,500");
  });
});

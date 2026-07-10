import { cleanup, fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { useFocusTrap } from "@/hooks/useFocusTrap";

function TestDrawer({ isOpen }: { isOpen: boolean }) {
  const drawerRef = useRef<HTMLElement>(null);

  useFocusTrap(isOpen, drawerRef);

  return (
    <>
      <button type="button">Open drawer</button>
      {isOpen ? (
        <aside ref={drawerRef} tabIndex={-1}>
          <button type="button">First action</button>
          <button type="button">Last action</button>
        </aside>
      ) : null}
    </>
  );
}

describe("useFocusTrap", () => {
  afterEach(cleanup);

  it("keeps Tab navigation inside an open drawer", () => {
    const { getByRole } = render(<TestDrawer isOpen />);
    const firstAction = getByRole("button", { name: "First action" });
    const lastAction = getByRole("button", { name: "Last action" });

    lastAction.focus();
    fireEvent.keyDown(lastAction, { key: "Tab" });

    expect(document.activeElement).toBe(firstAction);

    firstAction.focus();
    fireEvent.keyDown(firstAction, { key: "Tab", shiftKey: true });

    expect(document.activeElement).toBe(lastAction);
  });

  it("restores focus to the invoking control when the drawer closes", () => {
    const { getByRole, rerender } = render(<TestDrawer isOpen={false} />);
    const trigger = getByRole("button", { name: "Open drawer" });

    trigger.focus();
    rerender(<TestDrawer isOpen />);
    rerender(<TestDrawer isOpen={false} />);

    expect(document.activeElement).toBe(trigger);
  });
});

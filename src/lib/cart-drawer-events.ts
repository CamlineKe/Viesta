export const CART_DRAWER_OPEN_EVENT = "viesta:cart-drawer-open";

export function openCartDrawer() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(CART_DRAWER_OPEN_EVENT));
}

import type { NavItem } from "@/types/content";

export function isActiveNavItem(pathname: string, item: NavItem): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }

  if (item.href === "/shop") {
    return pathname === "/shop" || pathname.startsWith("/products/") || pathname === "/cart";
  }

  if (item.href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

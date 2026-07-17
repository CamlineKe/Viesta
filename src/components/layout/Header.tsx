"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, X } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { navItems, siteContent } from "@/data/site";
import { useCart } from "@/hooks/useCart";
import { CART_DRAWER_OPEN_EVENT } from "@/lib/cart-drawer-events";
import { cn } from "@/lib/class-names";

import { Container } from "../ui/Container";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationSearch } from "./NavigationSearch";
import { isActiveNavItem } from "./navigation-state";

export function Header() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const isCheckout = pathname === "/checkout";

  const openCart = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCart = useCallback(() => setIsCartDrawerOpen(false), []);
  const closeMobileSearch = useCallback(() => setIsMobileSearchOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener(CART_DRAWER_OPEN_EVENT, openCart);

    return () => window.removeEventListener(CART_DRAWER_OPEN_EVENT, openCart);
  }, [openCart]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-brand-charcoal/95 text-white backdrop-blur-md transition duration-200 ease-out-expo",
          isScrolled ? "border-white/15 shadow-brand-md" : "border-white/10",
        )}
      >
        <Container className="flex min-h-16 items-center justify-between gap-3 lg:min-h-[72px] xl:gap-4">
          <Link
            href="/"
            className="inline-flex min-w-0 items-center"
            aria-label="Viesta homepage"
          >
            <Image
              src={siteContent.logo}
              alt=""
              width={150}
              height={50}
              priority
              className="h-9 w-auto max-w-full shrink sm:h-10 lg:h-11"
            />
          </Link>

          {isCheckout ? (
            <p className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85 sm:block">
              WhatsApp order handoff
            </p>
          ) : (
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-4 lg:flex xl:gap-6"
            >
              {navItems.map((item) => {
                const isActive = isActiveNavItem(pathname, item);

                return (
                  <Link
                    key={item.href}
                    aria-current={isActive ? "page" : undefined}
                    href={{ pathname: item.href }}
                    className={cn(
                      "group relative rounded-full px-1 py-2 text-sm font-bold transition hover:text-brand-primary",
                      isActive ? "text-brand-primary" : "text-white/85",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand-primary transition-all duration-200 group-hover:w-full",
                        isActive ? "w-full" : "w-0",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {!isCheckout ? (
              <Suspense fallback={null}>
                <NavigationSearch id="header-product-search" variant="header" />
              </Suspense>
            ) : null}
            {!isCheckout ? (
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-brand-primary lg:hidden"
                type="button"
                aria-expanded={isMobileSearchOpen}
                aria-controls="mobile-header-search-panel"
                aria-label={
                  isMobileSearchOpen
                    ? "Close product search"
                    : "Open product search"
                }
                onClick={() => setIsMobileSearchOpen((current) => !current)}
              >
                {isMobileSearchOpen ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Search aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            ) : null}
            {!isCheckout ? (
              <button
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-brand-primary"
                type="button"
                aria-label={`Open cart with ${itemCount} packs`}
                onClick={openCart}
              >
                <ShoppingCart aria-hidden="true" className="h-5 w-5" />
                {itemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-xs font-extrabold text-brand-charcoal">
                    {itemCount}
                  </span>
                ) : null}
              </button>
            ) : null}
            {!isCheckout ? (
              <MobileNavigation
                triggerClassName="text-white hover:bg-white/10 hover:text-brand-primary"
                onOpen={closeMobileSearch}
              />
            ) : null}
          </div>
        </Container>
        {!isCheckout && isMobileSearchOpen ? (
          <div
            id="mobile-header-search-panel"
            className="border-t border-white/10 bg-brand-charcoal/95 lg:hidden"
          >
            <Container className="py-3">
              <Suspense fallback={null}>
                <NavigationSearch
                  id="mobile-header-product-search"
                  className="mb-0"
                  variant="mobile"
                  onSearch={closeMobileSearch}
                />
              </Suspense>
            </Container>
          </div>
        ) : null}
      </header>
      <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCart} />
    </>
  );
}

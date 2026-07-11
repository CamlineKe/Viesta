"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { navItems, siteContent } from "@/data/site";
import { cn } from "@/lib/class-names";
import { useFocusTrap } from "@/hooks/useFocusTrap";

import { Button } from "../ui/Button";
import { isActiveNavItem } from "./navigation-state";
import { NavigationSearch } from "./NavigationSearch";

type MobileNavigationProps = {
  triggerClassName?: string;
  onOpen?: () => void;
};

export function MobileNavigation({
  triggerClassName,
  onOpen,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useFocusTrap(isOpen, drawerRef);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openNavigation = () => {
    onOpen?.();
    setIsOpen(true);
  };

  return (
    <div className="lg:hidden">
      <Button
        aria-label="Open navigation"
        aria-expanded={isOpen}
        className={triggerClassName}
        size="icon"
        variant="ghost"
        onClick={openNavigation}
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close navigation backdrop"
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <aside
            ref={drawerRef}
            aria-labelledby="mobile-navigation-title"
            aria-modal="true"
            className="drawer-viewport drawer-safe-padding absolute right-0 top-0 flex w-full max-w-[420px] animate-slide-in-right flex-col overflow-hidden bg-white shadow-brand-xl"
            role="dialog"
            tabIndex={-1}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 id="mobile-navigation-title" className="sr-only">
                Mobile navigation
              </h2>
              <Image
                src={siteContent.logo}
                alt=""
                width={132}
                height={44}
                className="h-11 w-auto"
              />
              <Button
                aria-label="Close navigation"
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </Button>
            </div>
            <Suspense fallback={null}>
              <NavigationSearch
                id="mobile-product-search"
                className="shrink-0"
                variant="mobile"
                onSearch={() => setIsOpen(false)}
              />
            </Suspense>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = isActiveNavItem(pathname, item);

                  return (
                    <Link
                      key={item.href}
                      aria-current={isActive ? "page" : undefined}
                      href={{ pathname: item.href }}
                      className={cn(
                        "rounded-md px-3 py-3 font-heading font-bold transition",
                        isActive
                          ? "bg-brand-primary text-brand-charcoal shadow-glow"
                          : "text-brand-charcoal hover:bg-brand-primary-muted",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-8 space-y-3 rounded-brand-lg border border-brand-border-soft bg-brand-botanical p-4 text-sm font-semibold text-brand-charcoal">
                {siteContent.contact.needsConfirmation ? (
                  <p className="rounded-md bg-white px-3 py-2 text-xs font-bold text-orange-800">
                    Contact details to be confirmed before launch.
                  </p>
                ) : null}
                <a
                  className="flex min-w-0 items-start gap-2"
                  href={`tel:${siteContent.contact.phone}`}
                >
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 text-brand-success"
                  />
                  <span className="min-w-0 break-words">
                    {siteContent.contact.phone}
                  </span>
                </a>
                <a
                  className="flex min-w-0 items-start gap-2"
                  href={`mailto:${siteContent.contact.email}`}
                >
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 text-brand-success"
                  />
                  <span className="min-w-0 break-all">
                    {siteContent.contact.email}
                  </span>
                </a>
              </div>
            </div>
            <a
              href={`https://wa.me/${siteContent.contact.whatsapp.replace(/[^\d]/g, "")}`}
              className="mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-brand-whatsapp px-5 font-heading font-bold text-white shadow-soft transition hover:brightness-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

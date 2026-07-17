"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { useCart } from "@/hooks/useCart";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { formatKES } from "@/lib/currency";
import {
  formatProductLineTotal,
  formatProductPrice,
} from "@/lib/product-pricing";

import { QuantityControls } from "./QuantityControls";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    itemCount,
    bundleCount,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart();
  const drawerRef = useRef<HTMLElement>(null);

  useFocusTrap(isOpen, drawerRef);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
    >
      <button
        aria-label="Close cart drawer"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        type="button"
        onClick={onClose}
      />
      <aside
        ref={drawerRef}
        aria-labelledby="cart-drawer-title"
        className="drawer-viewport absolute right-0 top-0 flex w-full max-w-[420px] animate-slide-in-right flex-col overflow-hidden bg-white shadow-brand-xl"
        tabIndex={-1}
      >
        <div className="drawer-header-safe flex items-center justify-between gap-4 border-b border-brand-border-soft px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2
              id="cart-drawer-title"
              className="font-heading text-2xl font-extrabold text-brand-charcoal"
            >
              Your Cart
            </h2>
            <p className="mt-1 text-sm font-semibold text-brand-muted">
              {itemCount} pack{itemCount === 1 ? "" : "s"} in {bundleCount}{" "}
              offer bundle{bundleCount === 1 ? "" : "s"}
            </p>
          </div>
          <button
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-md text-brand-charcoal transition hover:bg-brand-primary-muted"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-brand-xl bg-brand-primary-muted text-brand-charcoal">
              <ShoppingCart aria-hidden="true" className="h-10 w-10" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-extrabold text-brand-charcoal">
              Your cart is empty
            </h3>
            <p className="mt-3 text-sm leading-6 text-brand-muted">
              Add products from the shop, then review quantities before
              checkout.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-primary px-5 font-heading text-sm font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
              href="/shop"
              onClick={onClose}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-brand-lg border border-brand-border-soft bg-white p-3 sm:grid-cols-[80px_minmax(0,1fr)]"
                >
                  <Link href={`/products/${item.slug}`} onClick={onClose}>
                    <div className="relative aspect-square overflow-hidden rounded-brand-md bg-brand-botanical">
                      <Image
                        fill
                        alt={`${item.name} product image`}
                        className="object-contain p-2"
                        sizes="80px"
                        src={item.image}
                      />
                    </div>
                  </Link>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/products/${item.slug}`} onClick={onClose}>
                        <h3 className="line-clamp-2 font-heading text-sm font-extrabold leading-5 text-brand-charcoal">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        aria-label={`Remove ${item.name}`}
                        className="rounded-md p-1 text-brand-danger transition hover:bg-red-50"
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-brand-muted">
                      {item.offerLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-brand-muted">
                      {formatProductPrice(item.price)} per offer
                    </p>
                    <p className="mt-1 text-xs font-semibold text-brand-muted">
                      {item.packsPerBundle} × {item.packSize} per bundle
                    </p>
                    <p className="mt-1 text-xs font-semibold text-brand-muted">
                      {item.packsPerBundle * item.quantity} pack
                      {item.packsPerBundle * item.quantity === 1 ? "" : "s"}{" "}
                      total
                    </p>
                    <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                      <QuantityControls
                        className="h-9 [&_button]:w-9 [&_span]:min-w-9"
                        value={item.quantity}
                        onChange={(quantity) =>
                          updateQuantity(item.id, quantity)
                        }
                      />
                      <p className="break-words text-sm font-extrabold text-brand-charcoal">
                        {formatProductLineTotal(item.price, item.quantity)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="drawer-footer-safe border-t border-brand-border-soft bg-brand-sun-wash px-4 py-5 sm:px-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-heading text-lg font-extrabold text-brand-charcoal">
                  Subtotal
                </span>
                <span className="font-heading text-2xl font-extrabold text-brand-charcoal">
                  {formatKES(subtotal)}
                </span>
              </div>
              <Link
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:bg-brand-primary-hover"
                href="/checkout"
                onClick={onClose}
              >
                Proceed to Checkout
              </Link>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-bold">
                <Link
                  className="text-brand-charcoal transition hover:text-brand-muted"
                  href="/cart"
                  onClick={onClose}
                >
                  View cart
                </Link>
                <Link
                  className="text-brand-muted transition hover:text-brand-charcoal"
                  href="/shop"
                  onClick={onClose}
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

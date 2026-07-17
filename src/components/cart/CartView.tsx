"use client";

import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { cardClassName } from "@/components/ui/Card";

import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCartState } from "./EmptyCartState";

export function CartView() {
  const {
    items,
    itemCount,
    bundleCount,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <section aria-label="Cart items" className="min-w-0 space-y-5">
        <div className={cardClassName({ variant: "flat" })}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
                Cart items
              </h2>
              <p
                aria-live="polite"
                className="mt-1 text-sm text-brand-muted"
                role="status"
              >
                {itemCount} pack{itemCount === 1 ? "" : "s"} across{" "}
                {bundleCount} offer bundle{bundleCount === 1 ? "" : "s"}.
              </p>
            </div>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md border border-brand-danger/20 bg-white px-3 text-sm font-bold text-brand-danger transition hover:border-brand-danger/40 hover:bg-red-50 sm:self-auto"
              type="button"
              onClick={clearCart}
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" />
              Clear cart
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
              onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}
        </div>

        <Link
          href="/shop"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-brand-border-soft bg-white px-5 font-heading text-sm font-extrabold text-brand-charcoal transition hover:border-brand-primary hover:bg-brand-primary-muted"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Continue shopping
        </Link>
      </section>

      <CartSummary
        bundleCount={bundleCount}
        itemCount={itemCount}
        subtotal={subtotal}
      />
    </div>
  );
}

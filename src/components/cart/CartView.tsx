"use client";

import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { cardClassName } from "@/components/ui/Card";

import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCartState } from "./EmptyCartState";

export function CartView() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } =
    useCart();
  const hasEstimatedPrices = items.some(
    (item) => item.priceStatus === "estimated",
  );

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <section aria-label="Cart items" className="space-y-5">
        <div className={cardClassName()}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-brand-charcoal">
                Your cart
              </h2>
              <p className="mt-1 text-sm text-brand-muted">
                {itemCount} item{itemCount === 1 ? "" : "s"} ready for checkout.
              </p>
            </div>
            <button
              className="self-start text-sm font-bold text-brand-danger transition hover:opacity-70 sm:self-auto"
              type="button"
              onClick={clearCart}
            >
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
          className="inline-flex min-h-11 items-center rounded-md border border-neutral-200 bg-white px-5 font-heading text-sm font-extrabold text-brand-charcoal transition hover:border-brand-primary hover:bg-brand-primary-muted"
        >
          Continue shopping
        </Link>
      </section>

      <CartSummary
        hasEstimatedPrices={hasEstimatedPrices}
        itemCount={itemCount}
        subtotal={subtotal}
      />
    </div>
  );
}

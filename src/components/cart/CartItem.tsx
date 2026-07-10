"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import {
  formatProductLineTotal,
  formatProductPrice,
} from "@/lib/product-pricing";
import type { CartItem as CartItemType } from "@/types/cart";
import { cardClassName } from "@/components/ui/Card";

import { QuantityControls } from "./QuantityControls";

type CartItemProps = {
  item: CartItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const productHref = `/products/${item.slug}` as const;

  return (
    <article
      className={cardClassName({
        className:
          "grid gap-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:grid-cols-[132px_1fr] sm:p-5",
        padding: "sm",
      })}
    >
      <Link href={productHref} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-primary-muted">
          <div className="absolute inset-3 rounded-xl border border-white/80 bg-white/60" />
          <div className="absolute inset-4">
            <Image
              fill
              alt={`${item.name} product image`}
              className="object-contain"
              sizes="132px"
              src={item.image}
            />
          </div>
        </div>
      </Link>

      <div className="flex min-w-0 flex-col">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <Link href={productHref}>
              <h3 className="font-heading text-xl font-extrabold leading-snug text-brand-charcoal transition hover:text-neutral-700">
                {item.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm font-semibold text-brand-muted">
              {formatProductPrice(item.price, item.priceStatus)} each
            </p>
            {item.packSize ? (
              <p className="mt-1 text-sm font-semibold text-brand-muted">
                Pack: {item.packSize}
              </p>
            ) : null}
            {item.minimumOrderQuantity ? (
              <p className="mt-1 text-xs font-semibold text-brand-muted">
                MOQ: {item.minimumOrderQuantity} pcs
              </p>
            ) : null}
          </div>
          <p className="shrink-0 font-heading text-xl font-extrabold text-brand-charcoal">
            {formatProductLineTotal(
              item.price,
              item.quantity,
              item.priceStatus,
            )}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <QuantityControls value={item.quantity} onChange={onQuantityChange} />
          <button
            className="inline-flex items-center gap-2 self-start rounded-md px-1 py-2 text-sm font-bold text-brand-danger transition hover:opacity-70 sm:self-auto"
            type="button"
            onClick={onRemove}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

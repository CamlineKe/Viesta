"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { cardClassName } from "@/components/ui/Card";
import {
  formatProductLineTotal,
  formatProductPrice,
} from "@/lib/product-pricing";
import type { CartItem as CartItemType } from "@/types/cart";

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
        className: "grid min-w-0 gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:p-5",
        padding: "sm",
        variant: "flat",
      })}
    >
      <Link href={productHref} className="block w-full max-w-48 justify-self-center sm:max-w-none">
        <div className="relative aspect-square overflow-hidden rounded-brand-lg bg-brand-botanical">
          <div className="absolute inset-3 rounded-brand-md border border-brand-border-soft bg-white" />
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
              <h3 className="break-words font-heading text-lg font-extrabold leading-snug text-brand-charcoal transition hover:text-neutral-700 sm:text-xl">
                {item.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm font-semibold text-brand-muted">
              {item.offerLabel}
            </p>
            <p className="mt-1 text-sm font-semibold text-brand-muted">
              {formatProductPrice(item.price)} per offer bundle
            </p>
            <p className="mt-1 text-xs font-semibold text-brand-muted">
              {item.packsPerBundle} pack
              {item.packsPerBundle === 1 ? "" : "s"} per bundle, each with{" "}
              {item.packSize}
            </p>
            <p className="mt-1 text-xs font-semibold text-brand-muted">
              {item.packsPerBundle * item.quantity} pack
              {item.packsPerBundle * item.quantity === 1 ? "" : "s"} total
            </p>
          </div>
          <p className="break-words font-heading text-lg font-extrabold text-brand-charcoal sm:shrink-0 sm:text-xl">
            {formatProductLineTotal(item.price, item.quantity)}
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

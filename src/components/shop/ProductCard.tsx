"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { categories } from "@/data/categories";
import { cn } from "@/lib/class-names";
import {
  formatProductCompareAtPrice,
  formatProductDisplayPrice,
  formatProductPrice,
} from "@/lib/product-pricing";
import type { Product } from "@/types/product";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cardClassName } from "../ui/Card";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const category = categories.find((item) => item.id === product.category);
  const productHref = `/products/${product.slug}` as const;
  const offers = product.offers ?? [];
  const canChooseOffer =
    product.priceStatus === "confirmed" && offers.length > 0;
  const compareAtPrice = formatProductCompareAtPrice(
    offers[0]?.compareAtPrice,
  );

  return (
    <article
      className={cardClassName({
        className: "group min-w-0 flex h-full flex-col overflow-hidden p-0",
        variant: "interactive",
      })}
    >
      <Link href={productHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-botanical via-brand-canvas to-brand-sun-wash">
          <div className="absolute inset-3 overflow-hidden rounded-brand-lg border border-brand-border-soft bg-white transition duration-500 ease-out-expo group-hover:scale-[1.03] sm:inset-5">
            {!isImageLoaded ? (
              <div className="shimmer-surface absolute inset-0 animate-shimmer" />
            ) : null}
            <Image
              fill
              alt={`${product.name} product image`}
              className={cn(
                "object-contain p-3 transition duration-500 ease-out-expo sm:p-4",
                isImageLoaded ? "opacity-100" : "opacity-0",
              )}
              sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 24vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
              src={product.image}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          {category ? <Badge>{category.name}</Badge> : null}
          <Badge variant={canChooseOffer ? "success" : "warning"}>
            {canChooseOffer ? "Retail offers" : "Price unconfirmed"}
          </Badge>
        </div>
        <Link href={productHref} className="mt-3 block">
          <h3 className="line-clamp-2 break-words font-heading text-base font-extrabold leading-snug text-brand-charcoal sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-brand-muted">
          {product.shortDescription}
        </p>
        <div className="mt-auto pt-4 sm:pt-5">
          <p className="break-words font-heading text-lg font-extrabold text-brand-charcoal sm:text-xl">
            {formatProductDisplayPrice(product)}
          </p>
          {compareAtPrice ? (
            <p className="mt-1 text-xs font-bold text-brand-muted line-through">
              {compareAtPrice}
            </p>
          ) : null}
          {canChooseOffer ? (
            <ul
              aria-label={`${product.name} retail offers`}
              className="mt-3 space-y-1.5 rounded-brand-md border border-brand-border-soft bg-brand-sun-wash p-2.5"
            >
              {offers.map((offer) => (
                <li
                  key={offer.id}
                  className="flex min-w-0 items-start justify-between gap-2 text-xs"
                >
                  <span className="min-w-0 break-words font-bold text-brand-charcoal">
                    {offer.label}
                  </span>
                  <span className="shrink-0 font-extrabold text-brand-charcoal">
                    {formatProductPrice(offer.price, "confirmed")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm font-semibold leading-6 text-brand-muted">
              Retail pricing has not been confirmed for this product.
            </p>
          )}
          {canChooseOffer ? (
            <Link
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-5 text-sm font-bold text-brand-charcoal shadow-glow transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover active:translate-y-0 active:scale-[0.97]"
              href={productHref}
            >
              <ShoppingCart aria-hidden="true" className="h-4 w-4" />
              Choose offer
            </Link>
          ) : (
            <Button disabled className="mt-3 w-full transition duration-300">
              <ShoppingCart aria-hidden="true" className="h-4 w-4" />
              Price unconfirmed
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

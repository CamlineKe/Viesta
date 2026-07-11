"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { categories } from "@/data/categories";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/hooks/useCart";
import { openCartDrawer } from "@/lib/cart-drawer-events";
import { cn } from "@/lib/class-names";
import {
  formatProductDisplayPrice,
  hasConfirmedPrice,
} from "@/lib/product-pricing";
import type { Product } from "@/types/product";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cardClassName } from "../ui/Card";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const category = categories.find((item) => item.id === product.category);
  const productHref = `/products/${product.slug}` as const;
  const canAddToCart = hasConfirmedPrice(product.price);
  const hasVariants = Boolean(product.variants?.length);
  const handleAddToCart = () => {
    if (!canAddToCart || hasVariants) {
      return;
    }

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      priceStatus: product.priceStatus,
      packSize: product.packSize,
      minimumOrderQuantity: product.minimumOrderQuantity,
      image: product.image,
    });
    showToast(`${product.name} added to cart.`, "success");
    openCartDrawer();
  };

  return (
    <article
      className={cardClassName({
        className: "group flex h-full flex-col overflow-hidden p-0",
        variant: "interactive",
      })}
    >
      <Link href={productHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-primary-muted">
          <div className="absolute inset-4 rounded-2xl border border-white/70 bg-white/60 shadow-soft" />
          {!isImageLoaded ? (
            <div className="shimmer-surface absolute inset-5 animate-shimmer rounded-2xl" />
          ) : null}
          <div className="absolute inset-3 overflow-hidden rounded-2xl bg-white/80 p-3 transition duration-500 ease-out-expo group-hover:scale-105 sm:inset-5 sm:p-4">
            <Image
              fill
              alt={`${product.name} product image`}
              className={cn(
                "object-contain transition duration-500 ease-out-expo",
                isImageLoaded ? "opacity-100" : "opacity-0",
              )}
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw"
              src={product.image}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {category ? <Badge>{category.name}</Badge> : null}
        <Link href={productHref} className="mt-3 block">
          <h3 className="font-heading text-base font-extrabold leading-snug text-brand-charcoal sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          {product.shortDescription}
        </p>
        <div className="mt-auto pt-4 sm:pt-5">
          <p className="font-heading text-lg font-extrabold text-brand-charcoal sm:text-xl">
            {formatProductDisplayPrice(product)}
          </p>
          {hasVariants ? (
            <Link
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-5 text-sm font-bold text-brand-charcoal shadow-glow transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover active:translate-y-0 active:scale-[0.97]"
              href={productHref}
            >
              <ShoppingCart aria-hidden="true" className="h-4 w-4" />
              Choose options
            </Link>
          ) : (
            <Button
              disabled={!canAddToCart}
              className="mt-3 w-full transition duration-300"
              onClick={handleAddToCart}
            >
              <ShoppingCart aria-hidden="true" className="h-4 w-4" />
              {canAddToCart ? "Add to cart" : "Awaiting price"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

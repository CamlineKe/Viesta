import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { cardClassName } from "@/components/ui/Card";
import { categories } from "@/data/categories";
import type { Product } from "@/types/product";

type BlogProductDiscoveryCardProps = {
  product: Product;
};

export function BlogProductDiscoveryCard({ product }: BlogProductDiscoveryCardProps) {
  const category = categories.find((item) => item.id === product.category);

  return (
    <article
      className={cardClassName({
        className: "group flex h-full min-w-0 flex-col overflow-hidden p-0",
        variant: "interactive",
      })}
    >
      <Link className="block" href={`/products/${product.slug}`}>
        <div className="relative aspect-[16/10] bg-gradient-to-br from-brand-botanical via-brand-canvas to-brand-sun-wash">
          <Image
            fill
            alt={`${product.name} product packaging`}
            className="object-contain p-5 transition duration-500 ease-out-expo group-hover:scale-105"
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
            src={product.image}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-success">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
          {category?.name ?? "Related product"}
        </div>
        <Link className="mt-3 block" href={`/products/${product.slug}`}>
          <h3 className="font-heading text-xl font-extrabold leading-snug text-brand-charcoal">
            {product.name}
          </h3>
        </Link>
        <p className="mt-3 text-sm leading-6 text-brand-muted">
          Review the product page and verify the label details before deciding whether it fits your routine.
        </p>
        <Link
          className="mt-auto inline-flex items-center gap-2 pt-5 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
          href={`/products/${product.slug}`}
        >
          View product information
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

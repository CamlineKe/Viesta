import type { Product } from "@/types/product";

import { ProductCard } from "../shop/ProductCard";
import { SectionHeader } from "../ui/SectionHeader";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-brand-border-soft pt-12 lg:mt-20 lg:pt-16">
      <SectionHeader
        eyebrow="Related Products"
        title="Explore similar wellness support"
        description="Products from the same category or nearby routines."
      />
      <div className="-mx-4 mt-8 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[82vw] snap-start sm:min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

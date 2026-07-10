import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";

import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop",
  description: "Browse Viesta nutrition and health supplements in Kenya.",
} satisfies Metadata;

export default function ShopPage() {
  return (
    <main className="bg-brand-cream text-brand-charcoal">
      <section className="border-b border-neutral-200/70 bg-white py-14 lg:py-16">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap justify-center gap-2 text-sm font-semibold text-brand-muted"
          >
            <Link className="transition hover:text-brand-charcoal" href="/">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
            <span className="text-brand-charcoal">Shop</span>
          </nav>
          <SectionHeader
            align="center"
            eyebrow="Shop"
            title="All Products"
            description="Browse Viesta supplements by health goal, compare prices, and add products to your cart before WhatsApp checkout."
          />
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <Suspense fallback={<div className="rounded-2xl bg-white p-8 text-brand-muted">Loading products...</div>}>
            <ProductGrid categories={categories} products={products} />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}

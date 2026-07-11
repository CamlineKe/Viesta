import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { TestimonialCard } from "@/components/content/TestimonialCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { TrustBadges } from "@/components/product/TrustBadges";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

function getRelatedProducts(productId: string, categoryId: string) {
  const sameCategoryProducts = products.filter(
    (product) => product.id !== productId && product.category === categoryId,
  );

  if (sameCategoryProducts.length >= 3) {
    return sameCategoryProducts.slice(0, 4);
  }

  const fallbackProducts = products.filter(
    (product) => product.id !== productId && !sameCategoryProducts.some((item) => item.id === product.id),
  );

  return [...sameCategoryProducts, ...fallbackProducts].slice(0, 4);
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((item) => item.id === product.category);
  const relatedProducts = getRelatedProducts(product.id, product.category);

  return (
    <main className="bg-brand-canvas py-10 text-brand-charcoal lg:py-14">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-muted"
        >
          <Link className="transition hover:text-brand-charcoal" href="/">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          <Link className="transition hover:text-brand-charcoal" href="/shop">
            Shop
          </Link>
          {category ? (
            <>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
              <Link
                className="transition hover:text-brand-charcoal"
                href={{ pathname: "/shop", query: { category: category.slug } }}
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          <span className="text-brand-charcoal">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <section className="section-sun-wash mt-12 rounded-brand-xl border border-brand-border-soft p-5 lg:mt-16 lg:p-6">
          <TrustBadges />
        </section>

        <RelatedProducts products={relatedProducts} />

        <section className="section-botanical mt-16 rounded-brand-xl border border-brand-border-soft p-5 lg:mt-20 lg:p-8">
          <SectionHeader
            align="center"
            eyebrow="Customer Signals"
            title="What our customers say"
            description="Static review placeholders for the product page. Replace with approved customer reviews before launch."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

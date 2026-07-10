import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Dumbbell,
  HeartPulse,
  Leaf,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

import { BlogCard } from "@/components/content/BlogCard";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TrustBadges } from "@/components/product/TrustBadges";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredBlogPosts } from "@/data/blog-posts";
import { categories } from "@/data/categories";
import { featuredProducts, products } from "@/data/products";
import { siteContent } from "@/data/site";

const categoryIcons = {
  Activity,
  HeartPulse,
  ShieldCheck,
  Leaf,
  Users,
  Dumbbell,
  Package,
  Sparkles,
};

const heroTrustItems = [
  { label: "Free Nairobi & Kiambu delivery", icon: Truck },
  { label: "Lab-tested positioning", icon: ShieldCheck },
  { label: "WhatsApp checkout", icon: Sparkles },
];

const categoryCounts = products.reduce<Record<string, number>>(
  (counts, product) => {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
    return counts;
  },
  {},
);

export default function HomePage() {
  const updatesMessage = encodeURIComponent(
    "Hello! I'd like to receive Viesta nutrition tips and product updates.",
  );
  const updatesUrl = `https://wa.me/${siteContent.contact.whatsapp.replace(/[^\d]/g, "")}?text=${updatesMessage}`;

  return (
    <main className="bg-white text-brand-charcoal">
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(246,226,6,0.18), transparent 28%), radial-gradient(circle at 82% 72%, rgba(255,215,0,0.14), transparent 30%), linear-gradient(180deg, #ffffff 0%, #fffbea 100%)",
          }}
        />
        <Container className="relative grid min-h-[70svh] items-center gap-10 py-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-3xl animate-fade-up">
            <Badge variant="default">Premium Nutrition</Badge>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
              Your trusted source for premium nutrition.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Quality supplements for everyday health goals, clear product
              discovery, and a simple WhatsApp order flow built for Kenya.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-brand-primary-hover active:scale-[0.97]"
              >
                Shop Now
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-border bg-white/80 px-6 font-heading font-extrabold text-brand-charcoal backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary-muted"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroTrustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-bold text-brand-charcoal shadow-brand-sm backdrop-blur-md"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 text-brand-success"
                    />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div
              aria-hidden="true"
              className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-brand-primary/25 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-8 right-2 h-36 w-36 rounded-full bg-brand-accent/20 blur-3xl"
            />
            <div className="glass-surface relative overflow-hidden rounded-brand-xl p-4 sm:p-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-brand-lg bg-brand-primary-muted">
                <Image
                  fill
                  priority
                  alt="Viesta premium nutrition product range"
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  src="/images/brand/hero.png"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-cream py-16 lg:py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Shop by Category"
            title="Find support for your wellness routine"
            description="Browse Viesta categories by health goal, then move quickly into products that fit your routine."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon =
                categoryIcons[category.icon as keyof typeof categoryIcons] ??
                Package;
              const count = categoryCounts[category.id] ?? 0;

              return (
                <Link
                  key={category.id}
                  href={{
                    pathname: "/shop",
                    query: { category: category.slug },
                  }}
                  className="premium-card group rounded-brand-lg p-5"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-brand-lg bg-brand-primary-muted text-brand-charcoal transition duration-300 group-hover:bg-brand-primary">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-extrabold text-brand-charcoal">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-brand-muted">
                    {count} product{count === 1 ? "" : "s"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-brand-muted">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Best Sellers"
              title="Popular wellness picks"
              description="Featured products from the Viesta catalog with clear pricing status, pack options, and WhatsApp checkout."
            />
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
            >
              View all products
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="-mx-4 mt-10 flex snap-x gap-5 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {featuredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="min-w-[82vw] snap-start sm:min-w-[340px] lg:min-w-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-cream py-16 lg:py-20">
        <Container>
          <TrustBadges />
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Journal"
              title="Latest from the blog"
              description="Educational wellness content for nutrition, fitness, ingredients, and everyday health decisions."
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
            >
              View all articles
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="-mx-4 mt-10 flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {featuredBlogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="min-w-[82vw] snap-start sm:min-w-[340px] md:min-w-0"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-charcoal py-16 text-white lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-primary">
              Stay Updated
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Nutrition tips and product updates.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Get practical wellness notes and launch updates when the final
              Viesta product catalog is ready.
            </p>
            <a
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-brand-primary-hover active:scale-[0.97]"
              href={updatesUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get updates on WhatsApp
              <WhatsAppIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

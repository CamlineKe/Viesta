import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Info,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { BlogArticleBody } from "@/components/content/BlogArticleBody";
import { BlogCard } from "@/components/content/BlogCard";
import { BlogProductDiscoveryCard } from "@/components/content/BlogProductDiscoveryCard";
import { BlogSources } from "@/components/content/BlogSources";
import { BlogTableOfContents } from "@/components/content/BlogTableOfContents";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBlogCategoryLabel } from "@/data/blog-categories";
import {
  BLOG_MEDICAL_DISCLAIMER,
  formatBlogDate,
  getBlogReadTimeLabel,
  getBlogTableOfContents,
} from "@/data/blog-editorial";
import { publishedBlogPosts } from "@/data/blog-posts";
import { products } from "@/data/products";
import { siteContent } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildBlogPostJsonLd, buildBlogPostMetadata } from "@/lib/blog-seo";

export function generateStaticParams() {
  return publishedBlogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedBlogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = publishedBlogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const tableOfContents = getBlogTableOfContents(post.content);
  const relatedProducts = (post.relatedProductSlugs ?? []).flatMap((productSlug) => {
    const product = products.find((item) => item.slug === productSlug);

    return product ? [product] : [];
  });
  const relatedPosts = publishedBlogPosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .concat(
      publishedBlogPosts.filter(
        (item) => item.id !== post.id && item.category !== post.category,
      ),
    )
    .slice(0, 3);
  const updatesUrl = buildWhatsAppUrl(
    siteContent.contact.whatsapp,
    `Hello Viesta Nutrition, I read “${post.title}” and would like to receive new wellness guides on WhatsApp.`,
  );
  const articleJsonLd = buildBlogPostJsonLd(post);

  return (
    <main className="bg-brand-canvas text-brand-charcoal">
      <JsonLd data={articleJsonLd} />
      <section className="section-canvas relative isolate overflow-hidden pb-16 pt-10 lg:pb-20 lg:pt-12">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-charcoal opacity-[0.03]"
        >
          <defs>
            <pattern id="article-header-dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="58%" fill="url(#article-header-dots)" />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-brand-success/10 blur-3xl"
        />

        <Container className="relative">
          <Link
            className="inline-flex items-center gap-2 font-heading text-sm font-extrabold transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
            href="/blog"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to all guides
          </Link>

          <article className="mt-10">
            <header className="mx-auto max-w-4xl text-center">
              <Badge variant="default">{getBlogCategoryLabel(post.category)}</Badge>
              <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-brand-muted sm:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold text-brand-muted">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound aria-hidden="true" className="h-4 w-4 text-brand-success" />
                  {post.author}
                </span>
                {post.publishedAt ? (
                  <time className="inline-flex items-center gap-1.5" dateTime={post.publishedAt}>
                    <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-success" />
                    {formatBlogDate(post.publishedAt)}
                  </time>
                ) : null}
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4 text-brand-success" />
                  {getBlogReadTimeLabel(post.readTimeMinutes)}
                </span>
              </div>
            </header>

            <div className="glass-surface relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-brand-xl p-3 sm:p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-brand-lg bg-brand-primary-muted">
                <Image
                  fill
                  priority
                  alt={post.coverImage.alt}
                  className="object-cover"
                  sizes="(min-width: 1280px) 1120px, 92vw"
                  src={post.coverImage.src}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <Badge variant="default">{getBlogCategoryLabel(post.category)}</Badge>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl min-w-0 gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-10">
              <aside className="min-w-0 lg:sticky lg:top-28">
                <BlogTableOfContents items={tableOfContents} />
                <div className="mt-4 rounded-brand-lg border border-brand-primary/30 bg-brand-sun-wash p-5">
                  <div className="flex items-center gap-2 font-heading text-sm font-extrabold">
                    <Info aria-hidden="true" className="h-4 w-4 text-brand-success" />
                    Read with context
                  </div>
                  <p className="mt-2 text-xs leading-6 text-brand-muted">
                    General reference ranges and habits are not personalized medical targets.
                  </p>
                </div>
              </aside>

              <div className="surface-flat min-w-0 space-y-7 rounded-brand-xl p-5 sm:p-8 lg:p-10">
                <BlogArticleBody blocks={post.content} />
                <BlogSources sources={post.sources} />

                <aside className="rounded-brand-lg border-l-4 border-brand-primary bg-brand-sun-wash p-5 text-sm leading-7 text-brand-charcoal sm:p-6 sm:text-base sm:leading-8">
                  <div className="flex items-center gap-2 font-heading font-extrabold">
                    <ShieldCheck aria-hidden="true" className="h-5 w-5 text-brand-success" />
                    Medical information disclaimer
                  </div>
                  <p className="mt-3">{BLOG_MEDICAL_DISCLAIMER}</p>
                </aside>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="section-sun-wash py-16 lg:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
              <SectionHeader
                eyebrow="Optional Product Discovery"
                title="Explore products related to this reading topic"
                description="These links support catalog discovery only. They are not treatment recommendations and do not replace the article's professional-care guidance."
              />
              <div className="rounded-brand-lg border border-brand-primary/40 bg-white/70 p-5 backdrop-blur-sm">
                <p className="text-sm font-bold leading-7 text-brand-charcoal">
                  Always review the confirmed label, ingredients, directions, and warnings. Ask a
                  qualified professional before use when medication or a health condition may affect
                  what is appropriate.
                </p>
              </div>
            </div>
            <div
              aria-label="Related product discovery"
              className="-mx-4 mt-10 flex w-[calc(100%_+_2rem)] snap-x gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 sm:mx-0 sm:grid sm:w-auto sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
              role="region"
            >
              {relatedProducts.map((product) => (
                <div key={product.id} className="min-w-[82vw] snap-start sm:min-w-0">
                  <BlogProductDiscoveryCard product={product} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="section-botanical py-16 lg:py-20">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                eyebrow="Continue Reading"
                title="Related wellness guides"
                description="Keep building context with another practical guide from the Viesta journal."
              />
              <Link
                className="inline-flex items-center gap-2 font-heading text-sm font-extrabold transition hover:gap-3"
                href="/blog#browse-guides"
              >
                Browse all guides
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div
              aria-label="Related wellness guides"
              className="-mx-4 mt-10 flex w-[calc(100%_+_2rem)] snap-x gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 md:mx-0 md:grid md:w-auto md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3"
              role="region"
            >
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="min-w-[82vw] snap-start sm:min-w-[340px] md:min-w-0"
                >
                  <BlogCard post={relatedPost} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="relative overflow-hidden bg-brand-charcoal py-16 text-white lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-success/15 blur-3xl"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-primary">
              Keep Learning
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Get new wellness guides on WhatsApp.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/70">
              Receive practical education and new article updates from the Viesta Wellness Team.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-primary px-6 font-heading font-extrabold text-brand-charcoal shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-primary-hover active:scale-[0.97]"
                href={updatesUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Get updates on WhatsApp
                <WhatsAppIcon className="ml-2 h-5 w-5" />
              </a>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 px-6 font-heading font-extrabold text-white transition hover:-translate-y-0.5 hover:border-brand-primary hover:bg-white/5 active:scale-[0.97]"
                href="/blog"
              >
                Return to the journal
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

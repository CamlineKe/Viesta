import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, UserRound } from "lucide-react";

import { BlogArticleBody } from "@/components/content/BlogArticleBody";
import { BlogCard } from "@/components/content/BlogCard";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getBlogCategoryLabel } from "@/data/blog-categories";
import { BLOG_MEDICAL_DISCLAIMER, getBlogReadTimeLabel } from "@/data/blog-editorial";
import { publishedBlogPosts } from "@/data/blog-posts";

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

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = publishedBlogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = publishedBlogPosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .concat(
      publishedBlogPosts.filter(
        (item) => item.id !== post.id && item.category !== post.category,
      ),
    )
    .slice(0, 3);

  return (
    <main className="section-canvas py-12 text-brand-charcoal lg:py-16">
      <Container>
        <Link
          className="inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
          href="/blog"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to blog
        </Link>

        <article className="mt-8">
          <header className="mx-auto max-w-4xl text-center">
            <Badge variant="default">{getBlogCategoryLabel(post.category)}</Badge>
            <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-brand-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-brand-muted">
              <span className="inline-flex items-center gap-1.5">
                <UserRound aria-hidden="true" className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                {post.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="h-4 w-4" />
                {getBlogReadTimeLabel(post.readTimeMinutes)}
              </span>
            </div>
          </header>

          <div className="relative mt-10 aspect-[16/10] max-h-[500px] overflow-hidden rounded-brand-xl border border-brand-border-soft bg-brand-canvas shadow-brand-md sm:aspect-[21/9]">
            <Image
              fill
              priority
              alt={post.coverImage.alt}
              className="object-cover"
              sizes="(min-width: 1280px) 1120px, 92vw"
              src={post.coverImage.src}
            />
            <div className="absolute left-5 top-5">
              <Badge variant="default">{getBlogCategoryLabel(post.category)}</Badge>
            </div>
          </div>

          <div className="surface-flat mx-auto mt-10 max-w-3xl space-y-6 rounded-brand-xl p-4 sm:p-8">
            <BlogArticleBody blocks={post.content} />

            <aside className="rounded-brand-lg border-l-4 border-brand-primary bg-brand-sun-wash p-5 text-base leading-8 text-brand-charcoal">
              <p className="font-heading font-extrabold">Medical information disclaimer</p>
              <p className="mt-2">{BLOG_MEDICAL_DISCLAIMER}</p>
            </aside>
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="mt-16 border-t border-brand-border-soft pt-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-muted">More from Viesta</p>
                <h2 className="mt-2 font-heading text-3xl font-extrabold">Related articles</h2>
              </div>
              <Link
                className="inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
                href="/blog"
              >
                View all articles
              </Link>
            </div>
            <div
              aria-label="Related articles"
              className="-mx-4 mt-8 flex w-[calc(100%_+_2rem)] snap-x gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 md:mx-0 md:grid md:w-auto md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3"
              role="region"
            >
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="min-w-[82vw] snap-start sm:min-w-[340px] md:min-w-0">
                  <BlogCard post={relatedPost} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}

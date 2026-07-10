import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, UserRound } from "lucide-react";

import { BlogCard } from "@/components/content/BlogCard";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { blogPosts } from "@/data/blog-posts";
import type { BlogPost } from "@/types/blog";

const categoryLabels: Record<BlogPost["category"], string> = {
  "nutrition-tips": "Nutrition Tips",
  fitness: "Fitness",
  ingredients: "Ingredients",
  wellness: "Wellness",
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

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
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .concat(blogPosts.filter((item) => item.id !== post.id && item.category !== post.category))
    .slice(0, 3);

  return (
    <main className="bg-white py-12 text-brand-charcoal lg:py-16">
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
            <Badge variant="default">{categoryLabels[post.category]}</Badge>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
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
                {post.readTime}
              </span>
            </div>
          </header>

          <div className="relative mt-10 aspect-[21/9] max-h-[500px] overflow-hidden rounded-3xl border border-neutral-200/70 bg-brand-cream shadow-soft">
            <Image
              fill
              priority
              alt={`${post.title} article hero image`}
              className="object-cover"
              sizes="(min-width: 1280px) 1120px, 92vw"
              src={post.image}
            />
            <div className="absolute left-5 top-5">
              <Badge variant="default">{categoryLabels[post.category]}</Badge>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-9 text-brand-muted">
                {paragraph}
              </p>
            ))}

            <blockquote className="rounded-2xl border-l-4 border-brand-primary bg-brand-cream p-5 text-base italic leading-8 text-brand-charcoal">
              Educational content is general wellness information. Customers with medical conditions,
              pregnancy, allergies, or medication use should seek qualified professional advice.
            </blockquote>

            {post.needsConfirmation?.length ? (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                <p className="font-heading font-extrabold">Needs confirmation before launch</p>
                <p className="mt-1">{post.needsConfirmation.join(", ")}</p>
              </div>
            ) : null}
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="mt-16 border-t border-neutral-200 pt-12">
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
            <div className="-mx-4 mt-8 flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
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

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/types/blog";

import { Badge } from "../ui/Badge";
import { cardClassName } from "../ui/Card";

type BlogCardProps = {
  post: BlogPost;
};

const categoryLabels: Record<BlogPost["category"], string> = {
  "nutrition-tips": "Nutrition Tips",
  fitness: "Fitness",
  ingredients: "Ingredients",
  wellness: "Wellness",
};

export function BlogCard({ post }: BlogCardProps) {
  const postHref = `/blog/${post.slug}` as const;

  return (
    <article
      className={cardClassName({
        className: "group min-w-0 h-full overflow-hidden p-0",
        variant: "interactive",
      })}
    >
      <Link href={postHref} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-canvas">
          <Image
            fill
            alt={`${post.title} article image`}
            className="object-cover transition duration-500 ease-out-expo group-hover:scale-105"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, calc(100vw - 2rem)"
            src={post.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 to-transparent" />
        </div>
      </Link>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">{categoryLabels[post.category]}</Badge>
          <span className="text-xs font-semibold text-brand-muted">
            {post.readTime}
          </span>
        </div>
        <Link href={postHref} className="mt-4 block">
          <h3 className="line-clamp-2 break-words font-heading text-xl font-extrabold leading-snug text-brand-charcoal">
            {post.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-brand-muted">
          {post.excerpt}
        </p>
        <Link
          href={postHref}
          className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:gap-3"
        >
          Read more
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

import type { Metadata } from "next";

import { getBlogCategoryLabel } from "@/data/blog-categories";
import { siteContent } from "@/data/site";
import type { BlogPost } from "@/types/blog";

function absoluteUrl(path: string): string {
  return new URL(path, siteContent.url).toString();
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const canonicalPath = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    authors: [{ name: post.author }],
    robots: {
      index: post.status === "published",
      follow: post.status === "published",
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: siteContent.name,
      locale: "en_KE",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      section: getBlogCategoryLabel(post.category),
      images: [
        {
          url: post.coverImage.src,
          width: 1600,
          height: 1000,
          alt: post.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage.src],
    },
  };
}

export function buildBlogPostJsonLd(post: BlogPost): Record<string, unknown> {
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const modifiedAt = post.updatedAt ?? post.publishedAt;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.coverImage.src)],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteContent.name,
      url: siteContent.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteContent.logo),
      },
    },
    articleSection: getBlogCategoryLabel(post.category),
    inLanguage: "en-KE",
    isAccessibleForFree: true,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(modifiedAt ? { dateModified: modifiedAt } : {}),
  };
}

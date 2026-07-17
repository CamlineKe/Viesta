import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts } from "@/data/blog-posts";
import { buildBlogPostJsonLd, buildBlogPostMetadata } from "@/lib/blog-seo";

const post = blogPosts[0];

describe("blog SEO metadata", () => {
  afterEach(cleanup);

  it("builds canonical and social metadata from the article record", () => {
    const metadata = buildBlogPostMetadata(post);

    expect(metadata).toMatchObject({
      title: post.title,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        type: "article",
        url: `/blog/${post.slug}`,
        title: post.title,
        description: post.excerpt,
        publishedTime: post.publishedAt,
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
    });
  });

  it("marks draft metadata as noindex and nofollow", () => {
    const metadata = buildBlogPostMetadata({ ...post, status: "draft" });

    expect(metadata).toMatchObject({
      robots: {
        index: false,
        follow: false,
      },
    });
  });

  it("builds absolute BlogPosting structured data that matches visible content", () => {
    const jsonLd = buildBlogPostJsonLd(post);

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `https://viestanutrition.com/blog/${post.slug}#article`,
      headline: post.title,
      description: post.excerpt,
      image: [`https://viestanutrition.com${post.coverImage.src}`],
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "en-KE",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://viestanutrition.com/blog/${post.slug}`,
      },
    });
  });

  it("escapes less-than characters when serializing JSON-LD", () => {
    const { container } = render(
      <JsonLd data={{ "@context": "https://schema.org", name: "</script><script>" }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).toContain("\\u003c/script>");
    expect(script?.textContent).not.toContain("</script>");
  });
});

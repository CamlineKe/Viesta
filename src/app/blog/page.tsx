import type { Metadata } from "next";

import { BlogGrid } from "@/components/content/BlogGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/data/blog-posts";

export const metadata = {
  title: "Blog",
  description: "Educational nutrition, fitness, ingredients, and wellness articles from Viesta.",
} satisfies Metadata;

export default function BlogPage() {
  return (
    <main className="bg-white py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Journal"
          title="Nutrition and wellness journal"
          description="Educational articles for supplement literacy, fitness nutrition, ingredients, and daily wellness decisions."
          align="center"
        />
        <BlogGrid posts={blogPosts} />
      </Container>
    </main>
  );
}

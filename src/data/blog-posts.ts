import type { BlogPost } from "@/types/blog";

import { bloodPressureAwarenessPost } from "./blog-articles/blood-pressure-awareness";
import { dailyImmunitySupportPost } from "./blog-articles/daily-immunity-support";
import { detoxingTheRightWayPost } from "./blog-articles/detoxing-the-right-way";
import { diabetesWellnessPost } from "./blog-articles/diabetes-wellness";
import { herbalTeaWellnessPost } from "./blog-articles/herbal-tea-wellness";
import { jointMobilityWellnessPost } from "./blog-articles/joint-mobility-wellness";
import { mensWellnessPost } from "./blog-articles/mens-wellness";
import { womensWellnessPost } from "./blog-articles/womens-wellness";

export const blogPosts: BlogPost[] = [
  bloodPressureAwarenessPost,
  diabetesWellnessPost,
  detoxingTheRightWayPost,
  dailyImmunitySupportPost,
  jointMobilityWellnessPost,
  womensWellnessPost,
  mensWellnessPost,
  herbalTeaWellnessPost,
];

export function getPublishedBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => post.status === "published");
}

export const publishedBlogPosts = getPublishedBlogPosts(blogPosts);

export const featuredBlogPosts = publishedBlogPosts.filter((post) => post.featured);

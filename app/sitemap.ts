import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import { getProjectSlugs } from "@/lib/site-data";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/dashboard",
  "/freelancing",
  "/links",
  "/portfolio",
  "/recognition",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();
  const projectSlugs = getProjectSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = new Date(post.meta.date);

    return {
      url: `${SITE_URL}/blog/${post.meta.slug}`,
      lastModified: Number.isNaN(postDate.getTime()) ? now : postDate,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...projectEntries];
}

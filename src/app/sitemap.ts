import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const routes = [
  "",
  "/experience",
  "/projects",
  "/projects/production-ml-systems",
  "/projects/fin-ai",
  "/projects/movie-recommendation-system",
  "/resume",
  "/contact",
  "/writing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.8 : 0.7,
  }));
}

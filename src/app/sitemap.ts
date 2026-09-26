import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return ["", "/projects", ...projects.map(({ slug }) => `/projects/${slug}`)].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/projects" ? 0.8 : 0.7,
  }));
}

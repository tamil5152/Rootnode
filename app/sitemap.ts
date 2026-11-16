import type { MetadataRoute } from "next";
import { site } from "@/site.config";

// Served at /sitemap.xml. The section URLs (/services, /pricing ...) show the
// same one-page site, so only the home page is listed to avoid duplicates.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

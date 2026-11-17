import type { MetadataRoute } from "next";
import { site } from "@/site.config";

// Served at /sitemap.xml. The site is one page; /services, /pricing etc.
// show the same page and point Google back to "/" as the main copy, so only
// the home page is listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

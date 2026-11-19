import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { catalog } from "@/services/catalog";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "menu/", "about/", "contact/", "favorites/"].map((p) => `${SITE.url}/${p}`);
  return [...pages, ...catalog.getProducts().map((p) => `${SITE.url}/product/${p.slug}/`)].map((url) => ({ url }));
}

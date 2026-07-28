import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/properties";

const SITE_URL = "https://engriteinnovations.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const propertyPages: MetadataRoute.Sitemap = PROPERTIES.map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...corePages, ...propertyPages];
}

import type { MetadataRoute } from "next";
import { content } from "@content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${content.contact.domain}`;
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

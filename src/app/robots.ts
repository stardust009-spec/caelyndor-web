import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Indexación general permitida; apunta al sitemap. Sin rutas privadas que bloquear.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}

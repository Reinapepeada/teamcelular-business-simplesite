import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/private", "/cart", "/checkout"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/admin", "/api", "/private", "/cart", "/checkout"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

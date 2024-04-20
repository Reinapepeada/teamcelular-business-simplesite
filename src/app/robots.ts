import { MetadataRoute } from "next";

export default function Robots():MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/", // Allow all robots to crawl all pages
            },
        ],
        sitemap:`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
         


    }
}

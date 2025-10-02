import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export default async function sitemap() : Promise<MetadataRoute.Sitemap>{
    return [{
        url: `${SITE_URL}/`,
        changeFrequency: "monthly" as const,
        priority: 1,
        lastModified: new Date().toISOString(),
    },{
        url: `${SITE_URL}/productos`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        lastModified: new Date().toISOString(),
    },{
        url: `${SITE_URL}/contacto`,
        changeFrequency: "yearly" as const,
        priority: 0.8,
        lastModified: new Date().toISOString(),
    },{
        url: `${SITE_URL}/presupuesto-reparacion`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        lastModified: new Date().toISOString(),
    }]
}
import { MetadataRoute } from "next";

export default async function sitemap() : Promise<MetadataRoute.Sitemap>{
    return [{
        url: "${process.env.NEXT_PUBLIC_URL}/",
        changeFrequency: "monthly",
        priority: 1,
        lastModified: new Date().toISOString(),
    },{
        url: "${process.env.NEXT_PUBLIC_URL}/productos",
        changeFrequency: "weekly",
        priority: 0.8,
        lastModified: new Date().toISOString(),
    },{
        url: "${process.env.NEXT_PUBLIC_URL}/contacto",
        changeFrequency: "yearly",
        priority: 0.8,
        lastModified: new Date().toISOString(),
    },{
        url: "${process.env.NEXT_PUBLIC_URL}/presupuesto-reparacion",
        changeFrequency: "weekly",
        priority: 0.8,
        lastModified: new Date().toISOString(),
    }]
}
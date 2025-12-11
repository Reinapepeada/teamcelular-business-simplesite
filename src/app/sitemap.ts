import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

// Páginas principales con alta prioridad
const mainPages = [
  { path: "", priority: 1.0, changeFreq: "weekly" as const },
  { path: "presupuesto-reparacion", priority: 0.95, changeFreq: "weekly" as const },
  { path: "contacto", priority: 0.9, changeFreq: "monthly" as const },
  { path: "tienda", priority: 0.9, changeFreq: "daily" as const },
  { path: "productos", priority: 0.85, changeFreq: "daily" as const },
  { path: "sobrenosotros", priority: 0.7, changeFreq: "monthly" as const },
];

// Guías y contenido educativo
const guidePages = [
  { path: "guias", priority: 0.8, changeFreq: "weekly" as const },
  { path: "guias/reparacion-iphone-buenos-aires", priority: 0.85, changeFreq: "monthly" as const },
  { path: "guias/microelectronica-reballing-caba", priority: 0.8, changeFreq: "monthly" as const },
  { path: "guias/soporte-empresas-servicio-tecnico", priority: 0.75, changeFreq: "monthly" as const },
  { path: "guias/mantenimiento-preventivo-celulares", priority: 0.75, changeFreq: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  
  // Fecha de última modificación dinámica (fecha actual de build)
  const lastMod = currentDate;

  const mainSitemap = mainPages.map((page) => ({
    url: page.path ? `${SITE_URL}/${page.path}` : SITE_URL,
    lastModified: lastMod,
    changeFrequency: page.changeFreq,
    priority: page.priority,
    alternates: {
      languages: {
        "es-AR": page.path ? `${SITE_URL}/${page.path}` : SITE_URL,
      },
    },
  }));

  const guidesSitemap = guidePages.map((page) => ({
    url: `${SITE_URL}/${page.path}`,
    lastModified: lastMod,
    changeFrequency: page.changeFreq,
    priority: page.priority,
    alternates: {
      languages: {
        "es-AR": `${SITE_URL}/${page.path}`,
      },
    },
  }));

  return [...mainSitemap, ...guidesSitemap];
}
import { MetadataRoute } from "next";

// Revalidate sitemap every 24 hours
export const revalidate = 86400;
export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const STORE_API_URL = process.env.NEXT_PUBLIC_STORE_API_URL?.trim() || SITE_URL;

function slugify(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Categories come from the same published catalog used by the store filters.
async function getCategoriesForSitemap(): Promise<string[]> {
  try {
    const endpoint = new URL("/store/facets", STORE_API_URL).toString();
    const response = await fetch(endpoint, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as { categories?: unknown };
    return Array.isArray(data.categories)
      ? data.categories.filter(
          (category): category is string => typeof category === "string",
        )
      : [];
  } catch (error) {
    console.error("Error fetching store facets for sitemap:", error);
    return [];
  }
}

// Paginas principales con alta prioridad
const mainPages = [
  { path: "", priority: 1.0, changeFreq: "weekly" as const },
  {
    path: "reparacion-de-celulares-cerca-de-mi",
    priority: 0.93,
    changeFreq: "weekly" as const,
  },
  { path: "reparaciones", priority: 0.95, changeFreq: "weekly" as const },
  {
    path: "reparaciones/cambio-bateria-caba",
    priority: 0.9,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/cambio-pantalla-caba",
    priority: 0.9,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/cambio-pin-carga-caba",
    priority: 0.9,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/cambio-camara-caba",
    priority: 0.88,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/reparacion-audio-celular-caba",
    priority: 0.88,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/recuperacion-celular-mojado-caba",
    priority: 0.88,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/reparacion-placa-caba",
    priority: 0.9,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/iphone/11",
    priority: 0.86,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/12",
    priority: 0.86,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/13",
    priority: 0.86,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/13-mini",
    priority: 0.84,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/13-pro",
    priority: 0.84,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/14",
    priority: 0.85,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/14-pro",
    priority: 0.84,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/iphone/14-pro-max",
    priority: 0.86,
    changeFreq: "monthly" as const,
  },
  {
    path: "reparaciones/cambio-flex-caba",
    priority: 0.85,
    changeFreq: "weekly" as const,
  },
  {
    path: "reparaciones/cambio-tapa-caba",
    priority: 0.85,
    changeFreq: "weekly" as const,
  },
  { path: "sucursales", priority: 0.85, changeFreq: "monthly" as const },
  {
    path: "sucursales/caba/recoleta",
    priority: 0.9,
    changeFreq: "monthly" as const,
  },
  {
    path: "sucursales/caba/belgrano",
    priority: 0.88,
    changeFreq: "monthly" as const,
  },
  { path: "zonas", priority: 0.55, changeFreq: "monthly" as const },
  { path: "zonas/palermo", priority: 0.55, changeFreq: "monthly" as const },
  { path: "zonas/almagro", priority: 0.55, changeFreq: "monthly" as const },
  { path: "zonas/balvanera", priority: 0.55, changeFreq: "monthly" as const },
  {
    path: "presupuesto-reparacion",
    priority: 0.95,
    changeFreq: "weekly" as const,
  },
  { path: "contacto", priority: 0.9, changeFreq: "monthly" as const },
  { path: "tienda", priority: 0.9, changeFreq: "daily" as const },
  { path: "lab", priority: 0.82, changeFreq: "monthly" as const },
  {
    path: "en/phone-repair-buenos-aires",
    priority: 0.85,
    changeFreq: "monthly" as const,
  },
  { path: "sobrenosotros", priority: 0.7, changeFreq: "monthly" as const },
  { path: "devoluciones", priority: 0.3, changeFreq: "yearly" as const },
  { path: "terminos", priority: 0.3, changeFreq: "yearly" as const },
  { path: "privacidad", priority: 0.3, changeFreq: "yearly" as const },
];

// Guias y contenido educativo
const guidePages = [
  { path: "guias", priority: 0.8, changeFreq: "weekly" as const },
  {
    path: "guias/reparacion-iphone-buenos-aires",
    priority: 0.85,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-samsung-buenos-aires",
    priority: 0.84,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-xiaomi-buenos-aires",
    priority: 0.84,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-motorola-buenos-aires",
    priority: 0.84,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-google-pixel-buenos-aires",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-honor-buenos-aires",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-poco-buenos-aires",
    priority: 0.82,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-oppo-buenos-aires",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-infinix-buenos-aires",
    priority: 0.78,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-zte-buenos-aires",
    priority: 0.78,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-tecno-buenos-aires",
    priority: 0.78,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-alcatel-buenos-aires",
    priority: 0.76,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-asus-buenos-aires",
    priority: 0.79,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-oneplus-buenos-aires",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-huawei-buenos-aires",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-tcl-buenos-aires",
    priority: 0.77,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/microelectronica-reballing-caba",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/presupuesto-service-oficial-segunda-opinion",
    priority: 0.82,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/soporte-empresas-servicio-tecnico",
    priority: 0.75,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/mantenimiento-preventivo-celulares",
    priority: 0.75,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/cambio-bateria-celular",
    priority: 0.75,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/reparacion-pantalla-celular",
    priority: 0.78,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/pin-de-carga-suelto-solucion",
    priority: 0.76,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/celular-mojado-que-hacer",
    priority: 0.76,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/face-id-touch-id-no-funciona",
    priority: 0.76,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/pantalla-con-lineas-causas-reparacion",
    priority: 0.76,
    changeFreq: "monthly" as const,
  },
  {
    path: "guias/celular-con-virus-que-hacer",
    priority: 0.76,
    changeFreq: "monthly" as const,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const lastMod = currentDate;
  const categories = await getCategoriesForSitemap();

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

  // Product pages remain noindex. Published category facets carry store SEO.
  const categorySlugs = Array.from(
    new Set(categories.map(slugify).filter(Boolean)),
  );
  const categoryEntries = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/tienda/categoria/${slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        "es-AR": `${SITE_URL}/tienda/categoria/${slug}`,
      },
    },
  }));

  return [...mainSitemap, ...guidesSitemap, ...categoryEntries];
}

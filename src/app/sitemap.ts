import { MetadataRoute } from "next";
import { getAllProducts, getAllProductImages } from '@/services/products';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

const staticPages = [
  "",
  "productos",
  "contacto",
  "presupuesto-reparacion",
  "sobrenosotros",
  "tienda",
  "guias",
  "guias/mantenimiento-preventivo-celulares",
  "guias/microelectronica-reballing-caba",
  "guias/reparacion-iphone-buenos-aires",
  "guias/soporte-empresas-servicio-tecnico",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Build static entries
  const staticEntries = staticPages.map((path) => ({
    url: `${SITE_URL}/${path}`.replace(/\/$/, ""),
    changeFrequency: path === "" ? ("monthly" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path.startsWith("guias") ? 0.7 : 0.8,
    lastModified: now.toISOString(),
  }));

  // Try to fetch all products and include them in the sitemap
  try {
    const products = await getAllProducts();

    const productEntries = products.map((p) => {
      // obtain images for sitemap and ensure absolute URLs
      const imgs = getAllProductImages(p) || [];
      const images = imgs
        .filter(Boolean)
        .map((img) => {
          if (typeof img !== 'string') return null;
          if (img.startsWith('http://') || img.startsWith('https://')) return img;
          // ensure leading slash
          const path = img.startsWith('/') ? img : `/${img}`;
          return `${SITE_URL}${path}`;
        })
        .filter(Boolean) as string[];

      // Ensure valid ISO date format
      let lastModified = now;
      try {
        if (p.updated_at) {
          const date = new Date(p.updated_at);
          if (!isNaN(date.getTime())) {
            lastModified = date;
          }
        } else if (p.created_at) {
          const date = new Date(p.created_at);
          if (!isNaN(date.getTime())) {
            lastModified = date;
          }
        }
      } catch {
        // Use current date if parsing fails
        lastModified = now;
      }

      return {
        url: `${SITE_URL}/tienda/${p.id}`,
        changeFrequency: ("weekly" as const),
        priority: 0.9,
        lastModified: lastModified,
        images,
      };
    });

    return [...staticEntries, ...productEntries];
  } catch (err) {
    // If fetching products fails, return static entries only
    // Log server-side for debugging
    // eslint-disable-next-line no-console
    console.error('Error building sitemap (products):', err);
    return staticEntries;
  }
}
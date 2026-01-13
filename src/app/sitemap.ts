import { MetadataRoute } from "next";
import { getAllProductImages } from '@/services/products';
import type { Product } from '@/app/tienda/product';
import { buildProductSlug } from '@/lib/productSlug';

// Revalidate sitemap every 24 hours
export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function slugify(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toAbsoluteUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const normalized = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${normalized}`;
}

// Fetch products with cache for sitemap generation
async function getAllProductsForSitemap(): Promise<Product[]> {
  try {
    const response = await fetch(`${apiUrl}/products/all`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}

// Páginas principales con alta prioridad
const mainPages = [
  { path: "", priority: 1.0, changeFreq: "weekly" as const },
  { path: "arreglo-de-celulares", priority: 0.95, changeFreq: "weekly" as const },
  { path: "zonas", priority: 0.8, changeFreq: "monthly" as const },
  { path: "zonas/recoleta", priority: 0.8, changeFreq: "monthly" as const },
  { path: "zonas/palermo", priority: 0.75, changeFreq: "monthly" as const },
  { path: "zonas/belgrano", priority: 0.75, changeFreq: "monthly" as const },
  { path: "zonas/caballito", priority: 0.75, changeFreq: "monthly" as const },
  { path: "zonas/almagro", priority: 0.75, changeFreq: "monthly" as const },
  { path: "zonas/balvanera", priority: 0.75, changeFreq: "monthly" as const },
  { path: "zonas/microcentro", priority: 0.75, changeFreq: "monthly" as const },
  { path: "presupuesto-reparacion", priority: 0.95, changeFreq: "weekly" as const },
  { path: "contacto", priority: 0.9, changeFreq: "monthly" as const },
  { path: "tienda", priority: 0.9, changeFreq: "daily" as const },
  { path: "productos", priority: 0.85, changeFreq: "daily" as const },
  { path: "sobrenosotros", priority: 0.7, changeFreq: "monthly" as const },
  { path: "devoluciones", priority: 0.3, changeFreq: "yearly" as const },
  { path: "terminos", priority: 0.3, changeFreq: "yearly" as const },
  { path: "privacidad", priority: 0.3, changeFreq: "yearly" as const },
];

// Guías y contenido educativo
const guidePages = [
  { path: "guias", priority: 0.8, changeFreq: "weekly" as const },
  { path: "guias/reparacion-iphone-buenos-aires", priority: 0.85, changeFreq: "monthly" as const },
  { path: "guias/microelectronica-reballing-caba", priority: 0.8, changeFreq: "monthly" as const },
  { path: "guias/soporte-empresas-servicio-tecnico", priority: 0.75, changeFreq: "monthly" as const },
  { path: "guias/mantenimiento-preventivo-celulares", priority: 0.75, changeFreq: "monthly" as const },
  { path: "guias/cambio-bateria-celular", priority: 0.75, changeFreq: "monthly" as const },
  { path: "guias/reparacion-pantalla-celular", priority: 0.75, changeFreq: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  
  // Fecha de última modificación dinámica (fecha actual de build)
  const lastMod = currentDate;
  const products = await getAllProductsForSitemap();
  const categoryMap = new Map<string, string>();

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

  const productEntries = products.map((product) => {
    if (product?.category?.name) {
      const slug = slugify(product.category.name);
      if (slug) {
        categoryMap.set(slug, product.category.name);
      }
    }

    const images = getAllProductImages(product)
      .filter((image) => image && !image.includes("placeholder"))
      .map((image) => toAbsoluteUrl(image));

    return {
      url: `${SITE_URL}/tienda/${buildProductSlug(product)}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: images.length ? images : undefined,
    };
  });

  const categoryEntries = Array.from(categoryMap.keys()).map((slug) => ({
    url: `${SITE_URL}/tienda/categoria/${slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...mainSitemap, ...guidesSitemap, ...categoryEntries, ...productEntries];
}

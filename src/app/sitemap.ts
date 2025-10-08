import { MetadataRoute } from "next";

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
  const lastModified = new Date().toISOString();

  return staticPages.map((path) => ({
    url: `${SITE_URL}/${path}`.replace(/\/$/, ""),
    changeFrequency: path === "" ? ("monthly" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path.startsWith("guias") ? 0.7 : 0.8,
    lastModified,
  }));
}
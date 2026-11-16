import { getProductWarranty, type Product } from "@/app/tienda/product";
import { etiquetaCondicion } from "./fixbeeCatalog";

export function buildProductSeoDescription(product: Product): string {
  const warranty = getProductWarranty(product);
  const delivery = product.shipping_enabled === false ? "Retiro en Recoleta." : "Retiro en Recoleta o envío.";
  const suffix = `${delivery} ${warranty.label}: ${warranty.value}.`;
  const intro = product.description?.split("\n")[0]?.split(/(?<=\.)\s/)[0]?.trim()
    || product.name.trim();
  const budget = 155 - suffix.length - 1;
  const cut = intro.slice(0, budget - 1);
  const summary = intro.length > budget ? `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length).replace(/[.,;:]$/, "")}…` : intro;
  return `${summary} ${suffix}`;
}

const PRODUCT_TITLE_LIMIT = 60;
const BRAND_SUFFIX = " | Team Celular";

/**
 * Título de la ficha para buscadores, en 60 caracteres o menos. Los nombres
 * del catálogo son largos y Google los cortaba a mitad de palabra: primero se
 * sacrifica el sufijo de marca y, si no alcanza, se corta en el último espacio.
 */
export function buildProductSeoTitle(name: string | null | undefined): string {
  const clean = (name ?? "").replace(/\s+/g, " ").trim() || "Producto";
  if (clean.length + BRAND_SUFFIX.length <= PRODUCT_TITLE_LIMIT) return `${clean}${BRAND_SUFFIX}`;
  if (clean.length <= PRODUCT_TITLE_LIMIT) return clean;
  const cut = clean.slice(0, PRODUCT_TITLE_LIMIT + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut.slice(0, PRODUCT_TITLE_LIMIT)).replace(/[\s,;:/-]+$/, "");
}

/** Solo datos publicados; sin deducir potencia, compatibilidad ni códigos. */
export function buildProductFacts(product: Product): [string, string][] {
  const warranty = getProductWarranty(product);
  return [
    ["Marca", product.brand?.name],
    ["Modelo", product.model],
    ["Condición", etiquetaCondicion(product.storeCondition)],
    ["GTIN", product.gtin],
    [warranty.label, warranty.value],
    ["Entrega", product.shipping_enabled === false ? "Solo retiro en Recoleta" : "Retiro en Recoleta o envío; opciones al comprar"],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));
}

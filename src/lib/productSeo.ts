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

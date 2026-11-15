/**
 * Los cambios de módulo Samsung se vendían como fichas de la tienda
 * (`cambio-modulo-samsung-a15-calidad-original-56`,
 * `cambio-de-modulo-display-a54-calidad-original-service-pack-75`) y salieron
 * con el catálogo de Fixbee. Search Console las sigue rastreando y daban 404.
 *
 * Solo se consulta cuando el catálogo ya dijo que el producto no existe.
 */
export const RETIRED_SAMSUNG_SCREEN_DESTINATION = "/guias/reparacion-samsung-buenos-aires";

const RETIRED_SAMSUNG_SCREEN_SLUG = /^(cambio-modulo-samsung-|cambio-de-modulo-display-[a-z]\d)/;

export function isRetiredSamsungScreenSlug(slug: string): boolean {
  return RETIRED_SAMSUNG_SCREEN_SLUG.test(String(slug ?? "").toLowerCase());
}

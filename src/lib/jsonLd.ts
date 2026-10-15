/** El contenido del catálogo no debe poder cerrar la etiqueta script. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

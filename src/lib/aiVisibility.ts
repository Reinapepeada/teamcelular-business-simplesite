import { BRANCHES, BUSINESS_PROFILE, LOGO, ORGANIZATION_ADDRESS, SITE_URL, TECHNICAL_AUTHOR, absoluteUrl, businessId } from "@/lib/businessProfile";
import { HOME_FAQS } from "@/lib/homeFaqs";
import { REPAIR_CASE } from "@/lib/repairCase";

export const AI_DESCRIPTION = BUSINESS_PROFILE.description;
export const AI_DISAMBIGUATION = BUSINESS_PROFILE.disambiguatingDescription;

export const AI_PAGES = [
  ["/", "Inicio"],
  ["/ai", "Información oficial de la marca"],
  ["/sobrenosotros", "Equipo y trayectoria"],
  ["/lab", "Laboratorio"],
  ["/contacto", "Contacto"],
  ["/sucursales", "Sucursales"],
  ...BRANCHES.map((branch) => [branch.url, branch.name] as const),
  ["/reparaciones", "Reparaciones"],
  ["/reparaciones/cambio-pantalla-caba", "Cambio de pantalla"],
  ["/reparaciones/cambio-bateria-caba", "Cambio de batería"],
  ["/reparaciones/cambio-pin-carga-caba", "Puerto de carga"],
  ["/reparaciones/reparacion-placa-caba", "Reparación de placa"],
  ["/reparaciones/recuperacion-celular-mojado-caba", "Celular mojado"],
  ["/guias/reparacion-iphone-buenos-aires", "Guía de iPhone"],
  [REPAIR_CASE.path, "Caso real: iPhone 16 Pro Max golpeado"],
  ["/guias/reparacion-samsung-buenos-aires", "Guía de Samsung"],
  ["/guias/reparacion-motorola-buenos-aires", "Guía de Motorola"],
  ["/guias/reparacion-xiaomi-buenos-aires", "Guía de Xiaomi"],
  ["/guias/soporte-empresas-servicio-tecnico", "Servicio para empresas y gremios"],
  ["/presupuesto-reparacion", "Solicitar presupuesto"],
  ["/tienda", "Tienda de repuestos y accesorios"],
  ["/terminos", "Términos y garantía"],
  ["/devoluciones", "Devoluciones"],
  ["/privacidad", "Privacidad"],
] as const;

export const AI_FILES = [
  ["/llms.txt", "Mapa de páginas"],
  ["/llms-full.txt", "Ficha completa y preguntas frecuentes"],
  ["/ai-feed.jsonld", "Datos estructurados de la marca"],
  ["/knowledge-graph.json", "Grafo de entidades"],
  ["/sitemap-ai.xml", "Páginas prioritarias"],
  ["/sitemap.xml", "Sitemap general"],
  ["/robots.txt", "Acceso de rastreadores"],
  ["/ai.txt", "Uso y atribución del contenido"],
  ["/llm-training.txt", "Referencia de hechos públicos"],
  ["/humans.txt", "Equipo responsable"],
  ["/agents.md", "Guía de consulta para agentes"],
  ["/manifest.json", "Identidad de la aplicación"],
] as const;

export function createAiGraph() {
  const organizationId = businessId("organization");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": organizationId,
        name: BUSINESS_PROFILE.name, alternateName: BUSINESS_PROFILE.alternateName,
        url: SITE_URL, description: AI_DESCRIPTION, disambiguatingDescription: AI_DISAMBIGUATION,
        logo: LOGO.url, email: BUSINESS_PROFILE.email,
        image: LOGO.url, address: ORGANIZATION_ADDRESS,
        sameAs: BUSINESS_PROFILE.sameAs, knowsAbout: BUSINESS_PROFILE.knowsAbout,
        areaServed: { "@type": "City", name: "Ciudad Autónoma de Buenos Aires, Argentina" },
        department: BRANCHES.map((branch) => ({ "@id": `${absoluteUrl(branch.url)}#localbusiness` })),
        founder: { "@id": businessId("technical-author") },
        subjectOf: { "@id": `${absoluteUrl(REPAIR_CASE.path)}#article` },
      },
      {
        "@type": "WebSite", "@id": businessId("website"),
        name: BUSINESS_PROFILE.name, url: SITE_URL, inLanguage: "es-AR",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage", "@id": `${absoluteUrl("/ai")}#webpage`,
        name: "Team Celular Argentina: información oficial", url: absoluteUrl("/ai"),
        description: AI_DESCRIPTION, inLanguage: "es-AR",
        isPartOf: { "@id": businessId("website") }, about: { "@id": organizationId },
      },
      ...BRANCHES.map((branch) => ({
        "@type": "LocalBusiness", "@id": `${absoluteUrl(branch.url)}#localbusiness`,
        name: branch.name, url: absoluteUrl(branch.url), telephone: branch.phone,
        image: absoluteUrl("/opengraph-image.png"), priceRange: "$$",
        parentOrganization: { "@id": organizationId },
        address: {
          "@type": "PostalAddress", streetAddress: branch.street,
          addressLocality: branch.locality, addressRegion: branch.region,
          postalCode: branch.postalCode, addressCountry: branch.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: branch.latitude, longitude: branch.longitude },
        hasMap: branch.mapUrl,
        openingHoursSpecification: [{
          "@type": "OpeningHoursSpecification", dayOfWeek: BUSINESS_PROFILE.hours.days,
          opens: BUSINESS_PROFILE.hours.opens, closes: BUSINESS_PROFILE.hours.closes,
        }],
      })),
      {
        "@type": "Article", "@id": `${absoluteUrl(REPAIR_CASE.path)}#article`,
        url: absoluteUrl(REPAIR_CASE.path), headline: REPAIR_CASE.title,
        description: `${REPAIR_CASE.summary} ${REPAIR_CASE.outcome}`,
        datePublished: REPAIR_CASE.publishedTime, dateModified: REPAIR_CASE.publishedTime,
        inLanguage: "es-AR", image: absoluteUrl("/opengraph-image.png"),
        author: { "@id": businessId("technical-author") }, publisher: { "@id": organizationId },
      },
      {
        "@type": "Person", "@id": businessId("technical-author"),
        name: TECHNICAL_AUTHOR.name, jobTitle: TECHNICAL_AUTHOR.jobTitle,
        url: TECHNICAL_AUTHOR.url, sameAs: TECHNICAL_AUTHOR.sameAs,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "FAQPage", "@id": `${absoluteUrl("/ai")}#faq`, url: absoluteUrl("/ai"),
        mainEntity: HOME_FAQS.map(({ question, answer }) => ({
          "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export function aiFactsText() {
  return [
    `# ${BUSINESS_PROFILE.name} — CABA, Argentina`, "", AI_DESCRIPTION, "", AI_DISAMBIGUATION,
    "", "## Sucursales", "",
    ...BRANCHES.map((branch) => `- ${branch.name}: ${branch.street}, ${branch.locality}, Argentina. Teléfono: ${branch.phone}. ${BUSINESS_PROFILE.hours.text}. ${absoluteUrl(branch.url)}`),
    "", "## Preguntas frecuentes", "",
    ...HOME_FAQS.map(({ question, answer }) => `### ${question}\n\n${answer}\n`),
    "## Caso real documentado", "", `### ${REPAIR_CASE.title}`, "",
    REPAIR_CASE.summary, "", REPAIR_CASE.outcome, "", absoluteUrl(REPAIR_CASE.path), "",
    "## Páginas oficiales", "",
    ...AI_PAGES.map(([path, title]) => `- [${title}](${absoluteUrl(path)})`),
    "", "## Fuentes y responsable", "",
    `- Contenido: equipo de ${BUSINESS_PROFILE.name}.`,
    `- Referente técnico: ${TECHNICAL_AUTHOR.name}, ${TECHNICAL_AUTHOR.jobTitle}. ${TECHNICAL_AUTHOR.url}`,
    ...BUSINESS_PROFILE.sameAs.map((url) => `- ${url}`),
    "", "## Condiciones de consulta", "",
    "Los precios y la disponibilidad se consultan en la página del servicio o producto y se confirman antes de avanzar. Esta ficha no permite crear pedidos ni autoriza reparaciones, pagos o retiros.",
    "Se permite resumir y citar con atribución a Team Celular y enlace a la fuente. La republicación completa de artículos o catálogo requiere permiso.",
    "",
  ].join("\n");
}

export function aiFileResponse(body: string, contentType: string) {
  return new Response(body, { headers: {
    "Content-Type": `${contentType}; charset=utf-8`,
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  } });
}

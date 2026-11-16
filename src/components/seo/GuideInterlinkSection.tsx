import TrackedCtaLink from "@/components/cro/TrackedCtaLink";

type GuidePath =
  | "/guias/cambio-bateria-celular"
  | "/guias/mantenimiento-preventivo-celulares"
  | "/guias/reparacion-iphone-buenos-aires"
  | "/guias/reparacion-motorola-buenos-aires"
  | "/guias/reparacion-pantalla-celular"
  | "/guias/reparacion-samsung-buenos-aires"
  | "/guias/reparacion-xiaomi-buenos-aires"
  | "/guias/soporte-empresas-servicio-tecnico";

/** Destino: incluye guías que no tienen bloque propio de interlinks. */
type GuideTarget =
  | GuidePath
  | "/guias/presupuesto-service-oficial-segunda-opinion"
  | "/reparaciones/reparacion-placa-caba";

interface RelatedGuide {
  href: GuideTarget;
  title: string;
  description: string;
}

interface GuideInterlinkConfig {
  guidance: string;
  links: [RelatedGuide, RelatedGuide, RelatedGuide];
}

const GUIDE_INTERLINKS: Record<GuidePath, GuideInterlinkConfig> = {
  "/guias/cambio-bateria-celular": {
    guidance:
      "Si tu equipo calienta o ya no rinde, conviene validar pantalla, carga y mantenimiento antes de cambiar piezas sin diagnóstico.",
    links: [
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Guía de cambio de pantalla",
        description:
          "Aprende cuando conviene reemplazar módulo y que revisar para evitar fallas repetidas.",
      },
      {
        href: "/guias/mantenimiento-preventivo-celulares",
        title: "Mantenimiento preventivo",
        description:
          "Checklist para extender autonomía, estabilidad y vida útil del equipo.",
      },
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparación de iPhone",
        description:
          "Proceso técnico premium para batería, carga y placa en equipos Apple.",
      },
    ],
  },
  "/guias/mantenimiento-preventivo-celulares": {
    guidance:
      "Cuando detectas síntomas tempranos, una guía por falla te ayuda a decidir si necesitas mantenimiento o reparación puntual.",
    links: [
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de batería",
        description:
          "Señales reales de batería degradada y pasos para un reemplazo seguro.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Reparación de pantalla",
        description:
          "Que validar antes de cambiar display y como cuidar el módulo nuevo.",
      },
      {
        href: "/guias/soporte-empresas-servicio-tecnico",
        title: "Soporte para empresas",
        description:
          "Planifica mantenimiento por flota con SLA y trazabilidad completa.",
      },
    ],
  },
  "/guias/reparacion-iphone-buenos-aires": {
    guidance:
      "Si aun comparas opciones, revisa otras marcas y una guía por falla para elegir repuesto y alcance de reparación con mejor contexto.",
    links: [
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparación de Samsung",
        description:
          "Síntomas típicos de Galaxy y tiempos de taller según tipo de falla.",
      },
      {
        href: "/guias/reparacion-motorola-buenos-aires",
        title: "Reparación de Motorola",
        description:
          "Guía para Moto G, Edge y E: pantalla, batería y pin de carga, con plazo confirmado según diagnóstico y stock.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Guía de cambio de pantalla",
        description:
          "Referencia transversal para decidir módulo y control de calidad final.",
      },
    ],
  },
  "/guias/reparacion-pantalla-celular": {
    guidance:
      "Una pantalla rota suele venir con otros síntomas. Estas guías te ayudan a revisar batería, mantenimiento y diagnóstico por marca.",
    links: [
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de batería de celular",
        description:
          "Una batería gastada puede apagar el equipo o bajar el rendimiento.",
      },
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparación de iPhone",
        description:
          "Proceso para conservar funciones delicadas como Face ID y calibraciones.",
      },
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparación de Samsung",
        description:
          "Casos AMOLED, USB-C y placa para equipos Galaxy con uso intensivo.",
      },
    ],
  },
  "/guias/reparacion-motorola-buenos-aires": {
    guidance:
      "Si estás comparando marcas o buscás referencia por componente, estas guías te dan contexto técnico para decidir con información real.",
    links: [
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparación de Samsung",
        description:
          "Fallas de Galaxy S, A y Z Fold con tiempos reales de taller.",
      },
      {
        href: "/guias/reparacion-xiaomi-buenos-aires",
        title: "Reparación de Xiaomi",
        description:
          "Diagnóstico de carga rápida, batería y placa en Redmi y POCO.",
      },
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de batería",
        description:
          "Ideal si notás pérdida de autonomía o inestabilidad térmica en Moto G.",
      },
    ],
  },
  "/guias/reparacion-samsung-buenos-aires": {
    guidance:
      "Para tomar una decisión completa, compara procesos entre marcas y revisa una guía por componente para alinear costo y resultado esperado.",
    links: [
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparación de iPhone",
        description:
          "Enfoque premium en Apple para diagnóstico, repuestos y calibración.",
      },
      {
        href: "/guias/reparacion-motorola-buenos-aires",
        title: "Reparación de Motorola",
        description:
          "Guía para Moto G, Edge y E con foco en pantalla, batería y pin de carga.",
      },
      {
        href: "/guias/presupuesto-service-oficial-segunda-opinion",
        title: "Segunda opinión al service oficial",
        description:
          "Qué hacer cuando el oficial presupuesta cambio de placa completa o declara el equipo sin reparación.",
      },
    ],
  },
  "/guias/reparacion-xiaomi-buenos-aires": {
    guidance:
      "Si estas comparando rendimiento por marca, estas lecturas te dan contexto técnico para decidir entre reparación puntual o cambio de componente.",
    links: [
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparación de iPhone",
        description:
          "Guía enfocada en trazabilidad y diagnóstico de hardware crítico.",
      },
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparación de Samsung",
        description:
          "Flujo técnico para Galaxy con foco en carga, pantalla y placa.",
      },
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de batería",
        description:
          "Ideal si notas pérdida de autonomía o inestabilidad térmica.",
      },
    ],
  },
  "/guias/soporte-empresas-servicio-tecnico": {
    guidance:
      "Para armar la política técnica, combina esta guía corporativa con mantenimiento, placa y fallas por componente.",
    links: [
      {
        href: "/reparaciones/reparacion-placa-caba",
        title: "Revisión de placa",
        description:
          "Precio de la revisión, plazos y condiciones para equipos que no prenden.",
      },
      {
        href: "/guias/mantenimiento-preventivo-celulares",
        title: "Mantenimiento preventivo",
        description:
          "Rutinas que reducen incidencias y mejoran la vida útil de la flota.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Reparación de pantallas",
        description:
          "Guía para estandarizar criterios de recambio en equipos de uso diario.",
      },
    ],
  },
};

function toGuideKey(path: GuideTarget) {
  return path.replace("/guias/", "").replaceAll("-", "_");
}

interface GuideInterlinkSectionProps {
  currentGuide: GuidePath;
}

export default function GuideInterlinkSection({
  currentGuide,
}: GuideInterlinkSectionProps) {
  const config = GUIDE_INTERLINKS[currentGuide];
  const guideKey = toGuideKey(currentGuide);

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-8 dark:border-white/10 dark:bg-slate-950/45">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Otras guías que te pueden servir
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {config.links.map((item) => (
          <TrackedCtaLink
            key={item.href}
            href={item.href}
            ctaName={`guide_related_${guideKey}_${toGuideKey(item.href)}`}
            ctaLocation="guide_article_interlink"
            ctaVariant="secondary"
            className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 dark:border-slate-700/70 dark:bg-slate-900/70"
          >
            <span className="block font-bold text-primary">{item.title}</span>
            <span className="mt-2 block text-sm text-slate-700 dark:text-slate-300">
              {item.description}
            </span>
          </TrackedCtaLink>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <TrackedCtaLink
          href="/presupuesto-reparacion#solicitar-presupuesto"
          ctaName={`guide_next_budget_${guideKey}`}
          ctaLocation="guide_article_interlink"
          ctaVariant="primary"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-white transition hover:bg-secondary/90"
        >
          Pedir diagnóstico y presupuesto
        </TrackedCtaLink>
        <TrackedCtaLink
          href="/tienda"
          ctaName={`guide_next_store_${guideKey}`}
          ctaLocation="guide_article_interlink"
          ctaVariant="secondary"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          Ver repuestos en tienda
        </TrackedCtaLink>
        <TrackedCtaLink
          href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20vengo%20de%20una%20guia%20y%20quiero%20asesoramiento"
          ctaName={`guide_next_whatsapp_${guideKey}`}
          ctaLocation="guide_article_interlink"
          ctaVariant="whatsapp"
          external
          target="_blank"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Hablar por WhatsApp
        </TrackedCtaLink>
      </div>
    </section>
  );
}
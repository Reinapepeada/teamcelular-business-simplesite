import TrackedCtaLink from "@/components/cro/TrackedCtaLink";

type GuidePath =
  | "/guias/cambio-bateria-celular"
  | "/guias/mantenimiento-preventivo-celulares"
  | "/guias/microelectronica-reballing-caba"
  | "/guias/reparacion-iphone-buenos-aires"
  | "/guias/reparacion-pantalla-celular"
  | "/guias/reparacion-samsung-buenos-aires"
  | "/guias/reparacion-xiaomi-buenos-aires"
  | "/guias/soporte-empresas-servicio-tecnico";

interface RelatedGuide {
  href: GuidePath;
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
      "Si tu equipo calienta o ya no rinde, conviene validar pantalla, carga y mantenimiento antes de cambiar piezas sin diagnostico.",
    links: [
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Guia de cambio de pantalla",
        description:
          "Aprende cuando conviene reemplazar modulo y que revisar para evitar fallas repetidas.",
      },
      {
        href: "/guias/mantenimiento-preventivo-celulares",
        title: "Mantenimiento preventivo",
        description:
          "Checklist para extender autonomia, estabilidad y vida util del equipo.",
      },
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparacion de iPhone",
        description:
          "Proceso tecnico premium para bateria, carga y placa en equipos Apple.",
      },
    ],
  },
  "/guias/mantenimiento-preventivo-celulares": {
    guidance:
      "Cuando detectas sintomas tempranos, una guia por falla te ayuda a decidir si necesitas mantenimiento o reparacion puntual.",
    links: [
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de bateria",
        description:
          "Senales reales de bateria degradada y pasos para un reemplazo seguro.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Reparacion de pantalla",
        description:
          "Que validar antes de cambiar display y como cuidar el modulo nuevo.",
      },
      {
        href: "/guias/soporte-empresas-servicio-tecnico",
        title: "Soporte para empresas",
        description:
          "Planifica mantenimiento por flota con SLA y trazabilidad completa.",
      },
    ],
  },
  "/guias/microelectronica-reballing-caba": {
    guidance:
      "Si tu equipo no enciende o reinicia, comparar guias por marca y soporte te permite estimar riesgo y tiempos antes de intervenir.",
    links: [
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Diagnostico avanzado iPhone",
        description:
          "Casos de placa, consumo inestable y recuperacion de funciones criticas.",
      },
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Diagnostico avanzado Samsung",
        description:
          "Fallas complejas en Galaxy S, A y Z con criterio de reparacion real.",
      },
      {
        href: "/guias/soporte-empresas-servicio-tecnico",
        title: "Escalar a soporte corporativo",
        description:
          "Para equipos de trabajo, convenios preventivos y gestion por ticket.",
      },
    ],
  },
  "/guias/reparacion-iphone-buenos-aires": {
    guidance:
      "Si aun comparas opciones, revisa otras marcas y una guia por falla para elegir repuesto y alcance de reparacion con mejor contexto.",
    links: [
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparacion de Samsung",
        description:
          "Sintomas tipicos de Galaxy y tiempos de taller segun tipo de falla.",
      },
      {
        href: "/guias/reparacion-xiaomi-buenos-aires",
        title: "Reparacion de Xiaomi",
        description:
          "Diagnostico de carga rapida, bateria y placa en Xiaomi, Redmi y POCO.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Guia de cambio de pantalla",
        description:
          "Referencia transversal para decidir modulo y control de calidad final.",
      },
    ],
  },
  "/guias/reparacion-pantalla-celular": {
    guidance:
      "Una pantalla rota suele venir con otros sintomas. Estas guias te ayudan a validar bateria, mantenimiento y diagnostico por marca.",
    links: [
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de bateria celular",
        description:
          "Detecta desgaste energetico que afecta brillo, rendimiento y estabilidad.",
      },
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparacion de iPhone",
        description:
          "Proceso para conservar funciones delicadas como Face ID y calibraciones.",
      },
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparacion de Samsung",
        description:
          "Casos AMOLED, USB-C y placa para equipos Galaxy con uso intensivo.",
      },
    ],
  },
  "/guias/reparacion-samsung-buenos-aires": {
    guidance:
      "Para tomar una decision completa, compara procesos entre marcas y revisa una guia por componente para alinear costo y resultado esperado.",
    links: [
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparacion de iPhone",
        description:
          "Enfoque premium en Apple para diagnostico, repuestos y calibracion.",
      },
      {
        href: "/guias/reparacion-xiaomi-buenos-aires",
        title: "Reparacion de Xiaomi",
        description:
          "Comparativo util si tambien evaluas Redmi o POCO en tu flota personal.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Guia de pantalla",
        description:
          "Criterios para elegir modulo y evitar reemplazos de baja duracion.",
      },
    ],
  },
  "/guias/reparacion-xiaomi-buenos-aires": {
    guidance:
      "Si estas comparando rendimiento por marca, estas lecturas te dan contexto tecnico para decidir entre reparacion puntual o cambio de componente.",
    links: [
      {
        href: "/guias/reparacion-iphone-buenos-aires",
        title: "Reparacion de iPhone",
        description:
          "Guia enfocada en trazabilidad y diagnostico de hardware critico.",
      },
      {
        href: "/guias/reparacion-samsung-buenos-aires",
        title: "Reparacion de Samsung",
        description:
          "Flujo tecnico para Galaxy con foco en carga, pantalla y placa.",
      },
      {
        href: "/guias/cambio-bateria-celular",
        title: "Cambio de bateria",
        description:
          "Ideal si notas perdida de autonomia o inestabilidad termica.",
      },
    ],
  },
  "/guias/soporte-empresas-servicio-tecnico": {
    guidance:
      "Para consolidar politica tecnica, combina esta guia corporativa con contenidos de microelectronica, mantenimiento y fallas por componente.",
    links: [
      {
        href: "/guias/microelectronica-reballing-caba",
        title: "Microelectronica y reballing",
        description:
          "Cobertura para casos complejos de placa en equipos criticos.",
      },
      {
        href: "/guias/mantenimiento-preventivo-celulares",
        title: "Mantenimiento preventivo",
        description:
          "Rutinas que reducen incidencias y mejoran la vida util de la flota.",
      },
      {
        href: "/guias/reparacion-pantalla-celular",
        title: "Reparacion de pantallas",
        description:
          "Guia para estandarizar criterios de recambio en equipos de uso diario.",
      },
    ],
  },
};

function toGuideKey(path: GuidePath) {
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
    <section className="space-y-5 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          Siguiente paso recomendado
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Profundiza tu decision con guias relacionadas
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">{config.guidance}</p>
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
          Pedir diagnostico y presupuesto
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
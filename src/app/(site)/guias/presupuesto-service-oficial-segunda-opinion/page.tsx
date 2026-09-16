import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/presupuesto-service-oficial-segunda-opinion";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Service Oficial vs Taller Independiente en CABA",
  description:
    "Service oficial vs taller independiente en CABA: costo, plazo, garantía y datos. Team Celular repara a nivel componente, diagnóstico el mismo día.",
  keywords: [
    "service oficial vs taller independiente",
    "conviene el service oficial celular",
    "presupuesto service oficial caro",
    "me dijeron que no tiene arreglo",
    "segunda opinion reparacion celular",
    "diferencia servicio oficial y taller",
    "reparacion placa samsung caba",
    "alternativa service oficial celular",
  ],
  openGraphTitle: "Service oficial vs taller independiente en CABA | Team Celular",
  openGraphDescription:
    "Costo, plazo, garantía y qué pasa con tus datos: la comparación antes de aceptar el presupuesto.",
  openGraphImagePath: "/images/guia_cambio_modulo.webp",
  openGraphImageAlt: "Reparación a nivel placa con microscopio en Team Celular",
  twitterTitle: "Service oficial vs taller independiente | Team Celular",
  twitterDescription:
    "Reparación a nivel componente cuando el service oficial cotiza el módulo o la placa completa.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const situations: GuideItem[] = [
  {
    title: "Te cotizaron el cambio de placa completa",
    description:
      "El service oficial trabaja por reemplazo de módulo: si falla un componente, se cambia la placa entera. A nivel microelectrónica muchas veces la falla es un integrado o una pista puntual.",
  },
  {
    title: "Te dijeron que no tiene reparación",
    description:
      "Suele significar que la falla queda fuera del procedimiento estándar de reemplazo, no que el equipo sea irrecuperable. Equipos mojados y fallas de encendido entran seguido en esta categoría.",
  },
  {
    title: "El presupuesto se acerca al valor del equipo",
    description:
      "Cuando reparar cuesta casi lo mismo que comprar otro, conviene saber si existe una reparación a nivel componente antes de decidir.",
  },
  {
    title: "El equipo ya está fuera de garantía",
    description:
      "Sin cobertura vigente desaparece la ventaja principal del canal oficial, y la decisión pasa a ser costo, plazo y quién puede resolver la falla concreta.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Lectura del diagnóstico que ya te dieron",
    description:
      "Si traés la orden o el presupuesto del oficial, arrancamos desde ahí: qué midieron, qué reemplazo proponen y a qué precio.",
  },
  {
    title: "Inspección con microscopio",
    description:
      "Revisamos la placa buscando corrosión, pistas cortadas, componentes en corto o soldaduras frías, que es donde el reemplazo por módulo no llega.",
  },
  {
    title: "Medición de consumo y líneas",
    description:
      "Verificamos consumo en frío, líneas de alimentación y señales clave para ubicar el componente responsable en vez de cambiar el conjunto.",
  },
  {
    title: "Respuesta clara sobre viabilidad",
    description:
      "Te decimos si tiene arreglo, con qué probabilidad y a qué costo. Cuando no conviene repararlo, lo decimos: no todo equipo se recupera.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Traés el equipo y el presupuesto previo",
    description:
      "No hace falta turno. Lunes a viernes de 10:30 a 18:00 en Paraguay 2451 (Recoleta) o Amenábar 2032 (Belgrano).",
  },
  {
    title: "Diagnóstico el mismo día",
    description:
      "En la mayoría de los casos el diagnóstico queda dentro del día hábil, con orden técnica escrita de lo que ingresó y en qué estado.",
  },
  {
    title: "Presupuesto antes de intervenir",
    description:
      "Te pasamos el número y el plazo antes de tocar el equipo. Si decidís no avanzar, te lo devolvemos como entró.",
  },
  {
    title: "Reparación a nivel componente",
    description:
      "Reballing BGA, soldadura SMD y recuperación por líquido con instrumental de laboratorio. La garantía escrita de 90 días cubre trabajo y repuesto.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Qué diferencia hay con el servicio oficial de la marca?",
    answer:
      "Team Celular es un laboratorio independiente con más de 10 años en microelectrónica. El canal oficial trabaja por reemplazo: ante una falla de placa, cotiza la placa completa. Acá se repara el componente que falló, que es una fracción de ese costo.",
  },
  {
    question: "¿Pierdo la garantía del fabricante si reparo con ustedes?",
    answer:
      "Si el equipo todavía tiene garantía vigente del fabricante, una intervención fuera del canal oficial normalmente la anula. Si estás dentro de garantía, te vamos a recomendar que uses el canal oficial primero. Este camino tiene sentido cuando la garantía ya venció o cuando el oficial no cubre la falla.",
  },
  {
    question: "¿Por qué el presupuesto oficial suele ser más alto?",
    answer:
      "Porque cotiza el reemplazo del conjunto completo: placa, módulo o pieza entera. Reparar el componente que falló mueve una fracción de ese costo, aunque exige más tiempo de banco y equipamiento.",
  },
  {
    question: "¿Qué pasa si el equipo no tiene arreglo?",
    answer:
      "Te lo decimos derecho y no cobramos una reparación que no se puede hacer. En equipos con daño extendido por líquido o placa muy comprometida la recuperación puede ser parcial: a veces se rescatan los datos aunque el equipo no vuelva a funcionar.",
  },
  {
    question: "¿Reparan lo que el oficial declaró irreparable?",
    answer:
      "Es una parte importante de lo que entra al laboratorio: clientes que ya pasaron por el diagnóstico oficial de Samsung o Apple y llegan con el equipo declarado sin reparación o con un presupuesto de placa completa.",
  },
];

// Comparativa oficial vs independiente. Tabla y no prosa: es lo que extraen los
// motores de IA para "conviene el service oficial". Sin precios de terceros:
// las marcas no publican tarifario en Argentina y no se inventa un numero.
const comparison: { criterion: string; official: string; independent: string }[] = [
  {
    criterion: "Nivel de reparación",
    official: "Reemplazo de conjunto: módulo, placa o pieza completa",
    independent: "Nivel componente: reballing BGA, soldadura SMD, reconstrucción de pistas",
  },
  {
    criterion: "Qué pasa con la garantía de fábrica",
    official: "Se mantiene intacta",
    independent: "Abrir el equipo fuera del canal oficial la anula",
  },
  {
    criterion: "Garantía sobre la reparación",
    official: "Según la política vigente de cada marca",
    independent: "90 días por escrito sobre trabajo y repuesto",
  },
  {
    criterion: "Plazo típico",
    official: "Depende del centro y del stock; suele implicar envío del equipo",
    independent: "Diagnóstico el mismo día; pantalla y batería en 2 a 4 horas",
  },
  {
    criterion: "Cuando la falla sale del procedimiento estándar",
    official: "Puede informarse como equipo sin reparación",
    independent: "Se evalúa la placa con microscopio antes de descartarla",
  },
  {
    criterion: "Repuesto",
    official: "Pieza de fábrica, con trazabilidad de la marca",
    independent: "Original, OEM o alternativo; se informa cuál va antes de avanzar",
  },
  {
    criterion: "Dónde se hace el trabajo",
    official: "Centro autorizado, sin contacto con el técnico",
    independent: "Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano), atención directa",
  },
];

function OfficialVsIndependentTable() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
        Service oficial vs taller independiente: ¿qué cambia?
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
        El canal oficial reemplaza conjuntos completos y conserva la garantía de
        fábrica. Un laboratorio independiente como Team Celular repara el
        componente que falló, a una fracción de ese costo, pero abrir el equipo
        anula la cobertura del fabricante. Con garantía vigente conviene el
        oficial; vencida o con la falla rechazada, la reparación a nivel placa
        es la que resuelve.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparación entre el servicio técnico oficial y Team Celular,
            laboratorio independiente en CABA
          </caption>
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-700">
              <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">
                Criterio
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">
                Service oficial de la marca
              </th>
              <th scope="col" className="py-3 font-semibold text-slate-900 dark:text-white">
                Team Celular (independiente)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {comparison.map((row) => (
              <tr key={row.criterion}>
                <th
                  scope="row"
                  className="py-3 pr-4 text-left font-semibold text-slate-900 dark:text-white"
                >
                  {row.criterion}
                </th>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  {row.official}
                </td>
                <td className="py-3 text-slate-700 dark:text-slate-200">
                  {row.independent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
        Team Celular es un laboratorio independiente, no un centro autorizado de
        Apple ni de Samsung. La columna del canal oficial describe el modelo de
        trabajo por reemplazo de conjunto, no la política puntual de una marca:
        plazos, cobertura y precios los define cada fabricante y conviene
        confirmarlos en su sitio. Comparación actualizada el 3 de septiembre de
        2026.
      </p>
    </section>
  );
}

const relatedLinks: GuideRelatedLink[] = [
  { href: "/guias/microelectronica-reballing-caba", label: "Microelectrónica y reballing BGA" },
  { href: "/reparaciones/reparacion-placa-caba", label: "Reparación de placa en CABA" },
  { href: "/guias/reparacion-samsung-buenos-aires", label: "Guía de reparación Samsung" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
];

export default function SecondOpinionGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Service oficial vs taller independiente"
      title="Service oficial vs taller independiente en CABA"
      heroDescription="El service oficial repara por reemplazo de conjunto y conserva la garantía de fábrica; un taller independiente repara el componente que falló, más barato y más rápido, pero al abrir el equipo esa garantía se pierde. Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), trabaja a nivel placa: diagnóstico el mismo día y garantía escrita de 90 días."
      badge="Comparativa antes de decidir"
      readingTime="6 min"
      publishedTime="2026-08-12T00:00:00Z"
      modifiedTime="2026-09-03T00:00:00Z"
      imagePath="/images/guia_cambio_modulo.webp"
      heroPoints={[
        "Con garantía de fábrica vigente, el canal oficial primero.",
        "Vencida o con la falla rechazada, se repara el componente.",
        "Traé el presupuesto previo: arrancamos desde ese diagnóstico.",
        "Si no tiene arreglo, te lo decimos antes de cobrarte nada.",
      ]}
      symptomsTitle="¿Cuándo conviene pedir una segunda opinión?"
      symptomsDescription="Estas son las situaciones con las que más llegan los clientes que ya pasaron por el service oficial."
      symptoms={situations}
      diagnosisTitle="¿Qué revisamos que el reemplazo por módulo no mira?"
      diagnosisDescription="La diferencia está en el nivel de análisis: componente contra conjunto completo."
      diagnostics={diagnostics}
      planTitle="¿Cómo es el proceso paso a paso?"
      planDescription="Sin turno, con orden técnica escrita y presupuesto cerrado antes de intervenir."
      planSteps={planSteps}
      priceTable={<OfficialVsIndependentTable />}
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, tengo un presupuesto del service oficial y quiero una segunda opinión. Marca y modelo:"
    />
  );
}

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
  title: "Segunda Opinión al Presupuesto del Service Oficial | Team Celular",
  description:
    "¿Te dijeron que no tiene arreglo o te cotizaron la placa entera? Team Celular, Recoleta y Belgrano, repara a nivel componente. Diagnóstico el mismo día.",
  keywords: [
    "presupuesto service oficial caro",
    "me dijeron que no tiene arreglo",
    "segunda opinion reparacion celular",
    "reparacion placa samsung caba",
    "alternativa service oficial celular",
  ],
  openGraphTitle: "Segunda opinión al presupuesto del service oficial | Team Celular",
  openGraphDescription:
    "Qué revisar antes de aceptar un cambio de placa completo o dar el equipo por perdido.",
  openGraphImagePath: "/images/guia_cambio_modulo.webp",
  openGraphImageAlt: "Reparación a nivel placa con microscopio en Team Celular",
  twitterTitle: "Segunda opinión al presupuesto oficial | Team Celular",
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
      pageLabel="Segunda opinión al presupuesto oficial"
      title="Segunda opinión cuando el service oficial presupuestó de más"
      heroDescription="Team Celular, en Paraguay 2451 Recoleta y Amenábar 2032 Belgrano (CABA), repara a nivel componente equipos que el servicio oficial presupuestó como cambio de placa completa o declaró sin reparación. El diagnóstico se hace el mismo día y sale con garantía escrita de 90 días."
      badge="Antes de aceptar el presupuesto"
      readingTime="6 min"
      publishedTime="2026-08-12T00:00:00Z"
      modifiedTime="2026-08-12T00:00:00Z"
      imagePath="/images/guia_cambio_modulo.webp"
      heroPoints={[
        "El canal oficial reemplaza conjuntos; nosotros reparamos el componente.",
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
      faq={faq}
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, tengo un presupuesto del service oficial y quiero una segunda opinión. Marca y modelo:"
    />
  );
}

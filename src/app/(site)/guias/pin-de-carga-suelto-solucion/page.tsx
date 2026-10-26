import type { Metadata } from "next";
import HighIntentGuidePage, {
  type GuideFaqItem,
  type GuideItem,
  type GuideRelatedLink,
} from "@/components/seo/HighIntentGuidePage";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import Link from "next/link";
import RepairPriceInquiry from "@/components/repairs/RepairPriceInquiry";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import { CHARGING_PORT_PRICE, PLACA_REVISION_PRICE, PRICES_UPDATED_LABEL, formatArsPrice } from "@/lib/repairPrices";

// SXO 2026-09: "cuanto sale cambiar el pin de carga" llegaba aca sin precio visible.
const PORT_FROM = formatArsPrice(CHARGING_PORT_PRICE.from);
const PORT_TO = formatArsPrice(CHARGING_PORT_PRICE.to);
const PLACA_REVISION = formatArsPrice(PLACA_REVISION_PRICE);

const SITE_URL = getSiteUrl();
const PAGE_PATH = "/guias/pin-de-carga-suelto-solucion";

export const metadata: Metadata = buildWebsiteMetadata({
  path: PAGE_PATH,
  title: "Pin de Carga Suelto: Síntomas y Precio en CABA",
  description:
    `Cambio de pin de carga de ${PORT_FROM} a ${PORT_TO}, según modelo. Identificá la falla y consultá precio en Recoleta o Belgrano, CABA.`,
  keywords: [
    "pin de carga suelto",
    "como saber si se daño el pin de carga",
    "celular no carga bien",
    "cambio pin de carga caba",
    "reparacion puerto usb celular",
  ],
  openGraphTitle: "Pin de Carga Suelto: Síntomas y Precio en CABA",
  openGraphDescription:
    `Pin de carga: de ${PORT_FROM} a ${PORT_TO}, según modelo. Consultá precio y disponibilidad en Recoleta o Belgrano.`,
  openGraphImagePath: "/images/reparacion_placa.webp",
  openGraphImageAlt: "Diagnóstico de pin de carga en Team Celular",
  twitterTitle: "Pin de Carga Suelto: Cómo Saber si Está Dañado | Team Celular",
  twitterDescription:
    "Señales claras de pin de carga dañado y qué hacer en cada caso.",
  languages: {
    "es-AR": PAGE_PATH,
  },
});

const symptoms: GuideItem[] = [
  {
    title: "Carga solo si sostenés el cable",
    description:
      "Si el cable tiene que quedar en una posición exacta, suele haber desgaste en el conector o juego en el pin.",
  },
  {
    title: "Conector flojo o inestable",
    description:
      "El enchufe entra fácil pero se mueve para los costados. Indica un puerto deformado o pelusa compactada al fondo.",
  },
  {
    title: "No activa la carga rápida",
    description:
      "La carga lenta no confirma una falla del flex. Primero hay que revisar que el cable y el cargador sean compatibles y, en los modelos que lo permiten, que la carga rápida esté activada.",
  },
  {
    title: "Aviso de humedad o accesorio no compatible",
    description:
      "Un aviso de humedad en Samsung o de accesorio incompatible en iPhone no confirma un pin dañado. También hay que revisar el cable y el cargador. Ante humedad, desconectá el cable y no cargues por ese puerto hasta que esté seco.",
  },
];

const diagnostics: GuideItem[] = [
  {
    title: "Inspección con microscopio",
    description:
      "Revisamos pines, pistas y soldaduras para separar suciedad de daño real.",
  },
  {
    title: "Prueba cruzada de cable y cargador",
    description:
      "Descartamos accesorios defectuosos antes de abrir el equipo o cambiar piezas.",
  },
  {
    title: "Test eléctrico de continuidad",
    description:
      "Medimos si el puerto transmite energía y datos de forma estable o si hay un corte interno.",
  },
  {
    title: "Control de consumo en placa",
    description:
      "Si el puerto está bien, medimos el consumo para ver si la falla ya llegó a la placa.",
  },
];

const planSteps: GuideItem[] = [
  {
    title: "Limpieza técnica",
    description:
      "Si el conector está sano y hay residuos, lo limpiamos con microscopio sin forzar ni doblar los pines. No conviene hacerlo en casa: es fácil dañar el conector.",
  },
  {
    title: "Cambio de pin o flex",
    description:
      "Cuando hay juego mecánico o cortes internos, cambiamos el pin o el flex de carga.",
  },
  {
    title: "Microsoldadura en placa",
    description:
      "Si requiere revisión de placa, el informe se entrega en hasta 72 horas hábiles. El arreglo lleva semanas y se confirma precio y plazo por escrito antes de empezar.",
  },
  {
    title: "Pruebas finales",
    description:
      "Verificamos carga continua, carga rápida y uso real antes de entregar el equipo.",
  },
];

const faq: GuideFaqItem[] = [
  {
    question: "¿Cuánto sale cambiar el pin de carga?",
    answer: `El cambio de pin de carga va de ${PORT_FROM} a ${PORT_TO}, según el modelo y la pieza que haya que cambiar. La limpieza técnica y las fallas de placa se cotizan aparte: ese rango corresponde al cambio de pin o flex. Pasanos marca, modelo y qué falla para confirmar el precio antes de reparar.`,
  },
  {
    question: "¿Cómo cargar un celular con el pin de carga dañado?",
    answer:
      "No fuerces el cable ni lo mantengas presionado para que cargue. La carga inalámbrica puede ser una alternativa temporal solo si tu modelo la admite y el equipo no se mojó, no tiene la batería hinchada ni se calienta de forma anormal. Si no admite carga inalámbrica, apagalo para conservar la batería y traelo a revisar. Ante humedad o daño de batería, no intentes cargarlo. Si todavía enciende y está en condiciones de uso, respaldá tus datos por WiFi.",
  },
  {
    question: "¿Cómo saber si se dañó el pin de carga del celular?",
    answer:
      "Que cargue solo en cierta posición, tenga juego o no conecte con la computadora puede indicar un problema de cable o puerto. La carga lenta y los avisos de humedad o accesorio incompatible tampoco confirman un pin dañado. Primero descartamos cable, cargador y suciedad; después revisamos el conector y el flex. Si aparece humedad, desconectá el cable.",
  },
  {
    question: "¿Es el pin de carga, el cable o la batería?",
    answer:
      "Si con otro cable y otro cargador carga normal, era el accesorio. Si carga pero el porcentaje baja muy rápido, suele ser la batería. Si el cable se desconecta o solo carga en cierto ángulo, puede ser el puerto: lo confirmamos antes de cambiar la pieza.",
  },
  {
    question: "¿Conviene limpiar o cambiar el pin de carga?",
    answer:
      "Si hay suciedad compactada y el conector está sano, la limpieza técnica suele resolverlo. Si hay juego mecánico, cortes o un pin doblado, conviene cambiarlo.",
  },
  {
    question: "¿Puedo limpiar el pin de carga en casa?",
    answer:
      "No lo recomendamos. Con agujas, clips o cepillos es fácil doblar o romper los pines del conector, y una limpieza que se resolvía en minutos termina en un cambio de pin. Traelo y lo limpiamos con microscopio, sin forzar el puerto.",
  },
  {
    question: "¿Usar el celular así puede empeorar la falla?",
    answer:
      "Sí. Forzar el cable en mala posición puede dañar pistas internas y pasar de una reparación simple a una intervención de placa.",
  },
  {
    question: "¿Cuánto tarda el diagnóstico?",
    answer:
      `El plazo depende de la falla: primero descartamos cable, cargador y suciedad. Si hace falta revisión de placa, cuesta ${PLACA_REVISION} y el informe se entrega en hasta 72 horas hábiles. El arreglo de placa lleva semanas, se presupuesta aparte y descontamos la revisión si aceptás repararlo.`,
  },
];

const relatedLinks: GuideRelatedLink[] = [
  { href: "https://support.apple.com/es-es/108805", label: "Apple: si el iPhone no se carga" },
  { href: "https://www.samsung.com/ar/support/mobile-devices/issues-with-wireless-charging/", label: "Samsung: compatibilidad y problemas de carga inalámbrica" },
  { href: "https://www.samsung.com/ar/support/mobile-devices/issues-with-wired-charging/", label: "Samsung: cable, carga rápida y aviso de humedad" },
  { href: "/reparaciones/cambio-pin-carga-caba", label: "Precio del cambio de pin de carga" },
  { href: "/guias/celular-mojado-que-hacer", label: "Celular mojado: primeros pasos" },
  { href: "/guias/cambio-bateria-celular", label: "Guía de batería" },
  { href: "/presupuesto-reparacion#solicitar-presupuesto", label: "Pedir presupuesto" },
];

export default function ChargingPortGuidePage() {
  return (
    <HighIntentGuidePage
      siteUrl={SITE_URL}
      pagePath={PAGE_PATH}
      pageLabel="Pin de carga suelto"
      title="Pin de carga suelto: síntomas y cuánto sale cambiarlo"
      heroDescription={`El cambio de pin o flex de carga va de ${PORT_FROM} a ${PORT_TO}, según modelo. Si solo carga al mover el cable, el conector queda flojo o se desconecta, revisamos si necesita limpieza, cambio de pieza o diagnóstico de placa. Te atendemos sin turno en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032).`}
      badge="Falla frecuente"
      readingTime="5 min"
      publishedTime="2026-04-16T00:00:00Z"
      modifiedTime="2026-10-15T00:00:00Z"
      imagePath="/images/reparacion_placa.webp"
      heroPoints={[
        "Confirmamos precio antes de reparar.",
        "Descartamos cable y suciedad antes de cambiar piezas.",
        "Garantía escrita de 90 días sobre trabajo y repuesto.",
      ]}
      heroActions={<RepairPriceInquiry
        repair="revisar el pin de carga de mi celular"
        symptoms={["Carga al mover el cable", "Conector flojo", "No carga", "Carga lento", "Aviso de humedad"]}
        ctaName="pin_guide_price_whatsapp"
        ctaLocation="pin_guide_hero"
      />}
      symptomsTitle="¿Cuáles son las señales de un pin de carga dañado?"
      symptomsDescription="Suelen aparecer antes de que el equipo deje de cargar por completo."
      symptoms={symptoms}
      diagnosisTitle="¿Cómo lo diagnosticamos en el laboratorio?"
      diagnosisDescription="Separar el origen real evita cambiar piezas que no hacían falta."
      diagnostics={diagnostics}
      planTitle="¿Qué reparación corresponde en cada caso?"
      planDescription="Siempre vamos de lo simple a lo complejo, según el daño."
      planSteps={planSteps}
      faq={faq}
      priceTable={
        <section id="precios-pin-carga" className="scroll-mt-24 space-y-5 rounded-[28px] bg-[#1d1d1f] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Precio del cambio de pin de carga en CABA</h2>
          <p className="text-3xl font-semibold text-white tabular-nums">{PORT_FROM} a {PORT_TO}</p>
          <p className="max-w-3xl leading-7 text-[#a1a1a6]">El rango corresponde al cambio de pin o flex, según dispositivo. Si alcanza con limpiar el conector o la falla está en la placa, cotizamos ese trabajo antes de avanzar. La revisión técnica va de $15.000 a $25.000. Si requiere revisión de placa, cuesta {PLACA_REVISION}, con informe en hasta 72 horas hábiles. Informamos el costo antes de abrir el equipo y se descuenta si aceptás la reparación. El arreglo de placa lleva semanas y se presupuesta por separado.</p>
          <p className="text-sm text-[#86868b]">Precios publicados el {PRICES_UPDATED_LABEL}. Confirmamos pieza, stock y plazo para tu modelo.</p>
          <div className="flex flex-wrap gap-4">
            <BranchWhatsAppButton ctaName="pin_guide_prices_whatsapp" ctaLocation="pin_guide_prices" message="Hola Team Celular, vi el rango de cambio de pin de carga y quiero confirmar el precio para mi equipo." className="tc-btn tc-btn-primary">Confirmar precio de mi pin de carga</BranchWhatsAppButton>
            <Link href="/reparaciones/cambio-pin-carga-caba" className="tc-link inline-flex min-h-11 items-center">Ver el servicio de cambio de pin de carga</Link>
          </div>
        </section>
      }
      priceTablePosition="after-hero"
      relatedLinks={relatedLinks}
      whatsappText="Hola Team Celular, vi la guía de pin de carga y quiero un diagnóstico para mi equipo"
    />
  );
}

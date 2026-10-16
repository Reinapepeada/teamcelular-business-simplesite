import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import { ComparisonTable } from "@/components/seo/ComparisonGuidePage";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GuideInterlinkSection from "@/components/seo/GuideInterlinkSection";
import { REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import GuideByline from "@/components/seo/GuideByline";
import RepairPriceTable from "@/components/seo/RepairPriceTable";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import RepairPriceInquiry from "@/components/repairs/RepairPriceInquiry";
import { BRAND_REPAIR_PRICES, PRICES_UPDATED_LABEL, formatArsPrice } from "@/lib/repairPrices";
import { IPHONE_MODELS, IPHONE_MODELS_WITH_PAGE, IPHONE_PRICES_UPDATED } from "@/app/(site)/reparaciones/iphone/iphoneModels";
import {
  FaMobileAlt,
  FaTools,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaFingerprint,
  FaApple,
  FaAndroid,
  FaChartLine,
} from "react-icons/fa";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

// SXO 2026-09: la guia recibia busquedas de compra ("cambio de pantalla") sin
// mostrar un precio y convertia 0%. Solo pantallas de marcas con precio cargado.
const SCREEN_PRICE_GROUPS = [
  ...Object.entries(BRAND_REPAIR_PRICES).map(([brand, prices]) => ({
    id: brand,
    brand: `${brand[0].toUpperCase()}${brand.slice(1)}`,
    href: `/guias/reparacion-${brand}-buenos-aires`,
    updatedLabel: PRICES_UPDATED_LABEL,
    title: `Pantallas ${brand[0].toUpperCase()}${brand.slice(1)}: precios por familia`,
    prices: prices.filter((p) => p.name.startsWith("Cambio de pantalla")).map((p) => ({
      ...p,
      href: `/guias/reparacion-${brand}-buenos-aires`,
    })),
  })),
  {
    id: "iphone",
    brand: "iPhone",
    href: "/guias/reparacion-iphone-buenos-aires",
    updatedLabel: IPHONE_PRICES_UPDATED,
    title: "Pantallas iPhone: precio por modelo",
    prices: IPHONE_MODELS.flatMap((model) => model.screen === null ? [] : [{
      name: model.name,
      from: model.screen,
      to: model.screen,
      href: IPHONE_MODELS_WITH_PAGE.some((slug) => slug === model.slug)
        ? `/reparaciones/iphone/${model.slug}`
        : undefined,
    }]),
  },
];
const SCREEN_FROM = formatArsPrice(Math.min(...SCREEN_PRICE_GROUPS.flatMap((group) => group.prices.map((price) => price.from))));

export const metadata: Metadata = {
  title: "Cambio de Pantalla de Celular: Precios por Marca en CABA",
  description:
    `Cambio de pantalla desde ${SCREEN_FROM}, según modelo y repuesto. Compará precios por marca y consultá stock por WhatsApp en Recoleta o Belgrano.`,
  keywords: [
    "cambio pantalla celular Buenos Aires",
    "pantalla iPhone original",
    "pantalla original vs Soft OLED vs InCell",
    "display Samsung OLED",
    "reparación pantalla CABA",
    "cambio modulo display",
    "pantalla celular garantía",
    "True Tone iPhone",
    "cambio pantalla express",
  ],
  authors: [{ name: "Team Celular" }],
  creator: "Team Celular",
  publisher: "Team Celular",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Cambio de Pantalla de Celular: Precios por Marca en CABA",
    description:
      `Precios por marca desde ${SCREEN_FROM}, según modelo y repuesto. Confirmá precio y stock en Recoleta o Belgrano.`,
    type: "article",
    locale: "es_AR",
    url: "https://teamcelular.com/guias/reparacion-pantalla-celular",
    siteName: "Team Celular",
    images: [
      {
        url: "https://teamcelular.com/images/guia_cambio_modulo.webp",
        width: 1200,
        height: 630,
        alt: "Cambio de pantalla de celular en Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambio de Pantalla Celular Buenos Aires",
    description: `Precios por marca desde ${SCREEN_FROM}. Consultá modelo, repuesto y stock por WhatsApp.`,
    images: ["https://teamcelular.com/images/guia_cambio_modulo.webp"],
  },
  // Se canonicalizo hacia /reparaciones/cambio-pantalla-caba y se revirtio:
  // GSC muestra 14% de solapamiento de queries entre ambas (12 de 86). Esta
  // guia atiende intencion informativa ("cuanto demora un cambio de pantalla",
  // "cuantas veces se puede cambiar") y la pagina de servicio, transaccional.
  // Ademas rinde mas: 1524 impresiones y 7 clicks en 13 dias contra 233 y 10.
  alternates: {
    canonical: `${SITE_URL}/guias/reparacion-pantalla-celular`,
  },
};

const damageTypes = [
  {
    title: "Pantalla rota o quebrada",
    description: "Vidrio frontal con grietas, astillas o completamente destrozado. El touch puede funcionar o no.",
    Icon: FaExclamationTriangle,
    severity: "Media-Alta",
    urgency: "Reparar pronto para evitar cortes",
  },
  {
    title: "Touch no responde",
    description: "La pantalla se ve bien pero no responde al tacto, responde parcialmente o tiene zonas muertas.",
    Icon: FaFingerprint,
    severity: "Alta",
    urgency: "Reparación urgente",
  },
  {
    title: "Manchas o líneas en display",
    description: "Manchas negras, líneas verticales/horizontales, pixeles muertos o colores distorsionados.",
    Icon: FaEye,
    severity: "Media",
    urgency: "Puede empeorar con el tiempo",
  },
  {
    title: "Pantalla negra (no enciende)",
    description: "El celular funciona (suena, vibra) pero la pantalla permanece negra o muy tenue.",
    Icon: FaMobileAlt,
    severity: "Crítica",
    urgency: "Reparación inmediata",
  },
  {
    title: "Pantalla despegada o levantada",
    description: "El display se separa del marco, puede ser por golpe, batería hinchada o adhesivo deteriorado.",
    Icon: FaExclamationTriangle,
    severity: "Alta",
    urgency: "Riesgo de daño mayor",
  },
  {
    title: "Brillo bajo o parpadeo",
    description: "Brillo muy bajo incluso al máximo, parpadeo constante o backlight intermitente.",
    Icon: FaEye,
    severity: "Media",
    urgency: "Puede ser pantalla o placa",
  },
];

const replacementProcess = [
  {
    step: "1. Diagnóstico completo",
    detail: "Verificamos que el problema sea realmente la pantalla y no la placa lógica. Probamos touch, Face ID/Touch ID, sensores de proximidad y cámaras. Fotografiamos el estado inicial.",
    duration: "15-20 min",
    Icon: FaTools,
  },
  {
    step: "2. Desmontaje profesional",
    detail: "Abrimos el equipo con herramientas especializadas, desconectamos batería por seguridad, removemos pantalla dañada y verificamos estado de conectores flex.",
    duration: "20-30 min",
    Icon: FaMobileAlt,
  },
  {
    step: "3. Transferencia de componentes",
    detail: "Según el modelo, conservamos o transferimos los componentes necesarios y revisamos el estado de los sensores originales. Te avisamos si el golpe dañó alguna función antes de avanzar.",
    duration: "15-25 min",
    Icon: FaFingerprint,
  },
  {
    step: "4. Instalación y calibración",
    detail: "Instalamos la pantalla, conectamos los flex y renovamos el adhesivo. La configuración o calibración depende del modelo y del repuesto; abrir el equipo no garantiza recuperar la resistencia al agua original.",
    duration: "20-30 min",
    Icon: FaCheckCircle,
  },
  {
    step: "5. Test de calidad",
    detail: "Probamos touch en todas las zonas, Face ID/Touch ID, sensores, brillo, colores, sellado y entregamos con garantía escrita.",
    duration: "15 min",
    Icon: FaShieldAlt,
  },
];

const quickAnswers = [
  {
    question: "¿Cuánto cuesta cambiar la pantalla de un celular?",
    answer: `Los precios publicados empiezan en ${SCREEN_FROM}. El importe depende de la marca, el modelo y el repuesto disponible. La tabla de esta guía muestra rangos por familia; por WhatsApp te confirmamos el precio para tu equipo, el stock y el plazo antes de avanzar.`,
  },
  {
    question: "¿Se puede cambiar la pantalla de un celular?",
    answer:
      "Sí. En casi todos los modelos actuales la pantalla se cambia sin tocar la placa, siempre que el golpe no haya dañado el conector ni el flex. En Team Celular (Paraguay 2451, Recoleta) lo confirmamos en el diagnóstico y el cambio sale en 2 a 4 horas si hay repuesto en stock.",
  },
  {
    question: "¿Cambio de pantalla y cambio de módulo es lo mismo?",
    answer:
      "En la mayoría de los celulares actuales, sí. El vidrio, el táctil y el display vienen pegados de fábrica en una sola pieza llamada módulo, así que cambiar la pantalla es cambiar el módulo completo. En Team Celular siempre cambiamos el módulo entero: separar solo el vidrio tiene riesgo de dañar el display y muchas veces cuesta casi lo mismo.",
  },
  {
    question: "¿Cuando se cambia la pantalla se borra todo?",
    answer:
      "No. Fotos, chats y apps están guardados en la memoria de la placa, no en la pantalla, y el cambio de módulo no toca la placa. Igual recomendamos hacer backup antes de traerlo, porque un equipo golpeado puede tener otra falla escondida.",
  },
  {
    question: "¿Cuántas veces se puede cambiar la pantalla de un celular?",
    answer:
      "No hay un límite fijo. Lo que se desgasta es el conector de la placa y el marco, y los revisamos bajo microscopio en cada cambio.",
  },
];

const faqScreen = [
  ...quickAnswers,
  {
    question: "¿Se pierde Face ID o Touch ID al cambiar la pantalla?",
    answer: "Depende del modelo, del repuesto y del estado de los sensores originales. Revisamos Face ID o Touch ID antes y después del cambio y te explicamos las funciones que se pueden conservar antes de aprobar el trabajo. Cambiar la pantalla no repara un sensor dañado por el golpe.",
  },
  {
    question: "¿Qué es True Tone y se puede mantener?",
    answer: "True Tone ajusta el color de la pantalla del iPhone según la luz ambiente. Su funcionamiento después del cambio depende del modelo, del repuesto y de la configuración o calibración necesaria. Te confirmamos las condiciones de la opción disponible para tu equipo.",
  },
  {
    question: "¿Cuánto tiempo tarda el cambio de pantalla?",
    answer: "De 2 a 4 horas si el repuesto está en stock. Si hay que pedirlo, de 24 a 48 horas. Podés esperar en Recoleta o Belgrano.",
  },
  {
    question: "¿La pantalla nueva viene con garantía?",
    answer: `Si. ${WARRANTY_SCOPE_MESSAGE} Cubre defectos de fabricacion del repuesto y problemas vinculados al trabajo realizado. No cubre golpes nuevos, liquidos, presion excesiva, modificaciones por terceros ni uso inadecuado. Entregamos certificado con el detalle de cobertura.`,
  },
  {
    question: "¿Puedo usar el celular normalmente después del cambio?",
    answer: "Seguí los cuidados y el tiempo de asentamiento que te indiquemos según el adhesivo utilizado. Renovar el adhesivo no garantiza recuperar la resistencia al agua de fábrica; evitá exponer el equipo a líquidos.",
  },
  {
    question: "¿Qué diferencia hay entre pantalla original, Soft OLED e InCell?",
    answer: "Original describe la procedencia y requiere confirmar la condición de la pieza. Soft OLED es una alternativa OLED flexible; InCell, en estas ofertas de repuestos, es LCD. La compatibilidad, funciones, configuración y precio instalado se confirman para cada modelo. No todas las opciones están disponibles para todos los equipos.",
  },
  {
    question: "¿Todas las pantallas llamadas originales son nuevas?",
    answer: "No. Pedí que se indique si la pantalla es nueva, usada o reacondicionada, su procedencia y qué proceso de instalación o configuración requiere. El nombre comercial no reemplaza el detalle del presupuesto ni las pruebas del equipo.",
  },
];

export default function ScreenReplacementGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <ArticleSchema
        title="Cambio de pantalla de celular: precios por marca en CABA"
        description={`Precios de cambio de pantalla desde ${SCREEN_FROM}, según modelo y repuesto. Consulta por WhatsApp en Recoleta y Belgrano.`}
        publishedTime="2024-11-30T00:00:00Z"
        modifiedTime="2026-10-15T00:00:00Z"
        image="https://teamcelular.com/images/guia_cambio_modulo.webp"
        url="https://teamcelular.com/guias/reparacion-pantalla-celular"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Guías", url: `${SITE_URL}/guias` },
          { name: "Cambio de pantalla", url: `${SITE_URL}/guias/reparacion-pantalla-celular` },
        ]}
      />
      <article className="w-full max-w-6xl space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#86868b]">
          <Link href="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="hover:text-primary transition">
            Guías
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-[#f5f5f7] font-semibold">
            Cambio de Pantalla
          </span>
        </nav>

        <header className="space-y-5 rounded-[28px] bg-[#1d1d1f] p-5 sm:p-10 md:p-12">
          <p className="text-sm font-semibold text-[#6aa6ff]">Recoleta y Belgrano · CABA</p>
          <h1 className="max-w-4xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-tight text-white">
            Cambio de pantalla de celular: precios y opciones para tu modelo
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#a1a1a6]">
            Los cambios de pantalla publicados empiezan en <strong className="text-white">{SCREEN_FROM}</strong>.
            El precio depende del modelo y del repuesto; no todas las pantallas cuestan lo mismo.
            Te confirmamos el valor, las funciones del repuesto y el stock antes de reparar.
            Con repuesto disponible, el cambio suele llevar de 2 a 4 horas.
          </p>
          <p className="text-sm leading-6 text-[#a1a1a6]">
            Paraguay 2451, Recoleta · Amenábar 2032, Belgrano. Garantía escrita de 90 días sobre trabajo y repuesto.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="#precios-pantalla" className="inline-flex min-h-11 items-center font-semibold text-[#6aa6ff] underline underline-offset-4">Ver precios por marca y modelo</Link>
            <GuideByline modifiedTime="2026-10-15T00:00:00Z" tone="light" />
          </div>
          <RepairPriceInquiry
            repair="cambiar la pantalla de mi celular"
            symptoms={["Vidrio roto", "Líneas o manchas", "Táctil no responde", "Pantalla negra", "Pantalla levantada"]}
            ctaName="screen_guide_price_whatsapp"
            ctaLocation="screen_guide_hero"
          />
        </header>

        <section id="precios-pantalla" className="scroll-mt-24 space-y-6">
          <nav aria-label="Precios de pantalla por marca" className="flex flex-wrap gap-3">
            {SCREEN_PRICE_GROUPS.map((group) => (
              <Link key={group.id} href={`#precios-pantalla-${group.id}`} className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-4 py-2 font-semibold text-blue-700 underline underline-offset-4 dark:border-slate-600 dark:text-[#6aa6ff]">{group.brand}</Link>
            ))}
          </nav>
          {SCREEN_PRICE_GROUPS.map((group, index) => (
            <section key={group.id} id={`precios-pantalla-${group.id}`} className="scroll-mt-24 space-y-3">
              <RepairPriceTable
                brand={group.brand}
                prices={group.prices}
                updatedLabel={group.updatedLabel}
                title={group.title}
                timingText={index === 0 ? "El cambio suele llevar de 2 a 4 horas con repuesto en stock. Confirmá disponibilidad y plazo para tu modelo." : ""}
                singlePriceColumn
                showIntroduction={index === 0}
              />
              <Link href={group.href} className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4 dark:text-[#6aa6ff]">Ver reparaciones de {group.brand}</Link>
            </section>
          ))}
          <BranchWhatsAppButton
            ctaName="screen_guide_prices_whatsapp"
            ctaLocation="screen_guide_prices"
            message="Hola Team Celular, vi la tabla de precios de pantallas. Quiero confirmar el precio y el stock para mi modelo."
            className="tc-btn tc-btn-primary w-full sm:w-auto"
          >
            Confirmar precio de mi pantalla
          </BranchWhatsAppButton>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Lo que más nos preguntan antes de cambiar la pantalla
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-[#a1a1a6]">
              El cambio de pantalla no borra los datos. Antes de reparar revisamos si el daño está en el
              módulo, en el flex o en la placa, y te confirmamos el precio. El plazo depende del stock y del diagnóstico.
            </p>
            <Link
              href="/reparaciones/cambio-pantalla-caba"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Ver precio para tu modelo
            </Link>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {quickAnswers.map((item) => (
              <div key={item.question} className="py-5 first:pt-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f5f5f7]">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-700 dark:text-[#a1a1a6]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tipos de daños */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Tipos de daños en pantallas de celular
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Identificá el problema de tu pantalla
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {damageTypes.map((damage) => {
              const Icon = damage.Icon;
              return (
                <div
                  key={damage.title}
                  className="bg-[#1d1d1f] rounded-[28px] p-6 transition"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                      {damage.severity}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-[#f5f5f7]">
                    {damage.title}
                  </h3>
                  <p className="mb-3 text-slate-700 dark:text-[#a1a1a6]">{damage.description}</p>
                  <p className="text-sm font-semibold text-secondary">{damage.urgency}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="comparar-pantallas" className="scroll-mt-24 space-y-6 text-slate-700 dark:text-[#c7c7cc]">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">Pantalla original, Soft OLED, Hard OLED o InCell: ¿qué conviene?</h2>
          <p className="leading-8">Para comparar presupuestos de iPhone, separá procedencia y tecnología. Original indica el origen de una pieza; OLED y LCD describen tecnologías de pantalla. En los repuestos ofrecidos como InCell hablamos de una alternativa LCD, no de OLED. Soft OLED y Hard OLED son dos construcciones de panel OLED. Ningún nombre comercial garantiza por sí solo todas las funciones del teléfono.</p>
          <ComparisonTable caption="Opciones de pantalla: disponibilidad y resultado a confirmar para cada modelo" columns={["Criterio", "Original", "Soft OLED", "Hard OLED", "InCell LCD"]} rows={[
            { label: "Qué describe", values: ["Procedencia: confirmar si es nueva, usada o reacondicionada.", "Panel OLED alternativo con sustrato flexible.", "Panel OLED alternativo con sustrato rígido.", "Conjunto LCD alternativo con tecnología in-cell."] },
            { label: "Qué conviene comprobar", values: ["Origen, condición, compatibilidad y proceso de configuración.", "Proveedor, ajuste, brillo y funciones para el modelo.", "Ajuste, terminación y condiciones de uso para el modelo.", "Compatibilidad, brillo, contraste y funciones frente al panel de fábrica."] },
            { label: "Cuándo compararla", values: ["Si priorizás una pieza de procedencia original verificable.", "Si el modelo trae OLED y querés evaluar una alternativa OLED.", "Si existe una opción para tu modelo y querés comparar su costo y condiciones.", "Si priorizás presupuesto y aceptás las diferencias explicadas para tu equipo."] },
            { label: "Lo que no asegura el nombre", values: ["Que sea nueva, que esté configurada o que no tenga desgaste previo.", "Funciones idénticas al original ni calibración automática.", "Un precio o una resistencia universal frente a Soft OLED.", "Equivalencia a OLED ni un resultado igual en todos los modelos."] },
            { label: "Precio instalado", values: ["Pedir cotización por modelo y condición.", "Pedir cotización por modelo y proveedor.", "Pedir cotización por modelo y proveedor.", "Pedir cotización por modelo y proveedor."] },
          ]} />
          <p className="leading-8">No todos los iPhone traen OLED: por ejemplo, el <a href="https://www.apple.com/la/iphone/compare/?modelList=iphone-11,iphone-11-pro" className="text-blue-600 underline dark:text-[#6aa6ff]" rel="noopener noreferrer">iPhone 11 común usa LCD y el 11 Pro usa OLED</a>. En Android también cambia según el modelo exacto. No recomendamos una tecnología por el nombre de una familia completa. Los precios por marca de esta guía son referencias del catálogo publicado; no son un tarifario de cada calidad de panel.</p>
          <BranchWhatsAppButton ctaName="screen_comparison_whatsapp" ctaLocation="screen_comparison_after_table" message="Hola Team Celular, quiero comparar pantallas original, OLED o InCell para mi equipo. Marca y modelo: __. Falla: __. Quiero saber el precio instalado y las funciones de cada opción." className="tc-btn tc-btn-primary w-full sm:w-auto">Comparar opciones para mi modelo</BranchWhatsAppButton>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">¿Original significa nuevo y sin avisos?</h3>
          <p className="leading-8">No necesariamente. Pedí que se aclare si la pieza es nueva, retirada de otro equipo o reacondicionada. Una pantalla reacondicionada puede conservar un panel original con otras partes reemplazadas; la palabra original, sola, no explica ese trabajo ni el estado del conjunto. La configuración necesaria depende del iPhone y de la pieza utilizada.</p>
          <p className="leading-8">Apple explica cómo consultar el historial de piezas y servicios en los modelos compatibles y qué mensajes pueden aparecer. Un aviso requiere interpretación para ese equipo; no ofrecemos borrarlo como promesa general. Revisamos antes de reparar qué funciones se pueden conservar y qué debe quedar asentado en el presupuesto.</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">¿Qué probamos antes de entregar la pantalla?</h3>
          <p className="leading-8">Probamos imagen, brillo, respuesta táctil y las funciones relacionadas con el trabajo. El estado previo de sensores, flex y cámaras importa: cambiar el display no repara por sí solo un sensor dañado. True Tone, funciones de pantalla y configuración se confirman según modelo y repuesto; no dependen solo de que la etiqueta diga OLED.</p>
          <p className="leading-8">La apertura tampoco garantiza recuperar la resistencia al agua de fábrica. Preguntá por el adhesivo y los cuidados que correspondan al trabajo. Si el costo del módulo te hace dudar, compará el presupuesto con <Link href="/guias/reparar-celular-o-comprar-otro" className="text-blue-600 underline dark:text-[#6aa6ff]">la alternativa de comprar otro celular</Link>. Si tenés cobertura vigente, revisá primero <Link href="/guias/presupuesto-service-oficial-segunda-opinion" className="text-blue-600 underline dark:text-[#6aa6ff]">el canal oficial y las opciones independientes</Link>.</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">¿Qué fuentes usamos para esta comparación?</h3>
          <p className="text-sm leading-7">Revisada el 15 de octubre de 2026. Fuentes: <a href="https://support.apple.com/es-lamr/103256" className="text-blue-600 underline dark:text-[#6aa6ff]" rel="noopener noreferrer">Apple: pantallas originales, funciones e historial de piezas</a>; <a href="https://www.phonerepairspares.com/products/screens-grade-guide" className="text-blue-600 underline dark:text-[#6aa6ff]" rel="noopener noreferrer">PRSPARES: clasificación de sus paneles Soft OLED, Hard OLED e InCell</a>. La clasificación del proveedor explica términos comerciales, no acredita las prestaciones de un repuesto instalado por Team. Confirmamos la pieza disponible y sus condiciones antes de cotizar.</p>
          <p className="leading-8">Para cotizar tu equipo, consultá el <Link href="/reparaciones/cambio-pantalla-caba" className="text-blue-600 underline dark:text-[#6aa6ff]">servicio de cambio de pantalla en CABA</Link>. Indicá marca, modelo y falla: confirmamos las opciones disponibles, la condición del repuesto y el precio instalado antes de avanzar.</p>
        </section>

        {/* Proceso de reemplazo */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Proceso de cambio de pantalla
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Del diagnóstico a las pruebas de entrega
            </p>
          </div>
          <div className="space-y-6">
            {replacementProcess.map((process) => {
              const Icon = process.Icon;
              return (
                <div
                  key={process.step}
                  className="bg-[#1d1d1f] rounded-[28px] p-8 transition"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#333336] text-[#6aa6ff]">
                        <Icon />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-secondary dark:text-secondary/90">
                          {process.step}
                        </h3>
                        <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                          <FaClock />
                          {process.duration}
                        </span>
                      </div>
                      <p className="leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                        {process.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
              Preguntas frecuentes sobre cambio de pantalla
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-[#a1a1a6]">
              Respondemos las dudas más comunes
            </p>
          </div>
          <div className="space-y-4">
            {faqScreen.slice(quickAnswers.length).map((faq, index) => (
              <details
                key={index}
                className="bg-[#1d1d1f] group rounded-[28px] p-6 transition"
              >
                <summary className="flex min-h-11 items-center cursor-pointer text-lg font-semibold text-secondary group-hover:text-primary dark:text-secondary/90">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-[#a1a1a6]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-[#1d1d1f] rounded-[28px] p-10 text-center md:p-16">
          <h2 className="mb-6 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-slate-900 dark:text-[#f5f5f7]">
            ¿Tu pantalla está rota o no funciona?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-[#a1a1a6]">
            {REVIEW_COST_MESSAGE} Confirmá modelo, precio y stock con la sucursal que te quede más cerca.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BranchWhatsAppButton
              ctaName="screen_guide_footer_whatsapp"
              ctaLocation="screen_guide_footer"
              message="Hola Team Celular, leí la guía de cambio de pantalla. Quiero consultar el precio para mi celular."
              className="tc-btn tc-btn-primary"
            >
              Consultar precio por WhatsApp
            </BranchWhatsAppButton>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-600/10"
            >
              Visitar laboratorio
            </Link>
          </div>
        </section>

        <GuideInterlinkSection currentGuide="/guias/reparacion-pantalla-celular" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqScreen.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />
      </article>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { Button, Card, Divider } from "@nextui-org/react";
import {
  FaClipboardList,
  FaTools,
  FaShieldAlt,
  FaSmile,
  FaCheckCircle,
  FaClock,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTruck,
  FaBatteryHalf,
  FaMobileAlt,
  FaCamera,
} from "react-icons/fa";

import RepairsForm from "@/components/forms/RepairsForm";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/presupuesto-reparacion`;

export const metadata: Metadata = {
  title: "Presupuesto Reparación de Celulares en Buenos Aires | Team Celular",
  description:
    "Solicitá tu presupuesto online sin cargo y recibí respuesta en menos de 24 horas. Laboratorio certificado en Recoleta con garantía escrita y repuestos premium.",
  keywords: [
    "presupuesto reparación celulares",
    "servicio técnico celulares buenos aires",
    "presupuesto iphone pantalla",
    "arreglo celular recoleta",
    "microelectronica CABA",
    "retiro reparación celulares",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Presupuesto Reparación de Celulares en Buenos Aires | Team Celular",
    description:
      "24 hs de respuesta, garantía escrita y soporte personalizado para reparar tu celular.",
    url: PAGE_URL,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Laboratorio de Team Celular en Recoleta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedí tu presupuesto de reparación en Team Celular",
    description:
      "Respuesta en menos de 24 hs con garantía escrita y repuestos premium.",
    images: ["https://teamcelular.com/opengraph-image.png"],
  },
};

const processSteps = [
  {
    icon: FaClipboardList,
    title: "Completá el formulario",
    description:
      "Contanos la marca, modelo y el problema del equipo. Podés adjuntar múltiples fallas.",
    timing: "2 minutos",
  },
  {
    icon: FaClock,
    title: "Recibí tu diagnóstico",
    description:
      "En menos de 24 horas un técnico te enviará el presupuesto detallado por WhatsApp o email.",
    timing: "< 24 hs",
  },
  {
    icon: FaTools,
    title: "Traé o coordiná retiro",
    description:
      "Acercate a nuestro laboratorio en Recoleta o coordinamos retiro en CABA según disponibilidad.",
    timing: "Mismo día",
  },
  {
    icon: FaSmile,
    title: "Retirá con garantía",
    description:
      "Te avisamos cuando esté listo. Retirás tu equipo probado, limpio y con garantía escrita.",
    timing: "24-72 hs",
  },
];

const promises = [
  {
    icon: FaShieldAlt,
    title: "Garantía escrita",
    description: "Todos los trabajos incluyen garantía y documentación.",
  },
  {
    icon: FaCheckCircle,
    title: "Repuestos premium",
    description: "Trabajamos con repuestos originales y alternativos de primera línea.",
  },
  {
    icon: FaTruck,
    title: "Opciones de retiro",
    description: "Coordina retiro y entrega express en zonas cercanas (consultar).",
  },
];

const quickResponseFaqs = [
  {
    question: "¿En cuánto tiempo confirman el presupuesto?",
    answer: "Enviamos diagnóstico inicial en 2 horas hábiles; si falta info, te pedimos fotos y agendamos retiro.",
  },
  {
    question: "¿Qué costo tiene el retiro en CABA?",
    answer: "Dentro de la General Paz es sin cargo para reparaciones confirmadas; si desistís solo abonás el traslado ($6.000).",
  },
  {
    question: "¿Cómo se paga la seña?",
    answer: "Podés transferir o enviar link de pago; el saldo se abona al retirar o contra entrega.",
  },
];

const popularRepairs = [
  {
    icon: FaMobileAlt,
    title: "Pantalla dañada",
    details: "Display, touch, vidrio y marcos originales u OLED premium.",
  },
  {
    icon: FaBatteryHalf,
    title: "Batería y carga",
    details: "Cambio de batería, pin de carga, limpieza de humedad y puertos.",
  },
  {
    icon: FaCamera,
    title: "Cámaras y sensores",
    details: "Reemplazo de cámaras, flex, sensores FaceID y calibraciones.",
  },
  {
    icon: FaTools,
    title: "Microelectrónica",
    details: "Reballing BGA, fallas de placa y recuperación de datos avanzados.",
  },
];

const supportChannels = [
  {
    icon: FaWhatsapp,
    title: "Atención inmediata",
    description: "+54 11 5103-4595",
    href: "https://wa.me/5491151034595?text=Hola!%20Necesito%20un%20presupuesto",
    external: true,
  },
  {
    icon: FaPhoneAlt,
    title: "Consultas técnicas",
    description: "Líneas abiertas de lunes a viernes 10:30 a 18:00 hs",
    href: "tel:+5491151034595",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Visitanos",
    description: "Paraguay 2451, Recoleta, CABA",
    href: "/contacto",
  },
];

const faqs = [
  {
    question: "¿Cuánto demora el presupuesto?",
    answer:
      "Respondemos la mayoría de los presupuestos dentro de las primeras 12 horas hábiles. Reparaciones complejas pueden tardar hasta 24 hs.",
  },
  {
    question: "¿El diagnóstico tiene costo?",
    answer:
      "No, el diagnóstico es 100% sin cargo. Solo pagás una vez que aprobás el trabajo.",
  },
  {
    question: "¿Qué garantía ofrecen?",
    answer:
      "Garantía escrita desde 90 hasta 180 días según el tipo de reparación y repuesto utilizado.",
  },
  {
    question: "¿Puedo enviar fotos o videos?",
    answer:
      "Sí, después de enviar el formulario te contactamos por WhatsApp para que compartas fotos o videos del problema.",
  },
];

export default function PresupuestoReparacionPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Presupuesto de reparación de celulares en CABA",
    serviceType: "Presupuesto y diagnóstico de reparación de celulares",
    url: PAGE_URL,
    areaServed: [
      { "@type": "City", name: "Recoleta" },
      { "@type": "City", name: "CABA" },
      { "@type": "City", name: "Buenos Aires" },
    ],
    provider: { "@id": `${SITE_URL}#localbusiness` },
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: PAGE_URL,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-4 text-sm">
        <ol className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li className="text-primary font-semibold">Presupuesto de Reparación</li>
        </ol>
      </nav>

      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Presupuesto", url: PAGE_URL },
        ]}
      />

      <div className="container mx-auto px-4 pb-16 md:pb-24">
        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start mb-20">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              Presupuesto sin cargo en menos de 24 hs
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
              Pedí tu presupuesto online y recuperá tu celular en tiempo récord
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Somos laboratorio certificado en microelectrónica ubicado en Recoleta, CABA. Reparaciones rápidas, transparentes y con garantía escrita.
            </p>

            <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary" />
                <span>Diagnóstico sin cargo y presupuesto detallado antes de intervenir tu equipo.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary" />
                <span>Repuestos originales y alternativos premium según tu necesidad.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-primary" />
                <span>Seguimiento personalizado por WhatsApp durante todo el proceso.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#solicitar-presupuesto">
                <Button size="lg" className="bg-primary text-white shadow-lg hover:bg-primary/90">
                  Solicitar presupuesto
                </Button>
              </Link>
              <Link href="https://wa.me/5491151034595?text=Hola!%20Quiero%20pedir%20presupuesto%20para%20mi%20equipo" target="_blank">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-primary text-primary hover:bg-primary/10"
                  startContent={<FaWhatsapp />}
                >
                  Hablar por WhatsApp
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Horario de atención: Lunes a Viernes de 10:30 a 18:00 hs.
            </p>
          </div>

          <Card className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-primary">
              ¿Por qué pedir tu presupuesto online?
            </h2>
            <Divider className="my-6" />
            <div className="space-y-6">
              {[ 
                { icon: FaClock, title: "Tiempo de respuesta", value: "12 hs promedio", description: "Un técnico dedicado te responde en menos de 24 horas hábiles." },
                { icon: FaShieldAlt, title: "Garantía", value: "90-180 días", description: "Garantía escrita según el tipo de reparación y repuesto." },
                { icon: FaSmile, title: "Clientes felices", value: "+4.8 ⭐", description: "Calificación promedio de nuestros clientes en Google y redes." },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {item.title}
                      </p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.value}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Process Steps */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Así funciona nuestro servicio
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
            Seguí estos simples pasos para obtener tu presupuesto personalizado y reparar tu dispositivo con total tranquilidad.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="text-xl" />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {step.timing}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/30">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            Respuestas rápidas
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {quickResponseFaqs.map((item) => (
              <article key={item.question} className="space-y-2 rounded-xl border border-white/10 bg-white/10 p-4 text-left text-sm leading-relaxed dark:border-white/5 dark:bg-slate-900/40">
                <h4 className="font-semibold text-primary">{item.question}</h4>
                <p className="text-slate-600 dark:text-slate-300">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section id="solicitar-presupuesto" className="mb-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <Card className="p-8 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-primary">
                  Contanos la falla de tu equipo
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Mientras más detalles nos brindes, más preciso será el presupuesto. Luego podés adjuntar fotos o videos por WhatsApp.
                </p>
              </div>
              <RepairsForm />
              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
                * Al enviar tus datos aceptás que te contactemos por los medios proporcionados. Nunca compartimos información con terceros.
              </p>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                  ¿Necesitás ayuda urgente?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Elegí el canal que prefieras y un especialista te ayudará a coordinar el retiro o visita al laboratorio.
                </p>
                <div className="space-y-4">
                  {supportChannels.map((channel, index) => {
                    const Icon = channel.icon;
                    const linkProps = channel.external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
                    return (
                      <Link
                        key={index}
                        href={channel.href}
                        {...linkProps}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/10 px-4 py-3 text-sm text-slate-200 transition hover:border-primary/60 hover:bg-primary/10"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="text-lg" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {channel.title}
                          </p>
                          <p className="text-xs text-slate-200">
                            {channel.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Lo que te prometemos
                </h3>
                <div className="space-y-4">
                  {promises.map((promise, index) => {
                    const Icon = promise.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="text-lg" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {promise.title}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {promise.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Repairs */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Reparaciones más solicitadas
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
            Trabajamos con todas las marcas líderes del mercado. Estos son algunos de los servicios que más nos piden cada día.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRepairs.map((repair, index) => {
              const Icon = repair.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {repair.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {repair.details}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
            Resolvé en minutos las dudas más comunes antes de enviarnos tu equipo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <Card className="relative overflow-hidden p-10 text-center bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white/60 to-secondary/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <h3 className="text-3xl font-bold text-primary mb-4">
            ¿Listo para devolverle la vida a tu celular?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Completá el formulario y recibí tu presupuesto personalizado en menos de 24 horas con garantía escrita y soporte dedicado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#solicitar-presupuesto">
              <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90">
                Empezar ahora
              </Button>
            </Link>
            <Link href="https://wa.me/5491151034595?text=Hola!%20Necesito%20un%20presupuesto" target="_blank">
              <Button
                size="lg"
                variant="bordered"
                className="border-secondary text-secondary hover:bg-secondary/10"
                startContent={<FaWhatsapp />}
              >
                WhatsApp directo
              </Button>
            </Link>
          </div>
        </Card>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://teamcelular.com/presupuesto-reparacion#service",
              name: "Presupuesto de reparación de celulares",
              description:
                "Servicio de diagnóstico sin cargo y presupuesto online para reparación de celulares en Buenos Aires.",
              serviceType: "MobilePhoneRepair",
              url: "https://teamcelular.com/presupuesto-reparacion",
              provider: { "@id": "https://teamcelular.com#localbusiness" },
              areaServed: [
                { "@type": "City", name: "Buenos Aires" },
                { "@type": "City", name: "CABA" },
                { "@type": "City", name: "Recoleta" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de reparación de celulares",
                itemListElement: popularRepairs.map((repair) => ({
                  "@type": "Offer",
                  name: repair.title,
                  description: repair.details,
                })),
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "ARS",
                price: "0",
                availability: "https://schema.org/InStock",
                description:
                  "Presupuesto y diagnóstico sin cargo con respuesta en menos de 24 horas.",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Cómo solicitar un presupuesto de reparación de celulares",
              description:
                "Seguí estos pasos para pedir un presupuesto online y reparar tu celular con Team Celular.",
              totalTime: "PT72H",
              supply: [
                { "@type": "HowToSupply", name: "Celular a reparar" },
                { "@type": "HowToSupply", name: "Descripción de la falla" },
              ],
              tool: [
                { "@type": "HowToTool", name: "Formulario de presupuesto en línea" },
                { "@type": "HowToTool", name: "WhatsApp" },
              ],
              step: processSteps.map((step, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                name: step.title,
                text: step.description,
              })),
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://teamcelular.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Presupuesto de reparación",
                  item: "https://teamcelular.com/presupuesto-reparacion",
                },
              ],
            }),
          }}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}

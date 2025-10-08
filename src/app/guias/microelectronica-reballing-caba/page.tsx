import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  FaMicroscope, 
  FaMicrochip, 
  FaTools, 
  FaCheckCircle,
  FaShieldAlt,
  FaTemperatureHigh,
  FaCertificate,
  FaCamera
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Microelectrónica y Reballing BGA en CABA | Laboratorio Certificado Team Celular",
  description:
    "Servicio especializado de microelectrónica y reballing BGA en Buenos Aires. Reparación de placas, recuperación de chips, soldadura SMD con microscopio. Laboratorio certificado ESD con garantía escrita.",
  keywords: [
    "microelectrónica CABA",
    "reballing BGA Buenos Aires",
    "reparación de placas celulares",
    "soldadura SMD microscopio",
    "recuperación chips BGA",
    "laboratorio ESD Argentina",
    "reparación placa lógica iPhone",
  ],
  openGraph: {
    title: "Microelectrónica y Reballing BGA | Laboratorio Team Celular",
    description:
      "Reparación avanzada de placas y chips BGA con microscopio y equipamiento profesional en CABA.",
    type: "article",
    locale: "es_AR",
  },
};

const useCases = [
  {
    title: "Equipos mojados y daño por líquidos",
    description: "Cortocircuitos en placa lógica, oxidación de componentes, recuperación de datos de chips NAND con corrosión avanzada.",
    Icon: FaMicrochip,
  },
  {
    title: "Daños eléctricos y sobrecarga",
    description: "Chips quemados por cargadores genéricos, pines sueltos, fusibles fundidos y circuitos de alimentación dañados.",
    Icon: FaTemperatureHigh,
  },
  {
    title: "Reballing de chips BGA",
    description: "Baseband, NAND Flash, PMIC (gestión de energía), WiFi/Bluetooth, CPU y chips gráficos con bolas de soldadura deterioradas.",
    Icon: FaTools,
  },
  {
    title: "Reconstrucción de pistas",
    description: "Bypass de circuitos dañados, microbridge en placas multilayer, reparación de pads levantados y restauración de conexiones críticas.",
    Icon: FaCertificate,
  },
];

const equipment = [
  {
    title: "Estaciones de soldado profesional",
    description: "Quick 861DW con control de temperatura por zonas, perfilado térmico según especificaciones del fabricante y soldadores JBC de precisión.",
    Icon: FaTemperatureHigh,
  },
  {
    title: "Microscopio y cámara HD",
    description: "Microscopio trinocular Amscope con aumentos de 7x a 45x, cámara de inspección 4K para registro fotográfico de cada etapa del proceso.",
    Icon: FaMicroscope,
  },
  {
    title: "Preheaters y protección ESD",
    description: "Mesas antiestáticas certificadas, manillas de descarga, ionizadores de aire y preheaters infrarrojos para trabajo seguro en BGA.",
    Icon: FaShieldAlt,
  },
  {
    title: "Diagnóstico y medición",
    description: "Multímetros Fluke, osciloscopio digital, fuentes de alimentación DC programables y software de diagnóstico para señales RF.",
    Icon: FaCheckCircle,
  },
];

const reballingProcess = [
  {
    step: "1. Diagnóstico bajo microscopio",
    detail: "Inspección visual con 20x-45x de aumento para detectar chips levantados, bolas de soldadura colapsadas o componentes con signos de estrés térmico.",
  },
  {
    step: "2. Desmontaje del chip BGA",
    detail: "Aplicación de perfiles térmicos controlados (ramp-soak-peak) con preheater infrarrojo para evitar warping de la placa y daño a componentes adyacentes.",
  },
  {
    step: "3. Limpieza y preparación",
    detail: "Remoción de residuos de flux con IPA 99%, limpieza de pads con trenza desoldante y aplicación de flux activado en zona de montaje.",
  },
  {
    step: "4. Aplicación de bolas nuevas",
    detail: "Reballing con plantilla (stencil) específica del chip, bolas de soldadura SAC305 lead-free o Sn63/Pb37 según especificaciones originales.",
  },
  {
    step: "5. Montaje y reflow",
    detail: "Posicionamiento con lupa, aplicación de perfiles térmicos optimizados y enfriamiento gradual para evitar thermal shock y garantizar uniones sólidas.",
  },
  {
    step: "6. Inspección y pruebas",
    detail: "Verificación con microscopio, medición de resistencias, pruebas de continuidad y test funcional completo del dispositivo antes de entregar.",
  },
];

const faqMicro = [
  {
    question: "¿Qué es el reballing BGA y cuándo es necesario?",
    answer: "El reballing BGA es el proceso de remover un chip (CPU, NAND, baseband, etc.) de la placa, limpiar los contactos y aplicar nuevas bolas de soldadura. Es necesario cuando el chip pierde contacto con la placa por golpes, sobrecalentamiento o desgaste térmico, causando fallas como 'no enciende', pérdida de señal WiFi o loops de boot.",
  },
  {
    question: "¿Cuánto tarda una reparación de microelectrónica?",
    answer: "Depende de la complejidad. Un reballing simple puede tomar 4-6 horas. Reparaciones complejas con reconstrucción de pistas o múltiples chips pueden requerir 2-3 días. Siempre hacemos diagnóstico previo sin cargo para darte un tiempo estimado preciso.",
  },
  {
    question: "¿Tienen garantía las reparaciones de placa?",
    answer: "Sí. Todas las reparaciones de microelectrónica incluyen 3 meses de garantía por escrito en los trabajos realizados (componentes reemplazados, soldaduras, etc.). La garantía NO cubre daños nuevos por líquidos, golpes o uso inadecuado posterior.",
  },
  {
    question: "¿Qué equipos pueden reparar a nivel microelectrónica?",
    answer: "Reparamos iPhone (desde 6 hasta modelos actuales), Samsung Galaxy, Motorola, Xiaomi, tablets, MacBooks y otros dispositivos con placas lógicas complejas. También atendemos colegas técnicos que necesitan reballing específico o bypass de circuitos.",
  },
  {
    question: "¿Ofrecen capacitaciones en microelectrónica?",
    answer: "Sí, ofrecemos cursos personalizados para técnicos que quieran especializarse en soldadura SMD, reballing BGA y diagnóstico avanzado de placas. Consultanos por el programa de capacitación y disponibilidad de cupos.",
  },
];

export default function MicroelectronicsGuide() {
  return (
    <div className="flex w-full justify-center px-4 py-16">
      <article className="w-full max-w-6xl space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/guias" className="hover:text-primary transition">
            Guías
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">
            Microelectrónica y Reballing
          </span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30 md:p-16">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl">
            <FaMicroscope className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Laboratorio de Microelectrónica y Reballing BGA
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Reparación avanzada de placas lógicas y chips BGA con{" "}
            <strong className="text-primary">microscopio profesional</strong> y equipamiento certificado ESD. Somos referentes en Buenos Aires para recuperar dispositivos que otros talleres consideran sin solución.
          </p>
          
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaMicroscope className="mx-auto text-3xl text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">20x-45x</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Microscopio profesional</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaShieldAlt className="mx-auto text-3xl text-secondary mb-2" />
              <div className="text-2xl font-bold text-secondary">3 meses</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Garantía escrita</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
              <FaCertificate className="mx-auto text-3xl text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">ESD</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Certificado</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Solicitar diagnóstico
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition hover:bg-primary/10"
            >
              Coordinar visita al laboratorio
            </Link>
          </div>
        </header>

        {/* Introducción con video */}
        <section className="grid gap-8 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-xl object-cover shadow-lg"
            >
              <source src="/videos/microscopio.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
          <div className="order-1 space-y-6 p-10 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Cuando la reparación requiere microscopio
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                Cuando un celular se moja, deja de encender sin razón aparente o tiene fallas intermitentes que no se solucionan con cambio de pantalla o batería, el problema está en la{" "}
                <strong className="text-primary">placa lógica</strong>.
              </p>
              <p>
                Nuestro equipo de microelectrónica trabaja con <strong>microscopio trinocular</strong>, estaciones de soldado con control térmico de precisión y herramientas especializadas para intervenir chips BGA, circuitos SMD y componentes miniaturizados que requieren destreza de nivel profesional.
              </p>
              <p>
                No somos un service genérico: somos un <strong className="text-secondary">laboratorio técnico certificado</strong> con protocolos ESD, documentación fotográfica de cada proceso y garantía escrita en todas las intervenciones de microelectrónica.
              </p>
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Casos en los que recomendamos microelectrónica
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Reparaciones complejas que otros talleres no pueden resolver
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((useCase) => {
              const Icon = useCase.Icon;
              return (
                <div
                  key={useCase.title}
                  className="group rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-secondary dark:text-secondary/90">
                    {useCase.title}
                  </h3>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Equipamiento */}
        <section className="space-y-8 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Equipamiento profesional y protocolos certificados
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Trabajamos con instrumental de nivel laboratorio bajo normas ESD
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {equipment.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-2xl text-primary">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Proceso de reballing */}
        <section className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <div className="grid gap-0 md:grid-cols-5">
            <div className="order-2 md:order-1 md:col-span-2">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/interposerReballing.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="order-1 space-y-6 p-10 md:order-2 md:col-span-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-3xl text-white shadow-lg">
                  <FaCamera />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Proceso de reballing paso a paso
                </h2>
              </div>
              <div className="space-y-4">
                {reballingProcess.map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
                    <h4 className="mb-2 font-bold text-secondary dark:text-secondary/90">
                      {item.step}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Preguntas frecuentes sobre microelectrónica
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              Respondemos las dudas más comunes sobre reballing y reparación de placas
            </p>
          </div>
          <div className="space-y-4">
            {faqMicro.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition hover:shadow-lg dark:border-white/10 dark:bg-slate-900/30"
              >
                <summary className="cursor-pointer text-lg font-bold text-secondary group-hover:text-primary dark:text-secondary/90">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-primary/10 via-white/5 to-secondary/10 p-10 text-center backdrop-blur-2xl dark:border-white/10 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 md:p-16">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            ¿Tu equipo necesita reparación de placa lógica?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Hacemos diagnóstico sin cargo. Si tiene solución, te damos presupuesto detallado con tiempos y garantía por escrito. Si no, te lo decimos honestamente.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/presupuesto-reparacion"
              className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-secondary/90"
            >
              Solicitar diagnóstico de placa
            </Link>
            <Link
              href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20reparación%20de%20microelectrónica"
              className="rounded-full border-2 border-secondary px-8 py-4 text-lg font-semibold text-secondary transition hover:bg-secondary/10"
            >
              Consultar por WhatsApp
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
            También ofrecemos{" "}
            <Link href="/guias/soporte-empresas-servicio-tecnico" className="font-semibold text-primary underline">
              soporte para empresas y gremios
            </Link>{" "}
            con convenios de mantenimiento y capacitaciones técnicas.
          </p>
        </section>

        {/* Related Articles */}
        <section className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Artículos relacionados
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/guias/reparacion-iphone-buenos-aires"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Reparación de iPhone</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Servicio especializado con repuestos originales
              </p>
            </Link>
            <Link
              href="/guias/mantenimiento-preventivo-celulares"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Mantenimiento Preventivo</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cuidados para prevenir daños en placas
              </p>
            </Link>
            <Link
              href="/guias/soporte-empresas-servicio-tecnico"
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition hover:border-primary dark:border-white/15 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 font-bold text-primary">Soporte Corporativo</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Planes empresariales con SLA garantizado
              </p>
            </Link>
          </div>
        </section>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Microelectrónica y Reballing BGA",
              "description": "Laboratorio especializado en reparación de placas lógicas, reballing BGA, soldadura SMD y recuperación de dispositivos con daño a nivel chip.",
              "provider": {
                "@type": "LocalBusiness",
                "name": "Team Celular",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Paraguay 2451",
                  "addressLocality": "Recoleta",
                  "addressRegion": "CABA",
                  "addressCountry": "AR",
                },
                "telephone": "+541151034595",
                "email": "teamcelular.arg@gmail.com",
              },
              "serviceType": "Reparación de microelectrónica y reballing BGA",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "-34.5937",
                  "longitude": "-58.3917",
                },
                "geoRadius": "50000",
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios de microelectrónica",
                "itemListElement": useCases.map((useCase) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": useCase.title,
                    "description": useCase.description,
                  },
                })),
              },
            }),
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqMicro.map((faq) => ({
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
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Proceso de Reballing BGA",
              "description": "Guía paso a paso del proceso profesional de reballing de chips BGA en dispositivos móviles.",
              "image": "https://teamcelular.com/images/teamcelular.webp",
              "totalTime": "PT6H",
              "supply": ["Chip BGA", "Bolas de soldadura", "Flux activado", "Stencil específico"],
              "tool": ["Microscopio profesional", "Estación de reballing", "Preheater infrarrojo", "Multímetro"],
              "step": reballingProcess.map((item, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": item.step,
                "text": item.detail,
              })),
              "author": {
                "@type": "Organization",
                "name": "Team Celular",
              },
            }),
          }}
        />
      </article>
    </div>
  );
}

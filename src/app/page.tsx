import React from "react";
import BannerHome from "../components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import Link from "next/link";

const services = [
  {
    title: "Reparación el mismo día",
    description:
      "Pantalla rota, batería que no dura, puerto de carga que no funciona. La mayoría de reparaciones las resolvemos en el día.",
  },
  {
    title: "Problemas complicados de placa",
    description:
      "Celular mojado, que no enciende o con fallas raras. Tenemos microscopio y equipos especiales para reparaciones que otros talleres no pueden hacer.",
  },
  {
    title: "Para empresas y organizaciones",
    description:
      "¿Tenés varios equipos? Armamos un plan a medida con descuentos, prioridad en la entrega y facturación A.",
  },
];

const differentiators = [
  {
    title: "Garantía de verdad",
    description:
      "No es letra chica ni promesas. Te damos un papel firmado con 3 meses de garantía en todas las reparaciones.",
  },
  {
    title: "Presupuesto el mismo día",
    description:
      "Traé tu equipo a la mañana y antes de la tarde te decimos cuánto sale y cuánto tarda. Sin sorpresas.",
  },
  {
    title: "Como vos prefieras",
    description:
      "WhatsApp, llamada, mail o venís directo. Estamos en Recoleta y respondemos rápido por donde sea.",
  },
];

const faqs = [
  {
    question: "¿Arreglan todo tipo de celulares?",
    answer:
      "Sí. iPhone, Samsung, Motorola, Xiaomi y casi todas las marcas. Si tu modelo es muy raro, escribinos y te confirmamos en el momento si conseguimos el repuesto.",
  },
  {
    question: "¿Vienen a domicilio?",
    answer:
      "Por ahora no hacemos reparaciones a domicilio, pero podemos coordinar para buscar y entregar tu equipo si estás en CABA o zona norte.",
  },
  {
    question: "¿Cuánto tarda un presupuesto?",
    answer:
      "Si venís al taller, te lo damos en el momento. Si nos escribís por WhatsApp con fotos del problema, te respondemos el mismo día con un precio estimado.",
  },
];

export default function Home() {
  return (
    <section className="flex w-full max-w-6xl flex-col items-center gap-16 px-6 py-14 transition md:px-8">
      <BannerHome />
      <BannerCards />

      <section className="w-full max-w-6xl space-y-14 text-center md:text-left">
        <article className="grid gap-10 rounded-2xl border border-white/15 bg-white/5 p-10 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/30 md:grid-cols-2 md:items-center">
          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-semibold text-primary md:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Somos Team Celular, un taller familiar que se convirtió en referencia técnica en Buenos Aires. Trabajamos en Recoleta con repuestos originales y equipamiento profesional porque creemos que tu celular merece el mismo cuidado que le darías vos.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Arreglamos desde celulares personales hasta equipos de empresas. Te damos presupuesto sin compromiso, explicamos todo en castellano claro y respaldamos cada trabajo con garantía por escrito.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/presupuesto-reparacion"
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Pedir presupuesto
              </Link>
              <Link
                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparaci%C3%B3n"
                className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-primary/60 dark:text-primary/80"
              >
                Escribinos por WhatsApp
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Qué hacemos</h3>
            <ul className="space-y-4 text-left">
              {services.map((service) => (
                <li key={service.title} className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-md dark:border-white/15 dark:bg-slate-900/40">
                  <h4 className="text-xl font-semibold text-secondary dark:text-secondary/80">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="grid gap-8 md:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
            >
              <h4 className="text-xl font-semibold text-primary">
                {item.title}
              </h4>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </article>

        <GoogleReviewsAPI />

        <article className="rounded-2xl border border-white/15 bg-white/5 p-10 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/30">
          <h3 className="text-2xl font-bold text-slate-900 md:text-left dark:text-white">
            Dónde estamos y cómo contactarnos
          </h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Nuestro taller está en Recoleta, a pocas cuadras de la facultad de Derecho. Si estás en Palermo, Belgrano, Caballito o el centro, llegás fácil. También coordinamos retiros en CABA.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                La dirección exacta es Paraguay 2451, Recoleta. Atendemos de lunes a viernes de 10:30 a 18hs. Mejor avisá antes de venir para estar seguros que tengamos lugar.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-semibold">
                Vías de contacto
              </p>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li>
                  Tel: <Link href="tel:+541151034595" className="font-semibold text-primary transition hover:text-secondary">+54 11 5103-4595</Link>
                </li>
                <li>
                  Email: <Link href="mailto:teamcelular.arg@gmail.com" className="font-semibold text-primary transition hover:text-secondary">teamcelular.arg@gmail.com</Link>
                </li>
                <li>
                  Laboratorio: Paraguay 2451, Recoleta, CABA.
                </li>
                <li>
                  Horario: Lunes a Viernes de 10:30 a 18:00 hs.
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 md:text-left dark:text-white">
            Preguntas frecuentes sobre reparación de celulares
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 text-left shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-secondary dark:text-secondary/90">
                  {faq.question}
                </h4>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </article>

  <KnowledgeGrid />

        <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-10 text-center shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl md:text-left dark:border-white/10 dark:bg-slate-900/30">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white/60 to-secondary/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <h3 className="text-2xl font-bold text-primary">
            ¿Listo para recuperar tu teléfono?
          </h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Dejanos un mensaje detallando la falla, elegí el canal que prefieras y reservá tu turno en minutos. Somos el servicio técnico de referencia en reparación de celulares de Buenos Aires.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/contacto"
              className="rounded-full bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Ver formas de contacto
            </Link>
            <Link
              href="/sobrenosotros"
              className="rounded-full border border-secondary px-6 py-3 font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Conocé el taller
            </Link>
          </div>
        </article>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://teamcelular.com/#business",
            "name": "Team Celular",
            "image": "https://teamcelular.com/images/teamcelular.webp",
            "description": "Servicio técnico especializado en reparación de celulares en Recoleta, Buenos Aires. Más de 15 años de experiencia, repuestos originales y garantía escrita.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Paraguay 2451",
              "addressLocality": "Recoleta",
              "addressRegion": "CABA",
              "postalCode": "C1121",
              "addressCountry": "AR",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-34.5937",
              "longitude": "-58.3917",
            },
            "url": "https://teamcelular.com",
            "telephone": "+541151034595",
            "email": "teamcelular.arg@gmail.com",
            "priceRange": "$$",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "10:30",
                "closes": "18:00",
              },
            ],
            "sameAs": [
              "https://www.instagram.com/teamcelular",
              "https://www.facebook.com/teamcelular",
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios de Reparación",
              "itemListElement": services.map((service) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description,
                },
              })),
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Buenos Aires",
              },
              {
                "@type": "City",
                "name": "CABA",
              },
              {
                "@type": "City",
                "name": "Recoleta",
              },
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "150",
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "María González",
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "reviewBody": "Excelente servicio! Me cambiaron la pantalla del iPhone en el día y quedó perfecta. Los chicos son súper atentos y te explican todo. Volveré sin dudas.",
                "datePublished": "2025-09-28",
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Carlos Rodríguez",
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "reviewBody": "Llevé mi Samsung con un problema de placa que nadie me podía solucionar. En Team Celular lo arreglaron en 48hs. Profesionales de verdad, muy recomendable.",
                "datePublished": "2025-09-12",
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Ana Martínez",
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "reviewBody": "Me atendieron por WhatsApp super rápido y me dieron el presupuesto enseguida. Fui al taller en Recoleta y en pocas horas tenía mi cel como nuevo. Precios justos!",
                "datePublished": "2025-09-21",
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Diego Fernández",
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "reviewBody": "Contraté el servicio para mi empresa. Atienden varios equipos al mismo tiempo y siempre cumplen con los tiempos. Muy buen trato y seriedad.",
                "datePublished": "2025-08-12",
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Laura Sánchez",
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "reviewBody": "Mi Motorola no cargaba más y pensé que era la batería. Resultó ser el pin de carga. Me lo arreglaron en el momento y no me cobraron caro. Muy honestos!",
                "datePublished": "2025-10-05",
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Roberto Silva",
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "reviewBody": "Llevé un iPhone con problemas de cámara y Touch ID. Lo dejaron funcionando perfecto con garantía escrita. El local está impecable y tienen equipamiento profesional.",
                "datePublished": "2025-09-21",
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://teamcelular.com/#organization",
            "name": "Team Celular",
            "url": "https://teamcelular.com",
            "logo": "https://teamcelular.com/images/teamcelular.webp",
            "description": "Empresa familiar con más de 15 años de experiencia en reparación de celulares y dispositivos móviles en Buenos Aires.",
            "foundingDate": "2009",
            "founder": {
              "@type": "Organization",
              "name": "Team Celular",
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+541151034595",
              "contactType": "customer service",
              "areaServed": "AR",
              "availableLanguage": ["Spanish"],
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Paraguay 2451",
              "addressLocality": "Recoleta",
              "addressRegion": "CABA",
              "postalCode": "C1121",
              "addressCountry": "AR",
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
            "mainEntity": faqs.map((faq) => ({
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
            "@type": "WebSite",
            "@id": "https://teamcelular.com/#website",
            "url": "https://teamcelular.com",
            "name": "Team Celular",
            "description": "Reparación profesional de celulares en Buenos Aires",
            "publisher": {
              "@id": "https://teamcelular.com/#organization",
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://teamcelular.com/tienda?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </section>
  );
}

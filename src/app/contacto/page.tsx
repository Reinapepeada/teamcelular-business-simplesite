import React from "react";
import { Button, Card, Divider } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaDirections,
  FaSubway,
  FaBus,
  FaParking,
  FaCheckCircle,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contacto | Team Celular | Reparación de Celulares en Recoleta CABA",
  description:
    "Visitanos en Paraguay 2451, Recoleta, CABA. Atención Lunes a Viernes 10:30-18hs. WhatsApp: +54 11 5103-4595. Pedí tu presupuesto sin cargo.",
  keywords: [
    "contacto team celular",
    "reparación celulares recoleta",
    "taller celulares paraguay 2451",
    "servicio técnico CABA contacto",
    "presupuesto reparación celular",
    "whatsapp reparación celular",
  ],
  openGraph: {
    title: "Contacto | Team Celular Recoleta",
    description: "Visitanos en Paraguay 2451 o escribinos por WhatsApp para tu presupuesto",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/teamcelular.webp",
        width: 1200,
        height: 630,
        alt: "Team Celular - Contacto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Team Celular Recoleta",
    description: "Visitanos en Paraguay 2451 o escribinos por WhatsApp",
    images: ["https://teamcelular.com/images/teamcelular.webp"],
  },
};

const contactMethods = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+54 11 5103-4595",
    description: "Respuesta inmediata",
    href: "https://wa.me/5491151034595",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaPhone,
    title: "Teléfono",
    value: "+54 11 5103-4595",
    description: "Llamadas de 10:30 a 18hs",
    href: "tel:+5491151034595",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "teamcelular.arg@gmail.com",
    description: "Respuesta en 24hs",
    href: "mailto:teamcelular.arg@gmail.com",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const socialMedia = [
  {
    icon: FaInstagram,
    name: "Instagram",
    handle: "@teamcelular",
    href: "https://www.instagram.com/teamcelular",
    color: "text-pink-500",
  },
  {
    icon: FaFacebook,
    name: "Facebook",
    handle: "/teamcelular",
    href: "https://www.facebook.com/teamcelular",
    color: "text-blue-600",
  },
];

const transportInfo = [
  {
    icon: FaSubway,
    title: "Subte",
    description: "Línea D - Estación Callao (5 min caminando)",
  },
  {
    icon: FaBus,
    title: "Colectivos",
    description: "10, 37, 39, 59, 60, 108, 111, 152",
  },
  {
    icon: FaParking,
    title: "Estacionamiento",
    description: "Zona con estacionamiento medido y playas cercanas",
  },
];

const faqs = [
  {
    question: "¿Necesito turno previo?",
    answer:
      "No es necesario turno, pero te recomendamos escribirnos por WhatsApp para coordinar y asegurarte que tengamos disponibilidad inmediata.",
  },
  {
    question: "¿Hacen presupuestos sin cargo?",
    answer:
      "Sí, todos nuestros presupuestos son sin cargo y sin compromiso. Podés solicitarlo por WhatsApp enviando fotos del problema.",
  },
  {
    question: "¿Cuánto tiempo tarda una reparación típica?",
    answer:
      "La mayoría de reparaciones de pantalla o batería se realizan en el día (2-4 horas). Reparaciones más complejas pueden tardar 2-3 días.",
  },
  {
    question: "¿Tienen garantía?",
    answer:
      "Sí, todas nuestras reparaciones tienen garantía escrita. El tiempo varía según el tipo de reparación (consultar al momento del presupuesto).",
  },
];

export default function Contacto() {
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
          <li className="text-primary font-semibold">Contacto</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            ¡Estamos para ayudarte!
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-4">
            Visitanos en nuestro taller en Recoleta o contactanos por tu canal
            preferido
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="https://wa.me/5491151034595" target="_blank">
              <Button
                size="lg"
                className="bg-green-500 text-white hover:bg-green-600 shadow-lg"
                startContent={<FaWhatsapp className="text-xl" />}
              >
                Escribinos por WhatsApp
              </Button>
            </Link>
            <Link href="/presupuesto-reparacion">
              <Button
                size="lg"
                variant="bordered"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Solicitar Presupuesto
              </Button>
            </Link>
          </div>
        </div>

        {/* Métodos de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Link
                href={method.href}
                key={index}
                target={method.href.startsWith("http") ? "_blank" : undefined}
              >
                <Card className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div
                      className={`${method.bgColor} ${method.color} p-4 rounded-full`}
                    >
                      <Icon className="text-3xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{method.title}</h3>
                      <p className={`font-semibold ${method.color} mb-1`}>
                        {method.value}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Ubicación y Mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Información de Ubicación */}
          <Card className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start space-x-4 mb-8">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Nuestra Ubicación</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Paraguay 2451, Recoleta
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Ciudad Autónoma de Buenos Aires, Argentina
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mb-8">
              <div className="bg-secondary/10 text-secondary p-3 rounded-full">
                <FaClock className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Horarios de Atención</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Lunes a Viernes: 10:30 - 18:00hs
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Sábados y Domingos: Cerrado
                </p>
                <div className="mt-3 inline-flex items-center space-x-2 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  <FaCheckCircle />
                  <span>Abierto ahora</span>
                </div>
              </div>
            </div>

            <Divider className="my-6" />

            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=Team+celular,Paraguay+2451,Buenos+Aires"
              target="_blank"
            >
              <Button
                size="lg"
                className="w-full bg-primary text-white"
                startContent={<FaDirections className="text-xl" />}
              >
                Cómo Llegar (Google Maps)
              </Button>
            </Link>

            <div className="mt-8 space-y-4">
              <h3 className="font-bold text-lg mb-4">¿Cómo llegar?</h3>
              {transportInfo.map((transport, index) => {
                const Icon = transport.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className="text-primary text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{transport.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {transport.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Mapa */}
          <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="h-full min-h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.262305984237!2d-58.40523692350382!3d-34.59752805717274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb9f6e9910cb%3A0xb492115ba59bc4f2!2sTeam%20celular%20%7C%20Reparacion%20de%20celulares%20%7C%20Reparacion%20de%20computadoras!5e0!3m2!1ses!2sar!4v1712864201522!5m2!1ses!2sar"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Team Celular"
              />
            </div>
          </Card>
        </div>

        {/* Redes Sociales */}
        <Card className="p-8 mb-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
          <h2 className="text-2xl font-bold text-center mb-8">
            Seguinos en Redes Sociales
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link href={social.href} key={index} target="_blank">
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-900">
                    <div className="flex items-center space-x-4">
                      <Icon className={`text-4xl ${social.color}`} />
                      <div>
                        <h3 className="font-bold">{social.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {social.handle}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* FAQs de Ubicación/Contacto */}
        <Card className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
          <h2 className="text-2xl font-bold text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
              >
                <h3 className="font-bold text-lg mb-2 text-primary">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Team Celular",
            "image": "https://teamcelular.com/images/teamcelular.webp",
            "description":
              "Servicio técnico especializado en reparación de celulares en Recoleta, Buenos Aires",
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
              "latitude": "-34.597528",
              "longitude": "-58.405237",
            },
            "url": "https://teamcelular.com",
            "telephone": "+541151034595",
            "email": "teamcelular.arg@gmail.com",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                "opens": "10:30",
                "closes": "18:00",
              },
            ],
            "sameAs": [
              "https://www.instagram.com/teamcelular",
              "https://www.facebook.com/teamcelular",
            ],
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
            "@type": "ContactPage",
            "name": "Contacto - Team Celular",
            "description":
              "Información de contacto y ubicación de Team Celular en Recoleta, Buenos Aires",
            "url": "https://teamcelular.com/contacto",
          }),
        }}
      />
    </section>
  );
}

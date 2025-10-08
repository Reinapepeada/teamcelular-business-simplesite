import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Card, Button, Divider } from "@nextui-org/react";
import {
  FaAward,
  FaCertificate,
  FaHandshake,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaCheckCircle,
  FaMicroscope,
  FaTools,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaGlobe,
} from "react-icons/fa";

export const metadata: Metadata = {
  title:
    "Sobre Nosotros | Team Celular | 15 Años de Experiencia en Reparación",
  description:
    "Empresa familiar con más de 15 años de experiencia en reparación de celulares. De Venezuela a Argentina, servicio técnico profesional con garantía escrita y equipamiento de última generación.",
  keywords: [
    "sobre team celular",
    "empresa familiar reparación celulares",
    "15 años experiencia técnica",
    "laboratorio microelectrónica CABA",
    "servicio técnico certificado",
    "historia team celular",
  ],
  openGraph: {
    title: "Sobre Nosotros | Team Celular",
    description:
      "Más de 15 años cuidando tus dispositivos con profesionalismo y garantía",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/empresaFamiliar.webp",
        width: 1200,
        height: 630,
        alt: "Team Celular - Empresa Familiar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | Team Celular",
    description: "15 años de experiencia en reparación profesional",
    images: ["https://teamcelular.com/images/empresaFamiliar.webp"],
  },
};

const timeline = [
  {
    year: "2009",
    location: "Venezuela",
    title: "Nuestros Comienzos",
    description:
      "Iniciamos como un pequeño taller familiar especializado en reparación de dispositivos móviles.",
  },
  {
    year: "2012",
    location: "Venezuela",
    title: "Expansión de Servicios",
    description:
      "Incorporamos microelectrónica y reparación a nivel placa madre, convirtiéndonos en referentes técnicos.",
  },
  {
    year: "2015",
    location: "Panamá",
    title: "Internacionalización",
    description:
      "Abrimos sucursal en Panamá, llevando nuestra experiencia a Centroamérica.",
  },
  {
    year: "2018",
    location: "Argentina",
    title: "Llegada a Argentina",
    description:
      "Establecimos nuestro laboratorio principal en Buenos Aires, Recoleta.",
  },
  {
    year: "2025",
    location: "Buenos Aires",
    title: "Líderes en CABA",
    description:
      "Consolidados como referencia en reparación profesional con más de 10,000 dispositivos reparados.",
  },
];

const values = [
  {
    icon: FaAward,
    title: "Excelencia",
    description:
      "Buscamos la perfección en cada reparación, usando repuestos de calidad y técnicas profesionales.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: FaLightbulb,
    title: "Innovación",
    description:
      "Equipamiento de última generación: microscopios, estaciones de reballing, herramientas especializadas.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: FaHandshake,
    title: "Compromiso",
    description:
      "Diagnóstico honesto y transparente. Si no podemos repararlo, te lo decimos sin costo.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaShieldAlt,
    title: "Integridad",
    description:
      "Garantía escrita en todas nuestras reparaciones. Tu confianza es nuestro mayor valor.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const differentiators = [
  {
    icon: FaCertificate,
    title: "Certificaciones ESD",
    description: "Protocolos antiestáticos para proteger tus dispositivos",
  },
  {
    icon: FaMicroscope,
    title: "Microelectrónica Avanzada",
    description: "Reparación a nivel componente con microscopio profesional",
  },
  {
    icon: FaTools,
    title: "Equipamiento Profesional",
    description: "Estaciones de reballing, soldadura y herramientas especializadas",
  },
  {
    icon: FaCheckCircle,
    title: "Repuestos Originales",
    description: "Trabajamos con proveedores certificados y repuestos de calidad",
  },
  {
    icon: FaUsers,
    title: "Empresa Familiar",
    description: "Trato personalizado y atención dedicada en cada servicio",
  },
  {
    icon: FaStar,
    title: "15 Años de Experiencia",
    description: "Miles de dispositivos reparados con éxito en 3 países",
  },
];

const stats = [
  { icon: FaClock, value: "15+", label: "Años de Experiencia" },
  { icon: FaUsers, value: "10,000+", label: "Dispositivos Reparados" },
  { icon: FaGlobe, value: "3", label: "Países" },
  { icon: FaStar, value: "4.8", label: "Rating Promedio" },
];

const SobreNosotros = () => {
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
          <li className="text-primary font-semibold">Sobre Nosotros</li>
        </ol>
      </nav>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            Más de 15 años cuidando tus dispositivos
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
            Somos una empresa familiar dedicada a las soluciones tecnológicas,
            con presencia en Venezuela, Panamá y Argentina.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50"
                >
                  <Icon className="text-3xl text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Imagen Principal */}
        <div className="relative h-[400px] md:h-[500px] w-full mb-20 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/empresaFamiliar.webp"
            alt="Team Celular - Empresa Familiar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">
                Una Historia de Pasión por la Tecnología
              </h2>
              <p className="text-lg">
                De Venezuela a Argentina, siempre con el mismo compromiso de
                excelencia
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nuestra Historia
          </h2>
          <div className="relative">
            {/* Línea vertical en desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary" />

            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <Card
                    className={`w-full md:w-5/12 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary">
                        {event.year}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                        <FaMapMarkerAlt />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {event.description}
                    </p>
                  </Card>

                  {/* Punto central en la línea */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900 shadow-lg" />
                  </div>

                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Nuestros Valores
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Los principios que guían cada reparación y cada interacción con
            nuestros clientes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div
                    className={`${value.bgColor} ${value.color} p-4 rounded-full w-fit mx-auto mb-4`}
                  >
                    <Icon className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    {value.title}
                  </h3>
                  <p className="text-center text-slate-600 dark:text-slate-300">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Por Qué Elegirnos */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Características que nos hacen diferentes y mejores que la competencia
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                      <Icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{diff.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl border border-primary/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary text-white p-3 rounded-full">
                <FaHeart className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Proporcionar{" "}
              <span className="font-semibold text-primary">
                soluciones tecnológicas de alta calidad
              </span>{" "}
              y servicios de reparación confiables a nuestros clientes. Nos
              esforzamos por superar las expectativas y garantizar la
              satisfacción total con cada dispositivo que pasa por nuestras
              manos.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-transparent backdrop-blur-xl border border-secondary/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-secondary text-white p-3 rounded-full">
                <FaGlobe className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold">Nuestra Visión</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ser reconocidos como el proveedor líder de{" "}
              <span className="font-semibold text-secondary">
                soluciones tecnológicas y servicios de reparación en toda
                América Latina
              </span>
              . Queremos ser la primera opción para quienes buscan excelencia,
              profesionalismo y confianza.
            </p>
          </Card>
        </div>

        {/* CTA Final */}
        <Card className="relative overflow-hidden p-10 text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white/60 to-secondary/5 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            ¿Querés conocer nuestro laboratorio?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Visitanos en Paraguay 2451, Recoleta. Te mostraremos nuestro
            equipamiento y cómo trabajamos para devolverle la vida a tu
            dispositivo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 shadow-lg"
              >
                Visitanos
              </Button>
            </Link>
            <Link href="/presupuesto-reparacion">
              <Button
                size="lg"
                variant="bordered"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                Solicitar Presupuesto
              </Button>
            </Link>
            <Link href="/guias">
              <Button
                size="lg"
                variant="bordered"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Ver Guías Técnicas
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Sobre Nosotros - Team Celular",
            "description":
              "Historia y valores de Team Celular, empresa familiar con más de 15 años de experiencia en reparación de dispositivos móviles",
            "url": "https://teamcelular.com/sobrenosotros",
            "mainEntity": {
              "@type": "Organization",
              "name": "Team Celular",
              "foundingDate": "2009",
              "foundingLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "VE",
                },
              },
              "description":
                "Empresa familiar especializada en reparación de celulares y microelectrónica con presencia en Venezuela, Panamá y Argentina",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "Venezuela",
                },
                {
                  "@type": "Country",
                  "name": "Panamá",
                },
                {
                  "@type": "Country",
                  "name": "Argentina",
                },
              ],
              "knowsAbout": [
                "Reparación de celulares",
                "Microelectrónica",
                "Reballing BGA",
                "Reparación de computadoras",
              ],
              "slogan":
                "Más de 15 años cuidando tus dispositivos con profesionalismo y garantía",
            },
          }),
        }}
      />
    </section>
  );
};

export default SobreNosotros;

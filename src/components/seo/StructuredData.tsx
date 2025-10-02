"use client";
import React from "react";

interface StructuredDataProps {
  city?: string;
  country?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const BUSINESS_NAME = "Team Celular";
const PHONE_NUMBER = "+54 11 5103-4595";
const EMAIL = "teamcelular.arg@gmail.com";
const ADDRESS_STREET = "Paraguay 2451";
const ADDRESS_CITY = "Ciudad Autónoma de Buenos Aires";
const ADDRESS_REGION = "CABA";
const ADDRESS_POSTAL = "C1121";
const ADDRESS_COUNTRY = "AR";
const SERVICE_AREA = ["Recoleta", "Palermo", "Balvanera", "Almagro"];
const KEY_SERVICES = [
  "Reparación de celulares en el día",
  "Cambio de pantalla y baterías originales",
  "Microelectrónica y reballing de placas",
  "Soporte técnico para empresas y gremios",
];
const BREADCRUMB_ITEMS = [
  { name: "Inicio", url: SITE_URL },
  { name: "Servicios", url: `${SITE_URL}/presupuesto-reparacion` },
  { name: "Tienda", url: `${SITE_URL}/tienda` },
].filter(item => item.name && item.url && item.name.trim() && item.url.trim());
const SAME_AS = [
  "https://www.instagram.com/teamcelular.arg/",
  "https://www.facebook.com/TeamCelular/",
  "https://wa.me/5491151034595",
  "https://www.linkedin.com/company/teamcelular/",
  "https://maps.app.goo.gl/UjykhdoBFv4GmX7K8",
];

const FAQ_ITEMS = [
  {
    question: "¿Cuánto tarda la reparación de un celular?",
    answer:
      "La mayoría de las reparaciones se resuelven en el día gracias a nuestro laboratorio equipado y stock de repuestos originales.",
  },
  {
    question: "¿Ofrecen garantía sobre las reparaciones?",
    answer:
      "Sí, todas las reparaciones cuentan con garantía escrita sobre mano de obra y repuestos colocados.",
  },
  {
    question: "¿Atienden empresas y gremios?",
    answer:
      "Brindamos soporte técnico presencial y remoto para empresas, gremios y service partners con acuerdos mensuales.",
  },
  {
    question: "¿Puedo pedir presupuesto por WhatsApp?",
    answer:
      "Sí, recibimos consultas las 24 hs por WhatsApp al +54 9 11 5103-4595 y respondemos con los pasos a seguir.",
  },
];

function createLocalBusinessJson(city?: string, country?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "@id": `${SITE_URL}#localbusiness`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description:
      "Servicio técnico profesional de reparación de celulares, tablets y notebooks con garantía, repuestos originales y soluciones exprés.",
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/icon.ico`,
    telephone: PHONE_NUMBER,
    email: EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: city ?? ADDRESS_CITY,
      addressRegion: ADDRESS_REGION,
      postalCode: ADDRESS_POSTAL,
      addressCountry: country ?? ADDRESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.597528,
      longitude: -58.403048,
    },
    hasMap: "https://maps.app.goo.gl/3rCgYamQ4e9S4WkA9",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE_NUMBER,
        email: EMAIL,
        areaServed: SERVICE_AREA,
        availableLanguage: ["es", "en"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:30",
        closes: "18:00",
      },
    ],
    sameAs: SAME_AS,
    makesOffer: KEY_SERVICES.filter(service => service && service.trim()).map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        providerMobility: "stationary",
        serviceType: service,
        areaServed: SERVICE_AREA,
      },
      availability: {
        "@type": "ItemAvailability",
        name: "InStoreOnly",
      },
      url: `${SITE_URL}/presupuesto-reparacion`,
    })),
    serviceArea: SERVICE_AREA.filter(area => area && area.trim()).map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de reparaciones de celulares",
      itemListElement: KEY_SERVICES.filter(service => service && service.trim()).map((service) => ({
        "@type": "OfferCatalog",
        name: service,
      })),
    },
  };
}

function createServiceJson() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}#cellphone-repair-service`,
    name: "Reparación profesional de celulares en CABA",
    serviceType: "Reparación de celulares y microelectrónica",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: PHONE_NUMBER,
    },
    areaServed: SERVICE_AREA,
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/presupuesto-reparacion`,
      eligibleRegion: SERVICE_AREA,
      businessFunction: "ProvideService",
    },
    termsOfService: `${SITE_URL}/sobrenosotros`,
  };
}

function createFaqJson() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}#faq`,
    mainEntity: FAQ_ITEMS.filter(item => item && item.question && item.answer).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function createAiDiscoveryJson() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description:
      "Sitio oficial de Team Celular, especialistas en reparación de smartphones, tablets y notebooks en Buenos Aires.",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${SITE_URL}/tienda?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ContactAction",
        name: "Solicitar presupuesto de reparación",
        target: `${SITE_URL}/presupuesto-reparacion`,
        "query-input": "optional name=servicio",
      },
    ],
    inLanguage: "es",
    sameAs: SAME_AS,
    knowsAbout: [
      "reparación de celulares",
      "reballing de placas",
      "soporte técnico para empresas",
      "service técnico express",
    ],
  };
}

function createBreadcrumbJson() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}#breadcrumb`,
    itemListElement: BREADCRUMB_ITEMS.filter(item => item && item.name && item.url).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default function StructuredData({
  city,
  country,
}: StructuredDataProps) {
  const data = [
    createLocalBusinessJson(city, country),
    createServiceJson(),
    createFaqJson(),
    createBreadcrumbJson(),
    createAiDiscoveryJson(),
  ];

  return (
    <>
      {data.filter(entry => entry && (entry["@id"] || entry["@type"])).map((entry) => (
        <script
          key={entry["@id"] ?? entry["@type"] ?? Math.random()}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry),
          }}
        />
      ))}
    </>
  );
}

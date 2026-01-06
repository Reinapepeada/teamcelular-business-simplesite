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
const SERVICE_AREA = ["Ciudad Autónoma de Buenos Aires (CABA)"];
const KEY_SERVICES = [
  "Cambio de batería",
  "Cambio de módulo display / pantalla",
  "Cambio de pin / ficha de carga",
  "Reparación de placa (microelectrónica)",
  "Cambio de flex de carga y flex de botón encendido",
  "Cambio de tapa trasera",
];
const SAME_AS = [
  "https://www.instagram.com/teamcelular.arg/",
  "https://www.facebook.com/TeamCelular/",
  "https://wa.me/5491151034595",
  "https://www.linkedin.com/company/teamcelular/",
  "https://maps.app.goo.gl/UjykhdoBFv4GmX7K8",
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
      availability: "https://schema.org/InStoreOnly",
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
      eligibleRegion: SERVICE_AREA.map((area) => ({ "@type": "AdministrativeArea", name: area })),
      businessFunction: "https://schema.org/ProvideService",
    },
    termsOfService: `${SITE_URL}/sobrenosotros`,
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
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/tienda?search={search_term_string}`,
        },
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

export default function StructuredData({
  city,
  country,
}: StructuredDataProps) {
  const data = [
    createLocalBusinessJson(city, country),
    createServiceJson(),
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

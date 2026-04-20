interface StructuredDataProps {
  city?: string;
  country?: string;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const BUSINESS_NAME = "Team Celular";
const PHONE_NUMBER = "+54 11 5103-4595";
const EMAIL = "teamcelular.arg@gmail.com";
const ADDRESS_STREET = "Paraguay 2451";
const ADDRESS_CITY = "Ciudad Autonoma de Buenos Aires";
const ADDRESS_REGION = "CABA";
const ADDRESS_POSTAL = "C1121";
const ADDRESS_COUNTRY = "AR";
const SERVICE_AREA = ["Ciudad Autonoma de Buenos Aires", "Recoleta"];
const GOOGLE_MAPS_PROFILE_URL = "https://maps.app.goo.gl/krFJfjDA4CuR83BK9";
const SAME_AS = [
  "https://www.instagram.com/teamcelular.arg/",
  "https://www.facebook.com/TeamCelular/",
  "https://wa.me/5491151034595",
  "https://www.linkedin.com/company/teamcelular/",
  GOOGLE_MAPS_PROFILE_URL,
];

function createLocalBusinessJson(city?: string, country?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/icon.ico`,
    description:
      "Servicio tecnico especializado en reparacion de celulares, microelectronica y venta de accesorios en Recoleta, CABA.",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:30",
        closes: "18:00",
      },
    ],
    hasMap: GOOGLE_MAPS_PROFILE_URL,
    sameAs: SAME_AS,
    areaServed: SERVICE_AREA.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  };
}

function createOrganizationJson() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.ico`,
    email: EMAIL,
    telephone: PHONE_NUMBER,
    sameAs: SAME_AS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE_NUMBER,
        email: EMAIL,
        areaServed: "AR",
        availableLanguage: ["es", "en"],
      },
    ],
  };
}

function createWebsiteJson() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    inLanguage: "es-AR",
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
        "@type": "CommunicateAction",
        target: `${SITE_URL}/contacto`,
        name: "Consultar servicio tecnico",
      },
    ],
  };
}

export default function StructuredData({
  city,
  country,
}: StructuredDataProps) {
  const data = [
    createOrganizationJson(),
    createWebsiteJson(),
    createLocalBusinessJson(city, country),
  ];

  return (
    <>
      {data.map((entry) => (
        <script
          key={entry["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry),
          }}
        />
      ))}
    </>
  );
}

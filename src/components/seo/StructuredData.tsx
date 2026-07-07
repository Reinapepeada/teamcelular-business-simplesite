import { BRANCHES, BUSINESS_PROFILE, SITE_URL, absoluteUrl, businessId } from "@/lib/businessProfile";

interface StructuredDataProps {
  city?: string;
  country?: string;
}

function createLocalBusinessJson(city?: string, country?: string) {
  const ratingValue = process.env.NEXT_PUBLIC_GOOGLE_RATING ? Number(process.env.NEXT_PUBLIC_GOOGLE_RATING) : null;
  const ratingCount = process.env.NEXT_PUBLIC_GOOGLE_RATING_COUNT ? Number(process.env.NEXT_PUBLIC_GOOGLE_RATING_COUNT) : null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId("localbusiness"),
    additionalType: [
      "https://schema.org/ElectronicsStore",
      "https://schema.org/ProfessionalService",
    ],
    name: BUSINESS_PROFILE.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/icon.ico`,
    description:
      "Laboratorio tecnico especializado en reparacion de celulares, microelectronica, reballing BGA, recuperacion por liquido y venta de repuestos en Recoleta y Belgrano, CABA.",
    telephone: BUSINESS_PROFILE.phone,
    email: BUSINESS_PROFILE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_PROFILE.primaryAddress.street,
      addressLocality: city ?? BUSINESS_PROFILE.primaryAddress.locality,
      addressRegion: BUSINESS_PROFILE.primaryAddress.region,
      postalCode: BUSINESS_PROFILE.primaryAddress.postalCode,
      addressCountry: country ?? BUSINESS_PROFILE.primaryAddress.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_PROFILE.primaryAddress.latitude,
      longitude: BUSINESS_PROFILE.primaryAddress.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS_PROFILE.hours.days,
        opens: BUSINESS_PROFILE.hours.opens,
        closes: BUSINESS_PROFILE.hours.closes,
      },
    ],
    hasMap: BUSINESS_PROFILE.primaryAddress.mapUrl,
    sameAs: BUSINESS_PROFILE.sameAs,
    knowsAbout: BUSINESS_PROFILE.knowsAbout,
    areaServed: BUSINESS_PROFILE.serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
    department: BRANCHES.map((branch) => ({
      "@type": "LocalBusiness",
      "@id": `${absoluteUrl(branch.url)}#localbusiness`,
      name: branch.name,
      url: absoluteUrl(branch.url),
      telephone: branch.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.street,
        addressLocality: branch.neighborhood,
        addressRegion: branch.region,
        postalCode: branch.postalCode,
        addressCountry: branch.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: branch.latitude,
        longitude: branch.longitude,
      },
      hasMap: branch.mapUrl,
    })),
    ...(ratingValue && ratingCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            reviewCount: ratingCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

function createOrganizationJson() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": businessId("organization"),
    name: BUSINESS_PROFILE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.ico`,
    email: BUSINESS_PROFILE.email,
    telephone: BUSINESS_PROFILE.phone,
    sameAs: BUSINESS_PROFILE.sameAs,
    knowsAbout: BUSINESS_PROFILE.knowsAbout,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: BUSINESS_PROFILE.phone,
        email: BUSINESS_PROFILE.email,
        areaServed: "AR",
        availableLanguage: ["es-AR", "en"],
      },
    ],
  };
}

function createWebsiteJson() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": businessId("website"),
    url: SITE_URL,
    name: BUSINESS_PROFILE.name,
    inLanguage: "es-AR",
    publisher: { "@id": businessId("organization") },
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

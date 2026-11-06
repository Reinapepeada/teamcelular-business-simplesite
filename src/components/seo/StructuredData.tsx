"use client";

import { usePathname } from "next/navigation";
import { BRANCHES, BUSINESS_PROFILE, LOGO, ORGANIZATION_ADDRESS, SITE_URL, TECHNICAL_AUTHOR, branchId, branchLocalBusiness, businessId } from "@/lib/businessProfile";

// La marca es una Organization; cada sucursal es su propio LocalBusiness.
// En la ficha de una sucursal, esa página ya publica su LocalBusiness: acá solo se referencia.
function createOrganizationJson(isBranchPage: boolean) {
  const includeContact = !isBranchPage;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": businessId("organization"),
    name: BUSINESS_PROFILE.name,
    alternateName: BUSINESS_PROFILE.alternateName,
    description: BUSINESS_PROFILE.description,
    disambiguatingDescription: BUSINESS_PROFILE.disambiguatingDescription,
    url: SITE_URL,
    image: LOGO.url,
    // Las fichas de sucursal conservan su propia dirección y teléfono.
    address: includeContact ? ORGANIZATION_ADDRESS : undefined,
    logo: {
      "@type": "ImageObject",
      url: LOGO.url,
      width: LOGO.width,
      height: LOGO.height,
    },
    email: BUSINESS_PROFILE.email,
    telephone: includeContact ? BUSINESS_PROFILE.phone : undefined,
    sameAs: BUSINESS_PROFILE.sameAs,
    knowsAbout: BUSINESS_PROFILE.knowsAbout,
    areaServed: { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
    department: BRANCHES.map((branch) => (isBranchPage ? { "@id": branchId(branch) } : branchLocalBusiness(branch))),
    founder: {
      "@type": "Person",
      "@id": businessId("technical-author"),
      name: TECHNICAL_AUTHOR.name,
      jobTitle: TECHNICAL_AUTHOR.jobTitle,
      url: TECHNICAL_AUTHOR.url,
      sameAs: TECHNICAL_AUTHOR.sameAs,
    },
    contactPoint: includeContact ? [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: BUSINESS_PROFILE.phone,
        email: BUSINESS_PROFILE.email,
        areaServed: "AR",
        availableLanguage: ["es-AR", "en"],
      },
    ] : undefined,
  };
}

function createWebsiteJson() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": businessId("website"),
    url: SITE_URL,
    name: BUSINESS_PROFILE.name,
    alternateName: BUSINESS_PROFILE.alternateName,
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

export default function StructuredData() {
  const pathname = usePathname();
  // Las páginas de sucursal ya publican su LocalBusiness en el servidor.
  const isBranchPage = BRANCHES.some((branch) => branch.url === pathname);
  const data = [createOrganizationJson(isBranchPage), createWebsiteJson()];

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

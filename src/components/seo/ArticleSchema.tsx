import React from "react";
import { BUSINESS_PROFILE, TECHNICAL_AUTHOR, businessId } from "@/lib/businessProfile";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  authorName: string;
  image: string;
  url: string;
  reviewedByName?: string;
  about?: string[];
}

export default function ArticleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  image,
  url,
  reviewedByName = BUSINESS_PROFILE.technicalReviewer.name,
  about = BUSINESS_PROFILE.knowsAbout.slice(0, 6),
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description: description,
    image: image,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    // Persona real con perfil verificable: la autoria anonima es señal debil
    // tanto para Google como para los motores de IA.
    author: {
      "@type": "Person",
      "@id": businessId("technical-author"),
      name: TECHNICAL_AUTHOR.name,
      jobTitle: TECHNICAL_AUTHOR.jobTitle,
      description: TECHNICAL_AUTHOR.description,
      url: TECHNICAL_AUTHOR.url,
      sameAs: TECHNICAL_AUTHOR.sameAs,
      knowsAbout: TECHNICAL_AUTHOR.knowsAbout,
      worksFor: { "@id": businessId("organization") },
    },
    reviewedBy: {
      "@type": "Organization",
      "@id": businessId("technical-reviewer"),
      name: reviewedByName,
      description: BUSINESS_PROFILE.technicalReviewer.description,
      knowsAbout: BUSINESS_PROFILE.knowsAbout,
    },
    about,
    mentions: [
      { "@type": "Thing", name: "Garantia escrita de 90 dias" },
      { "@type": "Thing", name: "Diagnostico tecnico de celulares" },
      { "@type": "Thing", name: "Microelectronica de celulares" },
    ],
    publisher: {
      "@type": "Organization",
      "@id": businessId("organization"),
      name: "Team Celular",
      logo: {
        "@type": "ImageObject",
        url: "https://teamcelular.com/icon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

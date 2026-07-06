import React from "react";
import { BUSINESS_PROFILE, businessId } from "@/lib/businessProfile";

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
    author: {
      "@type": "Organization",
      "@id": businessId("organization"),
      name: authorName,
      sameAs: BUSINESS_PROFILE.sameAs,
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

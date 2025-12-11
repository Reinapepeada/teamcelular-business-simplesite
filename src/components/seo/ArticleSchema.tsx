import React from "react";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  authorName: string;
  image: string;
  url: string;
}

export default function ArticleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  image,
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
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

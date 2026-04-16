import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://teamcelular.com";
const DEFAULT_SITE_NAME = "Team Celular";
const DEFAULT_LOCALE = "es_AR";
const DEFAULT_OG_IMAGE_PATH = "/opengraph-image.png";

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
}

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_BASE_URL?.trim() || FALLBACK_SITE_URL);
}

export function toAbsoluteUrl(pathOrUrl: string, siteUrl = getSiteUrl()) {
  if (isAbsoluteUrl(pathOrUrl)) {
    return pathOrUrl;
  }

  if (pathOrUrl === "/") {
    return siteUrl;
  }

  return `${siteUrl}/${pathOrUrl.replace(/^\/+/, "")}`;
}

type BuildWebsiteMetadataInput = {
  path: string;
  title: string;
  description: string;
  siteUrl?: string;
  siteName?: string;
  keywords?: string[];
  locale?: string;
  ogType?: "website" | "article";
  robots?: Metadata["robots"];
  canonical?: string;
  languages?: Record<string, string>;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImagePath?: string;
  openGraphImageAlt?: string;
  twitterTitle?: string;
  twitterDescription?: string;
};

export function buildWebsiteMetadata({
  path,
  title,
  description,
  siteUrl,
  siteName = DEFAULT_SITE_NAME,
  keywords,
  locale = DEFAULT_LOCALE,
  ogType = "website",
  robots,
  canonical,
  languages,
  openGraphTitle,
  openGraphDescription,
  openGraphImagePath = DEFAULT_OG_IMAGE_PATH,
  openGraphImageAlt,
  twitterTitle,
  twitterDescription,
}: BuildWebsiteMetadataInput): Metadata {
  const resolvedSiteUrl = normalizeSiteUrl(siteUrl || getSiteUrl());
  const canonicalUrl = toAbsoluteUrl(canonical || path, resolvedSiteUrl);
  const imageUrl = toAbsoluteUrl(openGraphImagePath, resolvedSiteUrl);

  const alternatesLanguages = languages
    ? Object.fromEntries(
        Object.entries(languages).map(([languageKey, languagePath]) => [
          languageKey,
          toAbsoluteUrl(languagePath, resolvedSiteUrl),
        ]),
      )
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      ...(alternatesLanguages ? { languages: alternatesLanguages } : {}),
    },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: ogType,
      locale,
      url: canonicalUrl,
      siteName,
      title: openGraphTitle || title,
      description: openGraphDescription || description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: openGraphImageAlt || `${siteName} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle || openGraphTitle || title,
      description: twitterDescription || openGraphDescription || description,
      images: [imageUrl],
    },
  };
}

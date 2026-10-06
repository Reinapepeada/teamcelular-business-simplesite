import { getSiteUrl } from "@/lib/seoMetadata";

/**
 * VideoObject para material filmado en el laboratorio. Solo se emite para
 * video propio: describir stock footage como contenido del negocio seria
 * declarar algo falso en structured data.
 */
export default function VideoSchema({
  name,
  description,
  contentPath,
  thumbnailPath,
  uploadDate,
  duration,
}: {
  name: string;
  description: string;
  contentPath: string;
  thumbnailPath: string;
  uploadDate: string;
  duration: string;
}) {
  const siteUrl = getSiteUrl();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name,
          description,
          contentUrl: `${siteUrl}${contentPath}`,
          thumbnailUrl: `${siteUrl}${thumbnailPath}`,
          // ponytail: Google exige zona horaria; fecha sola = "no valido". AR = -03:00.
          uploadDate: uploadDate.includes("T") ? uploadDate : `${uploadDate}T00:00:00-03:00`,
          duration,
        }),
      }}
    />
  );
}

import Image from "next/image";

// Fotos propias del local de Recoleta, las mismas que el negocio publica en su ficha de Google.
const PHOTOS = [
  { src: "tecnico-en-el-banco", width: 1400, height: 1401, alt: "Técnico de Team Celular trabajando en el banco, con la placa ampliada en el monitor", caption: "El banco de trabajo, con la placa ampliada en pantalla." },
  { src: "banco-microscopio", width: 1400, height: 1750, alt: "Banco de laboratorio con microscopio, fuente de alimentación y estación de soldadura", caption: "Microscopio, fuente y estación de soldadura." },
  { src: "microscopio-detalle", width: 1400, height: 1866, alt: "Microscopio estereoscópico con cámara sobre una placa sujeta en el soporte", caption: "Una placa bajo el microscopio." },
  { src: "local-recoleta-interior", width: 1400, height: 788, alt: "Interior del local de Team Celular en Recoleta, con mostrador y accesorios", caption: "El local de Paraguay 2451, Recoleta." },
] as const;

export default function WorkshopGallery({ headingId = "taller-title" }: { headingId?: string }) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="tc-heading text-[#f5f5f7]">¿Cómo es el taller por dentro?</h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PHOTOS.map((photo) => (
          <li key={photo.src}>
            <figure>
              <Image
                src={`/images/taller/${photo.src}.webp`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 270px, 50vw"
                className="aspect-[4/5] w-full rounded-[28px] object-cover"
              />
              <figcaption className="mt-2 text-sm text-[#a1a1a6]">{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

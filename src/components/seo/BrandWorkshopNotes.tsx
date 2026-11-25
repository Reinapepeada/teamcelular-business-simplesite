import Image from "next/image";

export type BrandWorkshop = {
  /** Cifras de órdenes propias; `period` dice de cuándo son. */
  stats: { value: string; label: string }[];
  period: string;
  intro: string;
  notes: { title: string; description: string }[];
  photo?: { src: string; alt: string; caption: string; width: number; height: number };
};

// Frase del taller, escrita con el negocio el 25/11/2026.
const WORKSHOP_MOTTO = "Primero te decimos qué tiene y cuánto sale. Después decidís vos.";

/** Lo que el taller ve en una marca: cifras, avisos y foto propios, no texto de plantilla. */
export default function BrandWorkshopNotes({ brand, workshop }: { brand: string; workshop: BrandWorkshop }) {
  const { photo } = workshop;
  return (
    <section aria-labelledby="desde-el-taller">
      <p className="tc-eyebrow">Desde el taller</p>
      <h2 id="desde-el-taller" className="tc-heading mt-3 !text-[clamp(1.5rem,3.5vw,2.25rem)]">
        Lo que vemos en {brand}
      </h2>
      <p className="mt-4 max-w-[65ch] text-[17px] leading-relaxed text-[#a1a1a6]">{workshop.intro}</p>

      <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
        {workshop.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="mt-2 max-w-[14rem] text-sm leading-5 text-[#a1a1a6]">{stat.label}</dt>
            <dd className="text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-none tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-[#86868b]">Órdenes de Team Celular {workshop.period}.</p>

      <div className={`mt-10 grid gap-8 ${photo ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-start" : ""}`}>
        <ol className="divide-y divide-[#333336] border-y border-[#333336]">
          {workshop.notes.map((note, index) => (
            <li key={note.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-5">
              <span aria-hidden className="pt-0.5 text-sm tabular-nums text-[#86868b]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold leading-snug">{note.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-[#a1a1a6]">{note.description}</p>
              </div>
            </li>
          ))}
        </ol>
        {photo ? (
          <figure>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-auto w-full rounded-[28px]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-[#86868b]">{photo.caption}</figcaption>
          </figure>
        ) : null}
      </div>

      <blockquote className="mt-10 border-l-2 border-[var(--tc-action)] pl-5">
        <p className="text-[19px] font-semibold leading-snug">{WORKSHOP_MOTTO}</p>
        <footer className="mt-2 text-sm text-[#a1a1a6]">
          Equipo técnico de Team Celular, liderado por Alejandro Biarrieta
        </footer>
      </blockquote>
      <p className="mt-6 text-sm text-[#a1a1a6]">
        Tomamos cualquier falla, salvo desbloqueos y equipos bloqueados por cuenta.
      </p>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    BsCheck2Circle,
    BsGeoAlt,
    BsLinkedin,
    BsMortarboard,
} from "react-icons/bs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { getSiteUrl } from "@/lib/seoMetadata";
import { BRANCHES, BUSINESS_PROFILE, TECHNICAL_AUTHOR, businessId } from "@/lib/businessProfile";

export const metadata: Metadata = {
    title: "Sobre Team Celular | Laboratorio en Recoleta, CABA",
    description:
        "Team Celular, Paraguay 2451 Recoleta. Laboratorio familiar, 15+ años en reparación de celulares y microelectrónica con garantía escrita en cada trabajo.",
    keywords: [
        "sobre team celular",
        "empresa familiar reparacion celulares",
        "15 años experiencia técnica",
        "laboratorio microelectronica caba",
        "servicio tecnico certificado",
        "historia team celular",
    ],
    alternates: {
        canonical: "https://teamcelular.com/sobrenosotros",
    },
    openGraph: {
        title: "Sobre Team Celular | Laboratorio de Celulares en Recoleta",
        description:
            "Team Celular, Paraguay 2451 Recoleta CABA. Laboratorio familiar con más de 15 años en reparación de celulares y microelectrónica con garantía escrita.",
        type: "website",
        url: "https://teamcelular.com/sobrenosotros",
        locale: "es_AR",
        images: [
            {
                url: "https://teamcelular.com/images/empresaFamiliar.webp",
                width: 1200,
                height: 630,
                alt: "Team Celular - Empresa Familiar",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sobre Team Celular | Laboratorio en Recoleta, CABA",
        description: "Laboratorio familiar en Paraguay 2451 Recoleta. Más de 15 años en reparación de celulares y microelectrónica con garantía escrita.",
        images: ["https://teamcelular.com/images/empresaFamiliar.webp"],
    },
};

const timeline = [
    {
        year: "2009",
        location: "Venezuela",
        title: "El primer taller",
        description: "Empezamos como un taller familiar de reparación de celulares.",
    },
    {
        year: "2012",
        location: "Venezuela",
        title: "Reparación en placa",
        description: "Sumamos microelectrónica para resolver fallas que otros talleres no tomaban.",
    },
    {
        year: "2015",
        location: "Panamá",
        title: "Segundo país",
        description: "Abrimos una operación en Panamá y ordenamos el método de trabajo y el registro de cada equipo.",
    },
    {
        year: "2018",
        location: "Argentina",
        title: "Llegada a Buenos Aires",
        description: "Instalamos el laboratorio principal en Paraguay 2451, Recoleta.",
    },
    {
        year: "2025",
        location: "Recoleta · Belgrano",
        title: "Segunda sucursal",
        description: "Abrimos Belgrano (Amenábar 2032) para atender más barrios de CABA con el mismo equipo técnico.",
    },
];

const stats = [
    { value: "2009", label: "Año del primer taller" },
    { value: "10.000+", label: "Equipos reparados" },
    { value: "3", label: "Países donde trabajamos" },
    { value: `${BUSINESS_PROFILE.warrantyDays} días`, label: "Garantía escrita" },
];

const method = [
    {
        title: "Diagnóstico antes que cambio",
        description: "Medimos y probamos antes de recomendar. No cambiamos piezas por descarte.",
    },
    {
        title: "Presupuesto antes de avanzar",
        description: "Te explicamos la falla, el costo y el riesgo antes de abrir el equipo.",
    },
    {
        title: "Trabajo bajo microscopio",
        description: "Placa, pin de carga y flex se revisan a nivel componente, con estación de soldadura y protección antiestática.",
    },
    {
        title: "Garantía por escrito",
        description: "90 días sobre el trabajo y el repuesto instalado. El alcance queda detallado al entregar.",
    },
];

export default function SobreNosotrosPage() {
    const SITE_URL = getSiteUrl();
    const initials = TECHNICAL_AUTHOR.name.split(" ").map((part) => part[0]).join("");

    return (
        <section className="w-full max-w-6xl px-6 py-14 pb-24 md:px-8">
            <BreadcrumbJsonLd
                items={[
                    { name: "Inicio", url: `${SITE_URL}/` },
                    { name: "Sobre nosotros", url: `${SITE_URL}/sobrenosotros` },
                ]}
            />

            <header className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <span className="tc-eyebrow">Empresa familiar · desde 2009</span>
                    <h1 className="tc-display mt-6 text-[#f5f5f7]">
                        Más de 15 años reparando celulares, hoy en Recoleta y Belgrano
                    </h1>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#a1a1a6]">
                        Team Celular es un laboratorio familiar de reparación de celulares y
                        microelectrónica con sucursales en Paraguay 2451 (Recoleta) y Amenábar 2032
                        (Belgrano), CABA. Empezamos en 2009 y trabajamos igual desde entonces:
                        diagnóstico antes de cotizar y garantía escrita de 90 días en cada trabajo.
                    </p>
                </div>
                <Image
                    src="/images/empresaFamiliar.webp"
                    alt="La familia que lleva adelante Team Celular, en el local"
                    width={1280}
                    height={960}
                    priority
                    sizes="(min-width: 768px) 480px, 100vw"
                    className="w-full rounded-[28px] object-cover"
                />
            </header>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[#333336] py-8 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <dd className="text-4xl font-semibold tracking-tight text-[#f5f5f7]">{stat.value}</dd>
                        <dt className="mt-1 text-sm text-[#a1a1a6]">{stat.label}</dt>
                    </div>
                ))}
            </dl>

            <section aria-labelledby="fundador-title" className="mt-16 grid gap-8 rounded-[28px] bg-[#1d1d1f] p-8 md:grid-cols-[auto_1fr] md:p-10">
                <div
                    aria-hidden="true"
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#1766f2] to-[#2D2E83] text-3xl font-semibold text-white"
                >
                    {initials}
                </div>
                <div>
                    <h2 id="fundador-title" className="text-2xl font-semibold text-[#f5f5f7]">
                        ¿Quién repara tu celular?
                    </h2>
                    <p className="mt-2 text-[#6aa6ff]">
                        {TECHNICAL_AUTHOR.name} · {TECHNICAL_AUTHOR.jobTitle}
                    </p>
                    <p className="mt-4 max-w-3xl leading-relaxed text-[#a1a1a6]">
                        {TECHNICAL_AUTHOR.description} Firma las guías técnicas de este sitio.
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Formación">
                        {TECHNICAL_AUTHOR.training.map((school) => (
                            <li key={school} className="inline-flex items-center gap-2 rounded-full bg-[#333336] px-4 py-2 text-sm text-[#f5f5f7]">
                                <BsMortarboard aria-hidden="true" className="text-[#6aa6ff]" /> {school}
                            </li>
                        ))}
                    </ul>
                    <a
                        href={TECHNICAL_AUTHOR.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-[#6aa6ff] hover:underline"
                    >
                        <BsLinkedin aria-hidden="true" /> Perfil en LinkedIn
                    </a>
                </div>
            </section>

            <section aria-labelledby="historia-title" className="mt-16">
                <h2 id="historia-title" className="tc-heading text-[#f5f5f7]">¿Cómo llegamos hasta acá?</h2>
                <ol className="mt-10 space-y-10 border-l border-[#333336] pl-8">
                    {timeline.map((event) => (
                        <li key={event.year} className="relative">
                            <span aria-hidden="true" className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#1766f2] ring-4 ring-black" />
                            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                <span className="text-3xl font-semibold tracking-tight text-[#f5f5f7]">{event.year}</span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-[#86868b]">
                                    <BsGeoAlt aria-hidden="true" /> {event.location}
                                </span>
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-[#f5f5f7]">{event.title}</h3>
                            <p className="mt-1 max-w-2xl text-[#a1a1a6]">{event.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section aria-labelledby="metodo-title" className="mt-16">
                <h2 id="metodo-title" className="tc-heading text-[#f5f5f7]">¿Cómo trabajamos?</h2>
                <ol className="mt-8 divide-y divide-[#333336] rounded-[28px] bg-[#1d1d1f] px-8">
                    {method.map((step, index) => (
                        <li key={step.title} className="grid gap-2 py-6 md:grid-cols-[5rem_1fr]">
                            <span aria-hidden="true" className="text-3xl font-semibold tabular-nums text-[#424245]">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-[#f5f5f7]">
                                    <BsCheck2Circle aria-hidden="true" className="text-[#6aa6ff]" /> {step.title}
                                </h3>
                                <p className="mt-1 text-[#a1a1a6]">{step.description}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section aria-labelledby="donde-title" className="mt-16">
                <h2 id="donde-title" className="tc-heading text-[#f5f5f7]">¿Dónde estamos?</h2>
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                    {BRANCHES.map((branch) => (
                        <li key={branch.slug} className="rounded-[28px] bg-[#1d1d1f] p-8">
                            <h3 className="text-xl font-semibold text-[#f5f5f7]">{branch.shortName}</h3>
                            <p className="mt-2 text-[#a1a1a6]">{branch.street}, CABA</p>
                            <p className="mt-1 text-[#a1a1a6]">{BUSINESS_PROFILE.hours.text}, sin turno.</p>
                            <Link href={branch.url} className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#6aa6ff] hover:underline">
                                Cómo llegar →
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-16 rounded-[28px] bg-[#1d1d1f] p-8 text-center">
                <h2 className="text-2xl font-semibold text-[#f5f5f7]">¿Querés conocer el laboratorio?</h2>
                <p className="mx-auto mt-3 max-w-xl text-[#a1a1a6]">
                    Pasá por cualquiera de las dos sucursales y te mostramos cómo trabajamos.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <TrackedCtaLink
                        href="/presupuesto-reparacion#solicitar-presupuesto"
                        ctaName="about_budget"
                        ctaLocation="about_footer"
                        ctaVariant="primary"
                        className="tc-btn tc-btn-primary"
                    >
                        Pedir presupuesto
                    </TrackedCtaLink>
                    <Link href="/lab" className="tc-btn tc-btn-ghost">
                        Ver el laboratorio
                    </Link>
                    <Link href="/guias" className="tc-btn tc-btn-ghost">
                        Guías técnicas
                    </Link>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        name: "Sobre Team Celular",
                        description:
                            "Historia y forma de trabajo de Team Celular, laboratorio familiar con más de 15 años reparando celulares.",
                        url: "https://teamcelular.com/sobrenosotros",
                        // La Organization ya se emite en todas las páginas: se referencia, no se duplica.
                        mainEntity: { "@id": businessId("organization") },
                    }),
                }}
            />
        </section>
    );
}

import Link from "next/link";
import { BsArrowRight, BsGeoAlt } from "react-icons/bs";
import BannerHome from "@/components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import { BRANCHES, BUSINESS_PROFILE } from "@/lib/businessProfile";
import { BUDGET_RESPONSE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata } from "@/lib/seoMetadata";

export const metadata = buildWebsiteMetadata({
    path: "/",
    title: "Reparación de Celulares en CABA | Recoleta y Belgrano | Team Celular",
    description:
        "Reparación de celulares en CABA. Team Celular atiende en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), con diagnóstico el mismo día y garantía escrita de 90 días.",
    keywords: [
        "reparacion de celulares Buenos Aires",
        "reparacion de celulares cerca de mi",
        "arreglo de celulares cerca de mi",
        "servicio tecnico celulares CABA",
        "reparacion de notebooks Buenos Aires",
        "gestion de reparaciones celulares y notebooks",
        "servicio tecnico para empresas",
        "control y diagnostico de equipos",
    ],
    languages: { "es-AR": "/" },
    openGraphTitle: "Reparación de Celulares en CABA | Team Celular",
    openGraphDescription:
        "Team Celular tiene sucursales en Recoleta y Belgrano, CABA. Diagnóstico previo y garantía escrita de 90 días.",
    openGraphImageAlt: "Team Celular — Reparación de celulares en CABA",
    twitterTitle: "Reparación de Celulares en CABA | Team Celular",
    twitterDescription:
        "Recoleta y Belgrano, CABA. Diagnóstico previo y garantía escrita de 90 días. Lun–Vie 10:30–18:00.",
});

const priorityRepairs = [
    {
        title: "Pantalla",
        description: "Vidrio roto, líneas o touch sin respuesta. Confirmamos modelo y calidad de módulo antes de cotizar.",
        href: "/reparaciones/cambio-pantalla-caba",
    },
    {
        title: "Batería",
        description: "Poca autonomía, apagados o temperatura anormal. Primero revisamos el consumo del equipo.",
        href: "/reparaciones/cambio-bateria-caba",
    },
    {
        title: "Puerto de carga",
        description: "Falso contacto, carga lenta o cable que no reconoce. Evitá forzarlo: puede agravar la falla.",
        href: "/reparaciones/cambio-pin-carga-caba",
    },
];

const process = [
    { title: "Contanos la falla", description: "Con marca y modelo podemos orientarte y derivarte a la sucursal correcta." },
    { title: "Revisamos el equipo", description: "El diagnóstico define qué conviene reparar, qué se reemplaza y cuánto demora." },
    { title: "Decidís con el presupuesto", description: "Avanzamos después de explicarte el trabajo. La reparación queda documentada." },
];

const faqs = [
    {
        question: "¿Qué marcas reparan?",
        answer: "Trabajamos con iPhone, Samsung, Motorola, Xiaomi y la mayoría de las marcas actuales. Si tu modelo es poco común, consultanos disponibilidad antes de acercarte.",
    },
    {
        question: "¿Hacen retiro dentro de CABA?",
        answer: "Podemos coordinar retiro y entrega en CABA según la zona y la disponibilidad operativa del día.",
    },
    { question: "¿Cuánto tarda un presupuesto?", answer: BUDGET_RESPONSE_MESSAGE },
];

const primaryCta =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2d2e83] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#22236b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d2e83]";
const secondaryCta =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:border-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d2e83] dark:border-slate-600 dark:bg-slate-900 dark:text-white";

export default function Home() {
    return (
        <div className="w-full bg-[#f7f8fc] text-slate-950 dark:bg-slate-950 dark:text-white">
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-20 px-4 py-5 sm:px-6 md:py-8 lg:px-8 lg:pb-20">
                <BannerHome />

                <section aria-labelledby="repairs-title" className="grid gap-7 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12">
                    <div>
                        <h2 id="repairs-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
                            Empezá por lo que le pasa al equipo
                        </h2>
                        <p className="mt-4 max-w-md text-pretty leading-7 text-slate-600 dark:text-slate-300">
                            Estas son las consultas más frecuentes. Si la falla no encaja, no adivines: escribinos y la revisamos.
                        </p>
                    </div>
                    <div className="divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
                        {priorityRepairs.map((repair) => (
                            <Link key={repair.href} href={repair.href} className="group grid gap-2 py-5 transition hover:bg-white/70 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-5 sm:px-4 dark:hover:bg-slate-900">
                                <h3 className="text-xl font-bold">{repair.title}</h3>
                                <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{repair.description}</p>
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2d2e83] text-white transition group-hover:translate-x-1" aria-hidden>
                                    <BsArrowRight />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="evidence-title" className="space-y-7">
                    <div className="max-w-3xl">
                        <h2 id="evidence-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
                            Un laboratorio se reconoce por cómo trabaja
                        </h2>
                        <p className="mt-4 text-pretty text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Herramientas, repuestos y atención forman parte del mismo servicio. Estas imágenes muestran el tipo de trabajo que hacemos todos los días.
                        </p>
                    </div>
                    <BannerCards />
                </section>

                <section aria-labelledby="process-title" className="overflow-hidden bg-white dark:bg-slate-900 lg:grid lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="bg-[#2d2e83] p-7 text-white sm:p-9 lg:p-12">
                        <h2 id="process-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
                            Diagnóstico primero. Reparación después.
                        </h2>
                        <p className="mt-5 max-w-lg text-pretty leading-7 text-[#dedfff]">
                            No hace falta que conozcas el nombre técnico de la falla. Necesitamos saber qué equipo tenés, qué ocurrió y cómo se comporta.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="home_process_budget" ctaLocation="home_process" ctaVariant="primary" className="inline-flex min-h-12 items-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#2d2e83] transition hover:bg-[#f0f1ff]">
                                Contar la falla
                            </TrackedCtaLink>
                            <BranchWhatsAppButton ctaName="home_process_whatsapp" ctaLocation="home_process" message="Hola Team Celular, quiero consultar por una falla." className="inline-flex min-h-12 items-center rounded-lg border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                                Consultar por WhatsApp
                            </BranchWhatsAppButton>
                        </div>
                    </div>
                    <ol className="divide-y divide-slate-200 p-7 sm:p-9 lg:p-12 dark:divide-slate-700">
                        {process.map((step, index) => (
                            <li key={step.title} className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]">
                                <span className="text-2xl font-extrabold text-[#2d2e83] dark:text-[#aebaff]">0{index + 1}</span>
                                <div>
                                    <h3 className="text-xl font-bold">{step.title}</h3>
                                    <p className="mt-2 max-w-xl leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section aria-label="Compromisos del servicio" className="grid border-y border-slate-300 py-8 md:grid-cols-3 md:divide-x md:divide-slate-300 dark:border-slate-700 dark:divide-slate-700">
                    {[
                        ["Garantía escrita", `${BUSINESS_PROFILE.warrantyDays} días sobre el trabajo realizado.`],
                        ["Respuesta concreta", BUSINESS_PROFILE.responseWindow.replace(/^hasta/, "Hasta") + "."],
                        ["Dos sucursales", "Recoleta y Belgrano, con contacto directo."],
                    ].map(([title, copy]) => (
                        <div key={title} className="px-0 py-4 first:pt-0 last:pb-0 md:px-7 md:py-0 md:first:pl-0 md:last:pr-0">
                            <h3 className="text-lg font-bold">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{copy}</p>
                        </div>
                    ))}
                </section>

                {/* @ts-expect-error Async Server Component */}
                <GoogleReviewsAPI />

                <section aria-labelledby="branches-title" className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                    <div>
                        <h2 id="branches-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">Elegí la sucursal que te quede mejor</h2>
                        <p className="mt-4 max-w-md leading-7 text-slate-600 dark:text-slate-300">Las dos atienden de {BUSINESS_PROFILE.hours.text.toLowerCase()}. Escribí antes de venir para confirmar repuesto y disponibilidad.</p>
                        <TrackedCtaLink href="/sucursales" ctaName="home_all_branches" ctaLocation="home_branches" ctaVariant="secondary" className={`${secondaryCta} mt-6`}>
                            Ver sucursales y mapas <BsArrowRight aria-hidden />
                        </TrackedCtaLink>
                    </div>
                    <div className="divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
                        {BRANCHES.map((branch) => (
                            <article key={branch.slug} className="grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                                <div className="flex gap-4">
                                    <BsGeoAlt className="mt-1 shrink-0 text-xl text-[#2d2e83] dark:text-[#aebaff]" aria-hidden />
                                    <div>
                                        <h3 className="text-xl font-bold">{branch.shortName}</h3>
                                        <p className="mt-1 text-slate-600 dark:text-slate-300">{branch.street}, CABA</p>
                                    </div>
                                </div>
                                <Link href={branch.url} className="inline-flex min-h-11 items-center gap-2 font-bold text-[#2d2e83] hover:underline dark:text-[#aebaff]">Ver detalles <BsArrowRight aria-hidden /></Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="faq-title" className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
                    <h2 id="faq-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">Antes de traer el equipo</h2>
                    <div className="divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
                        {faqs.map((faq) => (
                            <article key={faq.question} className="grid gap-3 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                                <h3 className="font-bold">{faq.question}</h3>
                                <p className="leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="zones-title" className="grid gap-6 bg-[#171820] p-7 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
                    <div>
                        <h2 id="zones-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">¿Buscás reparación cerca de tu zona?</h2>
                        <p className="mt-4 max-w-3xl text-pretty leading-7 text-slate-300">Atendemos consultas de Recoleta, Belgrano, Palermo, Almagro, Caballito, Balvanera y Microcentro. La mejor sucursal depende de tu recorrido y de la falla.</p>
                    </div>
                    <TrackedCtaLink href="/reparacion-de-celulares-cerca-de-mi" ctaName="home_near_me" ctaLocation="home_zones" ctaVariant="secondary" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#171820] transition hover:bg-slate-100">
                        Ver cobertura <BsArrowRight aria-hidden />
                    </TrackedCtaLink>
                </section>

                <KnowledgeGrid />

                <section aria-labelledby="final-cta-title" className="flex flex-col gap-7 border-t-4 border-[#2d2e83] bg-white p-7 sm:p-9 lg:flex-row lg:items-end lg:justify-between lg:p-12 dark:bg-slate-900">
                    <div>
                        <h2 id="final-cta-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">Contanos qué le pasa. Te decimos cómo seguir.</h2>
                        <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">Incluí marca, modelo y falla. Si podés, sumá una foto. Respondemos {BUSINESS_PROFILE.responseWindow}.</p>
                    </div>
                    <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="home_bottom_budget" ctaLocation="home_bottom" ctaVariant="primary" className={primaryCta}>
                        Pedir presupuesto <BsArrowRight aria-hidden />
                    </TrackedCtaLink>
                </section>
            </div>
        </div>
    );
}

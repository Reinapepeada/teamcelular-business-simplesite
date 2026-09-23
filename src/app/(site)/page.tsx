import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import BannerHome from "@/components/banners/BannerHome";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import BranchMap from "@/components/cards/BranchMap";
import { BRANCHES, BUSINESS_PROFILE } from "@/lib/businessProfile";
import { BUDGET_RESPONSE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata } from "@/lib/seoMetadata";
import { GOOGLE_RATING_FALLBACK } from "@/lib/googleReviews";
import { BRAND_REPAIR_PRICES, formatArsPrice } from "@/lib/repairPrices";
import { IPHONE_MODELS } from "@/app/(site)/reparaciones/iphone/iphoneModels";

// Precios citables de la home: salen de las mismas fuentes que las tablas.
const iphone13 = IPHONE_MODELS.find((m) => m.slug === "13");
const samsungA = BRAND_REPAIR_PRICES.samsung[0];
const motoG = BRAND_REPAIR_PRICES.motorola[0];

export const metadata = buildWebsiteMetadata({
    path: "/",
    title: "Reparación de Celulares en CABA | Team Celular",
    description:
        "Team Celular repara celulares en CABA con diagnóstico el mismo día y garantía escrita de 90 días. Sucursales en Recoleta y Belgrano, sin turno.",
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
    // hreflang reciproco con la version en ingles: sin el par, Google no
    // relaciona las dos paginas y ninguna se muestra al publico correcto.
    languages: { "es-AR": "/", en: "/en/phone-repair-buenos-aires", "x-default": "/" },
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
        question: "¿Tienen servicio técnico de celulares cerca?",
        answer: "Team Celular tiene dos talleres en CABA: Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano). Desde Palermo, Almagro, Balvanera, Caballito o Microcentro estás a entre 10 y 15 minutos de alguno de los dos.",
    },
    {
        question: "¿Dónde arreglar el celular en CABA?",
        answer: "Podés acercarte a cualquiera de las dos sucursales de lunes a viernes de 10:30 a 18:00, sin turno. El diagnóstico se hace el mismo día y te pasamos el presupuesto antes de intervenir el equipo.",
    },
    {
        question: "¿Qué marcas reparan?",
        answer: "Trabajamos con iPhone, Samsung, Motorola, Xiaomi y la mayoría de las marcas actuales. Si tu modelo es poco común, consultanos disponibilidad antes de acercarte.",
    },
    {
        question: "¿Hacen retiro dentro de CABA?",
        answer: "Sí, con moto, de lunes a viernes. Cuesta ARS 15.000 y el horario depende del barrio: escribinos y lo coordinamos.",
    },
    { question: "¿Cuánto tarda un presupuesto?", answer: BUDGET_RESPONSE_MESSAGE },
];

const primaryCta =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2d2e83] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#22236b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d2e83]";

export default function Home() {
    return (
        <div className="w-full bg-[#f7f8fc] text-slate-950 dark:bg-slate-950 dark:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: { "@type": "Answer", text: faq.answer },
                        })),
                    }),
                }}
            />
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-10 px-4 py-5 sm:gap-16 sm:px-6 md:py-8 lg:gap-20 lg:px-8 lg:pb-20">
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

                <section aria-labelledby="prices-title" className="grid gap-7 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12">
                    <h2 id="prices-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
                        ¿Cuánto sale reparar un celular en CABA?
                    </h2>
                    <div>
                        <p className="text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">
                            Más de 15 años reparando celulares, con{" "}
                            {GOOGLE_RATING_FALLBACK.rating.toFixed(1).replace(".", ",")} estrellas en Google sobre{" "}
                            {GOOGLE_RATING_FALLBACK.total} reseñas. Pantalla y batería salen en 2 a 4 horas.
                        </p>
                        <dl className="mt-5 max-w-lg divide-y divide-slate-300 border-y border-slate-300 dark:divide-slate-700 dark:border-slate-700">
                            {[
                                ["Pantalla iPhone 13", iphone13?.screen ? formatArsPrice(iphone13.screen) : "Consultar"],
                                ["Batería iPhone 13", iphone13?.battery ? formatArsPrice(iphone13.battery) : "Consultar"],
                                ["Pantalla Samsung Galaxy A", `desde ${formatArsPrice(samsungA.from)}`],
                                ["Pantalla Motorola Moto G", `desde ${formatArsPrice(motoG.from)}`],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between gap-4 py-3">
                                    <dt className="text-slate-600 dark:text-slate-300">{label}</dt>
                                    <dd className="font-bold tabular-nums">{value}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-[#2d2e83] dark:text-[#aebaff]">
                            <Link href="/guias/reparacion-iphone-buenos-aires#costos-reparacion-iphone" className="hover:underline">Precios de iPhone por modelo</Link>
                            <Link href="/guias/reparacion-samsung-buenos-aires" className="hover:underline">Precios de Samsung</Link>
                            <Link href="/guias/reparacion-motorola-buenos-aires" className="hover:underline">Precios de Motorola</Link>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="process-title" className="overflow-hidden bg-white dark:bg-slate-900 lg:grid lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="bg-[#2d2e83] p-5 text-white sm:p-9 lg:p-12">
                        <h2 id="process-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
                            Diagnóstico primero. Reparación después.
                        </h2>
                        <p className="mt-5 max-w-lg text-pretty leading-7 text-[#dedfff]">
                            No hace falta que conozcas el nombre técnico de la falla. Necesitamos saber qué equipo tenés, qué pasó y cómo se comporta.
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
                    <ol className="divide-y divide-slate-200 p-5 sm:p-9 lg:p-12 dark:divide-slate-700">
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

                <GoogleReviewsAPI />

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

                <section aria-labelledby="locations-title" className="grid gap-6">
                    <div>
                        <h2 id="locations-title" className="text-balance text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">Dónde estamos</h2>
                        <p className="mt-4 max-w-3xl text-pretty leading-7 text-slate-600 dark:text-slate-300">Lunes a viernes de 10:30 a 18:00, sin turno.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {BRANCHES.map((branch) => (
                            <div key={branch.slug} className="flex flex-col gap-3">
                                <BranchMap
                                    address={`${branch.street}, ${branch.neighborhood}, CABA`}
                                    name={branch.shortName}
                                />
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    <span className="font-bold text-slate-900 dark:text-white">{branch.shortName}</span>
                                    {" — "}{branch.street}, {branch.neighborhood}.{" "}
                                    <Link href={branch.url} className="font-semibold text-primary hover:underline">
                                        Cómo llegar
                                    </Link>
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <KnowledgeGrid />

                <section aria-labelledby="final-cta-title" className="flex flex-col gap-7 border-t-4 border-[#2d2e83] bg-white p-5 sm:p-9 lg:flex-row lg:items-end lg:justify-between lg:p-12 dark:bg-slate-900">
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

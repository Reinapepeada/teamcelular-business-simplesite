import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import RepairsForm from "@/components/forms/RepairsForm";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import { BUDGET_RESPONSE_MESSAGE, REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import GuideByline from "@/components/seo/GuideByline";
import { PRICES_UPDATED } from "@/lib/repairPrices";
import { FaWhatsapp } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/presupuesto-reparacion`;

export const metadata = buildWebsiteMetadata({
    path: "/presupuesto-reparacion",
    title: "Presupuesto de Reparación de Celulares | Team Celular",
    description:
        "Presupuesto sin compromiso y garantía escrita de 90 días. Respondemos en 2 h. Team Celular, Recoleta y Belgrano, CABA.",
    keywords: [
        "presupuesto reparación celulares",
        "servicio técnico celulares buenos aires",
        "presupuesto iphone pantalla",
        "arreglo celular recoleta",
        "microelectronica caba",
        "retiro reparación celulares",
    ],
    languages: {
        "es-AR": "/presupuesto-reparacion",
    },
    openGraphTitle:
        "Presupuesto Reparación Celulares en CABA | Team Celular",
    openGraphDescription:
        "Team Celular, dos sucursales en CABA: Paraguay 2451 Recoleta y Amenábar 2032 Belgrano. Respuesta en 2 h por WhatsApp y garantía escrita 90 días.",
    openGraphImageAlt: "Laboratorio de Team Celular en CABA",
    twitterTitle: "Presupuesto Reparación Celulares CABA | Team Celular",
    twitterDescription:
        "Cotizá por WhatsApp en 2 h. Pantalla, batería, carga y microelectrónica. Dos sucursales en CABA: Recoleta y Belgrano. Garantía escrita 90 días.",
});

const processSteps = [
    {
        title: "Nos contás qué le pasa",
        description: "Tocás la falla y, si lo sabés, el modelo. Se abre WhatsApp con el mensaje listo.",
    },
    {
        title: "Te pasamos el precio",
        description: BUDGET_RESPONSE_MESSAGE,
    },
    {
        title: "Lo traés y te lo llevás reparado",
        description:
            "Recoleta (Paraguay 2451) o Belgrano (Amenábar 2032), sin turno. Pantalla y batería salen en 2 a 4 horas, con garantía escrita de 90 días.",
    },
];

const stats = [
    { value: "2 h", label: "para responderte" },
    { value: "2-4 h", label: "pantalla o batería" },
    { value: "90 días", label: "garantía escrita" },
    { value: "15+ años", label: "de trayectoria" },
];

const promises = [
    ["Sin compromiso", "Si no te conviene el precio, no pagás nada por preguntar."],
    ["Sin turno", "Lunes a viernes de 10:30 a 18:00 en las dos sucursales."],
    ["Precio antes de tocarlo", "Nunca intervenimos el equipo sin tu confirmación."],
];

const faqs = [
    {
        question: "¿Cuánto demora el presupuesto?",
        answer: BUDGET_RESPONSE_MESSAGE,
    },
    {
        question: "¿La revisión técnica tiene costo?",
        answer: `Sí. ${REVIEW_COST_MESSAGE} Te lo informamos antes de ingresar el equipo.`,
    },
    {
        question: "¿Qué garantía ofrecen?",
        answer: WARRANTY_SCOPE_MESSAGE,
    },
    {
        question: "¿Puedo mandar fotos o videos de la falla?",
        answer: "Sí. Una vez que se abre WhatsApp podés mandar fotos, videos o audios con lo que le pasa al equipo.",
    },
];

export default function PresupuestoReparacionPage() {
    return (
        <section className="w-full">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6 sm:gap-14 sm:px-6 sm:py-10 lg:px-8">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", url: `${SITE_URL}/` },
                        { name: "Presupuesto", url: PAGE_URL },
                    ]}
                />

                <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Link href="/" className="transition hover:text-primary">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Presupuesto</span>
                </nav>

                <header
                    id="solicitar-presupuesto"
                    className="grid scroll-mt-24 items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-12 lg:gap-y-6"
                >
                    <div className="lg:col-start-1">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
                            Presupuesto de reparación de celulares en CABA
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Decinos qué le pasa a tu celular y te pasamos el precio por WhatsApp en hasta 2 horas.
                            Team Celular repara en{" "}
                            <strong className="text-slate-900 dark:text-slate-100">Paraguay 2451, Recoleta</strong> y{" "}
                            <strong className="text-slate-900 dark:text-slate-100">Amenábar 2032, Belgrano</strong>, con
                            garantía escrita de 90 días.
                        </p>
                    </div>

                    <div className="order-last lg:order-none lg:col-start-1">
                        <ul className="space-y-3">
                            {promises.map(([title, text]) => (
                                <li key={title} className="flex items-start gap-3">
                                    <BsCheckCircleFill
                                        className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400"
                                        aria-hidden
                                    />
                                    <span className="text-slate-700 dark:text-slate-300">
                                        <strong className="text-slate-900 dark:text-slate-100">{title}.</strong> {text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <GuideByline modifiedTime={PRICES_UPDATED} tone="light" />
                        </div>
                    </div>

                    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl lg:col-start-2 lg:row-span-2 lg:row-start-1 dark:border-slate-700/70 dark:bg-slate-900 sm:p-8">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                            Te toma 20 segundos
                        </p>
                        <RepairsForm />
                    </article>
                </header>

                <dl className="grid grid-cols-2 gap-y-6 border-y border-slate-200 py-6 dark:border-slate-700/70 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse text-center">
                            <dt className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</dt>
                            <dd className="text-3xl font-black text-slate-900 dark:text-slate-100">{stat.value}</dd>
                        </div>
                    ))}
                </dl>

                <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
                        ¿Qué pasa después de pedir el presupuesto?
                    </h2>
                    <ol className="divide-y divide-slate-200 dark:divide-slate-700/70">
                        {processSteps.map((step, index) => (
                            <li key={step.title} className="flex gap-5 py-5 first:pt-0">
                                <span className="text-2xl font-black tabular-nums text-primary">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{step.title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
                        Preguntas frecuentes
                    </h2>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700/70">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="group py-4 first:pt-0">
                                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                                    {faq.question}
                                    <span aria-hidden className="text-xl text-primary transition group-open:rotate-45">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col items-start gap-5 rounded-3xl bg-slate-900 p-6 text-white dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                    <div>
                        <h2 className="text-2xl font-bold sm:text-3xl">¿Preferís escribirnos directo?</h2>
                        <p className="mt-2 text-slate-300">Mandanos una foto del equipo y te decimos cuánto sale.</p>
                    </div>
                    <BranchWhatsAppButton
                        ctaName="budget_bottom_whatsapp"
                        ctaLocation="presupuesto_bottom"
                        message="Hola! Necesito un presupuesto."
                        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-500"
                    >
                        <FaWhatsapp aria-hidden />
                        Escribir por WhatsApp
                    </BranchWhatsAppButton>
                </section>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "@id": `${PAGE_URL}#service`,
                            name: "Presupuesto de reparación de celulares en CABA",
                            serviceType:
                                "Presupuesto y diagnóstico de reparación de celulares",
                            url: PAGE_URL,
                            areaServed: [
                                { "@type": "City", name: "Recoleta" },
                                { "@type": "City", name: "CABA" },
                                { "@type": "City", name: "Buenos Aires" },
                            ],
                            provider: { "@id": `${SITE_URL}#localbusiness` },
                            offers: {
                                "@type": "Offer",
                                priceCurrency: "ARS",
                                availability: "https://schema.org/InStock",
                                url: PAGE_URL,
                                description:
                                    "Revision tecnica arancelada. Rango informado antes del ingreso del equipo.",
                                priceSpecification: {
                                    "@type": "PriceSpecification",
                                    priceCurrency: "ARS",
                                    minPrice: 15000,
                                    maxPrice: 25000,
                                },
                            },
                        }),
                    }}
                />


                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((faq) => ({
                                "@type": "Question",
                                name: faq.question,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: faq.answer,
                                },
                            })),
                        }),
                    }}
                />
            </div>
        </section>
    );
}

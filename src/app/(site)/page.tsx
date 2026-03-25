import type { Metadata } from "next";
import Link from "next/link";
import BannerHome from "@/components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";

const SITE_URL =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";

export const metadata: Metadata = {
    title: "Reparacion de celulares en Buenos Aires | Team Celular",
    description:
        "Servicio técnico de celulares y laptops en Recoleta, CABA. Diagnóstico en el día, garantía escrita y atención rápida por WhatsApp.",
    keywords: [
        "reparacion de celulares Buenos Aires",
        "servicio tecnico celulares CABA",
        "reparacion de laptops Buenos Aires",
        "gestion de reparaciones celulares y laptops",
        "servicio tecnico para empresas",
        "control y diagnostico de equipos",
    ],
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: SITE_URL,
        siteName: "Team Celular",
        title: "Reparación de celulares en Buenos Aires | Team Celular",
        description:
            "Diagnóstico en el día, repuestos de calidad y garantía escrita para celulares y laptops.",
        images: [
            {
                url: `${SITE_URL}/opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: "Team Celular - Servicio tecnico en Buenos Aires",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Reparación de celulares en Buenos Aires | Team Celular",
        description:
            "Servicio técnico con garantía escrita y respuesta comercial en menos de 2 horas hábiles.",
        images: [`${SITE_URL}/opengraph-image.png`],
    },
};

const services = [
    {
        title: "Reparacion el mismo dia",
        description:
            "Pantalla rota, bateria que no dura y puerto de carga dañado. La mayoria de las reparaciones se resuelven en el dia.",
    },
    {
        title: "Problemas complejos de placa",
        description:
            "Celulares mojados, que no encienden o con fallas intermitentes. Tenemos microscopio y equipamiento para microelectronica real.",
    },
    {
        title: "Soporte para empresas",
        description:
            "Armamos planes a medida con prioridad operativa, descuentos por volumen y facturacion A para equipos de trabajo.",
    },
];

const differentiators = [
    {
        title: "Garantia escrita",
        description:
            "Cada reparacion sale documentada. Sin letra chica ni promesas vagas.",
    },
    {
        title: "Diagnostico claro",
        description:
            "Explicamos falla, alcance del trabajo y tiempos reales antes de intervenir el equipo.",
    },
    {
        title: "Atencion cercana",
        description:
            "WhatsApp, llamada o visita directa al laboratorio. Respondemos rapido y sin vueltas.",
    },
];

const microFaqs = [
    {
        title: "Tiempo de respuesta",
        question: "Cuanto tardan en contestar un presupuesto online?",
        answer:
            "Respondemos formulario y WhatsApp en menos de 2 horas habiles. Si requiere diagnostico fisico, lo coordinamos el mismo dia.",
    },
    {
        title: "Garantia real",
        question: "Que cubre la garantia escrita?",
        answer:
            "Incluye mano de obra y repuesto por 90 dias. Si falla, lo revisamos sin costo.",
    },
    {
        title: "Stock y repuestos",
        question: "Tienen repuestos para iPhone y Android?",
        answer:
            "Trabajamos con stock de las marcas mas consultadas y conseguimos piezas faltantes segun modelo y disponibilidad.",
    },
];

const faqs = [
    {
        question: "Arreglan todo tipo de celulares?",
        answer:
            "Trabajamos con iPhone, Samsung, Motorola, Xiaomi y la mayoria de las marcas actuales. Si tu modelo es poco comun, te confirmamos disponibilidad antes de avanzar.",
    },
    {
        question: "Hacen retiro dentro de CABA?",
        answer:
            "Podemos coordinar retiro y entrega en CABA segun disponibilidad operativa del dia.",
    },
    {
        question: "Cuanto tarda un presupuesto?",
        answer:
            "En taller, suele ser inmediato. Por WhatsApp o formulario, te respondemos el mismo dia con un estimado y los siguientes pasos.",
    },
];

const primaryCtaClass =
    "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const neutralCtaClass =
    "rounded-full border border-slate-300 dark:border-slate-600 bg-white/85 dark:bg-slate-900/85 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export default function Home() {
    return (
        <section className="flex w-full max-w-[100rem] flex-col items-center gap-16 px-6 py-14 md:px-8 2xl:px-10">
            <BannerHome />
            <BannerCards />

            <section className="w-full max-w-[100rem] space-y-6">
                <div className="flex flex-col gap-3 text-center md:text-left">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/90">
                        Reparaciones que más se piden
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2.35rem]">
                        Lo más buscado, bien explicado y listo para cotizar
                    </h2>
                    <p className="max-w-3xl text-[1.03rem] leading-7 text-slate-600 dark:text-slate-400">
                        Si ya sabés qué le pasa al equipo, entrá directo a la reparación que corresponde. Si no, te ayudamos a elegir sin vueltas.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: "Cambio de pantalla",
                            description:
                                "Cuando el vidrio se rompe, aparecen líneas o el touch deja de responder, esta es la reparación que suele destrabar todo.",
                            href: "/reparaciones/cambio-pantalla-caba",
                            cta: "Ver cambio de pantalla",
                        },
                        {
                            title: "Cambio de batería",
                            description:
                                "Si se apaga antes de tiempo, dura poco o se calienta, esta landing te lleva directo a la solución más común.",
                            href: "/reparaciones/cambio-bateria-caba",
                            cta: "Ver cambio de batería",
                        },
                        {
                            title: "Cambio de pin de carga",
                            description:
                                "Cuando carga solo en cierta posición o hace falso contacto, conviene revisar este punto antes de seguir forzando el cable.",
                            href: "/reparaciones/cambio-pin-carga-caba",
                            cta: "Ver pin de carga",
                        },
                    ].map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-200/75 bg-white/80 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/70 dark:bg-slate-900/75"
                        >
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {item.description}
                            </p>
                            <Link
                                href={item.href}
                                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                            >
                                {item.cta}
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="w-full max-w-[100rem] space-y-12 text-center md:text-left lg:space-y-14">
                <article className="grid gap-10 rounded-2xl border border-slate-200/70 bg-white/70 dark:bg-slate-900/70 p-8 shadow-lg md:grid-cols-2 md:items-center lg:p-10">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-[2.35rem]">
                            Por qué nos eligen en Team Celular
                        </h2>
                        <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                            Somos un laboratorio técnico en Recoleta. Nos
                            tomamos el trabajo en serio: diagnosticamos con
                            criterio, reparamos sin vueltas y explicamos cada
                            paso con palabras claras.
                        </p>
                        <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                            Atendemos celulares de uso personal y también equipos
                            de empresas. Cada trabajo sale con garantía escrita y
                            seguimiento real, no con promesas vacías.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/presupuesto-reparacion"
                                className={primaryCtaClass}
                            >
                                Pedir presupuesto
                            </Link>
                            <Link
                                href="/reparaciones"
                                className={neutralCtaClass}
                            >
                                Ver reparaciones
                            </Link>
                            <Link
                                href="/tecnico-de-celulares"
                                className="rounded-full border border-secondary/60 bg-white/85 dark:bg-slate-900/85 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                            >
                                Técnico de celulares
                            </Link>
                            <Link
                                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparacion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-primary/45 bg-white/85 dark:bg-slate-900/85 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Escribinos por WhatsApp
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white/85 dark:bg-slate-900/85 p-8 shadow-md">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            Que hacemos
                        </h3>
                        <ul className="space-y-4 text-left">
                            {services.map((service) => (
                                <li
                                    key={service.title}
                                    className="rounded-xl border border-slate-200/80 bg-white dark:bg-slate-900 p-4 shadow-sm"
                                >
                                    <h4 className="text-lg font-semibold text-secondary md:text-xl">
                                        {service.title}
                                    </h4>
                                    <p className="mt-2 text-slate-700 dark:text-slate-300">
                                        {service.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>

                <section className="grid gap-6 md:grid-cols-3">
                    {differentiators.map((item, index) => (
                        <article
                            key={item.title}
                            className="relative overflow-hidden rounded-2xl border border-slate-200/75 bg-white/75 dark:bg-slate-900/75 p-6 text-center shadow-md"
                        >
                            <div
                                className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${
                                    index % 2 === 0
                                        ? "bg-gradient-to-r from-primary/70 to-secondary/50"
                                        : "bg-gradient-to-r from-secondary/70 to-primary/50"
                                }`}
                            />
                            <h3 className="text-[1.15rem] font-semibold leading-snug text-primary">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-slate-700 dark:text-slate-300">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white/60 dark:bg-slate-900/60 p-6 shadow-md md:grid-cols-3">
                    {microFaqs.map((item) => (
                        <article
                            key={item.title}
                            className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white dark:bg-slate-900 p-4 text-left shadow-sm"
                        >
                            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                                {item.title}
                            </p>
                            <h3 className="text-[1.03rem] font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                {item.question}
                            </h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {item.answer}
                            </p>
                        </article>
                    ))}
                </section>

                {/* @ts-expect-error Async Server Component */}
                <GoogleReviewsAPI />

                <article className="rounded-2xl border border-slate-200/70 bg-white/70 dark:bg-slate-900/70 p-8 shadow-md lg:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2rem]">
                        Dónde estamos y cómo contactarnos
                    </h2>
                    <div className="mt-6 grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                                Nuestro laboratorio está en Paraguay 2451,
                                Recoleta, con llegada fácil desde Palermo,
                                Belgrano, Caballito, Microcentro y otras zonas
                                de CABA.
                            </p>
                            <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                                Atendemos de lunes a viernes de 10:30 a 18:00 y
                                coordinamos retiros según disponibilidad.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                Vias de contacto
                            </p>
                            <ul className="space-y-2 text-left text-slate-600 dark:text-slate-400">
                                <li>
                                    Tel:{" "}
                                    <Link
                                        href="tel:+541151034595"
                                        className="font-semibold text-primary transition hover:text-secondary"
                                    >
                                        +54 11 5103-4595
                                    </Link>
                                </li>
                                <li>
                                    Email:{" "}
                                    <Link
                                        href="mailto:teamcelular.arg@gmail.com"
                                        className="font-semibold text-primary transition hover:text-secondary"
                                    >
                                        teamcelular.arg@gmail.com
                                    </Link>
                                </li>
                                <li>Laboratorio: Paraguay 2451, Recoleta, CABA.</li>
                                <li>Horario: Lunes a Viernes de 10:30 a 18:00.</li>
                            </ul>
                        </div>
                    </div>
                </article>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2rem]">
                        Preguntas frecuentes sobre reparación de celulares
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {faqs.map((faq) => (
                            <article
                                key={faq.question}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/75 bg-white/80 dark:bg-slate-900/80 p-5 text-left shadow-md lg:p-6"
                            >
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                                </div>
                                <h3 className="text-[1.05rem] font-semibold leading-snug text-secondary">
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                                    {faq.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <KnowledgeGrid />

                <article className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/75 dark:bg-slate-900/75 p-8 text-center shadow-lg md:text-left lg:p-10">
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/8 via-white/70 to-secondary/8" />
                    <h2 className="text-2xl font-bold tracking-tight text-primary md:text-[2rem]">
                        ¿Listo para recuperar tu teléfono?
                    </h2>
                    <p className="mt-4 text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                        Dejanos un mensaje con la falla, elegi tu canal de
                        contacto y coordinamos el siguiente paso sin perder
                        tiempo.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                        <Link
                            href="/contacto"
                            className={primaryCtaClass}
                        >
                            Ver formas de contacto
                        </Link>
                        <Link
                            href="/sobrenosotros"
                            className={neutralCtaClass}
                        >
                            Conoce el taller
                        </Link>
                    </div>
                </article>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "@id": `${SITE_URL}/#faq`,
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
        </section>
    );
}


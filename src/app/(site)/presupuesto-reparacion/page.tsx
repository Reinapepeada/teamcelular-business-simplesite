import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import RepairsForm from "@/components/forms/RepairsForm";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { BUDGET_RESPONSE_MESSAGE, REVIEW_COST_MESSAGE, WARRANTY_SCOPE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";
import {
    FaBatteryHalf,
    FaCamera,
    FaCheckCircle,
    FaClock,
    FaClipboardList,
    FaMapMarkerAlt,
    FaMobileAlt,
    FaPhoneAlt,
    FaShieldAlt,
    FaSmile,
    FaTools,
    FaTruck,
    FaWhatsapp,
} from "react-icons/fa";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/presupuesto-reparacion`;

export const metadata = buildWebsiteMetadata({
    path: "/presupuesto-reparacion",
    title: "Pedir Presupuesto de Reparacion por WhatsApp en CABA | Team Celular",
    description:
        "Envia marca, modelo y falla para recibir cotizacion por WhatsApp con precio estimado, tiempo de trabajo y alcance tecnico antes de ingresar el equipo.",
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
        "Pedir Presupuesto por WhatsApp en CABA | Team Celular",
    openGraphDescription:
        "Landing transaccional para cotizar reparaciones con respuesta rapida y pasos claros.",
    openGraphImageAlt: "Laboratorio de Team Celular en Recoleta",
    twitterTitle: "Pedir Presupuesto por WhatsApp en CABA | Team Celular",
    twitterDescription:
        "Cotiza por WhatsApp con precio estimado, tiempos y opciones segun tu tipo de falla.",
});

const processSteps = [
    {
        icon: FaClipboardList,
        title: "Completa el formulario",
        description:
            "Contanos la marca, modelo y problema del equipo. Cuanto más contexto nos des, mejor.",
        timing: "2 minutos",
    },
    {
        icon: FaClock,
        title: "Recibí tu diagnóstico inicial",
        description: BUDGET_RESPONSE_MESSAGE,
        timing: "2h / 24h",
    },
    {
        icon: FaTools,
        title: "Traelo o coordinamos retiro",
        description:
            "Podés acercarte al laboratorio en Recoleta o coordinar retiro en CABA según disponibilidad.",
        timing: "Mismo día",
    },
    {
        icon: FaSmile,
        title: "Retirá con garantía",
        description:
            "Entregamos el equipo probado y con garantía escrita según el trabajo realizado.",
        timing: "24-72 hs",
    },
];

const promises = [
    {
        icon: FaShieldAlt,
        title: "Garantía escrita",
        description: "Todos los trabajos incluyen respaldo y documentación.",
    },
    {
        icon: FaCheckCircle,
        title: "Repuestos premium",
        description:
            "Trabajamos con originales y alternativas de primera línea según el caso.",
    },
    {
        icon: FaTruck,
        title: "Opciones de retiro",
        description: "Retiro y entrega express en zonas cercanas a coordinar.",
    },
];

const quickResponseFaqs = [
    {
        question: "¿En cuánto tiempo confirman el presupuesto?",
        answer: BUDGET_RESPONSE_MESSAGE,
    },
    {
        question: "¿El retiro en CABA tiene costo?",
        answer:
            "Se coordina según zona y disponibilidad. Para reparaciones confirmadas puede quedar bonificado.",
    },
    {
        question: "¿Cómo se paga la seña?",
        answer:
            "Podés transferir o pedir link de pago. El saldo se abona al retirar o contra entrega.",
    },
];

const popularRepairs = [
    {
        icon: FaMobileAlt,
        title: "Pantalla dañada",
        details: "Display, touch, vidrio y marcos originales u OLED premium.",
    },
    {
        icon: FaBatteryHalf,
        title: "Batería y carga",
        details: "Cambio de batería, pin de carga, limpieza de puertos y humedad.",
    },
    {
        icon: FaCamera,
        title: "Cámaras y sensores",
        details: "Reemplazo de cámaras, flex, sensores y calibraciones.",
    },
    {
        icon: FaTools,
        title: "Microelectrónica",
        details: "Reballing BGA, fallas de placa y recuperación avanzada.",
    },
];

const supportChannels = [
    {
        icon: FaWhatsapp,
        title: "Atención inmediata",
        description: "+54 11 5103-4595",
        href: "https://wa.me/5491151034595?text=Hola!%20Necesito%20un%20presupuesto",
        external: true,
    },
    {
        icon: FaPhoneAlt,
        title: "Consultas técnicas",
        description: "Lunes a viernes de 10:30 a 18:00",
        href: "tel:+5491151034595",
        external: true,
    },
    {
        icon: FaMapMarkerAlt,
        title: "Visitanos",
        description: "Paraguay 2451, Recoleta, CABA",
        href: "/contacto",
        external: false,
    },
];

const faqs = [
    {
        question: "¿Cuánto demora el presupuesto?",
        answer: BUDGET_RESPONSE_MESSAGE,
    },
    {
        question: "¿La revisión técnica tiene costo?",
        answer: `Si. ${REVIEW_COST_MESSAGE} Te lo informamos antes de ingresar el equipo.`,
    },
    {
        question: "¿Qué garantía ofrecen?",
        answer: WARRANTY_SCOPE_MESSAGE,
    },
    {
        question: "¿Puedo enviar fotos o videos?",
        answer:
            "Sí. Después de completar el formulario seguimos por WhatsApp si hace falta más contexto.",
    },
];

export default function PresupuestoReparacionPage() {
    return (
        <section className="w-full">
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
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
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Presupuesto de reparación
                    </span>
                </nav>

                <header className="grid gap-10 rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-lg lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
                    <div>
                        <span className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            Presupuesto claro y sin vueltas
                        </span>
                        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                            Pedí tu presupuesto y sabé qué conviene hacer con tu celular
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Somos laboratorio en Recoleta. Te damos una respuesta
                            técnica clara, con tiempos reales y seguimiento por
                            WhatsApp para que no tengas que adivinar.
                        </p>

                        <ul className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="mt-1 text-primary" />
                                <span>
                                    Revisión técnica con costo informado antes de
                                    tocar el equipo. El valor suele variar entre
                                    ARS 15.000 y ARS 25.000.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="mt-1 text-primary" />
                                <span>
                                    Repuestos originales o premium según tu caso
                                    y objetivo.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="mt-1 text-primary" />
                                <span>
                                    Seguimiento comercial y técnico por WhatsApp.
                                </span>
                            </li>
                        </ul>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <TrackedCtaLink
                                href="#solicitar-presupuesto"
                                ctaName="budget_hero_form"
                                ctaLocation="presupuesto_hero"
                                ctaVariant="primary"
                                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
                            >
                                Pedir presupuesto ahora
                            </TrackedCtaLink>
                            <TrackedCtaLink
                                href="https://wa.me/5491151034595?text=Hola!%20Quiero%20pedir%20presupuesto%20para%20mi%20equipo"
                                ctaName="budget_hero_whatsapp"
                                ctaLocation="presupuesto_hero"
                                ctaVariant="whatsapp"
                                external
                                target="_blank"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                            >
                                <FaWhatsapp aria-hidden />
                                Hablar por WhatsApp
                            </TrackedCtaLink>
                        </div>

                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                            Respuesta comercial de lunes a viernes de 10:30 a 18:00.
                        </p>
                    </div>

                    <aside className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Por qué te conviene pedirlo online
                        </h2>
                        <div className="mt-6 space-y-6">
                            {[
                                {
                                    icon: FaClock,
                                    title: "Tiempo de respuesta",
                                    value: "Hasta 2 horas habiles",
                                    description: BUDGET_RESPONSE_MESSAGE,
                                },
                                {
                                    icon: FaShieldAlt,
                                    title: "Garantía",
                                    value: "Segun trabajo y repuesto",
                                    description: WARRANTY_SCOPE_MESSAGE,
                                },
                                {
                                    icon: FaSmile,
                                    title: "Confianza",
                                    value: "Reseñas verificables",
                                    description:
                                        "Te mostramos experiencia real de laboratorio y clientes que ya pasaron por acá.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="flex gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                                {item.title}
                                            </p>
                                            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                                {item.value}
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </header>

                <div className="flex flex-col gap-12">
                <section
                    id="solicitar-presupuesto"
                    className="order-1 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
                >
                    <article className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-xl">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                Contanos la falla de tu equipo
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Cuanto más contexto envíes, más preciso será el
                                presupuesto inicial.
                            </p>
                        </div>
                        <RepairsForm />
                        <p className="mt-6 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            Al enviar tus datos aceptás que te contactemos por
                            los medios proporcionados. No compartimos información
                            con terceros.
                        </p>
                    </article>

                    <aside className="space-y-6">
                        <article className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                ¿Necesitás ayuda urgente?
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Elegí el canal que prefieras y un especialista te
                                ayuda a coordinar retiro o visita al laboratorio.
                            </p>
                            <div className="mt-5 space-y-3">
                                {supportChannels.map((channel) => {
                                    const Icon = channel.icon;
                                    return (
                                        <TrackedCtaLink
                                            key={channel.title}
                                            href={channel.href}
                                            ctaName={`budget_support_${channel.title.toLowerCase().replace(/\s+/g, "_")}`}
                                            ctaLocation="presupuesto_support"
                                            ctaVariant={
                                                channel.title.includes("WhatsApp")
                                                    ? "whatsapp"
                                                    : channel.href.startsWith("tel:")
                                                        ? "phone"
                                                        : "secondary"
                                            }
                                            external={channel.external}
                                            target={
                                                channel.external ? "_blank" : undefined
                                            }
                                            className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Icon className="text-lg" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {channel.title}
                                                </p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                                    {channel.description}
                                                </p>
                                            </div>
                                        </TrackedCtaLink>
                                    );
                                })}
                            </div>
                        </article>

                        <article className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                Lo que te prometemos
                            </h2>
                            <div className="mt-5 space-y-4">
                                {promises.map((promise) => {
                                    const Icon = promise.icon;
                                    return (
                                        <div key={promise.title} className="flex gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Icon className="text-lg" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {promise.title}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {promise.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </article>
                    </aside>
                </section>

                <section className="order-2 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Así funciona el servicio
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Un proceso simple para pedir presupuesto y avanzar
                            sin perder tiempo.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {processSteps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <article
                                    key={step.title}
                                    className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="text-xl" />
                                        </div>
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                                            {step.timing}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {step.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="order-3 rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Respuestas rápidas
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        {quickResponseFaqs.map((item) => (
                            <article
                                key={item.question}
                                className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-5"
                            >
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                    {item.question}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {item.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
                </div>

                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Reparaciones más solicitadas
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Algunas de las consultas que recibimos todos los días
                            en el laboratorio.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {popularRepairs.map((repair) => {
                            const Icon = repair.icon;
                            return (
                                <article
                                    key={repair.title}
                                    className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="text-xl" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
                                        {repair.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {repair.details}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-md">
                    <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {faqs.map((faq) => (
                            <article
                                key={faq.question}
                                className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-5"
                            >
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {faq.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-10 text-center shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        ¿Listo para devolverle la vida a tu celular?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Completa el formulario y te respondemos por WhatsApp en hasta 2 horas habiles.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <TrackedCtaLink
                            href="#solicitar-presupuesto"
                            ctaName="budget_bottom_form"
                            ctaLocation="presupuesto_bottom"
                            ctaVariant="primary"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-secondary/90"
                        >
                            Empezar ahora
                        </TrackedCtaLink>
                        <TrackedCtaLink
                            href="https://wa.me/5491151034595?text=Hola!%20Necesito%20un%20presupuesto"
                            ctaName="budget_bottom_whatsapp"
                            ctaLocation="presupuesto_bottom"
                            ctaVariant="whatsapp"
                            external
                            target="_blank"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
                        >
                            <FaWhatsapp aria-hidden />
                            WhatsApp directo
                        </TrackedCtaLink>
                    </div>
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
                            "@type": "HowTo",
                            name: "Cómo solicitar un presupuesto de reparación",
                            totalTime: "PT72H",
                            step: processSteps.map((step, index) => ({
                                "@type": "HowToStep",
                                position: index + 1,
                                name: step.title,
                                text: step.description,
                            })),
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





import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import RepairsForm from "@/components/forms/RepairsForm";
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

const SITE_URL =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/presupuesto-reparacion`;

export const metadata: Metadata = {
    title: "Presupuesto Reparacion de Celulares en Buenos Aires | Team Celular",
    description:
        "Solicita tu presupuesto online sin cargo y recibi respuesta en menos de 24 horas. Laboratorio en Recoleta con garantia escrita y repuestos premium.",
    keywords: [
        "presupuesto reparacion celulares",
        "servicio tecnico celulares buenos aires",
        "presupuesto iphone pantalla",
        "arreglo celular recoleta",
        "microelectronica caba",
        "retiro reparacion celulares",
    ],
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "Presupuesto Reparacion de Celulares en Buenos Aires | Team Celular",
        description:
            "24 horas de respuesta, garantia escrita y soporte personalizado para reparar tu celular.",
        url: PAGE_URL,
        locale: "es_AR",
        type: "website",
        images: [
            {
                url: "https://teamcelular.com/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Laboratorio de Team Celular en Recoleta",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pedi tu presupuesto de reparacion en Team Celular",
        description:
            "Respuesta en menos de 24 horas con garantia escrita y repuestos premium.",
        images: ["https://teamcelular.com/opengraph-image.png"],
    },
};

const processSteps = [
    {
        icon: FaClipboardList,
        title: "Completa el formulario",
        description:
            "Contanos la marca, modelo y problema del equipo. Cuanto mas contexto nos des, mejor.",
        timing: "2 minutos",
    },
    {
        icon: FaClock,
        title: "Recibi tu diagnostico inicial",
        description:
            "En menos de 24 horas habiles un tecnico te responde por WhatsApp o email.",
        timing: "< 24 hs",
    },
    {
        icon: FaTools,
        title: "Traelo o coordinamos retiro",
        description:
            "Podes acercarte al laboratorio en Recoleta o coordinar retiro en CABA segun disponibilidad.",
        timing: "Mismo dia",
    },
    {
        icon: FaSmile,
        title: "Retira con garantia",
        description:
            "Entregamos el equipo probado y con garantia escrita segun el trabajo realizado.",
        timing: "24-72 hs",
    },
];

const promises = [
    {
        icon: FaShieldAlt,
        title: "Garantia escrita",
        description: "Todos los trabajos incluyen respaldo y documentacion.",
    },
    {
        icon: FaCheckCircle,
        title: "Repuestos premium",
        description:
            "Trabajamos con originales y alternativas de primera linea segun el caso.",
    },
    {
        icon: FaTruck,
        title: "Opciones de retiro",
        description: "Retiro y entrega express en zonas cercanas a coordinar.",
    },
];

const quickResponseFaqs = [
    {
        question: "En cuanto tiempo confirman el presupuesto?",
        answer:
            "La mayoria se responde el mismo dia. Si falta contexto, pedimos fotos o chequeo fisico.",
    },
    {
        question: "El retiro en CABA tiene costo?",
        answer:
            "Se coordina segun zona y disponibilidad. Para reparaciones confirmadas puede quedar bonificado.",
    },
    {
        question: "Como se paga la sena?",
        answer:
            "Podes transferir o pedir link de pago. El saldo se abona al retirar o contra entrega.",
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
        title: "Bateria y carga",
        details: "Cambio de bateria, pin de carga, limpieza de puertos y humedad.",
    },
    {
        icon: FaCamera,
        title: "Camaras y sensores",
        details: "Reemplazo de camaras, flex, sensores y calibraciones.",
    },
    {
        icon: FaTools,
        title: "Microelectronica",
        details: "Reballing BGA, fallas de placa y recuperacion avanzada.",
    },
];

const supportChannels = [
    {
        icon: FaWhatsapp,
        title: "Atencion inmediata",
        description: "+54 11 5103-4595",
        href: "https://wa.me/5491151034595?text=Hola!%20Necesito%20un%20presupuesto",
        external: true,
    },
    {
        icon: FaPhoneAlt,
        title: "Consultas tecnicas",
        description: "Lunes a viernes de 10:30 a 18:00",
        href: "tel:+5491151034595",
        external: false,
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
        question: "Cuanto demora el presupuesto?",
        answer:
            "La mayoria se responde dentro de las primeras 12 horas habiles. Casos complejos pueden tardar hasta 24 horas.",
    },
    {
        question: "El diagnostico tiene costo?",
        answer:
            "No. El diagnostico inicial es sin cargo. Solo pagas si aprobas el trabajo.",
    },
    {
        question: "Que garantia ofrecen?",
        answer:
            "Garantia escrita de 90 a 180 dias segun tipo de reparacion y repuesto utilizado.",
    },
    {
        question: "Puedo enviar fotos o videos?",
        answer:
            "Si. Despues de completar el formulario seguimos por WhatsApp si hace falta mas contexto.",
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

                <nav className="flex items-center gap-2 text-sm text-slate-600">
                    <Link href="/" className="transition hover:text-primary">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-slate-900">
                        Presupuesto de reparacion
                    </span>
                </nav>

                <header className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
                    <div>
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Presupuesto sin cargo
                        </span>
                        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                            Pedi tu presupuesto online y recupera tu celular con
                            un plan tecnico claro
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Somos laboratorio en Recoleta con enfoque real en
                            microelectronica, repuestos premium y seguimiento por
                            WhatsApp.
                        </p>

                        <ul className="mt-6 space-y-3 text-slate-700">
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="mt-1 text-primary" />
                                <span>
                                    Diagnostico sin cargo y presupuesto antes de
                                    tocar el equipo.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="mt-1 text-primary" />
                                <span>
                                    Repuestos originales o premium segun tu caso
                                    y objetivo.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="mt-1 text-primary" />
                                <span>
                                    Seguimiento comercial y tecnico por WhatsApp.
                                </span>
                            </li>
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="#solicitar-presupuesto"
                                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
                            >
                                Solicitar presupuesto
                            </Link>
                            <Link
                                href="https://wa.me/5491151034595?text=Hola!%20Quiero%20pedir%20presupuesto%20para%20mi%20equipo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                            >
                                <FaWhatsapp aria-hidden />
                                Hablar por WhatsApp
                            </Link>
                        </div>

                        <p className="mt-4 text-sm text-slate-500">
                            Horario de atencion: lunes a viernes de 10:30 a 18:00.
                        </p>
                    </div>

                    <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Por que pedir tu presupuesto online
                        </h2>
                        <div className="mt-6 space-y-6">
                            {[
                                {
                                    icon: FaClock,
                                    title: "Tiempo de respuesta",
                                    value: "12 hs promedio",
                                    description:
                                        "Un tecnico dedicado te responde en menos de 24 horas habiles.",
                                },
                                {
                                    icon: FaShieldAlt,
                                    title: "Garantia",
                                    value: "90 a 180 dias",
                                    description:
                                        "Segun el tipo de reparacion y el repuesto utilizado.",
                                },
                                {
                                    icon: FaSmile,
                                    title: "Confianza",
                                    value: "Resenas verificables",
                                    description:
                                        "Prueba social real y experiencia de laboratorio local.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="flex gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500">
                                                {item.title}
                                            </p>
                                            <p className="text-xl font-bold text-slate-900">
                                                {item.value}
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </header>

                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Asi funciona el servicio
                        </h2>
                        <p className="mt-2 text-lg text-slate-600">
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
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="text-xl" />
                                        </div>
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            {step.timing}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
                    <h2 className="text-center text-2xl font-bold text-slate-900">
                        Respuestas rapidas
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        {quickResponseFaqs.map((item) => (
                            <article
                                key={item.question}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                                <h3 className="font-semibold text-primary">
                                    {item.question}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {item.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    id="solicitar-presupuesto"
                    className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
                >
                    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Contanos la falla de tu equipo
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Cuanto mas contexto envies, mas preciso sera el
                                presupuesto inicial.
                            </p>
                        </div>
                        <RepairsForm />
                        <p className="mt-6 text-xs leading-5 text-slate-500">
                            Al enviar tus datos aceptas que te contactemos por
                            los medios proporcionados. No compartimos informacion
                            con terceros.
                        </p>
                    </article>

                    <aside className="space-y-6">
                        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                            <h2 className="text-xl font-bold text-slate-900">
                                Necesitas ayuda urgente?
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Elegi el canal que prefieras y un especialista te
                                ayuda a coordinar retiro o visita al laboratorio.
                            </p>
                            <div className="mt-5 space-y-3">
                                {supportChannels.map((channel) => {
                                    const Icon = channel.icon;
                                    return (
                                        <Link
                                            key={channel.title}
                                            href={channel.href}
                                            target={
                                                channel.external ? "_blank" : undefined
                                            }
                                            rel={
                                                channel.external
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Icon className="text-lg" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {channel.title}
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    {channel.description}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </article>

                        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                            <h2 className="text-xl font-bold text-slate-900">
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
                                                <p className="font-semibold text-slate-900">
                                                    {promise.title}
                                                </p>
                                                <p className="text-sm text-slate-600">
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

                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Reparaciones mas solicitadas
                        </h2>
                        <p className="mt-2 text-lg text-slate-600">
                            Algunas de las consultas que recibimos todos los dias
                            en el laboratorio.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {popularRepairs.map((repair) => {
                            const Icon = repair.icon;
                            return (
                                <article
                                    key={repair.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="text-xl" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                                        {repair.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {repair.details}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
                    <h2 className="text-center text-3xl font-bold text-slate-900">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {faqs.map((faq) => (
                            <article
                                key={faq.question}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                                <h3 className="text-lg font-semibold text-primary">
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {faq.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Listo para devolverle la vida a tu celular?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                        Completa el formulario y recibi tu presupuesto
                        personalizado en menos de 24 horas habiles.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Link
                            href="#solicitar-presupuesto"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-secondary/90"
                        >
                            Empezar ahora
                        </Link>
                        <Link
                            href="https://wa.me/5491151034595?text=Hola!%20Necesito%20un%20presupuesto"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
                        >
                            <FaWhatsapp aria-hidden />
                            WhatsApp directo
                        </Link>
                    </div>
                </section>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "@id": `${PAGE_URL}#service`,
                            name: "Presupuesto de reparacion de celulares en CABA",
                            serviceType:
                                "Presupuesto y diagnostico de reparacion de celulares",
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
                                price: "0",
                                availability: "https://schema.org/InStock",
                                url: PAGE_URL,
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
                            name: "Como solicitar un presupuesto de reparacion",
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

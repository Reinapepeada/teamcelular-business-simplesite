import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
    FaBus,
    FaClock,
    FaDirections,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaSubway,
    FaWhatsapp,
} from "react-icons/fa";

export const metadata: Metadata = {
    title: "Contacto | Team Celular | Reparación de celulares en Recoleta CABA",
    description:
        "Visitanos en Paraguay 2451, Recoleta, CABA. Atención de lunes a viernes de 10:30 a 18:00. WhatsApp y coordinación de revisión técnica.",
    keywords: [
        "contacto team celular",
        "reparación celulares recoleta",
        "taller celulares paraguay 2451",
        "servicio técnico caba contacto",
        "presupuesto reparación celular",
        "whatsapp reparación celular",
    ],
    alternates: {
        canonical: "https://teamcelular.com/contacto",
    },
    openGraph: {
        title: "Contacto | Team Celular Recoleta",
        description:
            "Visitanos en Paraguay 2451 o escribinos por WhatsApp para tu presupuesto",
        type: "website",
        url: "https://teamcelular.com/contacto",
        locale: "es_AR",
        images: [
            {
                url: "https://teamcelular.com/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Team Celular - Contacto",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contacto | Team Celular Recoleta",
        description: "Visitanos en Paraguay 2451 o escribinos por WhatsApp",
        images: ["https://teamcelular.com/opengraph-image.png"],
    },
};

const contactMethods = [
    {
        icon: FaWhatsapp,
        title: "WhatsApp",
        value: "+54 11 5103-4595",
        description: "Respuesta comercial rápida",
        href: "https://wa.me/5491151034595",
        tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
        icon: FaPhone,
        title: "Teléfono",
        value: "+54 11 5103-4595",
        description: "Llamadas de 10:30 a 18:00",
        href: "tel:+5491151034595",
        tone: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
        icon: FaEnvelope,
        title: "Email",
        value: "teamcelular.arg@gmail.com",
        description: "Ideal para consultas técnicas largas",
        href: "mailto:teamcelular.arg@gmail.com",
        tone: "bg-violet-50 text-violet-700 border-violet-200",
    },
];

const socialMedia = [
    {
        icon: FaInstagram,
        name: "Instagram",
        handle: "@teamcelular.arg",
        href: "https://www.instagram.com/teamcelular.arg/",
    },
    {
        icon: FaFacebook,
        name: "Facebook",
        handle: "/teamcelular",
        href: "https://www.facebook.com/TeamCelular/",
    },
];

const quickFaqs = [
    {
        question: "¿Necesito turno para acercarme?",
        answer:
            "No. Atendemos por orden de llegada, aunque si escribís antes te confirmamos disponibilidad de banco de trabajo.",
    },
    {
        question: "¿Coordinan retiros en CABA?",
        answer:
            "Sí. Programamos motos de lunes a viernes según carga operativa y zona.",
    },
    {
        question: "¿Cuándo conviene escribir por mail?",
        answer:
            "Para presupuestos corporativos, reportes técnicos o consultas con mucho detalle.",
    },
];

const transportInfo = [
    {
        icon: FaSubway,
        title: "Subte",
        description: "Línea D - Estación Callao, a unos 5 minutos caminando.",
    },
    {
        icon: FaBus,
        title: "Colectivos",
        description: "10, 37, 39, 59, 60, 108, 111, 152.",
    },
    {
        icon: FaMapMarkerAlt,
        title: "Ubicación",
        description: "Paraguay 2451, Recoleta, CABA.",
    },
];

const faqs = [
    {
        question: "¿Necesito turno previo?",
        answer:
            "No es obligatorio, pero escribir antes acelera la recepción del equipo y evita esperas.",
    },
    {
        question: "¿La revisión técnica tiene costo?",
        answer:
            "Sí. La revisión técnica suele variar entre ARS 15.000 y ARS 25.000 según marca, modelo y tipo de falla. Te lo confirmamos antes de ingresar el equipo.",
    },
    {
        question: "¿Cuánto tarda una reparación típica?",
        answer:
            "Pantalla o batería suelen resolverse en el día. Casos complejos pueden tomar entre 24 y 72 horas.",
    },
    {
        question: "¿Ofrecen garantía?",
        answer:
            "Sí. Todas las reparaciones se entregan con garantía escrita según repuesto y tipo de trabajo.",
    },
];

export default function ContactoPage() {
    return (
        <section className="w-full">
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", url: "https://teamcelular.com/" },
                        { name: "Contacto", url: "https://teamcelular.com/contacto" },
                    ]}
                />

                <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Link href="/" className="transition hover:text-primary">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Contacto</span>
                </nav>

                <header className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-lg md:p-12">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Recoleta - CABA
                        </span>
                        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                            Contacto directo con el laboratorio
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Si querés venir al taller, pedir presupuesto o
                            coordinar retiro, estos son los canales correctos y
                            los horarios reales.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/5491151034595"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                            >
                                <FaWhatsapp aria-hidden />
                                Escribinos por WhatsApp
                            </a>
                            <Link
                                href="/presupuesto-reparacion"
                                className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                            >
                                Solicitar presupuesto
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="grid gap-6 md:grid-cols-3">
                    {contactMethods.map((method) => {
                        const Icon = method.icon;
                        const external = method.href.startsWith("http");

                        return (
                            <Link
                                key={method.title}
                                href={method.href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="group h-full rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div
                                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${method.tone}`}
                                >
                                    <Icon className="text-2xl" />
                                </div>
                                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-slate-100">
                                    {method.title}
                                </h2>
                                <p className="mt-2 font-semibold text-slate-800 dark:text-slate-200">
                                    {method.value}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {method.description}
                                </p>
                            </Link>
                        );
                    })}
                </section>

                <section className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Dudas rápidas antes de venir
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {quickFaqs.map((item) => (
                            <article
                                key={item.question}
                                className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-5"
                            >
                                <h3 className="text-base font-semibold text-primary">
                                    {item.question}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {item.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
                    <article className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <FaMapMarkerAlt className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    Nuestra ubicación
                                </h2>
                                <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">
                                    Paraguay 2451, Recoleta
                                </p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Ciudad Autónoma de Buenos Aires, Argentina
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <FaClock className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                    Horarios de atención
                                </h3>
                                <p className="mt-2 text-slate-700 dark:text-slate-300">
                                    Lunes a Viernes: 10:30 - 18:00
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Sábados y domingos: cerrado
                                </p>
                            </div>
                        </div>

                        <Link
                            href="https://maps.app.goo.gl/krFJfjDA4CuR83BK9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
                        >
                            <FaDirections aria-hidden />
                            Cómo llegar en Google Maps
                        </Link>

                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                Cómo llegar
                            </h3>
                            {transportInfo.map((transport) => {
                                const Icon = transport.icon;
                                return (
                                    <div key={transport.title} className="flex gap-3">
                                        <Icon className="mt-1 text-primary" />
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                {transport.title}
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {transport.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </article>

                    <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.262305984237!2d-58.40523692350382!3d-34.59752805717274!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb9f6e9910cb%3A0xb492115ba59bc4f2!2sTeam%20celular%20%7C%20Reparacion%20de%20celulares%20%7C%20Reparacion%20de%20computadoras!5e0!3m2!1ses!2sar!4v1712864201522!5m2!1ses!2sar"
                            className="min-h-[560px] w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de Team Celular"
                        />
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Seguinos en redes sociales
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {socialMedia.map((social) => {
                            const Icon = social.icon;
                            return (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-h-16 items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 px-5 py-4 transition hover:border-primary/40 hover:bg-primary/5"
                                >
                                    <Icon className="text-2xl text-primary" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {social.name}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {social.handle}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {faqs.map((faq) => (
                            <article
                                key={faq.question}
                                className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-5"
                            >
                                <h3 className="text-lg font-semibold text-primary">
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {faq.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

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

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ContactPage",
                            name: "Contacto - Team Celular",
                            description:
                                "Información de contacto y ubicación de Team Celular en Recoleta, Buenos Aires",
                            url: "https://teamcelular.com/contacto",
                        }),
                    }}
                />
            </div>
        </section>
    );
}



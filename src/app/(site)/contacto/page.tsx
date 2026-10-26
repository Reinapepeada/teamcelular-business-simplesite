import type { Metadata } from "next";
import Link from "next/link";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getBranch, whatsappUrl } from "@/lib/businessProfile";
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
    title: "Contacto, horarios y WhatsApp | Team Celular",
    description:
        "Dos sucursales en CABA: Paraguay 2451 (Recoleta) y Amenábar 2032 (Belgrano). WhatsApp +54 11 5103-4595, lun–vie 10:30–18:00. Garantía 90 días.",
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
        title: "Contacto, horarios y WhatsApp | Team Celular",
        description:
            "Team Celular, dos sucursales en CABA: Paraguay 2451 Recoleta y Amenábar 2032 Belgrano. Diagnóstico el mismo día y garantía escrita 90 días. WhatsApp +54 11 5103-4595.",
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
        title: "Contacto, horarios y WhatsApp | Team Celular",
        description: "Team Celular, Paraguay 2451 Recoleta y Amenábar 2032 Belgrano. Reparación de celulares en CABA, diagnóstico el mismo día y garantía escrita 90 días.",
        images: ["https://teamcelular.com/opengraph-image.png"],
    },
};

const contactMethods = [
    {
        icon: FaWhatsapp,
        title: "WhatsApp",
        label: "WhatsApp por sucursal",
        value: "Recoleta o Belgrano",
        description: "Precio y stock en hasta 2 h hábiles",
        href: whatsappUrl(),
    },
    {
        icon: FaPhone,
        title: "Teléfono",
        label: "Teléfono de Recoleta",
        value: "+54 11 5103-4595",
        description: "Llamadas de 10:30 a 18:00",
        href: "tel:+5491151034595",
    },
    {
        icon: FaEnvelope,
        title: "Email",
        label: "Email",
        value: "teamcelular.arg@gmail.com",
        description: "Para empresas o consultas con fotos y detalle",
        href: "mailto:teamcelular.arg@gmail.com",
    },
];

const socialMedia = [
    {
        icon: FaInstagram,
        name: "Instagram",
        handle: "@teamcelular.ar",
        href: "https://www.instagram.com/teamcelular.ar/",
    },
    {
        icon: FaFacebook,
        name: "Facebook",
        handle: "/teamcelular",
        href: "https://www.facebook.com/TeamCelular/",
    },
];

const faqs = [
    {
        question: "¿Necesito turno para acercarme?",
        answer:
            "No. Atendemos por orden de llegada. Si nos escribís antes con el modelo, te confirmamos que tenemos el repuesto y no hacés el viaje de balde.",
    },
    {
        question: "¿Coordinan retiros en CABA?",
        answer:
            "Sí, con moto, de lunes a viernes. Cuesta ARS 15.000 y el horario depende del barrio: escribinos y lo coordinamos.",
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
        description: "Recoleta: línea D, estación Pueyrredón (Av. Santa Fe y Pueyrredón), a pocas cuadras.",
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

const repairFaqs = [
    {
        question: "¿La revisión técnica tiene costo?",
        answer:
            "Sí. La revisión técnica suele variar entre ARS 15.000 y ARS 25.000 según marca, modelo y tipo de falla. Te lo confirmamos antes de ingresar el equipo.",
    },
    {
        question: "¿Cuánto tarda una reparación típica?",
        answer:
            "Pantalla o batería suelen resolverse en el día. Para placa, el informe se entrega en hasta 72 horas hábiles; si el arreglo es de un chip, lleva semanas. Confirmamos precio y plazo antes de empezar.",
    },
    {
        question: "¿Ofrecen garantía?",
        answer:
            "Sí. Todas las reparaciones se entregan con garantía escrita de 90 días sobre trabajo y repuesto instalado. El alcance exacto se informa por escrito antes de avanzar.",
    },
];

const contactFaqs = [...faqs, ...repairFaqs];

export default function ContactoPage() {
    const recoleta = getBranch("recoleta");
    const belgrano = getBranch("belgrano");

    return (
        <section className="w-full">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12">
                <BreadcrumbJsonLd
                    items={[
                        { name: "Inicio", url: "https://teamcelular.com/" },
                        { name: "Contacto", url: "https://teamcelular.com/contacto" },
                    ]}
                />

                <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Link href="/" className="transition hover:text-primary dark:hover:text-secondary">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Contacto</span>
                </nav>

                <header className="max-w-3xl">
                        <h1 className="text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight text-white">
                            Contacto directo con el laboratorio en CABA
                        </h1>
                        <p className="mt-4 text-base leading-7 text-[#a1a1a6] sm:text-lg">
                            Atendemos en Recoleta y Belgrano, de lunes a viernes de 10:30 a 18:00, sin turno previo. Elegí la sucursal para ver cómo llegar o preparar tu consulta por WhatsApp.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <BranchWhatsAppButton
                                ctaName="contact_hero_whatsapp"
                                ctaLocation="contact_hero"
                                className="tc-btn tc-btn-primary"
                            >
                                <FaWhatsapp aria-hidden />
                                Elegir sucursal y abrir WhatsApp
                            </BranchWhatsAppButton>
                            <Link
                                href="/presupuesto-reparacion"
                                className="tc-link inline-flex min-h-11 items-center px-2"
                            >
                                Preparar consulta por modelo
                            </Link>
                        </div>
                </header>

                <section id="ubicacion" className="scroll-mt-24 space-y-6">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Nuestras sucursales en CABA
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <article className="rounded-[28px] bg-[#1d1d1f] p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:text-secondary">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                        Sucursal Recoleta
                                    </h3>
                                    <p className="mt-1 text-lg text-slate-700 dark:text-slate-300">
                                        Paraguay 2451, Recoleta
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Ciudad Autónoma de Buenos Aires
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                    <FaClock className="text-2xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">Horario de atención</p>
                                    <p className="mt-1 text-slate-700 dark:text-slate-300">Lunes a Viernes: 10:30 – 18:00</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Sábados y domingos: cerrado</p>
                                </div>
                            </div>
                            <details className="mt-4">
                                <summary className="tc-link list-item min-h-11 cursor-pointer py-2 marker:text-[#a1a1a6]">Transporte y ubicación de Recoleta</summary>
                                <div className="mt-3 space-y-3">
                                {transportInfo.map((transport) => {
                                    const Icon = transport.icon;
                                    return (
                                        <div key={transport.title} className="flex gap-3">
                                            <Icon className="mt-1 shrink-0 text-primary dark:text-secondary" />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-100">{transport.title}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{transport.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                </div>
                            </details>
                            <Link href={recoleta.url} className="tc-link mt-3 inline-flex min-h-11 items-center">
                                Ver contacto de Recoleta
                            </Link>
                            <Link
                                href={recoleta.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tc-btn tc-btn-ghost mt-3 w-full"
                            >
                                <FaDirections aria-hidden />
                                Cómo llegar — Recoleta
                            </Link>
                        </article>

                        <article className="rounded-[28px] bg-[#1d1d1f] p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:text-secondary">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                        Sucursal Belgrano
                                    </h3>
                                    <p className="mt-1 text-lg text-slate-700 dark:text-slate-300">
                                        Amenábar 2032, Belgrano
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Ciudad Autónoma de Buenos Aires
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                    <FaClock className="text-2xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">Horario de atención</p>
                                    <p className="mt-1 text-slate-700 dark:text-slate-300">Lunes a Viernes: 10:30 – 18:00</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Apertura: julio 2026</p>
                                </div>
                            </div>
                            <details className="mt-4">
                                <summary className="tc-link list-item min-h-11 cursor-pointer py-2 marker:text-[#a1a1a6]">Transporte y ubicación de Belgrano</summary>
                                <div className="mt-3 space-y-3">
                                <div className="flex gap-3">
                                    <FaSubway className="mt-1 shrink-0 text-primary dark:text-secondary" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">Subte</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Línea D – Estación Juramento, a pocas cuadras.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <FaMapMarkerAlt className="mt-1 shrink-0 text-primary dark:text-secondary" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">Ubicación</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Amenábar 2032, Belgrano, CABA. CP C1428.</p>
                                    </div>
                                </div>
                                </div>
                            </details>
                            <Link href={belgrano.url} className="tc-link mt-3 inline-flex min-h-11 items-center">
                                Ver contacto de Belgrano
                            </Link>
                            <Link
                                href={belgrano.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tc-btn tc-btn-ghost mt-3 w-full"
                            >
                                <FaDirections aria-hidden />
                                Cómo llegar — Belgrano
                            </Link>
                        </article>
                    </div>

                    <details className="border-t border-[#333336] pt-3">
                        <summary className="tc-link list-item min-h-11 cursor-pointer py-2 marker:text-[#a1a1a6]">Ver mapa de Recoleta</summary>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.262305984237!2d-58.40523692350382!3d-34.59752805717274!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb9f6e9910cb%3A0xb492115ba59bc4f2!2sTeam%20celular%20%7C%20Reparacion%20de%20celulares%20%7C%20Reparacion%20de%20computadoras!5e0!3m2!1ses!2sar!4v1712864201522!5m2!1ses!2sar"
                            className="min-h-[400px] w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa Team Celular Recoleta — Paraguay 2451"
                        />
                    </details>
                </section>

                <section className="grid gap-6 md:grid-cols-3">
                    {contactMethods.map((method) => {
                        const Icon = method.icon;
                        const external =
                            method.href.startsWith("http") ||
                            method.href.startsWith("tel:") ||
                            method.href.startsWith("mailto:");
                        const ctaVariant =
                            method.title === "WhatsApp"
                                ? "whatsapp"
                                : method.title === "Teléfono"
                                    ? "phone"
                                    : "email";

                        return (
                            <TrackedCtaLink
                                key={method.title}
                                href={method.href}
                                ctaName={`contact_${ctaVariant}`}
                                ctaLocation="contact_methods"
                                ctaVariant={ctaVariant}
                                external={external}
                                target={external && method.href.startsWith("http") ? "_blank" : undefined}
                                className="group border-t border-[#333336] py-5"
                            >
                                <Icon className="text-xl text-[#a1a1a6]" aria-hidden />
                                <h2 className="tc-link mt-3 text-lg font-semibold">
                                    {method.label}
                                </h2>
                                <p className="mt-2 font-semibold text-slate-800 dark:text-slate-200">
                                    {method.value}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {method.description}
                                </p>
                            </TrackedCtaLink>
                        );
                    })}
                </section>

                <section className="border-t border-[#333336] pt-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Seguinos en redes sociales
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {socialMedia.map((social) => {
                            const Icon = social.icon;
                            const ctaVariant = social.name === "Instagram" ? "instagram" : "other";
                            return (
                                <TrackedCtaLink
                                    key={social.name}
                                    href={social.href}
                                    ctaName={`contact_social_${social.name.toLowerCase()}`}
                                    ctaLocation="contact_socials"
                                    ctaVariant={ctaVariant}
                                    external
                                    target="_blank"
                                    className="flex min-h-16 items-center gap-4 py-3"
                                >
                                    <Icon className="text-xl text-[#a1a1a6]" aria-hidden />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {social.name}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {social.handle}
                                        </p>
                                    </div>
                                </TrackedCtaLink>
                            );
                        })}
                    </div>
                </section>

                <section className="border-t border-[#333336] pt-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {contactFaqs.map((faq) => (
                            <details key={faq.question} className="border-b border-[#333336] py-3">
                                <summary className="tc-link list-item min-h-11 cursor-pointer py-2 marker:text-[#a1a1a6] text-base font-semibold">
                                    {faq.question}
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: contactFaqs.map((faq) => ({
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
                                "Información de contacto y ubicación de Team Celular — dos sucursales en CABA: Paraguay 2451 Recoleta y Amenábar 2032 Belgrano.",
                            url: "https://teamcelular.com/contacto",
                        }),
                    }}
                />
            </div>
        </section>
    );
}


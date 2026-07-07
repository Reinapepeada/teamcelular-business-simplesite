import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";
import BannerHome from "@/components/banners/BannerHome";
import BannerCards from "@/components/cards/BannerCards";
import GoogleReviewsAPI from "@/components/cards/GoogleReviewsAPI";
import KnowledgeGrid from "@/components/cards/KnowledgeGrid";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import { BUDGET_RESPONSE_MESSAGE } from "@/lib/copyStandards";
import { buildWebsiteMetadata, getSiteUrl } from "@/lib/seoMetadata";

const SITE_URL = getSiteUrl();

export const metadata = buildWebsiteMetadata({
    path: "/",
    title: "Reparación de Celulares en CABA | Recoleta y Belgrano | Team Celular",
    description:
        "Reparación de celulares en CABA. Team Celular atiende en Recoleta (Paraguay 2451) y Belgrano (Amenabar 2032), con diagnóstico el mismo día y garantía escrita 90 días.",
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
    languages: {
        "es-AR": "/",
    },
    openGraphTitle: "Reparación de Celulares en CABA | Team Celular",
    openGraphDescription:
        "Team Celular tiene sucursales en Recoleta y Belgrano, CABA. Cambio de pantalla y batería en el día, diagnóstico mismo día y garantía escrita 90 días.",
    openGraphImageAlt: "Team Celular — Reparación de celulares en Recoleta, Buenos Aires",
    twitterTitle: "Reparación de Celulares en CABA | Team Celular",
    twitterDescription:
        "Recoleta y Belgrano, CABA. Pantalla y batería en el día, diagnóstico mismo día y garantía escrita 90 días. Lun–Vie 10:30–18:00.",
});

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
        title: "Garantía documentada",
        description:
            "Cada reparación sale con orden técnica y garantía escrita. Sin letra chica ni promesas que se evaporan.",
    },
    {
        title: "Diagnóstico antes de cobrar",
        description:
            "Te explicamos qué falla, qué se reemplaza y cuánto tarda antes de tocar el equipo. Sin sorpresas.",
    },
    {
        title: "Respuesta en el día",
        description:
            "WhatsApp, llamada o visita directa al laboratorio en Paraguay 2451. Respondemos en menos de 2 horas en horario hábil.",
    },
];

const priorityRepairs = [
    {
        title: "Cambio de pantalla",
        description:
            "Vidrio roto, líneas en pantalla o touch que no responde. Primero confirmamos modelo y calidad de módulo.",
        href: "/reparaciones/cambio-pantalla-caba",
        cta: "Ver pantalla",
    },
    {
        title: "Cambio de batería",
        description:
            "Apagados, baja autonomía o temperatura anormal. Revisamos consumo antes de reemplazar.",
        href: "/reparaciones/cambio-bateria-caba",
        cta: "Ver batería",
    },
    {
        title: "Pin de carga",
        description:
            "Falso contacto, carga lenta o equipo que no reconoce cable. No conviene forzarlo.",
        href: "/reparaciones/cambio-pin-carga-caba",
        cta: "Ver carga",
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
        answer: BUDGET_RESPONSE_MESSAGE,
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

            <section className="w-full max-w-[100rem] space-y-6">
                <div className="flex flex-col gap-3 text-center md:text-left">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 dark:text-sky-300">
                        Reparaciones que más se piden
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2.35rem]">
                        Lo más buscado, bien explicado y listo para cotizar
                    </h2>
                    <p className="max-w-3xl text-[1.03rem] leading-7 text-slate-600 dark:text-slate-400">
                        Si ya sabés qué le pasa al equipo, entrá directo a la reparación que corresponde. Si no, te ayudamos a elegir sin vueltas.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-900 bg-slate-950 text-white dark:border-slate-700">
                    {priorityRepairs.map((item) => (
                        <article
                            key={item.title}
                            className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[12rem_1fr_auto] md:items-center md:px-7"
                        >
                            <h3 className="text-xl font-semibold">
                                {item.title}
                            </h3>
                            <p className="max-w-3xl text-sm leading-6 text-slate-300">
                                {item.description}
                            </p>
                            <Link
                                href={item.href}
                                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                            >
                                {item.cta}
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <BannerCards />

            <section className="w-full max-w-[100rem] space-y-12 text-center md:text-left lg:space-y-14">
                <article className="grid gap-10 border-y border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-[2.35rem]">
                            Cómo trabajamos en Team Celular
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
                            <TrackedCtaLink
                                href="/presupuesto-reparacion#solicitar-presupuesto"
                                ctaName="home_value_budget"
                                ctaLocation="home_value_section"
                                ctaVariant="primary"
                                className={primaryCtaClass}
                            >
                                Pedir presupuesto
                            </TrackedCtaLink>
                            <TrackedCtaLink
                                href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparacion"
                                ctaName="home_value_whatsapp"
                                ctaLocation="home_value_section"
                                ctaVariant="whatsapp"
                                external
                                target="_blank"
                                className={neutralCtaClass}
                            >
                                Escribinos por WhatsApp
                            </TrackedCtaLink>
                        </div>
                    </div>

                    <div className="space-y-5 bg-slate-50 p-6 dark:bg-slate-900 md:p-8">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            Que hacemos
                        </h3>
                        <ul className="divide-y divide-slate-200 text-left dark:divide-slate-800">
                            {services.map((service) => (
                                <li
                                    key={service.title}
                                    className="flex gap-3 py-4"
                                >
                                    <BsCheckCircleFill className="mt-1 shrink-0 text-lg text-emerald-500" aria-hidden />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                            {service.title}
                                        </h4>
                                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            {service.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>

                <section className="bg-slate-950 px-6 py-7 text-white dark:bg-slate-900 md:px-8">
                    <div className="grid gap-7 md:grid-cols-3">
                        {differentiators.map((item) => (
                            <div
                                key={item.title}
                                className="max-w-sm"
                            >
                                <div>
                                    <h3 className="text-[1.07rem] font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-[0.95rem] leading-6 text-slate-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                Team Celular tiene dos sucursales en CABA:
                                Paraguay 2451 en Recoleta y Amenábar 2032 en
                                Belgrano. Ambas atienden de lunes a viernes de
                                10:30 a 18:00.
                            </p>
                            <p className="text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                                Podés acercarte a la sucursal más cercana o
                                coordinamos retiro según disponibilidad.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                Vias de contacto
                            </p>
                            <ul className="space-y-2 text-left text-slate-600 dark:text-slate-400">
                                <li>
                                    Tel:{" "}
                                    <TrackedCtaLink
                                        href="tel:+541151034595"
                                        ctaName="home_contact_phone"
                                        ctaLocation="home_contact"
                                        ctaVariant="phone"
                                        external
                                        className="font-semibold text-primary transition hover:text-secondary"
                                    >
                                        +54 11 5103-4595
                                    </TrackedCtaLink>
                                </li>
                                <li>
                                    Email:{" "}
                                    <TrackedCtaLink
                                        href="mailto:teamcelular.arg@gmail.com"
                                        ctaName="home_contact_email"
                                        ctaLocation="home_contact"
                                        ctaVariant="email"
                                        external
                                        className="font-semibold text-primary transition hover:text-secondary"
                                    >
                                        teamcelular.arg@gmail.com
                                    </TrackedCtaLink>
                                </li>
                                <li>Sucursal Recoleta: Paraguay 2451, CABA.</li>
                                <li>Sucursal Belgrano: Amenábar 2032, CABA.</li>
                                <li>Horario: Lunes a Viernes de 10:30 a 18:00.</li>
                            </ul>
                        </div>
                    </div>
                </article>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2rem]">
                        Preguntas frecuentes sobre reparación de celulares
                    </h2>
                    <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                        {faqs.map((faq) => (
                            <article
                                key={faq.question}
                                className="grid gap-3 py-5 text-left md:grid-cols-[18rem_1fr]"
                            >
                                <h3 className="text-[1.05rem] font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                                    {faq.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-xl bg-primary/10 p-6 dark:bg-primary/15">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2rem]">
                        ¿Buscas reparación de celulares cerca de tu zona?
                    </h2>
                    <p className="mt-3 max-w-3xl text-[1.03rem] leading-7 text-slate-700 dark:text-slate-300">
                        Si venis desde Palermo, Belgrano, Almagro, Caballito o Microcentro,
                        armamos presupuesto rapido y te orientamos segun la falla para evitar demoras.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-4">
                        <TrackedCtaLink
                            href="/reparacion-de-celulares-cerca-de-mi"
                            ctaName="home_near_me_landing"
                            ctaLocation="home_near_me_section"
                            ctaVariant="secondary"
                            className={neutralCtaClass}
                        >
                            Ver cobertura cerca de mi
                        </TrackedCtaLink>
                        <TrackedCtaLink
                            href="/zonas"
                            ctaName="home_zones_index"
                            ctaLocation="home_near_me_section"
                            ctaVariant="secondary"
                            className={neutralCtaClass}
                        >
                            Ver todas las zonas
                        </TrackedCtaLink>
                    </div>
                </section>

                <KnowledgeGrid />

                <article className="relative overflow-hidden bg-slate-950 p-8 text-center text-white md:text-left lg:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-primary md:text-[2rem]">
                        ¿Listo para recuperar tu teléfono?
                    </h2>
                    <p className="mt-4 text-[1.03rem] leading-7 text-slate-300">
                        Dejanos la falla y un dato de contacto. Te respondemos
                        por WhatsApp en hasta 2 horas habiles para avanzar
                        sin perder tiempo.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                        <TrackedCtaLink
                            href="/presupuesto-reparacion#solicitar-presupuesto"
                            ctaName="home_bottom_budget"
                            ctaLocation="home_bottom_section"
                            ctaVariant="primary"
                            className={primaryCtaClass}
                        >
                            Pedir presupuesto ahora
                        </TrackedCtaLink>
                        <TrackedCtaLink
                            href="https://wa.me/5491151034595?text=Hola%20Team%20Celular,%20necesito%20una%20reparacion"
                            ctaName="home_bottom_whatsapp"
                            ctaLocation="home_bottom_section"
                            ctaVariant="whatsapp"
                            external
                            target="_blank"
                            className={neutralCtaClass}
                        >
                            Hablar por WhatsApp
                        </TrackedCtaLink>
                    </div>
                </article>
            </section>

        </section>
    );
}

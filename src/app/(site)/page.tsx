import Link from "next/link";
import { BsArrowRight, BsBatteryHalf, BsChatDots, BsClipboardCheck, BsLightningCharge, BsPhone, BsSearch } from "react-icons/bs";
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
        icon: BsPhone,
    },
    {
        title: "Batería",
        description: "Poca autonomía, apagados o temperatura anormal. Primero revisamos el consumo del equipo.",
        href: "/reparaciones/cambio-bateria-caba",
        icon: BsBatteryHalf,
    },
    {
        title: "Puerto de carga",
        description: "Falso contacto, carga lenta o cable que no reconoce. Evitá forzarlo: puede agravar la falla.",
        href: "/reparaciones/cambio-pin-carga-caba",
        icon: BsLightningCharge,
    },
];

const process = [
    { icon: BsChatDots, title: "Contanos la falla", description: "Con marca y modelo podemos orientarte y derivarte a la sucursal correcta." },
    { icon: BsSearch, title: "Revisamos el equipo", description: "El diagnóstico define qué conviene reparar, qué se reemplaza y cuánto demora." },
    { icon: BsClipboardCheck, title: "Decidís con el presupuesto", description: "Avanzamos después de explicarte el trabajo. La reparación queda documentada." },
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

export default function Home() {
    const prices = [
        ["Pantalla iPhone 13", iphone13?.screen ? formatArsPrice(iphone13.screen) : "Consultar"],
        ["Batería iPhone 13", iphone13?.battery ? formatArsPrice(iphone13.battery) : "Consultar"],
        ["Pantalla Samsung Galaxy A", `desde ${formatArsPrice(samsungA.from)}`],
        ["Pantalla Motorola Moto G", `desde ${formatArsPrice(motoG.from)}`],
    ];

    return (
        <div className="w-full bg-black text-[#f5f5f7]">
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

            <BannerHome />

            <section aria-labelledby="repairs-title" className="tc-section">
                <div className="tc-reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 id="repairs-title" className="tc-heading max-w-2xl">Empezá por lo que le pasa al equipo</h2>
                    <Link href="/reparaciones" className="tc-link inline-flex items-center gap-1 text-[17px]">
                        Todas las reparaciones <BsArrowRight aria-hidden className="text-sm" />
                    </Link>
                </div>
                <p className="tc-body mt-4 max-w-xl">
                    Estas son las consultas más frecuentes. Si la falla no encaja, no adivines: escribinos y la revisamos.
                </p>
                <div className="tc-stagger mt-12 grid gap-5 md:grid-cols-3">
                    {priorityRepairs.map(({ icon: Icon, ...repair }) => (
                        <Link key={repair.href} href={repair.href} className="tc-card group flex min-h-[18rem] flex-col transition-colors hover:bg-[#262628]">
                            <Icon className="text-4xl text-[#f5f5f7]" aria-hidden />
                            <h3 className="tc-subheading mt-auto pt-10">{repair.title}</h3>
                            <p className="tc-body mt-3">{repair.description}</p>
                            <span className="tc-link mt-5 inline-flex items-center gap-1 text-[17px]">
                                Ver reparación <BsArrowRight aria-hidden className="text-sm transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <section aria-labelledby="prices-title" className="w-full bg-[#f5f5f7] text-[#1d1d1f]">
                <div className="tc-section grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 id="prices-title" className="tc-heading !text-[#1d1d1f]">¿Cuánto sale reparar un celular en CABA?</h2>
                        <p className="mt-5 max-w-lg text-pretty text-[19px] leading-[1.42] text-[#424245]">
                            Más de 15 años reparando celulares, con{" "}
                            {GOOGLE_RATING_FALLBACK.rating.toFixed(1).replace(".", ",")} estrellas en Google sobre{" "}
                            {GOOGLE_RATING_FALLBACK.total} reseñas. Pantalla y batería salen en 2 a 4 horas.
                        </p>
                        <div className="mt-6 flex flex-col gap-2 text-[17px] text-[#0066cc]">
                            <Link href="/guias/reparacion-iphone-buenos-aires#costos-reparacion-iphone" className="hover:underline">Precios de iPhone por modelo ›</Link>
                            <Link href="/guias/reparacion-samsung-buenos-aires" className="hover:underline">Precios de Samsung ›</Link>
                            <Link href="/guias/reparacion-motorola-buenos-aires" className="hover:underline">Precios de Motorola ›</Link>
                        </div>
                    </div>
                    <dl className="tc-reveal rounded-[28px] bg-white p-7 sm:p-9">
                        {prices.map(([label, value]) => (
                            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-[#d2d2d7] py-4 first:pt-0 last:border-0 last:pb-0">
                                <dt className="text-[17px] text-[#424245]">{label}</dt>
                                <dd className="text-[21px] font-semibold tabular-nums">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section aria-labelledby="process-title" className="tc-section">
                <div className="tc-reveal text-center">
                    <h2 id="process-title" className="tc-heading mx-auto max-w-3xl">Diagnóstico primero. Reparación después.</h2>
                    <p className="tc-body mx-auto mt-5 max-w-xl">
                        No hace falta que conozcas el nombre técnico de la falla. Necesitamos saber qué equipo tenés, qué pasó y cómo se comporta.
                    </p>
                </div>
                <ol className="tc-stagger mt-12 grid gap-5 md:grid-cols-3">
                    {process.map(({ icon: Icon, ...step }, index) => (
                        <li key={step.title} className="tc-card">
                            <div className="flex items-center justify-between">
                                <Icon className="text-3xl text-[#6aa6ff]" aria-hidden />
                                <span className="text-[14px] tabular-nums text-[#86868b]">0{index + 1}</span>
                            </div>
                            <h3 className="tc-subheading mt-10">{step.title}</h3>
                            <p className="tc-body mt-3">{step.description}</p>
                        </li>
                    ))}
                </ol>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                    <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="home_process_budget" ctaLocation="home_process" ctaVariant="primary" className="tc-btn tc-btn-primary">
                        Contar la falla
                    </TrackedCtaLink>
                    <BranchWhatsAppButton ctaName="home_process_whatsapp" ctaLocation="home_process" message="Hola Team Celular, quiero consultar por una falla." className="tc-link inline-flex min-h-11 items-center gap-1 text-[17px]">
                        Consultar por WhatsApp <BsArrowRight aria-hidden className="text-sm" />
                    </BranchWhatsAppButton>
                </div>
            </section>

            <div className="tc-section !pt-0">
                <GoogleReviewsAPI />
            </div>

            <section aria-labelledby="faq-title" className="tc-section">
                <h2 id="faq-title" className="tc-heading">Antes de traer el equipo</h2>
                <div className="mt-10 divide-y divide-[#333336] border-y border-[#333336]">
                    {faqs.map((faq) => (
                        <article key={faq.question} className="grid gap-3 py-7 md:grid-cols-[1fr_1.4fr] md:gap-10">
                            <h3 className="text-[19px] font-semibold leading-snug sm:text-[21px]">{faq.question}</h3>
                            <p className="tc-body">{faq.answer}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="locations-title" className="tc-section">
                <h2 id="locations-title" className="tc-heading">Dónde estamos</h2>
                <p className="tc-body mt-4">Lunes a viernes de 10:30 a 18:00, sin turno.</p>
                <div className="tc-stagger mt-10 grid gap-5 md:grid-cols-2">
                    {BRANCHES.map((branch) => (
                        <div key={branch.slug} className="tc-card flex flex-col gap-5 !p-3">
                            <BranchMap
                                address={`${branch.street}, ${branch.neighborhood}, CABA`}
                                name={branch.shortName}
                                className="!rounded-[20px] !border-0"
                            />
                            <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-4">
                                <p className="text-[17px]">
                                    <span className="font-semibold">{branch.shortName}</span>
                                    <span className="text-[#86868b]"> — {branch.street}, {branch.neighborhood}.</span>
                                </p>
                                <Link href={branch.url} className="tc-link text-[17px]">Cómo llegar ›</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="tc-section !pt-0">
                <KnowledgeGrid />
            </div>

            <section aria-labelledby="final-cta-title" className="tc-section tc-reveal text-center">
                <h2 id="final-cta-title" className="tc-heading mx-auto max-w-3xl">Contanos qué le pasa. Te decimos cómo seguir.</h2>
                <p className="tc-body mx-auto mt-5 max-w-xl">Incluí marca, modelo y falla. Si podés, sumá una foto. Respondemos {BUSINESS_PROFILE.responseWindow}.</p>
                <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="home_bottom_budget" ctaLocation="home_bottom" ctaVariant="primary" className="tc-btn tc-btn-primary mt-8">
                    Pedir presupuesto
                </TrackedCtaLink>
            </section>
        </div>
    );
}

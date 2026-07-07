import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    FaAward,
    FaCertificate,
    FaCheckCircle,
    FaClock,
    FaGlobe,
    FaHandshake,
    FaHeart,
    FaLightbulb,
    FaMapMarkerAlt,
    FaMicroscope,
    FaShieldAlt,
    FaStar,
    FaTools,
    FaUsers,
} from "react-icons/fa";

export const metadata: Metadata = {
    title: "Sobre Team Celular | Laboratorio de Celulares en Recoleta, CABA",
    description:
        "Team Celular, Paraguay 2451 Recoleta. Laboratorio familiar, 15+ años en reparación de celulares y microelectrónica con garantía escrita en cada trabajo.",
    keywords: [
        "sobre team celular",
        "empresa familiar reparacion celulares",
        "15 anos experiencia tecnica",
        "laboratorio microelectronica caba",
        "servicio tecnico certificado",
        "historia team celular",
    ],
    alternates: {
        canonical: "https://teamcelular.com/sobrenosotros",
    },
    openGraph: {
        title: "Sobre Team Celular | Laboratorio de Celulares en Recoleta",
        description:
            "Team Celular, Paraguay 2451 Recoleta CABA. Laboratorio familiar con más de 15 años en reparación de celulares y microelectrónica con garantía escrita.",
        type: "website",
        url: "https://teamcelular.com/sobrenosotros",
        locale: "es_AR",
        images: [
            {
                url: "https://teamcelular.com/images/empresaFamiliar.webp",
                width: 1200,
                height: 630,
                alt: "Team Celular - Empresa Familiar",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sobre Team Celular | Laboratorio en Recoleta, CABA",
        description: "Laboratorio familiar en Paraguay 2451 Recoleta. Más de 15 años en reparación de celulares y microelectrónica con garantía escrita.",
        images: ["https://teamcelular.com/images/empresaFamiliar.webp"],
    },
};

const timeline = [
    {
        year: "2009",
        location: "Venezuela",
        title: "Nuestros comienzos",
        description:
            "Empezamos como un taller familiar especializado en reparacion de dispositivos moviles.",
    },
    {
        year: "2012",
        location: "Venezuela",
        title: "Expansion tecnica",
        description:
            "Sumamos microelectronica y reparacion a nivel placa para resolver fallas que otros no tomaban.",
    },
    {
        year: "2015",
        location: "Panama",
        title: "Internacionalizacion",
        description:
            "Abrimos una operacion en Panama y consolidamos metodologia y trazabilidad.",
    },
    {
        year: "2018",
        location: "Argentina",
        title: "Llegada a Buenos Aires",
        description:
            "Instalamos nuestro laboratorio principal en Recoleta y profundizamos foco en service premium.",
    },
    {
        year: "2025",
        location: "Recoleta · Belgrano",
        title: "Expansión en CABA",
        description:
            "Con miles de equipos reparados, abrimos segunda sucursal en Belgrano (Amenábar 2032) para cubrir más de CABA con el mismo nivel técnico.",
    },
];

const values = [
    {
        icon: FaAward,
        title: "Diagnóstico antes que cambio",
        description:
            "Medimos y evaluamos antes de recomendar. No cambiamos piezas por descarte.",
    },
    {
        icon: FaLightbulb,
        title: "Equipamiento real de laboratorio",
        description:
            "Microscopios, estaciones de soldadura y herramientas de precisión para trabajo fino.",
    },
    {
        icon: FaHandshake,
        title: "Presupuesto claro antes de avanzar",
        description:
            "Te explicamos la falla, el costo y el riesgo antes de tocar el equipo.",
    },
    {
        icon: FaShieldAlt,
        title: "Garantía escrita en cada trabajo",
        description:
            "90 días sobre trabajo y repuesto instalado, con alcance detallado por escrito al momento de entrega.",
    },
];

const differentiators = [
    {
        icon: FaCertificate,
        title: "Protocolos ESD",
        description: "Proteccion antiestatica y trazabilidad en el banco de trabajo.",
    },
    {
        icon: FaMicroscope,
        title: "Microelectronica avanzada",
        description: "Diagnostico a nivel componente y reballing para casos complejos.",
    },
    {
        icon: FaTools,
        title: "Equipamiento profesional",
        description: "Laboratorio preparado para reparaciones finas y controles reales.",
    },
    {
        icon: FaCheckCircle,
        title: "Repuestos de confianza",
        description: "Trabajamos con proveedores certificados y alternativas premium.",
    },
    {
        icon: FaUsers,
        title: "Empresa familiar",
        description: "Trato cercano y seguimiento personalizado en cada caso.",
    },
    {
        icon: FaStar,
        title: "Experiencia internacional",
        description: "Mas de 15 anos reparando en Venezuela, Panama y Argentina.",
    },
];

const stats = [
    { icon: FaClock, value: "15+", label: "Anos de experiencia" },
    { icon: FaUsers, value: "10.000+", label: "Equipos reparados" },
    { icon: FaGlobe, value: "3", label: "Paises" },
    { icon: FaStar, value: "4.8", label: "Calificacion promedio" },
];

export default function SobreNosotrosPage() {
    return (
        <section className="w-full">
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
                <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Link href="/" className="transition hover:text-primary">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Sobre nosotros
                    </span>
                </nav>

                <header className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-8 shadow-lg md:p-12">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Empresa familiar
                        </span>
                        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                            Más de 15 años reparando celulares con criterio
                            técnico y garantía escrita
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Team Celular es un laboratorio familiar con más de 15 años reparando
                            celulares y microelectrónica, con sucursales en Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032), CABA. La propuesta sigue siendo
                            la misma: diagnóstico honesto, repuestos de calidad y
                            garantía escrita de 90 días sobre cada trabajo.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <article
                                    key={stat.label}
                                    className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-800/70 p-6 text-center"
                                >
                                    <Icon className="mx-auto text-3xl text-primary" />
                                    <p className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                        {stat.label}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </header>

                <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 shadow-lg">
                    <div className="relative h-[360px] w-full md:h-[500px]">
                        <Image
                            src="/images/empresaFamiliar.webp"
                            alt="Team Celular - Empresa familiar"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                            <h2 className="text-3xl font-bold">
                                Una historia de trabajo tecnico sostenido
                            </h2>
                            <p className="mt-2 max-w-2xl text-base leading-7 text-white/85">
                                Pasamos por distintos mercados y etapas, pero el
                                foco siempre fue el mismo: resolver bien y generar
                                confianza a largo plazo.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Nuestra historia
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Hitos que marcaron como evoluciono el taller.
                        </p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {timeline.map((event) => (
                            <article
                                key={`${event.year}-${event.title}`}
                                className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-3xl font-black text-primary">
                                        {event.year}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <FaMapMarkerAlt />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
                                    {event.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {event.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Nuestros valores
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Principios que se ven en cada presupuesto y en cada
                            reparacion.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <article
                                    key={value.title}
                                    className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md"
                                >
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="text-2xl" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-slate-100">
                                        {value.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {value.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Por que elegirnos
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Lo que hace distinta la experiencia de Team Celular.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {differentiators.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-6 shadow-md"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="grid gap-8 md:grid-cols-2">
                    <article className="rounded-3xl border border-primary/20 bg-white dark:bg-slate-900 p-8 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                                <FaHeart className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Nuestra mision
                            </h2>
                        </div>
                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Brindar soluciones tecnicas confiables para equipos
                            que la gente necesita recuperar rapido y bien. Nos
                            enfocamos en calidad de ejecucion, claridad comercial
                            y seguimiento real.
                        </p>
                    </article>

                    <article className="rounded-3xl border border-secondary/20 bg-white dark:bg-slate-900 p-8 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
                                <FaGlobe className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Nuestra vision
                            </h2>
                        </div>
                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Ser referencia en soluciones tecnicas para celulares,
                            microelectronica y soporte especializado en Buenos
                            Aires, con una experiencia sobria, confiable y medible.
                        </p>
                    </article>
                </section>

                <section className="rounded-3xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900 p-10 text-center shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        Queres conocer nuestro laboratorio?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Dos laboratorios en CABA: Recoleta (Paraguay 2451) y Belgrano (Amenábar 2032). Vení cuando quieras y te mostramos cómo trabajamos.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contacto"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
                        >
                            Visitanos
                        </Link>
                        <Link
                            href="/presupuesto-reparacion"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
                        >
                            Solicitar presupuesto
                        </Link>
                        <Link
                            href="/guias"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                        >
                            Ver guias tecnicas
                        </Link>
                    </div>
                </section>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "AboutPage",
                            name: "Sobre Nosotros - Team Celular",
                            description:
                                "Historia y valores de Team Celular, empresa familiar con mas de 15 anos de experiencia en reparacion de dispositivos moviles",
                            url: "https://teamcelular.com/sobrenosotros",
                            mainEntity: {
                                "@type": "Organization",
                                name: "Team Celular",
                                foundingDate: "2009",
                                description:
                                    "Empresa familiar especializada en reparacion de celulares y microelectronica con presencia en Venezuela, Panama y Argentina",
                                location: [
                                    {
                                        "@type": "Place",
                                        name: "Team Celular Recoleta",
                                        address: {
                                            "@type": "PostalAddress",
                                            streetAddress: "Paraguay 2451",
                                            addressLocality: "Recoleta",
                                            addressRegion: "CABA",
                                            addressCountry: "AR",
                                        },
                                    },
                                    {
                                        "@type": "Place",
                                        name: "Team Celular Belgrano",
                                        address: {
                                            "@type": "PostalAddress",
                                            streetAddress: "Amenábar 2032",
                                            addressLocality: "Belgrano",
                                            addressRegion: "CABA",
                                            addressCountry: "AR",
                                        },
                                    },
                                ],
                                areaServed: [
                                    { "@type": "Country", name: "Venezuela" },
                                    { "@type": "Country", name: "Panama" },
                                    { "@type": "Country", name: "Argentina" },
                                ],
                            },
                        }),
                    }}
                />
            </div>
        </section>
    );
}


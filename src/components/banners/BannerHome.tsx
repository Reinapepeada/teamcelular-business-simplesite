import Image from "next/image";
import Link from "next/link";

const trustSignals = [
    "10+ años reparando celulares",
    "Respuesta comercial en menos de 2 horas hábiles",
    "Garantía escrita por 90 días",
];

export default function BannerHome() {
    return (
        <section className="w-full max-w-[100rem] rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="space-y-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                        Servicio técnico en Recoleta
                    </p>

                    <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.1rem]">
                        Arreglamos tu celular el mismo día
                    </h1>

                    <div className="max-w-xl space-y-3 text-base leading-7 text-slate-700 sm:text-[1.03rem]">
                        <p>Repuestos de calidad, diagnóstico claro y garantía real.</p>
                        <p>
                            Si tu equipo es de trabajo, coordinamos prioridad,
                            presupuesto y seguimiento sin vueltas.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/presupuesto-reparacion"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:bg-primary/90"
                        >
                            Solicitar presupuesto
                        </Link>
                        <Link
                            href="/tienda"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-7 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                        >
                            Ver productos
                        </Link>
                    </div>

                    <ul className="grid gap-3 pt-2 text-sm text-slate-600 sm:grid-cols-3">
                        {trustSignals.map((item) => (
                            <li
                                key={item}
                                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative mx-auto w-full max-w-[32rem]">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
                        <Image
                            src="/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp"
                            alt="Técnico reparando un smartphone en el laboratorio"
                            width={960}
                            height={1120}
                            quality={62}
                            sizes="(max-width: 1024px) 92vw, 42vw"
                            className="h-[22rem] w-full object-cover sm:h-[28rem]"
                            priority
                        />
                    </div>

                    <div className="absolute bottom-4 left-4 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-lg">
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Respuesta comercial
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            <span className="text-primary">&lt; 2 horas</span> en horario laboral
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

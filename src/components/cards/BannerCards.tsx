import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFillLightningChargeFill, BsWhatsapp } from "react-icons/bs";

const cardBase =
    "group relative col-span-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

const headerBase =
    "absolute inset-x-0 top-0 z-20 flex-col !items-start gap-2.5 p-5 text-left sm:p-6";

const eyebrow =
    "inline-flex rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white";

const heading =
    "max-w-[92%] text-xl font-semibold leading-snug text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] sm:text-2xl";

const mediaBase =
    "absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]";

const overlayBase =
    "pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/78 via-slate-950/30 to-transparent";

export default function BannerCards() {
    return (
        <section className="mx-auto grid w-full max-w-[100rem] grid-cols-12 gap-6">
            <h2 className="sr-only">Servicios y diferenciales de Team Celular</h2>

            <article className={`${cardBase} h-[300px] md:col-span-4 lg:h-[320px]`}>
                <Image
                    alt="Técnico realizando cambio de repuestos"
                    className={mediaBase}
                    src="/images/celuPorDentro.webp"
                    width={900}
                    height={900}
                    quality={62}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 380px"
                />
                <div className={overlayBase} />
                <div className={headerBase}>
                    <p className={eyebrow}>Repuestos de calidad</p>
                    <h3 className={heading}>Cambio de partes originales</h3>
                </div>
            </article>

            <article className={`${cardBase} h-[300px] md:col-span-4 lg:h-[320px]`}>
                <Image
                    alt="Diferentes dispositivos listos para reparación"
                    className={mediaBase}
                    src="/images/dispositivoshdpro.webp"
                    width={900}
                    height={900}
                    quality={62}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 380px"
                />
                <div className={overlayBase} />
                <div className={headerBase}>
                    <p className={eyebrow}>Celulares - Tablets - Notebooks</p>
                    <h3 className={heading}>Arreglo para todos tus dispositivos</h3>
                </div>
            </article>

            <article className={`${cardBase} h-[300px] md:col-span-4 lg:h-[320px]`}>
                <Image
                    alt="Laboratorio de microelectrónica con equipamiento profesional"
                    className={mediaBase}
                    src="/images/guia_microelectronica.webp"
                    width={900}
                    height={900}
                    quality={62}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 380px"
                />
                <div className={overlayBase} />
                <div className={headerBase}>
                    <p className={eyebrow}>Herramientas profesionales</p>
                    <h3 className={heading}>
                        Microscopio y diagnóstico fino sin inflar la primera carga
                    </h3>
                </div>
            </article>

            <article className={`${cardBase} h-[320px] md:col-span-5 lg:h-[340px]`}>
                <Image
                    alt="Asesoramiento personalizado del equipo"
                    className={mediaBase}
                    src="/images/card_atencion_cliente_home.webp"
                    width={900}
                    height={900}
                    quality={58}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 45vw, 520px"
                />
                <div className={overlayBase} />
                <div className={headerBase}>
                    <p className={eyebrow}>Atención al cliente</p>
                    <h3 className={heading}>Tenemos la mejor atención para vos</h3>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/20 bg-black/45 p-4 sm:p-5">
                    <div className="flex w-full flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[0.92rem] font-medium leading-snug text-white/90">
                            Comunicate con nuestro equipo
                        </p>
                        <Link
                            href="https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 sm:w-fit"
                        >
                            <BsWhatsapp className="text-lg" aria-hidden />
                            Pedir presupuesto por WhatsApp
                        </Link>
                    </div>
                </div>
            </article>

            <article className={`${cardBase} h-[320px] md:col-span-7 lg:h-[340px]`}>
                <Image
                    alt="Técnico trabajando en microelectrónica"
                    className={mediaBase}
                    src="/images/empresaFamiliar.webp"
                    width={900}
                    height={900}
                    quality={60}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 58vw, 760px"
                />
                <div className={overlayBase} />
                <div className={headerBase}>
                    <p className={eyebrow}>Microelectrónica</p>
                    <h3 className={heading}>
                        Reparaciones de placa a nivel componente
                    </h3>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/20 bg-black/45 p-4 sm:p-5">
                    <div className="flex w-full flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[0.92rem] font-medium leading-snug text-white/90">
                            Presupuesto personalizado
                        </p>
                        <Link
                            href="/presupuesto-reparacion"
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-white shadow-md transition hover:bg-primary/90 sm:w-fit"
                        >
                            <BsFillLightningChargeFill className="text-base" aria-hidden />
                            Cotizá tu reparación
                        </Link>
                    </div>
                </div>
            </article>
        </section>
    );
}

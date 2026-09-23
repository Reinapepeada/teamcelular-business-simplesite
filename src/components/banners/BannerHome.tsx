import Image from "next/image";
import { BsArrowRight, BsCheck2, BsWhatsapp } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";

const intakeProofs = [
    "Diagnóstico antes de intervenir",
    "Orden técnica al ingresar",
    "Garantía escrita de 90 días",
];

export default function BannerHome() {
    return (
        <section className="relative w-full overflow-x-clip bg-black text-[#f5f5f7]">
            <div className="tc-intro mx-auto max-w-[1200px] px-4 pt-14 text-center sm:px-6 sm:pt-20">
                <p className="tc-eyebrow">Recoleta y Belgrano · Lun–Vie, 10:30–18:00</p>
                <h1 className="tc-display mx-auto mt-3 max-w-[15em]">
                    Reparación de celulares en CABA: pantalla y batería en el día
                </h1>
                <p className="mx-auto mt-5 max-w-[38rem] text-pretty text-[19px] leading-[1.4] text-[#86868b] sm:text-[21px]">
                    Sin turno, en Recoleta y Belgrano. Si el repuesto está en stock, te lo llevás en 2 a 4 horas. Contanos la falla por WhatsApp y te pasamos precio y plazo antes de que vengas.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                    <TrackedCtaLink
                        href="/presupuesto-reparacion#solicitar-presupuesto"
                        ctaName="home_hero_budget"
                        ctaLocation="home_hero"
                        ctaVariant="primary"
                        className="tc-btn tc-btn-primary"
                    >
                        Pedir presupuesto
                    </TrackedCtaLink>
                    <BranchWhatsAppButton
                        ctaName="home_hero_whatsapp"
                        ctaLocation="home_hero"
                        message="Hola Team Celular, necesito una reparación."
                        className="tc-link inline-flex min-h-11 items-center gap-2 text-[17px]"
                    >
                        <BsWhatsapp aria-hidden />
                        Consultar por WhatsApp
                        <BsArrowRight aria-hidden className="text-sm" />
                    </BranchWhatsAppButton>
                </div>

                <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-2 text-[14px] text-[#86868b]">
                    {intakeProofs.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                            <BsCheck2 className="text-[#6aa6ff]" aria-hidden />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Foto fija (sticky) mientras las frases pasan por encima, al estilo
                de las secciones de producto de Apple. Sin JS: sticky + scroll-driven CSS. */}
            <div className="tc-hero relative mt-12">
                <div className="sticky top-[52px] h-[calc(100svh-52px)] px-4 pb-24 sm:px-6">
                    <div className="tc-zoom relative mx-auto h-full max-w-[1200px] overflow-hidden rounded-[28px]">
                        <Image
                            src="/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp"
                            alt="Técnico de Team Celular trabajando sobre un smartphone"
                            fill
                            quality={82}
                            sizes="(max-width: 768px) 250vw, (max-width: 1200px) 100vw, 1200px"
                            className="object-cover object-[center_30%]"
                            priority
                        />
                        <div className="tc-dim pointer-events-none absolute inset-0 bg-black/70" />

                        {/* Frases dentro de la tarjeta: se turnan con el scroll del
                            contenedor (.tc-hero), nunca salen del recuadro. */}
                        <div className="tc-phrases absolute inset-x-0 top-0 bottom-24 flex flex-col items-center justify-center gap-4 px-6 text-center">
                            {[
                                "Más de 15 años reparando celulares.",
                                "Diagnóstico antes de tocar el equipo.",
                                "Garantía escrita de 90 días.",
                            ].map((line) => (
                                <p key={line} className="text-balance text-[clamp(1.6rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-white">
                                    {line}
                                </p>
                            ))}
                        </div>

                        <div className="tc-glass absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-[36px] px-5 py-3 sm:bottom-6 sm:left-auto sm:right-6 sm:gap-6 sm:pl-7">
                            <div className="text-left">
                                <p className="text-[14px] font-semibold text-white">Dos sucursales en CABA</p>
                                <p className="text-[12px] text-white/75">Paraguay 2451 · Amenábar 2032</p>
                            </div>
                            <TrackedCtaLink
                                href="/sucursales"
                                ctaName="home_hero_branches"
                                ctaLocation="home_hero"
                                ctaVariant="secondary"
                                className="tc-btn tc-btn-primary !min-h-10 !py-2 !text-[15px]"
                            >
                                Elegir sucursal
                            </TrackedCtaLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

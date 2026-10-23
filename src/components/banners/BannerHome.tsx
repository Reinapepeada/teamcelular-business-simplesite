import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsClipboardCheck, BsClock, BsGeoAlt, BsShieldCheck, BsWhatsapp } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";
import RepairBrandLinks from "@/components/repairs/RepairBrandLinks";
import { BRANCHES, BUSINESS_PROFILE } from "@/lib/businessProfile";

export default function BannerHome() {
    return (
        <section className="w-full bg-black text-[#f5f5f7]">
            <div className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-16">
                <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
                    <div>
                        <h1 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
                            Reparación de celulares en CABA
                        </h1>
                        <p className="mt-5 max-w-[38rem] text-pretty text-[19px] leading-relaxed text-[#a1a1a6]">
                            Pantalla, batería, carga y placa. Traé tu iPhone, Samsung, Motorola o Xiaomi a Recoleta o Belgrano, sin turno.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                            <TrackedCtaLink href="/presupuesto-reparacion#solicitar-presupuesto" ctaName="home_hero_budget" ctaLocation="home_hero" ctaVariant="primary" className="tc-btn tc-btn-primary">
                                Pedir presupuesto
                            </TrackedCtaLink>
                            <BranchWhatsAppButton ctaName="home_hero_whatsapp" ctaLocation="home_hero" message="Hola Team Celular, necesito una reparación. Marca y modelo: " className="tc-link inline-flex min-h-11 items-center gap-2 text-[17px]">
                                <BsWhatsapp aria-hidden /> WhatsApp <BsArrowRight aria-hidden className="text-sm" />
                            </BranchWhatsAppButton>
                        </div>
                        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#c7c7cc]">
                            <li className="flex items-center gap-2"><BsClipboardCheck aria-hidden className="text-[#6aa6ff]" /> Presupuesto antes de reparar</li>
                            <li className="flex items-center gap-2"><BsShieldCheck aria-hidden className="text-[#6aa6ff]" /> Garantía escrita de 90 días</li>
                        </ul>
                        <a href="#precios" className="tc-link mt-4 inline-flex min-h-11 items-center gap-2 text-[17px]">Ver precios de reparación <BsArrowRight aria-hidden /></a>
                    </div>
                    <figure className="min-w-0">
                        <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] bg-[#1d1d1f]">
                            <Image src="/images/landings/pantalla-concepto-20261023.webp" alt="Ilustración de un celular con el módulo de pantalla separado del equipo" fill priority quality={82} sizes="(max-width: 1023px) 100vw, 550px" className="bg-black object-contain" />
                        </div>
                        <figcaption className="mt-2 text-right text-xs text-[#a1a1a6]">Ilustración del módulo de pantalla.</figcaption>
                    </figure>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-3 border-t border-[#333336] py-4 text-sm text-[#a1a1a6] sm:flex-row sm:items-center">
                    <nav aria-label="Sucursales de reparación" className="flex flex-wrap gap-x-6 gap-y-1">
                        {BRANCHES.map((branch) => (
                            <Link key={branch.slug} href={branch.url} className="tc-link inline-flex min-h-11 items-center gap-2"><BsGeoAlt aria-hidden /> {branch.shortName}: {branch.street}</Link>
                        ))}
                    </nav>
                    <p className="flex items-center gap-2"><BsClock aria-hidden /> {BUSINESS_PROFILE.hours.text}</p>
                </div>
                <RepairBrandLinks />
            </div>
        </section>
    );
}

import Image from "next/image";
import { BsArrowRight, BsWhatsapp } from "react-icons/bs";
import TrackedCtaLink from "@/components/cro/TrackedCtaLink";
import BranchWhatsAppButton from "@/components/cro/BranchSelector";

const intakeProofs = [
    "Diagnóstico antes de intervenir",
    "Orden técnica al ingresar",
    "Garantía escrita de 90 días",
];

export default function BannerHome() {
    return (
        <section className="relative mx-4 mt-4 overflow-hidden rounded-[16px_16px_16px_6px] border border-[#2d2e83]/35 bg-[#171820] text-white sm:mx-6 lg:mx-8">
            <div className="grid min-h-[37rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(30rem,1.08fr)]">
                <div className="relative z-10 flex flex-col justify-between px-6 py-9 sm:px-9 lg:px-12 lg:py-12">
                    <div className="flex items-center gap-3 text-sm text-white/75">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
                        <span>Recoleta y Belgrano · Lun–Vie, 10:30–18:00</span>
                    </div>

                    <div className="my-12 max-w-[42rem] lg:my-16">
                        <h1 className="text-balance text-[clamp(2.65rem,6vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
                            Tu celular vuelve a funcionar. Vos sabés qué le hicimos.
                        </h1>
                        <p className="mt-7 max-w-[38rem] text-pretty text-lg leading-8 text-slate-200">
                            Reparamos celulares en CABA con diagnóstico previo, orden técnica y garantía escrita. Contanos la falla y te orientamos antes de que vengas.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <TrackedCtaLink
                                href="/presupuesto-reparacion#solicitar-presupuesto"
                                ctaName="home_hero_budget"
                                ctaLocation="home_hero"
                                ctaVariant="primary"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#20216b] transition duration-200 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            >
                                Pedir presupuesto
                                <BsArrowRight aria-hidden />
                            </TrackedCtaLink>
                            <BranchWhatsAppButton
                                ctaName="home_hero_whatsapp"
                                ctaLocation="home_hero"
                                message="Hola Team Celular, necesito una reparación."
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/35 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            >
                                <BsWhatsapp className="text-lg" aria-hidden />
                                Consultar por WhatsApp
                            </BranchWhatsAppButton>
                        </div>
                    </div>

                    <ul className="grid gap-3 border-t border-white/15 pt-6 text-sm text-white/80 sm:grid-cols-3">
                        {intakeProofs.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8ba7ff]" aria-hidden />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative min-h-[24rem] overflow-hidden lg:min-h-full">
                    <Image
                        src="/images/handsome-young-man-smiling-while-repairing-old-smartphone-male-technician-using-screwdriver-fix-brok.webp"
                        alt="Técnico de Team Celular trabajando sobre un smartphone"
                        fill
                        quality={82}
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-center"
                        priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171820]/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#171820]/35 lg:via-transparent" />
                    <div className="liquid-glass liquid-glass-light absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4 rounded-2xl px-5 py-4 text-[#171820] sm:bottom-6 sm:left-6 sm:right-6 sm:px-6">
                        <div>
                            <p className="text-sm font-bold">Dos sucursales en CABA</p>
                            <p className="mt-1 text-sm font-medium text-[#30313c]">Paraguay 2451 · Amenábar 2032</p>
                        </div>
                        <TrackedCtaLink
                            href="/sucursales"
                            ctaName="home_hero_branches"
                            ctaLocation="home_hero"
                            ctaVariant="secondary"
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#20216b]/20 bg-white/70 px-4 py-2 text-sm font-bold text-[#20216b] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20216b]"
                        >
                            Elegir sucursal
                            <BsArrowRight aria-hidden />
                        </TrackedCtaLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

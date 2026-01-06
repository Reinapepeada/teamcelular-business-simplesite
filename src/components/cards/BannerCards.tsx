import React from "react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";

import { BsWhatsapp, BsFillLightningChargeFill } from "react-icons/bs";
import Link from "next/link";

export default function BannerCards() {
    return (
        <div className="mx-auto grid w-full max-w-6xl grid-cols-12 grid-rows-2 gap-6 text-center">
            <Card className="col-span-12 h-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl md:col-span-4 dark:border-white/10 dark:bg-slate-900/30">
                <CardHeader className="absolute z-10 flex-col !items-start gap-3 rounded-br-3xl bg-gradient-to-b from-slate-950/80 via-slate-900/20 to-transparent p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                        Repuestos de Calidad
                    </p>
                    <h4 className="text-2xl font-semibold text-white">
                        Cambio de partes originales
                    </h4>
                </CardHeader>
                <Image
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/celuPorDentro.webp"
                    width={600}
                    height={600}
                    quality={75} // Ajusta la calidad de la imagen
                    sizes="(max-width: 1200px) 100vw, 600px" // Ajusta el tamaño de la imagen basado en el ancho de la ventana del navegador
                />
            </Card>
            <Card
                
                className="col-span-12 h-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:col-span-4 dark:border-white/10 dark:bg-slate-900/30">
                <CardHeader className="absolute z-10 flex-col !items-start gap-3 rounded-br-3xl bg-gradient-to-b from-slate-950/85 via-slate-900/30 to-transparent p-6">
                    <h6 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                        Celulares - Tablets - Notebooks
                    </h6>
                    <h4 className="text-2xl font-semibold text-white">
                        Arreglo para todos tus dispositivos
                    </h4>
                </CardHeader>
                <Image
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/dispositivoshdpro.webp"
                    width={600}
                    height={600}
                    quality={75} // Ajusta la calidad de la imagen
                    sizes="(max-width: 1200px) 100vw, 600px" // Ajusta el tamaño de la imagen basado en el ancho de la ventana del navegador
                />
            </Card>
            <Card className="col-span-12 h-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:col-span-4 dark:border-white/10 dark:bg-slate-900/30">
                <CardHeader className="absolute z-10 flex-col !items-start gap-3 rounded-br-3xl bg-gradient-to-b from-slate-950/70 via-slate-900/15 to-transparent p-6">
                    <h6 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                        Herramientas Profesionales
                    </h6>
                    <h4 className="text-2xl font-semibold text-white">
                        Ultima Tecnologia en Herramientas
                    </h4>
                </CardHeader>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover">
                    <source src="/videos/microscopio.mp4" type="video/mp4" />
                </video>
            </Card>
            <Card
                isFooterBlurred
                className="col-span-12 h-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:col-span-5 dark:border-white/10 dark:bg-slate-900/30">
                <CardHeader className="absolute z-10 flex-col items-start gap-3 rounded-br-3xl bg-gradient-to-b from-slate-950/85 via-slate-900/35 to-transparent p-6">
                    <h6 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                        Atencion al Cliente
                    </h6>
                    <h4 className="text-2xl font-semibold text-white">
                        Tenemos la mejor atención para vos
                    </h4>
                </CardHeader>
                <Image
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="/images/equipoCall.webp"
                    width={600}
                    height={600}
                    quality={75} // Ajusta la calidad de la imagen
                    sizes="(max-width: 1200px) 100vw, 600px" // Ajusta el tamaño de la imagen basado en el ancho de la ventana del navegador
                />
                <CardFooter className="absolute bottom-0 z-10 flex-col items-center justify-center space-y-3 border-t border-white/20 bg-white/10 p-6 text-center backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
                    <div className="flex flex-col items-center space-y-2">
                        <h6 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            Comunicate con nuestro Equipo
                        </h6>
                        <Button
                            className="text-base font-semibold shadow-md hover:shadow-lg"
                            as={Link}
                            color="primary"
                            radius="full"
                            href="https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n."
                            size="md">
                            <BsWhatsapp className="inline-block" />
                            Pedir presupuesto por WhatsApp
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <Card
                isFooterBlurred
                className="col-span-12 h-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:col-span-7 dark:border-white/10 dark:bg-slate-900/30">
                <CardHeader className="absolute z-10 flex-col items-start gap-3 rounded-br-3xl bg-gradient-to-b from-slate-950/85 via-slate-900/30 to-transparent p-6">
                    <h6 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                        Microelectronica
                    </h6>
                    <h4 className="text-2xl font-semibold text-white">
                        Hacemos Reparaciones a Nivel Componente placa
                    </h4>
                </CardHeader>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover">
                    <source
                        src="/videos/interposerReballing.mp4"
                        type="video/mp4"
                    />
                </video>
                <CardFooter className="absolute bottom-0 z-10 flex-col items-center justify-center space-y-3 border-t border-white/20 bg-white/10 p-6 text-center backdrop-blur-lg dark:border-white/15 dark:bg-slate-900/40">
                    <div className="flex flex-col items-center space-y-2">
                        <h6 className="text-sm text-white/80">
                            Presupuesto personalizado
                        </h6>
                        <Button
                            className="text-base font-semibold shadow-md hover:shadow-lg"
                            as={Link}
                            radius="full"
                            size="sm"
                            color="primary"
                            href="/presupuesto-reparacion">
                            <BsFillLightningChargeFill />
                            Cotiza tu reparacion
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Button,
} from "@nextui-org/react";

import { BsWhatsapp, BsFillLightningChargeFill } from "react-icons/bs";
import Link from "next/link";

export default function BannerCards() {
    return (
        <div className="w-full  md:w-3/4 text-center gap-2 grid grid-cols-12 grid-rows-2 ">
            <Card className="col-span-12 md:col-span-4 h-[300px]">
                <CardHeader className="absolute z-10  flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                        Repuestos Calidad
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                        Cambio de partes originales
                    </h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/celuPorDentro.jpg"
                    width={500}
                    height={350}
                />
            </Card>
            <Card isBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                <CardHeader className="absolute bg-black/30 z-10  flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                        Toda clase de Equipos
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                        Reparamos todos tus dispositivos
                    </h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/dispositivoshdpro.jpeg"
                    width={500}
                    height={350}
                />
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[300px]">
                <CardHeader className="absolute bg-black/10  z-10  flex-col !items-start">
                    <p className="text-tiny text-white/75 uppercase font-bold">
                        Herramientas Profesionales
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                        Ultima Tecnologia en Herramientas
                    </h4>
                </CardHeader>
                <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover">
                    <source src="/videos/microscopio.mp4" type="video/mp4" />
                </video>
            </Card>
            <Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-5">
                <CardHeader className="absolute bg-black/20 z-10  flex-col items-start">
                    <p className="text-tiny text-white/70 uppercase font-bold">
                        Atencion al Cliente
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                        Tenemos la mejor atencion para vos
                    </h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="/images/equipoCall.jpg"
                    width={500}
                    height={300}
                />
                <CardFooter className="absolute justify-center space-y-2 bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 ">
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        <p className="text-black text-sm">
                            Comunicate con nuestro Equipo
                        </p>
                        <Button
                            className="text-xl p-4"
                            as={Link}
                            color="primary"
                            radius="full"
                            href="https://wa.me/5491151034595?text=Muy%20buen%20d%C3%ADa%21%20Tengo%20una%20duda."
                            size="md">
                            <BsWhatsapp className="inline-block" />
                            ¡Quitate dudas!
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute bg-black/20 z-10  flex-col items-start">
                    <p className="text-tiny text-white/70 uppercase font-bold">
                        Microelectronica
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                        Hacemos Reparaciones a Nivel Componente
                    </h4>
                </CardHeader>
                <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover">
                    <source
                        src="/videos/interposerReballing.mp4"
                        type="video/mp4"
                    />
                </video>
                <CardFooter className="absolute justify-center bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        <p className="text-sm text-white/60">
                            Te mandamos el presupuesto personalizado
                        </p>
                        <Button
                            className="text-xl p-4"
                            as={Link}
                            radius="full"
                            size="sm"
                            color="primary"
                            href="/presupuesto-reparacion">
                            <BsFillLightningChargeFill />
                            Cotiza tu Reparacion
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

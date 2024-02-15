import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Button,
} from "@nextui-org/react";

export default function BannerCards() {
    return (
        <div className="w-full md:w-3/4 text-center gap-2 grid grid-cols-12 grid-rows-2 px-8">
            <Card className="col-span-12 md:col-span-4 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
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
                />
            </Card>
            <Card isBlurred className="col-span-12 sm:col-span-4 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                        Toda clase de Equipos
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                        Reparamos todo tipo de dispositivos
                    </h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="/images/dispositivoshdpro.jpeg"
                />
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
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
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
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
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-sm">Comunicate con nuestro Equipo</p>
                    </div>
                    <Button
                        className="text-tiny"
                        color="primary"
                        radius="full"
                        size="sm">
                        Chatea con Nosotros
                    </Button>
                </CardFooter>
            </Card>
            <Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
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
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="/images/breathing-app-icon.jpeg"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">
                                
                            </p>
                            
                        </div>
                    </div>
                    <Button radius="full" size="sm">
                    Cotiza tu Reparacion
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

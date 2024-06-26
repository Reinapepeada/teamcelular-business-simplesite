"use client";
import React from "react";
// fonts
import { Sora } from "next/font/google";
const sora = Sora({ subsets: ["latin"], weight: "300" });
// icons
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
//Elements
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";

import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Button,
} from "@nextui-org/react";

export default function FooterNUI() {
    return (
        <footer className="flex bg-footer-background w-full text-white justify-center p-9 mt-16">
            <div className="flex flex-col justify-center w-10/12 m-4">
                <div className="flex flex-col space-y-16 justify-between items-center text-center my-12 xl:flex-row xl:text-start xl:space-x-12">
                    <Card shadow="lg">
                        <CardHeader className="text-xl font-bold mx-1">
                            Recibe ofertas exclusivas novedades
                        </CardHeader>
                        <CardBody className="text-sm p-4 space-y-4">
                            <p className="ml-1">Suscribite a nuestro CLUB</p>
                            <Input
                                isDisabled
                                type="text"
                                placeholder="Ingresa tu email"
                            />
                            <Tooltip
                                color="primary"
                                content="Estamos trabajando para darte descuentos."
                                placement="bottom"
                                showArrow={true}>
                                <Button className="">Suscribirme</Button>
                            </Tooltip>
                        </CardBody>
                    </Card>
                    <Divider
                        className="hidden xl:inline"
                        orientation="vertical"
                    />
                    <div className="flex flex-col items-center justify-center space-y-4 md:space-x-12 md:flex-row md:items-baseline">
                        <div className="flex flex-col justify-center items-center md:items-start">
                            <h6 className="text-3xl font-bold">Servicios</h6>
                            <div className={`${sora.className} space-y-2 mt-2`}>
                                <h6 className="text-sm">Reparaciones</h6>
                                <h6 className="text-sm">Gremio</h6>
                                <h6 className="text-sm">Empresas</h6>
                                <h6 className="text-sm">Soporte técnico</h6>
                                <h6 className="text-sm">Instalaciones</h6>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center md:items-start">
                            <h6 className="text-3xl font-bold">Productos</h6>
                            <div className={`${sora.className} space-y-2 mt-2`}>
                                <h6 className="text-sm">Accesorios</h6>
                                <h6 className="text-sm">Electronica</h6>
                                <h6 className="text-sm">Repuestos</h6>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center md:items-start">
                            <h6 className="text-3xl font-bold">Locales</h6>
                            <div className={`${sora.className} space-y-2 mt-2`}>
                                <h6 className="text-sm">Ubicaciones</h6>
                                <h6 className="text-sm">Citas</h6>
                                <h6 className="text-sm">Horarios</h6>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center md:items-start">
                            <h6 className="text-3xl font-bold">Condiciones</h6>
                            <div className={`${sora.className} space-y-2 mt-2`}>
                                <h6 className="text-sm">
                                    Términos y condiciones
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className="m-2" />
                <div className="flex flex-row  justify-center items-center my-10 ">
                    <div
                        className={`${sora.className} flex flex-col justify-center items-center`}>
                        <h3 className="text-6xl font-bold">TEAM CELULAR</h3>
                        <p className="text-xl">
                            Reparación y Accesorios de celulares
                        </p>
                    </div>
                </div>
                <Divider className="m-2" />
                <div className="flex flex-row justify-between m-5">
                    <p className="text-md">© 2024 Team Celular</p>
                    <div className="flex flex-row justify-end items-center space-x-4">
                        <Link area-label="Whatsapp" href="https://wa.me/5491151034595?text=Muy%20buen%20d%C3%ADa%21%20Tengo%20una%20duda.">
                            <BsWhatsapp size={25} />
                        </Link>
                        <Link area-label="Instagram" href="https://www.instagram.com/teamcelular.arg/?hl=es">
                            <BsInstagram size={25} />
                        </Link>
                        <Link area-label="Facebook" href=" https://www.facebook.com/TeamCelular/?locale=es_LA">
                            <BsFacebook size={25} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

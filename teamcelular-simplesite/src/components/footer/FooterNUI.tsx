"use client";
import React from "react";
import { Sora } from "next/font/google";
const sora = Sora({ subsets: ["latin"], weight: "400" });

import { Divider } from "@nextui-org/react";

export default function FooterNUI() {
    return (
        <footer className="flex bg-footer-background place-center text-white justify-center py-9">
            <div className="flex flex-col justify-center w-2/3 m-4 ">
                <div className="flex flex-row justify-between h-64">
                    <p className="text-tiny">© 2024 Team Celular</p>
                    <div className="flex flex-row justify-center items-start space-x-12">
                        <Divider orientation="vertical" />
                        <div className="flex flex-col justify-center items-start">
                            <h6 className="text-xl font-bold">Contacto</h6>
                            <div className="space-y-2 mt-2">
                                <h6 className="text-sm">+54 9 11 51034595</h6>
                                <h6 className="text-sm">
                                    teamcelular.arg@gmail.com
                                </h6>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <h6 className="text-xl font-bold">Ubicación</h6>
                            <div className="space-y-2 mt-2">
                                <h6 className="text-sm">CABA, Argentina</h6>
                                <h6 className="text-sm">Calle Paraguay 2451</h6>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <h6 className="text-xl font-bold">Condiciones</h6>
                            <div className="space-y-2 mt-2">
                            <h6 className="text-sm">Términos y condiciones</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className="m-2" />
                <div className="flex flex-row  justify-center items-center my-10 ">
                    {/* <img
                        src="/images/teamcelular.png"
                        alt="logo Team Celular"
                        className="h-32"
                    /> */}
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
                        <img
                            src="/images/facebook.png"
                            alt="facebook"
                            className="h-6"
                        />
                        <img
                            src="/images/insta.png"
                            alt="instagram"
                            className="h-6"
                        />
                        <img
                            src="/images/whatsapp.png"
                            alt="twitter"
                            className="h-6"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}

import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import { Oswald } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";
const oswald = Oswald({ subsets: ["latin"], weight: "400" });

export default function BannerHome() {
    return (
        <div
            className="
            flex 
            flex-col
            justify-center
            items-center
            space-y-6
            md:flex-row
            md:space-y-8
            md:w-3/4
            ">
            <div
                className={`${oswald.className} text-6xl p-2 m-2 light:text-black`}>
                <h1>Servicio Técnico Profesional</h1>
                <Button
                    className="w-1/2 bg-gradient-to-r from-primary to-secondary text-xl"
                    radius="sm"
                    variant="shadow"
                    as={Link}
                    href="/presupuesto-reparacion">
                    Presupuesto
                </Button>
            </div>
            <div className="flex flex-col items-center justify-end xl:flex-row">
                <div
                    className="object-cover flex justify-center 
                    m-3
                    w-10/12
                    md:w-1/2
                    xl:w-1/3
                ">
                    <ReparacionCelular />
                </div>
                <div
                    className="flex flex-col 
                items-center justify-center text-center md:text-start md:w-1/4">
                    <p
                        className={`${oswald.className} text-4xl light:text-black`}>
                        Tu
                        <span className="text-primary font-bold"> comunicacion </span>
                         es nuestra
                        <span className="text-secondary font-bold"> prioridad.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

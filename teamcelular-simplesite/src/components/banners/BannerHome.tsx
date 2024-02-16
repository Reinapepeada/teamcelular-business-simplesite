import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: "500" });

export default function BannerHome() {
    return (
        <section
            className="
            flex 
            flex-col
            w-full
            justify-center
            items-center
            p-8
            space-x-4
            space-y-10
            md:flex-row
            md:space-y-8
            md:space-x-0
            md:w-3/4
        ">
            <div className={`${oswald.className} text-8xl m-2 light:text-black`}>
                <h1>Servicio Tecnico Profesional</h1>
            </div>
            <div className="flex flex-col space-x-5 items-center justify-end xl:flex-row">
                <div
                    className="object-cover flex justify-center 
            
                    w-3/4
                    md:w-1/2
                    xl:w-1/4
                ">
                    <ReparacionCelular />
                </div>
                <div
                    className="flex flex-col 
                justify-center
                items-center
                space-y-4">
                    <div className="space-y-1 flex flex-col items-baseline md:space-x-2 md:items-baseline">
                        <h2
                            className={`${oswald.className} text-5xl light:text-black`}>
                            La
                        </h2>
                        <h2
                            className={`${oswald.className} text-5xl light:text-black`}>
                            EFICIENCIA
                        </h2>
                        <h2
                            className={`${oswald.className} text-5xl light:text-black`}>
                            es nuestro norte.
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}

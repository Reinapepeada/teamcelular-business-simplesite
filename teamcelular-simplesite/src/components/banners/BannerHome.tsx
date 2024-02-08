import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import CoverImageCard from "@/components/cards/CoverImageCard";
import CoverLeguend from "../cards/CoverLeguend";
import CoverLeguend2 from "../cards/CoverLeguend2";
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: "400" });

export default function BannerHome() {
    return (
        <section
            className="flex flex-col 
        
        justify-center
        items-center
        space-y-4
        ">
            <div
                className="object-cover flex justify-center 
            
            w-3/4
            md:w-1/2
            xl:w-1/4
            ">
                <ReparacionCelular />
            </div>
            <div className="space-y-1 flex flex-col items-start md:flex md:flex-row md:space-x-2 md:items-end">
                <h2 className={`${oswald.className} text-5xl light:text-black`}>
                    La
                </h2>
                <h2 className={`${oswald.className} text-5xl light:text-black`}>
                    EFICIENCIA
                </h2>
                <h2 className={`${oswald.className} text-5xl light:text-black`}>
                    es nuestro norte.
                </h2>
            </div>
        </section>
    );
}

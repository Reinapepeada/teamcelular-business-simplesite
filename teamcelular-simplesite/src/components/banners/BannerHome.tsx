import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import CoverImageCard from "@/components/cards/CoverImageCard";
import CoverLeguend from "../cards/CoverLeguend";
import CoverLeguend2 from "../cards/CoverLeguend2";
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight:'400' });

export default function BannerHome() {
    return (
        <section className="mx-auto">
            <div className="absolute
            
            z-2
            flex
            justify-center
            w-full
            
            ">

            <h2 className={`${oswald.className} `} >La EFICIENCIA es nuestro norte.</h2>
            </div>

            <div className="object-cover flex justify-center ">
                <ReparacionCelular />
            </div>
        </section>
    );
}

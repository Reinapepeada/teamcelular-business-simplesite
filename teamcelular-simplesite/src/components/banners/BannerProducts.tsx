import React from "react";
import { WavyBackground } from "@/components/animations/BackgroundWavy";

export default function BannerProducts() {
    return (
        <div className="flex">
            <WavyBackground />
            <div
                className="absolute
                ">
                <h1 className="text-4xl font-bold">
                    Consigue tus Accesorios en un solo lugarasadsadas.
                </h1>
                <h3 className="text-md">¡Conoce nuestros productos!</h3>
            </div>
        </div>
    );
}

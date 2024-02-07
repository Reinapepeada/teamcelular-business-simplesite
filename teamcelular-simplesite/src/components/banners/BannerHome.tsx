import React from "react";
import ReparacionCelular from "@/components/animations/ReparacionCelulares";
import CoverImageCard from "@/components/cards/CoverImageCard";
import CoverLeguend from "../cards/CoverLeguend";

export default function BannerHome() {
    return (
        <section>
            <div className="m-6 ">

            <CoverImageCard />
            <ReparacionCelular />
            <CoverLeguend />
            </div>
        </section>
    );
}

import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import  Image  from "next/image";

import {
  IconHeadphones,
  IconPlug,
  IconShieldCheck,IconCpu
} from "@tabler/icons-react";

export default function BentoGridSecondDemo() {
    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={
                        <div className="relative h-48">
                            <Image
                                src={item.header}
                                alt={item.title}
                                className="object-cover w-full h-full rounded-xl"
                                width={700}
                                height={400}
                            />
                        </div>
                    }
                    className={item.className}
                    icon={item.icon}
                    link={item.link}
                />
            ))}
        </BentoGrid>
    );
}

const items = [
    {
      title: "Fundas y protectores",
      description: "Protege tu dispositivo con estilo y funcionalidad.",
      header: "/images/fundaOtter.webp", // Ruta de la imagen para fundas y protectores.
      className: "md:col-span-2",
      icon: <IconShieldCheck className="h-4 w-4 text-neutral-500" />, // Icono de una funda o escudo de protección.
      link: "/tienda/fundas-y-protectores",
    },
    {
      title: "Cargadores y cables",
      description: "Mantén tus dispositivos cargados y listos para usar.",
      header: "/images/cargadores.webp", // Ruta de la imagen para cargadores y cables.
      className: "md:col-span-1",
      icon: <IconPlug className="h-4 w-4 text-neutral-500" />, // Icono de un cargador o enchufe.
      link: "/tienda/cargadores-y-cables",
    },
    {
      title: "Auriculares y accesorios de audio",
      description: "Disfruta de tu música y llamadas con la mejor calidad de sonido.",
      header: "/images/aurisBlue.webp", // Ruta de la imagen para auriculares y accesorios de audio.
      className: "md:col-span-1",
      icon: <IconHeadphones className="h-4 w-4 text-neutral-500" />, // Icono de unos auriculares.
      link: "/tienda/auriculares-y-audio",
    },
    {
      title: "Piezas para Desktop y Notebook",
      description: "Repara o mejora tu computadora con las mejores piezas.",
      header: "/images/componentes-pc-gaming.webp", // Ruta de la imagen para piezas de computadora.
      className: "md:col-span-2",
      icon: <IconCpu className="h-4 w-4 text-neutral-500" />, // Ejemplo de un icono de placa base.
      link: "/tienda/piezas-para-desktop-y-notebook",
    },
];

import React from "react";
import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen m-3 p-2">
            <div className="mb-4 flex flex-col justify-center items-center text-center">
                <FaExclamationCircle size={48} color="red" className="mb-1" />
                <p className="text-warning mb-5 font-semibold tracking-[-0.015em]">404</p>
                <h1 className="text-4xl font-bold mb-4">
                    ¡No hemos encontrado la página a la que quieres acceder!
                </h1>
                <p className="text-xl font-semibold">
                    Pero no te preocupes, puedes volver a inicio
                </p>
            </div>
            <div className="mb-4">
                <Link href="/" className="inline-flex rounded-xl bg-primary px-4 py-2 text-primary-foreground">
                    Volver a Inicio
                </Link>
            </div>
            <nav aria-label="Dónde seguir" className="text-center text-sm">
                <p className="mb-2">También podés ir a:</p>
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 underline">
                    <li><Link href="/reparaciones">Reparaciones</Link></li>
                    <li><Link href="/sucursales">Sucursales</Link></li>
                    <li><Link href="/contacto">Contacto</Link></li>
                    <li><a href="/sitemap.xml">Mapa del sitio</a></li>
                    <li><a href="/llms.txt">llms.txt</a></li>
                </ul>
            </nav>
        </div>
    );
}

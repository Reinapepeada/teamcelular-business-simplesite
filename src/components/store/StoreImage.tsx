"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cargaDirectaImagen } from "@/lib/storeCatalog";

const PLACEHOLDER = "/placeholder.jpg";

/**
 * Foto de producto con skeleton mientras carga.
 *
 * Las fotos de la tienda llegan por una ruta firmada que se resuelve después de
 * pintar la página: sin esto el hueco quedaba vacío y la foto aparecía de golpe.
 * Mientras carga se ve un bloque que late; al llegar, la foto entra con un
 * fundido corto. Si falla, queda el placeholder en vez de un ícono roto.
 *
 * El padre tiene que ser `relative` (igual que con `fill`).
 */
export default function StoreImage({ src, alt, className = "", onLoad, onError, ...props }: ImageProps & { src: string }) {
    // Se guarda QUÉ foto terminó de cargar: al cambiar de foto (galería,
    // variante) vuelve el skeleton sin tener que resetear nada a mano.
    const [cargada, setCargada] = useState<string | null>(null);
    const [fallida, setFallida] = useState<string | null>(null);
    const origen = fallida === src ? PLACEHOLDER : src;
    const lista = cargada === origen;

    return (
        <>
            {!lista && (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-800 via-slate-700/60 to-slate-800"
                />
            )}
            <Image
                {...props}
                src={origen}
                alt={alt}
                unoptimized={props.unoptimized ?? cargaDirectaImagen(origen)}
                className={`${className} transition-[opacity,transform] duration-300 ${lista ? "opacity-100" : "opacity-0"}`}
                onLoad={event => {
                    setCargada(origen);
                    onLoad?.(event);
                }}
                onError={event => {
                    if (origen !== PLACEHOLDER) setFallida(src);
                    else setCargada(origen);
                    onError?.(event);
                }}
            />
        </>
    );
}

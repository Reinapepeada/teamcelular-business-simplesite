"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { imagenParaOptimizar } from "@/lib/storeCatalog";

const PLACEHOLDER = "/placeholder.jpg";

/**
 * Foto de producto con skeleton mientras carga.
 *
 * Las fotos de la tienda llegan por una ruta firmada que se resuelve después de
 * pintar la página: sin esto el hueco quedaba vacío y la foto aparecía de golpe.
 * El skeleton queda detrás de la imagen: el navegador puede mostrarla sin
 * esperar a la hidratación ni a onLoad. Si falla, queda el placeholder.
 *
 * El padre tiene que ser `relative` (igual que con `fill`).
 */
export default function StoreImage({ src, alt, className = "", onLoad, onError, ...props }: ImageProps & { src: string }) {
    // Se guarda QUÉ foto terminó de cargar: al cambiar de foto (galería,
    // variante) vuelve el skeleton sin tener que resetear nada a mano.
    const [cargada, setCargada] = useState<string | null>(null);
    const [fallida, setFallida] = useState<string | null>(null);
    const [directa, setDirecta] = useState<string | null>(null);
    const original = fallida === src ? PLACEHOLDER : src;
    const origen = props.unoptimized || directa === original ? original : imagenParaOptimizar(original);
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
                fetchPriority={props.fetchPriority ?? (props.priority ? "high" : undefined)}
                unoptimized={props.unoptimized ?? directa === original}
                className={`${className} transition-transform duration-300`}
                onLoad={event => {
                    setCargada(origen);
                    onLoad?.(event);
                }}
                onError={event => {
                    if (origen !== original) setDirecta(original);
                    else if (original !== PLACEHOLDER) setFallida(src);
                    else setCargada(origen);
                    onError?.(event);
                }}
            />
        </>
    );
}

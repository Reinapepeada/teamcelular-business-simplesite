import { Suspense } from "react";
import type { Metadata } from "next";

import { buildWebsiteMetadata } from "@/lib/seoMetadata";
import ExitoClient from "./ExitoClient";

/**
 * La vuelta de Mercado Pago, con el diseño del sitio.
 *
 * **No se indexa.** Es la página de un pedido concreto: no hay nada acá que
 * sirva para alguien que la encuentre en un buscador, y sí un número de pedido
 * que no tiene por qué quedar publicado.
 */
export const metadata: Metadata = buildWebsiteMetadata({
    path: "/checkout/exito",
    title: "Tu compra | Team Celular",
    description: "Estado de tu compra en Team Celular.",
    robots: { index: false, follow: false },
});

export default function Page() {
    return (
        // `useSearchParams` obliga a un límite de Suspense, o toda la ruta se
        // renderiza en el cliente.
        <Suspense fallback={null}>
            <ExitoClient />
        </Suspense>
    );
}

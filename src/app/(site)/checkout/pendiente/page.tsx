import { Suspense } from "react";
import type { Metadata } from "next";

import { buildWebsiteMetadata } from "@/lib/seoMetadata";
import ExitoClient from "../exito/ExitoClient";

/**
 * Una de las tres puertas por las que Mercado Pago devuelve al comprador.
 *
 * **La pantalla es la misma que la de éxito, y tiene que serlo.** Si el backend
 * dice que el pedido está pagado, está pagado aunque se haya vuelto por acá: la
 * puerta es parte de la URL y la URL no prueba nada. Lo único que cambia es qué
 * decirle mientras el pago no esté confirmado.
 *
 * **No se indexa:** es la página de un pedido concreto.
 */
export const metadata: Metadata = buildWebsiteMetadata({
    path: "/checkout/pendiente",
    title: "Tu pago está en camino | Team Celular",
    description: "Estado de tu compra en Team Celular.",
    robots: { index: false, follow: false },
});

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ExitoClient intencion="pendiente" />
        </Suspense>
    );
}

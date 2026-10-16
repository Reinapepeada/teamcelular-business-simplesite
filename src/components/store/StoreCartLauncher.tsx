"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useHydrated } from "@/hooks/use-hydrated";
import useCartStore from "@/store/cartStore";
import StoreCartButton from "./StoreCartButton";

const StoreCartSheet = dynamic(() => import("./StoreCartSheet"), {
    ssr: false,
    loading: () => <StoreCartButton loading />,
});

export default function StoreCartLauncher() {
    const hydrated = useHydrated();
    const open = useCartStore(state => state.open);
    const [solicitado, setSolicitado] = useState(open);
    if (open && !solicitado) setSolicitado(true);

    // Tras el primer uso queda montado: cerrar no borra envío ni checkout.
    // Antes de ese uso solo se carga el botón, sin el panel oculto ni su JS.
    return solicitado ? <StoreCartSheet /> : <StoreCartButton loading={!hydrated} />;
}

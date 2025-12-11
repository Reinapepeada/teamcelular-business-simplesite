import { Metadata } from "next";
import NotFoundPage from "@/components/outFlow/NotFoundPage";

export const metadata: Metadata = {
    title: "Página no encontrada | Team Celular",
    description: "La página que buscás no existe. Visitá nuestra página principal para conocer nuestros servicios de reparación de celulares en Buenos Aires.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <NotFoundPage />
    );
}

import { Metadata } from "next";
import StoreCartSheet from "@/components/store/StoreCartSheet";

export const metadata: Metadata = {
  title: "Tienda Online | Accesorios y Repuestos para Celulares | Team Celular",
  description:
    "Compra accesorios, fundas, cargadores, cables y repuestos para celulares con envio a todo CABA. Productos de calidad con garantia en Team Celular Buenos Aires.",
  keywords: [
    "tienda celulares Buenos Aires",
    "accesorios celular online",
    "comprar fundas celular CABA",
    "cargadores originales",
    "cables USB-C Lightning",
    "protector pantalla vidrio templado",
    "repuestos celulares Argentina",
    "auriculares inalambricos",
  ],
  alternates: {
    canonical: "https://teamcelular.com/tienda",
  },
  openGraph: {
    title: "Tienda Online | Team Celular Buenos Aires",
    description:
      "Accesorios y repuestos de calidad para tu celular con envio a todo CABA",
    type: "website",
    url: "https://teamcelular.com/tienda",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tienda Online - Team Celular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Online | Team Celular",
    description: "Accesorios y repuestos de calidad para tu celular",
    images: ["https://teamcelular.com/opengraph-image.png"],
  },
};

export default function TiendaLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <StoreCartSheet />
    </>
  );
}

import React from 'react'
import { Metadata } from 'next'
import ProductCards from '@/components/cards/ProductCards'
import BannerProducts from '@/components/banners/BannerProducts'

export const metadata: Metadata = {
  title: 'Productos y Accesorios para Celulares | Team Celular Buenos Aires',
  description: 'Descubrí nuestra variedad de productos, repuestos y accesorios para celulares: fundas, cargadores, cables, protectores de pantalla y más. Envíos a todo CABA.',
  keywords: [
    "accesorios celulares CABA",
    "fundas celular Buenos Aires",
    "cargadores originales",
    "protectores pantalla",
    "cables USB-C",
    "repuestos celulares Recoleta",
  ],
  alternates: {
    canonical: "https://teamcelular.com/productos",
  },
  openGraph: {
    title: "Productos y Accesorios | Team Celular",
    description: "Accesorios y repuestos de calidad para tu celular en Buenos Aires",
    type: "website",
    url: "https://teamcelular.com/productos",
    locale: "es_AR",
    images: [
      {
        url: "https://teamcelular.com/images/teamcelular.webp",
        width: 1200,
        height: 630,
        alt: "Team Celular - Productos y Accesorios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos y Accesorios | Team Celular",
    description: "Accesorios y repuestos de calidad para tu celular",
    images: ["https://teamcelular.com/images/teamcelular.webp"],
  },
}
export default function productos() {
  return (
    <div className='w-full m-5 space-y-10'>
      <BannerProducts  />
      <ProductCards />
    </div>
  )
}

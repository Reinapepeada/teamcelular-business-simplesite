import React from 'react'
import { Metadata } from 'next'
import ProductCards from '@/components/cards/ProductCards'
import BannerProducts from '@/components/banners/BannerProducts'

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Conoce nuestra variedad de productos y accesorios para celulares y computadoras.'
}
export default function productos() {
  return (
    <div className='w-full m-5 space-y-10'>
      <BannerProducts  />
      <ProductCards />
    </div>
  )
}

import React from 'react'
import ProductCards from '@/components/cards/ProductCards'
import BannerProducts from '@/components/banners/BannerProducts'

export default function productos() {
  return (
    <div className='w-full m-5 space-y-10'>
      <BannerProducts  />
      <ProductCards />
    </div>
  )
}

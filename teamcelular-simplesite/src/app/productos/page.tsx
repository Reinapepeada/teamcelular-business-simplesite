import React from 'react'
import BannerProducts from '@/components/banners/BannerProducts'

export default function productos() {
  return (
    <div className=''>
      <BannerProducts />
      
      <div className="flex flex-row justify-center items-center space-x-5">
        <div className="w-72 h-72 bg-gray-300 rounded-lg"></div>
        <div className="w-72 h-72 bg-gray-300 rounded-lg"></div>
        <div className="w-72 h-72 bg-gray-300 rounded-lg"></div>

      </div>

    </div>
  )
}

import React from "react"
import BannerHome from "../components/banners/BannerHome"
import BannerCards from "@/components/cards/BannerCards"


export default function Home() {
  return (
    <div className="space-y-8 m-4 flex flex-col justify-center justify-items-center">
      <BannerHome />
      
      <BannerCards />
    </div>
    
  )
}

import React from "react"
import BannerHome from "../components/banners/BannerHome"
import BannerCards from "@/components/cards/BannerCards"


export default function Home() {
  return (
    <div className="space-y-12 m-4 flex flex-col justify-center items-center">
      <BannerHome />
      <BannerCards />
    </div>
    
  )
}

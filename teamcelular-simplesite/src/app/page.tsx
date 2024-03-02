import React from "react"
import BannerHome from "../components/banners/BannerHome"
import BannerCards from "@/components/cards/BannerCards"


export default function Home() {
  return (
    <section className="space-y-12 w-10/12 flex flex-col justify-center items-center">
      <BannerHome />
      <BannerCards />
    </section>
    
  )
}

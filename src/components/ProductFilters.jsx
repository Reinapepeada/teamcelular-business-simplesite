'use client'

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { getbrands } from '@/services/brands';
import { getcategories } from '@/services/categories';

async function getFilterOptions() {
  return {
    priceRange: {
      min: 0,
      max: 1000,
    },
  };

}


export default function ProductFilters() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("categories")?.split(",") || []
  )
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get("brands")?.split(",") || []
  )
  const [selectedPriceRange, setSelectedPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "1000"),
  ])

  const fetchFilterOptions = async () => {
    const options = await getFilterOptions()
    setSelectedPriceRange([options.priceRange.min, options.priceRange.max])
  }

  async function fetchBrands() {
              const brands_server  = await getbrands();
              setBrands(brands_server);
  }
  
  async function fetchCategories() {
      const categories_server  = await getcategories();
      setCategories(categories_server);
  }

  useEffect(() => {
    fetchFilterOptions()
    fetchBrands()
    fetchCategories()
  }, [])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    )
  }

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value)
  }

  const handleMinPriceChange = (e) => {
    const newMin = Math.max(priceRange.min, Math.min(parseInt(e.target.value) || 0, selectedPriceRange[1]))
    setSelectedPriceRange([newMin, selectedPriceRange[1]])
  }

  const handleMaxPriceChange = (e) => {
    const newMax = Math.min(priceRange.max, Math.max(parseInt(e.target.value) || 0, selectedPriceRange[0]))
    setSelectedPriceRange([selectedPriceRange[0], newMax])
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()
  
    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","))
    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","))
    if (
      selectedPriceRange[0] !== priceRange.min ||
      selectedPriceRange[1] !== priceRange.max
    ) {
      params.set("minPrice", selectedPriceRange[0].toString())
      params.set("maxPrice", selectedPriceRange[1].toString())
    }
  
    router.push(`/tienda?${params.toString()}`)
  }
  

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedPriceRange([priceRange.min, priceRange.max])
    router.push("/tienda")
  }

  return (
    <aside className="w-64 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Filtros</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brands">
          <AccordionTrigger>Marcas</AccordionTrigger>
          <AccordionContent>
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => handleBrandChange(brand.id)}
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              value={selectedPriceRange}
              onValueChange={handlePriceChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-4 space-x-2">
              <Input
                type="number"
                value={selectedPriceRange[0]}
                onChange={handleMinPriceChange}
                min={priceRange.min}
                max={selectedPriceRange[1]}
                className="w-1/2"
              />
              <Input
                type="number"
                value={selectedPriceRange[1]}
                onChange={handleMaxPriceChange}
                min={selectedPriceRange[0]}
                max={priceRange.max}
                className="w-1/2"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-6 space-y-4">
        <Button onClick={handleApplyFilters} className="w-full">
          Aplicar Filtros
        </Button>
        <Button onClick={handleClearFilters} variant="outline" className="w-full">
          Limpiar Filtros
        </Button>
      </div>
    </aside>
  )
}


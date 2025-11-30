"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Chip } from "@nextui-org/react";

import { getbrands } from "@/services/brands";
import { getcategories } from "@/services/categories";
import { getMinMaxPrice } from "@/services/products";



export default function ProductFilters(params) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("categories")?.split(",") || []
  );
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get("brands")?.split(",") || []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "1000"),
  ]);

  const rangePrice = async () => {
    const priceRange = await getMinMaxPrice();
    console.log(priceRange);
    setPriceRange({
      min: priceRange.min,
      max: priceRange.max,
    });
    setSelectedPriceRange([priceRange.min, priceRange.max]);
  };

  async function fetchBrands() {
    const brands_server = await getbrands();
    setBrands(brands_server);
  }

  async function fetchCategories() {
    const categories_server = await getcategories();
    setCategories(categories_server);
  }
  useEffect(() => {
    rangePrice();
    fetchBrands();
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
  };

  const handleMinPriceChange = (e) => {
    const newMin = Math.max(
      priceRange.min,
      Math.min(parseInt(e.target.value) || 0, selectedPriceRange[1])
    );
    setSelectedPriceRange([newMin, selectedPriceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const newMax = Math.min(
      priceRange.max,
      Math.max(parseInt(e.target.value) || 0, selectedPriceRange[0])
    );
    setSelectedPriceRange([selectedPriceRange[0], newMax]);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (selectedBrands.length > 0)
      params.set("brands", selectedBrands.join(","));
    if (
      selectedPriceRange[0] !== priceRange.min ||
      selectedPriceRange[1] !== priceRange.max
    ) {
      params.set("minPrice", selectedPriceRange[0].toString());
      params.set("maxPrice", selectedPriceRange[1].toString());
    }

    router.push(`/tienda?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange([priceRange.min, priceRange.max]);
    router.push("/tienda");
  };

  return (
    <aside className="w-full md:w-1/5 md:p-1 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Filtros</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories" title="Categorías" subtitle={selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {selectedCategories.map((name) => {
              return (
                <Chip
                  key={name}
                  color="secondary"
                  variant="dot"
                  className="ml-1">
                  {name}
                </Chip>
              );
            })}
          </div>
        )}>
          
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={`category-${category.name}`}
                  checked={selectedCategories.includes(
                    category.name
                  )}
                  onCheckedChange={() =>
                    handleCategoryChange(category.name)
                  }
                />
                <label
                  htmlFor={`category-${category.name}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category.name}
                </label>
              </div>
            ))}
        </AccordionItem>
        <AccordionItem key="1" aria-label="Marca" title="Marca" subtitle={selectedBrands.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {selectedBrands.map((name) => {
              return (
                <Chip
                  key={name}
                  color="warning"
                  variant="flat"
                  className="ml-1">
                  {name}
                </Chip>
              );
            })}
          </div>
        )}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`brand-${brand.name}`}
                checked={selectedBrands.includes(
                  brand.name
                )}
                onCheckedChange={() =>
                  handleBrandChange(brand.name)
                }
              />
              <label
                htmlFor={`brand-${brand.name}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {brand.name}
              </label>
            </div>
          ))}
        </AccordionItem>
        <AccordionItem value="price" title="Precio" subtitle={selectedPriceRange[0] !== priceRange.min || selectedPriceRange[1] !== priceRange.max ? (
          <div className="flex flex-wrap gap-2 my-2">
            <Chip
              color="success"
              variant="dot"
              className="ml-2">
              ${selectedPriceRange[0]} - $
              {selectedPriceRange[1]}
            </Chip>
          </div>
        ) : null}>
          <div className="flex justify-between mt-4 space-x-2">
            <Input
              value={selectedPriceRange[0]}
              onChange={handleMinPriceChange}
              min={priceRange.min}
              max={selectedPriceRange[1]}
              className="w-1/2"
            />
            <Input
              value={selectedPriceRange[1]}
              onChange={handleMaxPriceChange}
              min={selectedPriceRange[0]}
              max={priceRange.max}
              className="w-1/2"
            />
          </div>
        </AccordionItem>
      </Accordion>
      <div className="mt-6 flex flex-row space-x-4">
        <Button onClick={handleApplyFilters} >
          Aplicar
        </Button>
        <Button
          onClick={handleClearFilters}
          variant="outline">
          Limpiar
        </Button>
      </div>
    </aside>
  );
}

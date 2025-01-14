"use client";

import React, { useState, useEffect } from "react";
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

async function getFilterOptions(params) {
  return {
    priceRange: {
      min: 0,
      max: 1000,
    },
  };
}

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

  const fetchFilterOptions = async () => {
    const options = await getFilterOptions();
    setPriceRange({
      min: options.priceRange.min,
      max: options.priceRange.max,
    });
    setSelectedPriceRange([options.priceRange.min, options.priceRange.max]);
  };

  async function fetchBrands() {
    const brands_server = await getbrands();
    setBrands(brands_server);
  }

  async function fetchCategories() {
    const categories_server = await getcategories();
    setCategories(categories_server);
  }
  async function checkParams(params) {
    console.log(params);
    console.log("selectedCategories", selectedCategories);
    console.log("selectedBrands", selectedBrands);
    console.log("selectedPriceRange", selectedPriceRange);
  }

  useEffect(() => {
    fetchFilterOptions();
    fetchBrands();
    fetchCategories();
    checkParams(params);
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
        <AccordionItem key="1" aria-label="Marcas" title="Marcas" subtitle={selectedBrands.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {selectedBrands.map((name) => {
              return (
                <Chip
                  key={name}
                  color="warning"
                  variant="dot"
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
          <Chip
            color="success"
            variant="dot"
            className="ml-2">
            ${selectedPriceRange[0]} - $
            {selectedPriceRange[1]}
          </Chip>
        ) : null}>
          <Slider
            min={priceRange.min}
            max={priceRange.max}
            step={5}
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

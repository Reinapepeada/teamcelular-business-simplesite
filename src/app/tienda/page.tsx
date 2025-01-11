"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

import { getAllProductsPaginated } from "@/services/products";
import { debounce } from "lodash";

// 
import {Card, Skeleton, Button,Input } from "@nextui-org/react"
// 
const categories = [
    "All",
    "Smartphones",
    "Tablets",
    "Laptops",
    "Accessories",
    "Repair Tools",
];

export default function TechShop() {
    const [currentCategory, setCurrentCategory] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [products, setProducts] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const itemsPerPage = 12;

    const { addToCart } = useCartStore();

    useEffect(() => {
        async function getMainProducts() {
            setIsLoading(true);
            const response = await getAllProductsPaginated(
                currentPage,
                itemsPerPage,
                currentCategory,
                searchTerm,
                priceRange
            );
            setProducts(response); // Set the product list
            setCurrentPage(response.page); // Backend page starts from 0; adjust for 1-based UI
            setIsLoading(false);
        }
        getMainProducts();
    }, [currentPage, currentCategory, searchTerm, priceRange]);
    
    const totalPages = products.total ? products.pages : 1; // Ensure it's based on the backend directly

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
            setCurrentPage(1);
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <section className="max-w-screen-2xl w-full p-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <div className="shadow rounded-lg sticky transition-colors duration-300">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="category">
                                <AccordionTrigger>Category</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <Button
                                                key={category}
                                                variant={
                                                    currentCategory === category
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="w-full justify-start"
                                                onClick={() => {
                                                    setCurrentCategory(category);
                                                    setCurrentPage(1);
                                                }}>
                                                {category}
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="price">
                                <AccordionTrigger>Price</AccordionTrigger>
                                <AccordionContent>
                                    <Slider
                                        min={0}
                                        max={1000}
                                        step={50}
                                        value={priceRange}
                                        onValueChange={(value) => {
                                            setPriceRange([value[0], value[1]]);
                                            setCurrentPage(1);
                                        }}
                                    />
                                    <div className="flex justify-between text-sm">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </aside>
                <div className="w-full md:w-3/4">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                        {isLoading ? (
                            <>
                            {/* Generar 8 skeletons para la carga inicial */}
                            {[...Array(12)].map((_, index) => (
                              <Card
                                key={index}
                                className="p-4 shadow rounded-lg border flex flex-col items-start"
                              >
                                <div className="w-full">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-600 rounded-md"
                                  >
                                    <Skeleton className="w-full h-full" />
                                  </motion.div>
                                  <div className="text-left w-full space-y-2">
                                    <Skeleton className="h-6 w-3/4 mt-2"  /> {/* Nombre del producto */}
                                    <Skeleton className="h-4 w-1/2" /> {/* Marca */}
                                    <Skeleton className="h-7 w-1/3" /> {/* Precio */}
                                  </div>
                                </div>
                                <div className="w-full mt-2">
                                  <Skeleton className="h-10 w-full" /> {/* Botón */}
                                </div>
                              </Card>
                            ))}
                          </>
                        ) : (
                            products.products.map((product) => (
                                <Card
                                    key={product.id}
                                    className="p-4 shadow rounded-lg border flex flex-col items-start">
                                    <Link href={`/product/${product.id}`} className="w-full">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="w-full h-48 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={
                                                    product?.variants[0]?.images[0]?.image_url ||
                                                    "/placeholder.jpg"
                                                }
                                                alt={product.name}
                                                className="object-contain h-full"
                                            />
                                        </motion.div>
                                        <div className="text-left">
                                            <h3 className="mt-2 text-lg font-semibold">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {product.brand.name}
                                            </p>
                                            <p className="text-xl font-bold text-blue-500">
                                                ${product.retail_price}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="flex justify-center w-full">
                                    <Button
                                        onClick={() => addToCart(product)}
                                        className="mt-2 "
                                        variant="shadow"
                                        color="primary">
                                        Add to Cart
                                    </Button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            disabled={currentPage === 1}
                            onClick={goToPreviousPage}>
                            Previous
                        </Button>
                        <span className="mx-4">Page {currentPage} of {totalPages}</span>
                        <Button
                            disabled={currentPage === totalPages}
                            onClick={goToNextPage}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

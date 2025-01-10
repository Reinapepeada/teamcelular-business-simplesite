"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import debounce from "lodash/debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

import { getAllProductsPaginated } from "@/services/products";

import { Product } from "./product";
import { mockProducts } from "./muckData";


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
    const [ratingFilter, setRatingFilter] = useState<number>(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const [products, setProducts] =useState<[]>([])

    const itemsPerPage = 12

    const { addToCart } = useCartStore();

    useEffect(() => {
        async function getMainProducts() {
            const mainProducts = await getAllProductsPaginated(1,1)
            setProducts(mainProducts.products)
        }
        getMainProducts()
        
    }, []);

    const accordionData = [
        {
            value: "category",
            trigger: "Category",
            content: (
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
                            onClick={() => setCurrentCategory(category)}>
                            {category}
                        </Button>
                    ))}
                </div>
            ),
        },
        {
            value: "price",
            trigger: "Price Range",
            content: (
                <>
                    <Slider
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={(value) =>
                            setPriceRange([value[0], value[1]])
                        }
                        className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </>
            ),
        },
        {
            value: "rating",
            trigger: "Minimum Rating",
            content: (
                <>
                    <Slider
                        min={0}
                        max={5}
                        step={0.1}
                        value={[ratingFilter]}
                        onValueChange={(value) => setRatingFilter(value[0])}
                        className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                        <span>{ratingFilter.toFixed(1)}</span>
                        <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                </>
            ),
        },
    ];

    // const filteredProducts = products
    //     .filter(
    //         (product) =>
    //             (currentCategory === "All" ||
    //                 product.category === currentCategory) &&
    //             product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //             product.price >= priceRange[0] &&
    //             product.price <= priceRange[1] &&
    //             product.rating >= ratingFilter
    //     )
    //     .sort((a, b) => b.sales - a.sales);

    // const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    // const currentProducts = filteredProducts.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

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

    // useEffect(() => {
    //     const handleEsc = (event: KeyboardEvent) => {
    //         if (event.key === "Escape") setSelectedProduct(null);
    //     };
    //     window.addEventListener("keydown", handleEsc);
    //     return () => {
    //         window.removeEventListener("keydown", handleEsc);
    //     };
    // }, []);

    const pageNumbers = [];
    const maxVisiblePages = 5;

    // let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    // let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // if (endPage - startPage + 1 < maxVisiblePages) {
    //     startPage = Math.max(1, endPage - maxVisiblePages + 1);
    // }

    // for (let i = startPage; i <= endPage; i++) {
    //     pageNumbers.push(i);
    // }

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
                                                onClick={() =>
                                                    setCurrentCategory(category)
                                                }>
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
                                        onValueChange={(value) =>
                                            setPriceRange([value[0], value[1]])
                                        }
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
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                        {products.length === 0 ? (
                            <div>Loading...</div>
                        ) : (products.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.05 }}
                                className="p-4 shadow rounded-lg border">
                                <img
                                    src={
                                        product?.variants[0]?.images[0]?.image_url ||
                                        "/placeholder.jpg"
                                    }
                                    alt={product.name}
                                    width={150}
                                    height={150}
                                    className="mx-auto"
                                />
                                <h3 className="mt-2 text-lg font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {product.brand.name}
                                </p>
                                <p className="text-xl font-bold text-blue-500">
                                    ${product.retail_price}
                                </p>
                                <Button
                                    onClick={() => addToCart(product)}
                                    className="mt-2 w-full">
                                    Add to Cart
                                </Button>
                            </motion.div>
                        )))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}>
                            Previous
                        </Button>
                        {/* <span className="mx-4">Page {currentPage} of {totalPages}</span> */}
                        <Button
                            // disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
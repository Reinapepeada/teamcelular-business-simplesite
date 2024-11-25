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

// Simulating a large number of products
const generateProducts = (count: number) => {
    const categories = [
        "Smartphones",
        "Tablets",
        "Laptops",
        "Accessories",
        "Repair Tools",
    ];
    const products = [];
    for (let i = 1; i <= count; i++) {
        products.push({
            id: i,
            name: `Tech Product ${i}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            price: Math.floor(Math.random() * 1000) + 50,
            image: "/placeholder.svg",
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            sales: Math.floor(Math.random() * 5000),
        });
    }
    return products;
};

const products = generateProducts(1000); // Generating 1000 products for this example

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    sales: number;
}

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
    const itemsPerPage = 12;

    const { addToCart } = useCartStore();

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

    const filteredProducts = products
        .filter(
            (product) =>
                (currentCategory === "All" ||
                    product.category === currentCategory) &&
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                product.price >= priceRange[0] &&
                product.price <= priceRange[1] &&
                product.rating >= ratingFilter
        )
        .sort((a, b) => b.sales - a.sales);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <section className="max-w-screen-2xl w-full p-8 sm:px-6 lg:px-8 ">
                <div className="flex flex-col  md:flex-row gap-8">
                    <aside className="w-full md:w-1/4">
                        <div
                            className={`shadow rounded-lg sticky transition-colors duration-300`}>
                            <h2 className="text-lg font-semibold mb-4">
                                Filters
                            </h2>
                            <Accordion type="single" collapsible>
                                {accordionData.map((item) => (
                                    <AccordionItem
                                        key={item.value}
                                        value={item.value}>
                                        <AccordionTrigger>
                                            {item.trigger}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </aside>

                    <div className="w-full md:w-3/4">
                        <div className="mb-6 relative">
                            <div
                                className={`relative transition-all duration-300 ${
                                    isSearchFocused ? "w-full" : "w-2/3"
                                }`}>
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className="w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}>
                                    <div
                                        className={`shadow rounded-lg overflow-hidden transition-colors duration-300 flex flex-col h-full group`}>
                                        <div className="relative overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {index === 0 && (
                                                <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900">
                                                    Best Seller
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">
                                                    {product.name}
                                                </h3>
                                                <p className={`mb-2`}>
                                                    {product.category}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-2xl font-bold">
                                                        ${product.price}
                                                    </span>
                                                    <div className="flex items-center">
                                                        <Star className="text-yellow-400 w-5 h-5 mr-1" />
                                                        <span>
                                                            {product.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setSelectedProduct(
                                                                product
                                                            )
                                                        }
                                                        className="flex-1 mr-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white">
                                                        Details
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            addToCart(product)
                                                        }
                                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-4 md:mt-8 flex justify-center items-center">
                                <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
                                    {/* First page button - hidden on mobile */}
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="hidden md:flex items-center"
                                        size="lg">
                                        <ChevronLeft className="h-6 w-6 md:h-4 md:w-4 mr-1 md:mr-2" />
                                        First
                                    </Button>

                                    {/* Previous page button */}
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(prev - 1, 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        size="lg"
                                        className="p-1 md:p-2">
                                        <ChevronLeft className="h-6 w-6 md:h-4 md:w-4" />
                                    </Button>

                                    {/* Page numbers - show fewer on mobile */}
                                    {pageNumbers
                                        .filter((number) => {
                                            if (window.innerWidth < 640) {
                                                return (
                                                    Math.abs(
                                                        number - currentPage
                                                    ) <= 1
                                                );
                                            }
                                            return true;
                                        })
                                        .map((number) => (
                                            <Button
                                                key={number}
                                                variant={
                                                    currentPage === number
                                                        ? "default"
                                                        : "outline"
                                                }
                                                onClick={() =>
                                                    setCurrentPage(number)
                                                }
                                                size="lg"
                                                className="min-w-[32px] md:min-w-[40px] p-3 md:p-2">
                                                {number}
                                            </Button>
                                        ))}

                                    {/* Next page button */}
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(prev + 1, totalPages)
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        size="lg"
                                        className="p-1 md:p-2">
                                        <ChevronRight className="h-6 w-6 md:h-4 md:w-4" />
                                    </Button>

                                    {/* Last page button - hidden on mobile */}
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setCurrentPage(totalPages)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="hidden md:flex items-center"
                                        size="lg">
                                        Last
                                        <ChevronRight className="h-6 w-6 md:h-4 md:w-4 ml-1 md:ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedProduct(null)}>
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className={` p-6 rounded-lg max-w-2xl w-full transition-colors duration-300`}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">
                                    {selectedProduct.name}
                                </h2>
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedProduct(null)}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <p className={` mb-2`}>
                                {selectedProduct.category}
                            </p>
                            <p className="text-3xl font-bold mb-4">
                                ${selectedProduct.price}
                            </p>
                            <div className="flex items-center mb-4">
                                <Star className="text-yellow-400 w-5 h-5 mr-1" />
                                <span className="text-lg">
                                    {selectedProduct.rating}
                                </span>
                            </div>
                            <p className={`mb-6`}>
                                Experience cutting-edge technology with the{" "}
                                {selectedProduct.name}. This device offers
                                unparalleled performance and features to meet
                                all your tech needs.
                            </p>
                            <Button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                                onClick={() => {
                                    addToCart(selectedProduct);
                                    setSelectedProduct(null);
                                }}>
                                Add to Cart
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

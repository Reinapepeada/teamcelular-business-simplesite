"use client";

import { useState, useEffect, useCallback } from "react";
import useCartStore from "@/store/cartStore";
import Image from "next/image";

import { getAllProductsPaginated } from "@/services/products";
import { debounce } from "lodash";
// 
import ProductFilters from "@/components/ProductFilters";
// 
import {Input } from "@nextui-org/react"
import { useSearchParams } from "next/navigation";

// 
import ProductsCardsStore from "@/components/ProductsCardsStore";


export default function TechShop() {
    const [currentCategory, setCurrentCategory] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    interface ProductsResponse {
        products: [];
        total: number;
        pages: number;
        page: number;
    }
    
    const [products, setProducts] = useState<ProductsResponse>({ products: [], total: 0, pages: 1, page: 1 });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const searchParams = useSearchParams();

    const itemsPerPage = 12;

    const { addToCart } = useCartStore();

    //  Llama al backend para obtener productos filtrados
    async function getMainProducts() {
        setIsLoading(true);
        const params = searchParams.toString();
        // si params no esta vacio, se setea el currentPage a 1
        console.log(params);
        const response = await getAllProductsPaginated(
            currentPage,
            itemsPerPage,
            params
        );
        setProducts(response); // Set the product list
        setCurrentPage(response.page); // Backend page starts from 0; adjust for 1-based UI
        setIsLoading(false);
    }

    useEffect(() => {
        getMainProducts();
    }, [searchParams,currentPage]);
    
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
                <ProductFilters />
                <div className="w-full md:w-3/4">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <ProductsCardsStore 
                        products={products.products} 
                        goToNextPage={goToNextPage} 
                        goToPreviousPage={goToPreviousPage} 
                        isLoading={isLoading} 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        addToCart={addToCart}
                    />
                </div>
                
            </div>
        </section>
    );
}

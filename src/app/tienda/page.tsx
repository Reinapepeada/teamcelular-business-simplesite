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
import { Product } from "./product";


export default function TechShop() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [params, setParams] = useState<string>("");
    
    interface ProductsResponse {
        total: number;
        pages: number;
        page: number;
    }
    
    const [productsPagination, setProductsPagination] = useState<ProductsResponse>({ total: 0, pages: 1, page: 1 });
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const searchParams = useSearchParams();

    const itemsPerPage = 12;

    const { addToCart } = useCartStore();

    //  Llama al backend para obtener productos filtrados
    async function getMainProducts() {
        setIsLoading(true);
        const params = searchParams.toString();
        if (params) {
            setParams(params);
            setCurrentPage(1);
        }

        const response = await getAllProductsPaginated(
            currentPage,
            itemsPerPage,
            params
        );

        setProductsPagination({
            total: response.total,
            pages: response.pages,
            page: response.page,
        }); // Set the product list
        setProducts(response.products);
        setCurrentPage(response.page); // Backend page starts from 0; adjust for 1-based UI
        setIsLoading(false);
    }

    useEffect(() => {
        getMainProducts();
        
    }, [searchParams,currentPage]);
    
    const totalPages = productsPagination.total ? productsPagination.pages : 1; // Ensure it's based on the backend directly

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

    return (
        <section className="max-w-screen-2xl w-full p-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <ProductFilters params={params} />
                <div className="w-full md:w-3/4">
                    {/* <Input
                        type="text"
                        placeholder="Search products..."
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    /> */}
                    <ProductsCardsStore 
                        products={products}
                        setPage={setCurrentPage} 
                        isLoading={isLoading}
                        totalPages={totalPages} 
                        addToCart={addToCart}
                    />
                </div>
            </div>
        </section>
    );
}

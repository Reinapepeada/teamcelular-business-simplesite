"use client";

import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from "react";
import useCartStore from "@/store/cartStore";

import { getAllProductsPaginated } from "@/services/products";
import ProductFilters from "@/components/ProductFilters";
import { useSearchParams } from "next/navigation";

import ProductsCardsStore from "@/components/ProductsCardsStore";
import { Product } from "./product";

const ITEMS_PER_PAGE = 12;

function TechShopContent() {
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
    const paramsString = useMemo(() => searchParams.toString(), [searchParams]);

    const { addToCart } = useCartStore();

    const previousParamsRef = useRef<string | null>(null);

    const fetchProducts = useCallback(async (page: number, query: string) => {
        setIsLoading(true);
        setParams(query);

        const response = await getAllProductsPaginated(
            page,
            ITEMS_PER_PAGE,
            query
        );

        setProductsPagination({
            total: response.total,
            pages: response.pages,
            page: response.page,
        });
        setProducts(response.products);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const queryChanged = previousParamsRef.current !== paramsString;
        const nextPage = queryChanged ? 1 : currentPage;

        previousParamsRef.current = paramsString;
        fetchProducts(nextPage, paramsString);
    }, [currentPage, paramsString, fetchProducts]);
    
    const totalPages = productsPagination.total ? productsPagination.pages : 1; // Ensure it's based on the backend directly

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

export default function TechShop() {
    return (
        <Suspense fallback={<div className="flex w-full justify-center py-16 text-muted-foreground">Cargando tienda...</div>}>
            <TechShopContent />
        </Suspense>
    );
}

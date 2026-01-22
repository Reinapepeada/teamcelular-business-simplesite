"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useCartStore from "@/store/cartStore";
import ProductFilters from "@/components/ProductFilters";
import ProductsCardsStore from "@/components/ProductsCardsStore";
import { getAllProductsPaginated } from "@/services/products";
import type { Product } from "./product";

const ITEMS_PER_PAGE = 12;

interface ProductsResponse {
  total: number;
  pages: number;
  page: number;
}

interface TiendaClientProps {
  initialProducts: Product[];
  initialPagination: ProductsResponse;
  initialQuery: string;
}

export default function TiendaClient({
  initialProducts,
  initialPagination,
  initialQuery,
}: TiendaClientProps) {
  const [productsPagination, setProductsPagination] = useState<ProductsResponse>(
    initialPagination
  );
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsString = useMemo(() => searchParams.toString(), [searchParams]);
  const previousParamsRef = useRef<string | null>(null);

  const currentPage = useMemo(() => {
    const pageValue = Number(searchParams.get("page") || initialPagination.page || 1);
    return Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  }, [searchParams, initialPagination.page]);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const queryChanged = previousParamsRef.current !== paramsString;
    previousParamsRef.current = paramsString;

    const queryParams = new URLSearchParams(paramsString);
    const page = Number(queryParams.get("page") || currentPage || 1);
    queryParams.delete("page");
    const query = queryParams.toString();

    const isInitial = query === initialQuery && page === initialPagination.page;
    if (!queryChanged && isInitial) return;

    setIsLoading(true);
    getAllProductsPaginated(page, ITEMS_PER_PAGE, query)
      .then((response) => {
        setProductsPagination({
          total: response.total,
          pages: response.pages || 1,
          page: response.page || page,
        });
        setProducts(response.products || []);
      })
      .finally(() => setIsLoading(false));
  }, [paramsString, currentPage, initialQuery, initialPagination.page]);

  const totalPages = productsPagination.total ? productsPagination.pages : 1;

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(paramsString);
    if (page <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(page));
    }
    const query = nextParams.toString();
    router.push(query ? `/tienda?${query}` : "/tienda");
  };

  return (
    <section className="max-w-screen-2xl w-full p-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        <ProductFilters params={paramsString} />
        <div className="w-full md:w-3/4">
          <ProductsCardsStore
            products={products}
            setPage={handlePageChange}
            isLoading={isLoading}
            totalPages={totalPages}
            addToCart={addToCart}
            currentPage={currentPage}
          />
        </div>
      </div>
    </section>
  );
}

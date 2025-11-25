"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
    getAllProductsPaginated, 
    getProductById,
    getMinMaxPrice,
    calculateTotalStock,
    getPrimaryImage,
    getAllProductImages,
} from '@/services/products';
import { getbrands } from '@/services/brands';
import { getcategories } from '@/services/categories';
import type { 
    Product, 
    ProductsPaginatedResponse, 
    Category, 
    Brand 
} from '@/app/tienda/product';

interface UseProductsOptions {
    initialPage?: number;
    pageSize?: number;
    autoFetch?: boolean;
}

interface UseProductsReturn {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    pagination: {
        page: number;
        pages: number;
        total: number;
        size: number;
    };
    fetchProducts: (params?: string) => Promise<void>;
    setPage: (page: number) => void;
    refetch: () => void;
}

/**
 * Hook for fetching and managing products list
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
    const { 
        initialPage = 1, 
        pageSize = 12, 
        autoFetch = true 
    } = options;
    
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(initialPage);
    const [queryParams, setQueryParams] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0,
        size: pageSize,
    });

    const fetchProducts = useCallback(async (params: string = '') => {
        setIsLoading(true);
        setError(null);
        setQueryParams(params);
        
        try {
            const response = await getAllProductsPaginated(page, pageSize, params);
            setProducts(response.products);
            setPagination({
                page: response.page,
                pages: response.pages,
                total: response.total,
                size: response.size,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching products');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, [page, pageSize]);

    const refetch = useCallback(() => {
        fetchProducts(queryParams);
    }, [fetchProducts, queryParams]);

    useEffect(() => {
        if (autoFetch) {
            fetchProducts(queryParams);
        }
    }, [page, autoFetch, fetchProducts, queryParams]);

    return {
        products,
        isLoading,
        error,
        pagination,
        fetchProducts,
        setPage,
        refetch,
    };
}

interface UseProductReturn {
    product: Product | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
    // Computed values
    primaryImage: string;
    allImages: string[];
    totalStock: number;
}

/**
 * Hook for fetching a single product by ID
 */
export function useProduct(productId: number | null): UseProductReturn {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async () => {
        if (!productId) {
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await getProductById(productId);
            setProduct(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching product');
            setProduct(null);
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const primaryImage = product ? getPrimaryImage(product) : '/placeholder.jpg';
    const allImages = product ? getAllProductImages(product) : ['/placeholder.jpg'];
    const totalStock = product ? calculateTotalStock(product.variants) : 0;

    return {
        product,
        isLoading,
        error,
        refetch: fetchProduct,
        primaryImage,
        allImages,
        totalStock,
    };
}

interface UseFiltersReturn {
    categories: Category[];
    brands: Brand[];
    priceRange: { min: number; max: number };
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook for fetching filter options (categories, brands, price range)
 */
export function useProductFilters(): UseFiltersReturn {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFilters = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const [categoriesData, brandsData, priceData] = await Promise.all([
                getcategories(),
                getbrands(),
                getMinMaxPrice(),
            ]);
            
            setCategories(categoriesData);
            setBrands(brandsData);
            setPriceRange(priceData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching filters');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFilters();
    }, [fetchFilters]);

    return {
        categories,
        brands,
        priceRange,
        isLoading,
        error,
        refetch: fetchFilters,
    };
}

import { buildProductSlug, slugify } from "@/lib/productSlug";
import type {
    Brand,
    Category,
    PriceRangeResponse,
    Product,
    ProductsPaginatedResponse,
} from "@/app/tienda/product";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const ITEMS_PER_PAGE = 12;

export interface CatalogSearchParams {
    [key: string]: string | string[] | undefined;
}

export interface CatalogFiltersState {
    page: number;
    search: string;
    categories: string[];
    brands: string[];
    minPrice: string;
    maxPrice: string;
    sort: string;
}

export interface CatalogFilterOptions {
    categories: Category[];
    brands: Brand[];
    priceRange: {
        min: number;
        max: number;
    };
}

function ensureArray(value: string | string[] | undefined) {
    if (Array.isArray(value)) {
        return value;
    }

    return value ? [value] : [];
}

function parseListParam(value: string | string[] | undefined) {
    return Array.from(
        new Set(
            ensureArray(value)
                .flatMap((item) => item.split(","))
                .map((item) => item.trim())
                .filter(Boolean),
        ),
    );
}

function parsePage(value: string | string[] | undefined) {
    const pageValue = Number(ensureArray(value)[0] || 1);
    return Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
}

async function fetchJson<T>(url: string, revalidate: number): Promise<T | null> {
    try {
        const response = await fetch(url, {
            next: { revalidate },
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error("Catalog fetch failed", error);
        return null;
    }
}

export function normalizeCatalogFilters(
    searchParams: CatalogSearchParams,
): CatalogFiltersState {
    return {
        page: parsePage(searchParams.page),
        search: String(ensureArray(searchParams.search)[0] || "").trim(),
        categories: parseListParam(searchParams.categories),
        brands: parseListParam(searchParams.brands),
        minPrice: String(ensureArray(searchParams.minPrice)[0] || "").trim(),
        maxPrice: String(ensureArray(searchParams.maxPrice)[0] || "").trim(),
        sort: String(ensureArray(searchParams.sort)[0] || "").trim(),
    };
}

export function isCatalogIndexable(filters: CatalogFiltersState) {
    return (
        filters.page === 1 &&
        !filters.search &&
        filters.categories.length === 0 &&
        filters.brands.length === 0 &&
        !filters.minPrice &&
        !filters.maxPrice &&
        !filters.sort
    );
}

export function buildCatalogSearchParams(
    filters: CatalogFiltersState,
    overrides: Partial<CatalogFiltersState> = {},
) {
    const nextFilters = {
        ...filters,
        ...overrides,
    };

    const params = new URLSearchParams();

    if (nextFilters.page > 1) {
        params.set("page", String(nextFilters.page));
    }

    if (nextFilters.search) {
        params.set("search", nextFilters.search);
    }

    nextFilters.categories.forEach((category) => {
        params.append("categories", category);
    });

    nextFilters.brands.forEach((brand) => {
        params.append("brands", brand);
    });

    if (nextFilters.minPrice) {
        params.set("minPrice", nextFilters.minPrice);
    }

    if (nextFilters.maxPrice) {
        params.set("maxPrice", nextFilters.maxPrice);
    }

    if (nextFilters.sort) {
        params.set("sort", nextFilters.sort);
    }

    return params;
}

export function buildPageHref(
    basePath: string,
    filters: CatalogFiltersState,
    page: number,
) {
    const params = buildCatalogSearchParams(filters, { page });
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
}

export async function getCatalogFilters(): Promise<CatalogFilterOptions> {
    if (!apiUrl) {
        return {
            categories: [],
            brands: [],
            priceRange: { min: 0, max: 1000000 },
        };
    }

    const [categories, brands, priceRange] = await Promise.all([
        fetchJson<Category[]>(`${apiUrl}/categories/get/all`, 86400),
        fetchJson<Brand[]>(`${apiUrl}/brands/get/all`, 86400),
        fetchJson<PriceRangeResponse>(`${apiUrl}/products/min-max-price`, 86400),
    ]);

    return {
        categories: categories || [],
        brands: brands || [],
        priceRange: {
            min: Number(priceRange?.min || 0),
            max: Number(priceRange?.max || 1000000),
        },
    };
}

export async function getCatalogPage(
    filters: CatalogFiltersState,
    forcedCategory?: string,
): Promise<ProductsPaginatedResponse> {
    if (!apiUrl) {
        return { products: [], total: 0, page: 1, size: ITEMS_PER_PAGE, pages: 1 };
    }

    const queryParams = new URLSearchParams();
    queryParams.set("page", String(filters.page));
    queryParams.set("size", String(ITEMS_PER_PAGE));

    if (filters.search) {
        queryParams.set("search", filters.search);
    }

    const categories = forcedCategory ? [forcedCategory] : filters.categories;
    if (categories.length > 0) {
        queryParams.set("categories", categories.join(","));
    }

    if (filters.brands.length > 0) {
        queryParams.set("brands", filters.brands.join(","));
    }

    if (filters.minPrice) {
        queryParams.set("minPrice", filters.minPrice);
    }

    if (filters.maxPrice) {
        queryParams.set("maxPrice", filters.maxPrice);
    }

    const data = await fetchJson<ProductsPaginatedResponse>(
        `${apiUrl}/products/?${queryParams.toString()}`,
        300,
    );

    const fallback = {
        products: [],
        total: 0,
        page: filters.page,
        size: ITEMS_PER_PAGE,
        pages: 1,
    };

    const response = data || fallback;
    const products = [...(response.products || [])];

    if (filters.sort === "price-asc") {
        products.sort((left, right) => left.retail_price - right.retail_price);
    } else if (filters.sort === "price-desc") {
        products.sort((left, right) => right.retail_price - left.retail_price);
    } else if (filters.sort === "name-asc") {
        products.sort((left, right) => left.name.localeCompare(right.name));
    } else if (filters.sort === "name-desc") {
        products.sort((left, right) => right.name.localeCompare(left.name));
    }

    return {
        ...response,
        products,
    };
}

export async function getCatalogCategoryBySlug(slug: string) {
    if (!apiUrl) {
        return null;
    }

    const categories = await fetchJson<Category[]>(`${apiUrl}/categories/get/all`, 86400);
    return (
        categories?.find((category) => slugify(category.name) === slug) || null
    );
}

export function buildItemListJsonLd(products: Product[], siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}/tienda/${buildProductSlug(product)}`,
            name: product.name,
        })),
    };
}

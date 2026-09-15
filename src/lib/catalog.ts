import { buildProductSlug, slugify } from "@/lib/productSlug";
import { listarCatalogo } from "@/lib/storeCatalog";
import { fetchStoreFacets } from "@/lib/storeApi";
import { productoDeVidriera } from "@/lib/fixbeeCatalog";
import type {
    Product,
    ProductsPaginatedResponse,
} from "@/app/tienda/product";

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
    /** Nombres, no entidades: el catálogo público no expone ids de nada. */
    categories: string[];
    brands: string[];
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

export function normalizeCatalogFilters(
    searchParams: CatalogSearchParams,
): CatalogFiltersState {
    return {
        page: parsePage(searchParams.page),
        search: String(ensureArray(searchParams.search)[0] || "").trim(),
        // **Una sola, aunque la URL traiga varias.** La vidriera filtra de a
        // una porque filtra y pagina en la base; si el estado guardara las
        // tres que vinieron en la query, los chips de filtros activos las
        // mostrarían todas mientras la consulta lleva una, que es justo la
        // mentira que los filtros de a una vienen a sacar.
        categories: parseListParam(searchParams.categories).slice(0, 1),
        brands: parseListParam(searchParams.brands).slice(0, 1),
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

/**
 * Lo que se le pide a Fixbee para armar una pagina del catalogo.
 *
 * **Los filtros del sitio son de a muchos y los del backend de a uno.** La
 * vidriera acepta una categoria y una marca por consulta porque filtra y
 * pagina en la base: mandar varias y quedarse con la interseccion en el
 * navegador reacomodaria los 12 que ya vinieron, y el total y la paginacion
 * dejarian de decir la verdad. Se manda la primera de cada una, que es lo que
 * el comprador eligio primero.
 */
export function parametrosDeCatalogo(
    filters: CatalogFiltersState,
    forcedCategory?: string,
): Record<string, string | number> {
    const params: Record<string, string | number> = {
        page: filters.page,
        size: ITEMS_PER_PAGE,
    };

    if (filters.search) {
        params.search = filters.search;
    }

    const categoria = forcedCategory ?? filters.categories[0];
    if (categoria) {
        params.category = categoria;
    }

    if (filters.brands[0]) {
        params.brand = filters.brands[0];
    }

    // Un rango vacio o ilegible no se manda: el backend rechaza lo que no es
    // numero, y "" no es "sin minimo", es un 422 sobre toda la pagina.
    const minimo = Number(filters.minPrice);
    if (filters.minPrice && Number.isFinite(minimo) && minimo >= 0) {
        params.min_price = minimo;
    }
    const maximo = Number(filters.maxPrice);
    if (filters.maxPrice && Number.isFinite(maximo) && maximo >= 0) {
        params.max_price = maximo;
    }

    const orden: Record<string, string> = {
        "price-asc": "price_asc",
        "price-desc": "price_desc",
        "name-asc": "name",
    };
    if (orden[filters.sort]) {
        params.sort = orden[filters.sort];
    }

    return params;
}

export async function getCatalogFilters(): Promise<CatalogFilterOptions> {
    try {
        const facetas = await fetchStoreFacets();
        return {
            categories: facetas.categories ?? [],
            brands: facetas.brands ?? [],
            priceRange: {
                min: Number(facetas.min_price || 0),
                max: Number(facetas.max_price || 0),
            },
        };
    } catch (error) {
        // Sin facetas la tienda sigue vendiendo: los filtros aparecen vacios,
        // que es peor que tenerlos y mejor que una pagina rota.
        console.error("Catalog facets fetch failed", error);
        return { categories: [], brands: [], priceRange: { min: 0, max: 0 } };
    }
}

/**
 * Una pagina del catalogo, ya en la forma que el sitio sabe mostrar.
 *
 * El orden lo aplica el backend sobre el catalogo entero, no sobre la pagina:
 * ordenar aca solo reacomodaria los 12 que vinieron, y "de menor precio"
 * mostraria el mas barato de una pagina cualquiera.
 */
export async function getCatalogPage(
    filters: CatalogFiltersState,
    forcedCategory?: string,
): Promise<ProductsPaginatedResponse> {
    const vacia = {
        products: [],
        total: 0,
        page: filters.page,
        size: ITEMS_PER_PAGE,
        pages: 1,
    };

    try {
        const pagina = await listarCatalogo(
            parametrosDeCatalogo(filters, forcedCategory),
        );
        const size = pagina.size || ITEMS_PER_PAGE;
        return {
            products: pagina.items.map(productoDeVidriera),
            total: pagina.total,
            page: pagina.page || filters.page,
            size,
            pages: Math.max(1, Math.ceil(pagina.total / size)),
        };
    } catch (error) {
        console.error("Catalog fetch failed", error);
        return vacia;
    }
}

/**
 * La categoria detras de `/tienda/categoria/{slug}`.
 *
 * El slug de categoria lo arma el sitio con `slugify`, asi que la vuelta es
 * buscar entre las categorias publicadas la que slugifica igual. No hay ids
 * que pedir: el catalogo publico expone nombres.
 */
export async function getCatalogCategoryBySlug(slug: string) {
    const { categories } = await getCatalogFilters();
    const nombre = categories.find((c) => slugify(c) === slug);
    return nombre ? { name: nombre } : null;
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

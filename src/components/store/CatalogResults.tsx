import Image from "next/image";
import Link from "next/link";
import type { Product, ProductsPaginatedResponse } from "@/app/tienda/product";
import AddToCartButton from "@/components/store/AddToCartButton";
import {
    buildItemListJsonLd,
    buildPageHref,
    getCatalogPage,
    type CatalogFiltersState,
} from "@/lib/catalog";
import { buildProductSlug, slugify } from "@/lib/productSlug";

interface CatalogResultsProps {
    basePath: string;
    filters: CatalogFiltersState;
    forcedCategoryName?: string;
    siteUrl: string;
    title?: string;
    emptyMessage?: string;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-AR").format(price);
}

function getProductImage(product: Product) {
    return (
        product.variants?.find((variant) => variant.images?.length)?.images?.[0]
            ?.image_url || "/placeholder.jpg"
    );
}

function getProductStock(product: Product) {
    return product.variants?.reduce(
        (total, variant) => total + (variant.stock || 0),
        0,
    );
}

function getPageNumbers(currentPage: number, totalPages: number) {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    const pages: number[] = [];

    for (let page = start; page <= end; page += 1) {
        pages.push(page);
    }

    return pages;
}

function CatalogPagination({
    basePath,
    filters,
    currentPage,
    totalPages,
}: {
    basePath: string;
    filters: CatalogFiltersState;
    currentPage: number;
    totalPages: number;
}) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <nav
            aria-label="Paginación de productos"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
            <Link
                href={buildPageHref(basePath, filters, Math.max(1, currentPage - 1))}
                prefetch={false}
                aria-disabled={currentPage === 1}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
                    currentPage === 1
                        ? "pointer-events-none border-slate-200 text-slate-400"
                        : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
                }`}
            >
                Anterior
            </Link>
            {pages[0] > 1 ? (
                <Link
                    href={buildPageHref(basePath, filters, 1)}
                    prefetch={false}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                >
                    1
                </Link>
            ) : null}
            {pages[0] > 2 ? (
                <span className="px-1 text-sm text-slate-500">...</span>
            ) : null}
            {pages.map((page) => (
                <Link
                    key={page}
                    href={buildPageHref(basePath, filters, page)}
                    prefetch={false}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
                        page === currentPage
                            ? "border-primary bg-primary text-white"
                            : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
                    }`}
                >
                    {page}
                </Link>
            ))}
            {pages[pages.length - 1] < totalPages - 1 ? (
                <span className="px-1 text-sm text-slate-500">...</span>
            ) : null}
            {pages[pages.length - 1] < totalPages ? (
                <Link
                    href={buildPageHref(basePath, filters, totalPages)}
                    prefetch={false}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                >
                    {totalPages}
                </Link>
            ) : null}
            <Link
                href={buildPageHref(
                    basePath,
                    filters,
                    Math.min(totalPages, currentPage + 1),
                )}
                prefetch={false}
                aria-disabled={currentPage === totalPages}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
                    currentPage === totalPages
                        ? "pointer-events-none border-slate-200 text-slate-400"
                        : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
                }`}
            >
                Siguiente
            </Link>
        </nav>
    );
}

function ProductCard({ product }: { product: Product }) {
    const productImage = getProductImage(product);
    const stock = getProductStock(product);
    const productHref = `/tienda/${buildProductSlug(product)}`;

    return (
        <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <Link
                href={productHref}
                prefetch={false}
                className="group block"
                aria-label={`Ver ${product.name}`}
            >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
                    <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                </div>
            </Link>

            <div className="mt-4 flex flex-1 flex-col">
                <div className="flex flex-wrap gap-2">
                    {product.category?.name ? (
                        <Link
                            href={`/tienda/categoria/${slugify(product.category.name)}`}
                            prefetch={false}
                            className="inline-flex min-h-8 items-center rounded-full border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                        >
                            {product.category.name}
                        </Link>
                    ) : null}
                    {product.brand?.name ? (
                        <span className="inline-flex min-h-8 items-center rounded-full border border-amber-200 bg-amber-50 px-3 text-xs font-medium text-amber-700">
                            {product.brand.name}
                        </span>
                    ) : null}
                </div>

                <Link
                    href={productHref}
                    prefetch={false}
                    className="mt-3 block text-lg font-semibold leading-snug text-slate-950 transition hover:text-primary"
                >
                    {product.name}
                </Link>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                    ${formatPrice(product.retail_price)}
                </p>

                {stock > 0 && stock < 10 ? (
                    <p className="mt-2 text-sm font-medium text-amber-700">
                        Últimas {stock} unidades
                    </p>
                ) : stock > 0 ? (
                    <p className="mt-2 text-sm text-emerald-700">Stock disponible</p>
                ) : (
                    <p className="mt-2 text-sm text-rose-700">Sin stock</p>
                )}

                {product.description ? (
                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                        {product.description}
                    </p>
                ) : null}

                <div className="mt-5">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </article>
    );
}

export function CatalogResultsFallback() {
    return (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-8 w-52 animate-pulse rounded-full bg-slate-200" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-3xl border border-slate-200 p-4"
                    >
                        <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />
                        <div className="mt-4 h-4 w-20 animate-pulse rounded-full bg-slate-200" />
                        <div className="mt-3 h-6 w-4/5 animate-pulse rounded-full bg-slate-200" />
                        <div className="mt-3 h-8 w-32 animate-pulse rounded-full bg-slate-200" />
                        <div className="mt-6 h-11 w-full animate-pulse rounded-full bg-slate-200" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default async function CatalogResults({
    basePath,
    filters,
    forcedCategoryName,
    siteUrl,
    title = "Productos disponibles",
    emptyMessage = "No encontramos productos con esos filtros.",
}: CatalogResultsProps) {
    const data: ProductsPaginatedResponse = await getCatalogPage(
        filters,
        forcedCategoryName,
    );
    const products = data.products || [];
    const totalPages = Math.max(1, data.pages || 1);
    const currentPage = Math.max(1, data.page || filters.page || 1);
    const total = data.total || products.length;

    return (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                        Catálogo
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        {total} resultado{total === 1 ? "" : "s"}
                    {currentPage > 1 ? ` en la página ${currentPage}` : ""}.
                    </p>
                </div>
                <p className="text-sm text-slate-500">
                    {forcedCategoryName
                        ? `Categoría: ${forcedCategoryName}`
                        : "Entrega y retiro en CABA."}
                </p>
            </div>

            {products.length > 0 ? (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(buildItemListJsonLd(products, siteUrl)),
                        }}
                    />
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <CatalogPagination
                        basePath={basePath}
                        filters={filters}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </>
            ) : (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <p className="text-lg font-semibold text-slate-900">
                        Sin resultados por ahora
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{emptyMessage}</p>
                    <Link
                        href={basePath}
                        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                        Ver todo el catálogo
                    </Link>
                </div>
            )}
        </section>
    );
}

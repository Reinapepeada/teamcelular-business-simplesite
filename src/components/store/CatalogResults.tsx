import Image from "next/image";
import Link from "next/link";
import type { ProductsPaginatedResponse } from "@/app/tienda/product";
import type { VidrieraProduct } from "@/lib/fixbeeCatalog";
import AddToCartButton from "@/components/store/AddToCartButton";
import {
    buildItemListJsonLd,
    buildPageHref,
    getCatalogPage,
    type CatalogFiltersState,
} from "@/lib/catalog";
import { buildProductSlug, slugify } from "@/lib/productSlug";
import { cargaDirectaImagen } from "@/lib/storeCatalog";

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

function getProductImage(product: VidrieraProduct) {
    return (
        product.variants?.find((variant) => variant.images?.length)?.images?.[0]
            ?.image_url || "/placeholder.jpg"
    );
}

function getProductStock(product: VidrieraProduct) {
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
            aria-label="Paginacion de productos"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
            <Link
                href={buildPageHref(basePath, filters, Math.max(1, currentPage - 1))}
                prefetch={false}
                aria-disabled={currentPage === 1}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
                    currentPage === 1
                        ? "pointer-events-none border-slate-200 dark:border-white/10 text-slate-400"
                        : "border-slate-300 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary"
                }`}
            >
                Anterior
            </Link>
            {pages[0] > 1 ? (
                <Link
                    href={buildPageHref(basePath, filters, 1)}
                    prefetch={false}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:border-primary hover:text-primary"
                >
                    1
                </Link>
            ) : null}
            {pages[0] > 2 ? (
                <span className="px-1 text-sm text-slate-500 dark:text-slate-400">...</span>
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
                            : "border-slate-300 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary"
                    }`}
                >
                    {page}
                </Link>
            ))}
            {pages[pages.length - 1] < totalPages - 1 ? (
                <span className="px-1 text-sm text-slate-500 dark:text-slate-400">...</span>
            ) : null}
            {pages[pages.length - 1] < totalPages ? (
                <Link
                    href={buildPageHref(basePath, filters, totalPages)}
                    prefetch={false}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:border-primary hover:text-primary"
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
                        ? "pointer-events-none border-slate-200 dark:border-white/10 text-slate-400"
                        : "border-slate-300 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary"
                }`}
            >
                Siguiente
            </Link>
        </nav>
    );
}

function ProductCard({ product, priority }: { product: VidrieraProduct; priority: boolean }) {
    const productImage = getProductImage(product);
    const stock = getProductStock(product);
    const productHref = `/tienda/${buildProductSlug(product)}`;

    return (
        <article className="group flex h-full flex-col rounded-[28px] bg-[#1d1d1f] p-3 transition-colors hover:bg-[#262628]">
            <Link
                href={productHref}
                prefetch={false}
                className="block"
                aria-label={`Ver ${product.name}`}
            >
                {/* Foto sobre recuadro claro: los productos vienen con fondo blanco. */}
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[20px] bg-[#f5f5f7]">
                    <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        priority={priority}
                        unoptimized={cargaDirectaImagen(productImage)}
                        className="object-contain p-6 transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                <div className="flex flex-wrap items-center gap-x-3 text-[12px] text-[#86868b]">
                    {product.brand?.name ? <span className="uppercase tracking-wide">{product.brand.name}</span> : null}
                    {product.category?.name ? (
                        <Link
                            href={`/tienda/categoria/${slugify(product.category.name)}`}
                            prefetch={false}
                            className="inline-flex min-h-8 items-center transition hover:text-white"
                        >
                            {product.category.name}
                        </Link>
                    ) : null}
                </div>

                <Link
                    href={productHref}
                    prefetch={false}
                    className="mt-1 block text-[19px] font-semibold leading-snug text-[#f5f5f7] transition hover:text-white"
                >
                    {product.name}
                </Link>

                {product.description ? (
                    <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-[#86868b]">
                        {product.description}
                    </p>
                ) : null}

                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <div>
                        <p className="text-[21px] font-semibold tabular-nums text-[#f5f5f7]">
                            ${formatPrice(product.retail_price)}
                        </p>
                        {stock > 0 && stock < 10 ? (
                            <p className="text-[12px] text-amber-400">Ultimas {stock} unidades</p>
                        ) : stock > 0 ? (
                            <p className="text-[12px] text-emerald-400">Stock disponible</p>
                        ) : (
                            <p className="text-[12px] text-rose-400">Sin stock</p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <AddToCartButton product={product} storeSlug={product.storeSlug} />
                </div>
            </div>
        </article>
    );
}

export function CatalogResultsFallback() {
    return (
        <section>
            <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-full bg-[#333336]" />
                    <div className="h-8 w-52 animate-pulse rounded-full bg-[#333336]" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-[#333336]" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-[28px] border border-slate-200 dark:border-white/10 p-4"
                    >
                        <div className="aspect-square animate-pulse rounded-2xl bg-[#333336]" />
                        <div className="mt-4 h-4 w-20 animate-pulse rounded-full bg-[#333336]" />
                        <div className="mt-3 h-6 w-4/5 animate-pulse rounded-full bg-[#333336]" />
                        <div className="mt-3 h-8 w-32 animate-pulse rounded-full bg-[#333336]" />
                        <div className="mt-6 h-11 w-full animate-pulse rounded-full bg-[#333336]" />
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
    const products = (data.products || []) as VidrieraProduct[];
    const totalPages = Math.max(1, data.pages || 1);
    const currentPage = Math.max(1, data.page || filters.page || 1);
    const total = data.total || products.length;

    return (
        <section>
            <div className="flex flex-col gap-2 border-b border-[#333336] pb-3 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pb-5 ">
                <div>
                    <h2 className="tc-subheading">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 sm:mt-2 dark:text-slate-400">
                        {total} resultado{total === 1 ? "" : "s"}
                        {currentPage > 1 ? ` en la pagina ${currentPage}` : ""}.
                    </p>
                </div>
                <p className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">
                    {forcedCategoryName
                        ? `Categoria: ${forcedCategoryName}`
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
                        {products.map((product, index) => (
                            <ProductCard key={product.storeSlug} product={product} priority={currentPage === 1 && index < 3} />
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
                <div className="mt-6 rounded-[28px] border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1d1d1f] p-8 text-center">
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Sin resultados por ahora
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{emptyMessage}</p>
                    <Link
                        href={basePath}
                        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                        Ver todo el catalogo
                    </Link>
                </div>
            )}
        </section>
    );
}

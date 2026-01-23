import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import TiendaClient from "./TiendaClient";
import { apiUrl } from "@/services/products";
import type { Product, ProductsPaginatedResponse } from "./product";
import { buildProductSlug } from "@/lib/productSlug";

const SITE_URL =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://teamcelular.com";
const PAGE_URL = `${SITE_URL}/tienda`;
const ITEMS_PER_PAGE = 12;

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Tienda Online | Accesorios y Repuestos para Celulares | Team Celular",
        description:
            "Comprá accesorios, fundas, cargadores, cables y repuestos para celulares con envío a todo CABA. Productos con garantía y asesoramiento en Team Celular.",
        alternates: {
            canonical: PAGE_URL,
        },
        openGraph: {
            title: "Tienda Online | Team Celular Buenos Aires",
            description:
                "Accesorios y repuestos de calidad para tu celular con envío a todo CABA.",
            type: "website",
            url: PAGE_URL,
            locale: "es_AR",
            images: [
                {
                    url: `${SITE_URL}/opengraph-image.png`,
                    width: 1200,
                    height: 630,
                    alt: "Tienda Online - Team Celular",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Tienda Online | Team Celular",
            description: "Accesorios y repuestos de calidad para tu celular",
            images: [`${SITE_URL}/opengraph-image.png`],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

async function getProductsServer(
    page: number,
    query: string
): Promise<ProductsPaginatedResponse> {
    if (!apiUrl) {
        return { products: [], total: 0, page: 1, size: ITEMS_PER_PAGE, pages: 1 };
    }

    const queryParams = new URLSearchParams();
    queryParams.set("page", String(page));
    queryParams.set("size", String(ITEMS_PER_PAGE));

    if (query) {
        const additionalParams = new URLSearchParams(query);
        additionalParams.forEach((value, key) => {
            if (value) queryParams.set(key, value);
        });
    }

    try {
        const response = await fetch(`${apiUrl}/products/?${queryParams.toString()}`,
            { next: { revalidate } }
        );

        if (!response.ok) {
            return { products: [], total: 0, page: 1, size: ITEMS_PER_PAGE, pages: 1 };
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching products for tienda", error);
        return { products: [], total: 0, page: 1, size: ITEMS_PER_PAGE, pages: 1 };
    }
}

function buildItemListJsonLd(products: Product[]) {
    const itemListElement = products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/tienda/${buildProductSlug(product)}`,
        name: product.name,
    }));

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement,
    };
}

export default async function TiendaPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const resolvedSearchParams = (await searchParams) || {};
    const pageParam = Array.isArray(resolvedSearchParams.page)
        ? resolvedSearchParams.page[0]
        : resolvedSearchParams.page;
    const page = Number(pageParam || 1);
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;

    const queryParams = new URLSearchParams();
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
        if (key === "page") return;
        if (Array.isArray(value)) {
            value.forEach((v) => v && queryParams.append(key, v));
            return;
        }
        if (value) queryParams.set(key, value);
    });

    const query = queryParams.toString();
    const data = await getProductsServer(safePage, query);

    return (
        <div className="w-full">
            <div className="max-w-screen-2xl mx-auto px-6 pt-6">
                <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Link href="/" className="hover:text-primary transition">
                        Inicio
                    </Link>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-semibold">
                        Tienda
                    </span>
                </nav>
            </div>

            <BreadcrumbJsonLd
                items={[
                    { name: "Inicio", url: `${SITE_URL}/` },
                    { name: "Tienda", url: PAGE_URL },
                ]}
            />

            {data.products?.length ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(buildItemListJsonLd(data.products)),
                    }}
                />
            ) : null}

            <TiendaClient
                initialProducts={data.products || []}
                initialPagination={{
                    total: data.total || 0,
                    pages: data.pages || 1,
                    page: data.page || safePage,
                }}
                initialQuery={query}
            />
        </div>
    );
}

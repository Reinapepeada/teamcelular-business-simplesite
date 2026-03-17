import ProductDetailClient from './ProductDetailClient';
import { getAllProductImages, getProductById, getPrimaryImage } from '@/services/products';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductStructuredData from '@/components/seo/ProductStructuredData';
import { fetchWithCache } from '@/lib/serverCache';
import { buildProductSlug, parseProductIdFromSlug } from '@/lib/productSlug';
import { permanentRedirect, notFound } from 'next/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim() || 'https://teamcelular.com';
const DEFAULT_LAT = process.env.NEXT_PUBLIC_BUSINESS_LAT || '-34.6037';
const DEFAULT_LON = process.env.NEXT_PUBLIC_BUSINESS_LON || '-58.3816';

function slugify(text = '') {
    return text
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const getProductData = async (productId: number) => {
    return fetchWithCache(
        `product:${productId}`,
        () => getProductById(productId),
        1000 * 60 * 5
    );
};

/**
 * Server-side metadata generation for product pages.
 * Uses shared cached fetch to avoid duplicate requests.
 */
export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    const productId = parseProductIdFromSlug(slug);
    if (!productId) return {};

    try {
        const product = await getProductData(productId);
        const image = getPrimaryImage(product) || '/placeholder.jpg';
        const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

        const title = product.name || 'Producto';
        const fallbackDescription = [
            product.name,
            product.brand?.name ? `Marca ${product.brand.name}` : null,
            product.category?.name ? `Categoria ${product.category.name}` : null,
            'Disponible en Team Celular.',
        ]
            .filter(Boolean)
            .join('. ');
        const description = product.description?.trim() || fallbackDescription || 'Producto en Team Celular.';
        const productSlug = buildProductSlug(product);
        const url = `${SITE_URL}/tienda/${productSlug}`;

        // geo coordinates
        const lat = process.env.NEXT_PUBLIC_BUSINESS_LAT || DEFAULT_LAT;
        const lon = process.env.NEXT_PUBLIC_BUSINESS_LON || DEFAULT_LON;

        const ogImageObj: any = {
            url: absoluteImage,
            alt: product.name || 'Imagen del producto',
        };

        // Build keywords from product data
        const keywords = [
            product.name,
            product.brand?.name,
            product.category?.name,
            'repuestos celulares',
            'accesorios celulares',
            'Buenos Aires',
        ].filter(Boolean);

        return {
            title,
            description,
            keywords,
            alternates: {
                canonical: url,
                languages: {
                    "es-AR": url,
                },
            },
            robots: {
                index: true,
                follow: true,
            },
            openGraph: {
                title,
                description,
                url,
                siteName: 'Team Celular',
                images: [ogImageObj],
                locale: 'es_AR',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [absoluteImage],
            },
            // Custom meta tags (geo + product info)
            other: {
                'geo.region': 'AR',
                'geo.placename': 'Buenos Aires',
                'geo.position': `${lat};${lon}`,
                ICBM: `${lat}, ${lon}`,
                'product:price:amount': product.retail_price?.toString(),
                'product:price:currency': 'ARS',
                'og:price:amount': product.retail_price?.toString(),
                'og:price:currency': 'ARS',
            },
        } as any;
    } catch (err) {
        console.error('generateMetadata error:', err);
        return {
            title: 'Producto no encontrado',
            description: 'Producto no disponible en Team Celular.',
            robots: { index: false, follow: false },
        };
    }
}

export default async function Page({ params }: any) {
    const { slug } = await params;
    const productId = parseProductIdFromSlug(slug);
    let product = null;
    try {
        if (productId) {
            product = await getProductData(productId);
        }
    } catch (err) {
        console.error('Server fetch product error:', err);
    }

    if (!product) {
        notFound();
    }

    if (product) {
        const requestedSlug = String(slug ?? '');
        const canonicalSlug = buildProductSlug(product);
        if (canonicalSlug && requestedSlug !== canonicalSlug) {
            permanentRedirect(`/tienda/${canonicalSlug}`);
        }
    }

    const images = product ? getAllProductImages(product) : [];
    const productSlug = product ? buildProductSlug(product) : '';
    const breadcrumbItems = product
        ? [
              { name: 'Inicio', url: `${SITE_URL}/` },
              { name: 'Tienda', url: `${SITE_URL}/tienda` },
              ...(product.category?.name
                  ? [
                        {
                            name: product.category.name,
                            url: `${SITE_URL}/tienda/categoria/${slugify(product.category.name)}`,
                        },
                    ]
                  : []),
              { name: product.name, url: `${SITE_URL}/tienda/${productSlug}` },
          ]
        : [];

    return (
        <>
            {product && (
                <>
            <ProductStructuredData product={product} images={images} />
            <BreadcrumbJsonLd items={breadcrumbItems} />
        </>
    )}
    <ProductDetailClient
        productIdProp={productId ?? undefined}
        productProp={product}
    />
        </>
    );
}

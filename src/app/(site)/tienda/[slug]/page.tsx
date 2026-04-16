import ProductDetailClient from './ProductDetailClient';
import { getAllProductImages, getProductById, getPrimaryImage } from '@/services/products';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductStructuredData from '@/components/seo/ProductStructuredData';
import { fetchWithCache } from '@/lib/serverCache';
import { buildProductSlug, parseProductIdFromSlug } from '@/lib/productSlug';
import { permanentRedirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildWebsiteMetadata, getSiteUrl } from '@/lib/seoMetadata';

const SITE_URL = getSiteUrl();
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
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const productId = parseProductIdFromSlug(slug);
    if (!productId) {
        return buildWebsiteMetadata({
            path: '/tienda',
            title: 'Producto no encontrado | Team Celular',
            description: 'Producto no disponible en Team Celular.',
            robots: { index: false, follow: false },
        });
    }

    try {
        const product = await getProductData(productId);
        const image = getPrimaryImage(product) || '/placeholder.jpg';
        const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

        const brandName = product.brand?.name?.trim();
        const categoryName = product.category?.name?.trim();
        const title = `${product.name || 'Producto'} | Team Celular`;
        const fallbackDescription = `Compra ${product.name || 'este producto'}${brandName ? ` de ${brandName}` : ''}${categoryName ? ` en ${categoryName}` : ''} con retiro en Recoleta y envio en CABA. Validamos compatibilidad por WhatsApp antes de comprar.`;
        const description = product.description?.trim() || fallbackDescription;
        const productSlug = buildProductSlug(product);
        const canonicalPath = `/tienda/${productSlug}`;

        // geo coordinates
        const lat = process.env.NEXT_PUBLIC_BUSINESS_LAT || DEFAULT_LAT;
        const lon = process.env.NEXT_PUBLIC_BUSINESS_LON || DEFAULT_LON;

        // Build keywords from product data
        const keywords = [
            product.name,
            product.brand?.name,
            product.category?.name,
            'repuestos celulares',
            'accesorios celulares',
            'Buenos Aires',
        ].filter((keyword): keyword is string => Boolean(keyword));

        const seoMetadata = buildWebsiteMetadata({
            path: canonicalPath,
            title,
            description,
            keywords,
            robots: {
                index: true,
                follow: true,
            },
            languages: {
                'es-AR': canonicalPath,
            },
            openGraphTitle: title,
            openGraphDescription: description,
            openGraphImagePath: absoluteImage,
            openGraphImageAlt: product.name || 'Imagen del producto',
            twitterTitle: title,
            twitterDescription: description,
        });

        return {
            ...seoMetadata,
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
        } as Metadata;
    } catch (err) {
        console.error('generateMetadata error:', err);
        return buildWebsiteMetadata({
            path: '/tienda',
            title: 'Producto no encontrado | Team Celular',
            description: 'Producto no disponible en Team Celular.',
            robots: { index: false, follow: false },
        });
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
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

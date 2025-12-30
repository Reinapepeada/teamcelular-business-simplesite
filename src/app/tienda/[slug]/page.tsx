import ProductDetailClient from './ProductDetailClient';
import { getAllProductImages, getProductById, getPrimaryImage } from '@/services/products';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductStructuredData from '@/components/seo/ProductStructuredData';
import { fetchWithCache } from '@/lib/serverCache';
import probe from 'probe-image-size';

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

/**
 * Server-side metadata generation for product pages.
 * Uses the public `getProductById` helper to fetch product data at request/build time
 * and returns a Metadata object with OpenGraph + Twitter + canonical tags.
 */
export async function generateMetadata({ params }: any) {
    const id = Number(params.slug);
    if (isNaN(id)) return {};

    try {
        const product = await fetchWithCache(`product:${id}`, () => getProductById(id), 1000 * 60 * 5);
        const image = getPrimaryImage(product) || '/placeholder.jpg';
        const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

        // Probe image dimensions server-side when possible
        let imgMeta: { width?: number; height?: number } = {};
        try {
            const res = await probe(absoluteImage);
            imgMeta.width = res.width;
            imgMeta.height = res.height;
        } catch (e) {
            // ignore probe errors and fallback to defaults
            console.warn('probe image failed', e);
        }

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
        const url = `${SITE_URL}/tienda/${product.id}`;

        // geo coordinates
        const lat = process.env.NEXT_PUBLIC_BUSINESS_LAT || DEFAULT_LAT;
        const lon = process.env.NEXT_PUBLIC_BUSINESS_LON || DEFAULT_LON;

        const ogImageObj: any = {
            url: absoluteImage,
            alt: product.name || 'Imagen del producto',
        };
        if (imgMeta.width) ogImageObj.width = imgMeta.width;
        if (imgMeta.height) ogImageObj.height = imgMeta.height;

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
            title: 'Producto',
            description: 'Producto en Team Celular.',
        };
    }
}

export default async function Page({ params }: any) {
    const id = Number(params?.slug);
    let product = null;
    try {
        product = await fetchWithCache(`product:${id}`, () => getProductById(id), 1000 * 60 * 5);
    } catch (err) {
        console.error('Server fetch product error:', err);
    }

    const images = product ? getAllProductImages(product) : [];
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
              { name: product.name, url: `${SITE_URL}/tienda/${product.id}` },
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
            <ProductDetailClient productIdProp={id} productProp={product} />
        </>
    );
}

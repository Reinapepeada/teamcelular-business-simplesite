import ProductDetailClient from './ProductDetailClient';
import { getAllProductImages, getPrimaryImage } from '@/services/products';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductStructuredData from '@/components/seo/ProductStructuredData';
import { permanentRedirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildWebsiteMetadata, getSiteUrl } from '@/lib/seoMetadata';
import { formatWarranty, type Product } from '@/app/tienda/product';
import { verProducto } from '@/lib/storeCatalog';
import { productoDeVidriera, type VidrieraProduct } from '@/lib/fixbeeCatalog';
import { slugsAProbar } from '@/lib/legacySlug';

const SITE_URL = getSiteUrl();
const DEFAULT_LAT = process.env.NEXT_PUBLIC_BUSINESS_LAT || '-34.6037';
const DEFAULT_LON = process.env.NEXT_PUBLIC_BUSINESS_LON || '-58.3816';
const MAX_META_DESCRIPTION_LENGTH = 155;

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
 * El producto detras de la URL, y el slug con el que quedo resuelto.
 *
 * Devuelve el slug encontrado ademas del producto porque puede no ser el que
 * se pidio: un link viejo `/tienda/{nombre}-{id}` se resuelve recortando el
 * sufijo, y entonces la ficha tiene que redirigir a la URL nueva en vez de
 * servir dos URLs con el mismo contenido.
 */
const buscarProducto = async (
    slug: string
): Promise<{ product: VidrieraProduct; slug: string } | null> => {
    for (const candidato of slugsAProbar(slug)) {
        try {
            const crudo = await verProducto(candidato);
            if (crudo) {
                return { product: productoDeVidriera(crudo), slug: crudo.slug };
            }
        } catch {
            // Un 404 del catalogo es "probemos el que sigue", no un error de
            // la pagina. Cualquier otra falla tambien: la ficha termina en
            // notFound(), que es lo que corresponde mostrar.
        }
    }
    return null;
};

function truncateMetaDescription(text: string) {
    return text.length > MAX_META_DESCRIPTION_LENGTH
        ? `${text.slice(0, MAX_META_DESCRIPTION_LENGTH - 3).trim()}...`
        : text;
}

function buildProductSeoDescription(product: Product) {
    const name = product.name?.trim() || 'Repuesto para celular';
    const brand = product.brand?.name?.trim();
    const category = product.category?.name?.trim();
    const warrantyText = formatWarranty(product, '');
    const warranty = warrantyText ? `Garantía ${warrantyText}.` : 'Garantía según producto.';

    // Product names usually already carry the brand ("... CK"); appending it again
    // shipped duplicates like "CK CK" to the meta description.
    const nameIncludesBrand =
        !!brand && name.toLowerCase().includes(brand.toLowerCase());

    return truncateMetaDescription(
        `${name}${brand && !nameIncludesBrand ? ` ${brand}` : ''}${category ? `, ${category}` : ''}. Stock en Team Celular CABA, retiro en Recoleta o Belgrano. ${warranty}`
    );
}

/**
 * Server-side metadata generation for product pages.
 * Uses shared cached fetch to avoid duplicate requests.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    try {
        const encontrado = await buscarProducto(slug);
        if (!encontrado) {
            return buildWebsiteMetadata({
                path: '/tienda',
                title: 'Producto no encontrado | Team Celular',
                description: 'Producto no disponible en Team Celular.',
                robots: { index: false, follow: false },
            });
        }
        const product = encontrado.product;
        const image = getPrimaryImage(product) || '/placeholder.jpg';
        const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

        const title = `${product.name || 'Producto'} | Team Celular`;
        const description = buildProductSeoDescription(product);
        // El canonico es el slug que devolvio el catalogo, no el que vino en
        // la URL: asi un link viejo apunta a la ficha nueva en vez de
        // declararse canonico de si mismo.
        const canonicalPath = `/tienda/${encontrado.slug}`;

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
            'Recoleta CABA',
            'Buenos Aires',
        ].filter((keyword): keyword is string => Boolean(keyword));

        const seoMetadata = buildWebsiteMetadata({
            path: canonicalPath,
            title,
            description,
            keywords,
            // Product pages are a thin programmatic tail: the best performer
            // drew 29 impressions and 0 clicks in 28 days, and the template's
            // only unique text is name, price and warranty. They stay
            // crawlable and linkable so the catalog still flows equity to
            // category pages, but they no longer compete as index entries.
            robots: {
                index: false,
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
    const encontrado = await buscarProducto(slug);

    if (!encontrado) {
        notFound();
    }

    const product = encontrado.product;

    // Un link viejo `/tienda/{nombre}-{id}` resuelve al producto por el nombre:
    // 301 a la URL nueva, para que el link compartido siga valiendo y Google
    // mueva la senal en vez de ver dos paginas iguales.
    if (String(slug ?? '') !== encontrado.slug) {
        permanentRedirect(`/tienda/${encontrado.slug}`);
    }

    const images = getAllProductImages(product);
    const productSlug = encontrado.slug;
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
        productProp={product}
        storeSlugProp={encontrado.slug}
    />
        </>
    );
}

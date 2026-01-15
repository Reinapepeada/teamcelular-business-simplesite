import type { 
    Product, 
    ProductsPaginatedResponse, 
    PriceRangeResponse,
    CreateProductDTO,
    UpdateProductDTO,
    CreateVariantDTO,
    UpdateVariantDTO,
    ProductVariant
} from '@/app/tienda/product'
import { getToken } from '@/services/auth'

// Environment variables
export const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_KEY
export const apiUrl = process.env.NEXT_PUBLIC_API_URL 

// Custom error class for API errors
class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

// Helper function for API requests (public endpoints - GET)
async function apiRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
): Promise<T> {
    const url = `${apiUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new ApiError(response.status, errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Helper function for authenticated API requests (protected endpoints - POST, PUT, DELETE)
async function authenticatedApiRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
): Promise<T> {
    const url = `${apiUrl}${endpoint}`;
    const token = getToken();
    
    if (!token) {
        throw new ApiError(401, 'No autenticado. Inicia sesión para continuar.');
    }
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, { 
        ...options,
        headers,
        cache: 'no-store',
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        
        if (response.status === 401) {
            throw new ApiError(401, 'Sesión expirada. Inicia sesión nuevamente.');
        }
        if (response.status === 403) {
            throw new ApiError(403, 'No tienes permisos para realizar esta acción.');
        }
        
        throw new ApiError(response.status, errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// ============================================
// PRODUCTS ENDPOINTS
// ============================================

/**
 * Create a new product (requires Editor+ role)
 * POST /products/create
 */
export async function createProduct(formData: CreateProductDTO): Promise<Product> {
    console.log('Creating product:', JSON.stringify(formData));
    
    try {
        const data = await authenticatedApiRequest<Product>('/products/create', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        console.log('Product created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

/**
 * Get product by ID
 * GET /products/get/{product_id}
 */
export async function getProductById(productId: number): Promise<Product> {
    console.log('Fetching product:', productId);
    
    try {
        const data = await apiRequest<Product>(`/products/get/${productId}`, {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

/**
 * Get all products (non-paginated)
 * GET /products/all
 */
export async function getAllProducts(): Promise<Product[]> {
    try {
        const data = await apiRequest<Product[]>('/products/all', {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
}

/**
 * Get products with pagination and filters
 * GET /products/
 * 
 * @param page - Page number (starts at 1)
 * @param size - Items per page (max 100)
 * @param params - Query string with filters (categories, brands, minPrice, maxPrice)
 */
export async function getAllProductsPaginated(
    page: number = 1, 
    size: number = 10, 
    params: string = ''
): Promise<ProductsPaginatedResponse> {
    console.log('Fetching paginated products:', { page, size, params });
    
    try {
        const queryParams = new URLSearchParams();
        queryParams.set('page', String(page));
        queryParams.set('size', String(size));
        
        // Append additional params if provided
        if (params) {
            const additionalParams = new URLSearchParams(params);
            additionalParams.forEach((value, key) => {
                if (value) queryParams.set(key, value);
            });
        }

        const data = await apiRequest<ProductsPaginatedResponse>(
            `/products/?${queryParams.toString()}`,
            { method: 'GET' }
        );
        
        console.log('Products fetched:', data);
        return data;
    } catch (error) {
        console.error('Error fetching paginated products:', error);
        // Return empty response on error
        return { products: [], total: 0, page: 1, size: size, pages: 0 };
    }
}

/**
 * Get min and max price range
 * GET /products/min-max-price
 */
export async function getMinMaxPrice(): Promise<{ min: number; max: number }> {
    try {
        const data = await apiRequest<PriceRangeResponse>('/products/min-max-price', {
            method: 'GET',
        });
        return {
            min: parseFloat(data.min) || 0,
            max: parseFloat(data.max) || 10000,
        };
    } catch (error) {
        console.error('Error fetching price range:', error);
        return { min: 0, max: 10000 };
    }
}

/**
 * Update a product (requires Editor+ role)
 * PUT /products/update?product_id={id}
 */
export async function updateProduct(
    productId: number, 
    formData: UpdateProductDTO
): Promise<Product> {
    console.log('Updating product:', productId, JSON.stringify(formData));
    
    try {
        const data = await authenticatedApiRequest<Product>(
            `/products/update?product_id=${productId}`,
            {
                method: 'PUT',
                body: JSON.stringify(formData),
            }
        );
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

/**
 * Delete a product (requires Admin+ role)
 * DELETE /products/delete?product_id={id}
 */
export async function deleteProduct(productId: number): Promise<{ msg: string }> {
    console.log('Deleting product:', productId);
    
    try {
        const data = await authenticatedApiRequest<{ msg: string }>(
            `/products/delete?product_id=${productId}`,
            { method: 'DELETE' }
        );
        return data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// ============================================
// PRODUCT VARIANTS ENDPOINTS
// ============================================

/**
 * Create product variants (batch) - requires Editor+ role
 * POST /products/create/variant
 */
export async function createProductVariants(
    variants: CreateVariantDTO[]
): Promise<ProductVariant[]> {
    console.log('Creating variants:', JSON.stringify({ variants }));
    
    try {
        const data = await authenticatedApiRequest<ProductVariant[]>('/products/create/variant', {
            method: 'POST',
            body: JSON.stringify({ variants }),
        });
        console.log('Variants created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating product variants:', error);
        throw error;
    }
}

/**
 * Get variants by product ID
 * GET /products/get/variant?product_id={id}
 */
export async function getVariantsByProductId(productId: number): Promise<ProductVariant[]> {
    console.log('Fetching variants for product:', productId);
    
    try {
        const data = await apiRequest<ProductVariant[]>(
            `/products/get/variant?product_id=${productId}`,
            { method: 'GET' }
        );
        return data;
    } catch (error) {
        console.error('Error fetching variants:', error);
        throw error;
    }
}

/**
 * Update a variant (requires Editor+ role)
 * PUT /products/update/variant?variant_id={id}
 */
export async function updateProductVariant(
    variantId: number,
    formData: UpdateVariantDTO
): Promise<ProductVariant> {
    console.log('Updating variant:', variantId, JSON.stringify(formData));
    
    try {
        const data = await authenticatedApiRequest<ProductVariant>(
            `/products/update/variant?variant_id=${variantId}`,
            {
                method: 'PUT',
                body: JSON.stringify(formData),
            }
        );
        return data;
    } catch (error) {
        console.error('Error updating variant:', error);
        throw error;
    }
}

/**
 * Delete a variant (requires Admin+ role)
 * DELETE /products/delete/variant?variant_id={id}
 */
export async function deleteProductVariant(variantId: number): Promise<{ msg: string }> {
    console.log('Deleting variant:', variantId);
    
    try {
        const data = await authenticatedApiRequest<{ msg: string }>(
            `/products/delete/variant?variant_id=${variantId}`,
            { method: 'DELETE' }
        );
        return data;
    } catch (error) {
        console.error('Error deleting variant:', error);
        throw error;
    }
}

// ============================================
// IMAGE UPLOAD
// ============================================

/**
 * Upload images to imgBB
 */
export async function uploadImagesToimgBB(images: File[]): Promise<string[]> {
    if (!imgBBKey) {
        throw new Error('ImgBB API key not configured');
    }

    try {
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                const formData = new FormData();
                formData.append("image", image);
                
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`ImgBB upload failed: ${response.status}`);
                }
                
                const data = await response.json();
                return data.data.url;
            })
        );
        
        console.log("Images uploaded successfully:", uploadedImages);
        return uploadedImages;
    } catch (error) {
        console.error("Error uploading images to imgBB:", error);
        throw error;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate total stock from all variants
 */
export function calculateTotalStock(variants: ProductVariant[]): number {
    return variants.reduce((total, variant) => total + (variant.stock || 0), 0);
}

/**
 * Get primary image from product variants
 */
export function getPrimaryImage(product: Product): string {
    const firstVariantWithImage = product.variants?.find(
        v => v.images && v.images.length > 0
    );
    return firstVariantWithImage?.images[0]?.image_url || '/placeholder.jpg';
}

/**
 * Get all images from product variants
 */
export function getAllProductImages(product: Product): string[] {
    const images: string[] = [];
    product.variants?.forEach(variant => {
        variant.images?.forEach(img => {
            if (img.image_url && !images.includes(img.image_url)) {
                images.push(img.image_url);
            }
        });
    });
    return images.length > 0 ? images : ['/placeholder.jpg'];
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Get available colors from variants
 */
export function getAvailableColors(variants: ProductVariant[]): string[] {
    const colors = new Set<string>();
    variants.forEach(v => {
        if (v.color) colors.add(v.color);
    });
    return Array.from(colors);
}

/**
 * Get available sizes from variants
 */
export function getAvailableSizes(variants: ProductVariant[]): string[] {
    const sizes = new Set<string>();
    variants.forEach(v => {
        if (v.size) sizes.add(v.size);
    });
    return Array.from(sizes);
}

// ============================================
// BULK UPLOAD ENDPOINTS
// ============================================

export interface BulkUploadError {
    row: number;
    serial_number?: string;
    error: string;
}

export interface BulkUploadWarning {
    row: number;
    message: string;
}

export interface BulkUploadResult {
    total_rows: number;
    successful: number;
    failed: number;
    skipped: number;
    updated_products: number;
    updated_variants: number;
    created_products?: string[];
    created_variants?: string[];
    skipped_products?: string[];
    updated_products_list?: string[];
    updated_variants_list?: string[];
    errors?: BulkUploadError[];
    warnings?: BulkUploadWarning[];
}

/**
 * Download bulk upload template (public)
 * GET /product/bulk-upload/template
 */
export async function downloadBulkUploadTemplate(): Promise<void> {
    const url = `${apiUrl}/product/bulk-upload/template`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new ApiError(response.status, 'No se pudo descargar el template');
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'template_carga_productos.xlsx';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error downloading template:', error);
        throw error;
    }
}

/**
 * Export existing products (requires authentication)
 * GET /product/bulk-upload/export
 */
export async function exportProducts(): Promise<void> {
    const token = getToken();
    
    if (!token) {
        throw new ApiError(401, 'No autenticado. Inicia sesión para continuar.');
    }

    const url = `${apiUrl}/product/bulk-upload/export`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new ApiError(401, 'Sesión expirada. Inicia sesión nuevamente.');
            }
            if (response.status === 403) {
                throw new ApiError(403, 'No tienes permisos para exportar productos.');
            }
            throw new ApiError(response.status, 'No se pudo exportar los productos');
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        
        // Get filename from Content-Disposition header if available
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'productos_exportados.xlsx';
        
        if (contentDisposition) {
            const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }
        
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error exporting products:', error);
        throw error;
    }
}

/**
 * Upload bulk products from Excel file (requires authentication)
 * POST /product/bulk-upload
 */
export async function uploadBulkProducts(
    file: File,
    skipErrors: boolean = true
): Promise<BulkUploadResult> {
    const token = getToken();
    
    if (!token) {
        throw new ApiError(401, 'No autenticado. Inicia sesión para continuar.');
    }

    const url = `${apiUrl}/product/bulk-upload?skip_errors=${skipErrors}`;
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new ApiError(401, 'Sesión expirada. Inicia sesión nuevamente.');
            }
            if (response.status === 403) {
                throw new ApiError(403, 'No tienes permisos para cargar productos.');
            }
            
            const errorData = await response.json().catch(() => ({ detail: 'Error procesando el archivo' }));
            throw new ApiError(response.status, errorData.detail || 'Error procesando el archivo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading bulk products:', error);
        throw error;
    }
}
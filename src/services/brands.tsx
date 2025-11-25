"use server";

import type { Brand } from '@/app/tienda/product';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Types for brand operations
interface CreateBrandDTO {
    name: string;
}

interface UpdateBrandDTO {
    name?: string | null;
}

/**
 * Get all brands
 * GET /brands/get/all
 */
export async function getbrands(): Promise<Brand[]> {
    try {
        const response = await fetch(`${apiUrl}/brands/get/all`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
}

/**
 * Create a new brand
 * POST /brands/create
 */
export async function createBrand(brand: CreateBrandDTO): Promise<Brand> {
    const response = await fetch(`${apiUrl}/brands/create`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(brand)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Create brand failed');
    }

    return response.json();
}

/**
 * Update a brand
 * PUT /brands/update?brand_id={id}
 */
export async function updateBrand(brandId: number, data: UpdateBrandDTO): Promise<Brand> {
    const response = await fetch(`${apiUrl}/brands/update?brand_id=${brandId}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Update brand failed');
    }

    return response.json();
}

/**
 * Delete a brand
 * DELETE /brands/delete?brand_id={id}
 */
export async function deleteBrand(brandId: number): Promise<{ msg: string }> {
    const response = await fetch(`${apiUrl}/brands/delete?brand_id=${brandId}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Delete brand failed');
    }

    return response.json();
}
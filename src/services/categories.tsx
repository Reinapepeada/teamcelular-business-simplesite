"use server";

import type { Category } from '@/app/tienda/product';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Types for category operations
interface CreateCategoryDTO {
    name: string;
    description?: string | null;
}

interface UpdateCategoryDTO {
    name?: string | null;
    description?: string | null;
}

/**
 * Get all categories
 * GET /categories/get/all
 */
export async function getcategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${apiUrl}/categories/get/all`, {
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
        console.error('Error fetching categories:', error);
        return [];
    }
}

/**
 * Create a new category
 * POST /categories/create
 */
export async function createCategory({ name, description }: CreateCategoryDTO): Promise<Category> {
    const response = await fetch(`${apiUrl}/categories/create`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Create category failed');
    }

    return response.json();
}

/**
 * Update a category
 * PUT /categories/update?category_id={id}
 */
export async function updateCategory(categoryId: number, data: UpdateCategoryDTO): Promise<Category> {
    const response = await fetch(`${apiUrl}/categories/update?category_id=${categoryId}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Update category failed');
    }

    return response.json();
}

/**
 * Delete a category
 * DELETE /categories/delete?category_id={id}
 */
export async function deleteCategory(categoryId: number): Promise<{ msg: string }> {
    const response = await fetch(`${apiUrl}/categories/delete?category_id=${categoryId}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Delete category failed');
    }

    return response.json();
}
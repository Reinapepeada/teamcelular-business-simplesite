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
 * Get all categories (public)
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
 * Create a new category (requires Editor+ role)
 * POST /categories/create
 */
export async function createCategory(
    { name, description }: CreateCategoryDTO, 
    token: string
): Promise<Category> {
    const response = await fetch(`${apiUrl}/categories/create`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description })
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        if (response.status === 403) {
            throw new Error('No tienes permisos para crear categorías.');
        }
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Create category failed');
    }

    return response.json();
}

/**
 * Update a category (requires Editor+ role)
 * PUT /categories/update?category_id={id}
 */
export async function updateCategory(
    categoryId: number, 
    data: UpdateCategoryDTO,
    token: string
): Promise<Category> {
    const response = await fetch(`${apiUrl}/categories/update?category_id=${categoryId}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        if (response.status === 403) {
            throw new Error('No tienes permisos para editar categorías.');
        }
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Update category failed');
    }

    return response.json();
}

/**
 * Delete a category (requires Admin+ role)
 * DELETE /categories/delete?category_id={id}
 */
export async function deleteCategory(categoryId: number, token: string): Promise<{ msg: string }> {
    const response = await fetch(`${apiUrl}/categories/delete?category_id=${categoryId}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        if (response.status === 403) {
            throw new Error('No tienes permisos para eliminar categorías. Se requiere rol Admin o superior.');
        }
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Delete category failed');
    }

    return response.json();
}
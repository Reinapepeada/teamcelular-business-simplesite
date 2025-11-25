"use server";

import type { Branch } from '@/app/tienda/product';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Types for branch operations
interface CreateBranchDTO {
    name: string;
    location?: string | null;
}

interface UpdateBranchDTO {
    name?: string | null;
    location?: string | null;
}

/**
 * Get all branches (public)
 * GET /branches/get/all
 */
export async function getbranches(): Promise<Branch[]> {
    try {
        const response = await fetch(`${apiUrl}/branches/get/all`, {
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
        console.error('Error fetching branches:', error);
        return [];
    }
}

/**
 * Create a new branch (requires Editor+ role)
 * POST /branches/create
 */
export async function createBranch(
    { name, location }: CreateBranchDTO,
    token: string
): Promise<Branch> {
    const response = await fetch(`${apiUrl}/branches/create`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, location })
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }
        if (response.status === 403) {
            throw new Error('No tienes permisos para crear sucursales.');
        }
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Create branch failed');
    }

    return response.json();
}

/**
 * Update a branch (requires Editor+ role)
 * PUT /branches/update?branch_id={id}
 */
export async function updateBranch(
    branchId: number, 
    data: UpdateBranchDTO,
    token: string
): Promise<Branch> {
    const response = await fetch(`${apiUrl}/branches/update?branch_id=${branchId}`, {
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
            throw new Error('No tienes permisos para editar sucursales.');
        }
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Update branch failed');
    }

    return response.json();
}

/**
 * Delete a branch (requires Admin+ role)
 * DELETE /branches/delete?branch_id={id}
 */
export async function deleteBranch(branchId: number, token: string): Promise<{ msg: string }> {
    const response = await fetch(`${apiUrl}/branches/delete?branch_id=${branchId}`, {
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
            throw new Error('No tienes permisos para eliminar sucursales. Se requiere rol Admin o superior.');
        }
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Delete branch failed');
    }

    return response.json();
}
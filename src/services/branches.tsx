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
 * Get all branches
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
 * Create a new branch
 * POST /branches/create
 */
export async function createBranch({ name, location }: CreateBranchDTO): Promise<Branch> {
    const response = await fetch(`${apiUrl}/branches/create`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Create branch failed');
    }

    return response.json();
}

/**
 * Update a branch
 * PUT /branches/update?branch_id={id}
 */
export async function updateBranch(branchId: number, data: UpdateBranchDTO): Promise<Branch> {
    const response = await fetch(`${apiUrl}/branches/update?branch_id=${branchId}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Update branch failed');
    }

    return response.json();
}

/**
 * Delete a branch
 * DELETE /branches/delete?branch_id={id}
 */
export async function deleteBranch(branchId: number): Promise<{ msg: string }> {
    const response = await fetch(`${apiUrl}/branches/delete?branch_id=${branchId}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || 'Delete branch failed');
    }

    return response.json();
}
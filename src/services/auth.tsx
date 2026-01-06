"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Tipos de respuesta
export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface AdminUser {
    id: number;
    username: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
    is_active: boolean;
    created_at: string;
}

export interface AuthSession {
    token: string;
    user: AdminUser | null;
    expires: number;
}

// Error de API
export class AuthError extends Error {
    status: number;
    
    constructor(message: string, status: number) {
        super(message);
        this.name = 'AuthError';
        this.status = status;
    }
}

/**
 * Login usando la API real
 * POST /admin/login con body x-www-form-urlencoded (requerido por OAuth2PasswordRequestForm)
 */
export async function login(identifier: string, password: string): Promise<LoginResponse> {
    const formBody = new URLSearchParams();
    formBody.append('username', identifier); // Backend espera "username" aunque sea un email
    formBody.append('password', password);

    const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Error de autenticación' }));
        throw new AuthError(error.detail || 'Credenciales inválidas', response.status);
    }

    return response.json();
}

/**
 * Obtener información del admin actual
 * GET /admin/me
 */
export async function getCurrentAdmin(token: string): Promise<AdminUser> {
    const response = await fetch(`${API_URL}/admin/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new AuthError('No autorizado', response.status);
    }

    return response.json();
}

/**
 * Cambiar contraseña del admin actual
 * PUT /admin/me/password
 */
export async function changePassword(
    token: string,
    currentPassword: string,
    newPassword: string
): Promise<void> {
    const response = await fetch(`${API_URL}/admin/me/password`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Error al cambiar contraseña' }));
        throw new AuthError(error.detail || 'Error al cambiar contraseña', response.status);
    }
}

/**
 * Registrar nuevo admin (solo SUPER_ADMIN)
 * POST /admin/register
 */
export async function registerAdmin(
    token: string,
    data: {
        username: string;
        email: string;
        password: string;
        role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
    }
): Promise<AdminUser> {
    const response = await fetch(`${API_URL}/admin/register`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Error al registrar admin' }));
        throw new AuthError(error.detail || 'Error al registrar admin', response.status);
    }

    return response.json();
}

/**
 * Listar todos los admins (solo SUPER_ADMIN)
 * GET /admin/list
 */
export async function listAdmins(token: string): Promise<AdminUser[]> {
    const response = await fetch(`${API_URL}/admin/list`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Error al listar admins' }));
        throw new AuthError(error.detail || 'Error al listar admins', response.status);
    }

    return response.json();
}

// ============== Gestión de sesión local ==============

const SESSION_KEY = 'admin_auth_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Guardar sesión en localStorage
 */
export function saveSession(token: string, user: AdminUser | null): void {
    const session: AuthSession = {
        token,
        user,
        expires: Date.now() + SESSION_DURATION,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Obtener sesión de localStorage
 */
export function getSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (!stored) return null;
        
        const session: AuthSession = JSON.parse(stored);
        
        // Verificar si expiró
        if (session.expires < Date.now()) {
            clearSession();
            return null;
        }
        
        return session;
    } catch {
        clearSession();
        return null;
    }
}

/**
 * Limpiar sesión
 */
export function clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_KEY);
}

/**
 * Obtener token de la sesión actual
 */
export function getToken(): string | null {
    const session = getSession();
    return session?.token || null;
}

/**
 * Verificar si hay sesión válida
 */
export function isAuthenticated(): boolean {
    return getSession() !== null;
}

/**
 * Verificar si el usuario tiene un rol específico o superior
 */
export function hasRole(requiredRole: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'): boolean {
    const session = getSession();
    if (!session?.user) return false;
    
    const roleHierarchy = {
        'SUPER_ADMIN': 3,
        'ADMIN': 2,
        'EDITOR': 1,
    };
    
    const userLevel = roleHierarchy[session.user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
}

/**
 * Helper para hacer requests autenticados
 */
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getToken();
    
    if (!token) {
        throw new AuthError('No hay sesión activa', 401);
    }
    
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
    
    return fetch(url, {
        ...options,
        headers,
    });
}

"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    login as apiLogin,
    getCurrentAdmin,
    clearSession,
    saveSession,
    getSession,
    getToken,
    AdminUser,
    AuthSession,
    AuthError,
} from '@/services/auth';

interface AuthContextType {
    user: AdminUser | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    hasRole: (role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<AdminUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Verificar sesión existente al cargar
    const checkSession = useCallback(async () => {
        const session = getSession();
        
        if (session?.token) {
            setToken(session.token);
            setUser(session.user);
            
            // Intentar refrescar info del usuario
            try {
                const freshUser = await getCurrentAdmin(session.token);
                setUser(freshUser);
                saveSession(session.token, freshUser);
            } catch (error) {
                // Si el token es inválido, limpiar sesión
                if (error instanceof AuthError && error.status === 401) {
                    clearSession();
                    setToken(null);
                    setUser(null);
                }
            }
        }
        
        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    // Login
    const login = async (username: string, password: string) => {
        setIsLoading(true);
        
        try {
            // Llamar a la API de login
            const response = await apiLogin(username, password);
            const accessToken = response.access_token;
            
            // Obtener información del usuario
            let adminUser: AdminUser | null = null;
            try {
                adminUser = await getCurrentAdmin(accessToken);
            } catch {
                // Si falla obtener el usuario, igual guardamos el token
                console.warn('No se pudo obtener info del usuario');
            }
            
            // Guardar sesión
            saveSession(accessToken, adminUser);
            setToken(accessToken);
            setUser(adminUser);
            
            // Redirigir al dashboard
            router.push('/admin');
        } finally {
            setIsLoading(false);
        }
    };

    // Logout
    const logout = useCallback(() => {
        clearSession();
        setToken(null);
        setUser(null);
        router.push('/admin/login');
    }, [router]);

    // Refrescar usuario
    const refreshUser = async () => {
        const currentToken = getToken();
        if (!currentToken) return;
        
        try {
            const freshUser = await getCurrentAdmin(currentToken);
            setUser(freshUser);
            saveSession(currentToken, freshUser);
        } catch (error) {
            if (error instanceof AuthError && error.status === 401) {
                logout();
            }
        }
    };

    // Verificar rol
    const hasRole = (requiredRole: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'): boolean => {
        if (!user) return false;
        
        const roleHierarchy = {
            'SUPER_ADMIN': 3,
            'ADMIN': 2,
            'EDITOR': 1,
        };
        
        const userLevel = roleHierarchy[user.role] || 0;
        const requiredLevel = roleHierarchy[requiredRole] || 0;
        
        return userLevel >= requiredLevel;
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
        refreshUser,
        hasRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    
    return context;
}

// HOC para proteger rutas que requieren autenticación
export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requiredRole?: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'
) {
    return function AuthenticatedComponent(props: P) {
        const { isAuthenticated, isLoading, hasRole } = useAuth();
        const router = useRouter();
        
        useEffect(() => {
            if (!isLoading) {
                if (!isAuthenticated) {
                    router.push('/admin/login');
                } else if (requiredRole && !hasRole(requiredRole)) {
                    router.push('/admin'); // Redirigir a dashboard si no tiene permisos
                }
            }
        }, [isAuthenticated, isLoading, router, requiredRole, hasRole]);
        
        if (isLoading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            );
        }
        
        if (!isAuthenticated) {
            return null;
        }
        
        if (requiredRole && !hasRole(requiredRole)) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-destructive">Acceso Denegado</h1>
                        <p className="text-muted-foreground mt-2">
                            No tienes permisos para acceder a esta página.
                        </p>
                    </div>
                </div>
            );
        }
        
        return <WrappedComponent {...props} />;
    };
}

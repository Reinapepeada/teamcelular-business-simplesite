"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useHydrated } from '@/hooks/use-hydrated';
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
    login: (identifier: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    hasRole: (role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const hydrated = useHydrated();
    return hydrated ? <AuthSessionProvider>{children}</AuthSessionProvider> : null;
}

function AuthSessionProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [session] = useState(getSession);
    const [user, setUser] = useState<AdminUser | null>(() => session?.user ?? null);
    const [token, setToken] = useState<string | null>(() => session?.token ?? null);
    const [isLoading, setIsLoading] = useState(() => !!session?.token);
    const authVersion = useRef(0);

    // Verificar sesión existente al cargar
    useEffect(() => {
        if (!session?.token) return;
        let active = true;
        const version = authVersion.current;
        getCurrentAdmin(session.token).then((freshUser) => {
            if (!active || version !== authVersion.current) return;
            if (getToken() !== session.token) {
                setToken(null);
                setUser(null);
                return;
            }
            setUser(freshUser);
            saveSession(session.token, freshUser);
        }).catch((error) => {
            if (!active || version !== authVersion.current) return;
            if (getToken() !== session.token || (error instanceof AuthError && error.status === 401)) {
                if (getToken() === session.token) clearSession();
                setToken(null);
                setUser(null);
            }
        }).finally(() => {
            if (active && version === authVersion.current) setIsLoading(false);
        });
        return () => { active = false; };
    }, [session]);

    // Login
    const login = async (identifier: string, password: string) => {
        const version = ++authVersion.current;
        setIsLoading(true);
        
        try {
            // Llamar a la API de login
            const response = await apiLogin(identifier, password);
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
            if (version !== authVersion.current) return;
            saveSession(accessToken, adminUser);
            setToken(accessToken);
            setUser(adminUser);
            setIsLoading(false);
            
            router.replace('/admin');
        } catch (error) {
            if (version !== authVersion.current) return;
            setIsLoading(false);
            throw error;
        }
    };

    // Logout
    const logout = useCallback(() => {
        authVersion.current += 1;
        clearSession();
        setIsLoading(false);
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
        }, [isAuthenticated, isLoading, router, hasRole]);
        
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

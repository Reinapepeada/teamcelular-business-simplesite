"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    Package,
    Tags,
    Building2,
    LogOut,
    Menu,
    X,
    ChevronDown,
    PlusCircle,
    List,
    Store,
    User,
    Shield,
    Loader2,
} from "lucide-react";

interface NavItem {
    label: string;
    href?: string;
    icon: React.ReactNode;
    children?: { label: string; href: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
        label: "Productos",
        icon: <Package className="w-5 h-5" />,
        children: [
            {
                label: "Listar Productos",
                href: "/admin/products",
                icon: <List className="w-4 h-4" />,
            },
            {
                label: "Crear Producto",
                href: "/admin/create-products",
                icon: <PlusCircle className="w-4 h-4" />,
            },
        ],
    },
    {
        label: "Categorías",
        href: "/admin/categories",
        icon: <Tags className="w-5 h-5" />,
    },
    {
        label: "Marcas",
        href: "/admin/brands",
        icon: <Store className="w-5 h-5" />,
    },
    {
        label: "Sucursales",
        href: "/admin/branches",
        icon: <Building2 className="w-5 h-5" />,
    },
];

function AdminSidebar({ 
    isOpen, 
    onClose, 
    pathname 
}: { 
    isOpen: boolean; 
    onClose: () => void;
    pathname: string;
}) {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [expandedItems, setExpandedItems] = useState<string[]>(["Productos"]);

    useEffect(() => {
        if (!pathname) return;
        const activeParents = navItems
            .filter((item) =>
                item.children?.some((child) => pathname.startsWith(child.href))
            )
            .map((item) => item.label);

        if (activeParents.length === 0) return;
        setExpandedItems((prev) => Array.from(new Set([...prev, ...activeParents])));
    }, [pathname]);

    const toggleExpand = (label: string) => {
        setExpandedItems(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const handleLogout = async () => {
        await logout();
        router.push("/admin/login");
    };

    const isActive = (href: string) => {
        if (!pathname) return false;
        if (href === "/admin") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    // Función para obtener el ícono del rol
    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return <Shield className="w-4 h-4 text-yellow-500" />;
            case 'ADMIN':
                return <Shield className="w-4 h-4 text-blue-500" />;
            default:
                return <User className="w-4 h-4 text-gray-500" />;
        }
    };

    // Función para traducir el rol
    const translateRole = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'Super Admin';
            case 'ADMIN':
                return 'Administrador';
            case 'EDITOR':
                return 'Editor';
            default:
                return role;
        }
    };

    return (
        <>
            {/* Overlay para móvil */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isOpen ? 0 : -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed top-0 left-0 h-full w-64 bg-card border-r z-50 flex flex-col lg:translate-x-0 lg:static`}
            >
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-lg">Admin Panel</span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navItems.map((item) => {
                        const isChildActive = item.children?.some((child) => isActive(child.href));

                        return (
                            <div key={item.label}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleExpand(item.label)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                                                isChildActive ? "bg-accent" : "hover:bg-accent"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </div>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${
                                                    expandedItems.includes(item.label) ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {expandedItems.includes(item.label) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden ml-4 mt-1 space-y-1"
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={onClose}
                                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                                                isActive(child.href)
                                                                    ? "bg-primary text-primary-foreground"
                                                                    : "hover:bg-accent"
                                                            }`}
                                                        >
                                                            {child.icon}
                                                            <span className="text-sm">{child.label}</span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive(item.href!)
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-accent"
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t space-y-2">
                    {/* User Info */}
                    {user && (
                        <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-accent/50">
                            <div className="p-2 rounded-full bg-primary/10">
                                {getRoleIcon(user.role)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.username}</p>
                                <p className="text-xs text-muted-foreground">{translateRole(user.role)}</p>
                            </div>
                        </div>
                    )}
                    
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-accent text-muted-foreground"
                    >
                        <Store className="w-5 h-5" />
                        <span>Ver Tienda</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-destructive/10 text-destructive"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </motion.aside>
        </>
    );
}

// Componente interno que usa el contexto
function AdminLayoutContent({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        // No verificar auth en la página de login
        if (pathname === "/admin/login") {
            return;
        }

        // Si ya cargó y no está autenticado, redirigir
        if (!isLoading && !isAuthenticated) {
            router.push("/admin/login");
        }
    }, [pathname, isAuthenticated, isLoading, router]);

    // Página de login - sin layout
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Loading
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </div>
        );
    }

    // No autenticado
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex bg-background">
            <div className="lg:hidden">
                <AdminSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    pathname={pathname}
                />
            </div>
            
            <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
                {/* Top bar móvil */}
                <header className="lg:hidden sticky top-0 z-30 bg-card border-b px-4 py-3 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <span className="font-semibold">Admin Panel</span>
                    <div className="w-10" />
                </header>

                {/* Sidebar visible en desktop */}
                <div className="hidden lg:block fixed left-0 top-0 h-full">
                    <AdminSidebar
                        isOpen={true}
                        onClose={() => {}}
                        pathname={pathname}
                    />
                </div>

                {/* Main content */}
                <main className="flex-1 p-4 lg:p-6 lg:ml-64 overflow-auto">
                    {children}
                </main>
            </div>
            
            <Toaster />
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}

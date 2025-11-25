"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Package, 
    Tags, 
    Store, 
    Building2, 
    TrendingUp,
    PlusCircle,
    ArrowRight,
    DollarSign,
    ShoppingCart,
    AlertTriangle
} from "lucide-react";
import { getAllProductsPaginated } from "@/services/products";
import { getcategories } from "@/services/categories";
import { getbrands } from "@/services/brands";
import { getbranches } from "@/services/branches";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        brands: 0,
        branches: 0,
        lowStock: 0,
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [productsData, categories, brands, branches] = await Promise.all([
                    getAllProductsPaginated(1, 5, ""),
                    getcategories(),
                    getbrands(),
                    getbranches(),
                ]);

                // Calcular productos con bajo stock
                let lowStockCount = 0;
                productsData.products?.forEach(product => {
                    product.variants?.forEach(variant => {
                        if (variant.stock <= (variant.min_stock || 5)) {
                            lowStockCount++;
                        }
                    });
                });

                setStats({
                    products: productsData.total || 0,
                    categories: categories?.length || 0,
                    brands: brands?.length || 0,
                    branches: branches?.length || 0,
                    lowStock: lowStockCount,
                });
                setRecentProducts(productsData.products || []);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Productos",
            value: stats.products,
            icon: <Package className="w-6 h-6" />,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            href: "/admin/products",
        },
        {
            title: "Categorías",
            value: stats.categories,
            icon: <Tags className="w-6 h-6" />,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            href: "/admin/categories",
        },
        {
            title: "Marcas",
            value: stats.brands,
            icon: <Store className="w-6 h-6" />,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            href: "/admin/brands",
        },
        {
            title: "Sucursales",
            value: stats.branches,
            icon: <Building2 className="w-6 h-6" />,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
            href: "/admin/branches",
        },
    ];

    const quickActions = [
        {
            title: "Crear Producto",
            description: "Agregar un nuevo producto al catálogo",
            icon: <PlusCircle className="w-5 h-5" />,
            href: "/admin/create-products",
        },
        {
            title: "Ver Productos",
            description: "Gestionar productos existentes",
            icon: <Package className="w-5 h-5" />,
            href: "/admin/products",
        },
        {
            title: "Ver Tienda",
            description: "Ir a la tienda pública",
            icon: <ShoppingCart className="w-5 h-5" />,
            href: "/tienda",
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardContent className="p-6">
                                <div className="h-16 bg-muted rounded"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Bienvenido al panel de administración
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/create-products">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Nuevo Producto
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={stat.href}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                                            <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                            <span className={stat.color}>{stat.icon}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Alert: Low Stock */}
            {stats.lowStock > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="border-yellow-500/50 bg-yellow-500/5">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-2 rounded-full bg-yellow-500/20">
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Alerta de Stock Bajo</p>
                                <p className="text-sm text-muted-foreground">
                                    {stats.lowStock} variante(s) de producto con stock bajo
                                </p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/products?filter=low-stock">
                                    Ver Detalles
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Quick Actions & Recent Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Acciones Rápidas</CardTitle>
                        <CardDescription>Tareas comunes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    {action.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{action.title}</p>
                                    <p className="text-xs text-muted-foreground">{action.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Products */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Productos Recientes</CardTitle>
                            <CardDescription>Últimos productos agregados</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/products">
                                Ver todos
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentProducts.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    No hay productos aún
                                </p>
                            ) : (
                                recentProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden relative">
                                            {product.variants?.[0]?.images?.[0]?.image_url ? (
                                                <Image
                                                    src={product.variants[0].images[0].image_url}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <Package className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {product.category?.name || "Sin categoría"} • {product.brand?.name || "Sin marca"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ${product.retail_price?.toLocaleString() || 0}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {product.variants?.reduce((acc, v) => acc + (v.stock || 0), 0) || 0} en stock
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
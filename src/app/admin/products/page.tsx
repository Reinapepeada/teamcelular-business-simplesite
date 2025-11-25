"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Package,
    PlusCircle,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Layers,
    ChevronLeft,
    ChevronRight,
    Filter,
    RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAllProductsPaginated, deleteProduct } from "@/services/products";
import { getcategories } from "@/services/categories";
import { getbrands } from "@/services/brands";
import type { Product, Category, Brand, ProductVariant } from "@/app/tienda/product";

const ITEMS_PER_PAGE = 10;

export default function ProductsListPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    
    // Delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch filters data
    useEffect(() => {
        async function fetchFilters() {
            try {
                const [cats, brs] = await Promise.all([
                    getcategories(),
                    getbrands(),
                ]);
                setCategories(cats || []);
                setBrands(brs || []);
            } catch (error) {
                console.error("Error fetching filters:", error);
            }
        }
        fetchFilters();
    }, []);

    // Fetch products
    const fetchProducts = useCallback(async (page = 1) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedCategory) params.set("categories", selectedCategory);
            if (selectedBrand) params.set("brands", selectedBrand);
            
            const response = await getAllProductsPaginated(
                page, 
                ITEMS_PER_PAGE, 
                params.toString()
            );
            
            setProducts(response.products || []);
            setPagination({
                page: response.page || 1,
                pages: response.pages || 1,
                total: response.total || 0,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudieron cargar los productos",
            });
        } finally {
            setIsLoading(false);
        }
    }, [selectedCategory, selectedBrand]);

    useEffect(() => {
        fetchProducts(pagination.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchProducts]);

    // Handle delete
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        
        setIsDeleting(true);
        try {
            await deleteProduct(productToDelete.id);
            toast({
                title: "Producto eliminado",
                description: `"${productToDelete.name}" fue eliminado correctamente`,
            });
            fetchProducts(pagination.page);
        } catch (error) {
            console.error("Error deleting product:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar el producto",
            });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    // Filter products by search term (client-side)
    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.serial_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total stock
    const getTotalStock = (variants: ProductVariant[] | undefined) => {
        return variants?.reduce((acc: number, v: ProductVariant) => acc + (v.stock || 0), 0) || 0;
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return <Badge variant="default" className="bg-green-500">Activo</Badge>;
            case "INACTIVE":
                return <Badge variant="secondary">Inactivo</Badge>;
            case "DISCONTINUED":
                return <Badge variant="destructive">Descontinuado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Productos</h1>
                    <p className="text-muted-foreground">
                        Gestiona tu catálogo de productos
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/create-products">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Nuevo Producto
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre o SKU..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        
                        {/* Category filter */}
                        <Select 
                            value={selectedCategory} 
                            onValueChange={(value) => {
                                setSelectedCategory(value === "all" ? "" : value);
                            }}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las categorías</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Brand filter */}
                        <Select 
                            value={selectedBrand} 
                            onValueChange={(value) => {
                                setSelectedBrand(value === "all" ? "" : value);
                            }}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Marca" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las marcas</SelectItem>
                                {brands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.name}>
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Refresh */}
                        <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => fetchProducts(pagination.page)}
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Productos</CardTitle>
                    <CardDescription>
                        {pagination.total} producto(s) en total
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="w-12 h-12 rounded" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-3 w-1/4" />
                                    </div>
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-lg font-medium">No se encontraron productos</p>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm ? "Prueba con otros términos de búsqueda" : "Comienza agregando tu primer producto"}
                            </p>
                            <Button asChild>
                                <Link href="/admin/create-products">
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Crear Producto
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-16">Imagen</TableHead>
                                            <TableHead>Producto</TableHead>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Marca</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                            <TableHead className="text-center">Stock</TableHead>
                                            <TableHead className="text-center">Estado</TableHead>
                                            <TableHead className="w-16"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AnimatePresence>
                                            {filteredProducts.map((product) => (
                                                <motion.tr
                                                    key={product.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="group"
                                                >
                                                    <TableCell>
                                                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden relative">
                                                            {product.variants?.[0]?.images?.[0]?.image_url ? (
                                                                <Image
                                                                    src={product.variants[0].images[0].image_url}
                                                                    alt={product.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <Package className="w-6 h-6 text-muted-foreground" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{product.name}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                SKU: {product.serial_number}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.category?.name || "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.brand?.name || "-"}
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        ${product.retail_price?.toLocaleString() || 0}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <span className={`font-medium ${getTotalStock(product.variants) <= 5 ? 'text-red-500' : ''}`}>
                                                            {getTotalStock(product.variants)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {getStatusBadge(product.status)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/tienda/${product.id}`}>
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        Ver en tienda
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/admin/products/${product.id}`}>
                                                                        <Edit className="w-4 h-4 mr-2" />
                                                                        Editar
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/admin/create-variants/${product.id}`}>
                                                                        <Layers className="w-4 h-4 mr-2" />
                                                                        Variantes
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem 
                                                                    className="text-destructive"
                                                                    onClick={() => handleDeleteClick(product)}
                                                                >
                                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                                    Eliminar
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden space-y-4">
                                {filteredProducts.map((product) => (
                                    <Card key={product.id}>
                                        <CardContent className="p-4">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0 relative">
                                                    {product.variants?.[0]?.images?.[0]?.image_url ? (
                                                        <Image
                                                            src={product.variants[0].images[0].image_url}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package className="w-8 h-8 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">{product.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {product.category?.name} • {product.brand?.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="font-semibold">
                                                            ${product.retail_price?.toLocaleString()}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            • {getTotalStock(product.variants)} en stock
                                                        </span>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/products/${product.id}`}>
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Editar
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            className="text-destructive"
                                                            onClick={() => handleDeleteClick(product)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                                Página {pagination.page} de {pagination.pages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchProducts(pagination.page - 1)}
                                    disabled={pagination.page <= 1}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchProducts(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.pages}
                                >
                                    Siguiente
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente 
                            <span className="font-semibold"> &quot;{productToDelete?.name}&quot;</span> y 
                            todas sus variantes.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

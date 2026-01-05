"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Save,
    Package,
    Layers,
    Trash2,
    PlusCircle,
    Loader2,
    ImageIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PRODUCT_DESCRIPTION_MAX } from "@/lib/product-constants";
import { buildProductSlug } from "@/lib/productSlug";

import { getProductById, updateProduct, deleteProductVariant } from "@/services/products";
import { getbrands } from "@/services/brands";
import { getcategories } from "@/services/categories";

import CreateBrandModal from "@/components/modals/create-brand-modal";
import CreateCategoryModal from "@/components/modals/create-category-modal";

const formSchema = z.object({
    serial_number: z.string().min(1, "Requerido"),
    name: z.string().min(1, "Requerido").max(100),
    description: z.string().max(PRODUCT_DESCRIPTION_MAX).optional(),
    brand_id: z.number().optional().nullable(),
    category_id: z.number().optional().nullable(),
    warranty_time: z.number().optional().nullable(),
    warranty_unit: z.enum(["DAYS", "MONTHS", "YEARS"]).optional().nullable(),
    cost: z.number().min(0, "Debe ser positivo"),
    retail_price: z.number().min(0, "Debe ser positivo"),
    status: z.enum(["ACTIVE", "INACTIVE", "DISCONTINUED"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const productId = parseInt(params.id as string);

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [brands, setBrands] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serial_number: "",
            name: "",
            description: "",
            brand_id: null,
            category_id: null,
            warranty_time: null,
            warranty_unit: null,
            cost: 0,
            retail_price: 0,
            status: "ACTIVE",
        },
    });

    // Fetch product and form data
    useEffect(() => {
        async function fetchData() {
            try {
                const [productData, brandsData, categoriesData] = await Promise.all([
                    getProductById(productId),
                    getbrands(),
                    getcategories(),
                ]);

                setProduct(productData);
                setBrands(brandsData || []);
                setCategories(categoriesData || []);

                // Set form values
                form.reset({
                    serial_number: productData.serial_number || "",
                    name: productData.name || "",
                    description: productData.description || "",
                    brand_id: productData.brand_id || productData.brand?.id || null,
                    category_id: productData.category_id || productData.category?.id || null,
                    warranty_time: productData.warranty_time || null,
                    warranty_unit: productData.warranty_unit || null,
                    cost: productData.cost || 0,
                    retail_price: productData.retail_price || 0,
                    status: productData.status || "ACTIVE",
                });
            } catch (error) {
                console.error("Error fetching product:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "No se pudo cargar el producto",
                });
            } finally {
                setIsLoading(false);
            }
        }

        if (productId) {
            fetchData();
        }
    }, [productId, form]);

    // Refresh brands/categories after creating new ones
    useEffect(() => {
        async function refreshData() {
            const [brandsData, categoriesData] = await Promise.all([
                getbrands(),
                getcategories(),
            ]);
            setBrands(brandsData || []);
            setCategories(categoriesData || []);
        }
        if (!showBrandModal && !showCategoryModal) {
            refreshData();
        }
    }, [showBrandModal, showCategoryModal]);

    // Handle form submit
    const onSubmit = async (values: FormValues) => {
        setIsSaving(true);
        try {
            await updateProduct(productId, values);
            toast({
                title: "Producto actualizado",
                description: "Los cambios se guardaron correctamente",
            });
            router.push("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo actualizar el producto",
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Handle delete variant
    const handleDeleteVariant = async (variantId: number) => {
        if (!confirm("¿Eliminar esta variante?")) return;

        try {
            await deleteProductVariant(variantId);
            toast({
                title: "Variante eliminada",
                description: "La variante se eliminó correctamente",
            });
            // Refresh product data
            const productData = await getProductById(productId);
            setProduct(productData);
        } catch (error) {
            console.error("Error deleting variant:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar la variante",
            });
        }
    };

    // Color map for display
    const colorNames: Record<string, string> = {
        NEGRO: "Negro",
        BLANCO: "Blanco",
        ROJO: "Rojo",
        AZUL: "Azul",
        VERDE: "Verde",
        AMARILLO: "Amarillo",
        NARANJA: "Naranja",
        VIOLETA: "Violeta",
        ROSADO: "Rosado",
        MARRON: "Marrón",
        GRIS: "Gris",
        BORDO: "Bordó",
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Producto no encontrado</h2>
                <Button asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a productos
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Modals */}
            {showBrandModal && (
                <CreateBrandModal isOpen={showBrandModal} setIsOpen={setShowBrandModal} />
            )}
            {showCategoryModal && (
                <CreateCategoryModal isOpen={showCategoryModal} setIsOpen={setShowCategoryModal} />
            )}

            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Editar Producto</h1>
                    <p className="text-muted-foreground">{product.name}</p>
                </div>
                <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                    {product.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Basic Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información Básica</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="serial_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Número de Serie / SKU</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombre del Producto</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descripción</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        value={field.value || ""}
                                                        rows={6}
                                                        maxLength={PRODUCT_DESCRIPTION_MAX}
                                                    />
                                                </FormControl>
                                                <FormDescription className="flex justify-between">
                                                    <span>Max {PRODUCT_DESCRIPTION_MAX} chars</span>
                                                    <span>
                                                        {(field.value || "").length}/{PRODUCT_DESCRIPTION_MAX}
                                                    </span>
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="brand_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Marca</FormLabel>
                                                    <div className="flex gap-2">
                                                        <Select
                                                            onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                                                            value={field.value?.toString() || ""}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Seleccionar marca" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {brands.map((brand) => (
                                                                    <SelectItem
                                                                        key={brand.id}
                                                                        value={brand.id.toString()}
                                                                    >
                                                                        {brand.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => setShowBrandModal(true)}
                                                        >
                                                            <PlusCircle className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="category_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Categoría</FormLabel>
                                                    <div className="flex gap-2">
                                                        <Select
                                                            onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                                                            value={field.value?.toString() || ""}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Seleccionar categoría" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {categories.map((cat) => (
                                                                    <SelectItem
                                                                        key={cat.id}
                                                                        value={cat.id.toString()}
                                                                    >
                                                                        {cat.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => setShowCategoryModal(true)}
                                                        >
                                                            <PlusCircle className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pricing */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Precios</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="cost"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Costo</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Precio de compra (interno)
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="retail_price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Precio de Venta</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Precio público
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Status & Warranty */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Estado y Garantía</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Estado</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="ACTIVE">Activo</SelectItem>
                                                            <SelectItem value="INACTIVE">Inactivo</SelectItem>
                                                            <SelectItem value="DISCONTINUED">Descontinuado</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="warranty_time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tiempo de Garantía</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            value={field.value || ""}
                                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="warranty_unit"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Unidad</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value || ""}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccionar" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="DAYS">Días</SelectItem>
                                                            <SelectItem value="MONTHS">Meses</SelectItem>
                                                            <SelectItem value="YEARS">Años</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/products">Cancelar</Link>
                                </Button>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Guardar Cambios
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Sidebar - Variants */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Variantes</CardTitle>
                                <CardDescription>
                                    {product.variants?.length || 0} variante(s)
                                </CardDescription>
                            </div>
                            <Button size="sm" asChild>
                                <Link href={`/admin/create-variants/${productId}`}>
                                    <PlusCircle className="w-4 h-4 mr-1" />
                                    Agregar
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {product.variants?.length === 0 ? (
                                <div className="text-center py-6 text-muted-foreground">
                                    <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Sin variantes</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {product.variants?.map((variant: any) => (
                                        <div
                                            key={variant.id}
                                            className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                                        >
                                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden relative">
                                                {variant.images?.[0]?.image_url ? (
                                                    <Image
                                                        src={variant.images[0].image_url}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">
                                                    {variant.color ? colorNames[variant.color] || variant.color : ""}
                                                    {variant.color && variant.size ? " - " : ""}
                                                    {variant.size || ""}
                                                    {!variant.color && !variant.size && `Variante #${variant.id}`}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Stock: {variant.stock} • SKU: {variant.sku?.slice(-8)}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDeleteVariant(variant.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Product Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Vista Previa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden relative">
                                {product.variants?.[0]?.images?.[0]?.image_url ? (
                                    <Image
                                        src={product.variants[0].images[0].image_url}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-16 h-16 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href={`/tienda/${buildProductSlug(product)}`} target="_blank">
                                    Ver en la Tienda
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

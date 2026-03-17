"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Button, 
    Chip, 
    Skeleton, 
    Card,
    Divider,
    Badge
} from "@nextui-org/react";
import { 
    ShoppingCart, 
    Heart, 
    Share2, 
    ChevronLeft, 
    ChevronRight,
    Shield,
    Truck,
    RotateCcw,
    Check,
    Minus,
    Plus,
    ArrowLeft
} from "lucide-react";

import { 
    getProductById, 
    formatPrice, 
    getPrimaryImage, 
    getAllProductImages,
    getAvailableColors,
    getAvailableSizes,
    calculateTotalStock
} from '@/services/products';
import { parseProductIdFromSlug } from '@/lib/productSlug';
import type { Product, ProductVariant } from '@/app/tienda/product';
import useCartStore from '@/store/cartStore';

function slugify(text = '') {
    return text
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Color mapping for display
const colorMap: Record<string, string> = {
    'NEGRO': '#000000',
    'BLANCO': '#FFFFFF',
    'ROJO': '#EF4444',
    'AZUL': '#3B82F6',
    'VERDE': '#22C55E',
    'AMARILLO': '#EAB308',
    'NARANJA': '#F97316',
    'VIOLETA': '#8B5CF6',
    'ROSADO': '#EC4899',
    'MARRON': '#92400E',
    'GRIS': '#6B7280',
    'BORDO': '#7F1D1D',
};

// Color name translations
const colorNames: Record<string, string> = {
    'NEGRO': 'Negro',
    'BLANCO': 'Blanco',
    'ROJO': 'Rojo',
    'AZUL': 'Azul',
    'VERDE': 'Verde',
    'AMARILLO': 'Amarillo',
    'NARANJA': 'Naranja',
    'VIOLETA': 'Violeta',
    'ROSADO': 'Rosado',
    'MARRON': 'Marrón',
    'GRIS': 'Gris',
    'BORDO': 'Bordó',
};

interface Props {
    productIdProp?: number;
    productProp?: Product | null;
}

export default function ProductDetailClient({ productIdProp, productProp }: Props) {
    const params = useParams();
    const router = useRouter();
    const productIdFromSlug = parseProductIdFromSlug(params?.slug);
    const productId = productIdProp ?? productIdFromSlug ?? NaN;
    
    const [product, setProduct] = useState<Product | null>(productProp || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // UI States
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    
    const { addToCart } = useCartStore();
    
    // Fetch product data only if not provided by server
    useEffect(() => {
        if (productProp) {
            // already set by server
            setIsLoading(false);
            return;
        }

        async function fetchProduct() {
            if (isNaN(productId)) {
                setError('ID de producto inválido');
                setIsLoading(false);
                return;
            }
            
            try {
                setIsLoading(true);
                const data = await getProductById(productId);
                setProduct(data);
                
                // Set default selections
                const colors = getAvailableColors(data.variants);
                const sizes = getAvailableSizes(data.variants);
                
                if (colors.length > 0) setSelectedColor(colors[0]);
                if (sizes.length > 0) setSelectedSize(sizes[0]);
                
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('No se pudo cargar el producto');
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchProduct();
    }, [productId, productProp]);
    
    // Update selected variant when color/size changes
    useEffect(() => {
        if (!product) return;
        
        const variant = product.variants.find(v => {
            const colorMatch = !selectedColor || v.color === selectedColor;
            const sizeMatch = !selectedSize || v.size === selectedSize;
            return colorMatch && sizeMatch;
        });
        
        setSelectedVariant(variant || null);
    }, [product, selectedColor, selectedSize]);
    
    // Get images
    const images = product ? getAllProductImages(product) : ['/placeholder.jpg'];
    const availableColors = product ? getAvailableColors(product.variants) : [];
    const availableSizes = product ? getAvailableSizes(product.variants) : [];
    const totalStock = product ? calculateTotalStock(product.variants) : 0;
    
    // Handle image navigation
    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };
    
    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    
    // Handle quantity
    const incrementQuantity = () => {
        const maxStock = selectedVariant?.stock || totalStock;
        if (quantity < maxStock) setQuantity(q => q + 1);
    };
    
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(q => q - 1);
    };
    
    // Handle add to cart
    const handleAddToCart = () => {
        if (product) {
            addToCart(product, selectedVariant, quantity);
        }
    };
    
    // Loading state
    if (isLoading) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="w-full aspect-square rounded-xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-12 w-1/3" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    
    // Error state
    if (error || !product) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <p className="text-muted-foreground mb-8">{error || 'El producto que buscas no existe.'}</p>
                <Button onClick={() => router.push('/tienda')} variant="solid" color="primary">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a la tienda
                </Button>
            </div>
        );
    }
    
    // Calculate discount (example: 0% off)
    const discount = 0;
    const originalPrice = product.retail_price;
    const discountedPrice = originalPrice * (1 - discount / 100);
    
    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto pb-2">
                <Link href="/tienda" className="text-muted-foreground hover:text-primary transition-colors">
                    Tienda
                </Link>
                <span className="text-muted-foreground">/</span>
                {product?.category && (
                    <>
                        <Link 
                            href={`/tienda/categoria/${(product.category.name || '').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {product.category.name}
                        </Link>
                        <span className="text-muted-foreground">/</span>
                    </>
                )}
                <span className="font-medium">{product?.name}</span>
            </nav>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={images[selectedImageIndex]}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Navigation arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                        
                        {/* Discount badge */}
                        {discount > 0 && (
                            <div className="absolute top-4 left-4">
                                <Chip color="danger" variant="solid" size="sm">
                                    -{discount}%
                                </Chip>
                            </div>
                        )}
                    </div>
                    
                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                                        selectedImageIndex === index 
                                            ? 'border-primary' 
                                            : 'border-transparent hover:border-gray-300'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} - ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Product Info */}
                <div className="space-y-6">
                    {/* Brand & Category */}
                    <div className="flex flex-wrap gap-2">
                        {product.brand && (
                            <Chip variant="flat" color="warning" size="sm">
                                {product.brand.name}
                            </Chip>
                        )}
                        {product.category && (
                            <Chip variant="dot" color="secondary" size="sm">
                                {product.category.name}
                            </Chip>
                        )}
                        {product.status === 'ACTIVE' && (
                            <Chip variant="flat" color="success" size="sm">
                                Disponible
                            </Chip>
                        )}
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl font-bold">{product.name}</h1>

                    {/* SKU */}
                    <p className="text-sm text-muted-foreground">
                        SKU: {product.serial_number}
                    </p>

                    {/* Price */}
                    <div className="space-y-1">
                        {discount > 0 ? (
                            <>
                                <p className="text-lg line-through text-gray-400">
                                    ${formatPrice(originalPrice)}
                                </p>
                                <p className="text-4xl font-bold text-red-600">
                                    ${formatPrice(discountedPrice)}
                                </p>
                                <p className="text-sm text-green-600 font-medium">
                                    ¡Ahorrás ${formatPrice(originalPrice - discountedPrice)}!
                                </p>
                            </>
                        ) : (
                            <p className="text-4xl font-bold">
                                ${formatPrice(originalPrice)}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    {product.description && (
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    )}
                    
                    <Divider />
                    
                    {/* Color Selection */}
                    {availableColors.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium">
                                Color: <span className="text-muted-foreground">{selectedColor ? colorNames[selectedColor] || selectedColor : ''}</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                                            selectedColor === color 
                                                ? 'border-primary scale-110' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        style={{ backgroundColor: colorMap[color] || '#gray' }}
                                        title={colorNames[color] || color}
                                    >
                                        {selectedColor === color && (
                                            <Check className={`w-5 h-5 ${color === 'BLANCO' || color === 'AMARILLO' ? 'text-black' : 'text-white'}`} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Size Selection */}
                    {availableSizes.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium">
                                Tamaño/Capacidad: <span className="text-muted-foreground">{selectedSize || ''}</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                                            selectedSize === size 
                                                ? 'border-primary bg-primary/10 text-primary' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Stock Info */}
                    <div className="flex items-center gap-2">
                        {(selectedVariant?.stock || totalStock) > 0 ? (
                            <>
                                <Check className="w-5 h-5 text-green-500" />
                                <span className="text-green-600 font-medium">
                                    {selectedVariant ? selectedVariant.stock : totalStock} unidades disponibles
                                </span>
                            </>
                        ) : (
                            <span className="text-red-500 font-medium">Sin stock</span>
                        )}
                    </div>
                    
                    {/* Quantity & Add to Cart */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border rounded-lg">
                            <button
                                onClick={decrementQuantity}
                                disabled={quantity <= 1}
                                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-6 py-3 font-medium min-w-[60px] text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={incrementQuantity}
                                disabled={quantity >= (selectedVariant?.stock || totalStock)}
                                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleAddToCart}
                            disabled={(selectedVariant?.stock || totalStock) === 0}
                            color="primary"
                            size="lg"
                            className="flex-1"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Agregar al carrito
                        </Button>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-4">
                        <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-2" />
                            Favoritos
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Compartir
                        </Button>
                    </div>
                    
                    <Divider />
                    
                    {/* Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <Truck className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">Envío</p>
                                    <p className="text-xs text-muted-foreground">En compras +$50.000</p>
                                </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <Shield className="w-6 h-6 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Garantía</p>
                                <p className="text-xs text-muted-foreground">
                                    {product.warranty_time && product.warranty_unit 
                                        ? `${product.warranty_time} ${product.warranty_unit.toLowerCase()}`
                                        : 'Consultar'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <RotateCcw className="w-6 h-6 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Devoluciones</p>
                                <p className="text-xs text-muted-foreground">30 días</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Product Details Section */}
            {product.variants.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Variantes disponibles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {product.variants.map((variant) => (
                            <Card key={variant.id} className="p-4">
                                <div className="flex items-center gap-3">
                                    {variant.images[0] && (
                                        <Image
                                            src={variant.images[0].image_url}
                                            alt={`${product.name} - ${variant.color || ''} ${variant.size || ''}`}
                                            width={60}
                                            height={60}
                                            className="rounded-lg object-cover"
                                            sizes="60px"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium">
                                            {variant.color && colorNames[variant.color]}
                                            {variant.color && variant.size && ' - '}
                                            {variant.size}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            SKU: {variant.sku}
                                        </p>
                                        <p className={`text-sm font-medium ${variant.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {variant.stock > 0 ? `${variant.stock} en stock` : 'Sin stock'}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

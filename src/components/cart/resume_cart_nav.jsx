"use client";

import { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, X, Trash2, MessageCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

// Número de WhatsApp de la tienda (sin el +)
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491112345678";

// Helper para obtener la imagen del producto o variante
function getItemImage(item) {
    // Si tiene variante con imagen, usar esa
    if (item.variant?.images?.[0]?.image_url) {
        return item.variant.images[0].image_url;
    }
    // Si no, buscar en las variantes del producto
    const firstVariantWithImage = item.product.variants?.find(
        v => v.images && v.images.length > 0
    );
    return firstVariantWithImage?.images[0]?.image_url || '/placeholder.jpg';
}

// Helper para obtener el nombre con variante
function getItemName(item) {
    let name = item.product.name;
    if (item.variant) {
        const parts = [];
        if (item.variant.color) parts.push(item.variant.color);
        if (item.variant.size) parts.push(item.variant.size);
        if (parts.length > 0) {
            name += ` (${parts.join(' - ')})`;
        }
    }
    return name;
}

// Helper para formatear precio
function formatPrice(price) {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Traducción de colores
const colorNames = {
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

export default function ResumeCartNav() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        address: "",
        notes: "",
    });
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.product.retail_price * item.quantity,
        0
    );

    // Detectar cuando se agrega algo al carrito
    useEffect(() => {
        if (totalItems > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timer);
        }
    }, [totalItems]);

    // Generar mensaje de WhatsApp con el pedido
    const generateWhatsAppMessage = () => {
        let message = `🛒 *NUEVO PEDIDO - Team Celular*\n\n`;
        message += `👤 *Datos del Cliente:*\n`;
        message += `• Nombre: ${customerInfo.name}\n`;
        message += `• Teléfono: ${customerInfo.phone}\n`;
        if (customerInfo.address) {
            message += `• Dirección: ${customerInfo.address}\n`;
        }
        message += `\n📦 *Productos:*\n`;
        message += `─────────────────\n`;
        
        cart.forEach((item, index) => {
            const variantInfo = [];
            if (item.variant?.color) {
                variantInfo.push(colorNames[item.variant.color] || item.variant.color);
            }
            if (item.variant?.size) {
                variantInfo.push(item.variant.size);
            }
            
            message += `${index + 1}. *${item.product.name}*\n`;
            if (variantInfo.length > 0) {
                message += `   Variante: ${variantInfo.join(' - ')}\n`;
            }
            message += `   Cantidad: ${item.quantity}\n`;
            message += `   Precio unit.: $${formatPrice(item.product.retail_price)}\n`;
            message += `   Subtotal: $${formatPrice(item.product.retail_price * item.quantity)}\n`;
            
            // Agregar URL de imagen si existe
            const imageUrl = getItemImage(item);
            if (imageUrl && imageUrl !== '/placeholder.jpg') {
                message += `   📷 Imagen: ${imageUrl}\n`;
            }
            message += `\n`;
        });
        
        message += `─────────────────\n`;
        message += `💰 *TOTAL: $${formatPrice(totalPrice)}*\n`;
        message += `📦 *Artículos: ${totalItems}*\n`;
        
        if (customerInfo.notes) {
            message += `\n📝 *Notas adicionales:*\n${customerInfo.notes}\n`;
        }
        
        message += `\n_Pedido generado desde la tienda online_`;
        
        return message;
    };

    // Enviar pedido por WhatsApp
    const handleSendWhatsApp = () => {
        if (!customerInfo.name || !customerInfo.phone) {
            return;
        }
        
        setIsSending(true);
        
        const message = generateWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Abrir WhatsApp en nueva pestaña
        window.open(whatsappUrl, '_blank');
        
        setIsSending(false);
        setIsCheckoutOpen(false);
        
        // Opcional: limpiar carrito después de enviar
        // clearCart();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                    <motion.div
                        animate={isAnimating ? {
                            scale: [1, 1.15, 1],
                        } : {}}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                    </motion.div>
                    <span className="hidden sm:inline">Carrito</span>
                    <AnimatePresence mode="wait">
                        {totalItems > 0 && (
                            <motion.span
                                key={totalItems}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                            >
                                {totalItems > 99 ? '99+' : totalItems}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <SheetTitle className="text-lg font-semibold">
                                Tu Carrito
                            </SheetTitle>
                            <SheetDescription className="text-sm">
                                {totalItems === 0 
                                    ? "Tu carrito está vacío" 
                                    : `${totalItems} artículo${totalItems !== 1 ? "s" : ""}`
                                }
                            </SheetDescription>
                        </div>
                        {cart.length > 0 && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={clearCart}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Vaciar
                            </Button>
                        )}
                    </div>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto py-4">
                    {cart.length > 0 ? (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.cartKey}
                                    className="flex gap-3 p-3 rounded-lg bg-accent/30"
                                >
                                    {/* Imagen */}
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={getItemImage(item)}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link 
                                            href={`/tienda/${item.product.id}`}
                                            className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors"
                                        >
                                            {getItemName(item)}
                                        </Link>
                                        <p className="text-sm font-semibold text-primary mt-1">
                                            ${formatPrice(item.product.retail_price)}
                                        </p>
                                        
                                        {/* Controles de cantidad */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.cartKey,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm font-medium w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.cartKey, 
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                            
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                                                onClick={() => removeFromCart(item.cartKey)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">Tu carrito está vacío</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                ¡Agrega productos para comenzar!
                            </p>
                        </div>
                    )}
                </div>
                
                {/* Footer con totales */}
                {cart.length > 0 && (
                    <SheetFooter className="border-t pt-4">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">${formatPrice(totalPrice)}</span>
                            </div>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700"
                                size="lg"
                                onClick={() => setIsCheckoutOpen(true)}
                            >
                                <MessageCircle className="h-5 w-5 mr-2" />
                                Finalizar por WhatsApp
                            </Button>
                            <Link href="/tienda" className="block">
                                <Button variant="outline" className="w-full">
                                    Seguir Comprando
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
            
            {/* Modal de checkout con WhatsApp */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <MessageCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="line-clamp-2">Finalizar Pedido por WhatsApp</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            Completa tus datos para enviar el pedido. Te responderemos lo antes posible.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
                        {/* Resumen del pedido */}
                        <div className="bg-accent/50 rounded-lg p-2 sm:p-3 space-y-2">
                            <h4 className="font-medium text-xs sm:text-sm">Resumen del pedido</h4>
                            <div className="text-xs sm:text-sm text-muted-foreground max-h-32 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.cartKey} className="flex justify-between gap-2 py-1">
                                        <span className="truncate flex-1 min-w-0">
                                            {item.quantity}x {item.product.name}
                                        </span>
                                        <span className="font-medium whitespace-nowrap">
                                            ${formatPrice(item.product.retail_price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold text-sm sm:text-base">
                                <span>Total</span>
                                <span className="text-primary">${formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                        
                        {/* Formulario de datos */}
                        <div className="space-y-2 sm:space-y-3">
                            <div className="space-y-1 sm:space-y-2">
                                <Label htmlFor="name" className="text-xs sm:text-sm">Nombre completo *</Label>
                                <Input
                                    id="name"
                                    placeholder="Tu nombre"
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                    className="text-sm"
                                />
                            </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                                <Label htmlFor="phone" className="text-xs sm:text-sm">Teléfono *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="11-1234-5678"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                    className="text-sm"
                                />
                            </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                                <Label htmlFor="address" className="text-xs sm:text-sm">Dirección (opcional)</Label>
                                <Input
                                    id="address"
                                    placeholder="Tu dirección de envío"
                                    value={customerInfo.address}
                                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                                    className="text-sm"
                                />
                            </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                                <Label htmlFor="notes" className="text-xs sm:text-sm">Notas adicionales (opcional)</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Algún comentario sobre tu pedido..."
                                    rows={2}
                                    value={customerInfo.notes}
                                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                                    className="text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsCheckoutOpen(false)}
                            className="w-full sm:w-auto text-sm"
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-sm"
                            onClick={handleSendWhatsApp}
                            disabled={!customerInfo.name || !customerInfo.phone || isSending}
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    <span>Enviando...</span>
                                </>
                            ) : (
                                <>
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    <span>Enviar a WhatsApp</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Sheet>
    );
}
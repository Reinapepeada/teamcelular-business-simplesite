"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";

export default function ResumeCartNav() {
    const { cart, updateQuantity, clearCart } = useCartStore();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.retail_price * item.quantity,
        0
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                    <ShoppingCart className="h-6 w-6 mr-3" />
                    Carrito
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <SheetTitle className="text-lg font-semibold">Tu Carrito</SheetTitle>
                            <SheetDescription className="text-base">
                                Tienes {totalItems} artículo{totalItems !== 1 ? "s" : ""} en tu carrito.
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>
                <div className="mt-8 space-y-6 overflow-y-auto max-h-[60vh]">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-6 border-b">
                                <div className="flex items-center">
                                    <img
                                        src={
                                            item?.variants?.[0]?.images?.[0]?.image_url || "/placeholder.jpg"
                                        }
                                        alt={item.name}
                                        className="object-cover h-20 w-20 rounded-md"
                                    />
                                    <div className="ml-6">
                                        <h3 className="text-base font-medium">{item.name}</h3>
                                        <p className="text-sm">${item.retail_price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                Math.max(item.quantity - 1, 0)
                                            )
                                        }>
                                        <Minus className="h-5 w-5" />
                                    </Button>
                                    <span className="mx-3 text-base font-medium">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity + 1)
                                        }>
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Tu carrito está vacío.</p>
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="mt-8">
                        <div className="flex justify-between text-lg font-medium">
                            <p>Subtotal</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <Button
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold">
                            Finalizar Compra
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
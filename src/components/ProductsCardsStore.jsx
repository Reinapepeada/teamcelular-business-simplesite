import React from "react";
import { motion } from "framer-motion";
import { Card, Skeleton, Button, Pagination } from "@nextui-org/react";
import Link from "next/link";

function ProductsCardsStore({
    products,
    setPage,
    totalPages,
    isLoading,
    addToCart
}) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                {isLoading ? (
                    <>
                        {/* Generar 8 skeletons para la carga inicial */}
                        {[...Array(12)].map((_, index) => (
                            <Card
                                key={index}
                                className="p-4 shadow rounded-lg border flex flex-col items-start">
                                <div className="w-full">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-600 rounded-md">
                                        <Skeleton className="w-full h-full" />
                                    </motion.div>
                                    <div className="text-left w-full space-y-2">
                                        <Skeleton className="h-6 w-3/4 mt-2" />{" "}
                                        {/* Nombre del producto */}
                                        <Skeleton className="h-4 w-1/2" />{" "}
                                        {/* Marca */}
                                        <Skeleton className="h-7 w-1/3" />{" "}
                                        {/* Precio */}
                                    </div>
                                </div>
                                <div className="w-full mt-2">
                                    <Skeleton className="h-10 w-full" />{" "}
                                    {/* Botón */}
                                </div>
                            </Card>
                        ))}
                    </>
                ) : (
                    products.map((product) => (
                        <Card
                            key={product.id}
                            className="p-4 shadow rounded-lg border flex flex-col items-start">
                            <Link
                                href={`/product/${product.id}`}
                                className="w-full">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full h-48 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={
                                            product?.variants[0]?.images[0]
                                                ?.image_url ||
                                            "/placeholder.jpg"
                                        }
                                        alt={product.name}
                                        className="object-contain h-full"
                                    />
                                </motion.div>
                                <div className="text-left">
                                    <h3 className="mt-2 text-lg font-semibold">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {product.brand.name}
                                    </p>
                                    <p className="text-xl font-bold text-blue-500">
                                        ${product.retail_price}
                                    </p>
                                </div>
                            </Link>
                            <div className="flex justify-center w-full">
                                <Button
                                    onClick={() => addToCart(product)}
                                    className="mt-2 "
                                    variant="shadow"
                                    color="primary">
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination isCompact showControls initialPage={1} total={totalPages} onChange={(page)=>{setPage(page) }}/>
            </div>
        </>
    );
}

export default ProductsCardsStore;
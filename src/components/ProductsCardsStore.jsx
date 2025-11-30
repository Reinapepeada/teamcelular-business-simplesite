"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Card,
    Skeleton,
    Pagination,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Chip,
} from "@nextui-org/react";

import { ShoppingCart, Star } from "lucide-react";
import CartNotification from "@/components/cart/CartNotification";

function ProductsCardsStore({
    products,
    setPage,
    totalPages,
    isLoading,
    addToCart,
}) {
    const router = useRouter();
    const [sortBy, setSortBy] = useState(null);
    const [sortedProducts, setSortedProducts] = useState(products);
    const [navigatingTo, setNavigatingTo] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [addedProductName, setAddedProductName] = useState("");

    const handleCardClick = (productId) => {
        setNavigatingTo(productId);
        router.push(`/tienda/${productId}`);
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, null, 1);
        // Reset notification state first
        setShowNotification(false);
        // Then trigger it again with new product
        setTimeout(() => {
            setAddedProductName(product.name);
            setShowNotification(true);
        }, 10);
    };

    useEffect(() => {
        let updatedProducts = [...products];
        if (sortBy === "price-asc") {
            updatedProducts.sort((a, b) => a.retail_price - b.retail_price);
        } else if (sortBy === "price-desc") {
            updatedProducts.sort((a, b) => b.retail_price - a.retail_price);
        } else if (sortBy === "name-asc") {
            updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "name-desc") {
            updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        setSortedProducts(updatedProducts);
    }, [sortBy, products]);

    return (
        <>
            <CartNotification show={showNotification} productName={addedProductName} />
            {/* Contenedor del sort */}
            <div className="flex justify-between items-center mt-4">
                <h2 className="text-xl font-bold">Productos</h2>
                <Dropdown>
                    <div className="flex items-center space-x-2">
                        <DropdownTrigger>
                            <Button variant="ghost" color="secondary">
                                Ordenar
                            </Button>
                        </DropdownTrigger>
                        <p
                            className={`text-sm font-medium ${
                                !sortBy ? "hidden" : ""
                            }`}>
                            {sortBy === "name-asc"
                                ? "Name Asc"
                                : sortBy === "name-desc"
                                ? "Name Desc"
                                : sortBy === "price-asc"
                                ? "Price Asc"
                                : sortBy === "price-desc"
                                ? "Price Desc"
                                : "Select"}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setSortBy("name-asc")}>
                            Name Asc
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortBy("name-desc")}>
                            Name Desc
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortBy("price-asc")}>
                            Price Asc
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortBy("price-desc")}>
                            Price Desc
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                {isLoading
                    ? [...Array(12)].map((_, index) => (
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
                                      <Skeleton className="h-6 w-3/4 mt-2" />
                                      <Skeleton className="h-4 w-1/2" />
                                      <Skeleton className="h-7 w-1/3" />
                                  </div>
                              </div>
                              <div className="w-full mt-2">
                                  <Skeleton className="h-10 w-full" />
                              </div>
                          </Card>
                      ))
                    : sortedProducts.map((product) => (
                          <div
                              key={product.id}
                              className={`cursor-pointer ${navigatingTo === product.id ? 'pointer-events-none' : ''}`}
                              onClick={() => handleCardClick(product.id)}
                              onTouchEnd={(e) => {
                                  e.preventDefault();
                                  handleCardClick(product.id);
                              }}
                              role="article"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      handleCardClick(product.id);
                                  }
                              }}
                          >
                              <Card 
                                  className={`p-4 shadow rounded-lg border flex flex-col items-start h-full hover:shadow-lg transition-all relative ${
                                      navigatingTo === product.id ? 'opacity-60' : ''
                                  }`}
                              >
                                  {navigatingTo === product.id && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] rounded-lg pointer-events-none z-10">
                                          <motion.div
                                              animate={{ rotate: 360 }}
                                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                          >
                                              <ShoppingCart className="h-8 w-8 text-primary" />
                                          </motion.div>
                                      </div>
                                  )}
                              <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md">
                                  <Image
                                      src={
                                          product?.variants?.[0]?.images?.[0]
                                              ?.image_url ||
                                          "/placeholder.jpg"
                                      }
                                      alt={product.name}
                                      width={192}
                                      height={192}
                                      className="object-contain h-full"
                                  />
                              </motion.div>

                              <div className="text-left w-full mt-2">
                                  <h3 className="mt-2 mx-1 text-lg font-semibold line-clamp-2">
                                      {product.name}
                                  </h3>
                                  {/* Pricing Section */}
                                  <div className="mx-1">
                                      <p className="text-2xl font-bold text-primary">
                                          $
                                          {product.retail_price
                                              .toFixed(0)
                                              .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  "."
                                              )}
                                      </p>
                                  </div>

                                  {/* Escasez */}
                                  {product.variants && product.variants.reduce((total, v) => total + (v.stock || 0), 0) < 10 && product.variants.reduce((total, v) => total + (v.stock || 0), 0) > 0 && (
                                      <p className="text-sm text-yellow-500 font-bold mx-1 animate-pulse">
                                          ¡Últimas {product.variants.reduce((total, v) => total + (v.stock || 0), 0)} unidades!
                                      </p>
                                  )}

                                  {/* Categoría y marca */}
                                  <div className="flex flex-wrap gap-1 mt-1">
                                      {product.category && (
                                          <Chip
                                              variant="dot"
                                              color="secondary"
                                              className="my-1">
                                              {product.category.name}
                                          </Chip>
                                      )}
                                      {product.brand && (
                                          <Chip
                                              variant="flat"
                                              color="warning"
                                              className="my-1">
                                              {product.brand.name}
                                          </Chip>
                                      )}
                                  </div>
                              </div>

                                  <div className="flex justify-center w-full mt-auto relative z-20">
                                      <Button
                                          onPress={(e) => {
                                              if (e) {
                                                  e.stopPropagation?.();
                                              }
                                              addToCart(product, null, 1);
                                              setShowNotification(false);
                                              setTimeout(() => {
                                                  setAddedProductName(product.name);
                                                  setShowNotification(true);
                                              }, 10);
                                          }}
                                          aria-label={`Agregar ${product.name} al carrito`}
                                          className="mt-4"
                                          variant="shadow"
                                          size="sm"
                                          color="primary"
                                      >
                                          Agregar al
                                          <ShoppingCart className="h-5 w-5" />
                                      </Button>
                                  </div>
                              </Card>
                          </div>
                      ))}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination
                    isCompact
                    showControls
                    initialPage={1}
                    total={totalPages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        </>
    );
}

export default ProductsCardsStore;

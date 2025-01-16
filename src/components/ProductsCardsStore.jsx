"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import Link from "next/link";

import { ShoppingCart, Star } from "lucide-react";

function ProductsCardsStore({
    products,
    setPage,
    totalPages,
    isLoading,
    addToCart,
}) {
    const [sortBy, setSortBy] = useState(null);
    const [sortedProducts, setSortedProducts] = useState(products);

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
                                      <h3 className="mt-2 mx-1 text-lg font-semibold">
                                          {product.name}
                                      </h3>
                                      {/* Pricing Section */}
                                      <div className="mx-1">
                                          {20 > 0 ? (
                                              <>
                                                  <p className="text-sm line-through text-gray-400 font-bold">
                                                      $
                                                      {product.retail_price
                                                          .toFixed(0)
                                                          .replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              "."
                                                          )}
                                                  </p>
                                                  <p className="text-2xl text-red-600 font-bold">
                                                      $
                                                      {(
                                                          product.retail_price *
                                                          (1 -
                                                              20 /
                                                                  100)
                                                      )
                                                          .toFixed(0)
                                                          .replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              "."
                                                          )}
                                                  </p>
                                                  <p className="text-sm text-red-400 font-bold mx-1">
                                                      ¡Descuento del{" "}
                                                      {20}%!
                                                  </p>
                                              </>
                                          ) : (
                                              <p className="text-xl font-semibold text-gray-300">
                                                  $
                                                  {product.retail_price
                                                      .toFixed(0)
                                                      .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          "."
                                                      )}
                                              </p>
                                          )}
                                      </div>

                                      {/* Escasez */}
                                      {product.stock < 10 && (
                                          <p className="text-sm text-yellow-500 font-bold mx-1 animate-pulse">
                                              ¡Últimas {product.stock} unidades!
                                          </p>
                                      )}
                                      {/* Calificación
                                    <div className="flex items-center mx-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < product.rating ? "#FFD700" : "none"}
                                                stroke="#FFD700"
                                            />
                                        ))}
                                        <span className="text-sm text-gray-500 ml-2">
                                            ({product.reviewCount} reseñas)
                                        </span>
                                    </div> */}
                                      {/* Categoría y marca */}
                                      <div className="flex flex-wrap gap-1 mt-1">
                                          <Chip
                                              variant="dot"
                                              color="secondary"
                                              className="my-1">
                                              {product.category.name}
                                          </Chip>
                                          <Chip
                                              variant="flat"
                                              color="warning"
                                              className="my-1">
                                              {product.brand.name}
                                          </Chip>
                                      </div>
                                  </div>
                              </Link>
                              <div className="flex justify-center w-full">
                                  <Button
                                      onClick={() => addToCart(product)}
                                      className="mt-4"
                                      variant="shadow"
                                      size="sm"
                                      color="primary">
                                      Agregar al
                                      <ShoppingCart className="h-5 w-5" />
                                  </Button>
                              </div>
                          </Card>
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

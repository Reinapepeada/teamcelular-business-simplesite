"use client";
import React from 'react';
import ProductsCardsStore from '@/components/ProductsCardsStore';
import useCartStore from '@/store/cartStore';

export default function CategoryClient({ products }: { products: any[] }) {
  const { addToCart } = useCartStore();

  // For now, simple pagination stub: show one page only.
  const setPage = (p: number) => {};

  return (
    <div>
      <ProductsCardsStore
        products={products}
        setPage={setPage}
        totalPages={1}
        isLoading={false}
        addToCart={addToCart}
        currentPage={1}
      />
    </div>
  );
}

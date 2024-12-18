'use server';
import ProductVariantForm from "./product-variant-form";

interface Params {
  slug: string;
}

export default async function Page({ params }: { params: Readonly<Params> }) {
  const slug = (await params).slug;

  return (
    <ProductVariantForm productId={slug} productName=""/>
  )
}


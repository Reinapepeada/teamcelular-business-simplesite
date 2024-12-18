'use server';
import ProductVariantForm from "./product-variant-form";

interface Params {
  slug: string;
}

export default async function Page({ params }: Readonly<{ params: Params }>) {
  const slug = params.slug;

  return (
    <ProductVariantForm productId={slug} productName=""/>
  )
}


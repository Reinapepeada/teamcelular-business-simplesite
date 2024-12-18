'use server';
import ProductVariantForm from "./product-variant-form";

interface Params {
  slug: string;
}

interface PageProps {
  params: Params;
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  return (
    <ProductVariantForm productId={slug} productName=""/>
  )
}


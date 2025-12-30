import ProductVariantForm from "./product-variant-form";
import { getProductById } from "@/services/products";

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug;
  let productName = "";

  try {
    const product = await getProductById(Number(slug));
    productName = product?.name || "";
  } catch (error) {
    console.error("Error fetching product name:", error);
  }

  return (
    <ProductVariantForm productId={slug} productName={productName} />
  )
}


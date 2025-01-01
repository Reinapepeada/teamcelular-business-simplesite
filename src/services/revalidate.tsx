'use server'
import { revalidatePath } from "next/cache";

export async function revalidatePathCreateProducts() {
  revalidatePath("/admin/create-products");
}
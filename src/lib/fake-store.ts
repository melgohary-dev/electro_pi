import { fakeStoreClient } from "./api-client";
import type { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await fakeStoreClient.get<Product[]>("/products");
  return data;
}

export async function fetchProduct(id: string): Promise<Product> {
  const { data } = await fakeStoreClient.get<Product>(`/products/${id}`);
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  const { data } = await fakeStoreClient.get<string[]>("/products/categories");
  return data;
}

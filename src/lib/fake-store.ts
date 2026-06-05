import { fakeStoreClient } from "./api-client";
import type { Product } from "@/types/product";

/**
 * Maps raw API product to our internal Product type.
 * Converts numeric IDs to strings and sets the image URL.
 */
function mapProduct(p: Product): Product {
  return {
    ...p,
    id: String(p.id),
  };
}

/** Fetches all products from the Fake Store API. */
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await fakeStoreClient.get<Product[]>("/products");
  return data.map(mapProduct);
}

/** Fetches a single product by ID from the Fake Store API. */
export async function fetchProduct(id: string): Promise<Product> {
  const { data } = await fakeStoreClient.get<Product>(`/products/${id}`);
  return mapProduct(data);
}

/** Fetches available product categories from the Fake Store API. */
export async function fetchCategories(): Promise<string[]> {
  const { data } = await fakeStoreClient.get<string[]>("/products/categories");
  return data;
}

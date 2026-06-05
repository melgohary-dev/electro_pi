import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/fake-store";
import { PRODUCTS_PER_PAGE } from "@/config/constants";

/**
 * Fetches products with optional category filter and search query.
 * Uses infinite query for cursor-based pagination.
 */
export function useProducts(category?: string, search?: string) {
  return useInfiniteQuery({
    queryKey: ["products", category, search],
    queryFn: async ({ pageParam = 1 }) => {
      const all = await fetchProducts();
      let filtered = all;

      if (category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase(),
        );
      }

      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
      }

      const start = (pageParam - 1) * PRODUCTS_PER_PAGE;
      const page = filtered.slice(start, start + PRODUCTS_PER_PAGE);

      return {
        data: page,
        nextPage: start + PRODUCTS_PER_PAGE < filtered.length ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

export type ProductsQuery = ReturnType<typeof useProducts>;

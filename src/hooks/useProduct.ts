import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { fetchProduct } from "@/lib/fake-store";

export function useProduct(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: () => {
      const products = queryClient.getQueryData<{
        pages: { data: Product[] }[];
      }>(["products"]);

      if (!products) return undefined;

      for (const page of products.pages) {
        const found = page.data.find((p) => p.id === id);
        if (found) return found;
      }

      return undefined;
    },
  });
}

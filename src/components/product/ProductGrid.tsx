"use client";

import { useState } from "react";
import { Typography } from "antd";
import { useTranslations } from "next-intl";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductCard } from "./ProductCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { InfiniteScrollObserver } from "@/components/ui/InfiniteScrollObserver";
import { ErrorFallback } from "@/components/ui/ErrorFallback";

const { Title } = Typography;

export function ProductGrid() {
  const t = useTranslations("product");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useDebounce("", 400);
  const [category, setCategory] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useProducts(category, debouncedSearch || undefined);

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>{t("title")}</Title>

      <div className="mb-8 flex flex-col gap-4">
        <SearchBar
          value={searchInput}
          onChange={(val) => {
            setSearchInput(val);
            setDebouncedSearch(val);
          }}
        />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      )}

      {isError && (
        <ErrorFallback message={error?.message ?? t("error")} onRetry={() => refetch()} />
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="py-20 text-center text-gray-500">{t("noProducts")}</div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <InfiniteScrollObserver
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { Typography, Flex, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useTranslation } from "@/i18n/LanguageContext";
import { SearchBar } from "@/components/filters/SearchBar";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ErrorFallback } from "@/components/common/ErrorFallback";

const { Title, Text } = Typography;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useDebounce("", 400);
  const [category, setCategory] = useState("");
  const { t } = useTranslation();

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

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  return (
    <Flex vertical gap={24}>
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        <Title level={1} className="home-page-title">
          {t("home.title")}
        </Title>
        <SearchBar
          value={searchInput}
          onChange={(val) => {
            setSearchInput(val);
            setDebouncedSearch(val);
          }}
        />
      </Flex>

      <CategoryFilter value={category} onChange={setCategory} />

      {debouncedSearch && (
        <Text type="secondary">
          {t("home.resultsFor", { count: products.length, query: debouncedSearch })}
        </Text>
      )}

      {isLoading && <ProductGrid products={[]} isLoadingMore skeletonCount={8} />}

      {isError && (
        <ErrorFallback
          message={error?.message ?? t("error.failedToLoadProducts")}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && products.length === 0 && (
        <Empty
          image={<SearchOutlined className="empty-icon" />}
          description={t("home.noProducts")}
          className="empty-container"
        />
      )}

      {!isLoading && !isError && products.length > 0 && (
        <>
          <ProductGrid products={products} isLoadingMore={isFetchingNextPage} />
          <div ref={sentinelRef} className="sentinel" />
        </>
      )}
    </Flex>
  );
}

"use client";

import { Flex, Skeleton } from "antd";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function Loading() {
  return (
    <Flex vertical gap={24}>
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        <Skeleton.Input active size="large" className="loading-skeleton-title" />
        <Skeleton.Input active size="large" className="loading-skeleton-search" />
      </Flex>
      <Skeleton.Button
        active
        size="small"
        shape="round"
        className="loading-skeleton-tag"
      />
      <ProductGrid products={[]} isLoadingMore skeletonCount={8} />
    </Flex>
  );
}

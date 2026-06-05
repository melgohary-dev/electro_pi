"use client";

import { Row, Col } from "antd";
import type { Product } from "@/types/product";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoadingMore?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({
  products,
  isLoadingMore = false,
  skeletonCount = 4,
}: ProductGridProps) {
  return (
    <Row gutter={[16, 24]}>
      {products.map((product, i) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <ProductCard product={product} isFirst={i === 0} />
        </Col>
      ))}
      {isLoadingMore &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <Col key={`skeleton-${i}`} xs={24} sm={12} md={8} lg={6}>
            <ProductCardSkeleton />
          </Col>
        ))}
    </Row>
  );
}

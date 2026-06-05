"use client";

import { memo, useState } from "react";
import { Card, Typography, Tag, Rate, Flex, Skeleton } from "antd";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeContext";
import type { Product } from "@/types/product";

const { Text } = Typography;

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.substring(0, 2), 16);
  const g = Number.parseInt(h.substring(2, 4), 16);
  const b = Number.parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function PlaceholderSVG() {
  const { primaryColor } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="400"
      viewBox="0 0 400 400"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="400" fill={hexToRgba(primaryColor, 0.1)} />
      <g
        transform="translate(200,200)"
        fill="none"
        stroke={primaryColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-80,-60 L80,-60 L100,20 L-100,20 Z" />
        <path d="M-100,20 L-80,120 L80,120 L100,20" />
        <line x1="-80" y1="-60" x2="-80" y2="20" />
        <line x1="80" y1="-60" x2="80" y2="20" />
        <line x1="-40" y1="-20" x2="40" y2="-20" />
      </g>
    </svg>
  );
}

interface ProductCardProps {
  product: Product;
  isFirst?: boolean;
}

export const ProductCard = memo(function ProductCard({
  product,
  isFirst,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/product/${product.id}`} className="product-card-link">
      <Card
        hoverable
        variant="outlined"
        rootClassName="product-card"
        styles={{ body: { padding: 16 } }}
        cover={
          <div className="product-card-cover">
            {imgError ? (
              <PlaceholderSVG />
            ) : (
              <img
                src={product.image}
                alt={product.title}
                className="product-card-image"
                loading={isFirst ? "eager" : "lazy"}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        }
      >
        <Flex vertical gap={8}>
          <Tag className="product-card-tag">{product.category}</Tag>
          <Text ellipsis={{ tooltip: product.title }} className="product-card-title">
            {product.title}
          </Text>
          {product.rating && (
            <Flex align="center" gap={6}>
              <Rate
                disabled
                value={Math.round(product.rating.rate)}
                className="product-card-rate"
              />
              <Text type="secondary" className="product-card-rating-text">
                ({product.rating.count})
              </Text>
            </Flex>
          )}
          <Text strong className="product-card-price">
            ${product.price.toFixed(2)}
          </Text>
        </Flex>
      </Card>
    </Link>
  );
});

export function ProductCardSkeleton() {
  return (
    <Card
      rootClassName="product-card-skeleton"
      styles={{ body: { padding: 16 } }}
      cover={<div className="product-card-cover product-card-skeleton-cover" />}
    >
      <Flex vertical gap={10}>
        <Skeleton.Button
          active
          size="small"
          shape="round"
          style={{ width: 64, height: 22 }}
        />
        <Skeleton.Input active size="small" style={{ width: "100%", height: 14 }} />
        <Skeleton.Input active size="small" style={{ width: "70%", height: 14 }} />
        <Flex align="center" gap={4}>
          {Array.from({ length: 2 }).map((_, j) => (
            <Skeleton.Button
              key={j}
              active
              shape="square"
              size="small"
              style={{ width: "20%", height: 14 }}
            />
          ))}
          <Skeleton.Input active size="small" style={{ width: "30%", height: 12 }} />
        </Flex>
        <Skeleton.Input active size="small" style={{ width: 80, height: 20 }} />
      </Flex>
    </Card>
  );
}

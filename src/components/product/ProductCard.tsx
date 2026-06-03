"use client";

import { memo } from "react";
import { Card, Typography, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block h-full no-underline">
      <Card
        hoverable
        className="flex h-full flex-col"
        styles={{
          body: { flex: 1, display: "flex", flexDirection: "column" },
        }}
      >
        <div className="relative mb-4 aspect-square w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <Text
            ellipsis
            className="mb-2"
            style={{ maxHeight: "2.4em", lineHeight: "1.2em" }}
          >
            {product.title}
          </Text>
          <div className="mt-auto flex items-center justify-between">
            <Title level={4} className="m-0 text-green-600">
              ${product.price.toFixed(2)}
            </Title>
            <Tag>{product.category}</Tag>
          </div>
        </div>
      </Card>
    </Link>
  );
});

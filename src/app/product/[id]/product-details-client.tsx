"use client";

import { Typography, Tag, Divider, Button, Rate } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useProduct } from "@/hooks/useProduct";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { useAppSelector } from "@/hooks/useAppStore";

const { Title, Text, Paragraph } = Typography;

interface ProductDetailsClientProps {
  id: string;
}

export function ProductDetailsClient({ id }: ProductDetailsClientProps) {
  const t = useTranslations("product");
  const { data: product, isLoading, isError, refetch } = useProduct(id);
  const locale = useAppSelector((s) => s.app.locale);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !product) {
    return <ErrorFallback message={t("error")} onRetry={() => refetch()} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 no-underline">
        <Button type="link" icon={<ArrowLeftOutlined />} className="p-0">
          {locale === "ar" ? "العودة للمنتجات" : "Back to products"}
        </Button>
      </Link>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square w-full rounded-lg border bg-white p-8">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="w-full space-y-6 md:w-1/2">
          <div>
            <Tag color="blue" className="mb-2">
              {product.category}
            </Tag>
            <Title level={2}>{product.title}</Title>
          </div>

          <div className="flex items-center gap-4">
            <Title level={2} className="m-0 text-green-600">
              ${product.price.toFixed(2)}
            </Title>
            {product.rating && (
              <div className="flex items-center gap-2">
                <Rate disabled value={Math.round(product.rating.rate)} />
                <Text type="secondary">({product.rating.count} reviews)</Text>
              </div>
            )}
          </div>

          <Divider />

          <div>
            <Text strong>{t("description")}</Text>
            <Paragraph className="mt-2 text-gray-600 dark:text-gray-400">
              {product.description}
            </Paragraph>
          </div>

          <Button type="primary" size="large" icon={<ShoppingCartOutlined />} block>
            {locale === "ar" ? "أضف إلى السلة" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}

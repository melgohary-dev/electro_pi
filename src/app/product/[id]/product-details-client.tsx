"use client";

import {
  Typography,
  Tag,
  Divider,
  Button,
  Rate,
  Row,
  Col,
  Flex,
  Breadcrumb,
  Skeleton,
  Space,
  Image,
  App,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useProduct } from "@/hooks/useProduct";
import { ErrorFallback } from "@/components/common/ErrorFallback";
import { useTranslation } from "@/i18n/LanguageContext";

const { Title, Text, Paragraph } = Typography;

function ProductDetailSkeleton() {
  return (
    <Flex vertical gap={24}>
      <Skeleton.Input active size="small" style={{ width: 240, height: 22 }} />
      <Row gutter={[32, 24]}>
        <Col xs={24} md={10}>
          <div className="product-detail-skeleton-cover" />
        </Col>
        <Col xs={24} md={14}>
          <Flex vertical gap={24}>
            <Flex vertical gap={12}>
              <Skeleton.Button
                active
                size="small"
                shape="round"
                style={{ width: 80, height: 24 }}
              />
              <Skeleton.Input active size="small" style={{ width: "80%", height: 24 }} />
            </Flex>
            <Flex align="center" gap={16}>
              <Skeleton.Input active size="small" style={{ width: 120, height: 30 }} />
              <Flex align="center" gap={6}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton.Button
                    key={j}
                    active
                    shape="square"
                    size="small"
                    style={{ width: 20, height: 20 }}
                  />
                ))}
                <Skeleton.Input active size="small" style={{ width: 60, height: 14 }} />
              </Flex>
            </Flex>
            <Divider />
            <Flex vertical gap={8}>
              <Skeleton.Input active size="small" style={{ width: "100%", height: 14 }} />
              <Skeleton.Input active size="small" style={{ width: "100%", height: 14 }} />
              <Skeleton.Input active size="small" style={{ width: "60%", height: 14 }} />
            </Flex>
            <Skeleton.Button active block size="large" style={{ height: 48 }} />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}

interface ProductDetailsClientProps {
  id: string;
}

export function ProductDetailsClient({ id }: ProductDetailsClientProps) {
  const { data: product, isLoading, isError, refetch } = useProduct(id);
  const { t } = useTranslation();
  const { message } = App.useApp();

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <ErrorFallback message={t("error.failedToLoadProduct")} onRetry={() => refetch()} />
    );
  }

  return (
    <Flex vertical gap={24}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t("product.breadcrumbHome")}</Link> },
          { title: <Link href="/">{t("product.breadcrumbProducts")}</Link> },
          { title: <Text>{product.title}</Text> },
        ]}
      />

      <Row gutter={[32, 24]}>
        <Col xs={24} md={10} className="product-detail-image-col">
          <Image
            src={product.image}
            alt={product.title}
            className="product-detail-image"
            preview={{ mask: null }}
          />
        </Col>

        <Col xs={24} md={14}>
          <Flex vertical gap={24}>
            <Space orientation="vertical" size={12}>
              <Tag color="orange">{product.category}</Tag>
              <Title level={2} className="product-detail-title">
                {product.title}
              </Title>
            </Space>

            <Flex align="center" gap={16} wrap="wrap">
              <Title level={2} className="product-detail-price">
                ${product.price.toFixed(2)}
              </Title>
              {product.rating && (
                <Flex align="center" gap={6}>
                  <Rate disabled value={Math.round(product.rating.rate)} />
                  <Text type="secondary">
                    {t("product.reviews", { count: product.rating.count })}
                  </Text>
                </Flex>
              )}
            </Flex>

            <Divider className="product-detail-divider" />

            <Space orientation="vertical" size={8}>
              <Text strong className="product-detail-desc-label">
                {t("product.description")}
              </Text>
              <Paragraph className="product-detail-desc">{product.description}</Paragraph>
            </Space>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              block
              className="product-detail-add-btn"
              onClick={() => message.success(t("product.addedToCart"))}
            >
              {t("product.addToCart")}
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}

"use client";

import { Card, Spin } from "antd";
import { useTranslations } from "next-intl";

export function LoadingSpinner({ text }: { text?: string }) {
  const t = useTranslations("product");
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-500">{text ?? t("loading")}</p>
      </Card>
    </div>
  );
}

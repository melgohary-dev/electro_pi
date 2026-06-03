"use client";

import { Alert, Button } from "antd";
import { useTranslations } from "next-intl";

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  const t = useTranslations("product");
  return (
    <div className="flex items-center justify-center py-20">
      <div className="max-w-md text-center">
        <Alert type="error" message={message ?? t("error")} showIcon className="mb-4" />
        {onRetry && (
          <Button type="primary" onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}

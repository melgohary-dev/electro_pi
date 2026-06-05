"use client";

import { Result, Button } from "antd";
import { useTranslation } from "@/i18n/LanguageContext";

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <Result
      status="error"
      title={t("error.somethingWentWrong")}
      subTitle={message}
      extra={
        onRetry ? (
          <Button type="primary" onClick={onRetry}>
            {t("error.tryAgain")}
          </Button>
        ) : undefined
      }
    />
  );
}

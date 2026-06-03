"use client";

import { ConfigProvider, theme, App as AntApp } from "antd";
import { useAppSelector } from "@/hooks/useAppStore";
import type { ReactNode } from "react";

export function AntdConfigProvider({ children }: { children: ReactNode }) {
  const locale = useAppSelector((s) => s.app.locale);
  const currentTheme = useAppSelector((s) => s.app.theme);

  return (
    <ConfigProvider
      direction={locale === "ar" ? "rtl" : "ltr"}
      theme={{
        algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}

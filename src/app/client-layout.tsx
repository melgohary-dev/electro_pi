"use client";

import { useEffect, type ReactNode } from "react";
import { ConfigProvider, theme, App as AntApp } from "antd";
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/useAppStore";
import { apiClient } from "@/lib/api-client";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { ThemeProvider, useTheme, ThemeMode } from "@/theme/ThemeContext";
import { PageLayout } from "@/components/layout/PageLayout";

function ThemedApp({ children }: { children: ReactNode }) {
  const { direction, locale } = useLanguage();
  const { mode, primaryColor } = useTheme();

  return (
    <ConfigProvider
      direction={direction}
      theme={{
        algorithm: mode === ThemeMode.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
          colorPrimaryHover: primaryColor,
          borderRadius: 8,
          fontFamily:
            locale === "ar"
              ? "var(--font-ar), 'Traditional Arabic', serif"
              : "var(--font-en), system-ui, -apple-system, sans-serif",
        },
        components: {
          Card: { paddingLG: 16, borderRadiusLG: 12 },
          Button: { borderRadius: 8, controlHeight: 40 },
          Input: { borderRadius: 8, controlHeight: 42 },
          Tag: { borderRadius: 6 },
        },
      }}
    >
      <AntApp>
        <PageLayout>{children}</PageLayout>
      </AntApp>
    </ConfigProvider>
  );
}

export function ClientLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    apiClient
      .get("/auth/me")
      .then((res) => dispatch(setUser(res.data.user)))
      .catch(() => dispatch(setUser(null)));
  }, [dispatch]);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <ThemedApp>{children}</ThemedApp>
      </ThemeProvider>
    </LanguageProvider>
  );
}

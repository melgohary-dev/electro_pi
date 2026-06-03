"use client";

import { useEffect, type ReactNode } from "react";
import { Layout } from "antd";
import { AppProvider } from "@/components/providers/AppProvider";
import { setLocale, setTheme } from "@/store/slices/appSlice";
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/useAppStore";
import { apiClient } from "@/lib/api-client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Locale, Theme } from "@/config/constants";

const { Content } = Layout;

function InitProvider({
  locale,
  theme,
  children,
}: {
  locale: Locale;
  theme: Theme;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocale(locale));
    dispatch(setTheme(theme));
  }, [locale, theme, dispatch]);

  useEffect(() => {
    apiClient
      .get("/auth/me")
      .then((res) => dispatch(setUser(res.data.user)))
      .catch(() => dispatch(setUser(null)));
  }, [dispatch]);

  return <>{children}</>;
}

export function ClientLayout({
  locale,
  theme,
  children,
}: {
  locale: Locale;
  theme: Theme;
  children: ReactNode;
}) {
  return (
    <AppProvider>
      <InitProvider locale={locale} theme={theme}>
        <Layout className="min-h-screen">
          <Navbar />
          <Content className="flex-1">{children}</Content>
          <Footer />
        </Layout>
      </InitProvider>
    </AppProvider>
  );
}

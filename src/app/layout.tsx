import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ClientLayout } from "./client-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-en",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-ar",
});

export const metadata: Metadata = {
  title: "Electro Pi Store",
  description: "Browse our latest products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoNaskhArabic.variable}`}>
      <body>
        <AntdRegistry>
          <ReduxProvider>
            <QueryProvider>
              <ClientLayout>{children}</ClientLayout>
            </QueryProvider>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

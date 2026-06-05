"use client";

import { Layout } from "antd";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const { Content } = Layout;

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className="page-layout">
      <Navbar />
      <Content className="page-content page-content-inner">{children}</Content>
      <Footer />
    </Layout>
  );
}

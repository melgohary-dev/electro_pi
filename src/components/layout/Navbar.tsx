"use client";

import { Layout, Button, Dropdown, Space } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppStore";
import { toggleTheme } from "@/store/slices/appSlice";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { usePathname } from "next/navigation";
import { useState } from "react";

const { Header } = Layout;

export function Navbar() {
  const t = useTranslations("nav");
  const { user } = useAppSelector((s) => s.auth);
  const { theme } = useAppSelector((s) => s.app);
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const { toggleLocale } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const userMenu = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("logout"),
      onClick: logout,
    },
  ];

  return (
    <Header className="flex items-center justify-between px-4 shadow-sm md:px-8">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold text-white no-underline">
          ElectroPi
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="/"
            className="text-white/80 no-underline transition-colors hover:text-white"
          >
            {t("products")}
          </Link>
        </nav>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Button
          type="text"
          icon={<GlobalOutlined />}
          onClick={toggleLocale}
          className="text-white"
        >
          {t("language")}
        </Button>
        <Button
          type="text"
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={() => dispatch(toggleTheme())}
          className="text-white"
        />
        {user ? (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <Button type="text" icon={<UserOutlined />} className="text-white">
              {user.name}
            </Button>
          </Dropdown>
        ) : (
          !isAuthPage && (
            <Space>
              <Link href="/login">
                <Button type="primary" ghost>
                  {t("login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button type="primary">{t("register")}</Button>
              </Link>
            </Space>
          )
        )}
      </div>

      <Button
        type="text"
        icon={<MenuOutlined />}
        className="text-white md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      />
    </Header>
  );
}

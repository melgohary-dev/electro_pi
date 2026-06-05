"use client";

import {
  Layout,
  Button,
  Dropdown,
  Space,
  Typography,
  Flex,
  Drawer,
  Skeleton,
  Popover,
  Tooltip,
} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppStore";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage, Locale } from "@/i18n/LanguageContext";
import { useTheme, ThemeMode, PRIMARY_COLORS } from "@/theme/ThemeContext";

const { Header } = Layout;
const { Text } = Typography;

export function Navbar() {
  const { user, isLoading } = useAppSelector((s) => s.auth);
  const { logout } = useAuth();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const { t, locale, setLocale } = useLanguage();
  const { mode, primaryColor, toggleMode, setPrimaryColor } = useTheme();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDark = mode === ThemeMode.DARK;

  const toggleLanguage = () => {
    setLocale(locale === Locale.EN ? Locale.AR : Locale.EN);
  };

  const userMenu = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("nav.logout"),
      onClick: logout,
    },
  ];

  const colorPicker = (
    <Flex gap={8}>
      {PRIMARY_COLORS.map((c) => (
        <div
          key={c.key}
          onClick={() => {
            setPrimaryColor(c.color);
            setColorOpen(false);
          }}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: c.color,
            cursor: "pointer",
            border: primaryColor === c.color ? "2px solid #fff" : "2px solid transparent",
            outline: primaryColor === c.color ? `2px solid ${c.color}` : "none",
            transition: "border 0.2s, outline 0.2s",
          }}
        />
      ))}
    </Flex>
  );

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: isDark ? "#141414" : "#fff",
        borderBottom: isDark ? "1px solid #303030" : "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Flex align="center" gap={24}>
        <Link href="/" className="nav-link">
          <Flex align="center" gap={8} className="header-actions">
            <ShoppingCartOutlined style={{ color: primaryColor, fontSize: 22 }} />
            <Text strong className="nav-brand-text">
              {t("brand")}
            </Text>
          </Flex>
        </Link>
        <Flex className="hide-mobile" align="center" gap={4}>
          <Link href="/" className="nav-link">
            <Button
              type="text"
              style={{
                color: pathname === "/" ? primaryColor : isDark ? "#a3a3a3" : "#64748b",
              }}
            >
              {t("nav.home")}
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Flex align="center" gap={8}>
        <Tooltip title={locale === Locale.EN ? "English" : "العربية"}>
          <Button
            type="text"
            onClick={toggleLanguage}
            className="show-mobile nav-lang-btn-header"
          >
            <Image
              src={locale === Locale.EN ? "/flags/us.svg" : "/flags/sa.svg"}
              alt={locale === Locale.EN ? "English" : "العربية"}
              width={28}
              height={28}
              className="nav-flag-header"
            />
          </Button>
        </Tooltip>

        <div className="hide-mobile">
          <Tooltip title={t("nav.theme")}>
            <Popover
              content={colorPicker}
              trigger="click"
              open={colorOpen}
              onOpenChange={setColorOpen}
              arrow={false}
            >
              <Button
                type="text"
                style={{
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: primaryColor,
                  border: isDark ? "2px solid #555" : "2px solid #e5e7eb",
                  padding: 0,
                }}
              />
            </Popover>
          </Tooltip>
        </div>

        <div className="hide-mobile">
          <Tooltip title={isDark ? t("nav.lightMode") : t("nav.darkMode")}>
            <Button type="text" onClick={toggleMode} style={{ minWidth: 40 }}>
              {isDark ? <SunOutlined /> : <MoonOutlined />}
            </Button>
          </Tooltip>
        </div>

        <Flex className="hide-mobile" align="center" gap={8}>
          {isLoading ? (
            <Skeleton.Button
              className="header-auth-skeleton"
              active
              size="small"
              style={{ width: 80, height: 36 }}
            />
          ) : user ? (
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />} style={{ height: 36 }}>
                {user.name}
              </Button>
            </Dropdown>
          ) : (
            !isAuthPage && (
              <Space size="small">
                <Link href="/login" className="nav-link">
                  <Button style={{ height: 36 }}>{t("nav.login")}</Button>
                </Link>
                <Link href="/register" className="nav-link">
                  <Button type="primary" style={{ height: 36 }}>
                    {t("nav.register")}
                  </Button>
                </Link>
              </Space>
            )
          )}
        </Flex>

        <Button
          type="text"
          icon={<MenuOutlined />}
          className="show-mobile"
          onClick={() => setDrawerOpen(true)}
        />

        <Drawer
          title={null}
          placement={locale === Locale.AR ? "left" : "right"}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          size="default"
          styles={{ body: { padding: 16 } }}
        >
          <Flex vertical style={{ height: "100%" }}>
            <Flex vertical gap={24} style={{ flex: 1 }}>
              <Flex vertical gap={4}>
                <Text type="secondary" className="nav-section-label">
                  {t("nav.navigation")}
                </Text>
                <Link href="/" className="nav-link" onClick={() => setDrawerOpen(false)}>
                  <Button type="text" block style={{ textAlign: "inherit" }}>
                    {t("nav.home")}
                  </Button>
                </Link>
              </Flex>
              <Flex vertical gap={8}>
                <Text type="secondary" className="nav-section-label">
                  {t("nav.theme")}
                </Text>
                <Flex gap={8}>
                  {PRIMARY_COLORS.map((c) => (
                    <div
                      key={c.key}
                      onClick={() => setPrimaryColor(c.color)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: c.color,
                        cursor: "pointer",
                        border:
                          primaryColor === c.color
                            ? "2px solid #fff"
                            : "2px solid transparent",
                        outline:
                          primaryColor === c.color ? `2px solid ${c.color}` : "none",
                        transition: "border 0.2s, outline 0.2s",
                      }}
                    />
                  ))}
                </Flex>
                <div className="drawer-divider" />
                <Flex
                  align="center"
                  gap={8}
                  onClick={toggleMode}
                  className="drawer-mode-toggle"
                >
                  {isDark ? (
                    <MoonOutlined className="drawer-text" />
                  ) : (
                    <SunOutlined className="drawer-text" />
                  )}
                  <Text className="drawer-text">
                    {isDark ? t("nav.darkMode") : t("nav.lightMode")}
                  </Text>
                </Flex>
              </Flex>
              <Flex vertical gap={8}>
                <Text type="secondary" className="nav-section-label">
                  {t("nav.language")}
                </Text>
                <Button
                  type="text"
                  onClick={toggleLanguage}
                  className="nav-lang-btn-drawer"
                >
                  <Image
                    src={locale === Locale.EN ? "/flags/us.svg" : "/flags/sa.svg"}
                    alt={locale === Locale.EN ? "English" : "العربية"}
                    width={38}
                    height={38}
                    className="nav-flag-drawer"
                  />
                </Button>
              </Flex>
            </Flex>
            <Flex vertical gap={8}>
              <Text type="secondary" className="nav-section-label">
                {t("nav.account")}
              </Text>
              {isLoading ? (
                <Skeleton.Button active block style={{ height: 32 }} />
              ) : !user && !isAuthPage ? (
                <Flex gap={8}>
                  <Link
                    href="/login"
                    className="nav-link"
                    style={{ flex: 1 }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Button block>{t("nav.login")}</Button>
                  </Link>
                  <Link
                    href="/register"
                    className="nav-link"
                    style={{ flex: 1 }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Button type="primary" block>
                      {t("nav.register")}
                    </Button>
                  </Link>
                </Flex>
              ) : user ? (
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  block
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  style={{ textAlign: "inherit" }}
                >
                  {t("nav.logout")}
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </Drawer>
      </Flex>
    </Header>
  );
}

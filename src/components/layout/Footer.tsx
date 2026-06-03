"use client";

import { Layout, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <AntFooter className="mt-auto text-center">
      <Text type="secondary">
        &copy; {year} ElectroPi. {t("rights")}
      </Text>
    </AntFooter>
  );
}

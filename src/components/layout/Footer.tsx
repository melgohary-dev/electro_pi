"use client";

import { Typography, Layout, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/LanguageContext";
import { useTheme } from "@/theme/ThemeContext";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export function Footer() {
  const { t } = useTranslation();
  const { primaryColor } = useTheme();
  const year = new Date().getFullYear();

  return (
    <AntFooter className="footer">
      <Flex align="center" justify="center" gap={8}>
        <ShoppingCartOutlined style={{ color: primaryColor, fontSize: 16 }} />
        <Text type="secondary">{t("footer.copyright", { year })}</Text>
      </Flex>
    </AntFooter>
  );
}

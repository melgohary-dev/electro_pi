"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/LanguageContext";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <Input
      placeholder={t("home.searchPlaceholder")}
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      size="large"
      className="search-bar"
    />
  );
}

"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { Search } = Input;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const t = useTranslations("product");

  return (
    <Search
      placeholder={t("searchPlaceholder")}
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      className="w-full md:w-72"
      size="large"
    />
  );
}

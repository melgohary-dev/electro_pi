"use client";

import { Tag, Flex } from "antd";
import {
  LaptopOutlined,
  GiftOutlined,
  ManOutlined,
  WomanOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/fake-store";
import { useTranslation } from "@/i18n/LanguageContext";
import { useTheme } from "@/theme/ThemeContext";
import type React from "react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  electronics: <LaptopOutlined />,
  jewelery: <GiftOutlined />,
  "men's clothing": <ManOutlined />,
  "women's clothing": <WomanOutlined />,
};

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });
  const { t } = useTranslation();
  const { primaryColor } = useTheme();
  const isAll = !value;

  return (
    <Flex wrap="wrap" gap={10}>
      <Tag
        color={isAll ? primaryColor : "default"}
        className={`category-tag ${isAll ? "category-tag-selected" : "category-tag-default"}`}
        onClick={() => onChange("")}
        icon={<AppstoreOutlined />}
      >
        {t("home.allCategories")}
      </Tag>
      {categories?.map((cat) => {
        const isSelected = value === cat;
        const icon = CATEGORY_ICONS[cat];
        return (
          <Tag
            key={cat}
            color={isSelected ? primaryColor : "default"}
            className={`category-tag ${isSelected ? "category-tag-selected" : "category-tag-default"} ${!value || isSelected ? "" : "category-tag-dimmed"}`}
            onClick={() => onChange(isSelected ? "" : cat)}
            icon={icon}
          >
            {cat}
          </Tag>
        );
      })}
    </Flex>
  );
}

"use client";

import { Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/fake-store";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const t = useTranslations("product");
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Tag
        color={!value ? "blue" : "default"}
        className="cursor-pointer px-3 py-1"
        onClick={() => onChange("")}
      >
        {t("allCategories")}
      </Tag>
      {categories?.map((cat) => (
        <Tag
          key={cat}
          color={value === cat ? "blue" : "default"}
          className="cursor-pointer px-3 py-1"
          onClick={() => onChange(value === cat ? "" : cat)}
        >
          {cat}
        </Tag>
      ))}
    </div>
  );
}

"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useAppStore";
import { setLocale } from "@/store/slices/appSlice";
import type { Locale } from "@/config/constants";

export function useLocale() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((s) => s.app.locale);

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === "en" ? "ar" : "en";
    document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    dispatch(setLocale(next));
    window.location.reload();
  }, [locale, dispatch]);

  return { locale, toggleLocale };
}

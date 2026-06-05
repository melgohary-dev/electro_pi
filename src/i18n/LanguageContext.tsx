"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { en } from "./en";
import { ar } from "./ar";

export enum Locale {
  EN = "en",
  AR = "ar",
}

type TranslationRecord = Record<
  string,
  string | Record<string, string | Record<string, string>>
>;

const translations: Record<Locale, TranslationRecord> = {
  [Locale.EN]: en as unknown as TranslationRecord,
  [Locale.AR]: ar as unknown as TranslationRecord,
};

interface LanguageContextValue {
  locale: Locale;
  direction: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: TranslationRecord, path: string[]): string | undefined {
  let current: unknown = obj;
  for (const key of path) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return Locale.EN;
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/);
  const val = match?.[1];
  if (val === "ar") return Locale.AR;
  return Locale.EN;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const parts = key.split(".");
      let value = getNestedValue(translations[locale], parts);
      if (!value) {
        value = getNestedValue(translations[Locale.EN], parts);
      }
      if (!value) return key;
      if (params) {
        return Object.entries(params).reduce((acc, [k, v]) => {
          return acc.replace(`{${k}}`, String(v));
        }, value);
      }
      return value;
    },
    [locale],
  );

  const direction = locale === Locale.AR ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ locale, direction, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}

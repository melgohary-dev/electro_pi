import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import type { Locale } from "@/config/constants";

const locales: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("../messages/en.json").then((m) => m.default),
  ar: () => import("../messages/ar.json").then((m) => m.default),
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "en") as Locale;

  if (!locales[locale]) {
    return { locale: "en", messages: await locales.en() };
  }

  return {
    locale,
    messages: await locales[locale](),
  };
});

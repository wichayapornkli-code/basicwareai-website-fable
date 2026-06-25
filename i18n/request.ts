import { getRequestConfig } from "next-intl/server";
import { isAppLocale, mergeWithEnglishFallback } from "@/lib/locale";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !isAppLocale(locale)) {
    locale = routing.defaultLocale;
  }

  const englishMessages = (await import("../messages/en.json")).default;
  const localeMessages =
    locale === "en"
      ? englishMessages
      : (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages:
      locale === "en"
        ? englishMessages
        : mergeWithEnglishFallback(englishMessages, localeMessages),
  };
});

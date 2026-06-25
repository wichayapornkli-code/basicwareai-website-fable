export const APP_LOCALES = ["en", "zh", "zh-tw"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];
export type ContentLocaleKey = "en" | "zh" | "zhTw";

export function isAppLocale(locale: string): locale is AppLocale {
  return APP_LOCALES.includes(locale as AppLocale);
}

export function isChineseLocale(locale: string): boolean {
  return locale === "zh" || locale === "zh-tw";
}

export function isTraditionalChineseLocale(locale: string): boolean {
  return locale === "zh-tw";
}

export function getContentLocaleKey(locale: string): ContentLocaleKey {
  if (locale === "zh-tw") return "zhTw";
  if (locale === "zh") return "zh";
  return "en";
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeWithEnglishFallback<T>(english: T, localized?: unknown): T {
  if (localized === undefined || localized === null || localized === "") {
    return english;
  }

  if (Array.isArray(english)) {
    if (!Array.isArray(localized)) {
      return english;
    }

    return english.map((englishItem, index) =>
      mergeWithEnglishFallback(englishItem, localized[index])
    ) as T;
  }

  if (isPlainObject(english)) {
    if (!isPlainObject(localized)) {
      return english;
    }

    const mergedEntries = Object.keys(english).map((key) => [
      key,
      mergeWithEnglishFallback(
        (english as Record<string, unknown>)[key],
        localized[key]
      ),
    ]);

    return Object.fromEntries(mergedEntries) as T;
  }

  return localized as T;
}

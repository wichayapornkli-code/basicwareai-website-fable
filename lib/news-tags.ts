import type { NewsArticle } from "@/lib/news";

export function filterNewsByTag(articles: NewsArticle[], tag?: string | null) {
  if (!tag) return articles;
  return articles.filter((article) => article.tags.includes(tag));
}

export function encodeNewsTag(tag: string) {
  return encodeURIComponent(tag);
}

export function decodeNewsTag(param: string | null) {
  if (!param) return null;
  try {
    return decodeURIComponent(param);
  } catch {
    return null;
  }
}

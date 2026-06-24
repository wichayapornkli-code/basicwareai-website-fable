export type NewsArticleDetail = "3hk-alibaba-basicware-alliance";

export type NewsArticle = {
  slug: string;
  publishedAt: string;
  /** When set, used as the listing thumbnail and detail page cover image. */
  coverSrc?: string;
  tags: string[];
  en: { title: string; detailTitle?: string };
  zh: { title: string; detailTitle?: string };
  detail: NewsArticleDetail;
};

export const PAGE_SIZE = 10;
export const HOME_NEWS_MAX = 3;

export function getHomeNewsArticles(): NewsArticle[] {
  return NEWS_ARTICLES.slice(0, HOME_NEWS_MAX);
}

/**
 * To add an article with a custom image, set `coverSrc` — it is used for both
 * the listing thumbnail and the detail page cover. Omit it to use the default
 * blue logo thumbnail and blue headline banner on the detail page.
 */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "3hk-alibaba-basicware-alliance",
    publishedAt: "2026-06-17",
    tags: ["3HK / 3SUPREME", "Alibaba Cloud", "Basicware AI"],
    en: {
      title:
        "Hutchison Telecom and Basicware AI Form Strategic Alliance with Alibaba Cloud",
    },
    zh: {
      title: "和記電訊與Basicware AI攜手阿里雲達成戰略聯盟",
      detailTitle:
        "和記電訊香港與Basicware AI達成戰略性聯盟\n攜手阿里雲　引領全港電訊業踏入AI Token新紀元",
    },
    detail: "3hk-alibaba-basicware-alliance",
  },
];

import { filterNewsByTag } from "@/lib/news-tags";

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function paginateNews(page: number, pageSize = PAGE_SIZE, tag?: string | null) {
  return paginateNewsArticles(NEWS_ARTICLES, page, pageSize, tag);
}

export function paginateNewsArticles(
  articles: NewsArticle[],
  page: number,
  pageSize = PAGE_SIZE,
  tag?: string | null,
) {
  const filtered = filterNewsByTag(articles, tag);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    articles: filtered.slice(start, start + pageSize),
    totalPages,
    currentPage,
    totalCount: filtered.length,
    activeTag: tag ?? null,
  };
}

export function formatNewsDate(isoDate: string, locale: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-HK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

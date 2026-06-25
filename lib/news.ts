import { mergeWithEnglishFallback } from "@/lib/locale";

export type NewsArticleDetail = "3hk-alibaba-basicware-alliance";

export type NewsArticle = {
  slug: string;
  publishedAt: string;
  /** When set, used only as the listing thumbnail image. */
  thumbnailSrc?: string;
  /** When set, used as the detail page cover image. */
  coverSrc?: string;
  tags: string[];
  en: { title: string; detailTitle?: string; description?: string };
  zh: { title: string; detailTitle?: string; description?: string };
  zhTw: { title: string; detailTitle?: string; description?: string };
  detail: NewsArticleDetail;
};

export const PAGE_SIZE = 10;
export const HOME_NEWS_MAX = 3;

export function getHomeNewsArticles(): NewsArticle[] {
  return NEWS_ARTICLES.slice(0, HOME_NEWS_MAX);
}

/**
 * To add an article thumbnail only, set `thumbnailSrc`.
 * To add a custom detail-page hero image, set `coverSrc`.
 * Omit both to use the default logo thumbnail and blue detail cover image.
 * Set `description` on en/zh for the listing card excerpt under the title.
 */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "3hk-alibaba-basicware-alliance",
    publishedAt: "2026-06-17",
    thumbnailSrc: "/assets/news-hthk-inmo-go3-thumbnail.png",
    tags: ["3HK / 3SUPREME", "Basicware AI", "BasicRouter"],
    en: {
      title: "HTHK Expands Customers' AI Lifestyles with INMO GO3 AI Glasses Launch",
      detailTitle:
        "HTHK expands customers' AI lifestyles with INMO GO3 AI glasses launch\nDrives AI adoption through start-up collaboration, showcasing \"3 for You\" brand value",
      description:
        "HTHK unveils INMO GO3 AI glasses, an AI Travel Planner, and partners with Basicware AI to offer complimentary AI Tokens via BasicRouter for new and renewing subscribers.",
    },
    zh: {
      title: "和记电讯香港开拓 AI 生活圈　率先推出崭新 INMO GO3 AI 眼镜",
      detailTitle:
        "和记电讯香港开拓 AI 生活圈\n率先推出崭新 INMO GO3 AI 眼镜",
      description:
        "HTHK 推出 INMO GO3 AI 眼镜与 AI Travel Planner，并携手 Basicware AI 通过 BasicRouter 向新签及续约客户赠送 AI Tokens。",
    },
    zhTw: {
      title: "和記電訊香港開拓 AI 生活圈　率先推出嶄新 INMO GO3 AI 眼鏡",
      detailTitle:
        "和記電訊香港開拓 AI 生活圈\n率先推出嶄新 INMO GO3 AI 眼鏡",
      description:
        "HTHK 推出 INMO GO3 AI 眼鏡與 AI Travel Planner，並攜手 Basicware AI 透過 BasicRouter 向新簽及續約客戶贈送 AI Tokens。",
    },
    detail: "3hk-alibaba-basicware-alliance",
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function paginateNews(page: number, pageSize = PAGE_SIZE) {
  return paginateNewsArticles(NEWS_ARTICLES, page, pageSize);
}

export function paginateNewsArticles(
  articles: NewsArticle[],
  page: number,
  pageSize = PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    articles: articles.slice(start, start + pageSize),
    totalPages,
    currentPage,
    totalCount: articles.length,
  };
}

function getNewsLocaleCopy(article: NewsArticle, locale: string) {
  if (locale === "zh") return mergeWithEnglishFallback(article.en, article.zh);
  if (locale === "zh-tw") return mergeWithEnglishFallback(article.en, article.zhTw);
  return article.en;
}

/** Full headline on the detail cover (may include line breaks). */
export function getNewsArticleCoverTitle(article: NewsArticle, locale: string): string {
  const copy = getNewsLocaleCopy(article, locale);
  return copy.detailTitle ?? copy.title;
}

/** Primary headline line for breadcrumbs and metadata. */
export function getNewsArticleBreadcrumbLabel(article: NewsArticle, locale: string): string {
  return getNewsArticleCoverTitle(article, locale).split("\n")[0].trim();
}

/** Headline and optional subhead for the detail cover hero. */
export function getNewsArticleCoverHeadlines(
  article: NewsArticle,
  locale: string,
): { headline: string; subhead?: string } {
  const raw = getNewsArticleCoverTitle(article, locale);
  const [headline, ...rest] = raw.split("\n");
  const subhead = rest.join("\n").trim();
  return subhead ? { headline: headline.trim(), subhead } : { headline: headline.trim() };
}

export function formatNewsDate(isoDate: string, locale: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const dateLocale =
    locale === "zh" ? "zh-CN" : locale === "zh-tw" ? "zh-HK" : "en-GB";
  return new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

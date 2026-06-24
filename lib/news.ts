export type NewsArticleDetail = "3hk-alibaba-basicware-alliance";

export type NewsArticle = {
  slug: string;
  publishedAt: string;
  /** When set, used as the listing thumbnail and detail page cover image. */
  coverSrc?: string;
  tags: string[];
  en: { title: string; detailTitle?: string; description?: string };
  zh: { title: string; detailTitle?: string; description?: string };
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
 * logo thumbnail and gradient cover image on the detail page.
 * Set `description` on en/zh for the listing card excerpt under the title.
 */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "3hk-alibaba-basicware-alliance",
    publishedAt: "2026-06-17",
    tags: ["3HK / 3SUPREME", "Basicware AI", "BasicRouter"],
    en: {
      title: "HTHK Expands Customers' AI Lifestyles with INMO GO3 AI Glasses Launch",
      detailTitle:
        "HTHK expands customers' AI lifestyles with INMO GO3 AI glasses launch\nDrives AI adoption through start-up collaboration, showcasing \"3 for You\" brand value",
      description:
        "HTHK unveils INMO GO3 AI glasses, an AI Travel Planner, and partners with Basicware AI to offer complimentary AI Tokens via BasicRouter for new and renewing subscribers.",
    },
    zh: {
      title: "和記電訊香港開拓 AI 生活圈　率先推出嶄新 INMO GO3 AI 眼鏡",
      detailTitle:
        "和記電訊香港開拓 AI 生活圈\n率先推出嶄新 INMO GO3 AI 眼鏡",
      description:
        "HTHK unveils INMO GO3 AI glasses, an AI Travel Planner, and partners with Basicware AI to offer complimentary AI Tokens via BasicRouter for new and renewing subscribers.",
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
  return locale === "zh" ? article.zh : article.en;
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
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-HK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

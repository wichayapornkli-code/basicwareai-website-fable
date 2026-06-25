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
    tags: ["HTHK", "Basicware AI", "BasicRouter", "INMO GO3"],
    en: {
      title: "HUTCHTEL HK Partners with Basicware AI to Distribute 80B Tokens to Customers",
      detailTitle: "HUTCHTEL HK Partners with Basicware AI to Distribute 80B Tokens to Customers",
      description:
        "HTHK will partner with Basicware AI to roll out a large-model experience campaign, distributing 80 billion AI tokens to new subscribers and 5G contract renewal customers via BasicRouter.",
    },
    zh: {
      title: "和电香港(00215.HK)携手 Basicware AI 向客户送出共 800 亿 Token",
      detailTitle: "和电香港(00215.HK)携手 Basicware AI 向客户送出共 800 亿 Token",
      description:
        "和电香港宣布，为推动全民 AI 普及化，将推出一系列以 AI 为核心的创新产品及服务，携手 Basicware AI 向新上台及 5G 续约客户送出合共 800 亿个 AI 词元。",
    },
    zhTw: {
      title: "和電香港(00215.HK)夥Basicware AI向客戶送出共800億Token",
      detailTitle: "和電香港(00215.HK)夥Basicware AI向客戶送出共800億Token",
      description:
        "和電香港宣布，為推動全民 AI 普及化，將推出一系列以 AI 為核心的創新產品及服務，夥拍 Basicware AI 向新上台及 5G 續約客戶送出合共 800 億個 AI 詞元。",
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

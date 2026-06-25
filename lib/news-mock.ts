/**
 * DEV ONLY — remove this file, NewsMockToggle, and useNewsMock before deploy.
 */
import { HOME_NEWS_MAX, NEWS_ARTICLES, type NewsArticle } from "@/lib/news";

export const IS_NEWS_MOCK_DEV = process.env.NODE_ENV === "development";

/** 10 mocks + 1 real article → 11 total, 2 pages at PAGE_SIZE 10 */
export const NEWS_MOCK_COUNT = 10;

/** Figma-style placeholder copy — clearly not real headlines in dev listings. */
const MOCK_TITLE = { en: "Title text copy", zh: "标题文案" } as const;
const MOCK_DESCRIPTION = {
  en: "Description text copy",
  zh: "描述文案",
} as const;
const MOCK_TAGS = ["Tag text copy", "Label text copy", "Category text copy"];

const MOCK_COPY: Array<{
  slug: string;
  publishedAt: string;
}> = [
  {
    slug: "__mock-regional-expansion",
    publishedAt: "2026-05-28",
  },
  {
    slug: "__mock-ai-certification",
    publishedAt: "2026-05-14",
  },
  {
    slug: "__mock-cloud-partnership",
    publishedAt: "2026-04-30",
  },
  {
    slug: "__mock-hospitality-ai",
    publishedAt: "2026-04-18",
  },
  {
    slug: "__mock-government-digitization",
    publishedAt: "2026-04-02",
  },
  {
    slug: "__mock-token-platform",
    publishedAt: "2026-03-20",
  },
  {
    slug: "__mock-education-rollout",
    publishedAt: "2026-03-05",
  },
  {
    slug: "__mock-malaysia-office",
    publishedAt: "2026-02-19",
  },
  {
    slug: "__mock-gaming-infrastructure",
    publishedAt: "2026-02-03",
  },
  {
    slug: "__mock-year-in-review",
    publishedAt: "2026-01-15",
  },
];

export const NEWS_MOCK_ARTICLES: NewsArticle[] = MOCK_COPY.map((item) => ({
  slug: item.slug,
  publishedAt: item.publishedAt,
  tags: MOCK_TAGS,
  en: { title: MOCK_TITLE.en, description: MOCK_DESCRIPTION.en },
  zh: { title: MOCK_TITLE.zh, description: MOCK_DESCRIPTION.zh },
  detail: "3hk-alibaba-basicware-alliance",
}));

export function withNewsMocks(articles: NewsArticle[], enabled: boolean): NewsArticle[] {
  if (!enabled || !IS_NEWS_MOCK_DEV) return articles;
  return [...articles, ...NEWS_MOCK_ARTICLES];
}

export function getHomeNewsArticlesWithMock(enabled: boolean): NewsArticle[] {
  return withNewsMocks(NEWS_ARTICLES, enabled).slice(0, HOME_NEWS_MAX);
}

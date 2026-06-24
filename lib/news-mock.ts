/**
 * DEV ONLY — remove this file, NewsMockToggle, and useNewsMock before deploy.
 */
import { HOME_NEWS_MAX, NEWS_ARTICLES, type NewsArticle } from "@/lib/news";

export const IS_NEWS_MOCK_DEV = process.env.NODE_ENV === "development";

/** 10 mocks + 1 real article → 11 total, 2 pages at PAGE_SIZE 10 */
export const NEWS_MOCK_COUNT = 10;

const MOCK_LOREM_EN =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const MOCK_COPY: Array<{
  slug: string;
  publishedAt: string;
  tags: string[];
  en: string;
  enDesc?: string;
}> = [
  {
    slug: "__mock-regional-expansion",
    publishedAt: "2026-05-28",
    tags: ["Partnership", "Southeast Asia"],
    en: "Basicware AI Expands Regional Footprint Across Southeast Asia",
  },
  {
    slug: "__mock-ai-certification",
    publishedAt: "2026-05-14",
    tags: ["Education", "AI Certification"],
    en: "Asia-Pacific AI Certification Programme Launched with Industry Partners",
  },
  {
    slug: "__mock-cloud-partnership",
    publishedAt: "2026-04-30",
    tags: ["Alibaba Cloud", "Partnership"],
    en: "Basicware AI Deepens Cloud Partnership to Accelerate Enterprise AI Adoption",
  },
  {
    slug: "__mock-hospitality-ai",
    publishedAt: "2026-04-18",
    tags: ["Hospitality", "AI Solutions"],
    en: "Hospitality Leaders Adopt Basicware AI Platform for Guest Experience Transformation",
  },
  {
    slug: "__mock-government-digitization",
    publishedAt: "2026-04-02",
    tags: ["Government", "Digital Transformation"],
    en: "Public Sector Digitalization Initiative Advances with Basicware AI Consulting",
  },
  {
    slug: "__mock-token-platform",
    publishedAt: "2026-03-20",
    tags: ["3HK / 3SUPREME", "BasicRouter"],
    en: "BasicRouter Token Platform Reaches New Milestone in Multi-Model AI Access",
  },
  {
    slug: "__mock-education-rollout",
    publishedAt: "2026-03-05",
    tags: ["Education", "Enterprise"],
    en: "Enterprise AI Training Programme Rolls Out Across Hong Kong and Greater Bay Area",
  },
  {
    slug: "__mock-malaysia-office",
    publishedAt: "2026-02-19",
    tags: ["Southeast Asia", "Partnership"],
    en: "Basicware AI Strengthens Malaysia Presence with New Strategic Client Engagements",
  },
  {
    slug: "__mock-gaming-infrastructure",
    publishedAt: "2026-02-03",
    tags: ["Gaming", "Cloud"],
    en: "Gaming Sector Turns to Basicware AI for Scalable Inference Infrastructure",
  },
  {
    slug: "__mock-year-in-review",
    publishedAt: "2026-01-15",
    tags: ["Company News"],
    en: "Basicware AI Reflects on a Year of AI Delivery Across Asia-Pacific Markets",
  },
];

export const NEWS_MOCK_ARTICLES: NewsArticle[] = MOCK_COPY.map((item) => ({
  slug: item.slug,
  publishedAt: item.publishedAt,
  tags: item.tags,
  en: { title: item.en, description: item.enDesc ?? MOCK_LOREM_EN },
  zh: { title: item.en, description: item.enDesc ?? MOCK_LOREM_EN },
  detail: "3hk-alibaba-basicware-alliance",
}));

export function withNewsMocks(articles: NewsArticle[], enabled: boolean): NewsArticle[] {
  if (!enabled || !IS_NEWS_MOCK_DEV) return articles;
  return [...articles, ...NEWS_MOCK_ARTICLES];
}

export function getHomeNewsArticlesWithMock(enabled: boolean): NewsArticle[] {
  return withNewsMocks(NEWS_ARTICLES, enabled).slice(0, HOME_NEWS_MAX);
}

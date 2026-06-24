/**
 * DEV ONLY — remove this file, NewsMockToggle, and useNewsMock before deploy.
 */
import { HOME_NEWS_MAX, NEWS_ARTICLES, type NewsArticle } from "@/lib/news";

export const IS_NEWS_MOCK_DEV = process.env.NODE_ENV === "development";

/** 10 mocks + 1 real article → 11 total, 2 pages at PAGE_SIZE 10 */
export const NEWS_MOCK_COUNT = 10;

const MOCK_COPY: Array<{
  slug: string;
  publishedAt: string;
  tags: string[];
  en: string;
  zh: string;
}> = [
  {
    slug: "__mock-regional-expansion",
    publishedAt: "2026-05-28",
    tags: ["Partnership", "Southeast Asia"],
    en: "Basicware AI Expands Regional Footprint Across Southeast Asia",
    zh: "Basicware AI 拓展東南亞區域業務版圖",
  },
  {
    slug: "__mock-ai-certification",
    publishedAt: "2026-05-14",
    tags: ["Education", "AI Certification"],
    en: "Asia-Pacific AI Certification Programme Launched with Industry Partners",
    zh: "亞太區 AI 認證計劃正式啟動　攜手業界夥伴推動人才發展",
  },
  {
    slug: "__mock-cloud-partnership",
    publishedAt: "2026-04-30",
    tags: ["Alibaba Cloud", "Partnership"],
    en: "Basicware AI Deepens Cloud Partnership to Accelerate Enterprise AI Adoption",
    zh: "Basicware AI 深化雲端合作　加速企業 AI 應用落地",
  },
  {
    slug: "__mock-hospitality-ai",
    publishedAt: "2026-04-18",
    tags: ["Hospitality", "AI Solutions"],
    en: "Hospitality Leaders Adopt Basicware AI Platform for Guest Experience Transformation",
    zh: "酒店業領袖採用 Basicware AI 平台　革新旅客體驗",
  },
  {
    slug: "__mock-government-digitization",
    publishedAt: "2026-04-02",
    tags: ["Government", "Digital Transformation"],
    en: "Public Sector Digitalization Initiative Advances with Basicware AI Consulting",
    zh: "公共部門數碼化計劃推進　Basicware AI 提供顧問支援",
  },
  {
    slug: "__mock-token-platform",
    publishedAt: "2026-03-20",
    tags: ["3HK / 3SUPREME", "BasicRouter"],
    en: "BasicRouter Token Platform Reaches New Milestone in Multi-Model AI Access",
    zh: "BasicRouter Token 平台達成多模型 AI 接入新里程碑",
  },
  {
    slug: "__mock-education-rollout",
    publishedAt: "2026-03-05",
    tags: ["Education", "Enterprise"],
    en: "Enterprise AI Training Programme Rolls Out Across Hong Kong and Greater Bay Area",
    zh: "企業 AI 培訓計劃於香港及大灣區正式推出",
  },
  {
    slug: "__mock-malaysia-office",
    publishedAt: "2026-02-19",
    tags: ["Southeast Asia", "Partnership"],
    en: "Basicware AI Strengthens Malaysia Presence with New Strategic Client Engagements",
    zh: "Basicware AI 強化馬來西亞佈局　拓展策略客戶合作",
  },
  {
    slug: "__mock-gaming-infrastructure",
    publishedAt: "2026-02-03",
    tags: ["Gaming", "Cloud"],
    en: "Gaming Sector Turns to Basicware AI for Scalable Inference Infrastructure",
    zh: "遊戲業界採用 Basicware AI 構建可擴展推理基礎設施",
  },
  {
    slug: "__mock-year-in-review",
    publishedAt: "2026-01-15",
    tags: ["Company News"],
    en: "Basicware AI Reflects on a Year of AI Delivery Across Asia-Pacific Markets",
    zh: "Basicware AI 回顧亞太市場 AI 交付成果",
  },
];

export const NEWS_MOCK_ARTICLES: NewsArticle[] = MOCK_COPY.map((item) => ({
  slug: item.slug,
  publishedAt: item.publishedAt,
  tags: item.tags,
  en: { title: item.en },
  zh: { title: item.zh },
  detail: "3hk-alibaba-basicware-alliance",
}));

export function withNewsMocks(articles: NewsArticle[], enabled: boolean): NewsArticle[] {
  if (!enabled || !IS_NEWS_MOCK_DEV) return articles;
  return [...articles, ...NEWS_MOCK_ARTICLES];
}

export function getHomeNewsArticlesWithMock(enabled: boolean): NewsArticle[] {
  return withNewsMocks(NEWS_ARTICLES, enabled).slice(0, HOME_NEWS_MAX);
}

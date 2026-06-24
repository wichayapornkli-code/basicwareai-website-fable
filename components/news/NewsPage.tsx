"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { NEWS_ARTICLES, paginateNewsArticles } from "@/lib/news";
import { withNewsMocks } from "@/lib/news-mock";
import NewsArticleCard from "@/components/news/NewsArticleCard";
import NewsMockToggle from "@/components/news/NewsMockToggle";
import Pagination from "@/components/news/Pagination";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useNewsMock } from "@/hooks/useNewsMock";

const FONT = '"Plus Jakarta Sans", sans-serif';

export default function NewsPage() {
  const locale = useLocale();
  const t = useTranslations("newsPage");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const searchParams = useSearchParams();
  const { showMock, setShowMock } = useNewsMock();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const listingArticles = withNewsMocks(NEWS_ARTICLES, showMock);
  const { articles, totalPages, currentPage } = paginateNewsArticles(
    listingArticles,
    page,
  );

  return (
    <div style={{ backgroundColor: isDark ? "#0d0d0d" : "#fff" }}>
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding:
            "clamp(140px, 14vw, 200px) clamp(20px, 5vw, 40px) clamp(48px, 6vw, 70px)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "clamp(20px, 3vw, 40px)",
        }}
      >
        <h2
          className="bw-display"
          style={{
            margin: 0,
            fontSize: "var(--fs-heading-lg)",
            flexShrink: 0,
            color: isDark ? "#fff" : "#111110",
          }}
        >
          {t("sectionTitleLine1")}
          <br />
          <em
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#015ac6",
            }}
          >
            {t("sectionTitleAccent")}
          </em>
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            width: isMobile ? "100%" : "365px",
            flexShrink: isMobile ? undefined : 0,
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#015ac6",
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
            <p className="bw-mono-label" style={{ color: "#015ac6", margin: 0 }}>
              {t("sectionEyebrow")}
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: "var(--fs-heading-sm)",
              letterSpacing: "-0.22px",
              color: isDark ? "#a8d0f8" : "#011e5b",
              lineHeight: 1.5,
            }}
          >
            {t("sectionBody")}
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 40px) clamp(60px, 7vw, 100px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {articles.map((article, index) => (
          <div
            key={article.slug}
            style={{
              borderBottom:
                index < articles.length - 1
                  ? `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e8e8e8"}`
                  : "none",
              paddingTop: index === 0 ? 0 : "clamp(24px, 3vw, 32px)",
              paddingBottom: index < articles.length - 1 ? "clamp(24px, 3vw, 32px)" : 0,
            }}
          >
            <NewsArticleCard article={article} locale={locale} />
          </div>
        ))}
      </div>

      <div style={{ paddingBottom: "clamp(60px, 7vw, 100px)" }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>

      <NewsMockToggle enabled={showMock} onChange={setShowMock} />
    </div>
  );
}

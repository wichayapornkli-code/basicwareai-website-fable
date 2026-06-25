"use client";

import { formatNewsDate, getNewsArticleCoverHeadlines, type NewsArticle } from "@/lib/news";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useDark } from "@/components/ThemeProvider";
import { useTranslations } from "next-intl";
import NewsArticleShare from "@/components/news/NewsArticleShare";
import { isTraditionalChineseLocale, isChineseLocale } from "@/lib/locale";

const FONT = '"Plus Jakarta Sans", sans-serif';
const DEFAULT_COVER_SRC = "/assets/news_default_cover.jpg";

type Props = {
  article: NewsArticle;
  locale: string;
};

export default function NewsArticleCover({ article, locale }: Props) {
  const t = useTranslations("newsPage");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const isZh = isChineseLocale(locale);
  const isZhTw = isTraditionalChineseLocale(locale);
  const { headline, subhead } = getNewsArticleCoverHeadlines(article, locale);
  const dateLabel = isZh
    ? `${isZhTw ? "香港" : "香港"}，${formatNewsDate(article.publishedAt, locale)}`
    : `Hong Kong, ${formatNewsDate(article.publishedAt, locale)}`;
  const hasCustomCover = Boolean(article.coverSrc);

  const titleBlock = (
    <>
      <p
        className="bw-eyebrow"
        style={{
          color: hasCustomCover
            ? isDark
              ? "var(--c-accent)"
              : "#015ac6"
            : "rgba(255,255,255,0.65)",
        }}
      >
        {t("sectionEyebrow")}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: subhead ? "14px" : 0 }}>
        <h1
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: "var(--fs-heading-xl)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: hasCustomCover ? (isDark ? "#fff" : "#111110") : "#fff",
          }}
        >
          {headline}
        </h1>
        {subhead ? (
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: "var(--fs-heading-sm)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: hasCustomCover
                ? isDark
                  ? "rgba(255,255,255,0.75)"
                  : "#4a4a4a"
                : "rgba(255,255,255,0.82)",
            }}
          >
            {subhead}
          </p>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          width: "100%",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "var(--fs-body-sm)",
            color: hasCustomCover
              ? isDark
                ? "#909090"
                : "#757575"
              : "rgba(255,255,255,0.6)",
            letterSpacing: "0.02em",
          }}
        >
          {dateLabel}
        </p>
        <NewsArticleShare onLight={!hasCustomCover} />
      </div>
    </>
  );

  if (hasCustomCover) {
    return (
      <div style={{ backgroundColor: isDark ? "#0d0d0d" : "#fff" }}>
        <div
          style={{
            padding: isMobile ? "100px 16px 0" : "120px 32px 0",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              aspectRatio: isMobile ? "16 / 10" : "21 / 9",
              minHeight: isMobile ? "220px" : "320px",
            }}
          >
            <img
              src={article.coverSrc}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: isMobile ? "32px 24px 0" : "40px clamp(40px, 6vw, 80px) 0",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {titleBlock}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        padding: isMobile ? "120px 24px 48px" : "140px clamp(40px, 6vw, 80px) 64px",
        overflow: "hidden",
      }}
    >
      <img
        src={DEFAULT_COVER_SRC}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: "860px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {titleBlock}
      </div>
    </div>
  );
}

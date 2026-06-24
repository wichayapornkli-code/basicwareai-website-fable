"use client";

import { formatNewsDate, type NewsArticle } from "@/lib/news";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useDark } from "@/components/ThemeProvider";

const FONT = '"Plus Jakarta Sans", sans-serif';
const ACCENT = "#0148ae";

type Props = {
  article: NewsArticle;
  locale: string;
};

export default function NewsArticleCover({ article, locale }: Props) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const isZh = locale === "zh";
  const localeCopy = isZh ? article.zh : article.en;
  const title = localeCopy.detailTitle ?? localeCopy.title;
  const dateLabel = isZh
    ? `香港，${formatNewsDate(article.publishedAt, locale)}`
    : `Hong Kong, ${formatNewsDate(article.publishedAt, locale)}`;

  const titleBlock = (
    <>
      <p
        className="bw-eyebrow"
        style={{
          color: article.coverSrc
            ? isDark
              ? "var(--c-accent)"
              : "#015ac6"
            : "rgba(255,255,255,0.65)",
        }}
      >
        {isZh ? "· 新闻与新闻稿 ·" : "· News & Press Release ·"}
      </p>
      <h1
        style={{
          margin: 0,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "var(--fs-heading-xl)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: article.coverSrc ? (isDark ? "#fff" : "#111110") : "#fff",
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontWeight: 400,
          fontSize: "var(--fs-body-sm)",
          color: article.coverSrc
            ? isDark
              ? "#909090"
              : "#757575"
            : "rgba(255,255,255,0.6)",
          letterSpacing: "0.02em",
        }}
      >
        {dateLabel}
      </p>
    </>
  );

  if (article.coverSrc) {
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
        backgroundColor: ACCENT,
        padding: isMobile ? "120px 24px 48px" : "140px clamp(40px, 6vw, 80px) 64px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        {titleBlock}
      </div>
    </div>
  );
}

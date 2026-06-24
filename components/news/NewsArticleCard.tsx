"use client";

import { useState } from "react";
import Link from "next/link";
import { formatNewsDate, type NewsArticle } from "@/lib/news";
import { encodeNewsTag } from "@/lib/news-tags";
import NewsThumbnail from "@/components/news/NewsThumbnail";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const FONT = '"Plus Jakarta Sans", sans-serif';
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

type Props = {
  article: NewsArticle;
  locale: string;
};

function NewsCardTag({
  tag,
  locale,
  isDark,
}: {
  tag: string;
  locale: string;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const color = hovered
    ? isDark
      ? "#b8d8ff"
      : "#015ac6"
    : isDark
      ? "#9a9a9a"
      : "#7c7c7c";

  const borderColor = hovered
    ? isDark
      ? "rgba(108, 184, 255, 0.65)"
      : "#015ac6"
    : isDark
      ? "rgba(255, 255, 255, 0.25)"
      : "#b1b1b1";

  return (
    <Link
      href={`/${locale}/news?tag=${encodeNewsTag(tag)}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${borderColor}`,
        borderRadius: "30px",
        padding: "5px 17px",
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: "var(--fs-body)",
        color,
        lineHeight: "normal",
        whiteSpace: "nowrap",
        textDecoration: "none",
        position: "relative",
        zIndex: 2,
        transition: `color 150ms ease, border-color 150ms ease`,
      }}
    >
      {tag}
    </Link>
  );
}

export default function NewsArticleCard({ article, locale }: Props) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const [cardHovered, setCardHovered] = useState(false);
  const [tagHoverCount, setTagHoverCount] = useState(0);
  const isZh = locale === "zh";
  const title = isZh ? article.zh.title : article.en.title;

  const titleHovered = cardHovered && tagHoverCount === 0;
  const titleColor = titleHovered
    ? isDark
      ? "#b8d8ff"
      : "#015ac6"
    : isDark
      ? "#90c0f0"
      : "#011e5b";

  return (
    <article
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => {
        setCardHovered(false);
        setTagHoverCount(0);
      }}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        color: "inherit",
      }}
    >
      <Link
        href={`/${locale}/news/${article.slug}`}
        aria-label={title}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: "12px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "24px" : "36px",
          alignItems: "flex-start",
          width: "100%",
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <NewsThumbnail coverSrc={article.coverSrc} alt={title} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            minWidth: 0,
            paddingTop: isMobile ? 0 : "4px",
          }}
        >
        <p
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "var(--fs-body)",
            color: "#757575",
          }}
        >
          {formatNewsDate(article.publishedAt, locale)}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: "var(--fs-heading-sm)",
              lineHeight: 1.2,
              letterSpacing: "-0.264px",
              color: titleColor,
              transition: `color 160ms ${EASE_OUT}`,
            }}
          >
            {title}
          </p>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              pointerEvents: "auto",
            }}
            onMouseEnter={() => setTagHoverCount((count) => count + 1)}
            onMouseLeave={() => setTagHoverCount((count) => Math.max(0, count - 1))}
          >
            {article.tags.map((tag) => (
              <NewsCardTag key={tag} tag={tag} locale={locale} isDark={isDark} />
            ))}
          </div>
        </div>
        </div>
      </div>
    </article>
  );
}

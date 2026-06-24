"use client";

import type { NewsArticle } from "@/lib/news";
import { useDark } from "@/components/ThemeProvider";

const FONT = '"Plus Jakarta Sans", sans-serif';

type Props = {
  tags: NewsArticle["tags"];
  onDark?: boolean;
};

export default function NewsArticleTags({ tags, onDark = false }: Props) {
  const { isDark } = useDark();
  const dark = onDark || isDark;

  if (tags.length === 0) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "var(--fs-body-sm)",
            color: dark ? "#fff" : "#011e5b",
            border: dark ? "1px solid rgba(255,255,255,0.55)" : "1px solid #011e5b",
            borderRadius: "30px",
            padding: "6px 16px",
            whiteSpace: "nowrap",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

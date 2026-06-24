"use client";

import { useLocale } from "next-intl";
import type { NewsArticle } from "@/lib/news";
import NewsTagLink from "@/components/news/NewsTagLink";

type Props = {
  tags: NewsArticle["tags"];
  onDark?: boolean;
};

export default function NewsArticleTags({ tags, onDark = false }: Props) {
  const locale = useLocale();

  if (tags.length === 0) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {tags.map((tag) => (
        <NewsTagLink key={tag} tag={tag} locale={locale} onDark={onDark} />
      ))}
    </div>
  );
}

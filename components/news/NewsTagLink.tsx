"use client";

import Link from "next/link";
import { encodeNewsTag } from "@/lib/news-tags";

const FONT = '"Plus Jakarta Sans", sans-serif';

type Props = {
  tag: string;
  locale: string;
  onDark?: boolean;
};

export default function NewsTagLink({ tag, locale, onDark = false }: Props) {
  return (
    <Link
      href={`/${locale}/news?tag=${encodeNewsTag(tag)}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: "var(--fs-body-sm)",
        color: onDark ? "#fff" : "#011e5b",
        border: onDark ? "1px solid rgba(255,255,255,0.55)" : "1px solid #011e5b",
        borderRadius: "30px",
        padding: "6px 16px",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "opacity 0.2s ease",
      }}
    >
      {tag}
    </Link>
  );
}

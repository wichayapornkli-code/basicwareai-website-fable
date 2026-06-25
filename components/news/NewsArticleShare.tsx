"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";

const FONT = '"Plus Jakarta Sans", sans-serif';

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  onLight?: boolean;
};

export default function NewsArticleShare({ onLight = false }: Props) {
  const { isDark } = useDark();
  const t = useTranslations("newsArticle");
  const [copied, setCopied] = useState(false);
  const color = onLight ? "#fff" : isDark ? "#e0e0e0" : "#141414";

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — no-op.
    }
  }, []);

  return (
    <button
      type="button"
      className="bw-news-share"
      onClick={handleCopyLink}
      aria-label={copied ? t("linkCopied") : t("share")}
      style={{
        color,
        fontFamily: FONT,
      }}
    >
      <LinkIcon />
      <span>{copied ? t("copied") : t("share")}</span>
    </button>
  );
}

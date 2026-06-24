"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";

const FONT = '"Plus Jakarta Sans", sans-serif';
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

type Props = {
  tag: string;
};

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NewsTagFilterBar({ tag }: Props) {
  const t = useTranslations("newsPage");
  const router = useRouter();
  const pathname = usePathname();
  const { isDark } = useDark();
  const [closeHovered, setCloseHovered] = useState(false);
  const [closePressed, setClosePressed] = useState(false);

  function clearFilter() {
    router.push(pathname, { scroll: false });
  }

  const pillBorder = isDark ? "rgba(108, 184, 255, 0.45)" : "#b1b1b1";
  const pillBg = isDark ? "rgba(1, 90, 198, 0.12)" : "#f7f9fc";
  const tagColor = isDark ? "#b8d8ff" : "#011e5b";
  const closeColor = closeHovered
    ? isDark
      ? "#fff"
      : "#015ac6"
    : isDark
      ? "#90c0f0"
      : "#7c7c7c";
  const closeBg = closeHovered
    ? isDark
      ? "rgba(255, 255, 255, 0.14)"
      : "rgba(1, 90, 198, 0.1)"
    : "transparent";

  return (
    <div
      style={{
        maxWidth: "1080px",
        margin: "0 auto",
        padding: "0 clamp(20px, 5vw, 40px) clamp(32px, 4vw, 48px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: "var(--fs-heading-sm)",
          letterSpacing: "-0.22px",
          color: "#015ac6",
        }}
      >
        {t("filterLabel")}
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          border: `1px solid ${pillBorder}`,
          borderRadius: "30px",
          padding: "5px 6px 5px 17px",
          backgroundColor: pillBg,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "var(--fs-body)",
            color: tagColor,
            whiteSpace: "nowrap",
            lineHeight: "normal",
          }}
        >
          {tag}
        </span>
        <button
          type="button"
          onClick={clearFilter}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => {
            setCloseHovered(false);
            setClosePressed(false);
          }}
          aria-label={t("clearFilter")}
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: closeBg,
            color: closeColor,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            flexShrink: 0,
            transform: closePressed ? "scale(0.92)" : "scale(1)",
            transition: `background-color 160ms ${EASE_OUT}, color 160ms ${EASE_OUT}, transform 160ms ${EASE_OUT}`,
          }}
          onMouseDown={() => setClosePressed(true)}
          onMouseUp={() => setClosePressed(false)}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

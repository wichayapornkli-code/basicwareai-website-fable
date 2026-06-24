"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function SolutionsRibbon() {
  const { isMobile } = useBreakpoint();
  if (isMobile) return null;
  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        overflow: "hidden",
        padding: "22px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 30s linear infinite",
          willChange: "transform",
        }}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            style={{
              flexShrink: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: "var(--fs-heading-sm)",
              lineHeight: "normal",
              color: "#459AEF",
              whiteSpace: "nowrap",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>
                {" · "}
                <strong>10+</strong>
                {" Countries · "}
                <strong>30+</strong>
                {" AI projects · "}
                <strong>$4M+</strong>
                {" Revenue generated for clients · "}
                <strong>6</strong>
                {" Global cloud partners"}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

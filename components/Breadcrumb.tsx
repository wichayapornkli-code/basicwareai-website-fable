"use client";

import Link from "next/link";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const FONT = '"Plus Jakarta Sans", sans-serif';

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.75 2.25 7v6.75a.75.75 0 0 0 .75.75H6.5V10h3v4.5h3.5a.75.75 0 0 0 .75-.75V7L8 1.75Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({
  homeHref,
  homeLabel,
  items,
  style,
}: {
  homeHref: string;
  homeLabel: string;
  items: BreadcrumbItem[];
  style?: React.CSSProperties;
}) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const muted = isDark ? "#909090" : "#757575";
  const current = isDark ? "#c8c8c8" : "#4a4a4a";

  const allItems: BreadcrumbItem[] = [{ label: homeLabel, href: homeHref }, ...items];

  return (
    <nav aria-label="Breadcrumb" style={style}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "6px",
          margin: 0,
          padding: 0,
          listStyle: "none",
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: "var(--fs-body-sm)",
        }}
      >
        {allItems.map((item, i) => {
          const isFirst = i === 0;
          const isLast = i === allItems.length - 1;

          return (
            <li
              key={`${item.label}-${i}`}
              style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}
            >
              {i > 0 && (
                <span aria-hidden style={{ color: muted, opacity: 0.45, flexShrink: 0 }}>
                  ›
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  aria-label={isFirst ? homeLabel : undefined}
                  title={isFirst ? homeLabel : undefined}
                  className="bw-link"
                  style={{
                    color: muted,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...(isFirst
                      ? {
                          width: "28px",
                          height: "28px",
                          borderRadius: "7px",
                          flexShrink: 0,
                          transition: "color 0.2s, background-color 0.2s",
                        }
                      : { gap: "5px" }),
                  }}
                  onMouseEnter={
                    isFirst
                      ? (e) => {
                          e.currentTarget.style.backgroundColor = isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.05)";
                        }
                      : undefined
                  }
                  onMouseLeave={
                    isFirst
                      ? (e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      : undefined
                  }
                >
                  {isFirst ? <HomeIcon /> : item.label}
                </Link>
              ) : isLast ? (
                <span
                  aria-current="page"
                  style={{
                    color: current,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: isMobile ? "min(240px, 55vw)" : "min(480px, 40vw)",
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <span style={{ color: muted, whiteSpace: "nowrap" }}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

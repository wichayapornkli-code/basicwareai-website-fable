"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import FooterBrandIcon from "@/components/FooterBrandIcon";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const { isMobile } = useBreakpoint();
  const tagline = tf("tagline");
  const taglineAccent = tf("taglineAccent");
  const taglineParts = taglineAccent ? tagline.split(taglineAccent) : [tagline];

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/solutions`, label: t("solutions") },
    { href: `/${locale}/success-stories`, label: t("successStories") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#0a0a0b",
        color: "#fff",
        padding: "clamp(64px, 7vw, 110px) clamp(24px, 5vw, 80px) clamp(36px, 4vw, 56px)",
        fontFamily: "var(--font-sans)",
        overflow: "hidden",
      }}
    >
      {/* Top: logo + tagline + CTA */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "clamp(28px, 4vw, 48px)",
          paddingBottom: "clamp(48px, 5vw, 80px)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <FooterBrandIcon className="bw-footer-brand-icon" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <p
            className="bw-eyebrow"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {tf("subtagline")}
          </p>
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "var(--fs-heading-xl)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              maxWidth: "720px",
              textWrap: "balance",
            }}
          >
            {taglineParts.map((part, i, arr) =>
              i < arr.length - 1
                ? <span key={i}>{part}<em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "#6cb8ff" }}>{taglineAccent}</em></span>
                : <span key={i}>{part}</span>
            )}
          </p>
        </div>

        <Link
          href={`/${locale}/contact`}
          className="bw-btn bw-footer-cta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#fff",
            borderRadius: "60px",
            padding: "18px 34px",
            textDecoration: "none",
            color: "#0a0a0b",
            fontWeight: 600,
            fontSize: "var(--fs-body)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            flexShrink: 0,
            alignSelf: isMobile ? "stretch" : "center",
            justifyContent: "center",
          }}
        >
          {t("getStarted")}
          <img src="/assets/arrow-dark.svg" alt="" width={13} height={13} style={{ display: "block" }} />
        </Link>
      </div>

      {/* Bottom: nav + meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
          paddingTop: "clamp(36px, 4vw, 56px)",
        }}
      >
        <nav style={{ display: "flex", gap: "clamp(12px, 2vw, 48px)", flexWrap: "wrap" }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="bw-link"
              style={{
                fontWeight: 500,
                fontSize: "var(--fs-body)",
                color: "rgba(255,255,255,0.65)",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <DarkModeToggle />
          <p
            className="bw-mono-label"
            style={{ margin: 0, color: "rgba(255,255,255,0.35)" }}
          >
            © {new Date().getFullYear()} Basicware — {tf("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

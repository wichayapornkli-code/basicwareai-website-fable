import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();

  const links = [
    { href: `/${locale}/solutions`, label: t("solutions") },
    { href: `/${locale}/success-stories`, label: t("successStories") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("getStarted") },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#0a0a0b",
        color: "#fff",
        padding: "clamp(64px, 7vw, 110px) clamp(24px, 5vw, 80px) 0",
        fontFamily: "var(--font-sans)",
        overflow: "hidden",
      }}
    >
      {/* Top: tagline + CTA */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "40px",
          paddingBottom: "clamp(48px, 5vw, 80px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
              fontSize: "clamp(32px, 4.5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              maxWidth: "720px",
            }}
          >
            {tf("tagline").split("Infinite").map((part, i, arr) =>
              i < arr.length - 1
                ? <span key={i}>{part}<em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "#6cb8ff" }}>Infinite</em></span>
                : <span key={i}>{part}</span>
            )}
          </p>
        </div>

        <Link
          href={`/${locale}/contact`}
          className="bw-btn"
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
            fontSize: "15px",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {t("getStarted")}
          <img src="/assets/arrow-dark.svg" alt="" width={13} height={13} style={{ display: "block" }} />
        </Link>
      </div>

      {/* Middle: nav + meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
          padding: "clamp(36px, 4vw, 56px) 0",
        }}
      >
        <nav style={{ display: "flex", gap: "clamp(24px, 3vw, 48px)", flexWrap: "wrap" }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="bw-link"
              style={{
                fontWeight: 500,
                fontSize: "15px",
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

      {/* Giant wordmark */}
      <div aria-hidden style={{ display: "flex", justifyContent: "center" }}>
        <p
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(64px, 14.5vw, 230px)",
            lineHeight: 0.78,
            letterSpacing: "-0.045em",
            whiteSpace: "nowrap",
            userSelect: "none",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.18)",
            transform: "translateY(0.12em)",
            transition: "color 0.6s ease",
          }}
          className="bw-wordmark"
        >
          Basicware
        </p>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDark } from "@/components/ThemeProvider";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { isDark } = useDark();

  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "en" ? "zh" : "en";
  const otherLocaleLabel = locale === "en" ? "中文" : "EN";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.push(segments.join("/") || "/");
  }

  const links = [
    { href: `/${locale}/solutions`, label: t("solutions") },
    { href: `/${locale}/success-stories`, label: t("successStories") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <nav
      style={{
        viewTransitionName: "site-header",
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : -12}px)`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1), background-color 0.4s ease, border-color 0.4s ease",
        width: "calc(100% - 48px)",
        maxWidth: "1100px",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isDark ? "rgba(20,20,23,0.55)" : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderRadius: "60px",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.65)"}`,
        boxShadow: isDark ? "0 4px 32px rgba(0,0,0,0.4)" : "0 4px 32px rgba(0,0,0,0.08)",
        padding: "10px 10px 10px 28px",
      }}
    >
      {/* Logo */}
      <Link
        href={`/${locale}`}
        style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
      >
        <Image
          src={isDark ? "/assets/logo_white.png" : "/assets/logo_black.png"}
          alt="Basicware logo"
          width={31}
          height={23}
          style={{ display: "block", width: "28px", height: "auto" }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "16px",
            color: "var(--c-text)",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          Basicware
        </span>
      </Link>

      {/* Nav links */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "15px",
          whiteSpace: "nowrap",
        }}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="bw-link"
            style={{ color: "var(--c-text)", opacity: 0.75 }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right: CTA + locale switcher */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button
          onClick={switchLocale}
          className="bw-btn-text bw-mono-label"
          style={{
            color: "var(--c-text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
          }}
        >
          {otherLocaleLabel}
        </button>

        <Link
          href={`/${locale}/contact`}
          className="bw-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--c-accent)",
            borderRadius: "90px",
            padding: "11px 22px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "13px",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            {t("getStarted")}
          </span>
          <Image
            src="/assets/arrow-white.svg"
            alt=""
            width={12}
            height={12}
            style={{ display: "block" }}
          />
        </Link>
      </div>
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Navbar() {
  const t = useTranslations("nav");
  const tb = useTranslations("breadcrumb");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();

  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const otherLocale = locale === "en" ? "zh" : "en";
  const otherLocaleLabel = locale === "en" ? "中文" : "EN";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.replace(segments.join("/") || "/", { scroll: false });
  }

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/solutions`, label: t("solutions") },
    { href: `/${locale}/success-stories`, label: t("successStories") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <>
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
          padding: isMobile ? "10px 10px 10px 20px" : "10px 10px 10px 28px",
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          aria-label={tb("home")}
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
              fontSize: "var(--fs-body)",
              color: "var(--c-text)",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Basicware
          </span>
        </Link>

        {/* Desktop: nav links */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "var(--fs-body)",
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
        )}

        {/* Desktop: CTA + locale switcher */}
        {!isMobile && (
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
                  fontSize: "var(--fs-body-sm)",
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                {t("getStarted")}
              </span>
              <Image
                src="/assets/arrow-white.svg"
                alt=""
                width={14}
                height={7}
                style={{ display: "block", height: "12px", width: "auto" }}
              />
            </Link>
          </div>
        )}

        {/* Mobile: hamburger button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              minWidth: "44px",
              minHeight: "44px",
              alignItems: "center",
            }}
          >
            <span style={{
              display: "block",
              width: "20px",
              height: "2px",
              backgroundColor: "var(--c-text)",
              borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.25s ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block",
              width: "20px",
              height: "2px",
              backgroundColor: "var(--c-text)",
              borderRadius: "2px",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.25s ease",
            }} />
            <span style={{
              display: "block",
              width: "20px",
              height: "2px",
              backgroundColor: "var(--c-text)",
              borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.25s ease",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        )}
      </nav>

      {/* Mobile drawer backdrop */}
      {isMobile && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            backgroundColor: "rgba(0,0,0,0.4)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "min(320px, 100vw)",
            height: "100dvh",
            zIndex: 200,
            backgroundColor: isDark ? "rgba(14,14,18,0.97)" : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            display: "flex",
            flexDirection: "column",
            padding: "80px 32px 48px",
            gap: "0",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--fs-heading-md)",
                  color: "var(--c-text)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                  letterSpacing: "-0.02em",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMenuOpen(false)}
              className="bw-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "var(--c-accent)",
                borderRadius: "90px",
                padding: "16px 28px",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--fs-body)",
                  color: "#ffffff",
                }}
              >
                {t("getStarted")}
              </span>
              <Image
                src="/assets/arrow-white.svg"
                alt=""
                width={14}
                height={7}
                style={{ display: "block", height: "12px", width: "auto" }}
              />
            </Link>

            <button
              onClick={() => { switchLocale(); setMenuOpen(false); }}
              className="bw-btn-text bw-mono-label"
              style={{
                color: "var(--c-text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 0",
                fontSize: "var(--fs-body-sm)",
                textAlign: "center",
              }}
            >
              {otherLocaleLabel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

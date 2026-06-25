"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Reveal from "@/components/anim/Reveal";
import AccentWords from "@/components/anim/AccentWords";
import Magnetic from "@/components/anim/Magnetic";

const FONT = '"Plus Jakarta Sans", sans-serif';

const bodyStyle = {
  margin: 0,
  fontFamily: FONT,
  fontWeight: 500,
  fontSize: "var(--fs-body)",
  lineHeight: 1.7,
  letterSpacing: "-0.154px",
  textWrap: "pretty" as const,
};

export default function BrandStorySection() {
  const t = useTranslations("home.brandStory");
  const locale = useLocale();
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();

  const headingColor = isDark ? "#e0e0e0" : "#141414";
  const bodyMuted = isDark ? "#a0a0a0" : "#757575";
  const bg = isDark ? "#0d0d0d" : "#f9f9f9";

  return (
    <section
      style={{
        backgroundColor: bg,
        padding: "clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)",
        color: headingColor,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "flex-start",
            marginBottom: 0,
          }}
        >
          <div
            style={{
              flexShrink: 0,
              minWidth: isMobile ? undefined : "220px",
              flex: isMobile ? undefined : "0 0 clamp(220px, 28%, 340px)",
            }}
          >
            <Reveal mode="fade" delay={0} style={{ marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
              <img
                src="/assets/footer-brand-icon.svg"
                alt=""
                draggable={false}
                style={{
                  width: "clamp(76px, 10vw, 112px)",
                  height: "auto",
                  display: "block",
                  userSelect: "none",
                }}
              />
            </Reveal>

            <Reveal mode="fade" delay={0.05} style={{ marginBottom: "20px" }}>
              <p className="bw-eyebrow">
                {t("eyebrow").replace(/·/g, "").trim()}
              </p>
            </Reveal>
            <Reveal as="h2" className="bw-display" style={{ fontSize: "var(--fs-heading-lg)", textWrap: "balance" }}>
              <AccentWords text={t("title")} />
            </Reveal>

            <Reveal mode="fade" delay={0.3} style={{ marginTop: "clamp(24px, 3vw, 32px)" }}>
              <Magnetic>
                <Link
                  href={`/${locale}/about`}
                  className="bw-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: isDark ? "#ececea" : "#141414",
                    borderRadius: "40px",
                    padding: "10px 20px",
                    textDecoration: "none",
                    color: isDark ? "#111110" : "#fafafa",
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: "var(--fs-body-sm)",
                    letterSpacing: "-0.154px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("link")}
                  <img
                    src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
                    alt=""
                    width={13}
                    height={13}
                    style={{ display: "block" }}
                  />
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 2.5vw, 28px)",
              paddingTop: isMobile ? undefined : "4px",
            }}
          >
            <Reveal
              as="p"
              mode="fade"
              delay={0.1}
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-body-lg)",
                lineHeight: 1.6,
                letterSpacing: "-0.176px",
                color: headingColor,
                textWrap: "pretty",
              }}
            >
              {t("p1")}
            </Reveal>

            <Reveal
              as="p"
              mode="fade"
              delay={0.2}
              style={{ ...bodyStyle, color: bodyMuted }}
            >
              {t("p2")}
            </Reveal>

            <Reveal
              as="p"
              mode="fade"
              delay={0.25}
              style={{ ...bodyStyle, color: bodyMuted }}
            >
              {t("p3")}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

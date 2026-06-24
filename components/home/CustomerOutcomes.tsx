"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const CARDS = [
  { id: 0, color: "#16b19a", flag: "🇹🇭", num: "01", rotate: "-2.69deg", floatAnim: "float-a 4.2s ease-in-out infinite", zBase: 1, marginLeft: "0px" },
  { id: 1, color: "#4d1eba", flag: "🇨🇳", num: "02", rotate: "0deg",     floatAnim: "float-b 3.6s ease-in-out infinite", zBase: 2, marginLeft: "-48px" },
  { id: 2, color: "#107fc8", flag: "🇸🇬", num: "03", rotate: "3.39deg",  floatAnim: "float-c 5s ease-in-out infinite",   zBase: 1, marginLeft: "-48px" },
];

const CARD_SHADOW =
  "0px 27px 23.5px rgba(0,0,0,0.07), 0px 11.28px 9.818px rgba(0,0,0,0.05), 0px 6.031px 5.249px rgba(0,0,0,0.04), 0px 3.381px 2.943px rgba(0,0,0,0.04), 0px 1.796px 1.563px rgba(0,0,0,0.03), 0px 0.747px 0.65px rgba(0,0,0,0.02)";

const CARD_SHADOW_HOVER =
  "0px 48px 40px rgba(0,0,0,0.14), 0px 20px 16px rgba(0,0,0,0.09), 0px 10px 8px rgba(0,0,0,0.07)";

export default function CustomerOutcomes() {
  const t = useTranslations("outcomes");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        backgroundColor: isDark ? "#111" : "#f3f8fb",
        padding: "clamp(40px, 5.5vw, 100px) clamp(20px, 3vw, 60px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0",
        overflow: "hidden",
        minHeight: "90vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          textAlign: "center",
          maxWidth: "520px",
          marginBottom: "64px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700,
            fontSize: "var(--fs-body)",
            letterSpacing: "-0.176px",
            color: isDark ? "#7ec8f0" : "#06304c",
            textTransform: "uppercase",
          }}
        >
          {t("eyebrow")}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <p
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              fontSize: "var(--fs-heading-lg)",
              lineHeight: 1.1,
              letterSpacing: "-0.55px",
              color: isDark ? "#79b8ff" : "#0161cd",
              whiteSpace: "nowrap",
            }}
          >
            {t("titleBlue")}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontSize: "var(--fs-heading-lg)",
              lineHeight: 1.1,
              letterSpacing: "-0.55px",
              color: isDark ? "#cce0f0" : "#06304c",
              whiteSpace: "nowrap",
            }}
          >
            {t("titleDark")}
          </p>
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 400,
            fontSize: "var(--fs-body)",
            lineHeight: 1.5,
            letterSpacing: "-0.176px",
            color: isDark ? "#a8c8e0" : "#06304c",
            whiteSpace: "pre-line",
          }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "center",
          justifyContent: "center",
          gap: isMobile ? "20px" : "0",
          width: "100%",
          maxWidth: "1080px",
          padding: "40px 0 60px",
          perspective: isMobile ? undefined : "1200px",
        }}
      >
        {CARDS.map((card) => {
          const isHovered = hovered === card.id;
          const isOtherHovered = hovered !== null && hovered !== card.id;

          return (
            /* Outer: handles rotation + hover lift + z-index */
            <div
              key={card.id}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                transform: isHovered
                  ? "rotate(0deg) scale(1.04)"
                  : isOtherHovered
                  ? `rotate(${card.rotate}) scale(0.97)`
                  : isMobile ? "none" : `rotate(${card.rotate})`,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                zIndex: isHovered ? 10 : card.zBase,
                position: "relative",
                cursor: "pointer",
                flexShrink: 0,
                marginLeft: isMobile ? "0" : card.marginLeft,
              }}
            >
            {/* Inner: handles the continuous float animation */}
            <div
              style={{
                animation: isHovered ? "none" : card.floatAnim,
                transform: isHovered ? "translateY(-20px)" : undefined,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                willChange: "transform",
              }}
            >
              <div
                style={{
                  backgroundColor: card.color,
                  border: "2px solid rgba(255,255,255,0.24)",
                  borderRadius: "24px",
                  padding: "clamp(20px, 2.5vw, 40px)",
                  width: isMobile ? "clamp(300px, 90vw, 400px)" : "clamp(240px, 21vw, 340px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "11px",
                  boxShadow: isHovered ? CARD_SHADOW_HOVER : CARD_SHADOW,
                  transition: "box-shadow 0.3s ease",
                  color: "#fff",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  lineHeight: 1.5,
                }}
              >
                {/* Flag + number */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "var(--fs-body)" }}>{card.flag}</span>
                  <span
                    style={{
                      fontFamily: '"Roboto Mono", monospace',
                      fontWeight: 700,
                      fontSize: "var(--fs-caption)",
                      letterSpacing: "-0.132px",
                      opacity: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    {card.num}
                  </span>
                </div>

                {/* Category + location */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: "var(--fs-body)",
                      letterSpacing: "-0.176px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t(`cards.${card.id}.category`)}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: "var(--fs-caption)",
                      letterSpacing: "-0.132px",
                      textTransform: "uppercase",
                      opacity: 0.4,
                    }}
                  >
                    {t(`cards.${card.id}.location`)}
                  </p>
                </div>

                {/* Headline */}
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "var(--fs-body)",
                    letterSpacing: "-0.176px",
                  }}
                >
                  {t(`cards.${card.id}.headline`)}
                </p>

                {/* Body */}
                <p
                  style={{
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "var(--fs-body-sm)",
                    letterSpacing: "-0.154px",
                    maxWidth: "78%",
                  }}
                >
                  {t(`cards.${card.id}.body`)}
                </p>
              </div>
            </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1080px",
        }}
      >
        {/* Live counter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              backgroundColor: "#22c55e",
              animation: "pulse-ring 1.8s ease-out infinite",
            }} />
            <div style={{
              position: "absolute", inset: "2.5px", borderRadius: "50%",
              backgroundColor: "#22c55e",
            }} />
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: "var(--fs-body)",
              fontWeight: 400,
              letterSpacing: "-0.176px",
              color: isDark ? "#c8c8c8" : "#0b0b0b",
            }}
          >
            <span style={{ fontWeight: 700, color: isDark ? "#79b8ff" : "#0161cd" }}>{t("liveCount")}</span>
            {t("liveLabel")}
          </p>
        </div>

        {/* CTA */}
        <a
          href="#case-studies"
          className="bw-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #dedede",
            borderRadius: "40px",
            padding: "10px 20px",
            textDecoration: "none",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 400,
            fontSize: "var(--fs-body-sm)",
            letterSpacing: "-0.154px",
            color: isDark ? "#c8c8c8" : "#0b0b0b",
            whiteSpace: "nowrap",
            transition: "border-color 0.2s",
          }}
        >
          {t("cta")}
          <Image src={isDark ? "/assets/arrow-white.svg" : "/assets/arrow-dark.svg"} alt="" width={14} height={7} style={{ display: "block", height: "13px", width: "auto" }} />
        </a>
      </div>
    </section>
  );
}

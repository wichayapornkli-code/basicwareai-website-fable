"use client";

import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const FONT = '"Plus Jakarta Sans", sans-serif';

export default function WorldwideOperations() {
  const t = useTranslations("worldwide");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();

  return (
    <section
      style={{
        backgroundColor: isDark ? "#0d0d0d" : "#fff",
        padding: "clamp(20px, 2.5vw, 48px) 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90vw",
          backgroundColor: "#020b2b",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          height: isMobile ? "auto" : "clamp(320px, 34vw, 480px)",
          display: "flex",
          flexDirection: isMobile ? "column" : undefined,
          alignItems: isMobile ? "flex-start" : "center",
        }}
      >
        {/* Map */}
        <div
          style={{
            position: isMobile ? "relative" : "absolute",
            left: isMobile ? undefined : "-22%",
            top: isMobile ? undefined : "-15%",
            width: isMobile ? "100%" : "60%",
            height: isMobile ? "200px" : "130%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        >
          <div style={{
            transform: isMobile ? "rotate(-4deg) scale(1.3)" : "rotate(-8deg)",
            flexShrink: 0,
            width: isMobile ? "140%" : "120%",
          }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "1113.764 / 807.503",
              }}
            >
              <img
                src="/assets/2_map.png"
                alt=""
                style={{
                  position: "absolute",
                  width: "103.5%",
                  height: "auto",
                  left: "-1.75%",
                  top: 0,
                  display: "block",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            position: isMobile ? "relative" : "absolute",
            left: isMobile ? undefined : "58%",
            top: isMobile ? undefined : "50%",
            transform: isMobile ? undefined : "translateY(-50%)",
            width: isMobile ? "100%" : "38%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            color: "#fff",
            padding: isMobile ? "28px 28px 36px" : undefined,
            boxSizing: "border-box",
          }}
        >
          <p className="bw-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t("eyebrow").replace(/·/g, "").trim()}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <h2
              className="bw-display"
              style={{
                fontSize: isMobile ? "clamp(24px, 6vw, 36px)" : "clamp(26px, 3vw, 46px)",
                color: "#fff",
              }}
            >
              <em style={{ color: "#6cb8ff" }}>{t("titleBlue")}</em>
            </h2>

            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: 1.5,
                letterSpacing: "-0.176px",
              }}
            >
              {t("titleDark")}
            </p>

            <p
              style={{
                margin: 0,
                marginTop: "8px",
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: "clamp(15px, 1.4vw, 22px)",
                lineHeight: 1.5,
                letterSpacing: "-0.176px",
                opacity: 0.75,
              }}
            >
              {t("body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

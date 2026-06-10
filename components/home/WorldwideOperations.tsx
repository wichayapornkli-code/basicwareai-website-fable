"use client";

import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";

const FONT = '"Plus Jakarta Sans", sans-serif';

export default function WorldwideOperations() {
  const t = useTranslations("worldwide");
  const { isDark } = useDark();

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
          height: "clamp(320px, 34vw, 480px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Map — left side, tilted, overflowing */}
        <div
          style={{
            position: "absolute",
            left: "-22%",
            top: "-15%",
            width: "60%",
            height: "130%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ transform: "rotate(-8deg)", flexShrink: 0, width: "120%" }}>
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

        {/* Text — right side, vertically centered */}
        <div
          style={{
            position: "absolute",
            left: "58%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "38%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            color: "#fff",
          }}
        >
          <p className="bw-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t("eyebrow").replace(/·/g, "").trim()}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <h2
              className="bw-display"
              style={{
                fontSize: "clamp(26px, 3vw, 46px)",
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
                fontSize: "clamp(17px, 1.4vw, 22px)",
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

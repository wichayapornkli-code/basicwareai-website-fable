"use client";

import { useTranslations } from "next-intl";
import LogoScroller from "@/components/home/LogoScroller";
import { useDark } from "@/components/ThemeProvider";
import AccentWords from "@/components/anim/AccentWords";

const TEAM_PHOTOS = ["Paul", "Zane", "Fox"];

const FONT = '"Plus Jakarta Sans", sans-serif';

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p className="bw-eyebrow" style={{ color: "var(--c-accent)" }}>{children}</p>
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const { isDark } = useDark();

  return (
    <>
      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: isDark ? "#0d0d0d" : "#fafafa",
          paddingTop: "clamp(140px, 14vw, 200px)",
          paddingBottom: "clamp(60px, 7vw, 100px)",
          paddingLeft: "clamp(20px, 4vw, 60px)",
          paddingRight: "clamp(20px, 4vw, 60px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Two-column: heading left, paragraphs right */}
          <div
            style={{
              display: "flex",
              gap: "clamp(40px, 5vw, 80px)",
              alignItems: "flex-start",
              marginBottom: "clamp(48px, 6vw, 80px)",
              flexWrap: "wrap",
            }}
          >
            {/* Left: eyebrow + H1 */}
            <div style={{ flexShrink: 0, minWidth: "220px", flex: "0 0 clamp(220px, 28%, 340px)" }}>
              <SectionEyebrow>{t("story.eyebrow")}</SectionEyebrow>
              <h1
                className="bw-display"
                style={{ fontSize: "clamp(44px, 5.5vw, 88px)" }}
              >
                <AccentWords text={t("story.title")} />
              </h1>
            </div>

            {/* Right: bold opener + two-column pair */}
            <div
              style={{
                flex: "1 1 300px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingTop: "4px",
              }}
            >
              {/* p1 — bold */}
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: 1.6,
                  letterSpacing: "-0.176px",
                  color: isDark ? "#e0e0e0" : "#141414",
                }}
              >
                {t("story.p1")}
              </p>

              {/* p2 + p3 — two columns */}
              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                {[2, 3].map((i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      flex: "1 1 0",
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: "15px",
                      lineHeight: 1.7,
                      letterSpacing: "-0.154px",
                      color: isDark ? "#a0a0a0" : "#757575",
                    }}
                  >
                    {t(`story.p${i}`)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <img
            src="/assets/about_01.avif"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "clamp(280px, 35vw, 520px)",
              objectFit: "cover",
              borderRadius: "20px",
              marginTop: "clamp(40px, 5vw, 72px)",
            }}
          />
        </div>
      </section>

      <LogoScroller />

      {/* ── What Drives Us ────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: isDark ? "#0d0d0d" : "#fff",
          padding: "clamp(60px, 7vw, 120px) clamp(20px, 4vw, 60px)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          {/* Two-column header */}
          <div
            style={{
              display: "flex",
              gap: "clamp(40px, 5vw, 80px)",
              alignItems: "flex-end",
              marginBottom: "clamp(40px, 4vw, 60px)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flexShrink: 0, minWidth: "200px", flex: "0 0 clamp(200px, 30%, 300px)" }}>
              <SectionEyebrow>{t("values.eyebrow")}</SectionEyebrow>
              <h2
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.2vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: isDark ? "#e0e0e0" : "#141414",
                }}
              >
                {t("values.title")}
              </h2>
            </div>
            <p
              style={{
                flex: "1 1 240px",
                margin: 0,
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.65,
                color: "#757575",
                letterSpacing: "-0.176px",
                maxWidth: "480px",
              }}
            >
              {t("values.subtitle")}
            </p>
          </div>

          {/* 2×2 value cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2px",
              backgroundColor: isDark ? "#1a1a1a" : "#e2e2e2",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: isDark ? "#1e1e1e" : "#fbfbfc",
                  padding: "clamp(28px, 3.2vw, 48px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Accent dot */}
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#0161cd",
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: "clamp(17px, 1.6vw, 22px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.2px",
                    color: isDark ? "#e0e0e0" : "#141414",
                  }}
                >
                  {t(`values.cards.${i}.title`)}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: 1.65,
                    letterSpacing: "-0.154px",
                    color: isDark ? "#a0a0a0" : "#757575",
                  }}
                >
                  {t(`values.cards.${i}.body`)}
                </p>
              </div>
            ))}
          </div>

          {/* Section images */}
          <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            {["about_02", "about_03"].map((name) => (
              <img
                key={name}
                src={`/assets/${name}.avif`}
                alt=""
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "clamp(200px, 26vw, 400px)",
                  objectFit: "cover",
                  borderRadius: "20px",
                  display: "block",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Team ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: isDark ? "#0d0d0d" : "#fafafa",
          padding: "clamp(60px, 7vw, 120px) clamp(20px, 4vw, 60px)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          {/* Two-column header */}
          <div
            style={{
              display: "flex",
              gap: "clamp(40px, 5vw, 80px)",
              alignItems: "flex-end",
              marginBottom: "clamp(40px, 4vw, 60px)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flexShrink: 0, minWidth: "200px", flex: "0 0 clamp(200px, 30%, 300px)" }}>
              <SectionEyebrow>{t("team.eyebrow")}</SectionEyebrow>
              <h2
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.2vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: isDark ? "#e0e0e0" : "#141414",
                }}
              >
                {t("team.title")}
              </h2>
            </div>
            <p
              style={{
                flex: "1 1 240px",
                margin: 0,
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.65,
                color: "#757575",
                letterSpacing: "-0.176px",
                maxWidth: "480px",
              }}
            >
              {t("team.subtitle")}
            </p>
          </div>

          {/* Team cards */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {[0, 1, 2].map((i) => {
              const name = t(`team.members.${i}.name`);
              return (
                <div
                  key={i}
                  style={{
                    flex: "1 1 280px",
                    backgroundColor: isDark ? "#1e1e1e" : "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e8e8e8",
                  }}
                >
                  {/* Photo */}
                  <img
                    src={`/assets/${TEAM_PHOTOS[i]}.png`}
                    alt={name}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "clamp(200px, 22vw, 300px)",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />

                  {/* Card body */}
                  <div style={{ padding: "24px 24px 28px" }}>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: "17px",
                        color: isDark ? "#e0e0e0" : "#141414",
                        letterSpacing: "-0.176px",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        margin: "0 0 16px 0",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#1784d2",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {t(`team.members.${i}.title`)}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: FONT,
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: isDark ? "#a0a0a0" : "#757575",
                        letterSpacing: "-0.154px",
                      }}
                    >
                      {t(`team.members.${i}.bio`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

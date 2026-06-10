"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useDark } from "@/components/ThemeProvider";
import Reveal from "@/components/anim/Reveal";
import Magnetic from "@/components/anim/Magnetic";
import AccentWords from "@/components/anim/AccentWords";

export default function CtaSection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const { isDark } = useDark();

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "var(--c-bg)",
        overflow: "hidden",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Centered text + CTA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
          textAlign: "center",
          maxWidth: "760px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
          <p className="bw-eyebrow">{t("eyebrow").replace(/·/g, "").trim()}</p>
          <Reveal
            as="h2"
            className="bw-display"
            style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}
          >
            <AccentWords text={t("title")} count={2} />
          </Reveal>
          <Reveal
            as="p"
            mode="fade"
            delay={0.2}
            style={{
              margin: 0,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.6,
              color: "var(--c-text-muted)",
            }}
          >
            {t("subtitle")}
          </Reveal>
        </div>

        {/* Button + tagline */}
        <Reveal mode="fade" delay={0.3} style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          <Magnetic>
            <Link
              href={`/${locale}/success-stories`}
              className="bw-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: isDark ? "#ececea" : "#111110",
                borderRadius: "60px",
                padding: "18px 36px",
                textDecoration: "none",
                color: isDark ? "#111110" : "#ffffff",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {t("button")}
              <img
                src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
                alt=""
                width={13}
                height={13}
                style={{ display: "block" }}
              />
            </Link>
          </Magnetic>
          <p className="bw-mono-label" style={{ margin: 0, color: "var(--c-text-muted)", opacity: 0.7 }}>
            {t("tagline")}
          </p>
        </Reveal>
      </div>

      {/* Footer image — dandelion illustration */}
      <img
        src="/assets/footer image.png"
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          userSelect: "none",
          opacity: isDark ? 0.5 : 1,
        }}
      />
    </section>
  );
}

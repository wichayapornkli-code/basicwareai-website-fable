"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import Breadcrumb from "@/components/Breadcrumb";
import { type CaseStudy } from "@/lib/case-studies";
import { useDark } from "@/components/ThemeProvider";
import { consumeHeroTransition } from "@/lib/heroTransition";
import { getContentLocaleKey, mergeWithEnglishFallback } from "@/lib/locale";

const FONT = '"Plus Jakarta Sans", sans-serif';

const RESULT_ICONS = ["📈", "👥", "⚡"];

type MetricCopy = {
  value: string;
  label: string;
};

type ResultCopy = {
  title: string;
  body: string;
};

export default function CaseStudyDetailPage({
  study,
  locale,
}: {
  study: CaseStudy;
  locale: string;
}) {
  const { isDark } = useDark();
  const t = useTranslations("nav");
  const tb = useTranslations("breadcrumb");
  const td = useTranslations("successStoriesDetail");
  const heroRef = useRef<HTMLDivElement>(null);
  const localeKey = getContentLocaleKey(locale);
  const metrics = td.raw("metrics") as MetricCopy[];
  const results = td.raw("results") as ResultCopy[];
  const copy =
    localeKey === "zh"
      ? mergeWithEnglishFallback(study.en, study.zh)
      : localeKey === "zhTw"
        ? mergeWithEnglishFallback(study.en, study.zhTw)
        : study.en;

  useLayoutEffect(() => {
    const pending = consumeHeroTransition();
    if (!pending || pending.id !== study.id || !heroRef.current) return;

    const hero = heroRef.current;
    const heroRect = hero.getBoundingClientRect();
    const { rect: from } = pending;

    gsap.fromTo(
      hero,
      {
        x: from.x - heroRect.x,
        y: from.y - heroRect.y,
        scaleX: from.width / heroRect.width,
        scaleY: from.height / heroRect.height,
        transformOrigin: "top left",
      },
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.55,
        ease: "power2.inOut",
        clearProps: "transform,transformOrigin",
      }
    );
  }, [study.id]);

  const bg = isDark ? "#0d0d0d" : "#fff";
  const text = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";
  const subtle = isDark ? "#1a1a1a" : "#f5f5f7";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const headline = isDark ? "#90c0f0" : "#011e5b";
  const logoSrc = isDark && study.logoDarkSrc ? study.logoDarkSrc : study.logoSrc;
  const logoOpacity = isDark && study.logoDarkSrc ? 0.9 : isDark ? 0.8 : 0.65;

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>

      {/* ── Hero image (morphs from card) ──────────────────────────── */}
      <div ref={heroRef} style={{ width: "100%", height: "clamp(360px, 48vw, 640px)", overflow: "hidden" }}>
        <img
          src={study.imageSrc}
          alt=""
          style={{
            viewTransitionName: `study-image-${study.id}`,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 96px) 40px clamp(80px, 9vw, 160px)",
        }}
      >
        <Breadcrumb
          style={{ marginBottom: "48px" }}
          homeHref={`/${locale}`}
          homeLabel={tb("home")}
          items={[
            { label: t("successStories"), href: `/${locale}/success-stories` },
            { label: study.logoAlt },
          ]}
        />

        {/* Logo + tags row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <img
            src={logoSrc}
            alt={study.logoAlt}
            style={{ height: study.logoHeight * 1.6, width: "auto", display: "block", opacity: logoOpacity }}
          />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {copy.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  border: `1px solid ${border}`,
                  borderRadius: "30px",
                  padding: "4px 16px",
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: "var(--fs-body-sm)",
                  color: muted,
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Headline */}
        <p
          style={{
            margin: "0 0 48px",
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: "var(--fs-heading-lg)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            color: headline,
            maxWidth: "760px",
          }}
        >
          {copy.headline}
        </p>

        {/* Key metrics strip */}
        <div
          style={{
            display: "flex",
            gap: "2px",
            marginBottom: "64px",
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${border}`,
          }}
        >
          {metrics.map(({ value, label }, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                backgroundColor: subtle,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-heading-lg)", color: headline, letterSpacing: "-0.5px", lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-sm)", color: muted, lineHeight: 1.4 }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px 80px" }}>

          {/* Challenge */}
          <section>
            <p style={{ margin: "0 0 16px", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-overline)", letterSpacing: "0.08em", textTransform: "uppercase", color: muted }}>
              {td("challengeHeading")}
            </p>
            <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-lg)", lineHeight: 1.75, color: text }}>
              {td("challengeBody")}
            </p>
          </section>

          {/* Solution */}
          <section>
            <p style={{ margin: "0 0 16px", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-overline)", letterSpacing: "0.08em", textTransform: "uppercase", color: muted }}>
              {td("solutionHeading")}
            </p>
            <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-lg)", lineHeight: 1.75, color: text }}>
              {td("solutionBody")}
            </p>
          </section>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: border, margin: "64px 0" }} />

        {/* Results */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{ margin: "0 0 32px", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-heading-md)", color: text }}>
            {td("resultsHeading")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {results.map(({ title, body }, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: subtle,
                  border: `1px solid ${border}`,
                  borderRadius: "16px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "28px" }}>{RESULT_ICONS[i]}</span>
                <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-body)", color: text, letterSpacing: "-0.2px" }}>{title}</p>
                <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body)", lineHeight: 1.65, color: muted }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div
          style={{
            backgroundColor: isDark ? "#0f1f3d" : "#eef4ff",
            borderLeft: `4px solid ${isDark ? "#4a90e2" : "#0148ae"}`,
            borderRadius: "0 16px 16px 0",
            padding: "36px 40px",
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              fontFamily: FONT,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "var(--fs-heading-sm)",
              lineHeight: 1.6,
              color: isDark ? "#c8dcf8" : "#011e5b",
              letterSpacing: "-0.2px",
            }}
          >
            &ldquo;{copy.quote}&rdquo;
          </p>
          <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-body-sm)", color: isDark ? "#6a9fd8" : "#0148ae" }}>
            {copy.author}
          </p>
        </div>
      </div>
    </div>
  );
}

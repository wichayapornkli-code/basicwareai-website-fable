"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setHeroTransition } from "@/lib/heroTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import { useDark } from "@/components/ThemeProvider";
import AccentWords from "@/components/anim/AccentWords";
import { useBreakpoint } from "@/hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const STAT_TARGETS = [
  { target: 85,  prefix: "+", suffix: "%" },
  { target: 300, prefix: "+", suffix: "%" },
  { target: 250, prefix: "+", suffix: "%" },
  { target: 400, prefix: "+", suffix: "%" },
];

function AnimatedStat({
  target,
  prefix,
  suffix,
  label,
  valueStyle,
  labelStyle,
}: {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  valueStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const proxy = { val: 0 };
    const tween = gsap.to(proxy, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = prefix + Math.round(proxy.val) + suffix;
      },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, prefix, suffix]);

  return (
    <div style={{ textAlign: "center" }}>
      <p ref={ref} style={valueStyle}>
        {prefix}0{suffix}
      </p>
      <p style={labelStyle}>{label}</p>
    </div>
  );
}

const FONT = '"Plus Jakarta Sans", sans-serif';

function CaseStudyCard({ study, locale }: { study: CaseStudy; locale: string }) {
  const [hovered, setHovered] = useState(false);
  const [mouseYFrac, setMouseYFrac] = useState(0.5);
  const router = useRouter();
  const { isDark } = useDark();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMouseYFrac(Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)));
  }

  // Half the approximate card height (logo 52 + gaps + 2 text lines ≈ 180px → 90px)
  const HALF_CARD = 90;

  return (
    <Link
      href={`/${locale}/success-stories/${study.id}`}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
      onClick={(e) => {
        e.preventDefault();
        if (imgRef.current) {
          const r = imgRef.current.getBoundingClientRect();
          setHeroTransition({ id: study.id, rect: { x: r.x, y: r.y, width: r.width, height: r.height } });
        }
        router.push(`/${locale}/success-stories/${study.id}`);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", cursor: "pointer" }}>
        {/* Image + hover overlay */}
        <div
          ref={imgWrapRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={handleMouseMove}
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            ref={imgRef}
            src={study.imageSrc}
            alt=""
            style={{
              height: study.imageHeight,
              width: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />

          {/* Testimonial overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(1,30,91,0.45) 0%, rgba(1,30,91,0.15) 100%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "20px",
                right: "20px",
                top: `clamp(${HALF_CARD}px, ${mouseYFrac * 100}%, calc(100% - ${HALF_CARD}px))`,
                transform: "translateY(-50%)",
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Logo avatar */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f4f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={study.logoSrc}
                  alt={study.logoAlt}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Quote */}
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.55,
                  color: "#141414",
                  letterSpacing: "-0.154px",
                }}
              >
                &ldquo;{study.quote}&rdquo;
              </p>

              {/* Attribution */}
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#141414",
                  letterSpacing: "-0.132px",
                }}
              >
                {study.author}
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <img
            src={study.logoSrc}
            alt={study.logoAlt}
            style={{
              height: study.logoHeight,
              width: "auto",
              opacity: 0.5,
              display: "block",
              alignSelf: "flex-start",
            }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              fontSize: "clamp(18px, 1.7vw, 28px)",
              lineHeight: 1.2,
              letterSpacing: "-0.264px",
              color: isDark ? "#90c0f0" : "#011e5b",
            }}
          >
            {study.shortHeadline}
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {study.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  border: "1px solid #b1b1b1",
                  borderRadius: "30px",
                  padding: "4px 16px",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#7c7c7c",
                  lineHeight: "normal",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SuccessStoriesPage() {
  const locale = useLocale();
  const t = useTranslations("successStories");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const fullCards = CASE_STUDIES.filter((s) => s.size === "full");
  const halfCards = CASE_STUDIES.filter((s) => s.size === "half");

  return (
    <div style={{ backgroundColor: isDark ? "#0d0d0d" : "#fff" }}>

      {/* ── "A few stories" intro ──────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 40px)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "clamp(20px, 3vw, 40px)",
        }}
      >
        <h2
          className="bw-display"
          style={{
            fontSize: "clamp(32px, 3.4vw, 52px)",
            flexShrink: 0,
          }}
        >
          <AccentWords text={t("sectionTitle")} />
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            width: isMobile ? "100%" : "365px",
            flexShrink: isMobile ? undefined : 0,
          }}
        >
          <p className="bw-eyebrow" style={{ color: "var(--c-accent)" }}>
            {t("sectionEyebrow")}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontSize: "clamp(16px, 1.4vw, 20px)",
              letterSpacing: "-0.22px",
              color: isDark ? "#a8d0f8" : "#011e5b",
              lineHeight: 1.5,
            }}
          >
            {t("sectionBody")}
          </p>
        </div>
      </div>

      {/* ── Case study cards ───────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 40px) clamp(60px, 7vw, 120px)",
          display: "flex",
          flexDirection: "column",
          gap: "36px",
        }}
      >
        <CaseStudyCard study={fullCards[0]} locale={locale} />

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "36px", alignItems: "flex-start" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "36px" }}>
            <CaseStudyCard study={halfCards[0]} locale={locale} />
            <CaseStudyCard study={halfCards[2]} locale={locale} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "36px" }}>
            <CaseStudyCard study={halfCards[1]} locale={locale} />
            <CaseStudyCard study={halfCards[3]} locale={locale} />
          </div>
        </div>

        <CaseStudyCard study={fullCards[1]} locale={locale} />
      </div>

      {/* ── The Results Speak ──────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: isDark ? "#0d0d0d" : "#fff",
          padding: "clamp(40px, 5vw, 80px) clamp(20px, 5vw, 40px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <h2
          className="bw-display"
          style={{
            fontSize: "clamp(28px, 3vw, 44px)",
            textAlign: "center",
          }}
        >
          <AccentWords text={t("resultsTitle")} />
        </h2>

        {/* 2×2 stat grid */}
        <div
          style={{
            backgroundColor: isDark ? "#1a1a1a" : "#f0f0f0",
            borderRadius: "32px",
            padding: "12px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            width: "100%",
            maxWidth: "867px",
            boxSizing: "border-box",
            minHeight: isMobile ? "auto" : "304px",
          }}
        >
          {/* Left column */}
          <div style={{ flex: "1 0 0", display: "flex", flexDirection: "column", gap: "14px" }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  flex: "1 0 0",
                  backgroundColor: isDark ? "#252525" : "#fff",
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f0f0f0",
                  borderRadius: "24px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedStat
                  target={STAT_TARGETS[i].target}
                  prefix={STAT_TARGETS[i].prefix}
                  suffix={STAT_TARGETS[i].suffix}
                  label={t(`stat${i + 1}Label`)}
                  valueStyle={{
                    margin: "0 0 0",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: "clamp(28px, 2.8vw, 40px)",
                    lineHeight: 1.5,
                    color: isDark ? "#e0e0e0" : "#141414",
                    letterSpacing: "-0.176px",
                  }}
                  labelStyle={{
                    margin: 0,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: isDark ? "#a0a0a0" : "#141414",
                    letterSpacing: "-0.176px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ flex: "1 0 0", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: "1 0 0",
                  backgroundColor: isDark ? "#252525" : "#fff",
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f0f0f0",
                  borderRadius: "24px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedStat
                  target={STAT_TARGETS[i].target}
                  prefix={STAT_TARGETS[i].prefix}
                  suffix={STAT_TARGETS[i].suffix}
                  label={t(`stat${i + 1}Label`)}
                  valueStyle={{
                    margin: 0,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: "clamp(28px, 2.8vw, 40px)",
                    lineHeight: 1.5,
                    color: isDark ? "#e0e0e0" : "#141414",
                    letterSpacing: "-0.176px",
                  }}
                  labelStyle={{
                    margin: 0,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: isDark ? "#a0a0a0" : "#141414",
                    letterSpacing: "-0.176px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA — video background ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: "80vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        >
          <source src="/assets/basicwarevideo.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(1, 11, 43, 0.6)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            textAlign: "center",
          }}
        >
          <p className="bw-eyebrow" style={{ color: "#ffab1b", marginBottom: "16px" }}>
            {t("ctaEyebrow")}
          </p>
          <h2
            className="bw-display"
            style={{
              margin: "0 0 32px",
              fontWeight: 600,
              fontSize: "clamp(32px, 4vw, 72px)",
              color: "#fff",
            }}
          >
            <AccentWords text={t("ctaTitle")} count={2} emStyle={{ color: "#6cb8ff" }} />
          </h2>
          <a
            href="#contact"
            className="bw-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#fff",
              borderRadius: "40px",
              padding: "16px 32px",
              textDecoration: "none",
              color: "#0d0d0d",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "-0.154px",
              whiteSpace: "nowrap",
            }}
          >
            {t("ctaButton")}
            <img src="/assets/arrow.svg" alt="" width={13} height={13} style={{ display: "block" }} />
          </a>
        </div>
      </div>
    </div>
  );
}

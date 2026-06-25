"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

type Solution = {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  ctaLabel: string;
  imageSrc: string;
  testimonialIconSrc: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  bulletsTitle: string;
  bullets: string[];
};

type SolutionCopy = Omit<Solution, "imageSrc" | "testimonialIconSrc">;

const SOLUTION_META = [
  {
    id: "token",
    imageSrc: "/assets/2_practice_01.avif",
    testimonialIconSrc: "/assets/solutions_01.png",
  },
  {
    id: "employees",
    imageSrc: "/assets/2_practice_02.avif",
    testimonialIconSrc: "/assets/solutions_01.png",
  },
  {
    id: "content",
    imageSrc: "/assets/2_practice_03.avif",
    testimonialIconSrc: "/assets/solutions_01.png",
  },
  {
    id: "education",
    imageSrc: "/assets/2_practice_04.avif",
    testimonialIconSrc: "/assets/solutions_01.png",
  },
  {
    id: "multicloud",
    imageSrc: "/assets/2_practice_05.avif",
    testimonialIconSrc: "/assets/solutions_01.png",
  },
];

type ResultCopy = {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
};

// ─── Animated stat number ─────────────────────────────────────────────────────

function AnimatedNumber({
  target,
  prefix,
  suffix,
  style,
}: {
  target: number;
  prefix: string;
  suffix: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const proxy = { val: 0 };
    const tween = gsap.to(proxy, {
      val: target,
      duration: 2,
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
    <p ref={ref} style={style}>
      {prefix}0{suffix}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const FONT = '"Plus Jakarta Sans", sans-serif';

export default function SolutionsPage() {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const locale = useLocale();
  const t = useTranslations("solutionsPage");
  const tStories = useTranslations("successStories");
  const [activeTab, setActiveTab] = useState(0);
  const solutions = (t.raw("solutions") as SolutionCopy[]).map((copy, index) => ({
    ...copy,
    ...SOLUTION_META[index],
  }));
  const results = t.raw("results") as ResultCopy[];
  const solution = solutions[activeTab];
  const imageLeft = activeTab % 2 === 1;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef(0);

  useEffect(() => {
    // Check viewport once at mount — never re-run on resize to avoid GSAP
    // pin conflicting with React's DOM reconciliation (removeChild crash)
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const next = Math.min(
            Math.floor(self.progress * solutions.length),
            solutions.length - 1
          );
          if (next !== activeTabRef.current) {
            activeTabRef.current = next;
            setActiveTab(next);
          }
        },
      });
    });

    const tabParam = new URLSearchParams(window.location.search).get("tab");
    if (tabParam !== null) {
      const tabIndex = Math.min(Math.max(parseInt(tabParam, 10) || 0, 0), solutions.length - 1);
      if (tabIndex > 0) {
        setTimeout(() => {
          const container = scrollContainerRef.current;
          if (!container) return;
          const containerTop = container.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: containerTop + tabIndex * window.innerHeight * 0.75, behavior: "instant" });
        }, 150);
      }
    }

    return () => ctx.revert();
  }, [solutions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ backgroundColor: isDark ? "#0d0d0d" : "#ffffff", overflowX: "hidden", position: "relative", zIndex: 20 }}>

      {/* ── Scroll container ─────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        style={{ height: isMobile ? "auto" : `${solutions.length * 75}vh` }}
      >
        <div
          ref={pinnedRef}
          style={{
            backgroundColor: isDark ? "#0d0d0d" : "#ffffff",
            height: isMobile ? "auto" : "100vh",
            width: "100%",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            paddingTop: isMobile ? "clamp(80px, 12vw, 120px)" : undefined,
            paddingBottom: isMobile ? "clamp(40px, 6vw, 60px)" : undefined,
            boxSizing: "border-box",
          }}
        >
          <div
            ref={innerRef}
            style={{
              maxWidth: 1080,
              width: "100%",
              margin: "0 auto",
              padding: "0 clamp(20px, 3vw, 40px)",
              boxSizing: "border-box",
            }}
          >
            {/* Section heading */}
            <h2
              className="bw-display"
              style={{
                margin: "0 0 clamp(20px, 2.5vw, 32px)",
                fontSize: "var(--fs-heading-lg)",
                textAlign: "center",
              }}
            >
              {t("headingBefore")} <em>{t("headingEm")}</em>
            </h2>

            {/* Pill tab nav (desktop) / dropdown (mobile) */}
            {isMobile ? (
              <div style={{ marginBottom: "clamp(12px, 1.5vw, 20px)", position: "relative" }}>
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 16px",
                    borderRadius: 8,
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e0e0e0"}`,
                    backgroundColor: isDark ? "#2a2a2a" : "#fff",
                    color: isDark ? "#e0e0e0" : "#141414",
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: "var(--fs-body)",
                    letterSpacing: "-0.22px",
                    appearance: "none",
                    WebkitAppearance: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {solutions.map((s, i) => (
                    <option key={s.id} value={i}>{s.title}</option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: isDark ? "#e0e0e0" : "#141414", fontSize: 12 }}>
                  ▾
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: "clamp(12px, 1.5vw, 20px)",
                }}
              >
                {solutions.map((s, i) => (
                  <button
                    key={s.id}
                    style={{
                      flex: "1 1 150px",
                      background: activeTab === i
                        ? (isDark ? "#e0e0e0" : "#191c26")
                        : (isDark ? "#2a2a2a" : "#fff"),
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 20px",
                      cursor: "default",
                      fontFamily: FONT,
                      fontWeight: activeTab === i ? 600 : 400,
                      fontSize: "var(--fs-body-sm)",
                      color: activeTab === i
                        ? (isDark ? "#191c26" : "#fff")
                        : (isDark ? "rgba(255,255,255,0.4)" : "rgba(25,28,38,0.4)"),
                      letterSpacing: "-0.22px",
                      whiteSpace: "normal",
                      transition: "background 0.2s ease, color 0.2s ease, font-weight 0.2s ease",
                    }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}

            {/* Card grid */}
            <div
              style={{
                backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
                borderRadius: 24,
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* Row 1: description + image (order alternates per product) */}
              <div style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : (imageLeft ? "row-reverse" : "row") }}>
                <div
                  style={{
                    flex: isMobile ? "0 0 100%" : "0 0 59%",
                    backgroundColor: isDark ? "#252525" : "#ffffff",
                    borderRadius: 20,
                    padding: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    justifyContent: "center",
                    minHeight: "clamp(200px, 22vw, 295px)",
                    boxSizing: "border-box",
                  }}
                >
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-heading-md)", letterSpacing: "-0.352px", color: isDark ? "#79b8ff" : "#318ff5", lineHeight: "normal" }}>
                    {solution.title}
                  </p>
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body)", letterSpacing: "-0.176px", color: isDark ? "#d0d0d0" : "#141414", lineHeight: "normal" }}>
                    {solution.shortDesc}
                  </p>
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-sm)", letterSpacing: "-0.176px", color: "#a9a9a9", lineHeight: "normal" }}>
                    {solution.longDesc}
                  </p>
                  <Link
                    href={`/${locale}/solutions/${solution.id}`}
                    style={{
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: "var(--fs-body-sm)",
                      color: isDark ? "#79b8ff" : "#0148ae",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      marginTop: "4px",
                    }}
                  >
                    {t("learnMore")}
                  </Link>
                </div>

                {!isMobile && (
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: isDark ? "#1e1e1e" : "#fff",
                      borderRadius: 20,
                      minHeight: "clamp(200px, 22vw, 295px)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={solution.imageSrc}
                      alt=""
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                )}
              </div>

              {/* Row 2: testimonial + bullets (order alternates per product) */}
              <div style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : (imageLeft ? "row-reverse" : "row") }}>
                {solution.testimonialQuote && (
                  <div
                    style={{
                      flex: isMobile ? "0 0 100%" : "0 0 38%",
                      backgroundColor: isDark ? "#252525" : "#ffffff",
                      borderRadius: 20,
                      padding: "40px 32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 24,
                      justifyContent: "center",
                      minHeight: "clamp(180px, 22vw, 295px)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div>
                      <p style={{ margin: "0 0 8px", fontFamily: FONT, fontStyle: "italic", fontWeight: 400, fontSize: "var(--fs-body-sm)", letterSpacing: "-0.176px", color: isDark ? "#c0c0c0" : "#141414", lineHeight: 1.5 }}>
                        {solution.testimonialQuote}
                      </p>
                      <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-body-sm)", letterSpacing: "-0.176px", color: isDark ? "#e0e0e0" : "#141414", lineHeight: 1.5 }}>
                        {solution.testimonialAuthor}
                      </p>
                    </div>
                  </div>
                )}

                <div
                  style={{
                    flex: 1,
                    backgroundColor: isDark ? "#252525" : "#ffffff",
                    borderRadius: 20,
                    padding: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    justifyContent: "center",
                    minHeight: "clamp(180px, 22vw, 295px)",
                    boxSizing: "border-box",
                  }}
                >
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-heading-sm)", letterSpacing: "-0.22px", color: isDark ? "#e0e0e0" : "#282828", lineHeight: "normal" }}>
                    {solution.bulletsTitle}
                  </p>
                  <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 4 }}>
                    {solution.bullets.map((b, i) => (
                      <li key={i} style={{ fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body)", letterSpacing: "-0.176px", color: isDark ? "#c0c0c0" : "#141414", lineHeight: "normal" }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Full-width CTA button */}
            <Link
              href={solution.id === "multicloud" ? `/${locale}/contact` : `/${locale}/solutions/${solution.id}`}
              className="bw-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor: isDark ? "#e0e0e0" : "#191c26",
                borderRadius: 40,
                padding: "16px 24px",
                textDecoration: "none",
                color: isDark ? "#191c26" : "#fff",
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: "var(--fs-heading-sm)",
                letterSpacing: "-0.22px",
                whiteSpace: "nowrap",
                marginTop: "clamp(8px, 1vw, 12px)",
              }}
            >
              {solution.ctaLabel}
              <img src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"} alt="" width={20} height={13} style={{ display: "block" }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── The Results Speak ───────────────────────────────────────── */}
      <div
        style={{
          padding: "clamp(48px, 6vw, 80px) 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          className="bw-display"
          style={{
            margin: "0 0 clamp(24px, 3vw, 40px)",
            fontSize: "var(--fs-heading-lg)",
            textAlign: "center",
          }}
        >
          {t("resultsHeadingBefore")} <em>{t("resultsHeadingEm")}</em>
        </h2>
        <div
          style={{
            backgroundColor: isDark ? "#1a1a1a" : "#f0f0f0",
            borderRadius: 32,
            padding: 12,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 12,
            height: isMobile ? "auto" : "clamp(260px, 28vw, 380px)",
            maxWidth: 900,
            width: "calc(100% - clamp(40px, 10vw, 80px))",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            {results.slice(0, 2).map((r) => (
              <div
                key={r.suffix + r.prefix + r.label}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#252525" : "#fff",
                  borderRadius: 24,
                  padding: "24px 40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f0f0f0",
                  textAlign: "center",
                }}
              >
                <AnimatedNumber target={r.target} prefix={r.prefix} suffix={r.suffix} style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-heading-lg)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#e0e0e0" : "#141414" }} />
                <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-sm)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#a0a0a0" : "#141414" }}>{r.label}</p>
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: isDark ? "#252525" : "#fff",
              borderRadius: 24,
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f0f0f0",
              textAlign: "center",
            }}
          >
            <AnimatedNumber target={results[2].target} prefix={results[2].prefix} suffix={results[2].suffix} style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-heading-lg)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#e0e0e0" : "#141414" }} />
            <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-sm)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#a0a0a0" : "#141414", maxWidth: 254 }}>{results[2].label}</p>
          </div>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}>
          <source src="/assets/basicwarevideo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #ffffff, #003B63)", mixBlendMode: "screen" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center", maxWidth: 567, padding: "0 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
            <p className="bw-eyebrow" style={{ color: "#ffab1b", justifyContent: "center" }}>{tStories("ctaEyebrow")}</p>
            <h2 className="bw-display" style={{ fontWeight: 600, fontSize: "var(--fs-heading-xl)", color: isDark ? "#e8e8e8" : "#141414" }}>
              {t("ctaTitleBefore")} <em style={{ color: "inherit" }}>{t("ctaTitleEm")}</em>
            </h2>
          </div>
          <Link href={`/${locale}/contact`} className="bw-btn" style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "#141414", borderRadius: 40, padding: "16px 32px", textDecoration: "none", color: "#fff", fontFamily: FONT, fontWeight: 500, fontSize: "var(--fs-body-sm)", letterSpacing: "-0.154px", whiteSpace: "nowrap" }}>
            {tStories("ctaButton")}
            <img src="/assets/arrow-white.svg" alt="" width={13} height={13} style={{ display: "block" }} />
          </Link>
        </div>
      </section>
    </div>
  );
}

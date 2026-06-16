"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
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
  imageSrc: string;
  testimonialIconSrc: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  bulletsTitle: string;
  bullets: string[];
};

const SOLUTIONS: Solution[] = [
  {
    id: "token",
    title: "Centralized Token Control",
    shortDesc:
      "One gateway to the world's top AI models. Connect once, switch freely, scale without limits.",
    longDesc:
      "It aggregates mainstream domestic and overseas large language models including GPT, Gemini, Doubao, Qwen, Claude and DeepSeek in one stop. As one of the first overseas enterprises licensed for Seedance 2.0, we deliver enterprise-grade security, real-time cost analytics and flexible multi-cloud billing solutions, significantly cutting enterprises' expenses on multi-model integration, procurement and operation & maintenance.",
    imageSrc: "/assets/2_practice_01.png",
    testimonialIconSrc: "/assets/solutions_01.png",
    testimonialQuote:
      '"Basicware\'s AI solutions transformed our business. Their team\'s expertise and cutting-edge technology helped us achieve unprecedented growth and efficiency."',
    testimonialAuthor: "— Anya Sharma, CEO of StellarTech",
    bulletsTitle: "What you get:",
    bullets: [
      "One API, instant access to 10+ leading global AI models",
      "Cost Reduction & Efficiency Boost: Gain access to all models with a single integration, eliminating cumbersome multi-platform connection procedures and slashing months of development work down to just a few days",
      "Unified billing and real-time cost monitoring across your whole team",
      "Enterprise-grade security — end-to-end encryption, tiered permissions, full audit trail",
      "Direct supply from cloud providers — no data collected from your conversations",
    ],
  },
  {
    id: "employees",
    title: "AI Digital Employees",
    shortDesc:
      "Your teams spend too much time on tasks that don't need a human. OpenClaw deploys AI digital employees that operate around the clock.",
    longDesc:
      "Built for enterprises, this large-scale AI collaborative system supports one-click deployment of AI work nodes and is compatible with various collaboration platforms including Lark, WhatsApp and WeChat. Equipped with enterprise-level permission control, API key management and cost monitoring functions, it can generate digital employees for multiple roles such as marketing, customer service, sales, R&D, operation & maintenance and knowledge management. It enables 24/7 automated office operations and improves organizational collaboration efficiency.",
    imageSrc: "/assets/2_practice_02.png",
    testimonialIconSrc: "/assets/solutions_01.png",
    testimonialQuote:
      '"OpenClaw\'s AI agents handled our customer support overnight. Response time dropped from hours to seconds, and satisfaction scores climbed 85%."',
    testimonialAuthor: "— Operations Lead, Gaming Co.",
    bulletsTitle: "Roles available:",
    bullets: [
      "Brand Marketing — content scheduling, social media monitoring, campaign reporting",
      "Customer Support — 24/7 multilingual responses, smart human handoff",
      "Sales Assistant — lead follow-up, meeting scheduling, quote generation",
      "HR — resume screening, onboarding, employee records",
      "Finance — document verification, monthly closing, tax filing",
    ],
  },
  {
    id: "content",
    title: "AI Content & Growth",
    shortDesc:
      "Marketing teams are under pressure to produce more — faster, in more formats, across more channels than ever.",
    longDesc:
      "We maintain deep integration with ByteDance's Douyin, TikTok and VolcEngine. Powered by AIGC technology, we mass-produce marketing assets including copywriting, images, short videos and virtual live streamers. Intelligent data algorithms enable targeted ad placement, user insight analysis and private domain operations, helping brands, e-commerce merchants and cross-border businesses cut costs, boost efficiency and lift GMV.",
    imageSrc: "/assets/2_practice_03.png",
    testimonialIconSrc: "/assets/solutions_01.png",
    testimonialQuote:
      '"Our TikTok account went from 3,000 to 63,200 followers in a single month. 40x growth we couldn\'t have achieved without Basicware."',
    testimonialAuthor: "— Marketing Director, Hospitality Brand",
    bulletsTitle: "What we deliver:",
    bullets: [
      "AI Copywriting — marketing copy, ad headlines, product descriptions, social posts",
      "AI Image Generation — ad creatives and visual content, produced in hours not weeks",
      "AI Video Production — automated editing, dynamic content generation",
      "Digital Avatar Broadcast — virtual presenters with multi-language support",
      "TikTok & Douyin Growth — end-to-end short-video strategy and performance optimization",
    ],
  },
  {
    id: "education",
    title: "AI Education",
    shortDesc:
      "AI adoption fails when teams don't know how to use it. We help organizations close that gap.",
    longDesc:
      "Build an AI talent cultivation system covering the Asia-Pacific region. We have launched an authoritative AI certification system in partnership with BytePlus (ByteDance) and Pearson. Cooperating with universities and local governments in Hong Kong, Macao and Southeast Asia, we provide online and offline training programs to build standardized pathways for AI talent development and continuously supply skilled professionals to the industry.",
    imageSrc: "/assets/2_practice_04.png",
    testimonialIconSrc: "/assets/solutions_01.png",
    testimonialQuote:
      '"The certification gave our team a competitive edge. Recognized across the region and valued by every enterprise client we approached."',
    testimonialAuthor: "— Head of Training, University Partner",
    bulletsTitle: "What's included:",
    bullets: [
      "Online courses — AI skill training accessible to teams across geographies",
      "Offline courses & assessments — in-person instruction delivered through regional partnerships",
      "AI Engineer Certification — co-certified by TikTok and Pearson, recognized by governments and enterprises across the region",
      "Issued exclusively in joint cooperation with top-tier platforms and globally authoritative institutions, the certification carries high industry value",
    ],
  },
  {
    id: "multicloud",
    title: "Multi-Cloud Computing Platform",
    shortDesc:
      "Unify global multi-cloud resources to build an elastic, unified computing foundation, delivering stable and reliable computing power for full-scenario AI applications.",
    longDesc:
      "We integrate resources from five major global cloud vendors including Alibaba Cloud, Tencent Cloud, AWS and Huawei Cloud to build a stable and elastic unified computing infrastructure, delivering highly reliable computing power to all types of AI applications.",
    imageSrc: "/assets/2_practice_05.png",
    testimonialIconSrc: "/assets/solutions_01.png",
    testimonialQuote: "",
    testimonialAuthor: "",
    bulletsTitle: "Core Advantages:",
    bullets: [
      "Aggregate mainstream global cloud ecosystems with full resource coverage and flexible scheduling",
      "Multi-cloud redundant architecture ensures stable operation and high availability",
      "Unified operation and management drastically cut enterprises' costs on computing resource procurement and maintenance",
    ],
  },
];

const RESULTS = [
  { target: 40, prefix: "", suffix: "x", label: "audience growth for a hospitality brand" },
  { target: 4, prefix: "$", suffix: "M", label: "in new revenue for a gaming company" },
  { target: 300, prefix: "", suffix: "%", label: "increased operational efficiency across industries" },
];

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
  const [activeTab, setActiveTab] = useState(0);
  const solution = SOLUTIONS[activeTab];
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
            Math.floor(self.progress * SOLUTIONS.length),
            SOLUTIONS.length - 1
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
      const tabIndex = Math.min(Math.max(parseInt(tabParam, 10) || 0, 0), SOLUTIONS.length - 1);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ backgroundColor: isDark ? "#0d0d0d" : "#ffffff", overflowX: "hidden", position: "relative", zIndex: 20 }}>

      {/* ── Scroll container ─────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        style={{ height: isMobile ? "auto" : `${SOLUTIONS.length * 75}vh` }}
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
                fontSize: "clamp(32px, 3.4vw, 52px)",
                textAlign: "center",
              }}
            >
              Five ways <em>we help</em>
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
                    fontSize: "15px",
                    letterSpacing: "-0.22px",
                    appearance: "none",
                    WebkitAppearance: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {SOLUTIONS.map((s, i) => (
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
                  flexWrap: "nowrap",
                  gap: 8,
                  marginBottom: "clamp(12px, 1.5vw, 20px)",
                }}
              >
                {SOLUTIONS.map((s, i) => (
                  <button
                    key={s.id}
                    style={{
                      flex: 1,
                      background: activeTab === i
                        ? (isDark ? "#e0e0e0" : "#191c26")
                        : (isDark ? "#2a2a2a" : "#fff"),
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 20px",
                      cursor: "default",
                      fontFamily: FONT,
                      fontWeight: activeTab === i ? 600 : 400,
                      fontSize: "clamp(11px, 1vw, 14px)",
                      color: activeTab === i
                        ? (isDark ? "#191c26" : "#fff")
                        : (isDark ? "rgba(255,255,255,0.4)" : "rgba(25,28,38,0.4)"),
                      letterSpacing: "-0.22px",
                      whiteSpace: "nowrap",
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
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(18px, 2vw, 32px)", letterSpacing: "-0.352px", color: isDark ? "#79b8ff" : "#318ff5", lineHeight: "normal" }}>
                    {solution.title}
                  </p>
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 16px)", letterSpacing: "-0.176px", color: isDark ? "#d0d0d0" : "#141414", lineHeight: "normal" }}>
                    {solution.shortDesc}
                  </p>
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 16px)", letterSpacing: "-0.176px", color: "#a9a9a9", lineHeight: "normal" }}>
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
                      fontSize: "clamp(12px, 1vw, 14px)",
                      color: isDark ? "#79b8ff" : "#0148ae",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      marginTop: "4px",
                    }}
                  >
                    Learn more →
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
                      <p style={{ margin: "0 0 8px", fontFamily: FONT, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 16px)", letterSpacing: "-0.176px", color: isDark ? "#c0c0c0" : "#141414", lineHeight: 1.5 }}>
                        {solution.testimonialQuote}
                      </p>
                      <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(12px, 1.1vw, 16px)", letterSpacing: "-0.176px", color: isDark ? "#e0e0e0" : "#141414", lineHeight: 1.5 }}>
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
                  <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(14px, 1.4vw, 20px)", letterSpacing: "-0.22px", color: isDark ? "#e0e0e0" : "#282828", lineHeight: "normal" }}>
                    {solution.bulletsTitle}
                  </p>
                  <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 4 }}>
                    {solution.bullets.map((b, i) => (
                      <li key={i} style={{ fontFamily: FONT, fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 16px)", letterSpacing: "-0.176px", color: isDark ? "#c0c0c0" : "#141414", lineHeight: "normal" }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Full-width Read more button */}
            <Link
              href={`/${locale}/solutions/${solution.id}`}
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
                fontSize: "clamp(16px, 1.4vw, 20px)",
                letterSpacing: "-0.22px",
                whiteSpace: "nowrap",
                marginTop: "clamp(8px, 1vw, 12px)",
              }}
            >
              Read more
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
            fontSize: "clamp(30px, 3.2vw, 48px)",
            textAlign: "center",
          }}
        >
          The results <em>speak</em>
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
            {RESULTS.slice(0, 2).map((r) => (
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
                <AnimatedNumber target={r.target} prefix={r.prefix} suffix={r.suffix} style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(28px, 2.8vw, 40px)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#e0e0e0" : "#141414" }} />
                <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 16px)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#a0a0a0" : "#141414" }}>{r.label}</p>
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
            <AnimatedNumber target={RESULTS[2].target} prefix={RESULTS[2].prefix} suffix={RESULTS[2].suffix} style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(28px, 2.8vw, 40px)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#e0e0e0" : "#141414" }} />
            <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 16px)", lineHeight: 1.5, letterSpacing: "-0.176px", color: isDark ? "#a0a0a0" : "#141414", maxWidth: 254 }}>{RESULTS[2].label}</p>
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
            <p className="bw-eyebrow" style={{ color: "#ffab1b", justifyContent: "center" }}>Next</p>
            <h2 className="bw-display" style={{ fontWeight: 600, fontSize: "clamp(34px, 4vw, 60px)", color: isDark ? "#e8e8e8" : "#141414" }}>
              Let&apos;s find your fastest path to <em style={{ color: "inherit" }}>AI growth</em>
            </h2>
          </div>
          <a href="#contact" className="bw-btn" style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "#141414", borderRadius: 40, padding: "16px 32px", textDecoration: "none", color: "#fff", fontFamily: FONT, fontWeight: 500, fontSize: "14px", letterSpacing: "-0.154px", whiteSpace: "nowrap" }}>
            Talk to us
            <img src="/assets/arrow-white.svg" alt="" width={13} height={13} style={{ display: "block" }} />
          </a>
        </div>
      </section>
    </div>
  );
}

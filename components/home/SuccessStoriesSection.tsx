"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import Reveal from "@/components/anim/Reveal";
import ClientLogoMarquee from "@/components/home/ClientLogoMarquee";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { getContentLocaleKey } from "@/lib/locale";

const FONT = '"Plus Jakarta Sans", sans-serif';

type Card = {
  quote: string;
  author: string;
  role: string;
  flag: string;
  photo: string;
  stats: { value: string; label: string }[];
};

const CARDS_EN: Card[] = [
  {
    quote:
      "A Hong Kong enterprise's HR system was built to record. We rebuilt it to think. Together we shipped an agent layer that reads policy, drafts decisions, and surfaces edge cases before they become escalations — deployed across HQ and three regional offices in 11 weeks.",
    author: "HR Technology Company",
    role: "Thailand",
    flag: "🇹🇭",
    photo: "/assets/2_success_home.png",
    stats: [
      { value: "+400%", label: "Operational Efficiency" },
      { value: "11 wks", label: "Time to Deploy" },
      { value: "4", label: "Offices Covered" },
    ],
  },
  {
    quote:
      "Kotler Impact has entered into a strategic collaboration with ByteDance and Basicware AI to jointly launch AI FIRST — a transformative global initiative to deliver accessible, practical and high-value AI education to people of all ages, backgrounds and proficiency levels across the globe.",
    author: "Kotler Impact",
    role: "Asia",
    flag: "🌏",
    photo: "/assets/2_success_home_a.png",
    stats: [
      { value: "10+", label: "Countries" },
      { value: "3", label: "Founding Partners" },
      { value: "AI FIRST", label: "Global Programme" },
    ],
  },
  {
    quote:
      "We provide end-to-end services for enterprises to build exclusive AI digital employee avatars for over 50 core staff members. Through full-cycle data monitoring and AI intelligent analytics, we accurately assess employees' adaptability to the AI era, delivering actionable decision-making support for large-scale AI rollouts.",
    author: "Local State-owned Enterprise",
    role: "Mainland China",
    flag: "🇨🇳",
    photo: "/assets/2_success_home_b.png",
    stats: [
      { value: "50+", label: "Staff Served" },
      { value: "24/7", label: "AI Operations" },
      { value: "3 mo", label: "Full Rollout" },
    ],
  },
];

const CARDS_ZH: Card[] = [
  {
    quote:
      "香港某企业的原有人力资源系统仅用于数据记录，而我们对其完成了智能化重构。双方联合搭建智能代理层，可自动解读制度规章、拟定处理方案，并提前识别潜在异常问题，避免事态升级。整套方案历时 11 周，完成总部及三大区域办事处的全面落地部署。",
    author: "人力资源科技企业",
    role: "泰国",
    flag: "🇹🇭",
    photo: "/assets/2_success_home.png",
    stats: [
      { value: "+400%", label: "运营效率提升" },
      { value: "11 周", label: "完成交付" },
      { value: "4", label: "覆盖办公室" },
    ],
  },
  {
    quote:
      "享誉全球的世界营销峰会主办机构 Kotler Impact 集团与 TikTok 母公司字节跳动、Basicware AI 达成战略合作，共同推出全球变革性项目「AI 先行计划（AI FIRST）」，旨在让全球不同年龄、不同背景、不同专业水平的人群都能接触到实用、高价值的人工智能教育。",
    author: "Kotler Impact",
    role: "亚洲",
    flag: "🌏",
    photo: "/assets/2_success_home_a.png",
    stats: [
      { value: "10+", label: "覆盖国家/地区" },
      { value: "3", label: "核心创始合作方" },
      { value: "AI 先行计划", label: "全球项目" },
    ],
  },
  {
    quote:
      "为企业 50 余名核心人员提供专属 AI 数字员工分身搭建的全流程服务。帮助企业员工快速搭建适配自身工作的专属 AI 数字分身，实现全场景工作提效；同时通过全周期数据监测与 AI 智能分析，精准评估企业员工适配 AI 时代的能力，为后续规模化 AI 部署提供可落地的决策依据。",
    author: "国有烟草企业",
    role: "中国大陆",
    flag: "🇨🇳",
    photo: "/assets/2_success_home_b.png",
    stats: [
      { value: "50+", label: "服务员工人数" },
      { value: "7×24", label: "AI 自动化运营" },
      { value: "3 月", label: "全面落地周期" },
    ],
  },
];

const CARDS_ZH_TW: Card[] = [
  {
    quote:
      "香港某企業的原有人力資源系統僅用於數據記錄，而我們對其完成了智能化重構。雙方聯合搭建智能代理層，可自動解讀制度規章、擬定處理方案，並提前識別潛在異常問題，避免事態升級。整套方案歷時 11 周，完成總部及三大區域辦事處的全面落地部署。",
    author: "人力資源科技企業",
    role: "泰國",
    flag: "🇹🇭",
    photo: "/assets/2_success_home.png",
    stats: [
      { value: "+400%", label: "運營效率提升" },
      { value: "11 周", label: "完成交付" },
      { value: "4", label: "覆蓋辦公室" },
    ],
  },
  {
    quote:
      "享譽全球的世界營銷峰會主辦機構 Kotler Impact 集團與 TikTok 母公司字節跳動、Basicware AI 達成戰略合作，共同推出全球變革性項目「AI 先行計劃（AI FIRST）」，旨在讓全球不同年齡、不同背景、不同專業水平的人群都能接觸到實用、高價值的人工智能教育。",
    author: "Kotler Impact",
    role: "亞洲",
    flag: "🌏",
    photo: "/assets/2_success_home_a.png",
    stats: [
      { value: "10+", label: "覆蓋國家/地區" },
      { value: "3", label: "核心創始合作方" },
      { value: "AI 先行計劃", label: "全球項目" },
    ],
  },
  {
    quote:
      "為企業 50 餘名核心人員提供專屬 AI 數字員工分身搭建的全流程服務。幫助企業員工快速搭建適配自身工作的專屬 AI 數字分身，實現全場景工作提效；同時通過全週期數據監測與 AI 智能分析，精準評估企業員工適配 AI 時代的能力，為後續規模化 AI 部署提供可落地的決策依據。",
    author: "國有煙草企業",
    role: "中國大陸",
    flag: "🇨🇳",
    photo: "/assets/2_success_home_b.png",
    stats: [
      { value: "50+", label: "服務員工人數" },
      { value: "7×24", label: "AI 自動化運營" },
      { value: "3 月", label: "全面落地週期" },
    ],
  },
];

const SECTION_COPY = {
  en: {
    eyebrow: "Success stories",
    title: "Trusted by the best",
    subtitle:
      "From government to gaming, education to e-commerce. We've co-built with partners in Hong Kong, ASEAN and beyond.",
  },
  zh: {
    eyebrow: "成功案例",
    title: "获得行业领军者的信赖",
    subtitle:
      "从政府到游戏，从教育到电商。我们与香港、东南亚及更广泛地区的合作伙伴共同打造解决方案。",
  },
  zhTw: {
    eyebrow: "成功案例",
    title: "獲得行業領軍者的信賴",
    subtitle:
      "從政府到遊戲，從教育到電商。我們與香港、東南亞及更廣泛地區的合作伙伴共同打造解決方案。",
  },
};

type CardBodyProps = {
  card: Card;
  isMobile: boolean;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  statDivider: string;
};

function SuccessStoryCardBody({
  card,
  isMobile,
  textPrimary,
  textSecondary,
  borderColor,
  statDivider,
}: CardBodyProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: isMobile ? "28px 24px" : "40px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "32px",
            minWidth: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "var(--fs-body-lg)",
              lineHeight: 1.6,
              letterSpacing: "-0.18px",
              color: textPrimary,
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "9.6em",
            }}
          >
            &ldquo;{card.quote}&rdquo;
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "var(--fs-body-sm)",
                  letterSpacing: "-0.132px",
                  color: textPrimary,
                }}
              >
                {card.author}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "var(--fs-body-sm)",
                  letterSpacing: "-0.132px",
                  color: textSecondary,
                }}
              >
                {card.role}
              </p>
            </div>
            <span style={{ fontSize: "24px", lineHeight: 1 }}>{card.flag}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        {card.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "clamp(20px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              borderRight: i < card.stats.length - 1 ? `1px solid ${statDivider}` : "none",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-heading-md)",
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
                color: textPrimary,
                textAlign: "center",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: "var(--fs-body-sm)",
                lineHeight: 1.5,
                letterSpacing: "-0.132px",
                color: textSecondary,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default function SuccessStoriesSection() {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const locale = useLocale();
  const localeKey = getContentLocaleKey(locale);
  const CARDS =
    localeKey === "zh" ? CARDS_ZH : localeKey === "zhTw" ? CARDS_ZH_TW : CARDS_EN;
  const copy = SECTION_COPY[localeKey];

  const [activeIndex, setActiveIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState<number | undefined>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const bg = isDark ? "#111111" : "#f9f9f9";
  const cardBg = isDark ? "#1a1a1a" : "#ffffff";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e9e9e9";
  const statDivider = isDark ? "rgba(255,255,255,0.08)" : "#f0f0f0";
  const textPrimary = isDark ? "#e0e0e0" : "#141414";
  const textSecondary = isDark ? "#a0a0a0" : "rgba(20,20,20,0.4)";

  const cardBodyProps = {
    isMobile,
    textPrimary,
    textSecondary,
    borderColor,
    statDivider,
  };

  useLayoutEffect(() => {
    const measure = () => {
      const root = measureRef.current;
      if (!root) return;
      const cards = root.querySelectorAll("[data-measure-card]");
      let max = 0;
      cards.forEach((el) => {
        max = Math.max(max, (el as HTMLElement).offsetHeight);
      });
      if (max > 0) setStageHeight(max);
    };

    measure();

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, [CARDS, isMobile, isDark, locale]);

  useEffect(() => {
    setActiveIndex(0);
    const card = cardRef.current;
    if (card) gsap.set(card, { opacity: 1, y: 0 });
  }, [locale]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const id = setInterval(() => {
      const card = cardRef.current;
      if (!card) return;

      if (prefersReducedMotion) {
        setActiveIndex((i) => (i + 1) % CARDS.length);
        return;
      }

      gsap.to(card, {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex((i) => (i + 1) % CARDS.length);
          gsap.fromTo(
            card,
            { opacity: 0, y: -14 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          );
        },
      });
    }, 5000);
    return () => clearInterval(id);
  }, [CARDS.length]);

  const card = CARDS[activeIndex];

  const measureShellStyle: React.CSSProperties = {
    backgroundColor: cardBg,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: isDark ? "0 2px 24px rgba(0,0,0,0.4)" : "0 2px 24px rgba(0,0,0,0.06)",
  };

  const cardShellStyle: React.CSSProperties = {
    ...measureShellStyle,
    ...(stageHeight ? { minHeight: stageHeight } : {}),
  };

  return (
    <section style={{ backgroundColor: bg }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "14px",
          padding: "clamp(60px, 6vw, 102px) clamp(20px, 5vw, 40px) 0",
        }}
      >
        <p className="bw-eyebrow">{copy.eyebrow}</p>
        <Reveal
          as="h2"
          className="bw-display"
          style={{ fontSize: "var(--fs-heading-xl)", lineHeight: 1.08 }}
        >
          {localeKey === "en" ? <>{copy.title.split("the best")[0]}<em>the best</em></> : copy.title}
        </Reveal>
        <Reveal
          as="p"
          mode="fade"
          delay={0.15}
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "var(--fs-body)",
            letterSpacing: "-0.176px",
            lineHeight: 1.6,
            color: "var(--c-text-muted)",
            maxWidth: "478px",
          }}
        >
          {copy.subtitle}
        </Reveal>
      </div>

      {/* ── Rotating card ──────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "774px",
          margin: "clamp(32px, 4vw, 48px) auto 0",
          padding: "0 clamp(20px, 5vw, 40px)",
          boxSizing: "content-box",
          position: "relative",
        }}
      >
        {/* Off-screen measurement of all slides */}
        <div
          ref={measureRef}
          aria-hidden
          style={{
            visibility: "hidden",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          {CARDS.map((c, i) => (
            <div key={i} data-measure-card style={measureShellStyle}>
              <SuccessStoryCardBody card={c} {...cardBodyProps} />
            </div>
          ))}
        </div>

        <div style={{ minHeight: stageHeight }}>
          <div ref={cardRef} style={cardShellStyle}>
            <SuccessStoryCardBody card={card} {...cardBodyProps} />
          </div>
        </div>
      </div>

      {/* ── Logo scroller ───────────────────────────────────────────── */}
      <ClientLogoMarquee
        durationSec={36}
        grayscale
        opacity={{ light: 0.5, dark: 0.45 }}
        edgeFadeColor={bg}
        contained
      />
    </section>
  );
}

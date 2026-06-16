"use client";

import Link from "next/link";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const FONT = '"Plus Jakarta Sans", sans-serif';

const STATS = [
  { en: "21 Billion", zh: "210亿", labelEn: "Free AI Tokens", labelZh: "免费 AI Token" },
  { en: "3HK × Alibaba Cloud", zh: "和记电讯 × 阿里云", labelEn: "Strategic Partners", labelZh: "战略合作伙伴" },
  { en: "70+", zh: "70+", labelEn: "Global LLMs", labelZh: "全球主流大模型" },
  { en: "21,000", zh: "21,000个", labelEn: "Invitation codes", labelZh: "邀请码" },
];

const MACRO_EN = [
  {
    title: "Explosive uptake of Generative AI",
    body: "Global AI consumption is surging. Asia's share of worldwide LLM usage has jumped sharply from 13% to 31%. As the international commercial gateway of the Greater Bay Area (GBA), Hong Kong stands out as a key growth market for AI adoption among enterprises and individual users alike.",
  },
  {
    title: "Strategic repositioning of telecom operators",
    body: "Driven by mainstream AI consumption, telecom operators worldwide are actively pivoting from connectivity-only services to AI service platforms. Embedding AI capabilities directly into monthly tariff ecosystems has become a core value-added strategy to lift ARPU and boost subscriber loyalty.",
  },
  {
    title: "Core logic of AI Token monetisation",
    body: "Operators are not required to develop underlying large language models in-house. Distributing AI Tokens enables them to deliver cutting-edge AI computing power to subscribers, which simultaneously lifts Average Revenue Per User (ARPU) and strengthens customer retention.",
  },
  {
    title: "Policy support from the HKSAR Government",
    body: "The Government allocated HK$50 million in the 2026–27 Budget to roll out the \"AI for All\" initiative, signalling that AI popularisation is a core policy priority for Hong Kong. Demand for AI tools among enterprises continues to rise rapidly.",
  },
];

const MACRO_ZH = [
  {
    title: "生成式AI爆发式普及",
    body: "全球AI使用量急速攀升，亚洲LLM消费占全球份额已从13%大幅增至31%，香港作为大湾区（GBA）的国际商业桥头堡，正成为企业及个人AI使用的重要增长市场。",
  },
  {
    title: "电讯商的战略再定位",
    body: "随着AI消费普及，全球电讯业正积极探索从「连线服务」转型为「AI服务平台」，把AI能力直接嵌入月费生态，成为提升ARPU、加强订户黏性的核心增值策略。",
  },
  {
    title: "AI Token货币化的核心逻辑",
    body: "运营商毋须自研底层大模型，只需透过AI Token分发，即可为订户提供最前沿的AI算力，既提升ARPU（每用户平均收益），又巩固客户黏性。",
  },
  {
    title: "香港特区政府政策加持",
    body: "政府于2026-27年财政预算案拨款5,000万港元推动「全民AI」计划，显示香港AI普及化已成施政重点；企业对AI工具采纳的需求持续升温。",
  },
];

export default function PressRelease3HK({ locale }: { locale: string }) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const isZh = locale === "zh";

  const bg = isDark ? "#0d0d0d" : "#fff";
  const text = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";
  const subtle = isDark ? "#1a1a1a" : "#f5f5f7";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const accent = "#0148ae";

  const macroPoints = isZh ? MACRO_ZH : MACRO_EN;

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>

      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: accent,
          padding: isMobile
            ? "120px 24px 48px"
            : "140px clamp(40px, 6vw, 80px) 64px",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            className="bw-eyebrow"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {isZh ? "· 新闻稿 ·" : "· Press Release ·"}
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: isMobile ? "clamp(28px, 6vw, 40px)" : "clamp(36px, 4vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            {isZh
              ? "和記電訊香港與Basicware AI達成戰略性聯盟\n攜手阿里雲　引領全港電訊業踏入AI Token新紀元"
              : "Hutchison Telecom and Basicware AI Form Strategic Alliance with Alibaba Cloud"}
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.02em",
            }}
          >
            {isZh ? "香港，2026年6月17日" : "Hong Kong, 17 June 2026"}
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile
            ? "40px 24px 80px"
            : "clamp(48px, 6vw, 80px) clamp(40px, 6vw, 80px) clamp(80px, 9vw, 140px)",
        }}
      >
        {/* Back */}
        <Link
          href={`/${locale}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "14px",
            color: muted,
            textDecoration: "none",
            marginBottom: "48px",
          }}
        >
          {isZh ? "← 返回首页" : "← Back to home"}
        </Link>

        {/* Stats strip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "48px",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: accent,
                borderRadius: "40px",
                padding: "10px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(14px, 1.2vw, 17px)", color: "#fff", whiteSpace: "nowrap" }}>
                {isZh ? s.zh : s.en}
              </span>
              <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: "11px", color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                {isZh ? s.labelZh : s.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* Highlights strip */}
        <div
          style={{
            backgroundColor: subtle,
            border: `1px solid ${border}`,
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "40px",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "13px",
            color: accent,
            letterSpacing: "0.01em",
            lineHeight: 1.8,
          }}
        >
          {isZh
            ? "全港首創　｜　歷史性戰略聯盟　｜　210億AI Token　｜　70+大全球主流大模型　｜　21,000個邀請碼"
            : "Hong Kong's First · Groundbreaking Strategic Alliance · 21 Billion AI Tokens · 70+ Global LLMs · 21,000 Invitation Codes"}
        </div>

        {/* Lead paragraph */}
        <p
          style={{
            margin: "0 0 32px",
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.75,
            color: text,
            letterSpacing: "-0.01em",
          }}
        >
          {isZh
            ? "和記電訊旗下和記電話有限公司（「3HK」及「3SUPREME」）今日宣佈，與AI科技公司Basicware AI Limited（下稱「Basicware AI」）及阿里雲（Alibaba Cloud）達成戰略合作，成為全港首家推出AI Token訂戶計劃的電訊商。是次合作獲阿里雲及Basicware AI聯合贊助合共210億個免費AI Token：阿里雲贊助110億AI Token；Basicware AI加碼贊助100億個平台Token。符合資格的3HK及3SUPREME訂戶可免費獲得邀請碼，透過BasicRouter平台（basicrouter.ai）按需存取全球70+大主流大型語言模型（LLM），切實體驗人工智能帶來的生產力提升。"
            : "Hutchison Telephone Company Limited (branded as 3HK and 3SUPREME), a subsidiary of Hutchison Telecommunications Hong Kong Holdings Limited (Stock Code: 215), today announced a strategic partnership with AI technology firm Basicware AI Limited (“Basicware AI”) and Alibaba Cloud. It becomes Hong Kong’s first telecom operator to launch an AI Token programme for subscribers. Alibaba Cloud and Basicware AI jointly sponsor a total of 21 billion complimentary AI Tokens: Alibaba Cloud provides 11 billion AI Tokens, while Basicware AI contributes an additional 10 billion platform Tokens. Eligible 3HK and 3SUPREME subscribers can obtain invitation codes free of charge. Via the BasicRouter platform (basicrouter.ai), users gain on-demand access to over 70 leading global Large Language Models (LLMs), allowing them to tangibly experience productivity gains powered by artificial intelligence."}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: border, margin: "40px 0" }} />

        {/* Macro outlook */}
        <h2
          style={{
            margin: "0 0 32px",
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: "clamp(20px, 2vw, 28px)",
            letterSpacing: "-0.02em",
            color: text,
          }}
        >
          {isZh ? "宏观视野：电讯业的AI平台转型时代" : "Macro Outlook: The Era of AI Platform Transformation for the Telecom Sector"}
        </h2>

        <p
          style={{
            margin: "0 0 28px",
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.75,
            color: muted,
          }}
        >
          {isZh
            ? "全球电讯行业正经历一场深刻的结构性转变，从单纯的连线服务供应商，迈向「AI即服务」（AI-as-a-Service）平台。这一转型由多重因素驱动："
            : "The global telecommunications industry is undergoing a profound structural shift, evolving from pure connectivity service providers into AI-as-a-Service (AIaaS) platforms. This transformation is driven by multiple factors:"}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "2px",
            backgroundColor: border,
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "48px",
          }}
        >
          {macroPoints.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: isDark ? "#141414" : "#fff",
                padding: "clamp(22px, 2.5vw, 36px)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  backgroundColor: accent,
                  opacity: 0.85,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: "12px" }}>{i + 1}</span>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  color: text,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1vw, 15px)",
                  lineHeight: 1.65,
                  color: muted,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing paragraph */}
        <p
          style={{
            margin: "0 0 48px",
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.75,
            color: muted,
          }}
        >
          {isZh
            ? "在此宏观背景下，和记电讯今日宣布的AI Token计划，不仅是香港电讯业的首创里程碑，更标志着香港移动市场正式踏入「电讯即AI平台」（Telco-as-AI-Platform）的新纪元。"
            : "Against this macro backdrop, Hutchison Telecom's newly announced AI Token programme marks a groundbreaking milestone for Hong Kong's telecommunications sector. It also signals the official arrival of the Telco-as-AI-Platform era within Hong Kong's mobile market."}
        </p>

        {/* Partner row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            paddingTop: "12px",
            borderTop: `1px solid ${border}`,
          }}
        >
          {(isZh
            ? ["3HK / 3SUPREME", "阿里云 Alibaba Cloud", "Basicware AI"]
            : ["3HK / 3SUPREME", "Alibaba Cloud", "Basicware AI"]
          ).map((name) => (
            <span
              key={name}
              style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: "13px",
                color: accent,
                border: `1px solid ${accent}`,
                borderRadius: "30px",
                padding: "6px 16px",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

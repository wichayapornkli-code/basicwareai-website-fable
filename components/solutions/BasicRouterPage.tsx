"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Reveal from "@/components/anim/Reveal";
import Breadcrumb from "@/components/Breadcrumb";

const FONT = '"Plus Jakarta Sans", sans-serif';
const HERO_COLOR = "#0148ae";

const COPY = {
  en: {
    eyebrow: "BasicRouter · Basicware",
    headline: "Enterprise Global LLM API Aggregation & Token Management Platform",
    descriptionPoints: [
      "Unified access to all leading global large language models",
      "Deliver stable service supply, unified protocols, consolidated billing and centralized management",
      "Support enterprise internal usage, white-label service, distribution and channel partnership",
      "Enable enterprises to access global AI capabilities at lower costs and higher efficiency",
    ],
    cta: "Experience the Power of the Unified Gateway Service Now",
    modelsTitle: "Supported AI Models",
    painTitle: "Why enterprises need BasicRouter",
    painPoints: [
      { title: "Complex multi-platform integration", body: "Each vendor adopts distinct access methods, authentication mechanisms, SDKs and documentation, resulting in high integration costs and heavy maintenance workloads." },
      { title: "Unstable Token supply", body: "Every platform comes with limited quotas and frequent fluctuations. Insufficient quotas or rate limits often occur during peak hours, disrupting business continuity." },
      { title: "Uncontrollable TPM/RPM limits", body: "Opaque rate-limiting policies with delayed adjustments fail to accommodate sudden business spikes and degrade user experience." },
      { title: "Fragmented billing & difficult cost governance", body: "Separate settlements and inconsistent bill formats across platforms hinder cost aggregation and analysis, leaving no effective means for budget control." },
      { title: "Data security and compliance risks", body: "Unregulated cross-border data transmission, coupled with inconsistent security standards among vendors, create major obstacles for compliance audits and risk management." },
      { title: "High latency and poor stability for overseas calls", body: "Cross-border networks suffer from high latency and severe fluctuations, leading to inconsistent business performance across regions." },
    ],
  },
  zh: {
    eyebrow: "BasicRouter · Basicware",
    headline: "企业级全球大模型 API 聚合与 Token 管理平台",
    descriptionPoints: [
      "统一连接全球主流大模型",
      "提供稳定供给、统一协议、统一账单、统一管理",
      "支持企业自用、白牌、分销、渠道合作",
      "让企业以更低成本、更高效率接入全球 AI 能力",
    ],
    cta: "立即体验统一网关服务的强大能力",
    modelsTitle: "支持的 AI 大模型",
    painTitle: "企业为什么需要 BasicRouter",
    painPoints: [
      { title: "多平台接入复杂", body: "不同厂商的接入方式、鉴权机制、SDK 和文档各不相同，集成成本高，维护工作量大。" },
      { title: "Token 供给不稳定", body: "各平台配额有限、波动频繁，高峰期易出现额度不足或限流，影响业务连续性。" },
      { title: "TPM/RPM 不可控", body: "速率限制策略不透明、调整滞后，难以满足业务突发增长需求，影响用户体验。" },
      { title: "账单分散，成本难管理", body: "多平台独立结算、账单格式不一，成本归集与分析困难，预算控制和优化缺乏抓手。" },
      { title: "数据安全与合规风险", body: "数据跨境传输与存储不可控，不同平台安全标准不一，合规审计与风险管理难度大。" },
      { title: "海外调用延迟高、稳定性差", body: "跨境网络延迟高、波动大，服务可用性受地域和链路影响，业务体验不稳定。" },
    ],
  },
};

const MODELS = [
  "OpenAI",
  "Claude / Anthropic",
  "Gemini",
  "Qwen",
  "DeepSeek",
  "GLM",
  "Kimi",
  "MiniMax",
  "Llama",
];

export default function BasicRouterPage({ locale }: { locale: string }) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const t = useTranslations("nav");
  const tb = useTranslations("breadcrumb");
  const isZh = locale === "zh";
  const copy = isZh ? COPY.zh : COPY.en;

  const bg = isDark ? "#0d0d0d" : "#fff";
  const bgAlt = isDark ? "#111111" : "#f9f9f9";
  const text = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const cardBg = isDark ? "#1a1a1a" : "#fff";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "#ebebeb";

  return (
    <div style={{ backgroundColor: bg }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? "clamp(320px, 60vw, 480px)" : "clamp(400px, 48vw, 600px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile
            ? "100px clamp(20px, 5vw, 40px) clamp(36px, 5vw, 56px)"
            : "120px clamp(40px, 6vw, 80px) clamp(48px, 5vw, 72px)",
          backgroundColor: HERO_COLOR,
        }}
      >
        <img
          src="/assets/2_practice_01.avif"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${HERO_COLOR} 0%, ${HERO_COLOR}99 40%, transparent 100%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          <p
            className="bw-eyebrow"
            style={{ color: "rgba(255,255,255,0.65)", marginBottom: "clamp(12px, 2vw, 20px)" }}
          >
            {copy.eyebrow}
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-heading-xl)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            {copy.headline}
          </h1>
        </div>
      </section>

      {/* ── Back link ────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "clamp(24px, 3vw, 40px) clamp(20px, 5vw, 40px) 0",
        }}
      >
        <Breadcrumb
          homeHref={`/${locale}`}
          homeLabel={tb("home")}
          items={[
            { label: t("solutions"), href: `/${locale}/solutions` },
            { label: "BasicRouter" },
          ]}
        />
      </div>

      {/* ── Product Description ───────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 96px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2vw, 24px)",
            }}
          >
            {copy.descriptionPoints.map((point, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: "var(--fs-heading-sm)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.02em",
                  color: text,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    backgroundColor: HERO_COLOR,
                    opacity: 0.85,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2px",
                  }}
                >
                  <span style={{ color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-caption)" }}>
                    {i + 1}
                  </span>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: bgAlt,
          padding: "clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "clamp(20px, 2.5vw, 28px)",
        }}
      >
        <a
          href="https://basicrouter.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="bw-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: isDark ? "#e0e0e0" : "#191c26",
            borderRadius: "40px",
            padding: "16px 32px",
            textDecoration: "none",
            color: isDark ? "#191c26" : "#fff",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "var(--fs-body-sm)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {copy.cta}
          <img
            src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
            alt=""
            width={13}
            height={13}
            style={{ display: "block" }}
          />
        </a>
      </section>

      {/* ── Supported Models ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(56px, 7vw, 100px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <Reveal
            as="h2"
            mode="fade"
            style={{
              margin: "0 0 clamp(32px, 4vw, 52px)",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-heading-lg)",
              letterSpacing: "-0.03em",
              color: text,
            }}
          >
            {copy.modelsTitle}
          </Reveal>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {MODELS.map((model) => (
              <div
                key={model}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: "12px",
                  padding: "14px 24px",
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: "var(--fs-body-sm)",
                  letterSpacing: "-0.01em",
                  color: text,
                  whiteSpace: "nowrap",
                }}
              >
                {model}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pain Points ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: bgAlt,
          padding: "clamp(56px, 7vw, 100px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <Reveal
            as="h2"
            mode="fade"
            style={{
              margin: "0 0 clamp(32px, 4vw, 52px)",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-heading-lg)",
              letterSpacing: "-0.03em",
              color: text,
            }}
          >
            {copy.painTitle}
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "2px",
              backgroundColor: border,
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {copy.painPoints.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: isDark ? "#141414" : "#fff",
                  padding: "clamp(24px, 3vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    backgroundColor: HERO_COLOR,
                    opacity: 0.85,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-caption)" }}>
                    {i + 1}
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: "var(--fs-body-lg)",
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
                    fontSize: "var(--fs-body-sm)",
                    lineHeight: 1.65,
                    letterSpacing: "-0.01em",
                    color: muted,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 40px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "clamp(20px, 2.5vw, 28px)",
        }}
      >
        <Link
          href={`/${locale}/contact`}
          className="bw-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: isDark ? "#e0e0e0" : "#191c26",
            borderRadius: "40px",
            padding: "16px 32px",
            textDecoration: "none",
            color: isDark ? "#191c26" : "#fff",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "var(--fs-body)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {isZh ? "联系我们" : "Talk to our team"}
          <img
            src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
            alt=""
            width={13}
            height={13}
            style={{ display: "block" }}
          />
        </Link>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Reveal from "@/components/anim/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import { type Product } from "@/lib/products";
import { useTranslations } from "next-intl";
import { getContentLocaleKey, mergeWithEnglishFallback } from "@/lib/locale";

const FONT = '"Plus Jakarta Sans", sans-serif';

export default function ProductDetailPage({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const t = useTranslations("nav");
  const tb = useTranslations("breadcrumb");
  const localeKey = getContentLocaleKey(locale);
  const isChinese = localeKey !== "en";
  const isTraditional = localeKey === "zhTw";
  const copy =
    localeKey === "zh"
      ? mergeWithEnglishFallback(product.en, product.zh)
      : localeKey === "zhTw"
        ? mergeWithEnglishFallback(product.en, product.zhTw)
        : product.en;

  const bg = isDark ? "#0d0d0d" : "#fff";
  const bgAlt = isDark ? "#111111" : "#f9f9f9";
  const text = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const cardBg = isDark ? "#1a1a1a" : "#f5f5f7";
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
          backgroundColor: product.heroColor,
        }}
      >
        {/* Hero image — TODO: replace heroImageSrc with a dedicated product photo */}
        <img
          src={product.heroImageSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${product.heroColor} 0%, ${product.heroColor}99 40%, transparent 100%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          <p
            className="bw-eyebrow"
            style={{
              color: "rgba(255,255,255,0.65)",
              marginBottom: "clamp(12px, 2vw, 20px)",
            }}
          >
            {product.brandName} · Basicware
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

      {/* ── Back link + breadcrumb ────────────────────────────────────── */}
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
            { label: product.brandName },
          ]}
        />
      </div>

      {/* ── Problem Statement ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(48px, 6vw, 96px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "flex",
            gap: "clamp(40px, 6vw, 80px)",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flexShrink: 0, flex: "0 0 clamp(160px, 22%, 240px)" }}>
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-overline)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                color: muted,
              }}
            >
              {isTraditional ? "問題所在" : isChinese ? "问题所在" : "The Problem"}
            </p>
          </div>
          <Reveal
            as="p"
            mode="fade"
            style={{
              flex: 1,
              margin: 0,
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "var(--fs-heading-sm)",
              lineHeight: 1.7,
              letterSpacing: "-0.02em",
              color: text,
            }}
          >
            {copy.problemStatement}
          </Reveal>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1080px", margin: "0 auto clamp(48px, 6vw, 80px)", padding: "0 clamp(20px, 5vw, 40px)" }}>
        <div style={{ height: "1px", backgroundColor: border }} />
      </div>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: bgAlt,
          padding: "clamp(56px, 7vw, 100px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <p className="bw-eyebrow" style={{ color: "var(--c-accent)", marginBottom: "clamp(16px, 2vw, 24px)", justifyContent: "center" }}>
            {isTraditional ? "運作方式" : isChinese ? "运作方式" : "How it works"}
          </p>
          <Reveal
            as="p"
            mode="fade"
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "var(--fs-body-lg)",
              lineHeight: 1.75,
              letterSpacing: "-0.01em",
              color: isDark ? "#c0c0c0" : "#3a3a3a",
            }}
          >
            {copy.howItWorks}
          </Reveal>
        </div>
      </section>

      {/* ── Features 2×2 ─────────────────────────────────────────────── */}
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
            {isTraditional ? "核心功能" : isChinese ? "核心功能" : "What's included"}
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
            {copy.features.map((feature, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: isDark ? "#141414" : "#fff",
                  padding: "clamp(28px, 3vw, 44px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: product.heroColor,
                    opacity: 0.85,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-body-sm)" }}>
                    {i + 1}
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: "var(--fs-heading-sm)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: text,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 500,
                    fontSize: "var(--fs-body)",
                    lineHeight: 1.65,
                    letterSpacing: "-0.01em",
                    color: muted,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ─────────────────────────────────────────────── */}
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
              margin: "0 0 clamp(28px, 3.5vw, 44px)",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-heading-lg)",
              letterSpacing: "-0.03em",
              color: text,
            }}
          >
            {isTraditional ? "適合哪些人" : isChinese ? "适合哪些人" : "Who it's for"}
          </Reveal>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "2px",
            }}
          >
            {copy.whoFor.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1a1a1a" : "#fff",
                  borderRadius: "16px",
                  padding: "clamp(24px, 2.5vw, 36px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: product.heroColor,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 500,
                    fontSize: "var(--fs-body-lg)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                    color: text,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
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
        <Reveal
          as="h2"
          mode="fade"
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: "var(--fs-heading-lg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: text,
            maxWidth: "520px",
          }}
        >
          {isTraditional ? "準備好開始了嗎？" : isChinese ? "准备好开始了吗？" : "Ready to get started?"}
        </Reveal>
        <p
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "var(--fs-body-lg)",
            lineHeight: 1.6,
            color: muted,
            maxWidth: "400px",
          }}
        >
          {isChinese
            ? isTraditional
              ? "聯繫我們，了解適合您團隊的方案。"
              : "联系我们，了解适合您团队的方案。"
            : "Talk to our team about the right solution for you."}
        </p>
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
          {copy.cta}
          <img
            src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
            alt=""
            width={13}
            height={13}
            style={{ display: "block" }}
          />
        </Link>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: bgAlt,
          padding: "clamp(56px, 7vw, 100px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
            {isTraditional ? "常見問題" : isChinese ? "常见问题" : "Frequently asked"}
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {copy.faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: `1px solid ${border}`,
                  padding: "clamp(24px, 3vw, 36px) 0",
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: "var(--fs-body-lg)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.015em",
                    color: text,
                  }}
                >
                  {faq.question}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontWeight: 500,
                    fontSize: "var(--fs-body)",
                    lineHeight: 1.7,
                    letterSpacing: "-0.01em",
                    color: muted,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${border}` }} />
          </div>
        </div>
      </section>
    </div>
  );
}

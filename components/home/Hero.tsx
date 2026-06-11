"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas";
import HeroParallax from "./HeroParallax";
import Magnetic from "@/components/anim/Magnetic";

gsap.registerPlugin(ScrollTrigger);

type HeroVariant = "aurora" | "image" | "parallax";
const ORDER: HeroVariant[] = ["aurora", "image", "parallax"];

export default function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<HeroVariant>("aurora");

  useEffect(() => {
    const saved = localStorage.getItem("bw-hero-variant") as HeroVariant | null;
    if (saved && ORDER.includes(saved)) setVariant(saved);
  }, []);

  const cycleVariant = () => {
    const next = ORDER[(ORDER.indexOf(variant) + 1) % ORDER.length];
    setVariant(next);
    localStorage.setItem("bw-hero-variant", next);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        lines,
        { yPercent: 115 },
        { yPercent: 0, duration: 1.4, stagger: 0.12 },
        0.15
      );
      tl.fromTo(
        fades,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out" },
        0.7
      );

      // Drift the block up and out as the user scrolls past
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onImage = variant !== "aurora";
  const isImage = variant === "image";
  const isParallax = variant === "parallax";
  const cText = onImage ? "#fff" : "var(--c-text)";
  const cMuted = onImage ? "rgba(255,255,255,0.82)" : "var(--c-text-muted)";
  const cLine = onImage ? "rgba(255,255,255,0.32)" : "var(--c-line)";

  return (
    <section
      ref={sectionRef}
      className={onImage ? "bw-hero-on-image" : undefined}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "640px",
        overflow: "hidden",
        backgroundColor: "var(--c-bg)",
      }}
    >
      {variant === "aurora" && <HeroCanvas />}
      {variant === "image" && (
        <div aria-hidden style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/assets/hero_bg_option2.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Wash keeps the navbar and bottom copy readable over the sky */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(3,22,64,0.3) 0%, rgba(3,22,64,0) 30%, rgba(2,20,58,0) 52%, rgba(2,20,58,0.52) 100%)",
            }}
          />
        </div>
      )}
      {variant === "parallax" && <HeroParallax />}

      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: isImage ? "space-between" : "flex-end",
          padding: isImage
            ? "clamp(110px, 15vh, 170px) clamp(24px, 5vw, 80px) clamp(28px, 4vh, 48px)"
            : "0 clamp(24px, 5vw, 80px) clamp(36px, 6vh, 72px)",
        }}
      >
        <div
          style={{
            margin: isImage ? "auto 0" : undefined,
            transform: isImage ? "translateY(-170px)" : isParallax ? "translateY(40px)" : undefined,
            textAlign: isImage ? "center" : isParallax ? "right" : undefined,
          }}
        >
          {/* Eyebrow */}
          <div data-hero-fade style={{ marginBottom: "clamp(16px, 2.5vh, 28px)" }}>
            <p className="bw-eyebrow" style={{ color: cMuted }}>Basicware · AI Navigation</p>
          </div>

          {/* Headline */}
          <h1
            className="bw-display"
            style={{
              fontSize: isParallax ? "clamp(36px, 5.8vw, 96px)" : isImage ? "clamp(36px, 6vw, 100px)" : "clamp(46px, 8.2vw, 138px)",
              color: cText,
              textShadow: onImage ? "0 2px 28px rgba(2,24,68,0.35)" : undefined,
            }}
          >
            {!isImage ? (
              <>
                <span className="bw-line-mask">
                  <span data-hero-line style={{ display: "block" }}>
                    {t("titlePart1")}<em>{t("titleAccent")}</em>
                  </span>
                </span>
                <span className="bw-line-mask">
                  <span data-hero-line style={{ display: "block" }}>
                    {t("titlePart1b").trim()} {t("titlePart2")}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span className="bw-line-mask">
                  <span data-hero-line style={{ display: "block" }}>
                    {t("titlePart1")}
                    <em>{t("titleAccent")}</em>
                    {t("titlePart1b")}
                  </span>
                </span>
                <span className="bw-line-mask">
                  <span data-hero-line style={{ display: "block" }}>
                    {t("titlePart2")}
                  </span>
                </span>
              </>
            )}
          </h1>

          {/* Subtitle + CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // Image: subtitle and CTAs stack centered under the headline.
              // Parallax: they stack against the right edge.
              flexDirection: isImage ? "column" : "row",
              alignItems: isImage ? "center" : isParallax ? "flex-end" : "flex-end",
              justifyContent: isImage ? "flex-start" : "space-between",
              gap: "28px",
              marginTop: "clamp(28px, 4.5vh, 52px)",
            }}
          >
            {!isParallax && (
              <p
                data-hero-fade
                style={{
                  margin: 0,
                  maxWidth: "440px",
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  lineHeight: 1.6,
                  color: cMuted,
                  textShadow: isImage ? "0 1px 16px rgba(2,24,68,0.7)" : undefined,
                }}
              >
                {t("subtitle")}
              </p>
            )}

            {!isParallax && !isImage && (
              <div data-hero-fade style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Magnetic>
                  <Link
                    href={`/${locale}/success-stories`}
                    className="bw-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      backgroundColor: onImage ? "#fff" : "var(--c-accent)",
                      color: onImage ? "#0a2a6b" : "#fff",
                      borderRadius: "60px",
                      padding: "16px 30px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "15px",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("cta")}
                    <img
                      src={onImage ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
                      alt=""
                      width={13}
                      height={13}
                      style={{ display: "block" }}
                    />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link
                    href={`/${locale}/contact`}
                    className="bw-link"
                    style={{
                      color: cText,
                      fontWeight: 600,
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tNav("getStarted")}
                  </Link>
                </Magnetic>
              </div>
            )}
          </div>
        </div>

        {/* Bottom meta row */}
        <div
          data-hero-fade
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            marginTop: isParallax ? 0 : "clamp(32px, 5vh, 56px)",
            paddingTop: "20px",
            borderTop: `1px solid ${cLine}`,
          }}
        >
          <p className="bw-mono-label" style={{ margin: 0, color: cMuted }}>
            Hong Kong — APAC
          </p>
          <p className="bw-mono-label" style={{ margin: 0, color: cMuted, display: "flex", alignItems: "center", gap: "10px" }}>
            Scroll
            <span
              aria-hidden
              style={{
                display: "inline-block",
                animation: "scroll-cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
              }}
            >
              ↓
            </span>
          </p>
        </div>
      </div>

      {/* Hidden hero switcher — cycles aurora → image → parallax */}
      <button
        type="button"
        onClick={cycleVariant}
        aria-label="Switch hero background"
        title=""
        style={{
          position: "absolute",
          right: "10px",
          bottom: "10px",
          zIndex: 6,
          width: "14px",
          height: "14px",
          padding: 0,
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          background: onImage ? "rgba(255,255,255,0.4)" : "rgba(127,127,127,0.4)",
          opacity: 1,
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.12")}
      />
    </section>
  );
}

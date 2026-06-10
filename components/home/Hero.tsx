"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas";
import Magnetic from "@/components/anim/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "640px",
        overflow: "hidden",
        backgroundColor: "var(--c-bg)",
      }}
    >
      <HeroCanvas />

      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(24px, 5vw, 80px) clamp(36px, 6vh, 72px)",
        }}
      >
        {/* Eyebrow */}
        <div data-hero-fade style={{ marginBottom: "clamp(16px, 2.5vh, 28px)" }}>
          <p className="bw-eyebrow">Basicware · AI Navigation</p>
        </div>

        {/* Headline */}
        <h1
          className="bw-display"
          style={{ fontSize: "clamp(46px, 8.2vw, 138px)" }}
        >
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
        </h1>

        {/* Subtitle + CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "28px",
            marginTop: "clamp(28px, 4.5vh, 52px)",
          }}
        >
          <p
            data-hero-fade
            style={{
              margin: 0,
              maxWidth: "440px",
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.6,
              color: "var(--c-text-muted)",
              whiteSpace: "pre-line",
            }}
          >
            {t("subtitle")}
          </p>

          <div data-hero-fade style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Magnetic>
              <Link
                href={`/${locale}/success-stories`}
                className="bw-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "var(--c-accent)",
                  color: "#fff",
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
                <img src="/assets/arrow-white.svg" alt="" width={13} height={13} style={{ display: "block" }} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href={`/${locale}/contact`}
                className="bw-link"
                style={{
                  color: "var(--c-text)",
                  fontWeight: 600,
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                }}
              >
                {tNav("getStarted")}
              </Link>
            </Magnetic>
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
            marginTop: "clamp(32px, 5vh, 56px)",
            paddingTop: "20px",
            borderTop: "1px solid var(--c-line)",
          }}
        >
          <p className="bw-mono-label" style={{ margin: 0, color: "var(--c-text-muted)" }}>
            Hong Kong — APAC
          </p>
          <p className="bw-mono-label" style={{ margin: 0, color: "var(--c-text-muted)", display: "flex", alignItems: "center", gap: "10px" }}>
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
    </section>
  );
}

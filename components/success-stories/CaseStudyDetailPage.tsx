"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { type CaseStudy } from "@/lib/case-studies";
import { useDark } from "@/components/ThemeProvider";
import { consumeHeroTransition } from "@/lib/heroTransition";

const FONT = '"Plus Jakarta Sans", sans-serif';

const METRICS = [
  { value: "40×", label: "Audience growth" },
  { value: "63,200", label: "New followers" },
  { value: "85%", label: "Less production time" },
];

const CHALLENGE_BODY =
  "The client was struggling to scale their digital presence in a competitive, multi-language market. Their content team was spending the majority of their time on low-impact production tasks, leaving little bandwidth for strategy. Existing tools were siloed, requiring manual handoffs between six different platforms and generating inconsistent brand output.";

const SOLUTION_BODY =
  "Basicware deployed a unified AI content and distribution platform, tailored to the client's brand voice and market. Our proprietary model blend handled ideation, creation, and channel optimisation simultaneously — across 12 languages and 6 platforms — with a human-in-the-loop review layer that kept editorial quality high without slowing output.";

const RESULTS = [
  { icon: "📈", title: "40× audience growth", body: "Achieved in a single month through AI-optimised cross-channel publishing and real-time engagement scoring." },
  { icon: "👥", title: "63,200 new followers", body: "Organic acquisition across all platforms, driven by algorithmically timed, language-localised content bursts." },
  { icon: "⚡", title: "85% faster production", body: "Content turnaround dropped from 4 days to under 8 hours, freeing the team to focus on brand strategy." },
];

export default function CaseStudyDetailPage({
  study,
  locale,
}: {
  study: CaseStudy;
  locale: string;
}) {
  const { isDark } = useDark();
  const heroRef = useRef<HTMLDivElement>(null);

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
        {/* Back */}
        <Link
          href={`/${locale}/success-stories`}
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
          ← Back to Success Stories
        </Link>

        {/* Logo + tags row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <img
            src={study.logoSrc}
            alt={study.logoAlt}
            style={{ height: study.logoHeight * 1.6, width: "auto", display: "block", opacity: isDark ? 0.8 : 0.65 }}
          />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {study.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  border: `1px solid ${border}`,
                  borderRadius: "30px",
                  padding: "4px 16px",
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: "13px",
                  color: muted,
                  whiteSpace: "nowrap",
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
            fontSize: "clamp(28px, 3.5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            color: headline,
            maxWidth: "760px",
          }}
        >
          {study.headline}
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
          {METRICS.map(({ value, label }, i) => (
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
              <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3vw, 40px)", color: headline, letterSpacing: "-0.5px", lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "14px", color: muted, lineHeight: 1.4 }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px 80px" }}>

          {/* Challenge */}
          <section>
            <p style={{ margin: "0 0 16px", fontFamily: FONT, fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: muted }}>
              The Challenge
            </p>
            <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.75, color: text }}>
              {CHALLENGE_BODY}
            </p>
          </section>

          {/* Solution */}
          <section>
            <p style={{ margin: "0 0 16px", fontFamily: FONT, fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: muted }}>
              The Solution
            </p>
            <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.75, color: text }}>
              {SOLUTION_BODY}
            </p>
          </section>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: border, margin: "64px 0" }} />

        {/* Results */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{ margin: "0 0 32px", fontFamily: FONT, fontWeight: 700, fontSize: "clamp(20px, 2vw, 28px)", color: text }}>
            Key Results
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {RESULTS.map(({ icon, title, body }, i) => (
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
                <span style={{ fontSize: "28px" }}>{icon}</span>
                <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "16px", color: text, letterSpacing: "-0.2px" }}>{title}</p>
                <p style={{ margin: 0, fontFamily: FONT, fontWeight: 400, fontSize: "14px", lineHeight: 1.65, color: muted }}>{body}</p>
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
              fontSize: "clamp(17px, 1.4vw, 22px)",
              lineHeight: 1.6,
              color: isDark ? "#c8dcf8" : "#011e5b",
              letterSpacing: "-0.2px",
            }}
          >
            &ldquo;{study.quote}&rdquo;
          </p>
          <p style={{ margin: 0, fontFamily: FONT, fontWeight: 700, fontSize: "14px", color: isDark ? "#6a9fd8" : "#0148ae" }}>
            {study.author}
          </p>
        </div>
      </div>
    </div>
  );
}

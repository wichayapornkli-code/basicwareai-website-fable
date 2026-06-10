"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useDark } from "@/components/ThemeProvider";
import Reveal from "@/components/anim/Reveal";

const FONT = '"Plus Jakarta Sans", sans-serif';

const LOGOS = [
  { src: "/assets/LKF_Concepts.png", height: 15, alt: "LKF Concepts" },
  { src: "/assets/HKU_Business_School.png", height: 32, alt: "HKU Business School" },
  { src: "/assets/City_Super.png", height: 29, alt: "CitySuper" },
  { src: "/assets/Midea.png", height: 46, alt: "Midea" },
  { src: "/assets/Christies.png", height: 14, alt: "Christie's" },
  { src: "/assets/Cyberport.png", height: 49, alt: "Cyberport" },
  { src: "/assets/OOCL.png", height: 37, alt: "OOCL" },
  { src: "/assets/Payoneer.png", height: 43, alt: "Payoneer" },
  { src: "/assets/Kimberly-Clark.png", height: 23, alt: "Kimberly-Clark" },
  { src: "/assets/HSBC.png", height: 33, alt: "HSBC" },
];

const CARDS = [
  {
    quote:
      "Basicware's AI solutions transformed our business. Their team's expertise and cutting-edge technology helped us achieve unprecedented growth and efficiency across every channel.",
    author: "Anya Sharma",
    role: "Chief Digital Officer, CitySuper",
    flag: "🇭🇰",
    photo: "/assets/2_success_home.png",
    stats: [
      { value: "+85%", label: "Customer Satisfaction" },
      { value: "+300%", label: "Content Efficiency" },
      { value: "2×", label: "Faster Delivery" },
    ],
  },
  {
    quote:
      "Deploying AI at scale across our branches was made seamless by Basicware. The productivity gains were immediate — our teams now handle complex workflows in a fraction of the time.",
    author: "Paul Leblanc",
    role: "VP Technology, HSBC",
    flag: "🇭🇰",
    photo: "/assets/2_success_home_a.png",
    stats: [
      { value: "+120%", label: "Team Productivity" },
      { value: "+65%", label: "Cost Reduction" },
      { value: "3×", label: "Faster Processing" },
    ],
  },
  {
    quote:
      "Basicware co-built a product with us that changed our entire innovation pipeline. From ideation to launch, their AI-native approach shortened every cycle and amplified our output dramatically.",
    author: "Zane Matthews",
    role: "Head of Innovation, Cyberport",
    flag: "🇸🇬",
    photo: "/assets/2_success_home_b.png",
    stats: [
      { value: "+200%", label: "Product Velocity" },
      { value: "+150%", label: "Revenue Growth" },
      { value: "−40%", label: "Manual Work" },
    ],
  },
];

function LogoStrip({ bg, isDark }: { bg: string; isDark: boolean }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {LOGOS.map((logo, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ padding: "0 44px" }}>
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                height: logo.height,
                width: "auto",
                maxWidth: "none",
                objectFit: "contain",
                opacity: isDark ? 0.45 : 0.5,
                filter: "grayscale(1)",
                display: "block",
              }}
            />
          </div>
          {i < LOGOS.length - 1 && (
            <div
              style={{
                width: 1,
                height: 32,
                backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "#d8d8d8",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SuccessStoriesSection() {
  const { isDark } = useDark();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const bg = isDark ? "#111111" : "#f9f9f9";
  const cardBg = isDark ? "#1a1a1a" : "#ffffff";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e9e9e9";
  const statDivider = isDark ? "rgba(255,255,255,0.08)" : "#f0f0f0";
  const textPrimary = isDark ? "#e0e0e0" : "#141414";
  const textSecondary = isDark ? "#a0a0a0" : "rgba(20,20,20,0.4)";
  const eyebrowColor = isDark ? "#7ec8f0" : "#3b425a";

  useEffect(() => {
    const id = setInterval(() => {
      const card = cardRef.current;
      if (!card) return;
      gsap.to(card, {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex((i) => (i + 1) % CARDS.length);
          gsap.fromTo(card, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
        },
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const card = CARDS[activeIndex];

  return (
    <section style={{ backgroundColor: bg, minHeight: "80vh" }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "14px",
          padding: "clamp(60px, 6vw, 102px) 40px 0",
        }}
      >
        <p className="bw-eyebrow">Success stories</p>
        <Reveal as="h2" className="bw-display" style={{ fontSize: "clamp(34px, 4.2vw, 60px)" }}>
          Trusted by <em>the best</em>
        </Reveal>
        <Reveal
          as="p"
          mode="fade"
          delay={0.15}
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "16px",
            letterSpacing: "-0.176px",
            lineHeight: 1.6,
            color: "var(--c-text-muted)",
            maxWidth: "478px",
          }}
        >
          From government to gaming, education to e-commerce. We&apos;ve co-built with partners in Hong Kong, ASEAN and beyond.
        </Reveal>
      </div>

      {/* ── Rotating card ──────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "774px",
          margin: "clamp(32px, 4vw, 48px) auto 0",
          padding: "0 40px",
          boxSizing: "content-box",
        }}
      >
        <div
          ref={cardRef}
          style={{
            backgroundColor: cardBg,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 2px 24px rgba(0,0,0,0.4)"
              : "0 2px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Top row: quote + photo */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            {/* Left — quote */}
            <div
              style={{
                flex: 1,
                padding: "40px 32px",
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
                  fontSize: "clamp(15px, 1.4vw, 20px)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.22px",
                  color: textPrimary,
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
                      fontSize: "12px",
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
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "12px",
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

            {/* Right — photo */}
            <div
              style={{
                flexShrink: 0,
                width: "clamp(180px, 27vw, 343px)",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={card.photo}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Bottom — stats bar */}
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
                    fontSize: "clamp(18px, 2vw, 24px)",
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
                    fontWeight: 400,
                    fontSize: "12px",
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
        </div>

      </div>

      {/* ── Logo scroller ───────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "774px",
          margin: "0 auto",
          padding: "0 40px",
          boxSizing: "content-box",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            padding: "clamp(36px, 4vw, 60px) 0 clamp(40px, 5vw, 70px)",
            position: "relative",
          }}
        >
          {/* Left fade */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "100px",
              background: `linear-gradient(to right, ${bg}, transparent)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* Right fade */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100px",
              background: `linear-gradient(to left, ${bg}, transparent)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <div
            role="marquee"
            aria-label="Trusted by our clients"
            style={{
              display: "flex",
              animation: "marquee 36s linear infinite",
              willChange: "transform",
            }}
          >
            <LogoStrip bg={bg} isDark={isDark} />
            <LogoStrip bg={bg} isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}

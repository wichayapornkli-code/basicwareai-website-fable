"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDark } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

export type HeroSegment = { text: string; accent?: boolean };
export type HeroLine = HeroSegment[];

type Props = {
  bgSrc: string;
  darkBgSrc?: string;
  bgColor?: string;
  overlayColor?: string;
  bgObjectPosition?: string;
  lines: HeroLine[];
  accentColor?: string;
  fontSize?: string;
  belowCard?: React.ReactNode;
  bottomSlot?: React.ReactNode;
};

function CharSpan({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char=""
          data-char-accent={accent ? "" : undefined}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export default function ScrollHero({
  bgSrc,
  darkBgSrc,
  bgColor = "#0148ae",
  overlayColor,
  bgObjectPosition = "center top",
  lines,
  accentColor = "#191c26",
  fontSize = "clamp(36px, 4.2vw, 76px)",
  belowCard,
  bottomSlot,
}: Props) {
  const { isDark } = useDark();
  const activeBgSrc = isDark && darkBgSrc ? darkBgSrc : bgSrc;
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const [isSmall] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const allCharSpans = gsap.utils.toArray<HTMLSpanElement>("[data-char]");
      const accentSpans = gsap.utils.toArray<HTMLSpanElement>("[data-char-accent]");

      if (isSmall) {
        // Show text in end state immediately — no scroll-driven reveal on mobile/tablet
        gsap.set(allCharSpans, { opacity: 1 });
        gsap.set(accentSpans, { color: accentColor });
        return;
      }

      gsap.set(allCharSpans, { opacity: 0.3 });
      gsap.set(accentSpans, { color: "#ffffff" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinnedRef.current,
          pinSpacing: false,
        },
      });

      tl.to(allCharSpans, { opacity: 1, stagger: 0.07, ease: "none", duration: 0.07 }, 0)
        .to(accentSpans, { color: accentColor, ease: "none", duration: 2 }, 0);

      gsap.to(bgRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <div ref={containerRef} style={{ height: isSmall ? "auto" : "280vh", position: "relative" }}>
      <div
        ref={pinnedRef}
        style={{
          height: "90vh",
          width: "100%",
          padding: "32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: isDark ? "#0d0d0d" : "#fff",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            position: "relative",
            overflow: "hidden",
            backgroundColor: isDark ? "#0d0d0d" : bgColor,
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            ref={bgRef}
            src={activeBgSrc}
            alt=""
            style={{
              position: "absolute",
              top: "-5%",
              left: 0,
              right: 0,
              width: "100%",
              height: "120%",
              objectFit: "cover",
              objectPosition: bgObjectPosition,
              opacity: 0.85,
              willChange: "transform",
              pointerEvents: "none",
            }}
          />

          {overlayColor && (
            <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor }} />
          )}

          <h1
            style={{
              position: "relative",
              zIndex: 1,
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              fontSize,
              lineHeight: 1.05,
              color: "#fff",
              textAlign: "center",
              maxWidth: "min(90vw, 900px)",
              padding: "0 40px",
            }}
          >
            {lines.map((line, i) => (
              <span key={i} style={{ display: "block", whiteSpace: "nowrap", fontWeight: i === 0 ? 700 : 400 }}>
                {line.map((seg, j) => (
                  <CharSpan key={j} text={seg.text} accent={seg.accent} />
                ))}
              </span>
            ))}
          </h1>
        </div>
        {belowCard}
      </div>
    </div>
    {bottomSlot}
    </>
  );
}

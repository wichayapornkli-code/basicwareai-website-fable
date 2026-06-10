"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "/assets/2_practice_01.png",
  "/assets/2_practice_02.png",
  "/assets/2_practice_03.png",
  "/assets/2_practice_04.png",
  "/assets/2_practice_05.png",
];

const CARD_H = 144;
const CARD_GAP = 18;
const LIST_H = IMAGES.length * CARD_H + (IMAGES.length - 1) * CARD_GAP;

// Updates the mask based on scroll progress:
// - atStart (progress ≈ 0): no top fade, only bottom fade
// - atEnd   (progress ≈ 1): no bottom fade, only top fade
// - middle : both fades (iOS picker feel)
function setMask(el: HTMLElement, progress: number) {
  const atStart = progress <= 0.02;
  const atEnd   = progress >= 0.98;
  const top = atStart ? "black 0%," : "transparent 0%, black 22%,";
  const bot = atEnd   ? "black 100%" : "black 78%, transparent 100%";
  const mask = `linear-gradient(to bottom, ${top} ${bot})`;
  el.style.setProperty("-webkit-mask-image", mask);
  el.style.setProperty("mask-image", mask);
}

export default function PracticeAreas() {
  const t = useTranslations("practice");
  const locale = useLocale();
  const containerRef    = useRef<HTMLDivElement>(null);
  const pinnedRef       = useRef<HTMLDivElement>(null);
  const listWrapperRef  = useRef<HTMLDivElement>(null);
  const listRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapH      = listWrapperRef.current?.offsetHeight ?? 0;
    const scrollDist = LIST_H - wrapH;

    if (scrollDist <= 0) {
      // All items fit — collapse extra scroll room and center list
      if (containerRef.current) containerRef.current.style.height = "100vh";
      if (listRef.current) {
        listRef.current.style.marginTop = `${Math.max(0, (wrapH - LIST_H) / 2)}px`;
      }
      return;
    }

    // Set initial mask (at list start: no top fade)
    if (listWrapperRef.current) setMask(listWrapperRef.current, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinnedRef.current,
          pinSpacing: false,
          onUpdate: (self) => {
            if (listWrapperRef.current) setMask(listWrapperRef.current, self.progress);
          },
        },
      });

      tl.to(listRef.current, { y: -scrollDist, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: "350vh", position: "relative" }}>
      <div
        ref={pinnedRef}
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#3a97ed",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <img
            src="/assets/2_areas_bg.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />

          {/* Centered inner row */}
          <div
            style={{
              maxWidth: "50vw",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "80px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left: heading + CTA */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <p className="bw-eyebrow" style={{ color: "rgba(249,249,249,0.85)" }}>
                {t("eyebrow").replace(/·/g, "").trim()}
              </p>
              <h2
                className="bw-display"
                style={{
                  fontSize: "clamp(32px, 3.4vw, 52px)",
                  color: "#f9f9f9",
                }}
              >
                {t("titleLine1")}<br /><em style={{ color: "#aaddff" }}>{t("titleLine2")}</em>
              </h2>
              <Link
                href={`/${locale}/solutions`}
                className="bw-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "flex-start",
                  backgroundColor: "#141414",
                  borderRadius: "40px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  color: "#fafafa",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "-0.154px",
                  whiteSpace: "nowrap",
                }}
              >
                {t("cta")}
                <img src="/assets/arrow-white.svg" alt="" width={13} height={13} style={{ display: "block" }} />
              </Link>
            </div>

            {/* Right: clipped scrolling list — mask always present in inline style */}
            <div
              ref={listWrapperRef}
              style={{
                flex: 1,
                maxWidth: "630px",
                position: "relative",
                height: "50vh",
                overflow: "hidden",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
              }}
            >
              <div
                ref={listRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${CARD_GAP}px`,
                  willChange: "transform",
                }}
              >
                {IMAGES.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#f9f9f9",
                      border: "2px solid #fff",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "32px",
                      overflow: "hidden",
                      flexShrink: 0,
                      height: `${CARD_H}px`,
                    }}
                  >
                    <div
                      style={{
                        width: "143px",
                        height: `${CARD_H}px`,
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontWeight: 600,
                          fontSize: "24px",
                          letterSpacing: "-0.264px",
                          color: "#141414",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t(`grid.${i}.title`)}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontWeight: 400,
                          fontSize: "16px",
                          letterSpacing: "-0.176px",
                          color: "#141414",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t(`grid.${i}.tagline`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

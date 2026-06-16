"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "/assets/2_practice_01.png",
  "/assets/2_practice_02.png",
  "/assets/2_practice_03.png",
  "/assets/2_practice_04.png",
];

// Matches the order of the `grid` array in translations
const PRODUCT_IDS: (string | null)[] = ["token", "content", "education", "employees"];

// Renders as a Link when href is provided, otherwise as a plain div
function CardWrapper({
  href,
  style,
  children,
}: {
  href: string | null;
  style: CSSProperties;
  children: ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} style={{ ...style, textDecoration: "none" }}>
        {children}
      </Link>
    );
  }
  return <div style={style}>{children}</div>;
}

const CARD_H = 144;
const CARD_GAP = 18;
const LIST_H = IMAGES.length * CARD_H + (IMAGES.length - 1) * CARD_GAP;


export default function PracticeAreas() {
  const t = useTranslations("practice");
  const locale = useLocale();
  // Static mount-time check — never reactive. If isMobile were state from
  // useBreakpoint(), a viewport resize would change the branch React renders,
  // causing React to delete the GSAP-pinned div while GSAP has moved it to a
  // wrapper node → removeChild crash.
  const [isMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const containerRef    = useRef<HTMLDivElement>(null);
  const pinnedRef       = useRef<HTMLDivElement>(null);
  const listWrapperRef  = useRef<HTMLDivElement>(null);
  const listRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check viewport once at mount — never re-run on resize to avoid GSAP
    // pin conflicting with React's DOM reconciliation (removeChild crash)
    if (window.innerWidth < 768) return;

    const wrapH      = listWrapperRef.current?.offsetHeight ?? 0;
    const scrollDist = LIST_H - wrapH;

    if (scrollDist <= 0) {
      if (containerRef.current) containerRef.current.style.height = "100vh";
      if (listRef.current) {
        listRef.current.style.marginTop = `${Math.max(0, (wrapH - LIST_H) / 2)}px`;
      }
      return;
    }

    const ctx = gsap.context(() => {
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

      tl.to(listRef.current, { y: -scrollDist, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isMobile) {
    return (
      <div
        style={{
          backgroundColor: "#3a97ed",
          overflow: "hidden",
          position: "relative",
          padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)",
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

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Heading + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p className="bw-eyebrow" style={{ color: "rgba(249,249,249,0.85)" }}>
              {t("eyebrow").replace(/·/g, "").trim()}
            </p>
            <h2
              className="bw-display"
              style={{ fontSize: "clamp(28px, 7vw, 44px)", color: "#f9f9f9" }}
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
                padding: "12px 22px",
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

          {/* Cards stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${CARD_GAP}px` }}>
            {IMAGES.map((src, i) => (
              <CardWrapper
                key={i}
                href={PRODUCT_IDS[i] ? `/${locale}/solutions/${PRODUCT_IDS[i]}` : null}
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #fff",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  overflow: "hidden",
                  height: `${CARD_H}px`,
                  cursor: PRODUCT_IDS[i] ? "pointer" : "default",
                }}
              >
                <div style={{ width: "100px", height: `${CARD_H}px`, flexShrink: 0, overflow: "hidden" }}>
                  <img
                    src={src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingRight: "16px" }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: "18px",
                      letterSpacing: "-0.2px",
                      color: "#141414",
                    }}
                  >
                    {t(`grid.${i}.title`)}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 400,
                      fontSize: "13px",
                      letterSpacing: "-0.14px",
                      color: "#141414",
                      opacity: 0.75,
                    }}
                  >
                    {t(`grid.${i}.tagline`)}
                  </p>
                </div>
              </CardWrapper>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              <p className="bw-eyebrow" style={{ color: "rgba(249,249,249,0.85)" }}>
                {t("eyebrow").replace(/·/g, "").trim()}
              </p>
              <h2
                className="bw-display"
                style={{ fontSize: "clamp(32px, 3.4vw, 52px)", color: "#f9f9f9" }}
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

            {/* Right: clipped scrolling list */}
            <div
              ref={listWrapperRef}
              style={{
                flex: 1,
                maxWidth: "630px",
                position: "relative",
                height: "50vh",
                overflow: "hidden",
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
                  <CardWrapper
                    key={i}
                    href={PRODUCT_IDS[i] ? `/${locale}/solutions/${PRODUCT_IDS[i]}` : null}
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
                      cursor: PRODUCT_IDS[i] ? "pointer" : "default",
                    }}
                  >
                    <div style={{ width: "143px", height: `${CARD_H}px`, flexShrink: 0, overflow: "hidden" }}>
                      <img
                        src={src}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
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
                  </CardWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

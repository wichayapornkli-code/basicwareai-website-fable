"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useDark } from "@/components/ThemeProvider";
import AccentWords from "@/components/anim/AccentWords";

const FONT = '"Plus Jakarta Sans", sans-serif';
const EMAIL = "info@basic-ware.ai";

export default function ContactPage() {
  const t = useTranslations("contact");
  const { isDark } = useDark();

  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const emailCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([eyebrowRef.current, titleRef.current, bodyRef.current, taglineRef.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(rightCardRef.current, { opacity: 0, scale: 0.96 });
      gsap.set(emailCardRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.25)
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.45)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.62)
        .to(rightCardRef.current, { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" }, 0.2)
        .to(emailCardRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.52);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        backgroundColor: isDark ? "#0d0d0d" : "#fff",
      }}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          flex: isMobile ? "0 0 auto" : "0 0 42%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile
            ? "clamp(100px, 18vw, 140px) clamp(28px, 7vw, 60px) 48px"
            : "clamp(80px, 10vw, 140px) clamp(40px, 5vw, 80px) 80px clamp(40px, 5vw, 80px)",
          gap: "clamp(16px, 2.5vw, 28px)",
        }}
      >
        <p ref={eyebrowRef} className="bw-eyebrow" style={{ color: "var(--c-accent)" }}>
          {t("eyebrow").replace(/·/g, "").trim()}
        </p>

        <h1
          ref={titleRef}
          className="bw-display"
          style={{
            fontWeight: 500,
            fontSize: "var(--fs-heading-xl)",
            lineHeight: 1.04,
          }}
        >
          <AccentWords text={t("title")} count={2} />
        </h1>

        <p
          ref={bodyRef}
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "var(--fs-body-lg)",
            lineHeight: 1.7,
            color: isDark ? "#a0a0a0" : "#757575",
            maxWidth: "390px",
          }}
        >
          {t("body")}
        </p>

        <p
          ref={taglineRef}
          style={{
            margin: 0,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "var(--fs-body-sm)",
            color: isDark ? "#e0e0e0" : "#141414",
            textTransform: "uppercase",
            opacity: 0.7,
            letterSpacing: "0.05em",
          }}
        >
          {t("tagline")}
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          flex: 1,
          padding: isMobile
            ? "0 clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px)"
            : "24px 24px 24px 0",
          display: "flex",
          minHeight: isMobile ? "60vh" : undefined,
        }}
      >
        <div
          ref={rightCardRef}
          style={{
            flex: 1,
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0148ae",
          }}
        >
          {/* Hero background image */}
          <img
            src={isDark ? "/assets/hero_dark.png" : "/assets/hero_bg.png"}
            alt=""
            style={{
              position: "absolute",
              top: "-5%",
              left: 0,
              width: "100%",
              height: "110%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: 0.38,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          {/* Email card */}
          <div
            ref={emailCardRef}
            style={{
              position: "relative",
              zIndex: 1,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "20px",
              padding: "clamp(32px, 4vw, 56px) clamp(28px, 3.5vw, 48px)",
              width: "min(90%, 460px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: "var(--fs-body-sm)",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {t("reachUsAt")}
            </p>

            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-heading-md)",
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

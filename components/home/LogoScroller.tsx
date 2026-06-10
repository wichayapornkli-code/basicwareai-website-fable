"use client";

import { useDark } from "@/components/ThemeProvider";

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

function LogoStrip({ ariaHidden, isDark }: { ariaHidden?: boolean; isDark: boolean }) {
  return (
    <div aria-hidden={ariaHidden} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
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
                opacity: 0.65,
                display: "block",
                flexShrink: 0,
              }}
            />
          </div>
          {i < LOGOS.length - 1 && (
            <div style={{ width: 1, height: 32, backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "#e0e0e0", flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function LogoScroller() {
  const { isDark } = useDark();

  return (
    <section
      style={{
        backgroundColor: isDark ? "#0d0d0d" : "#fff",
        padding: "20px 0 28px",
        overflow: "hidden",
      }}
    >
      <div
        role="marquee"
        aria-label="Trusted by our clients"
        style={{
          display: "flex",
          animation: "marquee 28s linear infinite",
          willChange: "transform",
        }}
      >
        <LogoStrip isDark={isDark} />
        <LogoStrip isDark={isDark} ariaHidden />
      </div>
    </section>
  );
}

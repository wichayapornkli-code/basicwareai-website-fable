"use client";

import { useDark } from "@/components/ThemeProvider";
import { CLIENT_LOGOS } from "@/components/home/clientLogos";

function LogoStrip({ ariaHidden, isDark }: { ariaHidden?: boolean; isDark: boolean }) {
  return (
    <div aria-hidden={ariaHidden} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {CLIENT_LOGOS.map((logo, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ padding: "0 44px" }}>
            <img
              src={isDark ? logo.darkSrc : logo.src}
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
          {i < CLIENT_LOGOS.length - 1 && (
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
        width: "100%",
        maxWidth: "100vw",
        minWidth: 0,
        boxSizing: "border-box",
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

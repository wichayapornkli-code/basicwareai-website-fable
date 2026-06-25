"use client";

import { useDark } from "@/components/ThemeProvider";
import { CLIENT_LOGOS } from "@/components/home/clientLogos";

type ClientLogoMarqueeProps = {
  durationSec?: number;
  grayscale?: boolean;
  opacity?: { light: number; dark: number };
  edgeFadeColor?: string;
  contained?: boolean;
  ariaLabel?: string;
};

function LogoStrip({
  ariaHidden,
  isDark,
  grayscale,
  opacity,
}: {
  ariaHidden?: boolean;
  isDark: boolean;
  grayscale?: boolean;
  opacity: number;
}) {
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
                opacity,
                filter: grayscale ? "grayscale(1)" : undefined,
                display: "block",
                flexShrink: 0,
              }}
            />
          </div>
          {i < CLIENT_LOGOS.length - 1 && (
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

export default function ClientLogoMarquee({
  durationSec = 28,
  grayscale = false,
  opacity = { light: 0.65, dark: 0.65 },
  edgeFadeColor,
  contained = false,
  ariaLabel = "Trusted by our clients",
}: ClientLogoMarqueeProps) {
  const { isDark } = useDark();
  const logoOpacity = isDark ? opacity.dark : opacity.light;

  const marquee = (
    <div
      style={{
        overflow: "hidden",
        padding: "clamp(36px, 4vw, 60px) 0 clamp(40px, 5vw, 70px)",
        position: "relative",
      }}
    >
      {edgeFadeColor && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "clamp(40px, 8vw, 100px)",
              background: `linear-gradient(to right, ${edgeFadeColor}, transparent)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100px",
              background: `linear-gradient(to left, ${edgeFadeColor}, transparent)`,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </>
      )}
      <div
        role="marquee"
        aria-label={ariaLabel}
        style={{
          display: "flex",
          animation: `marquee ${durationSec}s linear infinite`,
          willChange: "transform",
        }}
      >
        <LogoStrip isDark={isDark} grayscale={grayscale} opacity={logoOpacity} />
        <LogoStrip isDark={isDark} grayscale={grayscale} opacity={logoOpacity} ariaHidden />
      </div>
    </div>
  );

  if (!contained) return marquee;

  return (
    <div
      style={{
        maxWidth: "774px",
        margin: "0 auto",
        padding: "0 clamp(20px, 5vw, 40px)",
        boxSizing: "content-box",
      }}
    >
      {marquee}
    </div>
  );
}

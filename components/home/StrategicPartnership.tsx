"use client";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function StrategicPartnership() {
  const t = useTranslations("partnership");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();

  return (
    <section
      style={{
        backgroundColor: isDark ? "#0d0d0d" : "#fff",
        paddingTop: "clamp(8px, 1vw, 16px)",
        paddingBottom: "clamp(20px, 2.5vw, 48px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90vw",
          backgroundColor: "#020b2b",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: isMobile ? "auto" : "clamp(300px, 42vw, 70vh)",
        }}
      >
        {/* Left half — text */}
        <div
          style={{
            flex: isMobile ? "0 0 100%" : "0 0 50%",
            padding: "clamp(36px, 5%, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(32px, 4vw, 60px)",
            boxSizing: "border-box",
          }}
        >
          {/* Top: eyebrow + title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p className="bw-eyebrow" style={{ color: "#6cb8ff" }}>
              {t("eyebrow").replace(/·/g, "").trim()}
            </p>
            <h2
              className="bw-display"
              style={{
                fontWeight: 500,
                fontSize: "var(--fs-heading-lg)",
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              {t("title")}
            </h2>
          </div>

          {/* Bottom: body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "11px",
              color: "#fff",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: "var(--fs-heading-sm)",
              letterSpacing: "-0.176px",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, lineHeight: 1.5 }}>
              {t("partnerTitle")}
            </p>
            <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
              {t("partnerBody1")}
            </p>
            <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
              {t("partnerBody2")}
            </p>
            <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
              {t("partnerBody3")}
            </p>
          </div>
        </div>

        {/* Right half — video */}
        <div style={{ flex: isMobile ? "0 0 100%" : "0 0 50%", position: "relative", overflow: "hidden", minHeight: isMobile ? "220px" : undefined }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          >
            <source src="/assets/partner.mp4" type="video/mp4" />
          </video>
          {/* BytePlus logo — center bottom */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(24px, 3vw, 40px)",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/byteplus%20logo.png"
              alt="BytePlus"
              style={{ height: "44px", width: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

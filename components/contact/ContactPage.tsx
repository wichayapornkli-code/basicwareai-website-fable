"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useDark } from "@/components/ThemeProvider";
import AccentWords from "@/components/anim/AccentWords";

const FONT = '"Plus Jakarta Sans", sans-serif';

export default function ContactPage() {
  const t = useTranslations("contact");
  const { isDark } = useDark();

  const [isMobile, setIsMobile] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const formFields = formFieldsRef.current ? Array.from(formFieldsRef.current.children) : [];

      gsap.set([eyebrowRef.current, titleRef.current, bodyRef.current, taglineRef.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(rightCardRef.current, { opacity: 0, scale: 0.96 });
      gsap.set(formCardRef.current, { opacity: 0, y: 24 });
      gsap.set(formFields, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.25)
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.45)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.62)
        .to(rightCardRef.current, { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" }, 0.2)
        .to(formCardRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.52)
        .to(formFields, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.66);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontFamily: FONT,
    fontSize: "14px",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: "10px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <>
      <style>{`
        .contact-field::placeholder { color: rgba(255,255,255,0.3); }
        .contact-field:focus { border-color: rgba(255,255,255,0.5) !important; }
        .contact-submit:hover { background: #f0f0f0 !important; }
      `}</style>

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
              fontSize: "clamp(34px, 3.8vw, 64px)",
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
              fontWeight: 400,
              fontSize: "clamp(14px, 1.15vw, 17px)",
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
              fontWeight: 400,
              fontSize: "10px",
              color: isDark ? "#e0e0e0" : "#141414",
              textTransform: "uppercase",
              opacity: 0.38,
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
            minHeight: isMobile ? "85vh" : undefined,
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

            {/* Frosted glass form card */}
            <div
              ref={formCardRef}
              style={{
                position: "relative",
                zIndex: 1,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "20px",
                padding: "clamp(24px, 3vw, 40px)",
                width: "min(90%, 460px)",
                margin: "clamp(20px, 3vw, 40px) 0",
              }}
            >
              {status === "success" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    padding: "32px 0",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#00dfef",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path
                        d="M2 8L8.5 14L20 2"
                        stroke="#0148ae"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: "20px",
                      color: "#fff",
                    }}
                  >
                    {t("form.successTitle")}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: FONT,
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.65,
                    }}
                  >
                    {t("form.successBody")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    ref={formFieldsRef}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div>
                      <label style={labelStyle}>{t("form.name")}</label>
                      <input
                        className="contact-field"
                        type="text"
                        required
                        value={fields.name}
                        onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>{t("form.email")}</label>
                      <input
                        className="contact-field"
                        type="email"
                        required
                        value={fields.email}
                        onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>{t("form.company")}</label>
                      <input
                        className="contact-field"
                        type="text"
                        value={fields.company}
                        onChange={(e) => setFields((f) => ({ ...f, company: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>{t("form.message")}</label>
                      <textarea
                        className="contact-field"
                        required
                        rows={4}
                        value={fields.message}
                        onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                        style={{ ...inputStyle, resize: "none" }}
                      />
                    </div>

                    {status === "error" && (
                      <p
                        style={{
                          margin: 0,
                          fontFamily: FONT,
                          fontSize: "13px",
                          color: "#ff8080",
                          lineHeight: 1.5,
                        }}
                      >
                        {t("form.errorBody")}
                      </p>
                    )}

                    <button
                      className="contact-submit"
                      type="submit"
                      disabled={status === "submitting"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        backgroundColor: "#fff",
                        color: "#141414",
                        border: "none",
                        borderRadius: "40px",
                        padding: "14px 28px",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: status === "submitting" ? "default" : "pointer",
                        opacity: status === "submitting" ? 0.65 : 1,
                        transition: "opacity 0.2s ease, background 0.2s ease",
                        marginTop: "4px",
                        width: "100%",
                      }}
                    >
                      {status === "submitting" ? t("form.submitting") : t("form.submit")}
                      {status !== "submitting" && (
                        <img
                          src="/assets/arrow-dark.svg"
                          alt=""
                          width={13}
                          height={13}
                          style={{ display: "block" }}
                        />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

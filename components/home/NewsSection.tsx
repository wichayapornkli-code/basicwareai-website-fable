"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

const FONT = '"Plus Jakarta Sans", sans-serif';

const COPY = {
  en: {
    eyebrow: "· NEWS ·",
    headline: "Hutchison Telecom and Basicware AI Form Strategic Alliance with Alibaba Cloud",
    cta: "Read more",
  },
  zh: {
    eyebrow: "· 最新消息 ·",
    headline: "和記電訊與Basicware AI攜手阿里雲達成戰略聯盟",
    cta: "阅读更多",
  },
};

export default function NewsSection() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const copy = isZh ? COPY.zh : COPY.en;

  return (
    <section
      style={{
        backgroundColor: "#0148ae",
        padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(16px, 2vw, 20px)",
        textAlign: "center",
      }}
    >
      <p
        className="bw-eyebrow"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        {copy.eyebrow}
      </p>

      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "var(--fs-heading-lg)",
          lineHeight: 1.2,
          letterSpacing: "-0.352px",
          color: "#fff",
          maxWidth: "600px",
        }}
      >
        {copy.headline}
      </h2>

      <Link
        href={`/${locale}/press-releases/3hk-alibaba-basicware-alliance`}
        className="bw-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#fff",
          borderRadius: "40px",
          padding: "10px 20px",
          textDecoration: "none",
          color: "#0148ae",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: "var(--fs-body-sm)",
          letterSpacing: "-0.154px",
          whiteSpace: "nowrap",
          marginTop: "4px",
        }}
      >
        {copy.cta}
        <img
          src="/assets/arrow.svg"
          alt=""
          width={13}
          height={13}
          style={{ display: "block" }}
        />
      </Link>
    </section>
  );
}

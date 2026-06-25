"use client";

import { useTranslations } from "next-intl";
import LogoScroller from "@/components/home/LogoScroller";
import { useDark } from "@/components/ThemeProvider";
import AccentWords from "@/components/anim/AccentWords";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const TEAM_PHOTOS = ["Paul", "Zane", "Fox", "Vulcan", "Richard"];

const FONT = '"Plus Jakarta Sans", sans-serif';

const SECTION_PAD_Y = "clamp(48px, 5.5vw, 72px)";
const SECTION_PAD_X = "clamp(20px, 5vw, 40px)";
const SECTION_PAD = `${SECTION_PAD_Y} ${SECTION_PAD_X}`;
const SECTION_HEADER_GAP = "clamp(28px, 3.5vw, 44px)";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p className="bw-eyebrow" style={{ color: "var(--c-accent)" }}>{children}</p>
    </div>
  );
}

function SectionImage({
  src,
  alt = "",
  isDark,
  style,
}: {
  src: string;
  alt?: string;
  isDark: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        display: "block",
        width: "100%",
        objectFit: "cover",
        borderRadius: "20px",
        outline: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: isDark
          ? "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)"
          : "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        ...style,
      }}
    />
  );
}

function BasicwareLogo({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="418"
      height="469"
      viewBox="0 0 418 469"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        display: "block",
        width: "clamp(76px, 10vw, 112px)",
        height: "auto",
        ...style,
      }}
    >
      <path d="M99.5232 73.0746C102.358 72.322 107.682 71.8262 110.721 71.5103C135.884 69.0707 161.177 74.5992 183.027 87.3144C198.839 96.4756 213.173 108.97 226.535 121.334C227.066 121.824 229.457 123.952 229.747 124.438C232.656 126.888 236.367 130.897 239.156 133.655L260.281 154.891C270.449 164.972 282.224 176.396 295.32 182.57C293.626 182.29 287.107 179.805 284.99 179.133C277.04 176.534 268.776 175.013 260.421 174.613C249.339 174.111 239.775 175.734 228.843 176.911C214.563 178.448 200.509 177.847 186.457 174.876C174.292 172.304 164.207 167.926 153.03 162.468C143.855 157.987 134.345 153.057 124.532 150.115C122.868 149.616 116.438 148.081 114.895 148.95C107.554 146.783 97.3277 149.198 90.8872 152.913C71.8371 163.902 62.8027 186.086 68.0396 207.385C68.4731 209.148 70.2574 213.615 70.3796 214.907C77.9767 231.656 90.1301 241.984 108.128 246.178C88.3893 244.66 72.7695 238.738 56.4203 227.495C51.8243 224.335 45.0871 218.965 41.4152 214.901C39.6636 213.43 36.8997 210.269 35.3819 208.465C26.3266 197.872 20.2712 185.048 17.8447 171.326C15.226 156.698 15.9437 143.367 22.174 129.624C23.3395 127.053 24.806 124.029 26.4023 121.731C34.0401 107.62 50.7005 93.2639 64.6344 85.6827C74.4059 80.3664 88.445 74.6288 99.5232 73.0746Z" fill="url(#brandCoreLogoPaint0)"/>
      <path d="M5.85316 153.481L7.38285 152.76L7.64311 152.869L7.96832 154.27C5.57958 172.622 11.803 193.092 22.644 207.936C39.8005 231.745 67.9898 247.048 96.7218 251.406C124.231 255.577 161.526 245.461 183.733 228.921C205.736 248.693 237.283 269.656 266.588 275.82C260.628 278.082 255.918 280.61 250.213 283.47C244.129 286.519 238.015 289.512 231.876 292.448C189.023 312.838 142.779 331.219 94.9285 317.37C60.9456 307.325 32.3775 284.135 15.5623 252.945C11.7264 245.902 8.81387 238.68 6.34673 231.064C-2.09469 205.011 -1.84456 179.704 5.85316 153.481Z" fill="url(#brandCoreLogoPaint1)"/>
      <path d="M391.108 67.1686L391.513 67.3596C394.316 71.3129 402.692 83.662 404.13 88.1252C402.57 89.2178 400.372 90.44 398.697 91.4239L398.414 91.4986C397.823 91.0302 397.231 89.4431 396.863 88.7064C393.683 82.3593 389.727 76.6229 385.636 70.8591L391.108 67.1686Z" fill="#099FAE"/>
      <path d="M368.836 42.2778C372.03 44.439 383.901 56.5604 385.885 59.774C384.969 60.79 382.336 63.0096 381.252 63.8275L380.889 63.8745C380.081 63.3023 379.331 62.381 378.657 61.6275C374.232 56.6734 369.337 52.251 364.475 47.7345C365.918 45.9081 367.372 44.089 368.836 42.2778Z" fill="#099FAE"/>
      <path d="M342.644 24.8265C345.293 26.0667 353.335 30.9552 355.6 32.5605C358.11 33.976 359.783 35.3139 362.008 37.1573C361.132 38.7177 359.514 41.1207 358.446 42.6215C357.567 42.154 348.804 36.3327 348.393 35.8357C345.937 34.6326 342.021 32.1774 339.356 30.7265C340.359 28.509 341.165 26.7604 342.644 24.8265Z" fill="#099FAE"/>
      <path d="M406.691 96.6025L407.214 96.7723C409.699 99.9088 414.039 114.435 414.57 118.932C412.966 119.208 411.188 119.399 409.549 119.637C408.896 119.638 408.797 119.677 408.166 119.466C406.183 112.098 404.54 106.263 401.61 99.0696C403.536 98.2324 404.862 97.6229 406.691 96.6025Z" fill="#099FAE"/>
      <path d="M414.642 127.524C415.362 127.438 415.334 127.408 416.02 127.597C417.861 130.518 417.985 146.972 417.767 150.976C416.282 150.889 415.523 150.843 414.055 150.555C413.16 150.452 412.44 150.314 411.551 150.143C411.535 141.581 411.243 137.197 410.219 128.726C411.583 128.254 413.224 127.882 414.642 127.524Z" fill="#099FAE"/>
      <path d="M313.853 14.213C319.265 15.6188 330.382 18.6323 335.115 21.4888C334.393 23.5653 333.718 24.7026 332.554 26.5506L332.305 26.753C331.431 26.8612 326.516 24.8565 325.4 24.426C320.984 22.7219 316.75 21.5814 312.205 20.3326C312.523 18.1378 313.073 16.2744 313.853 14.213Z" fill="#099FAE"/>
      <path d="M411.146 158.697C412.55 158.654 415.889 158.961 416.784 160.056C417.504 163.689 413.24 178.134 412.147 182.044C409.782 181.344 408.359 180.561 406.185 179.39C407.039 175.906 408.346 172.334 409.188 168.795C409.991 165.412 410.431 162.084 411.146 158.697Z" fill="#099FAE"/>
      <path d="M271.241 10.4485C272.387 10.3404 273.809 10.3972 274.98 10.4071C275.197 12.5535 275.146 14.6745 275.137 16.83C269.276 16.945 263.963 17.265 258.18 18.2058C257.059 18.3816 255.943 18.5767 254.829 18.791C254.208 16.6764 253.957 14.718 253.716 12.5387C259.993 11.4687 264.938 10.981 271.241 10.4485Z" fill="#099FAE"/>
      <path d="M283.605 10.4612C289.408 10.3056 299.112 11.6843 304.934 12.5609C304.895 14.585 304.635 16.517 304.297 18.5076C303.3 18.672 296.512 17.5224 294.68 17.3953C291.044 17.1428 287.268 16.9577 283.616 16.7541L283.605 10.4612Z" fill="#099FAE"/>
      <path d="M164.904 46.2203C166.284 46.3641 168.385 50.3537 169.062 51.5127C162.831 54.8689 158.119 58.6539 152.648 61.7182C151.056 60.2229 149.456 58.7365 147.848 57.2592C153.085 53.5618 159.35 49.4293 164.904 46.2203Z" fill="#099FAE"/>
      <path d="M403.092 187.628C404.853 187.974 407.124 189.315 408.696 190.192C406.482 195.189 401.047 203.974 398.182 209.027C397.077 209.086 394.12 206.687 393.034 205.907C396.64 199.957 399.997 193.859 403.092 187.628Z" fill="#099FAE"/>
      <path d="M190.79 33.1542C191.64 33.6443 193.226 37.5161 193.645 38.5715C188.911 40.8716 184.152 43.3905 179.547 45.9389C178.355 46.5983 177.352 47.3134 176.065 47.8291C174.955 46.1209 173.668 43.8194 172.607 42.0312C178.403 39.1037 184.887 35.7806 190.79 33.1542Z" fill="#099FAE"/>
      <path d="M217.16 22.0904L217.595 22.1701C218.472 22.946 219.367 26.4803 219.76 27.7786C218.75 28.2218 217.394 28.6842 216.319 29.0362C211.089 30.7483 206.284 33.3662 201.248 35.4804C200.375 33.5399 199.076 32.0114 198.488 29.7081C204.6 26.9004 210.829 24.3589 217.16 22.0904Z" fill="#099FAE"/>
      <path d="M244.474 14.3265C244.796 14.2661 244.96 14.2965 245.293 14.3051C246.177 15.4527 246.393 18.7383 246.58 20.301C239.306 21.9584 235.033 23.1038 227.991 25.1939L227.837 25.2033C227.098 24.4445 226.224 20.7845 225.902 19.5606C230.734 17.4337 239.331 15.473 244.474 14.3265Z" fill="#099FAE"/>
      <path d="M224.139 97.3362C226.624 95.5659 233.392 91.9262 236.229 90.4125C259.208 78.1494 286.426 72.0488 312.359 76.1534C317.712 77.0004 322.006 77.5608 327.356 79.2013C331.196 79.7816 336.187 81.7136 339.849 83.0959C357.517 89.7644 372.941 100.983 384.253 116.154C401.323 139.053 410.603 186.653 392.392 216.47C391.442 218.026 389.486 220.248 388.259 221.676C380.719 230.392 372.023 238.038 362.409 244.4C361.359 245.086 358.494 246.935 357.464 247.271C357.04 247.761 352.272 250.394 351.317 250.916C337.324 258.573 321.886 263.23 306.024 264.631C282.924 266.674 260.667 259.519 240.397 248.958C238.448 247.943 229.938 243.422 228.518 242.207C225.808 240.972 220.423 237.267 217.733 235.355C191.857 216.96 169.766 193.221 146.914 171.32C142.365 166.96 137.93 163.361 133.294 159.284C132.069 158.774 127.845 155.248 126.45 154.337C122.446 151.72 119.281 150.513 114.895 148.95C116.438 148.081 122.868 149.616 124.532 150.116C134.345 153.057 143.855 157.987 153.03 162.468C164.207 167.926 174.292 172.304 186.457 174.876C200.509 177.847 214.563 178.448 228.843 176.911C239.775 175.734 249.339 174.111 260.421 174.613C268.776 175.013 277.04 176.534 284.99 179.133C287.107 179.805 293.626 182.29 295.32 182.57C305.863 185.877 310.999 186.227 321.048 181.877C330.499 177.043 336.496 170.652 341.121 161.068C352.104 138.462 345.797 112.91 326.939 96.7011C317.877 88.9142 307.865 85.4278 296.27 83.5329C285.512 82.0072 274.971 83.1219 264.503 85.7686C262.623 86.2437 257.31 88.2182 256.134 88.3473C251.131 90.7613 247.512 91.9106 242.272 94.8579C237.801 97.372 234.23 100.165 230.191 102.502C228.537 101.284 225.594 98.7436 224.139 97.3362Z" fill="url(#brandCoreLogoPaint2)"/>
      <defs>
        <linearGradient id="brandCoreLogoPaint0" x1="155.867" y1="70.9473" x2="155.867" y2="246.178" gradientUnits="userSpaceOnUse">
          <stop stopColor="#016DB5" />
          <stop offset="1" stopColor="#001627" />
        </linearGradient>
        <radialGradient id="brandCoreLogoPaint1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(133.232 280.298) rotate(89.8831) scale(41.892 115.42)">
          <stop stopColor="#015186" />
          <stop offset="1" stopColor="#001D55" />
        </radialGradient>
        <linearGradient id="brandCoreLogoPaint2" x1="371.816" y1="228.793" x2="245.394" y2="200.274" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00EFC8" />
          <stop offset="1" stopColor="#009A9A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AccentBody({
  translationKey,
  t,
}: {
  translationKey: string;
  t: ReturnType<typeof useTranslations<"about">>;
}) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: "var(--fs-body)",
        lineHeight: 1.65,
        letterSpacing: "-0.154px",
        color: "inherit",
        textWrap: "pretty",
      }}
    >
      {t.rich(translationKey, {
        accent: (chunks) => <>{chunks}</>,
      })}
    </p>
  );
}

function SectionHeading({
  children,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: Tag === "h1" ? "var(--fs-display)" : "var(--fs-heading-lg)",
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: "inherit",
        textWrap: "balance",
      }}
    >
      {children}
    </Tag>
  );
}

function TwoColumnHeader({
  eyebrow,
  title,
  subtitle,
  isDark,
  titleAs = "h2",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  isDark: boolean;
  titleAs?: "h1" | "h2";
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(40px, 5vw, 80px)",
        alignItems: "flex-end",
        marginBottom: SECTION_HEADER_GAP,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flexShrink: 0, minWidth: "200px", flex: "0 0 clamp(200px, 30%, 300px)" }}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <SectionHeading as={titleAs}>
          {titleAs === "h1" ? <AccentWords text={title} /> : title}
        </SectionHeading>
      </div>
      {subtitle ? (
        <p
          style={{
            flex: "1 1 240px",
            margin: 0,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "var(--fs-body)",
            lineHeight: 1.65,
            color: isDark ? "#a0a0a0" : "#757575",
            letterSpacing: "-0.176px",
            maxWidth: "520px",
            textWrap: "pretty",
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function NumberedDividerGrid({
  count,
  translationPrefix,
  t,
  isDark,
  isMobile,
  badgeColor = "#1c0a3d",
}: {
  count: number;
  translationPrefix: string;
  t: ReturnType<typeof useTranslations<"about">>;
  isDark: boolean;
  isMobile: boolean;
  badgeColor?: string;
}) {
  const divider = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const cellBg = isDark ? "#141414" : "#fff";
  const headingColor = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: "2px",
        backgroundColor: divider,
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: cellBg,
            padding: "clamp(28px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            color: muted,
            gridColumn: !isMobile && count % 2 !== 0 && i === count - 1 ? "1 / -1" : undefined,
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: badgeColor,
              opacity: 0.85,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-body-sm)",
              }}
            >
              {i + 1}
            </span>
          </div>
          <h3
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-heading-sm)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: headingColor,
              textWrap: "balance",
            }}
          >
            {t(`${translationPrefix}.cards.${i}.title`)}
          </h3>
          <AccentBody translationKey={`${translationPrefix}.cards.${i}.body`} t={t} />
        </div>
      ))}
    </div>
  );
}

function DotDividerGrid({
  count,
  translationPrefix,
  t,
  isDark,
  isMobile,
}: {
  count: number;
  translationPrefix: string;
  t: ReturnType<typeof useTranslations<"about">>;
  isDark: boolean;
  isMobile: boolean;
}) {
  const divider = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const surfaceBg = isDark ? "#1a1a1a" : "#f9f9f9";
  const headingColor = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: "2px",
        backgroundColor: divider,
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const isLastOdd = !isMobile && count % 2 !== 0 && i === count - 1;

        return (
        <div
          key={i}
          style={{
            backgroundColor: surfaceBg,
            padding: "clamp(28px, 3vw, 44px)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            color: muted,
            gridColumn: isLastOdd ? "1 / -1" : undefined,
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "var(--c-accent)",
              flexShrink: 0,
            }}
          />
          <h3
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-heading-sm)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: headingColor,
              textWrap: "balance",
            }}
          >
            {t(`${translationPrefix}.cards.${i}.title`)}
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "var(--fs-body)",
              lineHeight: 1.65,
              letterSpacing: "-0.154px",
              color: muted,
              textWrap: "pretty",
            }}
          >
            {t(`${translationPrefix}.cards.${i}.body`)}
          </p>
        </div>
        );
      })}
    </div>
  );
}

function LabelBodyStack({
  count,
  translationPrefix,
  t,
  isDark,
  isMobile,
}: {
  count: number;
  translationPrefix: string;
  t: ReturnType<typeof useTranslations<"about">>;
  isDark: boolean;
  isMobile: boolean;
}) {
  const labelColor = isDark ? "#909090" : "#757575";
  const textColor = isDark ? "#e0e0e0" : "#141414";
  const divider = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            paddingTop: i > 0 ? "clamp(24px, 3vw, 32px)" : undefined,
            paddingBottom: i < count - 1 ? "clamp(24px, 3vw, 32px)" : undefined,
            borderBottom: i < count - 1 ? `1px solid ${divider}` : undefined,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "clamp(40px, 6vw, 80px)",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "flex-start",
            }}
          >
          <div
            style={{
              flexShrink: 0,
              flex: isMobile ? undefined : "0 0 clamp(160px, 22%, 240px)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-overline)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                color: labelColor,
              }}
            >
              {t(`${translationPrefix}.cards.${i}.title`)}
            </p>
          </div>
          <p
            style={{
              flex: 1,
              margin: 0,
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: 1.7,
              letterSpacing: "-0.02em",
              color: textColor,
              textWrap: "pretty",
            }}
          >
            {t.rich(`${translationPrefix}.cards.${i}.body`, {
              accent: (chunks) => <>{chunks}</>,
            })}
          </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();

  const headingColor = isDark ? "#e0e0e0" : "#141414";
  const bodyMuted = isDark ? "#a0a0a0" : "#757575";
  const sectionBgAlt = isDark ? "#0d0d0d" : "#fafafa";
  const sectionBg = isDark ? "#0d0d0d" : "#fff";

  return (
    <>
      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: sectionBgAlt,
          paddingTop: "clamp(120px, 12vw, 168px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
          paddingLeft: SECTION_PAD_X,
          paddingRight: SECTION_PAD_X,
          color: headingColor,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: "clamp(40px, 5vw, 80px)",
              alignItems: "flex-start",
              marginBottom: SECTION_HEADER_GAP,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flexShrink: 0, minWidth: "220px", flex: "0 0 clamp(220px, 28%, 340px)" }}>
              <SectionEyebrow>{t("story.eyebrow")}</SectionEyebrow>
              <h1 className="bw-display" style={{ fontSize: "var(--fs-display)", textWrap: "balance" }}>
                <AccentWords text={t("story.title")} />
              </h1>
            </div>

            <div
              style={{
                flex: "1 1 300px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingTop: "4px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "var(--fs-body-lg)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.176px",
                  color: headingColor,
                  textWrap: "pretty",
                }}
              >
                {t("story.p1")}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                  gap: "clamp(24px, 3vw, 40px)",
                }}
              >
                {[2, 3].map((i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      fontFamily: FONT,
                      fontWeight: 500,
                      fontSize: "var(--fs-body)",
                      lineHeight: 1.7,
                      letterSpacing: "-0.154px",
                      color: bodyMuted,
                      textWrap: "pretty",
                    }}
                  >
                    {t(`story.p${i}`)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <SectionImage
            src="/assets/about_01.avif"
            isDark={isDark}
            style={{ height: "clamp(280px, 35vw, 520px)", marginTop: SECTION_HEADER_GAP }}
          />
        </div>
      </section>

      <LogoScroller />

      {/* ── Brand Core ────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: sectionBg,
          paddingTop: "clamp(24px, 3vw, 40px)",
          paddingBottom: SECTION_PAD_Y,
          paddingLeft: SECTION_PAD_X,
          paddingRight: SECTION_PAD_X,
          color: headingColor,
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "clamp(20px, 2.5vw, 28px)",
              maxWidth: "860px",
              marginInline: "auto",
              marginBottom: SECTION_HEADER_GAP,
            }}
          >
            <div style={{ marginBottom: "4px" }}>
              <p className="bw-eyebrow" style={{ color: "var(--c-accent)", justifyContent: "center" }}>
                {t("brandCore.eyebrow")}
              </p>
            </div>

            <SectionHeading>{t("brandCore.title")}</SectionHeading>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "var(--fs-body-lg)",
                  lineHeight: 1.65,
                  letterSpacing: "-0.154px",
                  color: headingColor,
                  textWrap: "pretty",
                }}
              >
                {t("brandCore.p1")}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  maxWidth: "56ch",
                  marginInline: "auto",
                }}
              >
                {[2, 3].map((i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      fontFamily: FONT,
                      fontWeight: 500,
                      fontSize: "var(--fs-body)",
                      lineHeight: 1.65,
                      letterSpacing: "-0.154px",
                      color: bodyMuted,
                      textWrap: "pretty",
                    }}
                  >
                    {t(`brandCore.p${i}`)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: "860px",
              marginInline: "auto",
              backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: isDark
                ? "0 2px 24px rgba(0,0,0,0.4)"
                : "0 2px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                padding: "clamp(28px, 3.5vw, 44px) clamp(20px, 3vw, 32px)",
                textAlign: "center",
              }}
            >
              <BasicwareLogo style={{ margin: "0 auto 24px" }} />
              <p
                className="bw-mono-label"
                style={{
                  margin: "0 0 16px 0",
                  color: bodyMuted,
                  opacity: 0.85,
                }}
              >
                {t("brandCore.quoteLabel")}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: headingColor,
                  textWrap: "balance",
                  maxWidth: "800px",
                  marginInline: "auto",
                }}
              >
                &ldquo;<AccentWords text={t("brandCore.quote")} count={3} emStyle={{ color: "#1784d2", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }} />&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Intent ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: sectionBgAlt, padding: SECTION_PAD, color: headingColor }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: "clamp(32px, 4vw, 64px)",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: SECTION_HEADER_GAP,
            }}
          >
            <div style={{ flex: "1 1 280px", minWidth: "240px" }}>
              <SectionEyebrow>{t("brandIntent.eyebrow")}</SectionEyebrow>
              <SectionHeading>{t("brandIntent.title")}</SectionHeading>
            </div>
            <div style={{ flex: "1 1 280px", minWidth: "240px" }}>
              <SectionImage
                src="/assets/about_02.avif"
                isDark={isDark}
                style={{ height: "clamp(220px, 28vw, 360px)" }}
              />
            </div>
          </div>

          <LabelBodyStack
            count={3}
            translationPrefix="brandIntent"
            t={t}
            isDark={isDark}
            isMobile={isMobile}
          />
        </div>
      </section>

      {/* ── Our Role ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: sectionBg, padding: SECTION_PAD, color: headingColor }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <TwoColumnHeader
            eyebrow={t("ourRole.eyebrow")}
            title={t("ourRole.title")}
            subtitle={t("ourRole.subtitle")}
            isDark={isDark}
          />

          <NumberedDividerGrid
            count={3}
            translationPrefix="ourRole"
            t={t}
            isDark={isDark}
            isMobile={isMobile}
          />
        </div>
      </section>

      {/* ── Our Vision ────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: sectionBg,
          padding: `clamp(32px, 4vw, 56px) ${SECTION_PAD_X}`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "90vw",
            maxWidth: "1200px",
            backgroundColor: "#020b2b",
            borderRadius: "24px",
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
            minHeight: isMobile ? undefined : "clamp(320px, 34vw, 480px)",
          }}
        >
          <div
            style={{
              flex: isMobile ? undefined : "1 1 50%",
              minHeight: isMobile ? "220px" : undefined,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="/assets/about_03.avif"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              flex: isMobile ? undefined : "1 1 50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "14px",
              color: "#fff",
              padding: "clamp(28px, 4vw, 48px)",
              boxSizing: "border-box",
            }}
          >
            <p className="bw-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("ourVision.eyebrow")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2
                className="bw-display"
                style={{
                  margin: 0,
                  fontSize: "var(--fs-heading-lg)",
                  color: "#fff",
                  lineHeight: 1.05,
                }}
              >
                <AccentWords
                  text={t("ourVision.title")}
                  count={3}
                  emStyle={{
                    color: "#6cb8ff",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                />
              </h2>

              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                  color: "rgba(255, 255, 255, 0.85)",
                  textWrap: "pretty",
                }}
              >
                {t("ourVision.p1")}
              </p>

              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                  color: "rgba(255, 255, 255, 0.85)",
                  textWrap: "pretty",
                }}
              >
                {t("ourVision.p2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Drives Us ────────────────────────────────────────── */}
      <section style={{ backgroundColor: sectionBg, padding: SECTION_PAD, color: headingColor }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <TwoColumnHeader
            eyebrow={t("values.eyebrow")}
            title={t("values.title")}
            subtitle={t("values.subtitle")}
            isDark={isDark}
          />

          <DotDividerGrid
            count={5}
            translationPrefix="values"
            t={t}
            isDark={isDark}
            isMobile={isMobile}
          />

        </div>
      </section>

      {/* ── Meet the Team ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: sectionBgAlt,
          paddingTop: SECTION_PAD_Y,
          paddingBottom: "clamp(56px, 6vw, 88px)",
          paddingLeft: SECTION_PAD_X,
          paddingRight: SECTION_PAD_X,
          color: headingColor,
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <TwoColumnHeader
            eyebrow={t("team.eyebrow")}
            title={t("team.title")}
            subtitle={t("team.subtitle")}
            isDark={isDark}
          />

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const name = t(`team.members.${i}.name`);
              return (
                <div
                  key={i}
                  style={{
                    flex: "1 1 280px",
                    backgroundColor: isDark ? "#1e1e1e" : "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e8e8e8",
                    boxShadow: isDark
                      ? "0 1px 2px rgba(0,0,0,0.3)"
                      : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <img
                    src={`/assets/${TEAM_PHOTOS[i]}.png`}
                    alt={name}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "clamp(200px, 22vw, 300px)",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />

                  <div style={{ padding: "24px 24px 28px" }}>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: "var(--fs-body-lg)",
                        color: headingColor,
                        letterSpacing: "-0.176px",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        margin: "0 0 16px 0",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: "var(--fs-overline)",
                        color: "#1784d2",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {t(`team.members.${i}.title`)}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: FONT,
                        fontWeight: 500,
                        fontSize: "var(--fs-body-sm)",
                        lineHeight: 1.65,
                        color: bodyMuted,
                        letterSpacing: "-0.154px",
                        textWrap: "pretty",
                      }}
                    >
                      {t(`team.members.${i}.bio`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

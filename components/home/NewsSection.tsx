"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getHomeNewsArticles, type NewsArticle } from "@/lib/news";
import NewsArticleCard from "@/components/news/NewsArticleCard";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const FONT = '"Plus Jakarta Sans", sans-serif';
const CONTENT_MAX = "1080px";
const H_PAD = "clamp(20px, 5vw, 40px)";
const SECTION_PAD_TOP = "clamp(48px, 6vw, 72px)";
const SECTION_PAD_BOTTOM = "clamp(72px, 9vw, 120px)";
const SECTION_PAD = `${SECTION_PAD_TOP} ${H_PAD} ${SECTION_PAD_BOTTOM}`;
const CARD_DIVIDER_PAD = "clamp(24px, 3vw, 32px)";
const ENTER_DURATION = 0.45;
const ENTER_STAGGER = 0.1;
const ENTER_OFFSET = 12;

function SectionHeading({ locale, isDark }: { locale: string; isDark: boolean }) {
  const tNews = useTranslations("newsPage");
  const tHome = useTranslations("homeNews");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <p data-news-home-enter className="bw-eyebrow">
        {tNews("sectionEyebrow")}
      </p>
      <h2
        data-news-home-enter
        className="bw-display"
        style={{ margin: 0, fontSize: "var(--fs-heading-lg)", textWrap: "balance" }}
      >
        {tNews("sectionTitleLine1")}
        <br />
        <em>{tNews("sectionTitleAccent")}</em>
      </h2>
      <div data-news-home-enter style={{ alignSelf: "flex-start" }}>
        <Link
          href={`/${locale}/news`}
          className="bw-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: isDark ? "#ececea" : "#141414",
            borderRadius: "40px",
            padding: "10px 20px",
            textDecoration: "none",
            color: isDark ? "#111110" : "#fafafa",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "var(--fs-body-sm)",
            letterSpacing: "-0.154px",
            whiteSpace: "nowrap",
          }}
        >
          {tHome("viewAll")}
          <img
            src={isDark ? "/assets/arrow-dark.svg" : "/assets/arrow-white.svg"}
            alt=""
            width={13}
            height={13}
            style={{ display: "block" }}
          />
        </Link>
      </div>
    </div>
  );
}

function NewsCardList({
  articles,
  locale,
  dividerColor,
}: {
  articles: NewsArticle[];
  locale: string;
  dividerColor: string;
}) {
  return (
    <>
      {articles.map((article, index) => (
        <div
          key={article.slug}
          data-news-home-item
          data-news-home-key={article.slug}
          style={{
            width: "100%",
            borderBottom: index < articles.length - 1 ? `1px solid ${dividerColor}` : "none",
            paddingTop: index > 0 ? CARD_DIVIDER_PAD : 0,
            paddingBottom: index < articles.length - 1 ? CARD_DIVIDER_PAD : 0,
          }}
        >
          <NewsArticleCard article={article} locale={locale} />
        </div>
      ))}
    </>
  );
}

function SectionLayout({
  locale,
  articles,
  stickyHeading,
  isDark,
  dividerColor,
}: {
  locale: string;
  articles: NewsArticle[];
  stickyHeading: boolean;
  isDark: boolean;
  dividerColor: string;
}) {
  return (
    <div
      style={{
        maxWidth: CONTENT_MAX,
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: stickyHeading
          ? "minmax(220px, 300px) minmax(0, 1fr)"
          : "1fr",
        gap: stickyHeading ? "clamp(40px, 5vw, 64px)" : "32px",
        alignItems: "start",
        boxSizing: "border-box",
      }}
    >
      <div
        style={
          stickyHeading
            ? {
                position: "sticky",
                top: "clamp(100px, 12vw, 132px)",
                alignSelf: "start",
              }
            : undefined
        }
      >
        <SectionHeading locale={locale} isDark={isDark} />
      </div>

      <div style={{ minWidth: 0 }}>
        <NewsCardList articles={articles} locale={locale} dividerColor={dividerColor} />
      </div>
    </div>
  );
}

function NewsSectionShell({
  children,
  animate,
  isDark,
}: {
  children: ReactNode;
  animate: boolean;
  isDark: boolean;
}) {
  return (
    <section
      className={`bw-home-news${animate ? " bw-home-news--animate" : ""}`}
      style={{ backgroundColor: isDark ? "#111111" : "#f9f9f9" }}
    >
      {children}
      <style>{`
        .bw-home-news--animate [data-news-home-enter]:not([data-news-animated]),
        .bw-home-news--animate [data-news-home-item]:not([data-news-animated]) {
          opacity: 0;
          transform: translate3d(0, ${ENTER_OFFSET}px, 0);
        }
        @media (prefers-reduced-motion: reduce) {
          .bw-home-news--animate [data-news-home-enter]:not([data-news-animated]),
          .bw-home-news--animate [data-news-home-item]:not([data-news-animated]) {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default function NewsSection() {
  const locale = useLocale();
  const { isDark } = useDark();
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const articles = getHomeNewsArticles();
  const { isMobile } = useBreakpoint();
  const [reduceMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const animate = !reduceMotion;

  const sectionRef = useRef<HTMLDivElement>(null);
  const hasScrolledInRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pending = gsap.utils
      .toArray<HTMLElement>("[data-news-home-enter], [data-news-home-item]", section)
      .filter((el) => !el.dataset.newsAnimated);

    if (!pending.length) return;

    if (!animate) {
      pending.forEach((el) => {
        el.dataset.newsAnimated = "true";
      });
      gsap.set(pending, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(pending, { y: ENTER_OFFSET, opacity: 0, force3D: true });

      const reveal = () => {
        gsap.to(pending, {
          y: 0,
          opacity: 1,
          duration: ENTER_DURATION,
          stagger: ENTER_STAGGER,
          ease: "power3.out",
          onComplete: () => {
            pending.forEach((el) => {
              el.dataset.newsAnimated = "true";
            });
            gsap.set(pending, { clearProps: "transform,opacity" });
          },
        });
      };

      if (hasScrolledInRef.current) {
        reveal();
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: () => {
          hasScrolledInRef.current = true;
          reveal();
        },
      });
    }, section);

    return () => ctx.revert();
  }, [animate, articles.length]);

  if (articles.length === 0) return null;

  return (
    <NewsSectionShell animate={animate} isDark={isDark}>
      <div
        ref={sectionRef}
        style={{
          padding: SECTION_PAD,
          boxSizing: "border-box",
        }}
      >
        <SectionLayout
          locale={locale}
          articles={articles}
          stickyHeading={!isMobile}
          isDark={isDark}
          dividerColor={dividerColor}
        />
      </div>
    </NewsSectionShell>
  );
}

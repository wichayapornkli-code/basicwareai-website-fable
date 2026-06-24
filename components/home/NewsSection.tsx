"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { NewsArticle } from "@/lib/news";
import { getHomeNewsArticlesWithMock } from "@/lib/news-mock";
import NewsArticleCard from "@/components/news/NewsArticleCard";
import NewsMockToggle from "@/components/news/NewsMockToggle";
import { useNewsMock } from "@/hooks/useNewsMock";
import { useBreakpoint } from "@/hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const FONT = '"Plus Jakarta Sans", sans-serif';
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const BG = "#f9f9f9";
const CONTENT_MAX = "1080px";
const H_PAD = "clamp(20px, 5vw, 40px)";
const SECTION_PAD_TOP = "clamp(48px, 6vw, 72px)";
const SECTION_PAD_BOTTOM = "clamp(72px, 9vw, 120px)";
const SECTION_PAD = `${SECTION_PAD_TOP} ${H_PAD} ${SECTION_PAD_BOTTOM}`;
const DIVIDER = "#e8e8e8";
const CARD_DIVIDER_PAD = "clamp(24px, 3vw, 32px)";
const ENTER_DURATION = 0.5;
const ENTER_STAGGER = 0.05;

function SectionHeading({ locale }: { locale: string }) {
  const tNews = useTranslations("newsPage");
  const tHome = useTranslations("homeNews");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <p className="bw-eyebrow" style={{ color: "rgba(20,20,20,0.45)" }}>
        {tNews("sectionEyebrow")}
      </p>
      <h2 className="bw-display" style={{ margin: 0, fontSize: "var(--fs-heading-lg)" }}>
        {tNews("sectionTitleLine1")}
        <br />
        <em
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#015ac6",
          }}
        >
          {tNews("sectionTitleAccent")}
        </em>
      </h2>
      <Link
        href={`/${locale}/news`}
        className="bw-btn bw-home-news-cta"
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
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: "var(--fs-body-sm)",
          letterSpacing: "-0.154px",
          whiteSpace: "nowrap",
          transition: `transform 160ms ${EASE_OUT}`,
        }}
      >
        {tHome("viewAll")}
        <img src="/assets/arrow-white.svg" alt="" width={13} height={13} style={{ display: "block" }} />
      </Link>
    </div>
  );
}

function NewsCardList({ articles, locale }: { articles: NewsArticle[]; locale: string }) {
  return (
    <>
      {articles.map((article, index) => (
        <div
          key={article.slug}
          data-news-home-item
          style={{
            width: "100%",
            borderBottom: index < articles.length - 1 ? `1px solid ${DIVIDER}` : "none",
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
  headingRef,
  listRef,
  stickyHeading,
}: {
  locale: string;
  articles: NewsArticle[];
  headingRef: React.RefObject<HTMLDivElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
  stickyHeading: boolean;
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
        ref={headingRef}
        data-news-home-heading
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
        <SectionHeading locale={locale} />
      </div>

      <div ref={listRef} style={{ minWidth: 0 }}>
        <NewsCardList articles={articles} locale={locale} />
      </div>
    </div>
  );
}

function NewsSectionShell({ children }: { children: ReactNode }) {
  return (
    <section className="bw-home-news" style={{ backgroundColor: BG }}>
      {children}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .bw-home-news-cta:hover {
            transform: scale(1.02);
          }
        }
        .bw-home-news-cta:active {
          transform: scale(0.97);
        }
        @media (prefers-reduced-motion: reduce) {
          .bw-home-news-cta:hover,
          .bw-home-news-cta:active {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default function NewsSection() {
  const locale = useLocale();
  const { showMock, setShowMock } = useNewsMock();
  const articles = getHomeNewsArticlesWithMock(showMock);
  const { isMobile } = useBreakpoint();
  const [reduceMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const animate = !reduceMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !sectionRef.current) return;

    const heading = sectionRef.current.querySelector("[data-news-home-heading]");
    const items = sectionRef.current.querySelectorAll("[data-news-home-item]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      const targets = heading ? [heading, ...items] : items;
      gsap.from(targets, {
        y: 10,
        opacity: 0,
        duration: ENTER_DURATION,
        stagger: heading ? ENTER_STAGGER : ENTER_STAGGER,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animate, articles.length, showMock]);

  if (articles.length === 0) return null;

  const mockToggle = <NewsMockToggle enabled={showMock} onChange={setShowMock} />;

  return (
    <NewsSectionShell>
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
          headingRef={headingRef}
          listRef={listRef}
          stickyHeading={!isMobile}
        />
      </div>
      {mockToggle}
    </NewsSectionShell>
  );
}

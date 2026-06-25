"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Breadcrumb from "@/components/Breadcrumb";
import NewsArticleTags from "@/components/news/NewsArticleTags";
import type { NewsArticle } from "@/lib/news";
import { getContentLocaleKey } from "@/lib/locale";

const FONT = '"Plus Jakarta Sans", sans-serif';

const AASTOCKS_LINKS = {
  en: "https://www.aastocks.com/en/stocks/news/aafn-con/now.1529449/top-news/aafn",
  zh: "https://www.aastocks.com/sc/stocks/news/aafn-con/now.1529449/top-news/aafn",
  zhTw: "https://www.aastocks.com/tc/stocks/news/aafn-con/now.1529449/top-news/aafn",
} as const;

const ARTICLE_CONTENT = {
  en: {
    paragraphs: [
      "HUTCHTEL HK (00215.HK) announced that, to promote the proliferation of AI, it will launch a series of AI-centric innovative products and services. Its 3HK and 3SUPREME brands will partner with Basicware AI to roll out a large-model experience campaign starting next month, distributing a total of 80 billion AI tokens to new subscribers and 5G contract renewal customers.",
      "Each eligible customer will receive 10 million AI tokens to experience on its one-stop multi-model platform, BasicRouter, of more than 70 leading global AI large models, including Alibaba Cloud's Qwen series, ByteDance's Seed series, as well as Claude, GPT, Gemini, DeepSeek, Kling and Kimi.",
      "In addition, HTHK is collaborating with AI and AR glasses brand INMO to debut the international version of the INMO GO3 AI glasses. The company also plans to launch an \"AI Travel Assistant\" service in early July, offering customers AI-powered personalized travel itinerary planning and overseas data service privileges.",
    ],
  },
  zh: {
    paragraphs: [
      "和电香港(00215.HK)宣布，为推动全民 AI 普及化，将推出一系列以 AI 为核心的创新产品及服务。公司旗下 3 香港及 3SUPREME 将携手 Basicware AI 于下月起推出大模型体验活动，向新上台及 5G 续约客户送出合共 800 亿个 AI 词元（Tokens），每人可获 1,000 万个 AI Token，于旗下一站式多模型平台 BasicRouter 体验包括阿里云通义千问 Qwen 系列、字节跳动 Seed 系列，以及 Claude、GPT、Gemini、DeepSeek、可灵及 Kimi 等全球 70 多个主流 AI 大模型。",
      "另外，和电香港与 AI 及 AR 眼镜品牌影目科技合作，首发 INMO GO3 AI 眼镜国际版。该公司亦计划于 7 月初推出「AI 旅游助理」服务，为客户提供 AI 规划个人化旅游行程及外游数据服务优惠。",
    ],
    quote:
      "企业对 AI 的需求正持续提升，为解决中小企面对资源及技术限制等问题，将与阿里云及 DotAI 的伙伴合作，为企业客户提供 AI 服务，以全面提升营运效率。",
    speaker: "何伟荣，和电香港执行董事及行政总裁",
  },
  zhTw: {
    paragraphs: [
      "和電香港(00215.HK)宣布，為推動全民 AI 普及化，將推出一系列以 AI 為核心的創新產品及服務。公司旗下 3 香港及 3SUPREME 將夥拍 Basicware AI 於下月起推出大模型體驗活動，向新上台及 5G 續約客戶送出合共 800 億個 AI 詞元（Tokens），每人可獲 1,000 萬個 AI Token，於旗下一站式多模型平台 BasicRouter 體驗包括阿里雲通義千問 Qwen 系列、字節跳動 Seed 系列，以及 Claude、GPT、Gemini、DeepSeek、可靈及 Kimi 等全球 70 多個主流 AI 大模型。",
      "另外，和電香港與 AI 及 AR 眼鏡品牌影目科技合作，首發 INMO GO3 AI 眼鏡國際版。該公司亦計劃於 7 月初推出「AI 旅遊助理」服務，為客戶提供 AI 規劃個人化旅遊行程及外遊數據服務優惠。",
    ],
    quote:
      "企業對 AI 的需求正持續提升，為解決中小企面對資源及技術限制等問題，將與阿里雲及 DotAI 的夥伴合作，為企業客戶提供 AI 服務，以全面提升營運效率。",
    speaker: "何偉榮，和電香港執行董事及行政總裁",
  },
} as const;

function BodyParagraph({
  children,
  color,
  marginBottom = "20px",
}: {
  children: ReactNode;
  color: string;
  marginBottom?: string;
}) {
  return (
    <p
      style={{
        margin: `0 0 ${marginBottom}`,
        fontFamily: FONT,
        fontWeight: 400,
        fontSize: "var(--fs-body-lg)",
        lineHeight: 1.75,
        color,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </p>
  );
}

function PressQuote({
  quote,
  speaker,
  isDark,
  subtle,
  accent,
}: {
  quote: string;
  speaker: string;
  isDark: boolean;
  subtle: string;
  accent: string;
}) {
  return (
    <div
      style={{
        margin: "0 0 32px",
        backgroundColor: subtle,
        borderLeft: `4px solid ${accent}`,
        borderRadius: "0 16px 16px 0",
        padding: "28px 32px",
      }}
    >
      <p
        style={{
          margin: "0 0 16px",
          fontFamily: FONT,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "var(--fs-body-lg)",
          lineHeight: 1.65,
          color: isDark ? "#c8dcf8" : "#011e5b",
          letterSpacing: "-0.01em",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "var(--fs-body-sm)",
          color: isDark ? "#6a9fd8" : accent,
        }}
      >
        {speaker}
      </p>
    </div>
  );
}

export default function PressRelease3HK({
  locale,
  tags = [],
  articleTitle,
}: {
  locale: string;
  tags?: NewsArticle["tags"];
  articleTitle?: string;
}) {
  const { isDark } = useDark();
  const { isMobile } = useBreakpoint();
  const t = useTranslations("nav");
  const tb = useTranslations("breadcrumb");

  const contentKey = getContentLocaleKey(locale);
  const content = ARTICLE_CONTENT[contentKey];
  const sourceLink = AASTOCKS_LINKS[contentKey];

  const bg = isDark ? "#0d0d0d" : "#fff";
  const text = isDark ? "#e0e0e0" : "#141414";
  const subtle = isDark ? "#1a1a1a" : "#f5f5f7";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const accent = "#0148ae";
  const linkColor = isDark ? "var(--c-accent)" : accent;

  const sourceLabel =
    contentKey === "en"
      ? "View on AASTOCKS"
      : contentKey === "zhTw"
        ? "於 AASTOCKS 查看原文"
        : "在 AASTOCKS 查看原文";
  const executiveQuote = "quote" in content && content.quote ? content : null;

  return (
    <div style={{ backgroundColor: bg }}>
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile
            ? "40px 24px 64px"
            : "clamp(40px, 5vw, 64px) clamp(40px, 6vw, 80px) clamp(64px, 7vw, 96px)",
        }}
      >
        <Breadcrumb
          style={{ marginBottom: "48px" }}
          homeHref={`/${locale}`}
          homeLabel={tb("home")}
          items={[
            { label: t("news"), href: `/${locale}/news` },
            ...(articleTitle ? [{ label: articleTitle }] : []),
          ]}
        />

        {content.paragraphs.map((paragraph, index) => (
          <BodyParagraph
            key={index}
            color={text}
            marginBottom={index === content.paragraphs.length - 1 && !executiveQuote ? "40px" : "24px"}
          >
            {paragraph}
          </BodyParagraph>
        ))}

        {executiveQuote ? (
          <PressQuote
            quote={executiveQuote.quote}
            speaker={executiveQuote.speaker}
            isDark={isDark}
            subtle={subtle}
            accent={accent}
          />
        ) : null}

        <div
          style={{
            backgroundColor: subtle,
            border: `1px solid ${border}`,
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: tags.length > 0 ? 0 : "40px",
          }}
        >
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "var(--fs-body-sm)",
              color: text,
              letterSpacing: "0.02em",
            }}
          >
            {contentKey === "en" ? "Source" : contentKey === "zhTw" ? "資料來源" : "资料来源"}
          </p>
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "var(--fs-body-sm)",
              color: linkColor,
              textDecoration: "none",
            }}
          >
            {sourceLabel} ↗
          </a>
        </div>

        {tags.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: `1px solid ${border}`,
            }}
          >
            <NewsArticleTags tags={tags} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

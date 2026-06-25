"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Breadcrumb from "@/components/Breadcrumb";
import NewsArticleTags from "@/components/news/NewsArticleTags";
import type { NewsArticle } from "@/lib/news";
import { isChineseLocale } from "@/lib/locale";

const FONT = '"Plus Jakarta Sans", sans-serif';

const OFFICIAL_LINKS = {
  tc: "https://www.hthkh.com/tc/media/press.php?prid=/press/p260617",
  en: "https://www.hthkh.com/en/media/press.php?prid=/press/p260617",
} as const;

const STATS = [
  { en: "800 Billion", zh: "800億", labelEn: "AI Tokens", labelZh: "AI 詞元" },
  { en: "INMO GO3", zh: "INMO GO3", labelEn: "AI Glasses", labelZh: "AI 眼鏡" },
  { en: "70+", zh: "70+", labelEn: "AI Models", labelZh: "AI 模型" },
  { en: "10 Million", zh: "1,000萬", labelEn: "Tokens per subscriber", labelZh: "詞元/訂戶" },
];

/** Verbatim PDF page-1 bullets, in publication order */
const HIGHLIGHT_BULLETS_EN = [
  "Launches a series of innovative products and services centred on artificial intelligence (AI), expanding customers' AI lifestyles and demonstrating the \"3 for You\" brand value.",
  "First to launch the INMO GO3 AI glasses, featuring real-time two-way conversation translation, smart prompts and facial recognition. New or renewing WORLD PLAN customers can get the AI glasses for as low as $0, enhancing convenience for travel and business.",
  "Coming soon, the \"AI Travel Planner\" service will enable personalised itinerary planning, with exclusive limited-time roaming data offers.",
  "First to collaborate with Basicware AI to offer a total of 80 billion AI Tokens¹ free of charge to new and renewing customers, enabling them to experience the capabilities of large AI models from Alibaba Cloud and BytePlus via the one-stop AI model aggregation platform BasicRouter.",
  "Customers can enrol in online workplace AI fast-track courses provided by local AI education and application platform DotAI, available with monthly installment offers.",
  "Corporate customers can enjoy discounted rates on the services of Alibaba Cloud's desktop AI productivity agent QoderWork and DotAI's digital marketing platform AI agent Advoo.",
];

const HIGHLIGHT_BULLETS_ZH = [
  "推出一系列以人工智能（AI）為核心的創新產品及服務，為客戶拓展 AI 生活圈，展現「好在有 3」的品牌價值。",
  "率先推出 INMO GO3 AI 眼鏡，支援即時雙向對話翻譯功能、智慧提示及人臉識別等功能，新上台或續約世界 PLAN 客戶可以低至$0 免費獲得 AI 眼鏡，外遊、工幹更輕鬆自如。",
  "將推出「AI 旅助理」服務，以 AI 助客戶策劃個人化行程，並提供限時專屬外遊數據優惠。",
  "率先夥拍 Basicware AI 向新上台或續約客戶，送贈共 800 億個 AI 詞元（Tokens）¹，於一站式大模型路由平台 BasicRouter，免費體驗阿里雲及字節跳動旗下 BytePlus 的大模型功能。",
  "客戶將可以月供優惠報讀由本港 AI 教學及應用平台 DotAI 提供的網上職場速成班。",
  "企業客戶將可以優惠價購買阿里雲桌面 AI 辦公代理 QoderWork 及 DotAI 數碼營銷平台 AI 代理 Advoo 的服務。",
];

const RAYMOND_HO_QUOTE = {
  en: {
    quote:
      "AI is developing rapidly, and Hong Kong is actively promoting 'AI training for all' to accelerate the adoption in both daily life and business use. As a leading digital operator and technology enabler, we are delighted to collaborate with start-ups and technology companies to launch a suite of AI-driven products and services — from smart wearables and one-stop AI model aggregation platforms to business applications. These initiatives aim to enhance customers' 'AI quotient' and expand their AI-powered lifestyles, while paving the way for new business models that integrate AI tokens into mobile monthly plans, demonstrating our '3 for You' brand philosophy.",
    speaker: "Raymond Ho, Executive Director and Chief Executive Officer, Hutchison Telecommunications Hong Kong Holdings Limited",
  },
  zh: {
    quote:
      "AI 迅速發展，本港正大力推動『全民 AI 培訓』，以加快普及 AI 在生活及商業層面的應用。作為領先的數碼營辦商及科技賦能者，我們很高興能與多家初創及科技公司攜手合作，從智能穿戴式裝置、一站式大模型路由平台到企業應用等層面，推出一系列與 AI 相關的產品及服務，提升客戶的 AI quotient 及拓展其『AI 生活圈』，並邁向將 AI tokens 納入流動通訊月費計劃的嶄新發展方向，展現『好在有 3』的品牌理念。",
    speaker: "何偉榮，和記電訊香港控股有限公司執行董事及行政總裁",
  },
};

const YANG_LONGSHENG_QUOTE = {
  en: {
    quote:
      "Hong Kong is a global metropolis at the forefront of technology and fashion, while HTHK possesses a robust network and forward-thinking vision. As a pioneer in consumer-grade AR and AI wearables, INMO upholds the brand philosophy of 'Never Just Glasses'. The collaboration with HTHK marks a milestone for INMO, bringing the latest AI technology to Hong Kongers. The INMO GO3 is not just a pair of glasses, but a vision of future smart living, perfectly combining advanced large AI models with everyday aesthetics.",
    speaker: "Yang Longsheng, Founder and Chief Executive Officer, INMO Shanghai Yingmu Technology Company Limited",
  },
  zh: {
    quote:
      "香港是走在科技與時尚最前沿的國際大都市，而和記電訊香港則擁有穩健的網絡及具前瞻思維。INMO 作為消費級 AR 與 AI 穿戴設備的開拓者，秉持著 『Never Just Glasses』 的品牌理念。這次與和記電訊香港攜手，將最新的 AI 科技帶給香港市民，對 INMO 而言，是一個里程碑。我們帶來的 INMO GO3，不僅是一副眼鏡，更是對未來智慧生活的一份答卷，完美融合頂尖 AI 大模型與日常美學。",
    speaker: "楊龍昇，INMO 上海影目科技有限公司創辦人兼行政總裁",
  },
};

const PRICING_PLANS_EN = [
  { fee: "$338", data: "30GB Asia Pacific shared data^" },
  { fee: "$418", data: "30GB Worldwide shared data^" },
];

const PRICING_SHARED_EN = {
  glasses: "New customers: $388\nExisting customers (upgrade or renewal): $0",
  other:
    "Free two-year travel insurance and a Shenzhen indoor ski resort ticket with a set of round trip shuttle bus tickets",
  contract: "36 months",
};

const PRICING_PLANS_ZH = [
  { fee: "$338", data: "30GB 亞太數據^" },
  { fee: "$418", data: "30GB 全球數據^" },
];

const PRICING_SHARED_ZH = {
  glasses: "新上台客戶︰ $388\n現有客戶升級/續約︰ $0",
  other: "送 2 年免費旅遊保險及深圳室內滑雪場門票連來回直通巴士票",
  contract: "36 個月",
};

const ENTERPRISE_BULLETS_EN = [
  "Enterprise customers who register for Alibaba Cloud's desktop AI productivity agent QoderWork on or before 31 August 2026 will enjoy a 10% discount on the first month's subscription fee.",
  "Enterprise customers will be able to purchase credits from DotAI's digital marketing platform AI agent Advoo at a 15% discount in August 2026. Advoo helps SMEs and content creators create social media posts and plan promotional campaigns.",
];

const ENTERPRISE_BULLETS_ZH = [
  "企業客戶於 2026 年 8 月 31 日前登記阿里雲桌面 AI 辦公代理 QoderWork 服務，即可享首月訂閱費用 9 折優惠。",
  "企業客戶將可於本年 8 月以八五折優惠購買 DotAI 數碼營銷平台 AI 代理 Advoo 的積分。Advoo 代理有助中小企業及內容創作者製作社交媒體帖文及策劃宣傳活動。",
];

/** Verbatim boilerplate after -Ends- on the official PDF / HTHK press page */
const ABOUT_HTHK = {
  en: {
    heading: "About Hutchison Telecommunications (Hong Kong) Limited",
    p1: "Hutchison Telecommunications (Hong Kong) Limited (“HTHK”), a leading mobile operator in Hong Kong, offers diverse and advanced mobile telecoms services under the 3 Hong Kong, 3SUPREME, SoSIM and MO+ brands, addressing different needs of the consumer market. HTHK is also dedicated to developing business and enterprise solutions under the 3Business brand in the corporate market spanning mobile commerce, information technology, smart city, the Internet of Things and big data. HTHK channels the latest technologies into innovations that set market trends and steer industry development.",
  },
  zh: {
    heading: "有關和記電訊（香港）有限公司",
    p1: "和記電訊（香港）有限公司（「和記電訊香港」）為本港領先的流動通訊服務營辦商，於消費者市場以 3 香港、3SUPREME、SoSIM 及 MO+ 品牌，提供多元化及先進的流動通訊服務，並於企業市場以 3Business 品牌發展企業及商業解決方案，涵蓋流動商務、資訊科技、智慧城市、物聯網和大數據等範疇。和記電訊香港致力締造巿場潮流，領導業界發展。",
  },
} as const;

const HTHK_LOGO = "/assets/hthkh-logo.png";

function SectionHeading({ children, text }: { children: ReactNode; text: string }) {
  return (
    <h2
      style={{
        margin: "0 0 20px",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: "var(--fs-heading-md)",
        letterSpacing: "-0.02em",
        color: text,
      }}
    >
      {children}
    </h2>
  );
}

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
  const tp = useTranslations("pressRelease3hk");
  const isZh = isChineseLocale(locale);

  const bg = isDark ? "#0d0d0d" : "#fff";
  const text = isDark ? "#e0e0e0" : "#141414";
  const muted = isDark ? "#909090" : "#757575";
  const subtle = isDark ? "#1a1a1a" : "#f5f5f7";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e8e8e8";
  const accent = "#0148ae";
  const linkColor = isDark ? "var(--c-accent)" : accent;

  const highlightBullets = isZh ? HIGHLIGHT_BULLETS_ZH : HIGHLIGHT_BULLETS_EN;
  const raymondHo = isZh ? RAYMOND_HO_QUOTE.zh : RAYMOND_HO_QUOTE.en;
  const yangLongsheng = isZh ? YANG_LONGSHENG_QUOTE.zh : YANG_LONGSHENG_QUOTE.en;
  const officialLink = isZh ? OFFICIAL_LINKS.tc : OFFICIAL_LINKS.en;
  const pricingPlans = isZh ? PRICING_PLANS_ZH : PRICING_PLANS_EN;
  const pricingShared = isZh ? PRICING_SHARED_ZH : PRICING_SHARED_EN;
  const enterpriseBullets = isZh ? ENTERPRISE_BULLETS_ZH : ENTERPRISE_BULLETS_EN;

  const pricingHeaders = isZh
    ? ["月費", "數據", "GO3 AI 眼鏡優惠價", "其他優惠", "合約期"]
    : ["Monthly fee", "Data", "GO3 AI Glasses Offer", "Other Privileges", "Contract Period"];

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: isMobile
            ? "40px 24px 80px"
            : "clamp(48px, 6vw, 80px) clamp(40px, 6vw, 80px) clamp(80px, 9vw, 140px)",
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

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "48px",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: accent,
                borderRadius: "40px",
                padding: "10px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "var(--fs-body-lg)",
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                {isZh ? s.zh : s.en}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: "var(--fs-overline)",
                  color: "rgba(255,255,255,0.7)",
                  whiteSpace: "nowrap",
                }}
              >
                {isZh ? s.labelZh : s.labelEn}
              </span>
            </div>
          ))}
        </div>

        <BodyParagraph color={text} marginBottom="24px">
          {isZh
            ? "2026 年 6 月 17 日，香港 — 和記電訊（香港）有限公司（和記電訊香港）今天宣佈推出一系列以人工智能（AI）為核心的創新產品及服務，為客戶開拓 AI 生活圈。相關服務涵蓋多元應用場景，全面滿足大眾及企業客戶所需，致力普及和推動全民 AI。"
            : "17 June 2026 – Hong Kong – Hutchison Telecommunications (Hong Kong) Limited (“HTHK”) today announced the launch of a suite of innovative AI-driven products and services, enhancing customers' AI-powered lifestyles. Spanning multiple use cases, the offerings serve both consumer and enterprise segments, aiming to accelerate and popularise AI adoption across the community."}
        </BodyParagraph>

        <PressQuote
          quote={raymondHo.quote}
          speaker={raymondHo.speaker}
          isDark={isDark}
          subtle={subtle}
          accent={accent}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "2px",
            backgroundColor: border,
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          {highlightBullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                backgroundColor: isDark ? "#141414" : "#fff",
                padding: "clamp(22px, 2.5vw, 36px)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  backgroundColor: accent,
                  opacity: 0.85,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: "var(--fs-caption)" }}>
                  {i + 1}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: "var(--fs-body-sm)",
                  lineHeight: 1.65,
                  color: text,
                }}
              >
                {bullet}
              </p>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", backgroundColor: border, margin: "40px 0" }} />

        <SectionHeading text={text}>
          {isZh
            ? "率先推出 INMO 多功能 AI 眼鏡 全能生活助手"
            : "First to launch INMO multi-functional AI glasses — an all-in-one lifestyle assistant"}
        </SectionHeading>

        <BodyParagraph color={muted}>
          {isZh
            ? "AI 技術急速發展帶動穿戴式 AI 裝置普及，3 香港和 3SUPREME 宣佈率先推出領先 AI 及 AR 眼鏡品牌 INMO 的 GO3 AI 眼鏡，是 INMO 首個發售國際版現貨的合作夥伴，以 Gemini 及 ChatGPT 語言模型為基礎。即日起，新上台或續約世界 PLAN，可以低至$0 免費獲得 INMO GO3 AI 眼鏡乙副（建議零售價$4,688），客戶更可因應視力需要，免費配上合適鏡片使用。"
            : "The rapid advancement of AI technology is driving the adoption of wearable AI devices. 3 Hong Kong and 3SUPREME today announce the launch of the INMO GO3 AI glasses from leading AI and AR eyewear brand INMO — the first to offer the international retail version powered by Gemini and ChatGPT language models. Starting today, customers subscribing to or renewing the WORLD PLAN can get a pair of INMO GO3 AI glasses (suggested retail price: HK$4,688) for as low as HK$0. Customers can also have lenses fitted free of charge according to their vision needs."}
        </BodyParagraph>

        <BodyParagraph color={muted}>
          {isZh
            ? "選用世界 PLAN 的客戶，可以低至$0 在全球 222 個地區^體驗 GO3 AI 眼鏡即時雙向對話翻譯功能，再配合「AI 旅助理」的個人化行程，讓旅程變得更輕鬆自在。"
            : "WORLD PLAN customers can enjoy real-time two-way conversation translation with the GO3 AI glasses in up to 222 destinations worldwide^ for as low as HK$0. Combined with the \"AI Travel Planner\" service for personalised itinerary planning, this enables a more convenient and enjoyable travel experience."}
        </BodyParagraph>

        <div
          style={{
            overflowX: "auto",
            marginBottom: "12px",
            border: `1px solid ${border}`,
            borderRadius: "12px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: FONT,
              fontSize: "var(--fs-body-sm)",
              color: text,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: subtle }}>
                {pricingHeaders.map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "12px 14px",
                      textAlign: "center",
                      fontWeight: 700,
                      border: `1px solid ${border}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((row, i) => (
                <tr key={i}>
                  <td
                    style={{
                      padding: "12px 14px",
                      border: `1px solid ${border}`,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.fee}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      border: `1px solid ${border}`,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.data}
                  </td>
                  {i === 0 ? (
                    <>
                      <td
                        rowSpan={pricingPlans.length}
                        style={{
                          padding: "12px 14px",
                          border: `1px solid ${border}`,
                          textAlign: "center",
                          verticalAlign: "middle",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {pricingShared.glasses}
                      </td>
                      <td
                        rowSpan={pricingPlans.length}
                        style={{
                          padding: "12px 14px",
                          border: `1px solid ${border}`,
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {pricingShared.other}
                      </td>
                      <td
                        rowSpan={pricingPlans.length}
                        style={{
                          padding: "12px 14px",
                          border: `1px solid ${border}`,
                          textAlign: "center",
                          verticalAlign: "middle",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {pricingShared.contract}
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            margin: "0 0 28px",
            fontFamily: FONT,
            fontSize: "var(--fs-caption)",
            color: muted,
            lineHeight: 1.5,
          }}
        >
          {isZh
            ? "^只適用於指定地區及網絡使用，使用受條款及細則約束。"
            : "^Applicable only to designated destinations and networks. Subject to terms and conditions."}
        </p>

        <PressQuote
          quote={yangLongsheng.quote}
          speaker={yangLongsheng.speaker}
          isDark={isDark}
          subtle={subtle}
          accent={accent}
        />

        <BodyParagraph color={muted}>
          {isZh
            ? "INMO GO3 配備多元 AI 功能，讓用戶騰空雙手輕鬆體驗 AI 的各種應用。INMO GO3 具即時雙向對話翻譯功能，支援 98 種語言的網上翻譯及 9 種語言的離線翻譯，瞬即將翻譯內容顯示於眼前，有助用戶清晰掌握對話重點。INMO GO3 採用 IMAR 光學技術，防漏光，確保顯示內容清晰且具私隱保障。"
            : "The INMO GO3 is equipped with a range of AI functions, allowing users to enjoy hands-free AI applications with ease. It supports real-time two-way conversation translation in 98 languages and offline translation in nine languages, instantly displaying translated content before the user's eyes to help them clearly grasp key points in conversations. The device adopts IMAR optical technology to prevent light leakage, ensuring clear display and enhanced privacy protection."}
        </BodyParagraph>

        <BodyParagraph color={muted} marginBottom="40px">
          {isZh
            ? "INMO GO3 同時配備智慧提示功能，客戶只需預先上傳講稿，即可於演講或錄影期間即時顯示字幕，並可以手機或智慧戒指翻頁。客戶另可透過 INMO APP 上傳名片，於識別人臉（於第三季推出）時即時顯示相關聯絡資訊，方便於展覽會、商務場合或接待客戶時快速取得出席者資料，提升專業形象及溝通效率。"
            : "The INMO GO3 also features smart prompting. Customers can upload scripts in advance and have subtitles displayed in real time during presentations or recordings, with page-turning controlled via smartphone or smart ring. Customers can also upload business cards through the INMO app. When a face is recognised (feature launching in Q3), associated contact details are displayed instantly. This is particularly useful at exhibitions, business events or client meetings, enabling quick access to attendee information and enhancing professionalism and communications efficiency."}
        </BodyParagraph>

        <SectionHeading text={text}>
          {isZh ? "AI 旅遊規劃輕鬆出行 兼享限時外遊數據優惠" : "\"AI Travel Planner\" for hassle-free trips with limited-time roaming offers"}
        </SectionHeading>

        <BodyParagraph color={muted} marginBottom="40px">
          {isZh
            ? "暑假旅遊旺季將至，和記電訊香港將於 7 月初推出「AI 旅助理」服務，以 AI 免費助客戶策劃個人化行程，提升外遊體驗，同步帶來限時專屬外遊數據優惠。3 香港及 3SUPREME 客戶只需於 3 香港網站或 My3 App 應用程式，按下相關圖像登入「AI 旅助理」頁面，輸入旅遊目的地、同行人數及旅遊日數，即可生成個人化行程建議，涵蓋行程安排、地道美食及出發前準備等事項，並可將行程一鍵匯出與同行好友分享。「AI 旅助理」更會根據客戶偏好及習慣，即時推送限時外遊數據服務優惠，全面配合客戶行程需要。"
            : "With the peak summer travel season approaching, HTHK will launch the \"AI Travel Planner\" in early July. This service uses AI to help customers plan personalised itineraries for free, enhancing the travel experience, alongside exclusive limited-time roaming offers. 3 Hong Kong and 3SUPREME customers can access the \"AI Travel Planner\" via the 3 Hong Kong website or the My3 app. By entering their destination, number of travellers and travel duration, customers can instantly generate personalised itinerary suggestions covering travel plans, local cuisine and pre-departure preparations. Itineraries can be exported and shared with travel companions in a single click. The \"AI Travel Planner\" also provides tailored limited-time roaming data offers based on customers' preferences and user habits, fully supporting their travel needs."}
        </BodyParagraph>

        <SectionHeading text={text}>
          {isZh ? "送 AI Tokens 客戶免費體驗旗艦 AI 大模型" : "Complimentary AI tokens for experiencing flagship AI models"}
        </SectionHeading>

        <BodyParagraph color={muted}>
          {isZh ? (
            <>
              和記電訊香港致力推動 AI 應用，讓客戶體驗人工智能如何提升生產力，率先夥拍 Basicware AI 向客戶送贈共
              800 億個 AI Tokens。由 7 月 1 日起，3 香港或 3SUPREME 新上台或續約 5G 月費計劃的客戶，每人可獲贈
              1,000 萬個 AI Tokens²，於大模型路由平台 BasicRouter（
              <a href="https://basicrouter.ai" target="_blank" rel="noopener noreferrer" style={{ color: linkColor }}>
                basicrouter.ai
              </a>
              ），免費體驗阿里雲及字節跳動旗下 BytePlus 的大模型功能，當中包括文字生成、圖片生成，以及支援快速生成專業影片。免費
              AI Tokens 先到先得，送完即止。
            </>
          ) : (
            <>
              HTHK is committed to promoting AI applications and enabling customers to experience how AI can enhance
              productivity. HTHK is the first operator to collaborate with Basicware AI to offer a total of 80 billion AI
              Tokens to customers. Starting from 1 July, 3 Hong Kong or 3SUPREME customers subscribing to or renewing
              their 5G plans will each receive 10 million AI Tokens². These can be used for free on the one-stop AI model
              aggregation platform, BasicRouter (
              <a href="https://basicrouter.ai" target="_blank" rel="noopener noreferrer" style={{ color: linkColor }}>
                basicrouter.ai
              </a>
              ), to experience the capabilities of AI models from Alibaba Cloud and BytePlus, including text generation,
              image generation and rapid professional video creation. Complimentary AI Tokens are available on a
              first-come, first-served basis while stocks last.
            </>
          )}
        </BodyParagraph>

        <BodyParagraph color={muted} marginBottom="40px">
          {isZh
            ? "BasicRouter 是一個創新的一站式多模型 AI 平台，只需一個賬戶，單一賬單，一次系統整合，便可使用全球 70 多款主流 AI 模型，包括 Qwen 系列、Seed 系列、Claude 系列、GPT 系列、Gemini 系列、DeepSeek、Keling 和 Kimi 等。"
            : "BasicRouter is an innovative one-stop multi-model AI platform. With a single account, a single bill and one-time system integration, users can access over 70 mainstream global AI models, including the Qwen series, Seed series, Claude series, GPT series, Gemini series, DeepSeek, Keling and Kimi."}
        </BodyParagraph>

        <SectionHeading text={text}>
          {isZh ? "優惠價報讀職場 AI 技能速成班 提升工作效率" : "Discounted AI workplace fast-track course to boost productivity"}
        </SectionHeading>

        <BodyParagraph color={muted} marginBottom="40px">
          {isZh
            ? "和記電訊香港客戶將可於本年 8 月以優惠價每月$75（共 24 個月），報讀由本港 AI 教學及應用平台 DotAI 提供的 12 小時網上職場速成班，內容包括 AI 協作技巧、自動化報告生成及如何透過 AI 助理執行任務等，助客戶迅速掌握 AI 應用，趕上職場趨勢，提升工作效率。"
            : "HTHK customers can enrol in a 12-hour online workplace fast-track course offered by local AI education and application platform DotAI at a discounted price of $75 per month (for 24 months) in August 2026. The course covers AI collaboration skills, automated report generation and the use of AI assistants to execute tasks, enabling customers to quickly master AI applications, keep pace with workplace trends and enhance productivity."}
        </BodyParagraph>

        <SectionHeading text={text}>
          {isZh ? "助企業加速 AI 轉型步伐" : "Supporting enterprises to accelerate AI transformation"}
        </SectionHeading>

        <BodyParagraph color={muted}>
          {isZh
            ? "企業對運用 AI 提升營運效率的需求日益增加，惟中小企在資源及技術上有一定限制。和記電訊香港將分別與阿里雲及 DotAI 推出優惠，全面提升營運效率，加快企業 AI 轉型步伐，把握商機。優惠如下︰"
            : "As demand for AI to enhance operational efficiency continues to grow, SMEs often face resource and technical constraints. HTHK will collaborate with Alibaba Cloud and DotAI to offer discounted AI services, helping enterprises improve efficiency and accelerate AI transformation while seizing new business opportunities. The offers include:"}
        </BodyParagraph>

        <ul
          style={{
            margin: "0 0 32px",
            paddingLeft: "1.5em",
            listStyleType: "disc",
            listStylePosition: "outside",
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: "var(--fs-body-lg)",
            color: muted,
            lineHeight: 1.75,
          }}
        >
          {enterpriseBullets.map((item, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              {item}
            </li>
          ))}
        </ul>

        <div
          style={{
            marginBottom: "40px",
            fontFamily: FONT,
            fontSize: "var(--fs-caption)",
            color: muted,
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            {isZh
              ? "¹ 詞元(Tokens)為 AI 處理文本的基本單位。"
              : "¹ A token is the basic unit of text that an AI model reads and processes."}
          </p>
          <p style={{ margin: 0 }}>
            {isZh
              ? "² 1,000 萬個 AI Tokens 相等於 40 個 BasicRouter credits，價值 40 美元，可製作約 6.5 分鐘短片或生成 1,300 張圖像。"
              : "² 10 million AI Tokens are equivalent to 40 BasicRouter credits, valued at USD 40, and can be used to produce approximately 6.5 minutes of video or generate 1,300 images."}
          </p>
        </div>

        <div
          role="separator"
          aria-label={isZh ? "完" : "End of press release"}
          style={{
            height: "1px",
            backgroundColor: border,
            margin: "0 0 32px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "20px" : "32px",
            alignItems: "flex-start",
            marginBottom: "40px",
            ...(isDark && {
              backgroundColor: "#141414",
              border: `1px solid ${border}`,
              borderRadius: "20px",
              padding: "clamp(22px, 2.5vw, 36px)",
            }),
          }}
        >
          <div
            style={{
              flexShrink: 0,
              alignSelf: "flex-start",
              width: isMobile ? "min(100%, 160px)" : "140px",
              padding: isDark ? "12px 14px" : "4px 0",
              backgroundColor: isDark ? "#ffffff" : "transparent",
              borderRadius: isDark ? "12px" : undefined,
              boxSizing: "border-box",
            }}
          >
            <img
              src={HTHK_LOGO}
              alt={
                isZh
                  ? "和記電訊（香港）有限公司"
                  : "Hutchison Telecommunications (Hong Kong) Limited"
              }
              width={140}
              height={27}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                margin: "0 0 12px",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "var(--fs-body-sm)",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                color: text,
              }}
            >
              {isZh ? ABOUT_HTHK.zh.heading : ABOUT_HTHK.en.heading}
            </h2>

            <p
              style={{
                margin: "0 0 12px",
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: "var(--fs-caption)",
                lineHeight: 1.65,
                color: muted,
                letterSpacing: "-0.01em",
              }}
            >
              {isZh ? ABOUT_HTHK.zh.p1 : ABOUT_HTHK.en.p1}
            </p>

            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: "var(--fs-caption)",
                lineHeight: 1.65,
                color: muted,
                letterSpacing: "-0.01em",
              }}
            >
              {isZh ? (
                <>
                  和記電訊香港是和記電訊香港控股有限公司（股份代號︰215）的流動通訊業務，和記電訊香港控股則為長江和記實業（股份代號：1）集團成員，有關和記電訊香港的詳情，請瀏覽{" "}
                  <a
                    href="https://www.hthkh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: linkColor }}
                  >
                    www.hthkh.com
                  </a>
                  。
                </>
              ) : (
                <>
                  HTHK is the mobile division of Hutchison Telecommunications Hong Kong Holdings Limited (stock
                  code: 215), a group member of CK Hutchison Holdings (stock code: 1). For more information on HTHK,
                  visit{" "}
                  <a
                    href="https://www.hthkh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: linkColor }}
                  >
                    www.hthkh.com
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>

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
            {tp("officialHeading")}
          </p>
          <a
            href={officialLink}
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
            {tp("officialLink")} ↗
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

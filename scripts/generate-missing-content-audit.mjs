import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const CSV_PATH = path.join(ROOT, "docs/missing-content-gaps.csv");
const OUTPUT_DIR = path.join(ROOT, "docs/audits/missing-content");
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, "screenshots");
const OUTPUT_HTML = path.join(OUTPUT_DIR, "index.html");
const OUTPUT_TABLE_CSV = path.join(OUTPUT_DIR, "translation-table.csv");

const EN_MESSAGES = readJson("messages/en.json");
const ZH_MESSAGES = readJson("messages/zh.json");
const NEWS_SOURCE = readFile("lib/news.ts");
const CASE_STUDIES_SOURCE = readFile("lib/case-studies.ts");
const PRODUCTS_SOURCE = readFile("lib/products.ts");
const CONTACT_SOURCE = readFile("components/contact/ContactPage.tsx");
const BRAND_STORY_SOURCE = readFile("components/home/BrandStorySection.tsx");
const OUTCOMES_SOURCE = readFile("components/home/CustomerOutcomes.tsx");
const CASE_STUDY_DETAIL_SOURCE = readFile("components/success-stories/CaseStudyDetailPage.tsx");
const SUCCESS_STORIES_HOME_SOURCE = readFile("components/home/SuccessStoriesSection.tsx");

const PAGE_ORDER = [
  "Homepage",
  "News",
  "Contact",
  "About",
  "Success Stories",
  "Products",
  "Token selling page",
  "Locale",
  "Implementation",
];

const SCREENSHOT_TARGETS = [
  { key: "homepage-en", page: "Homepage", url: "http://localhost:3000/en", caption: "Homepage in English on local preview." },
  { key: "homepage-zh", page: "Homepage", url: "http://localhost:3000/zh", caption: "Homepage in Simplified Chinese on local preview." },
  { key: "news-en", page: "News", url: "http://localhost:3000/en/news", caption: "News listing page on local preview." },
  { key: "contact-zh", page: "Contact", url: "http://localhost:3000/zh/contact", caption: "Contact page in Simplified Chinese on local preview." },
  { key: "about-en", page: "About", url: "http://localhost:3000/en/about", caption: "About page on local preview." },
  { key: "success-stories-zh", page: "Success Stories", url: "http://localhost:3000/zh/success-stories/1", caption: "Success story detail page in Simplified Chinese on local preview." },
  { key: "products-en", page: "Products", url: "http://localhost:3000/en/solutions/basicrouter", caption: "BasicRouter product page on local preview." },
  { key: "basicrouter-en", page: "Token selling page", url: "http://localhost:3000/en/solutions/basicrouter", caption: "BasicRouter marketing page on local preview." },
];

function readFile(relativePath) {
  return readFileSync(path.join(ROOT, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readFile(relativePath));
}

function splitCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    return {
      id: row.ID,
      page: row.Page,
      section: row.Section,
      field: row.Field,
      needed: row["What's needed"],
      en: row["EN in client CSV"],
      zh: row["ZH in client CSV"],
      zhTw: row["ZH-TW in client CSV"],
      deployed: row["Exists on deployed (basic-ware.ai)"],
      priority: row.Priority,
      action: row["Recommended action"],
      notes: row.Notes,
    };
  });
}

function getNestedValue(obj, dottedPath) {
  return dottedPath.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    if (Array.isArray(acc)) return acc[Number(key)];
    return acc[key];
  }, obj);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function deriveStatus(row) {
  const deployed = row.deployed.toLowerCase();
  if (row.priority.toLowerCase() === "deferred") return "deferred";
  if (deployed === "partial") return "partial";
  if (deployed === "yes") return "exists";
  return "missing";
}

function localeSummary(row) {
  return `EN ${row.en || "-"} / ZH ${row.zh || "-"} / ZH-TW (for translator)`;
}

const TRANSLATOR_ZH = {
  "News|News hero|line1": "一线快讯。",
  "News|Home news|viewAll": "查看全部",
  "News|News page|sectionTitleLine1": "最新资讯来自",
  "News|News page|sectionTitleAccent": "Basicware",
  "News|News page|sectionEyebrow": "新闻与新闻稿",
  "News|News page|sectionBody":
    "汇集 Basicware 在 AI、云和企业转型领域的最新动态、合作进展与一线观察。",
  "News|Press release labels|officialHeading": "官方新闻稿",
  "Homepage|Success stories carousel|AI FIRST stat value": "AI 先行计划",
};

function extractHomeSuccessCard(locale, authorNeedle) {
  const arrayName = locale === "zh" ? "CARDS_ZH" : "CARDS_EN";
  const arrayStart = SUCCESS_STORIES_HOME_SOURCE.indexOf(`const ${arrayName}`);
  const nextArray = SUCCESS_STORIES_HOME_SOURCE.indexOf("const ", arrayStart + 1);
  const arrayBlock = SUCCESS_STORIES_HOME_SOURCE.slice(
    arrayStart,
    nextArray === -1 ? undefined : nextArray,
  );
  const segment = arrayBlock
    .split(/\n\s*\},\s*\n/)
    .find((part) => part.includes(`author: "${authorNeedle}"`));
  if (!segment) return null;

  const quote = segment.match(/quote:\s*\n\s*"([\s\S]*?)"/)?.[1]?.replace(/\s+/g, " ").trim() ?? "-";
  const stats = [...segment.matchAll(/\{\s*value:\s*"([^"]*)",\s*label:\s*"([^"]*)"\s*\}/g)].map(
    ([, value, label]) => ({ value, label }),
  );

  return { quote, stats };
}

function homeSuccessCardEvidence({ enAuthor, zhAuthor, sourceLabel }) {
  const en = extractHomeSuccessCard("en", enAuthor);
  const zh = extractHomeSuccessCard("zh", zhAuthor);
  if (!en || !zh) {
    return {
      currentText: [`Source: components/home/SuccessStoriesSection.tsx → ${sourceLabel}`],
      codeNote: "Could not extract homepage success story card copy from SuccessStoriesSection.tsx.",
    };
  }

  return {
    currentText: [
      `Source: components/home/SuccessStoriesSection.tsx → ${sourceLabel}`,
      `EN quote: ${en.quote}`,
      `ZH quote: ${zh.quote}`,
    ],
    codeNote: "Homepage success stories carousel uses hardcoded card arrays in SuccessStoriesSection.tsx.",
    en,
    zh,
  };
}

const PRACTICE_CARD_LABELS = ["AI Commerce", "AI Agent", "AI Education", "Centralized Token Control"];

function extractCaseStudyDetailConstant(name) {
  const pattern = new RegExp(`const ${name}\\s*=\\s*\\n?\\s*"([\\s\\S]*?)";`);
  return CASE_STUDY_DETAIL_SOURCE.match(pattern)?.[1] ?? "Not found";
}

function extractCaseStudyDetailResults() {
  const block = CASE_STUDY_DETAIL_SOURCE.match(/const RESULTS = \[([\s\S]*?)\];/)?.[1] ?? "";
  return [...block.matchAll(/\{\s*icon:\s*"[^"]*",\s*title:\s*"([^"]*)",\s*body:\s*"([^"]*)"\s*\}/g)].map(
    ([, title, body]) => ({ title, body }),
  );
}

function formatResultCards(cards) {
  return cards.map((card) => `${card.title} — ${card.body}`).join(" | ");
}

function practiceCardEvidence(index) {
  const card = EN_MESSAGES.practice.cards[index];
  const zhCard = ZH_MESSAGES.practice.cards[index];
  return {
    currentText: [
      `Source: messages/en.json → practice.cards[${index}].body (${PRACTICE_CARD_LABELS[index]})`,
      `EN: ${card.body}`,
      `ZH: ${zhCard.body}`,
    ],
    codeNote: `Long-form practice copy for ${card.title} exists in locale files; the homepage currently shows only the short grid tagline.`,
  };
}

function buildEvidenceMap() {
  const challengeBody = extractCaseStudyDetailConstant("CHALLENGE_BODY");
  const solutionBody = extractCaseStudyDetailConstant("SOLUTION_BODY");
  const resultCards = extractCaseStudyDetailResults();
  const kotlerCard = homeSuccessCardEvidence({
    enAuthor: "Kotler Impact",
    zhAuthor: "Kotler Impact",
    sourceLabel: "CARDS[*] Kotler Impact card",
  });
  const stateOwnedCard = homeSuccessCardEvidence({
    enAuthor: "Local State-owned Enterprise",
    zhAuthor: "国有烟草企业",
    sourceLabel: "CARDS[*] Local State-owned Enterprise card",
  });

  return {
    "Homepage|Brand story|Eyebrow": {
      currentText: [
        `EN: ${EN_MESSAGES.home.brandStory.eyebrow}`,
        `ZH: ${ZH_MESSAGES.home.brandStory.eyebrow}`,
      ],
      codeNote: "Brand story eyebrow exists locally in all locale files but the section is not on the deployed homepage.",
    },
    "Homepage|Brand story|Title": {
      currentText: [
        `EN: ${EN_MESSAGES.home.brandStory.title}`,
        `ZH: ${ZH_MESSAGES.home.brandStory.title}`,
      ],
      codeNote: "Brand story title is localized in Simplified Chinese; Traditional Chinese is left for the translator.",
    },
    "Homepage|Brand story|Paragraph 1": {
      currentText: [
        `EN: ${EN_MESSAGES.home.brandStory.p1}`,
        `ZH: ${ZH_MESSAGES.home.brandStory.p1}`,
      ],
      codeNote: "First brand story paragraph is present locally with Simplified Chinese copy.",
    },
    "Homepage|Brand story|Paragraph 2": {
      currentText: [
        `EN: ${EN_MESSAGES.home.brandStory.p2}`,
        `ZH: ${ZH_MESSAGES.home.brandStory.p2}`,
      ],
      codeNote: "Second brand story paragraph is present locally with Simplified Chinese copy.",
    },
    "Homepage|Brand story|Paragraph 3": {
      currentText: [
        `EN: ${EN_MESSAGES.home.brandStory.p3}`,
        `ZH: ${ZH_MESSAGES.home.brandStory.p3}`,
      ],
      codeNote: "Third brand story paragraph is present locally with Simplified Chinese copy.",
    },
    "Homepage|Brand story|Link text": {
      currentText: [
        `EN: ${EN_MESSAGES.home.brandStory.link}`,
        `ZH: ${ZH_MESSAGES.home.brandStory.link}`,
      ],
      codeNote: "The local homepage brand story section already renders a CTA link, but the deployed homepage does not show this section.",
    },
    "Homepage|Practice detail cards|Card 1 body": practiceCardEvidence(0),
    "Homepage|Practice detail cards|Card 2 body": practiceCardEvidence(1),
    "Homepage|Practice detail cards|Card 3 body": practiceCardEvidence(2),
    "Homepage|Practice detail cards|Card 4 body": practiceCardEvidence(3),
    "Homepage|Outcomes carousel|Snippet 2": {
      currentText: [
        `Source: components/home/SuccessStoriesSection.tsx → CARDS_EN[1] (Kotler Impact)`,
        `EN: ${kotlerCard.en?.quote ?? "-"}`,
        `ZH: ${kotlerCard.zh?.quote ?? "-"}`,
      ],
      codeNote: "CSV labels this Kotler Impact snippet; the live homepage copy is in the success stories carousel, not messages/outcomes.cards.",
    },
    "Homepage|Outcomes carousel|Snippet 3": {
      currentText: [
        `Source: components/home/SuccessStoriesSection.tsx → CARDS_EN[2] (Local State-owned Enterprise)`,
        `EN: ${stateOwnedCard.en?.quote ?? "-"}`,
        `ZH: ${stateOwnedCard.zh?.quote ?? "-"}`,
      ],
      codeNote: "CSV labels this Local State-owned Tobacco snippet; the live homepage copy is in the success stories carousel.",
    },
    "Homepage|Success stories carousel|Kotler card quote": {
      currentText: [
        `Source: components/home/SuccessStoriesSection.tsx → CARDS[*].quote`,
        `EN: ${kotlerCard.en?.quote ?? "-"}`,
        `ZH: ${kotlerCard.zh?.quote ?? "-"}`,
      ],
      codeNote: "Kotler Impact carousel quote is localized in Simplified Chinese; Traditional Chinese is left for the translator.",
    },
    "Homepage|Success stories carousel|AI FIRST stat value": {
      currentText: [
        "Source: components/home/SuccessStoriesSection.tsx → CARDS_ZH[1].stats[2].value",
        `EN: ${kotlerCard.en?.stats[2]?.value ?? "AI FIRST"}`,
        `ZH: ${kotlerCard.zh?.stats[2]?.value ?? "AI FIRST"}`,
      ],
      codeNote: "The programme badge still shows `AI FIRST` in Simplified Chinese even though the quote uses 「AI 先行计划（AI FIRST）」.",
    },
    "Homepage|Success stories carousel|Global Programme stat label": {
      currentText: [
        "Source: components/home/SuccessStoriesSection.tsx → CARDS[*][1].stats[2].label",
        `EN: ${kotlerCard.en?.stats[2]?.label ?? "Global Programme"}`,
        `ZH: ${kotlerCard.zh?.stats[2]?.label ?? "-"}`,
      ],
      codeNote: "The stat label is localized; the adjacent stat value `AI FIRST` is not.",
    },
    "Homepage|Success stories carousel|Countries stat label": {
      currentText: [
        "Source: components/home/SuccessStoriesSection.tsx → CARDS[*][1].stats[0].label",
        `EN: ${kotlerCard.en?.stats[0]?.label ?? "-"}`,
        `ZH: ${kotlerCard.zh?.stats[0]?.label ?? "-"}`,
      ],
      codeNote: "First Kotler stat label on the homepage carousel card.",
    },
    "Homepage|Success stories carousel|Founding Partners stat label": {
      currentText: [
        "Source: components/home/SuccessStoriesSection.tsx → CARDS[*][1].stats[1].label",
        `EN: ${kotlerCard.en?.stats[1]?.label ?? "-"}`,
        `ZH: ${kotlerCard.zh?.stats[1]?.label ?? "-"}`,
      ],
      codeNote: "Second Kotler stat label on the homepage carousel card.",
    },
    "News|Locale carry-over|zh and zh-tw page copy": {
      currentText: [
        `EN: ${EN_MESSAGES.newsHero.line1} / ${EN_MESSAGES.homeNews.viewAll} / ${EN_MESSAGES.newsPage.sectionEyebrow}`,
        `ZH: ${TRANSLATOR_ZH["News|News hero|line1"]} / ${TRANSLATOR_ZH["News|Home news|viewAll"]} / ${TRANSLATOR_ZH["News|News page|sectionEyebrow"]}`,
      ],
      codeNote: "Several news UI strings are still English in zh.json; suggested Simplified Chinese is shown in the table for translator reference.",
    },
    "News|News hero|line1": {
      currentText: [
        `EN: ${EN_MESSAGES.newsHero.line1}`,
        `ZH: ${ZH_MESSAGES.newsHero.line1}`,
      ],
      codeNote: "The Chinese locale files still keep the English hero line word for word.",
    },
    "News|Home news|viewAll": {
      currentText: [
        `EN: ${EN_MESSAGES.homeNews.viewAll}`,
        `ZH: ${ZH_MESSAGES.homeNews.viewAll}`,
      ],
      codeNote: "The Chinese locale files keep the English CTA label `View all` instead of localized text.",
    },
    "News|News page|sectionTitleLine1": {
      currentText: [
        `EN: ${EN_MESSAGES.newsPage.sectionTitleLine1}`,
        `ZH: ${ZH_MESSAGES.newsPage.sectionTitleLine1}`,
      ],
      codeNote: "All three locale files currently use the same English line in the listing page heading.",
    },
    "News|News page|sectionTitleAccent": {
      currentText: [
        `EN: ${EN_MESSAGES.newsPage.sectionTitleAccent}`,
        `ZH: ${ZH_MESSAGES.newsPage.sectionTitleAccent}`,
      ],
      codeNote: "The accent line is identical across locales and is not localized in Chinese files.",
    },
    "News|News page|sectionEyebrow": {
      currentText: [
        `EN: ${EN_MESSAGES.newsPage.sectionEyebrow}`,
        `ZH: ${ZH_MESSAGES.newsPage.sectionEyebrow}`,
      ],
      codeNote: "Both Chinese files still keep the English eyebrow text.",
    },
    "News|News page|sectionBody": {
      currentText: [
        `EN: ${EN_MESSAGES.newsPage.sectionBody}`,
        `ZH: ${ZH_MESSAGES.newsPage.sectionBody}`,
      ],
      codeNote: "The news listing body copy is still English in all locales, even though the page route exists locally.",
    },
    "News|Press release labels|officialHeading": {
      currentText: [
        `EN: ${EN_MESSAGES.pressRelease3hk.officialHeading}`,
        `ZH: ${ZH_MESSAGES.pressRelease3hk.officialHeading}`,
      ],
      codeNote: "The 3HK press release component renders this label, but the Chinese locale files still keep it in English.",
    },
    "News|Press release labels|officialLink": {
      currentText: [
        `EN: ${EN_MESSAGES.pressRelease3hk.officialLink}`,
        `ZH: ${ZH_MESSAGES.pressRelease3hk.officialLink}`,
      ],
      codeNote: "The external release CTA is visible in code and still uses English text in both Chinese locale files.",
    },
    "News|Article listing|description": {
      currentText: [
        `EN: ${EN_MESSAGES.newsPage.sectionBody}`,
        `Article excerpt EN: ${extractBetween(NEWS_SOURCE, "description:", "},") || "See lib/news.ts descriptions."}`,
      ],
      codeNote: "The news data source includes localized descriptions for the current article, but the CSV notes still call out the earlier state where Chinese listing descriptions were English.",
    },
    "Contact|Contact form|name": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.name}`,
        `ZH: ${ZH_MESSAGES.contact.form.name}`,
      ],
      codeNote: "The local contact page currently uses an email-only card rather than the fuller form strings listed in locale files and CSV.",
    },
    "Contact|Contact form|email": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.email}`,
        `ZH: ${ZH_MESSAGES.contact.form.email}`,
      ],
      codeNote: "Field copy exists in locale files, but the current visible local implementation does not render the full form.",
    },
    "Contact|Contact form|company": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.company}`,
        `ZH: ${ZH_MESSAGES.contact.form.company}`,
      ],
      codeNote: "This form field label exists in translation files but does not appear in the current contact page component.",
    },
    "Contact|Contact form|message": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.message}`,
        `ZH: ${ZH_MESSAGES.contact.form.message}`,
      ],
      codeNote: "The local contact page uses a direct email card rather than a textarea field, so this copy is present only as dormant translation data.",
    },
    "Contact|Contact form|submit": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.submit}`,
        `ZH: ${ZH_MESSAGES.contact.form.submit}`,
      ],
      codeNote: "The submit CTA is translated in locale files, but no visible submit button is rendered in the current component.",
    },
    "Contact|Contact form|submitting": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.submitting}`,
        `ZH: ${ZH_MESSAGES.contact.form.submitting}`,
      ],
      codeNote: "Transient submission copy exists in locale files only; the current contact page does not have submit-state UI.",
    },
    "Contact|Contact form|successTitle": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.successTitle}`,
        `ZH: ${ZH_MESSAGES.contact.form.successTitle}`,
      ],
      codeNote: "Success feedback copy exists in messages, but the present local contact page does not render a form success state.",
    },
    "Contact|Contact form|successBody": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.successBody}`,
        `ZH: ${ZH_MESSAGES.contact.form.successBody}`,
      ],
      codeNote: "The CSV correctly distinguishes between the deployed email-first contact page and the dormant local form-state copy.",
    },
    "Contact|Contact form|errorBody": {
      currentText: [
        `EN: ${EN_MESSAGES.contact.form.errorBody}`,
        `ZH: ${ZH_MESSAGES.contact.form.errorBody}`,
      ],
      codeNote: "Error-state wording is localized in files but not currently reachable in the visible contact page implementation.",
    },
    "About|CSV About rewrite|brandCore": {
      currentText: [
        `EN title: ${EN_MESSAGES.about.brandCore.title}`,
        `ZH title: ${ZH_MESSAGES.about.brandCore.title}`,
      ],
      codeNote: "The About page already contains the rewritten multi-section structure locally, which supports the CSV-driven replacement request.",
    },
    "About|CSV About rewrite|brandIntent": {
      currentText: [
        `EN title: ${EN_MESSAGES.about.brandIntent.title}`,
        `ZH title: ${ZH_MESSAGES.about.brandIntent.title}`,
      ],
      codeNote: "Brand Intent is implemented as a three-card section locally and can be cited word for word from locale files.",
    },
    "About|CSV About rewrite|ourRole": {
      currentText: [
        `EN title: ${EN_MESSAGES.about.ourRole.title}`,
        `ZH title: ${ZH_MESSAGES.about.ourRole.title}`,
      ],
      codeNote: "The local page already exposes the CSV-style `Our role` framing, unlike the older deployed version noted in the audit.",
    },
    "About|CSV About rewrite|ourVision": {
      currentText: [
        `EN title: ${EN_MESSAGES.about.ourVision.title}`,
        `ZH title: ${ZH_MESSAGES.about.ourVision.title}`,
      ],
      codeNote: "The full `Our vision` section exists locally with localized paragraphs in all three locale files.",
    },
    "About|CSV About rewrite|values": {
      currentText: [
        `EN title: ${EN_MESSAGES.about.values.title}`,
        `ZH title: ${ZH_MESSAGES.about.values.title}`,
      ],
      codeNote: "The local About page uses the new five-value layout, but the Simplified Chinese title currently contains Traditional Chinese script.",
    },
    "Success Stories|Case study detail|Metrics labels": {
      currentText: [
        `EN labels: ${EN_MESSAGES.successStories.stat1Label} / ${EN_MESSAGES.successStories.stat2Label} / ${EN_MESSAGES.successStories.stat4Label}`,
        `ZH labels: ${ZH_MESSAGES.successStories.stat1Label} / ${ZH_MESSAGES.successStories.stat2Label} / ${ZH_MESSAGES.successStories.stat4Label}`,
      ],
      codeNote: "The page-level metric labels are localized, but the CSV note is about detail-page labels such as `Audience growth / New followers / Less production time` still showing in English on some detail views.",
    },
    "Success Stories|Case study detail|Challenge body": {
      currentText: [
        "Source: components/success-stories/CaseStudyDetailPage.tsx → CHALLENGE_BODY (shared template on all detail pages)",
        `EN: ${challengeBody}`,
      ],
      codeNote: "This paragraph is hardcoded in English on every case study detail page; it is not per-case-study copy from lib/case-studies.ts.",
    },
    "Success Stories|Case study detail|Solution body": {
      currentText: [
        "Source: components/success-stories/CaseStudyDetailPage.tsx → SOLUTION_BODY (shared template on all detail pages)",
        `EN: ${solutionBody}`,
      ],
      codeNote: "This paragraph is hardcoded in English on every case study detail page; it is not per-case-study copy from lib/case-studies.ts.",
    },
    "Success Stories|Case study detail|Results cards": {
      currentText: [
        "Source: components/success-stories/CaseStudyDetailPage.tsx → RESULTS (shared template on all detail pages)",
        `EN: ${formatResultCards(resultCards)}`,
      ],
      codeNote: "These three result cards are the same MGM-style template on every detail page; ZH is not implemented yet in the component.",
    },
    "Success Stories|Case Study 7|All fields": {
      currentText: [
        "No local Case Study 7 object is present in `lib/case-studies.ts`.",
      ],
      codeNote: "The local dataset currently stops at six case studies, matching the CSV note that Case Study 7 should wait for approval.",
    },
    "Products|Product detail pages|Page structure": {
      currentText: [
        `BasicRouter EN FAQ count: ${EN_MESSAGES ? "See lib/products.ts with 3 FAQs in EN product data." : "See lib/products.ts"}`,
      ],
      codeNote: "Product detail data already includes FAQs, `whoFor`, CTA, and feature blocks in code, which is broader than the current client CSV coverage.",
    },
    "Products|Multi-Cloud Computing Platform|Listing + detail": {
      currentText: [
        `Available product ids include: ${extractProductIds().join(", ")}`,
      ],
      codeNote: "The current product dataset includes `token`, `employees`, `content`, and `education`; there is no separate `multi-cloud` detail object yet.",
    },
    "Token selling page|BasicRouter marketing page|Long-form content": {
      currentText: [
        `EN headline: ${extractProductField("token", "en", "headline")}`,
        `ZH headline: ${extractProductField("token", "zh", "headline")}`,
      ],
      codeNote: "The local product source already includes long-form problem, how-it-works, feature, audience, CTA, and FAQ copy for BasicRouter.",
    },
    "Locale|zh-tw|Entire site": {
      currentText: [
        "Local dev server responds on `/zh-tw`.",
      ],
      codeNote: "The local app now routes `zh-tw`, which helps illustrate the gap between current code and the deployed site note in the CSV.",
    },
    "Implementation|Hero casing|titlePart1": {
      currentText: [
        `ZH hero part 1: ${ZH_MESSAGES.hero.titlePart1}`,
      ],
      codeNote: "Both Chinese locale files currently use `Ai` casing rather than `AI` in the first hero fragment.",
    },
    "Implementation|zh.json script mix|about.values.title": {
      currentText: [
        `ZH current: ${ZH_MESSAGES.about.values.title}`,
      ],
      codeNote: "The Simplified Chinese title uses Traditional Chinese characters and should be normalized if exact script separation matters.",
    },
    "Implementation|Team title|Richard Liu job title": {
      currentText: [
        `EN: ${EN_MESSAGES.about.team.members[4].title}`,
        `ZH: ${ZH_MESSAGES.about.team.members[4].title}`,
      ],
      codeNote: "English uses `AI Large Model Specialist`, while both Chinese locale files currently use `首席技术顾问 / 首席技術顧問`.",
    },
  };
}

function extractBetween(source, startNeedle, endNeedle) {
  const startIndex = source.indexOf(startNeedle);
  if (startIndex === -1) return "";
  const from = source.slice(startIndex + startNeedle.length);
  const endIndex = from.indexOf(endNeedle);
  return (endIndex === -1 ? from : from.slice(0, endIndex)).replace(/\s+/g, " ").trim();
}

function extractCaseStudyField(id, locale, field) {
  const pattern = new RegExp(`id:\\s*${id}[\\s\\S]*?${locale}:\\s*\\{[\\s\\S]*?${field}:\\s*"([^"]+)"`);
  return CASE_STUDIES_SOURCE.match(pattern)?.[1] ?? "Not found";
}

function extractProductIds() {
  return [...PRODUCTS_SOURCE.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]);
}

function extractProductField(id, locale, field) {
  const pattern = new RegExp(`id:\\s*'${id}'[\\s\\S]*?${locale}:\\s*\\{[\\s\\S]*?${field}:\\s*'([^']+)'`);
  return PRODUCTS_SOURCE.match(pattern)?.[1] ?? "Not found";
}

function buildSupplementalFindings() {
  return [
    {
      id: "supplemental-home-ai-first",
      page: "Homepage",
      section: "Success stories carousel",
      field: "Kotler card quote",
      needed: "Kotler Impact homepage carousel quote",
      en: "Yes",
      zh: "Partial",
      zhTw: "Partial",
      deployed: "Partial",
      priority: "Medium",
      action: "Translate remaining English programme labels on the Kotler homepage carousel card.",
      notes: "Quote is localized, but the stat badge still shows `AI FIRST` in English on /zh.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-home-ai-first-stat",
      page: "Homepage",
      section: "Success stories carousel",
      field: "AI FIRST stat value",
      needed: "AI FIRST",
      en: "Yes",
      zh: "No",
      zhTw: "No",
      deployed: "Partial",
      priority: "Medium",
      action: "Localize the Kotler carousel stat value from `AI FIRST` to the Chinese programme name.",
      notes: "Suggested Simplified Chinese: `AI 先行计划`.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-home-global-programme",
      page: "Homepage",
      section: "Success stories carousel",
      field: "Global Programme stat label",
      needed: "Global Programme",
      en: "Yes",
      zh: "Yes",
      zhTw: "No",
      deployed: "Partial",
      priority: "Low",
      action: "Provide Traditional Chinese for the adjacent programme label if needed.",
      notes: "Simplified Chinese already uses `全球项目`.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-home-kotler-countries",
      page: "Homepage",
      section: "Success stories carousel",
      field: "Countries stat label",
      needed: "Countries",
      en: "Yes",
      zh: "Yes",
      zhTw: "No",
      deployed: "Partial",
      priority: "Low",
      action: "Provide Traditional Chinese for Kotler carousel stat labels if needed.",
      notes: "Simplified Chinese already uses `覆盖国家/地区`.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-home-kotler-partners",
      page: "Homepage",
      section: "Success stories carousel",
      field: "Founding Partners stat label",
      needed: "Founding Partners",
      en: "Yes",
      zh: "Yes",
      zhTw: "No",
      deployed: "Partial",
      priority: "Low",
      action: "Provide Traditional Chinese for Kotler carousel stat labels if needed.",
      notes: "Simplified Chinese already uses `核心创始合作方`.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-zh-script",
      page: "Implementation",
      section: "zh.json script mix",
      field: "about.values.title",
      needed: "Simplified Chinese file should use Simplified script for the values title.",
      en: "No",
      zh: "No",
      zhTw: "N/A",
      deployed: "N/A",
      priority: "Low",
      action: "Fix to Simplified Chinese",
      notes: "Current Simplified Chinese string is `什麼驅動著我們`; expected Simplified form is `什么驱动着我们`.",
      status: "missing",
      source: "code",
    },
    {
      id: "supplemental-news-locale-copy",
      page: "News",
      section: "Locale carry-over",
      field: "zh and zh-tw page copy",
      needed: "Chinese locale files should not keep English labels for the news page.",
      en: "Yes",
      zh: "Partial",
      zhTw: "Partial",
      deployed: "Partial",
      priority: "Medium",
      action: "Translate the retained English labels in `newsHero`, `homeNews`, `newsPage`, and `pressRelease3hk`.",
      notes: "This code-level note supports several CSV rows by showing the current untranslated strings still present in local locale files.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-contact-implementation",
      page: "Contact",
      section: "Page implementation",
      field: "Current visible structure",
      needed: "The report should call out that the local contact page is currently email-only, even though form strings exist in locale files.",
      en: "Partial",
      zh: "Partial",
      zhTw: "Partial",
      deployed: "Partial",
      priority: "Medium",
      action: "Decide whether to keep email-only contact or restore a full localized form.",
      notes: "The current component renders a hero panel and direct email card, not the fuller form suggested by the translation keys and CSV rows.",
      status: "partial",
      source: "code",
    },
    {
      id: "supplemental-zh-tw-routing",
      page: "Locale",
      section: "zh-tw",
      field: "Local route availability",
      needed: "The audit should distinguish between deployed 404 behavior and current local route availability.",
      en: "N/A",
      zh: "N/A",
      zhTw: "Yes",
      deployed: "No",
      priority: "High",
      action: "Call out that `/zh-tw` now works locally but is still marked missing on the deployed site.",
      notes: "Useful for showing that the implementation has progressed beyond the deployed production state captured in the CSV.",
      status: "partial",
      source: "code",
    },
  ];
}

function enrichRow(row, evidenceMap) {
  const key = `${row.page}|${row.section}|${row.field}`;
  const evidence = evidenceMap[key] ?? null;
  return {
    ...row,
    status: deriveStatus(row),
    source: "csv",
    currentText: evidence?.currentText ?? [],
    codeNote: evidence?.codeNote ?? "",
  };
}

function groupIssues(rows, findings) {
  const grouped = {};
  for (const page of PAGE_ORDER) grouped[page] = [];
  for (const issue of [...rows, ...findings]) {
    (grouped[issue.page] ??= []).push(issue);
  }
  return grouped;
}

function buildSummary(issuesByPage) {
  const pages = PAGE_ORDER.filter((page) => issuesByPage[page]?.length).map((page) => {
    const issues = issuesByPage[page];
    return {
      page,
      total: issues.length,
      missing: issues.filter((issue) => issue.status === "missing").length,
      partial: issues.filter((issue) => issue.status === "partial").length,
      exists: issues.filter((issue) => issue.status === "exists").length,
      deferred: issues.filter((issue) => issue.status === "deferred").length,
    };
  });

  return {
    totalIssues: pages.reduce((sum, item) => sum + item.total, 0),
    totalMissing: pages.reduce((sum, item) => sum + item.missing, 0),
    totalPartial: pages.reduce((sum, item) => sum + item.partial, 0),
    totalDeferred: pages.reduce((sum, item) => sum + item.deferred, 0),
    pages,
  };
}

async function captureScreenshots(targets) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    return { available: false, results: [] };
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    return {
      available: false,
      results: [],
      error: `Playwright browser launch failed: ${error.message}`,
    };
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 }, deviceScaleFactor: 1 });
  const results = [];

  for (const target of targets) {
    const outputPath = path.join(SCREENSHOT_DIR, `${target.key}.png`);
    try {
      await page.goto(target.url, { waitUntil: "networkidle", timeout: 30000 });
      await page.screenshot({ path: outputPath, fullPage: true });
      results.push({
        ...target,
        relPath: `screenshots/${target.key}.png`,
        ok: true,
      });
    } catch (error) {
      results.push({
        ...target,
        relPath: "",
        ok: false,
        error: error.message,
      });
    }
  }

  await browser.close();
  return { available: true, results };
}

function renderScreenshotFigure(screenshot) {
  if (!screenshot || !screenshot.ok || !screenshot.relPath || !existsSync(path.join(OUTPUT_DIR, screenshot.relPath))) {
    const label = screenshot?.caption || "Screenshot unavailable for this page.";
    return `
      <figure class="page-shot">
        <div class="shot shot--placeholder">
          <strong>Screenshot unavailable</strong>
          <span>${escapeHtml(label)}</span>
        </div>
        <figcaption>${escapeHtml(label)}</figcaption>
      </figure>
    `;
  }

  return `
    <figure class="page-shot">
      <img src="${escapeHtml(screenshot.relPath)}" alt="${escapeHtml(screenshot.caption)}" width="1280" height="900" loading="lazy" />
      <figcaption>${escapeHtml(screenshot.caption)}</figcaption>
    </figure>
  `;
}

function renderCurrentText(items) {
  if (!items?.length) return `<p class="muted">No exact current implementation text was extracted for this row.</p>`;
  return `<ul class="evidence-list">${items.map((item) => `<li><code>${escapeHtml(item)}</code></li>`).join("")}</ul>`;
}

function extractExistingByLocale(issue) {
  const result = { en: "-", zh: "-" };
  for (const item of issue.currentText ?? []) {
    const match = item.match(/^(EN|ZH)(?:[^:]*)?:\s*(.*)$/);
    if (!match) continue;
    const [, locale, value] = match;
    const normalized = value?.trim() || "-";
    if (locale === "EN") result.en = normalized;
    if (locale === "ZH") result.zh = normalized;
  }
  return result;
}

function issueKey(issue) {
  return `${issue.page}|${issue.section}|${issue.field}`;
}

function resolveTableEn(issue, existing) {
  if (existing.en !== "-") return existing.en;
  return issue.needed?.trim() || "-";
}

function resolveTableZh(issue, existing) {
  const key = issueKey(issue);
  if (TRANSLATOR_ZH[key]) return TRANSLATOR_ZH[key];
  if (existing.zh !== "-" && existing.zh !== existing.en) return existing.zh;
  if (existing.zh !== "-") return existing.zh;
  return "-";
}

function extractSingleValue(issue) {
  const nonLocaleItems = (issue.currentText ?? []).filter((item) => !/^(EN|ZH|ZH-TW)(?:[^:]*)?:\s*/.test(item));
  if (nonLocaleItems.length === 0) return "-";
  return nonLocaleItems.join(" | ");
}

function buildTableRow(issue) {
  const existing = extractExistingByLocale(issue);
  return {
    page: issue.page,
    section: issue.section,
    field: issue.field,
    single: extractSingleValue(issue),
    en: resolveTableEn(issue, existing),
    zh: resolveTableZh(issue, existing),
    zhTw: "",
  };
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  if (/[",\r\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function buildTranslationTableCsv(issuesByPage) {
  const headers = ["Page", "Section", "Field", "Single", "EN", "ZH", "ZH-TW"];
  const rows = [];

  for (const page of PAGE_ORDER) {
    for (const issue of issuesByPage[page] ?? []) {
      const row = buildTableRow(issue);
      rows.push(headers.map((header) => {
        const key = header === "ZH-TW" ? "zhTw" : header.toLowerCase();
        return escapeCsvCell(row[key]);
      }).join(","));
    }
  }

  return `${headers.join(",")}\n${rows.join("\n")}\n`;
}

function groupIssuesBySection(issues) {
  const sectionMap = new Map();
  for (const issue of issues) {
    const sectionIssues = sectionMap.get(issue.section) ?? [];
    sectionIssues.push(issue);
    sectionMap.set(issue.section, sectionIssues);
  }
  return [...sectionMap.entries()].map(([section, sectionIssues]) => ({ section, issues: sectionIssues }));
}

function renderIssueRow(issue) {
  const row = buildTableRow(issue);
  return `
    <tr>
      <td>${escapeHtml(row.page)}</td>
      <td>${escapeHtml(row.section)}</td>
      <td>
        <div class="field-cell">
          <strong>${escapeHtml(row.field)}</strong>
          <div class="issue-meta">
            <span class="badge badge--status badge--${escapeHtml(issue.status)}">${escapeHtml(issue.status)}</span>
            <span class="badge badge--priority">${escapeHtml(issue.priority || "Code note")}</span>
            <span class="badge badge--source">${escapeHtml(issue.source || "csv")}</span>
          </div>
        </div>
      </td>
      <td>${escapeHtml(row.single)}</td>
      <td>${escapeHtml(row.en)}</td>
      <td>${escapeHtml(row.zh)}</td>
      <td class="cell--zh-tw-pending" aria-label="Traditional Chinese for translator"></td>
    </tr>
  `;
}

function renderPageChecklist(page, issues) {
  const highLevel = groupIssuesBySection(issues).slice(0, 5).map(({ section, issues: sectionIssues }) => `${section} (${sectionIssues.length})`);
  return `
    <div class="page-checklist">
      <h3>Quick scan</h3>
      <ul>
        ${highLevel.map((field) => `<li>${escapeHtml(field)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderSectionGroup(section, issues) {
  const missingCount = issues.filter((issue) => issue.status === "missing").length;
  const partialCount = issues.filter((issue) => issue.status === "partial").length;
  return `
    <section class="section-group" id="${escapeHtml(slugify(section))}">
      <header class="section-group-header">
        <div>
          <p class="section-kicker">Section</p>
          <h3>${escapeHtml(section)}</h3>
          <p class="section-summary">${issues.length} field entries, ${missingCount} missing, ${partialCount} partial.</p>
        </div>
        <div class="section-stats">
          <span>${missingCount} missing</span>
          <span>${partialCount} partial</span>
        </div>
      </header>
      <div class="table-wrap">
        <table class="audit-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Section</th>
              <th>Field</th>
              <th>Single</th>
              <th>EN</th>
              <th>ZH</th>
              <th>ZH-TW <span class="th-note">(for translator)</span></th>
            </tr>
          </thead>
          <tbody>
            ${issues.map((issue) => renderIssueRow(issue)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderPageSection(page, issues, screenshot) {
  const missingCount = issues.filter((issue) => issue.status === "missing").length;
  const partialCount = issues.filter((issue) => issue.status === "partial").length;
  const sectionGroups = groupIssuesBySection(issues);
  return `
    <section class="page-section" id="${escapeHtml(slugify(page))}">
      <header class="page-header">
        <div>
          <p class="eyebrow">Page Audit</p>
          <h2>${escapeHtml(page)}</h2>
          <p class="page-summary">${issues.length} issue cards, ${missingCount} missing, ${partialCount} partial.</p>
        </div>
        <div class="page-stats">
          <span>${missingCount} missing</span>
          <span>${partialCount} partial</span>
        </div>
      </header>
      <div class="page-layout">
        <div class="page-visual">
          ${renderScreenshotFigure(screenshot)}
          ${renderPageChecklist(page, issues)}
        </div>
        <div class="section-stack">
          ${sectionGroups.map(({ section, issues: sectionIssues }) => renderSectionGroup(section, sectionIssues)).join("")}
        </div>
      </div>
    </section>
  `;
}

function buildStyles() {
  return `
    :root {
      color-scheme: light;
      --bg: #eef3f8;
      --panel: #ffffff;
      --line: #d8e1eb;
      --text: #0f172a;
      --muted: #526072;
      --accent: #0b63ce;
      --missing: #c2410c;
      --partial: #b7791f;
      --exists: #2f855a;
      --deferred: #6b46c1;
      --shadow: 0 12px 34px rgba(15, 23, 42, 0.08);
      --radius: 22px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font: 16px/1.6 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(11, 99, 206, 0.08), transparent 24rem),
        linear-gradient(180deg, #f8fbff 0%, var(--bg) 100%);
    }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    code {
      font: 500 0.93rem/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: #f5f7fb;
      padding: 0.1rem 0.32rem;
      border-radius: 0.45rem;
    }
    .layout {
      max-width: 1600px;
      margin: 0 auto;
      padding: 32px 20px 80px;
    }
    .hero,
    .page-section,
    .summary-card {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(216, 225, 235, 0.8);
      box-shadow: var(--shadow);
      border-radius: var(--radius);
    }
    .hero {
      padding: 28px;
      margin-bottom: 24px;
    }
    .eyebrow {
      margin: 0 0 8px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
    }
    h1, h2, h3, h4, p { margin-top: 0; }
    h1 { font-size: clamp(2rem, 3.6vw, 3.6rem); line-height: 1.04; margin-bottom: 12px; }
    h2 { font-size: clamp(1.6rem, 2.2vw, 2.25rem); line-height: 1.1; margin-bottom: 8px; }
    h3 { font-size: 1.08rem; line-height: 1.3; margin-bottom: 14px; }
    h4 { font-size: 0.92rem; margin-bottom: 10px; }
    .lead { max-width: 72ch; color: var(--muted); }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
      margin: 18px 0 20px;
    }
    .summary-card {
      padding: 18px;
    }
    .summary-card strong {
      display: block;
      font-size: 1.7rem;
      line-height: 1;
      margin-bottom: 6px;
    }
    .nav-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .nav-list a {
      display: inline-flex;
      padding: 10px 14px;
      border-radius: 999px;
      background: #edf4ff;
      border: 1px solid #cfe0ff;
      font-weight: 600;
    }
    .page-section {
      margin-top: 24px;
      padding: 24px;
    }
    .page-header {
      display: flex;
      gap: 16px;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 18px;
    }
    .page-summary { color: var(--muted); margin-bottom: 0; }
    .page-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-end;
      color: var(--muted);
      font-size: 0.92rem;
    }
    .page-stats span,
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.36rem 0.7rem;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: #f8fafc;
    }
    .page-layout {
      display: grid;
      grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
      gap: 20px;
      align-items: start;
    }
    .page-visual {
      display: grid;
      gap: 18px;
      position: sticky;
      top: 18px;
    }
    .page-shot {
      margin: 0;
      display: grid;
      gap: 10px;
    }
    .page-shot img,
    .shot {
      width: 100%;
      border-radius: 18px;
      border: 1px solid var(--line);
      background: #fff;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
    }
    .page-shot img {
      display: block;
      height: auto;
      object-fit: cover;
    }
    .page-shot figcaption { color: var(--muted); font-size: 0.92rem; }
    .shot--placeholder {
      min-height: 240px;
      display: grid;
      place-items: center;
      padding: 24px;
      text-align: center;
      background: linear-gradient(180deg, #f8fafc, #eef2f7);
      border-style: dashed;
    }
    .page-checklist {
      padding: 18px;
      background: #f8fbff;
      border: 1px solid var(--line);
      border-radius: 18px;
    }
    .page-checklist ul {
      margin: 0;
      padding-left: 18px;
    }
    .section-stack {
      display: grid;
      gap: 16px;
    }
    .section-group {
      padding: 18px;
      border-radius: 18px;
      border: 1px solid var(--line);
      background: linear-gradient(180deg, #ffffff, #fbfdff);
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
    }
    .section-group-header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid #e9eef5;
    }
    .section-kicker {
      margin: 0 0 6px;
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .section-summary {
      color: var(--muted);
      margin-bottom: 0;
    }
    .section-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      color: var(--muted);
      font-size: 0.9rem;
    }
    .section-stats span {
      display: inline-flex;
      align-items: center;
      padding: 0.34rem 0.68rem;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: #f8fafc;
    }
    .table-wrap {
      overflow-x: auto;
      border: 1px solid #e5ebf3;
      border-radius: 16px;
      background: #fff;
    }
    .audit-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1100px;
    }
    .audit-table th,
    .audit-table td {
      vertical-align: top;
      text-align: left;
      padding: 14px 12px;
      border-bottom: 1px solid #e9eef5;
    }
    .audit-table thead th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: #f7fbff;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .audit-table tbody tr:nth-child(even) {
      background: #fcfdff;
    }
    .audit-table tbody tr:last-child td {
      border-bottom: none;
    }
    .audit-table .cell--zh-tw-pending {
      min-width: 120px;
      background: rgba(11, 99, 206, 0.04);
    }
    .th-note {
      font-weight: 500;
      color: var(--muted);
      font-size: 0.72rem;
      letter-spacing: normal;
      text-transform: none;
    }
    .field-cell {
      display: grid;
      gap: 8px;
      min-width: 160px;
    }
    .issue-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    .badge--missing { color: var(--missing); border-color: rgba(194, 65, 12, 0.18); background: rgba(255, 237, 213, 0.72); }
    .badge--partial { color: var(--partial); border-color: rgba(183, 121, 31, 0.18); background: rgba(254, 243, 199, 0.72); }
    .badge--exists { color: var(--exists); border-color: rgba(47, 133, 90, 0.18); background: rgba(220, 252, 231, 0.72); }
    .badge--deferred { color: var(--deferred); border-color: rgba(107, 70, 193, 0.18); background: rgba(237, 233, 254, 0.72); }
    .dot { color: #94a3b8; }
    .evidence-block {
      margin-top: 0;
      padding: 0;
      border-radius: 0;
      background: transparent;
      border: 0;
    }
    .evidence-list {
      margin: 0;
      padding-left: 18px;
    }
    .code-note,
    .muted {
      color: var(--muted);
      margin-bottom: 0;
    }
    .footer-note {
      margin-top: 28px;
      color: var(--muted);
      font-size: 0.92rem;
    }
    @media (max-width: 1100px) {
      .page-layout {
        grid-template-columns: 1fr;
      }
      .page-visual {
        position: static;
      }
    }
    @media (max-width: 700px) {
      .layout {
        padding-inline: 14px;
      }
      .hero,
      .page-section {
        padding: 18px;
      }
      .section-group-header {
        grid-template-columns: 1fr;
        display: grid;
      }
      .page-header {
        flex-direction: column;
      }
    }
  `;
}

function buildHtml(summary, issuesByPage, screenshotsByPage) {
  const navLinks = summary.pages
    .map((item) => `<li><a href="#${escapeHtml(slugify(item.page))}">${escapeHtml(item.page)} <span>(${item.total})</span></a></li>`)
    .join("");

  const pageSections = summary.pages
    .map((item) => renderPageSection(item.page, issuesByPage[item.page], screenshotsByPage[item.page]))
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Missing Content Audit</title>
    <style>${buildStyles()}</style>
  </head>
  <body>
    <main class="layout">
      <header class="hero">
        <p class="eyebrow">Standalone HTML Audit</p>
        <h1>Missing Content Audit</h1>
        <p class="lead">
          This report rewrites <code>docs/missing-content-gaps.csv</code> into a page-by-page review artifact.
          Each card shows what is missing, which locales are affected, whether the deployed site already has it,
          and any supporting implementation detail found in the local codebase.
        </p>
        <section class="summary-grid" aria-label="Audit summary">
          <article class="summary-card">
            <strong>${summary.totalIssues}</strong>
            <span>Total issue cards</span>
          </article>
          <article class="summary-card">
            <strong>${summary.totalMissing}</strong>
            <span>Marked missing</span>
          </article>
          <article class="summary-card">
            <strong>${summary.totalPartial}</strong>
            <span>Marked partial</span>
          </article>
          <article class="summary-card">
            <strong>${summary.totalDeferred}</strong>
            <span>Deferred items</span>
          </article>
        </section>
        <nav aria-label="Page sections">
          <ul class="nav-list">
            ${navLinks}
          </ul>
        </nav>
      </header>
      ${pageSections}
      <p class="footer-note">
        Generated from local code and audit CSV on this machine. Screenshots fall back to placeholders if browser automation is unavailable.
      </p>
    </main>
  </body>
</html>`;
}

export function verifyRowCoverage() {
  const rows = parseCsv(readFileSync(CSV_PATH, "utf8"));
  const htmlText = String(readFileSync(OUTPUT_HTML, "utf8")).replace(/<[^>]+>/g, " ");
  const missing = rows.filter((row) => !htmlText.includes(row.section) || !htmlText.includes(row.field));
  if (missing.length === 0) {
    console.log(`Coverage OK: all ${rows.length} CSV rows are present in the generated HTML.`);
    return true;
  }
  console.log("Missing rows:", missing.map((row) => `${row.id}:${row.page}:${row.section}:${row.field}`).join("\n"));
  return false;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const csvRows = parseCsv(readFileSync(CSV_PATH, "utf8"));
  const evidenceMap = buildEvidenceMap();
  const enrichedRows = csvRows.map((row) => enrichRow(row, evidenceMap));
  const supplementalFindings = buildSupplementalFindings().map((row) => enrichRow(row, evidenceMap));
  const issuesByPage = groupIssues(enrichedRows, supplementalFindings);
  const summary = buildSummary(issuesByPage);
  const screenshotRun = await captureScreenshots(SCREENSHOT_TARGETS);

  const screenshotsByPage = {};
  for (const target of SCREENSHOT_TARGETS) {
    const result = screenshotRun.results?.find((item) => item.key === target.key) ?? { ...target, ok: false };
    if (!(target.page in screenshotsByPage) || result.ok) {
      screenshotsByPage[target.page] = result;
    }
  }

  const html = buildHtml(summary, issuesByPage, screenshotsByPage);
  const translationTableCsv = buildTranslationTableCsv(issuesByPage);
  writeFileSync(OUTPUT_HTML, html);
  writeFileSync(OUTPUT_TABLE_CSV, translationTableCsv);

  console.log(`Parsed ${csvRows.length} CSV rows.`);
  console.log(`Rendered ${summary.totalIssues} total issue cards across ${summary.pages.length} page groups.`);
  if (!screenshotRun.available) {
    console.log(screenshotRun.error || "Screenshots unavailable; report uses placeholders where needed.");
  } else {
    const okCount = screenshotRun.results.filter((item) => item.ok).length;
    console.log(`Captured ${okCount}/${screenshotRun.results.length} screenshots.`);
  }
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_HTML)}`);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_TABLE_CSV)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

# Missing Content Audit HTML Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone HTML audit that turns `docs/missing-content-gaps.csv` plus supporting code findings into a detailed, page-by-page report with screenshots or screenshot placeholders.

**Architecture:** Generate the report offline with a small Node script instead of wiring it into the Next.js app. The script will parse the CSV, enrich rows with curated code findings and locale text evidence, optionally capture screenshots from the running local site, and emit a self-contained HTML file plus adjacent screenshot assets.

**Tech Stack:** Node.js, existing Next.js dev server, static HTML/CSS, optional Playwright via `npx` for screenshots

---

### Task 1: Map the report inputs and output paths

**Files:**
- Create: `scripts/generate-missing-content-audit.mjs`
- Create: `docs/audits/missing-content/`
- Create: `docs/audits/missing-content/screenshots/`
- Modify: `docs/missing-content-gaps.csv`

- [ ] **Step 1: Read the CSV and confirm the output directory layout**

```js
const CSV_PATH = "docs/missing-content-gaps.csv";
const OUTPUT_DIR = "docs/audits/missing-content";
const SCREENSHOT_DIR = `${OUTPUT_DIR}/screenshots`;
const OUTPUT_HTML = `${OUTPUT_DIR}/index.html`;
```

- [ ] **Step 2: Run a quick filesystem check before writing any code**

Run: `ls "docs" && ls "docs/superpowers" && ls "docs/audits" || true`

Expected: `docs` and `docs/superpowers` exist. `docs/audits` may or may not exist yet.

- [ ] **Step 3: Create the output directories if missing**

```js
import { mkdirSync } from "node:fs";

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(SCREENSHOT_DIR, { recursive: true });
```

- [ ] **Step 4: Parse the CSV into normalized row objects**

```js
function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
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
```

- [ ] **Step 5: Run the script with a temporary console summary**

Run: `node "scripts/generate-missing-content-audit.mjs"`

Expected: script logs the row count and page groups without throwing parse errors.

### Task 2: Add the curated supporting evidence model

**Files:**
- Modify: `scripts/generate-missing-content-audit.mjs`
- Modify: `messages/en.json`
- Modify: `messages/zh.json`
- Modify: `messages/zh-tw.json`
- Modify: `components/news/NewsPage.tsx`
- Modify: `components/contact/ContactPage.tsx`
- Modify: `components/home/BrandStorySection.tsx`
- Modify: `components/home/CustomerOutcomes.tsx`
- Modify: `components/about/AboutPage.tsx`

- [ ] **Step 1: Define a supplemental findings array keyed by page and field**

```js
const supplementalFindings = [
  {
    page: "Implementation",
    section: "zh.json script mix",
    field: "about.values.title",
    status: "missing",
    codeNote: "Simplified Chinese file uses Traditional Chinese text: 什麼驅動著我們.",
    evidenceText: "messages/zh.json -> about.values.title = 什麼驅動著我們",
  },
  {
    page: "News",
    section: "News page",
    field: "sectionTitleLine1",
    status: "partial",
    codeNote: "Chinese locale files still keep English strings for the news page heading and intro copy.",
    evidenceText: "messages/zh.json and messages/zh-tw.json still use The latest from / News & Press Release.",
  },
];
```

- [ ] **Step 2: Add locale text extraction helpers for exact word-for-word evidence**

```js
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && key in acc ? acc[key] : undefined), obj);
}

function buildLocaleEvidence(messages) {
  return {
    newsHeroLine1: getNestedValue(messages, "newsHero.line1"),
    homeNewsViewAll: getNestedValue(messages, "homeNews.viewAll"),
    aboutValuesTitle: getNestedValue(messages, "about.values.title"),
    richardTitle: getNestedValue(messages, "about.team.members.4.title"),
  };
}
```

- [ ] **Step 3: Merge CSV rows with supplemental findings into page groups**

```js
function groupIssues(rows, findings) {
  const combined = [
    ...rows.map((row) => ({ ...row, source: "csv", status: deriveStatus(row) })),
    ...findings.map((finding) => ({ ...finding, source: "code" })),
  ];

  return combined.reduce((acc, issue) => {
    acc[issue.page] ??= [];
    acc[issue.page].push(issue);
    return acc;
  }, {});
}
```

- [ ] **Step 4: Run the script and inspect one merged sample per page**

Run: `node "scripts/generate-missing-content-audit.mjs"`

Expected: console output shows merged issue counts for `Homepage`, `News`, `Contact`, `About`, `Success Stories`, `Products`, `Locale`, and `Implementation`.

### Task 3: Capture screenshots or fail gracefully

**Files:**
- Modify: `scripts/generate-missing-content-audit.mjs`
- Test: `docs/audits/missing-content/screenshots/`

- [ ] **Step 1: Add a page-to-URL map that uses the running local dev server**

```js
const screenshotTargets = [
  { key: "homepage-en", url: "http://localhost:3000/en", page: "Homepage" },
  { key: "homepage-zh", url: "http://localhost:3000/zh", page: "Homepage" },
  { key: "news-en", url: "http://localhost:3000/en/news", page: "News" },
  { key: "contact-zh", url: "http://localhost:3000/zh/contact", page: "Contact" },
  { key: "about-en", url: "http://localhost:3000/en/about", page: "About" },
  { key: "success-story-zh", url: "http://localhost:3000/zh/success-stories/1", page: "Success Stories" },
];
```

- [ ] **Step 2: Add optional Playwright-based screenshot capture**

```js
async function captureScreenshots(targets, screenshotDir) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    return { available: false, results: [] };
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });
  const results = [];

  for (const target of targets) {
    const path = `${screenshotDir}/${target.key}.png`;
    await page.goto(target.url, { waitUntil: "networkidle" });
    await page.screenshot({ path, fullPage: true });
    results.push({ ...target, path });
  }

  await browser.close();
  return { available: true, results };
}
```

- [ ] **Step 3: Add a fallback state when Playwright is unavailable**

```js
function screenshotPlaceholder(label) {
  return `
    <div class="shot shot--placeholder">
      <strong>Screenshot unavailable</strong>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}
```

- [ ] **Step 4: Install Playwright only if needed by the current environment**

Run: `npm install -D playwright`

Expected: package installs successfully if screenshot automation is desired and not already available.

- [ ] **Step 5: Run the screenshot pass**

Run: `node "scripts/generate-missing-content-audit.mjs"`

Expected: screenshot files appear in `docs/audits/missing-content/screenshots/` or the script logs that it is falling back to placeholders.

### Task 4: Render the standalone HTML audit

**Files:**
- Modify: `scripts/generate-missing-content-audit.mjs`
- Create: `docs/audits/missing-content/index.html`

- [ ] **Step 1: Build the report summary metrics**

```js
function buildSummary(issuesByPage) {
  const pages = Object.entries(issuesByPage).map(([page, issues]) => ({
    page,
    total: issues.length,
    missing: issues.filter((issue) => issue.status === "missing").length,
    partial: issues.filter((issue) => issue.status === "partial").length,
  }));

  return {
    totalIssues: pages.reduce((sum, page) => sum + page.total, 0),
    pages,
  };
}
```

- [ ] **Step 2: Render detailed issue cards with exact text evidence**

```js
function renderIssueCard(issue) {
  return `
    <article class="issue-card">
      <div class="issue-meta">
        <span class="badge badge--status">${escapeHtml(issue.status)}</span>
        <span class="badge badge--priority">${escapeHtml(issue.priority || "Code note")}</span>
      </div>
      <h3>${escapeHtml(issue.section)} · ${escapeHtml(issue.field)}</h3>
      <p><strong>What's missing:</strong> ${escapeHtml(issue.needed || issue.codeNote || "Supporting implementation issue")}</p>
      <p><strong>Locales:</strong> EN ${escapeHtml(issue.en || "-")} / ZH ${escapeHtml(issue.zh || "-")} / ZH-TW ${escapeHtml(issue.zhTw || "-")}</p>
      <p><strong>Deployed:</strong> ${escapeHtml(issue.deployed || issue.status)}</p>
      <p><strong>Recommended action:</strong> ${escapeHtml(issue.action || "Review and align implementation")}</p>
      <p><strong>Notes:</strong> ${escapeHtml(issue.notes || issue.evidenceText || "")}</p>
    </article>
  `;
}
```

- [ ] **Step 3: Embed portable CSS directly in the HTML output**

```js
const styles = `
  :root { color-scheme: light; }
  body { margin: 0; font: 16px/1.6 Inter, system-ui, sans-serif; background: #f5f7fb; color: #111827; }
  .layout { max-width: 1440px; margin: 0 auto; padding: 40px 24px 96px; }
  .page-section { margin-top: 40px; padding: 24px; background: #fff; border-radius: 24px; box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08); }
  .issue-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
  .shot--placeholder { min-height: 220px; display: grid; place-items: center; border: 2px dashed #cbd5e1; border-radius: 16px; background: #f8fafc; }
`;
```

- [ ] **Step 4: Write the final HTML file**

```js
import { writeFileSync } from "node:fs";

writeFileSync(
  OUTPUT_HTML,
  `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Missing Content Audit</title><style>${styles}</style></head><body>${htmlBody}</body></html>`,
);
```

- [ ] **Step 5: Run the generator and confirm the HTML file is created**

Run: `node "scripts/generate-missing-content-audit.mjs"`

Expected: `docs/audits/missing-content/index.html` exists and opens without a build step.

### Task 5: Verify the generated audit output

**Files:**
- Test: `docs/audits/missing-content/index.html`
- Test: `docs/audits/missing-content/screenshots/`
- Test: `docs/missing-content-gaps.csv`

- [ ] **Step 1: Open the generated HTML file in a browser**

Run: `open "docs/audits/missing-content/index.html"`

Expected: the audit opens locally with summary, page sections, and issue cards.

- [ ] **Step 2: Validate that every CSV row is represented**

Run: `node -e "import('./scripts/generate-missing-content-audit.mjs').then(m => m.verifyRowCoverage?.())"`

Expected: logs that all CSV IDs are covered, or prints any missing IDs for correction.

- [ ] **Step 3: Check the screenshots directory**

Run: `ls "docs/audits/missing-content/screenshots"`

Expected: one or more `.png` files if screenshots succeeded, or an empty directory if the fallback placeholder path was used.

- [ ] **Step 4: Review the report for the required detail level**

Run: `open "docs/audits/missing-content/index.html"`

Expected: each page section includes word-for-word missing text where available, locale status, deployed status, and clear notes.

- [ ] **Step 5: Commit if and only if the user asks for a commit**

```bash
git status
```

Expected: only the intended report generator, plan/spec docs, and generated audit assets are pending.

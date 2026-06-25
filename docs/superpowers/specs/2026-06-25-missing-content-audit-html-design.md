# Missing Content Audit HTML Design

## Summary

Create a standalone HTML audit document that turns `docs/missing-content-gaps.csv` into a visual, page-by-page review artifact. The report should show what content is missing, where it appears, which locales are affected, whether the item exists on the deployed site, and any nearby implementation issues found in code that support the same audit.

## Goals

- Present the CSV gaps in a format that is easy to review page by page.
- Include screenshots or screenshot placeholders for the relevant page states.
- Show exact field-level missing content word by word when available from the CSV or code.
- Include supporting implementation observations when they clarify the page audit.
- Make the output shareable as a single HTML file that can be opened locally in the browser.

## Non-Goals

- Fixing the content gaps in the site implementation.
- Inventing missing business copy that does not exist in the CSV or codebase.
- Building a permanent in-app admin dashboard for content QA.
- Replacing the CSV as the source of truth for the current audit pass.

## Current Context

The user has a curated gap list in `docs/missing-content-gaps.csv`. That file already identifies page, section, field, locale coverage, deployed-site presence, recommended action, and notes. The codebase also contains supporting evidence for some items, including:

- sections that exist locally but not on the deployed site
- locale strings that are untranslated or mixed-script
- page implementations whose structure exceeds what the CSV currently covers

The report therefore needs to merge two evidence sources:

1. the CSV audit rows
2. nearby code-level findings that reinforce or explain the same page-level gaps

## Proposed Output

Generate one standalone HTML file, likely under `docs/`, with all styling embedded so it can be opened directly without a build step.

The document structure:

1. A summary header with totals by page and status
2. A quick navigation area linking to each page section
3. One section per audited page or audit bucket
4. Within each section, grouped issue cards for each missing or partial item

Primary page groups:

- `Homepage`
- `News`
- `Contact`
- `About`
- `Success Stories`
- `Products`
- `Locale`
- `Implementation`

## Issue Card Format

Each issue card should include:

- page
- section
- field
- expected text or missing content description
- locale availability for `EN`, `ZH`, and `ZH-TW`
- deployed status
- recommended action
- notes from the CSV
- supporting code note when applicable
- screenshot or screenshot placeholder

The content should be written in plain review language so a non-developer can understand what is missing without reading source files.

## Screenshot Strategy

The report should include visual evidence for each page section:

- use actual screenshots when they can be captured from the local or deployed page
- if a specific field cannot be isolated visually, include the page screenshot plus a caption that points to the missing area
- when no screenshot is practical, show a clearly labeled placeholder box so the report layout remains consistent

The screenshot requirement is supportive evidence, not pixel-accurate annotation tooling.

## Detail Level

The user asked for a detailed report "word by word, page by page." To satisfy that, each page section should:

- enumerate every relevant CSV row in that page group
- restate the exact field or wording from the CSV when available
- explain whether the issue is fully missing, partially translated, structurally absent, or present only in one locale
- separate "missing on deployed" from "implemented locally but incomplete"

For grouped topics like `About` or `Contact form`, the section can also include a compact checklist summary above the detailed cards.

## Supporting Code Findings

The report should include nearby code findings only when they strengthen the same audit item. Examples:

- a page exists locally but not on deployed production
- a Simplified Chinese file contains Traditional Chinese script
- a detail page keeps English labels in Chinese locales
- a component contains local-only copy not backed by the client CSV

These findings should appear as supporting notes, not as unrelated bug reports.

## Data Flow

The HTML generator should derive its content from:

- parsed rows from `docs/missing-content-gaps.csv`
- curated supplemental findings added in code or in a small local data object

This avoids hard-coding the entire report as raw HTML while still allowing editorial control over screenshots and explanatory notes.

## Implementation Notes

- Prefer a simple script or generated static HTML over wiring the audit into the Next.js app.
- Keep CSS embedded in the output file for portability.
- Use clear color coding for status such as `missing`, `partial`, `exists`, and `deferred`.
- Preserve the exact wording from the CSV for critical fields and notes.
- If screenshots are produced programmatically, store them in a predictable adjacent folder and reference them relative to the HTML file.

## Error Handling

- If a screenshot cannot be generated for a page, the report should still render with a visible "screenshot unavailable" state.
- If a CSV row lacks expected text, show the field label and the CSV notes rather than inventing missing copy.
- If supporting code evidence is incomplete, omit the extra note instead of making uncertain claims.

## Testing

- Open the generated HTML file directly in a browser and confirm all sections render.
- Verify every row from `docs/missing-content-gaps.csv` appears in the appropriate page section.
- Verify page totals and status totals match the rendered cards.
- Verify screenshot paths resolve or degrade gracefully with placeholders.
- Verify the report remains readable on a laptop-width viewport.

## Open Decisions Resolved

- The report includes supporting code-level findings in addition to the CSV rows.
- The output is a standalone HTML audit document rather than a markdown summary.
- The structure is page-by-page first, with field-level detail inside each page.
- The recommended implementation path is a generated static report, not a new app route.

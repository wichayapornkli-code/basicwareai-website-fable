# Chinese Word-Break Audit

Date: 2026-06-25

Scope checked:

- Locales: `/zh`, `/zh-tw`
- Viewports: mobile `375x900`, desktop `1280x900`
- Routes: `/`, `/about`, `/contact`, `/solutions`, `/solutions/basicrouter`, `/solutions/token`, `/solutions/employees`, `/solutions/content`, `/solutions/education`, `/success-stories`, `/success-stories/1` through `/success-stories/6`, `/news`, `/news/3hk-alibaba-basicware-alliance`

Result:

- Automated horizontal-overflow matrix: 72 route/locale/viewport checks, 0 failures.
- Real mobile overflow found on `/solutions` and `/success-stories` was traced to `LogoScroller` sizing to its marquee content as a flex child inside `ScrollHero`.
- Fixed by constraining `LogoScroller` to `width: 100%`, `max-width: 100vw`, and `min-width: 0` while keeping the marquee clipped inside the section.

Typography fixes applied:

- Added CJK line-break defaults for Chinese `html:lang(...)` selectors.
- Replaced the footer English-only `Infinite` split with locale-specific `footer.taglineAccent`.
- Changed contact email wrapping from `word-break: break-all` to `overflow-wrap: anywhere` plus `word-break: break-word`.
- Allowed breadcrumb current labels, case-study tags, and solution tabs to wrap without forcing horizontal overflow.

Notes:

- Raw element-box checks still flag intentionally off-canvas mobile navigation and decorative cursor/grain/animated layers. These do not increase document `scrollWidth`; the final pass used document/body horizontal overflow as the authoritative failure signal.

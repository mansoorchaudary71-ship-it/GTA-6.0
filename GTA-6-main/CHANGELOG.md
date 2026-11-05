# VICE TOOLS — Cumulative Changelog (Batches 0–5 + Final)

Unofficial fan-made GTA 6 companion toolkit — Vite + React 19 + TypeScript +
Tailwind v4 — https://vicetools.app. GTA 6 launches **Thursday, November 19,
2026** (PS5 + Xbox Series X|S). This file is the cumulative record of the
whole build; the merge-ready deliverable is the single bundle
`VICE-TOOLS-ALL-CHANGED-FILES.md` (117 text files) plus the 7 PNGs and the
extractor `extract-bundle.py` in this same folder.

## Final verification (2026-11-05, fresh build in the work copy)

All gates pass. Exact final numbers:

| Check | Result |
|---|---|
| `npm run validate:data` | PASS — every confirmed/reported record is sourced |
| `npx tsc --noEmit` | PASS — 0 errors |
| `npm run build` | PASS, exit 0 — **91 routes + 404.html**; sitemap **91 indexable URLs**; RSS **3 posts**; facts endpoint **42 facts (28 confirmed, 13 reported, 1 unconfirmed)** |
| `npm run verify:html` | PASS — **92 HTML files**, all with H1 in body; title, description, canonical, JSON-LD in head |
| `npm run check:links` | PASS — 92 files, 91 routes, **0 trailing-slash links, 0 orphan warnings** |
| `npm run validate:schema` | PASS — 92 files, **241 JSON-LD blocks, 251 schema objects**, all parse and pass field checks |
| `npm run verify:regions` | PASS — 40 region pages, **min 493 / max 1,070 / avg 648 unique words** (threshold 350, 8-word-shingle method) |

Extra final checks (all pass):

- `dist/data/facts.json` exists, parses as JSON (42 facts), and is **not** in the sitemap.
- **0 of the 40 region pages** carry a `noindex` tag.
- FAQ hub `/gta-6-faq`: **31/31 question anchors present**, exactly 1 FAQPage block.
- Trailers page: **4 `VideoObject` blocks**, 4 official Rockstar youtube-nocookie embeds, all 4 video IDs present.
- Contact page shows the honest **"Contact email not set yet"** state (CONTACT_EMAIL is empty).
- **Merge simulation:** the bundle was extracted onto a fresh copy of the original zip, the 3 deleted files removed, the 7 PNGs copied in, then `npm install` + full build + all gates run — identical numbers to the work copy (91 routes, 92 HTML, 91 sitemap URLs, 241 JSON-LD blocks, regions min 493). The bundle merges cleanly.

## Batch summaries

- **Batch 0 — Audit + architecture + topical map.** 15 verified audit findings (client-rendered only, invented vehicles/weapons/properties/locations, fake status/authors/updates, guessed FAQ/guide facts, fake GA ID, ADS_ENABLED=true, no-timezone countdown, missing favicon/OG image). Architecture: custom prerender script + SSR entry (`renderToString` + `StaticRouter`). `TOPICAL_MAP.md` written (4 hubs, 40 region pages, 3 compare pages, FAQ hub, GEO files).
- **Batch 1 — Prerender/SSG + data integrity + fake-content removal.** 75 files (38 modified, 37 added, 3 deleted). Real static HTML for every route; `validate:data` + `verify:html` gates; invented database entries stripped to schema + template; status page rebuilt as honest pre-launch; guides/FAQs rewritten with sourced facts; `ADS_ENABLED: false`; fake GA ID removed. **Real defect found and fixed:** react-helmet-async v3 is a no-op on React 19 during server rendering — the prerender script now extracts head tags into `<head>` and the HTML checker verifies they are there.
- **Batch 2 — Technical SEO + host configs + OG export + IndexNow + performance/a11y.** 30 files (15 added, 15 modified). Netlify/Vercel/Cloudflare configs with identical security headers (CSP safe for Google Fonts/GA/AdSense), trailing-slash 301s, real 404 status; `og:export` renders 7 PNGs at exactly 1200×630; IndexNow key file + dry-run-only script; `validate:schema` gate; ItemList JSON-LD on hubs. **Real defect found and fixed:** Vite was preloading the 407 KB Recharts chunk into every page's head — fixed with a preload filter. Muted text passes WCAG AA at 9.01:1.
- **Batch 3 — Hub 1 (Release & Launch) + Hub 2 (Buy & Editions).** 19 files (14 added, 5 modified). 15 pages, all word targets met (pillars 1,540 / 1,635 words; spokes 817–1,086). '95 Grotti Cheetah omitted entirely (the PlayStation Store lists Ultimate contents generically); pre-order totals only as labelled estimates; US prices only.
- **Batch 4 — 40 region programmatic pages + 3 compare pages.** 8 files (3 added, 5 modified). Region pages flipped noindex → indexable; sitemap 42 → 82 URLs; new `verify:regions` uniqueness gate (8-word-shingle method, min 493 unique words); compare pages on verified facts only (GTA 6 vs GTA 5 / vs RDR2 / PS5 vs Xbox Series X).
- **Batch 5 — Hub 3 (World & Story) + FAQ hub + methodology + GEO + legal/contact.** 29 files (10 added, 19 modified). 7 world pages (pillar 2,249 words), FAQ hub with 31 questions, methodology/editorial-policy page, expanded `llms.txt`, `/data/facts.json` endpoint (42 facts), Privacy/Terms/Disclaimer rewrites, ContactPage fake-backend form removed, YouTube `frame-src` added to CSP, FAQSection fix (all answers now in the DOM), region timezone-label fix (PKT/NZDT instead of GMT+5/GMT+13), guides expanded to 800–1,500 words.
- **Final batch — Verification + cumulative bundle + this changelog.** No new repo code. Full verification re-run green, definitive hash diff computed, single cumulative bundle (`VICE-TOOLS-ALL-CHANGED-FILES.md`, 117 text files), extractor (`extract-bundle.py`, round-trip tested byte-for-byte), merge simulation on a fresh copy of the original zip (build + all gates green), QA checklist, manual-verify list, post-launch plan.

## Definitive changed files (hash diff vs the original zip)

Per-batch counts overlap (files were touched in several batches), so these
cumulative totals are the source of truth: **79 added,
45 modified, 3 deleted — 124 files
changed in total (117 text files in the bundle + 7 PNGs).**

### Added (79)

- `netlify.toml`
- `package-lock.json`
- `public/_headers`
- `public/_redirects`
- `public/ads.txt`
- `public/c3c06ff9422d53a0cb47d4ff6edb3c74.txt`
- `public/favicon.svg`
- `public/llms.txt`
- `public/og-banner.png`
- `public/og-banner.svg`
- `public/og-editions.png`
- `public/og-faq.png`
- `public/og-map.png`
- `public/og-news.png`
- `public/og-release.png`
- `public/og-tools.png`
- `public/site.webmanifest`
- `scripts/check-links.mjs`
- `scripts/generate-facts-endpoint.mjs`
- `scripts/generate-rss.mjs`
- `scripts/generate-sitemap.mjs`
- `scripts/indexnow.mjs`
- `scripts/og-export.mjs`
- `scripts/prerender.mjs`
- `scripts/validate-data.mjs`
- `scripts/validate-schema.mjs`
- `scripts/verify-html.mjs`
- `scripts/verify-regions.mjs`
- `src/AppRoutes.tsx`
- `src/components/Analytics.tsx`
- `src/components/Article.tsx`
- `src/components/Breadcrumbs.tsx`
- `src/components/EmailCapture.tsx`
- `src/components/Layout.tsx`
- `src/data/README.md`
- `src/data/comparisons.json`
- `src/data/editions.json`
- `src/data/facts.json`
- `src/data/news.json`
- `src/data/region-content.json`
- `src/data/regions.json`
- `src/data/verified-map-regions.json`
- `src/entry-server.tsx`
- `src/lib/analytics.ts`
- `src/lib/facts.ts`
- `src/lib/region-content.ts`
- `src/lib/regions.ts`
- `src/lib/routes.ts`
- `src/lib/schema.ts`
- `src/lib/useMounted.ts`
- `src/pages/about/MethodologyPage.tsx`
- `src/pages/buy/DownloadPage.tsx`
- `src/pages/buy/EditionsPage.tsx`
- `src/pages/buy/PreOrderPage.tsx`
- `src/pages/buy/PreOrdersSoldPage.tsx`
- `src/pages/buy/PricePage.tsx`
- `src/pages/compare/ComparePage.tsx`
- `src/pages/faq/FaqHubPage.tsx`
- `src/pages/news/NewsHubPage.tsx`
- `src/pages/news/NewsPostPage.tsx`
- `src/pages/release/CountdownPage.tsx`
- `src/pages/release/DelayHistoryPage.tsx`
- `src/pages/release/FileSizePage.tsx`
- `src/pages/release/PcReleaseDatePage.tsx`
- `src/pages/release/PhysicalDiscPage.tsx`
- `src/pages/release/PlatformsPage.tsx`
- `src/pages/release/PreloadPage.tsx`
- `src/pages/release/ReleaseDatePage.tsx`
- `src/pages/release/ReleaseTimeHubPage.tsx`
- `src/pages/release/ReleaseTimeRegionPage.tsx`
- `src/pages/release/WhyNoPcPage.tsx`
- `src/pages/world/CharactersPage.tsx`
- `src/pages/world/DevelopmentCostPage.tsx`
- `src/pages/world/LeaksVsConfirmedPage.tsx`
- `src/pages/world/MapHubPage.tsx`
- `src/pages/world/StoryLengthPage.tsx`
- `src/pages/world/TrailersPage.tsx`
- `src/pages/world/ViceCityLeonidaPage.tsx`
- `vercel.json`

### Modified (45)

- `.env.example`
- `bun.lock`
- `index.html`
- `package.json`
- `public/robots.txt`
- `src/App.tsx`
- `src/components/CookieConsent.tsx`
- `src/components/CountdownTimer.tsx`
- `src/components/FAQSection.tsx`
- `src/components/Footer.tsx`
- `src/components/GlobalSearchModal.tsx`
- `src/components/SEO.tsx`
- `src/config/site.ts`
- `src/data/faqs.json`
- `src/data/guides.json`
- `src/data/locations.json`
- `src/data/properties.json`
- `src/data/status.json`
- `src/data/vehicles.json`
- `src/data/weapons.json`
- `src/index.css`
- `src/main.tsx`
- `src/pages/Home.tsx`
- `src/pages/MapPage.tsx`
- `src/pages/StatusPage.tsx`
- `src/pages/calculators/CalculatorsHub.tsx`
- `src/pages/calculators/LoadoutBuilder.tsx`
- `src/pages/calculators/MoneyCalculator.tsx`
- `src/pages/calculators/VehicleComparison.tsx`
- `src/pages/database/DatabaseHub.tsx`
- `src/pages/database/PropertiesDatabase.tsx`
- `src/pages/database/PropertyDetail.tsx`
- `src/pages/database/VehicleDetail.tsx`
- `src/pages/database/VehiclesDatabase.tsx`
- `src/pages/database/WeaponDetail.tsx`
- `src/pages/database/WeaponsDatabase.tsx`
- `src/pages/guides/GuideDetail.tsx`
- `src/pages/guides/GuidesPage.tsx`
- `src/pages/utility/AboutPage.tsx`
- `src/pages/utility/ContactPage.tsx`
- `src/pages/utility/DisclaimerPage.tsx`
- `src/pages/utility/NotFoundPage.tsx`
- `src/pages/utility/PrivacyPage.tsx`
- `src/pages/utility/TermsPage.tsx`
- `vite.config.ts`

### Deleted (3)

- `metadata.json` — AI Studio leftover, not part of the app.
- `public/sitemap.xml` — static sitemap replaced by build-time generation (`scripts/generate-sitemap.mjs`).
- `src/data/updates.json` — fake updates replaced by the sourced `src/data/news.json`.

## Known issues carried forward

- **Prerender is not idempotent standalone.** It reads `dist/index.html` as its template, which a prior run overwrites. Always run via `npm run build`. (Carried from Batch 2; never caused a failure when the documented command is used.)
- **Dated "14 days left" prose goes stale after November 19, 2026.** `src/pages/release/ReleaseDatePage.tsx:31`, `src/pages/release/CountdownPage.tsx:24, 81, 127`, `src/pages/faq/FaqHubPage.tsx:36` — all explicitly dated ("As of November 5, 2026…") and pointing at the live countdown. Refresh in the Day 1 post-launch pass.
- **Description-length escaping artifacts (cosmetic).** `/gta-6-characters-jason-lucia` measures 158 chars and `/gta-6-story-and-length` 156 in raw HTML against the <155 target; the source strings are 154 and 152 chars — the `'` in "GTA 6's" / "developer's" renders as `&#x27;` (+4 chars each). Content is unchanged; shorten both descriptions by a few words if a hard <155 in raw HTML is wanted.
- **CONTACT_EMAIL is empty** (`src/config/site.ts`). The Contact page handles this honestly ("Contact email not set yet"). Fill it before launch — never invent an address.
- **IndexNow has never pinged live.** The script defaults to dry-run; run `npm run indexnow -- --live` after deploy.
- **Per-page OG images beyond the Batch 2 set (7 PNGs) do not exist yet.** World pages share `og-map.png`; other hubs use their Batch 2 image. Create per-page images later if wanted — the `og:export` script is the tool.
- **'95 Grotti Cheetah is unverified.** It is never listed as a confirmed bonus anywhere in the site. Verify on https://www.rockstargames.com/VI/editions before adding it.
- **FAQ hub's 30 long-tail questions are a reconstruction from the brief** (Data_1.xlsx was never uploaded), plus "Is GTA 6 on PS5?" as a 31st core-keyword question.
- **World spokes run 8–272 words over the 1,500 ceiling** only because the Batch 5 FAQ fix puts all FAQ answers in the DOM; body content without the FAQ section is 1,081–1,377 words on every spoke. Deliberate trade, reported honestly in the Batch 5 changelog.

## Merge steps

From the bundle (recommended — one step for everything):

1. Save `VICE-TOOLS-ALL-CHANGED-FILES.md` and `extract-bundle.py` in the same folder.
2. From your repo root, run: `python3 extract-bundle.py VICE-TOOLS-ALL-CHANGED-FILES.md .`
3. Delete the 3 deleted files listed above.
4. Copy the 7 PNGs from the Batch 2 zip (`vice-tools-batch2-UPLOAD-TO-REPO-ROOT.zip`, folder `public/`) into your repo's `public/` folder.
5. Run: `npm install && npm run build && npm run verify:html && npm run check:links && npm run validate:schema && npm run verify:regions` — all six must pass. Then deploy.

The per-batch zips (`vice-tools-batch1` … `vice-tools-batch5-UPLOAD-TO-REPO-ROOT.zip`) remain available in this folder as backups.

## Pre-launch QA checklist

- [ ] **Rich Results Test** (https://search.google.com/test/rich-results) on: home `/`, a pillar (`/gta-6-release-date`), a region page (`/gta-6-release-time/pakistan`), the FAQ hub (`/gta-6-faq`), a news post (`/news/gta-6-pre-load-begins-november-10`). Expect valid FAQPage, BreadcrumbList, Article, and ItemList blocks. Note: Google restricts FAQ rich results to government/health sites, so FAQPage may show as valid-but-ineligible on Google — it is still valid structured data and used by other engines.
- [ ] **Lighthouse, mobile**, on home + a pillar (`/gta-6-release-date`). Target 90+ on Performance, Accessibility, Best Practices, SEO. Known context: total JS is ~1.1 MB, but the 407 KB Recharts chunk loads only on tool pages (verified: home preloads only its runtime).
- [ ] **View-source check with JavaScript disabled** on `/`, `/gta-6-release-date`, `/gta-6-release-time/pakistan`: confirm the H1, the page content, and the JSON-LD are all present in the HTML source.
- [ ] **Mobile test on a real phone:** countdown renders and ticks, map tool loads, calculators work, cookie banner appears and stores the choice, nav and search modal open.
- [ ] **Broken-link check:** `npm run check:links` passes (0 orphans, 0 broken, 0 trailing-slash) plus one manual pass of the nav and footer links.
- [ ] **Search Console + Bing:** submit the sitemap `https://vicetools.app/sitemap.xml`; request indexing for the pillars (`/`, `/gta-6-release-date`, `/gta-6-pre-order`, `/gta-6-map`, `/gta-6-faq`); run the live IndexNow ping (`npm run indexnow -- --live`).
- [ ] **Fill the config placeholders** (see manual-verify list) and confirm the live URL is https://vicetools.app.
- [ ] **Confirm the live host serves `404.html` with a real 404 status** (open a nonsense URL, e.g. `/no-such-page`, and check the status code is 404, not 200).

## Manual-verify list (exact official URLs)

Check each of these by hand before or just after launch — they are the only facts the build could not verify itself:

- **'95 Grotti Cheetah as an Ultimate Edition bonus** — https://www.rockstargames.com/VI/editions — if it is listed there, it can be added as a confirmed bonus; until then it stays out.
- **PlayStation Store 12:00 AM ET Nov 19 unlock line** — the PlayStation Store GTA VI page (US). The line is currently sourced to the store listing, but a live fetch showed no time-of-day line on the page — confirm it or remove the line.
- **Xbox unlock time** — Xbox Store GTA VI page / Rockstar Support. Add it if Rockstar publishes one; the site currently states Xbox has no published unlock time.
- **Pre-order totals** — the `preorder-totals` entry in `src/data/facts.json` carries a placeholder-ish `source_url` (rockstargames.com/newswire). Confirm the Insider Gaming / Sensor Tower figures with a real source URL, or drop the entry.
- **Config placeholders** — fill `AUTHOR_NAME`, `AUTHOR_BIO`, `AUTHOR_URL`, `CONTACT_EMAIL` in `src/config/site.ts` with real values (never invent them — ask the site owner).
- **Environment** — set `VITE_GA_ID` (or leave empty = analytics off) and `VITE_SITE_URL` in `.env`; confirm the live site URL is https://vicetools.app.
- **`ads.txt` publisher ID** — the file carries a placeholder. Fill it only if/when AdSense is enabled. Ads stay OFF by default (`ADS_ENABLED: false`).
- **404 status on the live host** — confirm the chosen host serves `404.html` with a real 404 status (see the QA checklist).

## Post-launch plan

### Day 1 — November 19, 2026 (launch day)

- Verify the countdown flips to its launch state (local midnight Nov 19 in the visitor's timezone).
- Publish a launch-day news post via the JSON workflow: add an entry to `src/data/news.json` (dated, sourced), rebuild, verify it appears on `/news` and in `/rss.xml`.
- Run the live IndexNow ping: `npm run indexnow -- --live`.
- Check Search Console for crawl errors; request indexing for the pillars if not already done.
- Refresh the dated "14 days left" prose (ReleaseDatePage, CountdownPage, FaqHubPage) — it goes stale on launch day.
- Spot-check the live site: home, a region page, a calculator, the map tool, the cookie banner.

### Day 7 — November 26, 2026

- Review Search Console performance: which pages are getting impressions, and for which queries. Fix any crawl errors.
- Publish the first post-launch news (patches, player counts, official announcements) — only verified figures, with sources and dates.
- Start importing verified database data (vehicles, weapons, properties, locations) via the documented schema in `src/data/README.md` — each entry needs `status: "confirmed"` + `source_url` + `last_verified`, or `validate:data` fails the build.
- Check the status page: if Rockstar/PSN/Xbox publish a real status, wire the documented post-launch interface.

### Day 30 — December 19, 2026

- Review rankings for the core keywords (gta 6 release date, trailer, map, pc, price, pre order, countdown, leaks).
- Expand the thinnest pages based on the Search Console query data; add FAQ entries for questions users are actually asking.
- Consider the first real database entries going live: flip a detail page to indexable **only** when its data is confirmed and sourced — never before.
- Review the ad/consent setup if enabling AdSense (fill the `ads.txt` publisher ID, confirm Consent Mode v2 behaviour, keep the reserved ad heights).
- Update the methodology update log (`/about/methodology`) with what changed in the first month.

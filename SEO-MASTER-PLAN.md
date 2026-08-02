# AMA United (amautdc.com) — SEO Master Plan & Automated SEO Agent

**Goal:** Drastically improve organic visibility and lead volume in 2–3 months (Aug–Oct 2026), then keep compounding via an automated, self-improving SEO agent.

**Business:** Ottawa fence contractor / deck builder / interlock (AMA United Company). Leads = quote-form submissions + phone calls.

**Site:** Static HTML on **Cloudflare Pages** (project `amautdc`, domains amautdc.com + www.amautdc.com; pretty URLs enabled), no git repo yet, no build step. GSC verification file present (`google11c7e5ed08484531.html`).

---

## 0. Audit Findings (verified 2026-08-01)

### CRITICAL — fix first, these dilute every ranking signal

1. **[HIGH] Canonical/URL mismatch across the entire site.**
   Live server: `/fencing-kanata` → 200, `/fencing-kanata.html` → 301 to extensionless.
   But every page's `<link rel="canonical">` and `og:url` points to the `.html` version (e.g. `fencing-kanata.html:11-12`), and **all internal nav/footer links use `./page.html`**.
   → Every internal link passes through a 301; canonicals point at redirecting URLs. Fix: rewrite ALL canonicals, og:urls, and internal hrefs to extensionless (`/fencing-kanata`). Sitemap is already extensionless (correct — keep it).

2. **[HIGH] Page weight / Core Web Vitals.**
   - `assets/` = 15MB of JPG/PNG (fencing folder alone 8.8MB; `logo.png` 179KB).
   - Homepage loads a Spline 3D viewer from `unpkg.com/@splinetool/viewer@latest` (index.html:18) — huge JS payload, `@latest` is also a stability risk. This almost certainly wrecks mobile LCP/INP.
   Fix: convert all images to WebP (~70–80% savings), lazy-load below-fold images with explicit `width`/`height` (CLS), replace or lazy-init Spline behind a poster image / interaction, self-host or `font-display: swap` is already set via Google Fonts URL — fine.

3. **[MED] Self-serving `aggregateRating` in Service schema** (fencing-kanata.html:27 and siblings) with no visible on-page reviews. Google ignores or can penalize self-serving review markup on LocalBusiness/Service. Fix: remove it from Service schema, or add genuine on-page review content and mark reviews up properly.

4. **[MED] `og:image` missing sitewide** — social shares render blank. Add a branded 1200×630 image per page type. Also add Twitter card tags.

### GOOD — already in place (don't redo)

- LocalBusiness/GeneralContractor schema on homepage with NAP, hours, areaServed, OfferCatalog (index.html:19-120).
- FAQPage + BreadcrumbList schema on location pages with genuinely local content (Kanata bylaws, neighbourhood names) — this is high quality, replicate the pattern.
- robots.txt clean, sitemap.xml complete and extensionless, www→non-www 301, legacy URL redirects in `_redirects`.
- 6 fencing location pages + 1 deck location page + 4 blog guides.

### GAPS — where the growth is

- **Service × location matrix is ~15% built.** You have fencing-{kanata,nepean,barrhaven,orleans,stittsville,gloucester} and decks-barrhaven. Missing: decks × 5 suburbs, interlock × 6 suburbs, fencing-{manotick,riverside-south,findlay-creek,greely} (already claimed in areaServed schema!).
- **Blog: 4 evergreen guides, nothing since.** Zero coverage of high-intent cost/comparison queries ("fence cost ottawa 2026", "PVC vs wood fence Ottawa", "deck permit Ottawa", "interlock driveway cost").
- **No git repo / no deploy pipeline** — blocks all automation (Section 3 prerequisite).
- **Local SEO layer** (GBP, citations, reviews velocity) — not visible from the repo; for a contractor, Google Business Profile + Map Pack is where most leads actually come from. Must be worked in parallel.
- No GSC/GA4 measurement loop visible in the pages (no analytics tag found in `<head>` — verify; if truly absent, you're flying blind on conversions).

---

## 1. Phase 1 — Technical Foundation (Week 1–2)

Everything here is one working session for Claude Code. Order matters.

- [x] **1.1 Git + deploy pipeline (prerequisite for the agent).** DONE 2026-08-01: `git init`, pushed to `github.com/obadayoubi7/amautdc-website` (public). Remaining manual step: in the Cloudflare Pages dashboard → project `amautdc` → Settings → Builds & deployments → "Connect to Git" → select `obadayoubi7/amautdc-website`, branch `main`, build command none (static site), output directory `/`. This requires your Cloudflare login so it's a one-time manual click-through, not automatable.
- [x] **1.2 URL canonicalization sweep.** DONE 2026-08-01: script (`scripts` were run ad hoc, not retained) rewrote 742 internal `href="./x.html"` → `href="/x"` references, plus canonicals + og:url, across all 20 pages. Verified zero `.html` internal links remain (CSS/JS links untouched).
- [x] **1.3 Image optimization.** DONE 2026-08-01: `scripts/optimize-images.mjs` converted all 40 photos to WebP (quality 78, effort 6 — real-world savings ~16%, less than the 70-80% originally estimated since source JPGs were already compressed; logo.png alone went 175KB→21KB). `scripts/rewrite-img-tags.mjs` updated all 151 `<img>` references to `.webp` and added `width`/`height` attributes (existing `loading="lazy"` was already in place site-wide, left untouched). Original JPG/PNGs left on disk (unreferenced, harmless, preserved in git history) — bulk-delete was blocked by a permission guard; optional cleanup for a future session: `git rm` the files under `assets/**/*.{jpg,jpeg,png}` except none are referenced anymore.
- [x] **1.4 Homepage JS diet.** DONE 2026-08-01: Spline viewer pinned to `@1.12.98` (was `@latest`) and now injected via `window.addEventListener('load', ...)` instead of an eager `<script type=module>` in `<head>`, so it no longer competes with initial page load.
- [x] **1.5 Schema cleanup.** DONE 2026-08-01: removed the identical copy-pasted `aggregateRating` (5.0, 165 reviews) from the `Service.provider` schema on all 7 location pages — kept the homepage's LocalBusiness-level rating since it's backed by a `sameAs` HomeStars link and matches visible on-page testimonials. Added sitewide `og:image` + `twitter:card` (previously missing entirely) pointing to a new generated branded image at `assets/og-image.png` (1200×630).
- [x] **1.6 Measurement.** DONE 2026-08-01: GA4 property created by user (Measurement ID `G-RB3FQ7F1N6`), `scripts/add-ga4.mjs` wired the gtag.js snippet into all 20 pages. Conversion events added: `phone_call_click` (delegated listener on any `a[href^="tel:"]`, fires sitewide) and `generate_lead` (fires in the EmailJS success callback on both `index.html` and `contact.html`, the only two pages with the actual quote form). Remaining manual step: in GA4 Admin → Events, mark `generate_lead` as a conversion (GA4 does this automatically for the standard event name within ~24-48h, but confirm it). GSC verification file (`google11c7e5ed08484531.html`) already in place — still worth confirming in Search Console that the sitemap is submitted and the extensionless URL set is what's indexed (not `.html` duplicates).

**Phase 1 is now fully complete (2026-08-01).** Remaining before Phase 2: connect Cloudflare Pages to the GitHub repo (see 1.1) so future pushes auto-deploy.

**Expected impact:** consolidation of link equity, faster mobile experience, eligibility for rich results. This alone typically moves a small local site noticeably within 3–6 weeks.

## 2. Phase 2 — Content Engine (Week 2–10, ongoing)

### 2.1 Service × Location matrix (highest ROI for a contractor)

Build the missing pages using the existing fencing-kanata.html pattern (local FAQs, neighbourhood names, breadcrumb + FAQ schema). **Priority order** (intent × volume for Ottawa):

| Priority | Pages |
|---|---|
| P1 | interlock-kanata, interlock-barrhaven, interlock-orleans, interlock-nepean |
| P2 | decks-kanata, decks-orleans, decks-nepean, decks-stittsville |
| P3 | fencing-manotick, fencing-riverside-south, fencing-findlay-creek, fencing-greely |
| P4 | interlock-stittsville, interlock-gloucester, decks-gloucester |

Rules: one primary intent per page, unique local content (neighbourhoods, soil/climate notes, local bylaw specifics), min ~600 words of real substance, cross-link service page ↔ location pages ↔ sibling locations. **Never publish thin near-duplicates** — if a page can't be differentiated, don't build it.

### 2.2 High-intent blog content (2 posts/month minimum)

Target money keywords the 4 existing guides don't cover:

1. "How Much Does a Fence Cost in Ottawa? (2026 Prices)" — update yearly, this is the #1 lead keyword for fence contractors
2. "PVC vs Wood Fence in Ottawa: Which Survives Our Winters?"
3. "Interlock Driveway Cost Ottawa 2026"
4. "Do You Need a Permit for a Deck in Ottawa?" (City of Ottawa specifics)
5. "Composite vs Pressure-Treated Decks: Ottawa Cost Comparison"
6. "Fence Installation Timeline: What to Expect"

Each post: FAQPage schema where genuine, internal links to matching service + location pages, one clear CTA to the quote form.

### 2.3 Internal linking + sitemap discipline

Every new page: added to sitemap.xml with real lastmod, linked from at least 2 existing strong pages, links out to its service parent + 2 sibling locations. Blog index becomes a hub.

## 3. Phase 3 — Local SEO Layer (parallel, human + agent-assisted)

Most contractor leads come from the Map Pack, not blue links. The agent can draft, but a human does these:

- [ ] **Google Business Profile:** complete every field, weekly photo uploads (job-site photos are gold), GBP Posts 1×/week (agent drafts them), Q&A seeding, service areas matching the location pages.
- [ ] **Review velocity:** systematic post-job review ask (SMS/email template with direct GBP review link). Target: 4–8 new reviews/month. Respond to every review (agent drafts responses).
- [ ] **Citations:** consistent NAP on HomeStars, Houzz, Yelp CA, YellowPages.ca, BBB, Ottawa chamber/directories. One-time cleanup + quarterly check.
- [ ] **Local links:** Ottawa home-show pages, supplier partner pages (fence/deck material suppliers list their installers), community sponsorships.

## 4. The Automated SEO Agent ("keeps getting better")

### Architecture — pragmatic, not sci-fi

A **scheduled Claude Code agent** (weekly cadence) with a persistent memory ledger, a defined toolbelt, and a **human review gate** (PR-based). Self-improvement = it measures the outcome of its past actions in GSC data and updates its own playbook file.

```
┌─────────────────────────────────────────────────────┐
│ WEEKLY RUN (scheduled task / cron)                  │
│                                                     │
│ 1. INGEST   GSC API (queries, pages, CTR, position) │
│             PageSpeed API (CWV per template)        │
│             Site crawl (links, titles, schema)      │
│ 2. COMPARE  vs. seo-agent/ledger.json (last runs)   │
│             → what moved after last week's changes? │
│ 3. LEARN    append outcome → seo-agent/PLAYBOOK.md  │
│             (what worked / what didn't, with data)  │
│ 4. DECIDE   pick top 3 actions by expected impact:  │
│             • fix regressions (CWV, broken links)   │
│             • title/meta rewrites for high-impress. │
│               low-CTR pages (GSC's free wins)       │
│             • next matrix page or blog post (2.1/2.2│
│               queue, informed by rising queries)    │
│             • internal-link injections              │
│ 5. ACT      implement on a branch → open PR         │
│ 6. GATE     YOU review + merge → Cloudflare deploys │
│ 7. LOG      write run report + update ledger        │
└─────────────────────────────────────────────────────┘
```

### Repo layout for the agent

```
seo-agent/
  PLAYBOOK.md        # evolving strategy doc the agent reads first & appends learnings to
  ledger.json        # per-page metrics snapshots per run (position, clicks, CTR, CWV)
  keyword-map.json   # keyword → URL ownership map (prevents cannibalization)
  queue.md           # prioritized content backlog (Section 2 seeded here)
  reports/YYYY-MM-DD.md  # human-readable run reports
  scripts/
    fetch-gsc.mjs        # Search Console API pull (service account)
    fetch-psi.mjs        # PageSpeed Insights API (free key)
    crawl-check.mjs      # internal link/canonical/schema validator
    optimize-images.mjs  # sharp-based WebP pipeline for new assets
```

### Setup steps (another session — in order)

1. `git init` + GitHub repo + Cloudflare Pages Git integration (Phase 1.1) — done, repo pushed.
2. Google Cloud service account with Search Console API read access to the GSC property; PageSpeed Insights API key. Store keys in `.env` (gitignored).
3. Write the 4 scripts (Bun/Node, `sharp` for images, plain `fetch` for APIs — check package.json first per house rules; there isn't one yet, so `bun init`).
4. Seed `PLAYBOOK.md` (from this plan), `keyword-map.json` (Section 2 keywords), `queue.md` (Section 2.1/2.2 priority tables).
5. Create the weekly scheduled task: Claude Code scheduled agent (`/schedule` — cloud routine, weekly Mon 07:00) or a GitHub Action that runs `claude -p` with the run-prompt. Prompt = "Execute one run of seo-agent per PLAYBOOK.md. Open a PR. Never merge without approval."
6. Guardrails baked into the prompt: max 3 changes/run, never touch prices/claims/phone numbers, never publish thin pages, never add schema for content that doesn't exist, all changes via PR.

### Why it "keeps getting better"

- **Feedback loop:** every action is snapshotted in `ledger.json`; 2–4 weeks later the agent sees the ranking/CTR delta of its own change and records the verdict in PLAYBOOK.md. Titles that lifted CTR become the template; pages that didn't move get diagnosed or pruned from the pattern.
- **Compounding memory:** PLAYBOOK.md grows into a site-specific strategy no generic tool has (e.g., "Kanata-style FAQ blocks lift location pages; Gloucester page needs links, not content").
- **Rising-query capture:** GSC surfaces queries you rank #8–20 for; those are the cheapest wins and the agent targets them first every week.

## 5. What Works Best / What Can Be Improved (straight answers)

**Highest-leverage, in order, for a local contractor in 90 days:**
1. Google Business Profile + review velocity (most leads, fastest effect — largely human work).
2. Fix the canonical/internal-link redirect mess + CWV (unblocks everything else).
3. GSC low-CTR title rewrites (free wins on existing rankings, effect in 1–2 weeks).
4. Service × location matrix completion (the compounding organic asset).
5. Cost/price blog content (captures the highest-intent research traffic).

**Honest caveats:**
- 2–3 months is enough to see clear movement (Map Pack, long-tail, CTR) but competitive head terms ("fence company ottawa") take 6–12 months — the agent's job is to keep compounding past the 90-day mark.
- Backlinks remain the hardest part to automate; the agent can find prospects but outreach stays human.
- Watch conversion, not just traffic: the quote form should be reachable in one tap from every page (sticky mobile CTA with tel: link) — worth a dedicated CRO pass in month 2.

## 6. 90-Day Timeline & KPIs

| Weeks | Work | KPI checkpoints |
|---|---|---|
| 1–2 | Phase 1 (all), agent scaffolding, GBP overhaul starts | CWV green on mobile; redirect-free internal links; GSC baseline recorded |
| 3–6 | P1+P2 matrix pages, 2 blog posts, agent's first autonomous runs, review system live | Impressions +30–50%; first Map Pack movement; 8+ new reviews |
| 7–10 | P3+P4 pages, 2 more posts, first learn-loop verdicts in PLAYBOOK, citations done | Long-tail top-10 rankings; leads/week trending up; CTR lifts on rewritten titles |
| 11–13 | CRO pass, prune/fix underperformers, month-3 report | Target: 2–3× organic leads vs. baseline; agent fully self-running weekly |

**Baseline to record in week 1 (agent does this):** GSC clicks/impressions/avg position per page, GBP calls+direction requests, form submissions/week, PSI mobile scores per template.

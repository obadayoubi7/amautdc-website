# SEO Agent Playbook — AMA United Company

Living strategy doc for the automated SEO agent (Section 4 of `../SEO-MASTER-PLAN.md`). Read this first before any run. Append learnings after every run — this file is the agent's memory across weeks.

## Status

- **Deploy pipeline:** BROKEN from 2026-08-02 to 2026-08-25 — Cloudflare Pages Build command (`npm run build`, a leftover Analog-framework default) failed on every push because `package.json` has no `build` script. The live site silently kept serving a ~2026-06-18 snapshot (extensionless URLs 200'd but served homepage content) while every Phase 2 commit sat undeployed in GitHub. Fixed 2026-08-25 by clearing Build command + Build output directory in Cloudflare Pages settings (static site, no build step) and retrying the deployment. **Any GSC/analytics data from before 2026-08-25 reflects the stale pre-Phase-2 site, not the current one — don't trust it for before/after comparisons.** See ledger.json 2026-08-25 entry for full detail. Re-check Cloudflare deploy status (Pages dashboard > amautdc > Deployments, latest commit should show a green check, not "No deployment available") after every future push until this has a few clean deploys in a row.
- **Phase 1 (technical foundation):** complete 2026-08-01.
- **Phase 2.1 (service × location matrix):** complete 2026-08-01 — 15 location pages total.
- **Phase 2.2 (blog content):** complete 2026-08-02 — 6 posts published.
- **Title-length pass:** complete 2026-08-02 — all 27 over-60-char titles fixed via `scripts/fix-long-titles.mjs`; `seo-agent/scripts/crawl-check.mjs` now reports zero issues sitewide.
- **GSC/PSI data ingestion:** PARTIALLY UNBLOCKED 2026-08-25 — Search Console is now connected (verified via the existing HTML file, sc-domain was never set up under the owner's account before) and readable through the browser UI, though the `fetch-gsc.mjs` API script still needs a service account to automate. PSI still fully blocked, needs an API key.
- **Google Business Profile:** audited and partially fixed 2026-08-25 — added a 4th category (Paving contractor, for interlock), rewrote the description, published a fresh post. See ledger.json entry for detail. Still open: service area doesn't cover all suburbs with dedicated location pages (Stittsville, Gloucester, Riverside South, Findlay Creek, Greely missing); "Profile Strength" flags remaining gaps (exterior photo, holiday hours) that need a human with a camera/judgment call, not an agent.
- **Weekly scheduled cloud routine:** NOT YET CREATED. Don't create it until GSC/PSI credentials exist — a routine that can't ingest ranking data can't do the data-driven prioritization this agent is designed around (it would just be guessing, same failure mode as generic "improve SEO" advice the seo skill warns against).

## Guardrails (non-negotiable)

- Never touch prices, warranty claims, or phone numbers without the site owner's explicit sign-off — these are business facts, not copy to optimize.
- Never invent unverifiable specifics (permit fees, bylaw numbers, review counts). Reuse facts already established on the site.
- Never publish a location or blog page that can't be genuinely differentiated from its siblings — thin near-duplicates hurt more than they help.
- Never add schema (FAQPage, Review, etc.) for content that isn't actually present and true on the page.
- Max 3 changes per run unless doing a single well-scoped batch fix (like the title-length pass).
- All content changes get committed with a clear message; until a PR workflow is set up, direct pushes to `main` are the current pattern (matches how this repo has operated since Phase 1) — revisit this once the site has real traffic and a mistake would be costly to leave live even briefly.

## What's worked (verified)

- The `fencing-kanata.html` pattern (Service + BreadcrumbList + FAQPage schema, real neighbourhood names, genuine local FAQ content) is the template — replicate it, don't reinvent it.
- Removing self-serving `aggregateRating` from per-location Service schema (kept only the homepage-level LocalBusiness rating, backed by a real `sameAs` link) — a legitimate fix, not yet measured for ranking impact since it just shipped.
- Sticky mobile call CTA (`#float-cta`) and one-tap nav "Free Quote" button were already present sitewide before this agent existed — don't rebuild them, the Month-2 CRO checklist item is already satisfied.

## What to check every run

1. Run `node seo-agent/scripts/crawl-check.mjs` first — catches canonical drift, `.html` link leaks, broken internal links, invalid JSON-LD, missing GA4, and title-length regressions before anything else.
2. Once GSC access exists: pull impressions/clicks/CTR/position per page, flag high-impression/low-CTR pages for title rewrites (the single highest-leverage, lowest-risk weekly action).
3. Once GSC access exists: look for "rising queries" (positions 8–20) — these are the cheapest wins, prioritize content/internal-linking to push them into the top 10.
4. Check `queue.md` for the next unbuilt content item and consider whether GSC data changes its priority before building it.

## Outcome log (append here after every run, newest first)

- **2026-08-02:** Ran `crawl-check.mjs` for the first time — found 27 pages with >60-char titles. Fixed all 27 in one batch (`scripts/fix-long-titles.mjs`), re-ran, zero issues. No GSC data yet to measure CTR impact — check back in 2–4 weeks once Search Console shows post-change performance for these URLs.

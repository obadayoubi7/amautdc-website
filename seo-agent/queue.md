# Content Queue

Prioritized backlog for the SEO agent. The full Section 2.1 location matrix and Section 2.2 blog batch are done as of 2026-08-02 — this queue is for what comes next, informed by rising GSC queries once that data exists.

## Ready now (no GSC data needed)

- [ ] Additional blog posts on high-intent topics not yet covered: "How to Choose a Fence Height in Ottawa", "Interlock Maintenance Tips for Ottawa Winters", "Chain Link vs Ornamental Iron Fencing", "Deck Railing Options Compared".
- [ ] Interlock/decks pages for remaining suburbs not yet built: interlock-{manotick, riverside-south, findlay-creek, greely}, decks-{manotick, riverside-south, findlay-creek, greely}. Lower priority than the original P1–P4 tiers since these communities are smaller/newer — validate real search demand exists before building (check Google autocomplete / "People also search for" for these exact terms first, since the `seo` skill's anti-pattern list warns against thin pages nobody's searching for).

## Unblocked 2026-08-25 — GSC now connected (see PLAYBOOK.md)

- [ ] Title/meta rewrites for high-impression, low-CTR pages. First look at position-8-to-20 queries once 2-3 weeks of post-fix data exists (current data predates the deploy fix, so it's measuring a broken site).
- [ ] Rising-query capture (positions 8–20 → push to top 10). Same caveat — wait for clean post-fix data.
- [ ] Investigate the referring page `https://domain.com.lc/page-811a9c...html` flagged in URL Inspection for the homepage — unfamiliar low-quality-looking domain, worth a quick backlink-profile check to rule out spam/negative-SEO links.

## Still blocked on PSI data

- [ ] Per-template Core Web Vitals check — needs PageSpeed Insights API key (or ask the site owner to run https://pagespeed.web.dev/ manually on 2-3 representative URLs).

## Rule

One primary keyword/intent per page. Check `keyword-map.json` before adding anything new — if a keyword already maps to an existing page, strengthen that page instead of creating a competing one (cannibalization).

# Content Queue

Prioritized backlog for the SEO agent. The full Section 2.1 location matrix and Section 2.2 blog batch are done as of 2026-08-02 — this queue is for what comes next, informed by rising GSC queries once that data exists.

## Ready now (no GSC data needed)

- [ ] Additional blog posts on high-intent topics not yet covered: "How to Choose a Fence Height in Ottawa", "Interlock Maintenance Tips for Ottawa Winters", "Chain Link vs Ornamental Iron Fencing", "Deck Railing Options Compared".
- [ ] Interlock/decks pages for remaining suburbs not yet built: interlock-{manotick, riverside-south, findlay-creek, greely}, decks-{manotick, riverside-south, findlay-creek, greely}. Lower priority than the original P1–P4 tiers since these communities are smaller/newer — validate real search demand exists before building (check Google autocomplete / "People also search for" for these exact terms first, since the `seo` skill's anti-pattern list warns against thin pages nobody's searching for).

## Blocked on GSC/PSI data

- [ ] Title/meta rewrites for high-impression, low-CTR pages — can't identify these without Search Console data.
- [ ] Rising-query capture (positions 8–20 → push to top 10) — needs GSC query-level data.
- [ ] Per-template Core Web Vitals check — needs PageSpeed Insights API.

## Rule

One primary keyword/intent per page. Check `keyword-map.json` before adding anything new — if a keyword already maps to an existing page, strengthen that page instead of creating a competing one (cannibalization).

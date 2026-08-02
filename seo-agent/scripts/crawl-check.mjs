import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const root = new URL("../..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");
const files = readdirSync(root).filter((f) => f.endsWith(".html") && f !== "google11c7e5ed08484531.html");

const issues = [];
const knownSlugs = new Set(files.map((f) => (f === "index.html" ? "/" : `/${f.replace(/\.html$/, "")}`)));

for (const file of files) {
  const path = join(root, file);
  const content = readFileSync(path, "utf8");

  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)">/);
  if (!canonicalMatch) {
    issues.push(`${file}: missing canonical tag`);
  } else if (canonicalMatch[1].endsWith(".html")) {
    issues.push(`${file}: canonical still points to .html (${canonicalMatch[1]})`);
  }

  const htmlLeaks = [...content.matchAll(/href="([^"]*\.html[^"]*)"/g)].map((m) => m[1]);
  if (htmlLeaks.length) issues.push(`${file}: internal .html link(s): ${htmlLeaks.join(", ")}`);

  const internalLinks = [...content.matchAll(/href="(\/[a-z0-9-]*)"/g)].map((m) => m[1]);
  for (const link of internalLinks) {
    if (!knownSlugs.has(link) && link !== "/") {
      issues.push(`${file}: links to ${link} which has no matching page`);
    }
  }

  const jsonLdBlocks = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  jsonLdBlocks.forEach((m, i) => {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      issues.push(`${file}: invalid JSON-LD block ${i} — ${e.message}`);
    }
  });

  if (!content.includes("G-RB3FQ7F1N6")) {
    issues.push(`${file}: missing GA4 tag`);
  }

  const titleMatch = content.match(/<title>([^<]*)<\/title>/);
  if (titleMatch && titleMatch[1].length > 60) {
    issues.push(`${file}: title too long (${titleMatch[1].length} chars)`);
  }
}

console.log(`Crawled ${files.length} pages.\n`);
if (issues.length === 0) {
  console.log("No issues found.");
} else {
  console.log(`${issues.length} issue(s):\n`);
  issues.forEach((i) => console.log(`  - ${i}`));
}

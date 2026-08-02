import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");
const files = readdirSync(root).filter((f) => f.endsWith(".html") && f !== "google11c7e5ed08484531.html");

const ogTags = `  <meta property="og:image" content="https://amautdc.com/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://amautdc.com/assets/og-image.png">`;

let count = 0;
for (const file of files) {
  const path = join(root, file);
  let content = readFileSync(path, "utf8");
  if (content.includes("og:image")) continue;
  const updated = content.replace(/(<meta property="og:type" content="[^"]*">)/, `$1\n${ogTags}`);
  if (updated !== content) {
    writeFileSync(path, updated, "utf8");
    count++;
  }
}
console.log(`Added og:image/twitter tags to ${count} files`);

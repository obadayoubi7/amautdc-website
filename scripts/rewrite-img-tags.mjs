import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");
const dims = JSON.parse(readFileSync(join(root, "scripts", "image-dimensions.json"), "utf8"));

const files = readdirSync(root).filter((f) => f.endsWith(".html") && f !== "google11c7e5ed08484531.html");

let totalTags = 0;

for (const file of files) {
  const path = join(root, file);
  let content = readFileSync(path, "utf8");

  content = content.replace(/<img\s+([^>]*?)src="\.\/(assets\/[^"]+)\.(jpg|jpeg|png)"([^>]*)>/gi, (full, before, assetPath, ext, after) => {
    const webpKey = `${assetPath}.webp`;
    const dim = dims[webpKey];
    let attrs = `${before}src="./${webpKey}"${after}`.trim();
    if (dim && !/\bwidth=/.test(attrs) && !/\bheight=/.test(attrs)) {
      attrs = `${attrs} width="${dim.width}" height="${dim.height}"`;
    }
    totalTags++;
    return `<img ${attrs}>`;
  });

  writeFileSync(path, content, "utf8");
}

console.log(`Updated ${totalTags} <img> tags across ${files.length} files`);

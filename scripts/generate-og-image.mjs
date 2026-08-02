import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");
const logoPngBuf = await sharp(join(root, "assets", "logo.webp")).png().toBuffer();
const logoB64 = logoPngBuf.toString("base64");

const W = 1200, H = 630;
const logoSize = 260;
const logoX = 80, logoY = (H - logoSize) / 2;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="16" height="${H}" fill="#D41F1F"/>
  <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="data:image/png;base64,${logoB64}"/>
  <text x="400" y="270" font-family="Arial, sans-serif" font-weight="800" font-size="64" fill="#1a1a1a">AMA United</text>
  <text x="400" y="345" font-family="Arial, sans-serif" font-weight="800" font-size="64" fill="#1a1a1a">Company</text>
  <text x="400" y="405" font-family="Arial, sans-serif" font-weight="600" font-size="28" fill="#D41F1F">Fencing &#8226; Decks &#8226; Interlock &#8226; Renovations</text>
  <text x="400" y="448" font-family="Arial, sans-serif" font-weight="500" font-size="24" fill="#4a4a4a">Serving Ottawa, Kanata, Barrhaven, Orl&#233;ans &amp; Nepean</text>
  <text x="400" y="500" font-family="Arial, sans-serif" font-weight="700" font-size="23" fill="#1a1a1a">&#9733;&#9733;&#9733;&#9733;&#9733; 150+ Reviews &#8226; Free Quotes &#8226; 2-Year Warranty</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, "assets", "og-image.png"));
console.log("Generated assets/og-image.png");

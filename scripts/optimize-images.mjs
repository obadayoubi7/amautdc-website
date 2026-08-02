import { readdirSync, statSync, writeFileSync } from "fs";
import { join, extname } from "path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");
const assetsDir = join(root, "assets");
const imgExt = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out = out.concat(walk(p));
    else if (imgExt.has(extname(entry).toLowerCase())) out.push(p);
  }
  return out;
}

const files = walk(assetsDir);
const dimensions = {};

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = statSync(file).size;
  const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const meta = await sharp(file).webp({ quality: 78, effort: 6 }).toFile(webpPath);
  const after = statSync(webpPath).size;
  totalBefore += before;
  totalAfter += after;

  const rel = webpPath.slice(root.length).split("\\").join("/");
  dimensions[rel] = { width: meta.width, height: meta.height };
  console.log(`${rel}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

writeFileSync(join(root, "scripts", "image-dimensions.json"), JSON.stringify(dimensions, null, 2));
console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${files.length} images)`);

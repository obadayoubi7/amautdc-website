import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");
const files = readdirSync(root).filter((f) => f.endsWith(".html") && f !== "google11c7e5ed08484531.html");
const GA_ID = "G-RB3FQ7F1N6";

const snippet = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (a) {
        gtag('event', 'phone_call_click', { phone_number: a.getAttribute('href').replace('tel:', '') });
      }
    });
  </script>
`;

let count = 0;
for (const file of files) {
  const path = join(root, file);
  let content = readFileSync(path, "utf8");
  if (content.includes("googletagmanager.com/gtag/js")) continue;
  const updated = content.replace(/<head>\n/, `<head>\n${snippet}`);
  if (updated !== content) {
    writeFileSync(path, updated, "utf8");
    count++;
  }
}
console.log(`Added GA4 tag to ${count} files`);

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");

const fixes = {
  "blog-commercial-fencing-guide.html": "Commercial Fencing Guide Ottawa | AMA United",
  "blog-composite-vs-pressure-treated-decks.html": "Composite vs Pressure-Treated Decks | AMA United",
  "blog-deck-design-guide.html": "Deck Design Guide Ottawa | AMA United",
  "blog-fence-cost-ottawa.html": "Fence Cost in Ottawa (2026 Prices) | AMA United",
  "blog-interlock-renovations-guide.html": "Interlock Driveways & Patios Guide | AMA United",
  "blog-pvc-vs-wood-fence-ottawa.html": "PVC vs Wood Fence Ottawa | AMA United",
  "blog-residential-fencing-guide.html": "Residential Fencing Guide Ottawa | AMA United",
  "commercial-fencing.html": "Commercial Fence Contractor Ottawa | AMA United",
  "contact.html": "Contact AMA United | Ottawa Fencing & Decks",
  "decks-barrhaven.html": "Deck Builder Barrhaven Ottawa | AMA United",
  "decks-gloucester.html": "Deck Builder Gloucester Ottawa | AMA United",
  "decks-kanata.html": "Deck Builder Kanata Ottawa | AMA United",
  "decks-nepean.html": "Deck Builder Nepean Ottawa | AMA United",
  "decks-orleans.html": "Deck Builder Orléans Ottawa | AMA United",
  "decks-stittsville.html": "Deck Builder Stittsville Ottawa | AMA United",
  "decks.html": "Deck Contractor Ottawa | AMA United",
  "faq.html": "Fencing & Deck FAQ Ottawa | AMA United",
  "fencing-gloucester.html": "Fence Installation Gloucester Ottawa | AMA United",
  "fencing-riverside-south.html": "Fence Installation Riverside South | AMA United",
  "fencing-stittsville.html": "Fence Installation Stittsville Ottawa | AMA United",
  "interlock-barrhaven.html": "Interlock Driveways Barrhaven Ottawa | AMA United",
  "interlock-gloucester.html": "Interlock Driveways Gloucester Ottawa | AMA United",
  "interlock-kanata.html": "Interlock Driveways Kanata Ottawa | AMA United",
  "interlock-nepean.html": "Interlock Driveways Nepean Ottawa | AMA United",
  "interlock-orleans.html": "Interlock Driveways Orléans Ottawa | AMA United",
  "interlock-stittsville.html": "Interlock Driveways Stittsville Ottawa | AMA United",
  "residential-fencing.html": "Fence Contractor Ottawa | AMA United",
};

let changed = 0;
for (const [file, newTitle] of Object.entries(fixes)) {
  if (newTitle.length > 60) {
    console.log(`SKIP ${file}: new title is ${newTitle.length} chars, still too long`);
    continue;
  }
  const path = join(root, file);
  const content = readFileSync(path, "utf8");
  const updated = content.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);
  if (updated === content) {
    console.log(`NO MATCH ${file}: <title> tag not found or already changed`);
    continue;
  }
  writeFileSync(path, updated, "utf8");
  console.log(`${file}: -> "${newTitle}" (${newTitle.length} chars)`);
  changed++;
}
console.log(`\nUpdated ${changed}/${Object.keys(fixes).length} files.`);

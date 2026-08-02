import { writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");

const cities = [
  {
    slug: "interlock-kanata",
    city: "Kanata",
    region: "west end",
    neighbourhoods: "Bridlewood, Beaverbrook, Katimavik, Morgan's Grant, Kanata Lakes, Glen Cairn, Marchwood",
    landmark: "the Kanata Tech Park",
    intro: "AMA United installs interlock driveways, patios, and walkways throughout Kanata — from established streets in Beaverbrook and Katimavik to the newer subdivisions in Bridlewood and Morgan's Grant. We know west-end soil conditions and the base preparation depth needed to keep your interlock flat and stable through every freeze-thaw season.",
    intro2: "With 150+ five-star Google reviews, we're the interlock contractor Kanata homeowners recommend to their neighbours — whether you're replacing a cracked driveway near the Tech Park or adding a new patio in Kanata Lakes.",
    testimonials: [
      { quote: "AMA United replaced our cracked concrete driveway in Bridlewood with a herringbone interlock pattern. Two winters later it still looks brand new — no shifting, no cracking. Excellent crew.", author: "Jennifer L.", loc: "Kanata, Ottawa" },
      { quote: "They built a beautiful interlock patio and retaining wall for our sloped backyard in Morgan's Grant. Handled the grading and drainage perfectly. Highly recommend for anyone in the west end.", author: "Tom B.", loc: "Kanata, Ottawa" },
      { quote: "Got three quotes for our front walkway in Katimavik. AMA United was the most detailed and finished a day ahead of schedule. The stonework is gorgeous.", author: "Aisha K.", loc: "Kanata, Ottawa" },
    ],
    faqExtra: "Yes — we install interlock throughout Kanata including Bridlewood, Beaverbrook, Katimavik, Morgan's Grant, Kanata Lakes, Glen Cairn, and Marchwood. Travel within Kanata is always included in your quote.",
  },
  {
    slug: "interlock-barrhaven",
    city: "Barrhaven",
    region: "south end",
    neighbourhoods: "Stonebridge, Half Moon Bay, Chapman Mills, Longfields, Cedarhill, Strandherd",
    landmark: "Chapman Mills and Longfields",
    intro: "AMA United has installed interlock driveways, patios, and walkways across Barrhaven for over a decade — from Stonebridge and Half Moon Bay to Chapman Mills and Longfields. We understand south Ottawa's clay-heavy soil and build a properly compacted crushed-stone base under every installation so your interlock stays flat through Ottawa's freeze-thaw cycles.",
    intro2: "With 150+ five-star Google reviews, we're the interlock contractor Barrhaven homeowners trust for driveways, patios, and retaining walls.",
    testimonials: [
      { quote: "We replaced our entire driveway and front walkway with interlock in Stonebridge. AMA United handled the old concrete removal, base prep, and install in under a week. Looks incredible.", author: "Rebecca H.", loc: "Barrhaven, Ottawa" },
      { quote: "Our backyard in Half Moon Bay had a steep grade — they built a tiered patio with a retaining wall that completely transformed the space. Professional from quote to final walkthrough.", author: "Dave & Linda P.", loc: "Barrhaven, Ottawa" },
      { quote: "Best pricing of the three interlock companies we called in Longfields, and the quality matched the higher quotes. No hidden costs, exactly what was promised.", author: "Omar F.", loc: "Barrhaven, Ottawa" },
    ],
    faqExtra: "Yes — we install interlock throughout Barrhaven including Stonebridge, Half Moon Bay, Chapman Mills, Longfields, Cedarhill, and Strandherd. Travel within Barrhaven is always included in your quote.",
  },
  {
    slug: "interlock-orleans",
    city: "Orléans",
    region: "east end",
    neighbourhoods: "Avalon, Cardinal Creek, Chaperal, Queenswood Heights, Convent Glen",
    landmark: "Avalon and Queenswood Heights",
    intro: "AMA United installs interlock driveways, patios, and walkways throughout Orléans — from the newer Avalon and Cardinal Creek developments to the established streets of Queenswood Heights and Convent Glen. We build every project on a properly engineered crushed-stone base so it holds up through the east end's freeze-thaw cycles without heaving or settling.",
    intro2: "With 150+ five-star Google reviews, we're the interlock contractor Orléans homeowners recommend — whether it's a new driveway in Avalon or a backyard patio in Convent Glen.",
    testimonials: [
      { quote: "AMA United installed a full interlock driveway and front walkway at our place in Avalon. The pattern they suggested looks fantastic and the base work has kept it perfectly level.", author: "Michel D.", loc: "Orléans, Ottawa" },
      { quote: "We had an old crumbling patio in Queenswood Heights replaced with interlock. The crew was tidy, on schedule, and the finished product exceeded what we expected.", author: "Sophie R.", loc: "Orléans, Ottawa" },
      { quote: "Called around Cardinal Creek for quotes on a retaining wall and interlock steps. AMA United was the clearest about timeline and cost, and delivered exactly as promised.", author: "Kevin N.", loc: "Orléans, Ottawa" },
    ],
    faqExtra: "Yes — we install interlock throughout Orléans including Avalon, Cardinal Creek, Chaperal, Queenswood Heights, and Convent Glen. Travel within Orléans is always included in your quote.",
  },
  {
    slug: "interlock-nepean",
    city: "Nepean",
    region: "west end",
    neighbourhoods: "Bells Corners, Centrepointe, City View, Crystal Beach, Lynwood Village, Manordale, Tanglewood",
    landmark: "Centrepointe and Bells Corners",
    intro: "AMA United installs interlock driveways, patios, and walkways throughout Nepean — from Bells Corners and Crystal Beach to Centrepointe and City View. Many Nepean properties were built decades ago on original concrete or asphalt that's now cracking; we remove the old surface and rebuild on a proper compacted base so your new interlock stays flat for decades.",
    intro2: "With 150+ five-star Google reviews, we're the interlock contractor Nepean homeowners trust for driveways, patios, and walkway replacements.",
    testimonials: [
      { quote: "Our 1980s concrete driveway in Centrepointe was falling apart. AMA United tore it out and installed interlock in its place — night and day difference, and it was done in four days.", author: "Grace T.", loc: "Nepean, Ottawa" },
      { quote: "They built a new front walkway and steps for our place in Bells Corners. Great communication throughout and the finished stonework is beautiful.", author: "Patrick M.", loc: "Nepean, Ottawa" },
      { quote: "Replaced our cracked patio in Crystal Beach with interlock pavers. Fair price, showed up when they said they would, and cleaned up perfectly every day.", author: "Linda C.", loc: "Nepean, Ottawa" },
    ],
    faqExtra: "Yes — we install interlock throughout Nepean including Bells Corners, Centrepointe, City View, Crystal Beach, Lynwood Village, Manordale, and Tanglewood. Travel within Nepean is always included in your quote.",
  },
];

function page(c) {
  const title = `Interlock Driveways & Patios ${c.city} Ottawa | AMA United Company`;
  const desc = `Interlock driveway, patio & walkway installation in ${c.city}, Ottawa. Durable paving stones built for our freeze-thaw climate. 150+ five-star reviews. Free quotes, 2-year warranty.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RB3FQ7F1N6"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RB3FQ7F1N6');
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (a) {
        gtag('event', 'phone_call_click', { phone_number: a.getAttribute('href').replace('tel:', '') });
      }
    });
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://amautdc.com/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://amautdc.com/assets/og-image.png">
  <meta property="og:url" content="https://amautdc.com/${c.slug}">
  <link rel="canonical" href="https://amautdc.com/${c.slug}">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23D41F1F'/><text x='50%' y='72%' text-anchor='middle' font-size='22' font-weight='bold' font-family='Arial' fill='white'>A</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Interlock Installation ${c.city} Ottawa",
    "provider": {
      "@type": "GeneralContractor",
      "name": "AMA United Company",
      "telephone": "613-869-7775"
    },
    "areaServed": {"@type": "City", "name": "${c.city}, Ottawa, ON"},
    "description": "Interlock driveway, patio, and walkway installation in ${c.city}, Ottawa with 2-year workmanship warranty."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://amautdc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Interlock & Renovations", "item": "https://amautdc.com/interlock-renovations"},
      {"@type": "ListItem", "position": 3, "name": "Interlock ${c.city}"}
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need a permit for an interlock driveway in ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "Interlock driveways and patios generally do not require a City of Ottawa building permit since they are not structures, though driveway widening or curb cuts may need approval. AMA United reviews the specifics of your ${c.city} property before every project and handles any required approvals."}
      },
      {
        "@type": "Question",
        "name": "Will interlock crack or heave in ${c.city} winters?",
        "acceptedAnswer": {"@type": "Answer", "text": "Properly installed interlock resists Ottawa's freeze-thaw cycles far better than poured concrete or asphalt. The key is base preparation — we compact crushed stone to the correct depth beneath every installation so individual stones can flex slightly with ground movement instead of cracking."}
      },
      {
        "@type": "Question",
        "name": "How long does interlock installation take in ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "A standard driveway takes 3–5 days including removal of old material, base preparation, and paver installation. Patios and walkways are typically 1–3 days. We confirm the exact timeline in your written quote before work begins."}
      },
      {
        "@type": "Question",
        "name": "Do you serve all of ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "${c.faqExtra}"}
      }
    ]
  }
  </script>
</head>
<body>
<div id="scroll-progress"></div>
<nav id="nav">
  <a href="/" class="nav-logo">
    <img src="./assets/logo.webp" alt="AMA United Company Logo" width="1179" height="1217">
    <div class="nav-logo-text"><span>AMA United</span><span>Company</span></div>
  </a>
  <div class="nav-links">
    <a href="/">Home</a>
    <div class="nav-dropdown">
      <a href="#" class="nav-drop-toggle">Services ▾</a>
      <div class="nav-drop-menu">
        <a href="/residential-fencing">Residential Fencing</a>
        <a href="/commercial-fencing">Commercial Fencing</a>
        <a href="/decks">Decks</a>
        <a href="/interlock-renovations">Interlock &amp; Renovations</a>
      </div>
    </div>
    <a href="/gallery">Gallery</a>
    <a href="/blog">Blog</a>
    <a href="/faq">FAQ</a>
    <a href="/#contact">Contact</a>
  </div>
  <a href="/#contact" class="nav-cta">Free Quote</a>
  <button class="hamburger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="/">Home</a>
  <a href="/residential-fencing">Residential Fencing</a>
  <a href="/commercial-fencing">Commercial Fencing</a>
  <a href="/decks">Decks</a>
  <a href="/interlock-renovations">Interlock &amp; Renovations</a>
  <a href="/gallery">Gallery</a>
  <a href="/blog">Blog</a>
  <a href="/faq">FAQ</a>
  <a href="/#contact">Contact</a>
  <a href="/#contact" style="color:var(--red)">Get a Free Quote →</a>
</div>

<header class="page-hero">
  <div class="page-hero-content">
    <p class="breadcrumb"><a href="/">Home</a> / <a href="/interlock-renovations">Interlock &amp; Renovations</a> / ${c.city}</p>
    <h1>Interlock Driveways &amp; Patios<br><em style="color:var(--red)">${c.city}, Ottawa</em></h1>
    <p class="section-sub" style="margin-top:16px;">${c.city}'s trusted interlock contractor — durable paving stones for driveways, patios, and walkways built for Ottawa's climate.</p>
  </div>
</header>

<main>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Interlock in ${c.city}</p>
      <h2 class="section-title">${c.city}'s Trusted<br><em>Interlock Contractor</em></h2>
    </div>
    <p class="service-intro" data-reveal>${c.intro}</p>
    <p class="service-intro" style="margin-top:20px;" data-reveal>${c.intro2}</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">What We Install</p>
      <h2 class="section-title">Interlock Options for<br><em>${c.city} Properties</em></h2>
    </div>
    <div class="options-grid">
      <div class="option-card" data-reveal>
        <h3>Interlock Driveways</h3>
        <p>Replace cracked asphalt or dull concrete with a stunning interlock driveway. Paving stones handle Ottawa's freeze-thaw far better than monolithic surfaces — individual stones flex with ground movement rather than cracking.</p>
        <div class="price">Most popular application &nbsp;|&nbsp; Major curb appeal upgrade</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="1">
        <h3>Patios &amp; Outdoor Living</h3>
        <p>An interlock patio creates a durable, beautiful foundation for your outdoor living space in ${c.city}. We design custom patterns and work around existing landscaping features — pairs beautifully with our deck builds.</p>
        <div class="price">Custom patterns &nbsp;|&nbsp; Pairs with deck builds</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="2">
        <h3>Walkways &amp; Paths</h3>
        <p>A well-designed front walkway is the first thing guests notice. We install front entry paths and side yard walkways throughout ${c.city} — from simple straight runs to sweeping curved designs.</p>
        <div class="price">Any shape or pattern &nbsp;|&nbsp; Decorative options available</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="3">
        <h3>Steps &amp; Retaining Walls</h3>
        <p>Interlock steps and retaining walls solve grade changes beautifully while adding structure to your yard. We build block retaining walls to manage slopes and prevent erosion on ${c.region} properties.</p>
        <div class="price">Engineered for Ottawa grades &nbsp;|&nbsp; Block wall specialists</div>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header center" data-reveal>
      <p class="section-label">Why Interlock</p>
      <h2 class="section-title">Better Than Concrete<br><em>or Asphalt</em></h2>
    </div>
    <div class="why-grid">
      <div class="why-card" data-reveal>
        <div class="why-card-icon">❄️</div>
        <h3>Ottawa Winter-Proof</h3>
        <p>Individual paving stones flex independently through freeze-thaw cycles. Unlike concrete or asphalt, interlock doesn't develop stress cracks from heaving. If a stone ever shifts, it can be reset individually.</p>
      </div>
      <div class="why-card" data-reveal data-reveal-delay="1">
        <div class="why-card-icon">🎨</div>
        <h3>Stunning Curb Appeal</h3>
        <p>Dozens of stone colours, textures, and laying patterns give ${c.city} homeowners complete control over the look — from classic herringbone to contemporary linear designs.</p>
      </div>
      <div class="why-card" data-reveal data-reveal-delay="2">
        <div class="why-card-icon">🔧</div>
        <h3>Easy to Repair</h3>
        <p>If a utility ever needs to dig up your driveway, the stones are simply lifted, the work is done, and the stones are relaid exactly as before — no patching, no colour mismatch.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header center" data-reveal>
      <p class="section-label">What ${c.city} Homeowners Say</p>
      <h2 class="section-title">150+ Five-Star <em>Reviews</em></h2>
    </div>
    <div class="testimonials-grid">
      ${c.testimonials.map((t, i) => `<div class="tcard" data-reveal${i ? ` data-reveal-delay="${i}"` : ""}>
        <div class="tcard-stars">★★★★★</div>
        <p class="tcard-quote">${t.quote}</p>
        <div class="tcard-author">${t.author}</div>
        <div class="tcard-location">${t.loc}</div>
      </div>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">${c.city} Interlock FAQ</p>
      <h2 class="section-title">Common <em>Questions</em></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do I need a permit for an interlock driveway in ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Interlock driveways and patios generally do not require a City of Ottawa building permit since they are not structures, though driveway widening or curb cuts may need approval. AMA United reviews the specifics of your ${c.city} property before every project and handles any required approvals.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Will interlock crack or heave in ${c.city} winters?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Properly installed interlock resists Ottawa's freeze-thaw cycles far better than poured concrete or asphalt. The key is base preparation — we compact crushed stone to the correct depth beneath every installation so individual stones can flex slightly with ground movement instead of cracking.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">How long does interlock installation take in ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>A standard driveway takes 3–5 days including removal of old material, base preparation, and paver installation. Patios and walkways are typically 1–3 days. We confirm the exact timeline in your written quote before work begins.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do you serve all of ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>${c.faqExtra}</p></div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="cta-banner-content" data-reveal>
    <p class="section-label" style="justify-content:center;">${c.city} Homeowners</p>
    <h2>Ready for a New Driveway or Patio?<br><em style="color:var(--red)">Get Your Free Quote</em></h2>
    <p>We'll visit your ${c.city} property, measure the job, and give you a transparent written quote — no pressure, no surprises.</p>
    <a href="/#contact" class="btn-primary">Request a Free Quote →</a>
  </div>
</section>

</main>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="nav-logo" style="margin-bottom:16px;display:inline-flex;">
          <img src="./assets/logo.webp" alt="AMA United Company Logo" width="1179" height="1217">
          <div class="nav-logo-text"><span>AMA United</span><span>Company</span></div>
        </a>
        <p class="footer-tagline">Ottawa's trusted interlock contractor — serving ${c.city} and all Ottawa communities.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=100090653326145" aria-label="Facebook" target="_blank" rel="noopener">f</a>
          <a href="https://www.instagram.com/amautdc/?hl=en" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
        </div>
      </div>
      <div class="footer-nav">
        <h4>Service Areas</h4>
        <ul>
          <li><a href="/interlock-renovations">Interlock &amp; Renovations</a></li>
          <li><a href="/fencing-${c.slug.replace('interlock-', '')}">Fencing in ${c.city}</a></li>
          <li><a href="/interlock-kanata">Interlock in Kanata</a></li>
          <li><a href="/interlock-barrhaven">Interlock in Barrhaven</a></li>
          <li><a href="/interlock-orleans">Interlock in Orléans</a></li>
          <li><a href="/interlock-nepean">Interlock in Nepean</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <div class="footer-contact-item"><span>📞</span><a href="tel:6138697775">613-869-7775</a></div>
        <div class="footer-contact-item"><span>📞</span><a href="tel:6138900001">613-890-0001</a></div>
        <div class="footer-contact-item"><span>✉️</span><a href="mailto:amautdc@hotmail.com">amautdc@hotmail.com</a></div>
        <div class="footer-contact-item"><span>📍</span><span>668 Capricorn Circle, Ottawa, ON</span></div>
        <div class="footer-contact-item"><span>🕐</span><span>Mon–Sat: 8am – 6pm</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 AMA United Company. All rights reserved. Ottawa, ON.</div>
    </div>
  </div>
</footer>

<div id="float-cta">
  <a href="tel:6138697775" class="float-call">📞 <span>613-869-7775</span></a>
  <button id="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">↑</button>
</div>

<script>
window.addEventListener('scroll', function() {
  const nav = document.getElementById('nav');
  if (window.scrollY > 60) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  document.getElementById('scroll-progress').style.width = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) + '%';
  const f = document.getElementById('float-cta');
  if (f) { if (window.scrollY > 400) f.classList.add('show'); else f.classList.remove('show'); }
});
const hamburger = document.querySelector('.hamburger');
if (hamburger) hamburger.addEventListener('click', function() {
  const menu = document.getElementById('mobileMenu'), isOpen = menu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen); hamburger.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.mobile-menu a').forEach(function(l) {
  l.addEventListener('click', function() { document.getElementById('mobileMenu').classList.remove('open'); document.querySelector('.hamburger').classList.remove('open'); });
});
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.toggle('open');
  btn.querySelector('.faq-icon').textContent = isOpen ? '−' : '+';
}
(function() {
  var observer = new IntersectionObserver(function(entries) { entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }); }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(function(el) { observer.observe(el); });
})();
</script>
</body>
</html>
`;
}

for (const c of cities) {
  writeFileSync(join(root, `${c.slug}.html`), page(c), "utf8");
  console.log(`Wrote ${c.slug}.html`);
}

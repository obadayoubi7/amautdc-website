import { writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");

const cities = [
  {
    slug: "decks-kanata",
    city: "Kanata",
    intro: "AMA United builds custom decks throughout Kanata — from established Beaverbrook and Katimavik properties to the newer homes in Bridlewood, Morgan's Grant, and Kanata Lakes. We understand west-end soil conditions and frost depth requirements, engineering every deck footing to stay solid through Ottawa's freeze-thaw cycles.",
    intro2: "With 150+ five-star Google reviews, we're the deck builder Kanata homeowners trust and recommend to their neighbours.",
    testimonials: [
      { quote: "AMA United built a two-level composite deck for our walk-out basement in Bridlewood. The design maximized our sloped yard perfectly and the crew was professional throughout.", author: "Andrea M.", loc: "Kanata, Ottawa" },
      { quote: "Our old pressure-treated deck in Katimavik was falling apart. They tore it out and built a new composite deck in five days. Couldn't be happier with the result.", author: "Steve R.", loc: "Kanata, Ottawa" },
      { quote: "Got quotes from three deck builders serving Kanata Lakes. AMA United was the most transparent about cost and timeline, and the finished deck exceeded expectations.", author: "Michelle T.", loc: "Kanata, Ottawa" },
    ],
    faqExtra: "Yes — we build decks throughout Kanata including Bridlewood, Beaverbrook, Katimavik, Morgan's Grant, Kanata Lakes, Glen Cairn, and Marchwood. Travel within Kanata is always included in your quote.",
  },
  {
    slug: "decks-orleans",
    city: "Orléans",
    intro: "AMA United builds custom decks throughout Orléans — from the newer Avalon and Cardinal Creek developments to the established streets of Queenswood Heights and Convent Glen. We engineer every deck footing for the east end's soil and frost depth, so your deck stays solid through Ottawa winters without shifting.",
    intro2: "With 150+ five-star Google reviews, we're the deck builder Orléans homeowners recommend to their neighbours.",
    testimonials: [
      { quote: "AMA United built a stunning composite deck with built-in lighting for our home in Avalon. The crew was on time every day and the finished product is beautiful.", author: "Marc T.", loc: "Orléans, Ottawa" },
      { quote: "We had a multi-level deck built for our walk-out basement in Convent Glen. Great communication, fair pricing, and the engineering was clearly thought through.", author: "Julie B.", loc: "Orléans, Ottawa" },
      { quote: "Replaced our old wood deck in Queenswood Heights with composite. No more splinters, no more staining every year. Excellent work from start to finish.", author: "Robert L.", loc: "Orléans, Ottawa" },
    ],
    faqExtra: "Yes — we build decks throughout Orléans including Avalon, Cardinal Creek, Chaperal, Queenswood Heights, and Convent Glen. Travel within Orléans is always included in your quote.",
  },
  {
    slug: "decks-nepean",
    city: "Nepean",
    intro: "AMA United builds custom decks throughout Nepean — from Bells Corners and Crystal Beach to Centrepointe and City View. Many Nepean homes have aging wood decks from decades past; we replace them with modern composite or PVC builds engineered to handle our climate for decades to come.",
    intro2: "With 150+ five-star Google reviews, we're the deck builder Nepean homeowners trust for new builds and replacements.",
    testimonials: [
      { quote: "Our 20-year-old wood deck in Centrepointe was rotting through. AMA United replaced it with composite decking and new railings — looks brand new and needs zero maintenance.", author: "Diane K.", loc: "Nepean, Ottawa" },
      { quote: "They built a beautiful multi-level deck for our sloped backyard in Bells Corners. The stairs and railings are exactly what we pictured. Highly recommend.", author: "James F.", loc: "Nepean, Ottawa" },
      { quote: "Fair pricing, honest communication, and the crew showed up exactly when they said they would. Our new deck in Crystal Beach has held up perfectly through two winters.", author: "Carol S.", loc: "Nepean, Ottawa" },
    ],
    faqExtra: "Yes — we build decks throughout Nepean including Bells Corners, Centrepointe, City View, Crystal Beach, Lynwood Village, Manordale, and Tanglewood. Travel within Nepean is always included in your quote.",
  },
  {
    slug: "decks-stittsville",
    city: "Stittsville",
    intro: "AMA United builds custom decks throughout Stittsville — from Jackson Trails and Fairwinds to Amberwood Village and Crossing Bridge Estates. As one of Ottawa's fastest-growing communities, many Stittsville homes have larger lots suited to multi-level decks and outdoor living spaces, and we engineer every footing for the area's soil and frost depth.",
    intro2: "With 150+ five-star Google reviews, we're the deck builder Stittsville homeowners recommend to their neighbours.",
    testimonials: [
      { quote: "AMA United built a large composite deck with a pergola for our backyard in Jackson Trails. The design work upfront was excellent and the build matched it exactly.", author: "Nicole W.", loc: "Stittsville, Ottawa" },
      { quote: "We had a multi-level deck built in Fairwinds to work with our sloped lot. Professional crew, clean job site every day, and the finished deck is stunning.", author: "Brian H.", loc: "Stittsville, Ottawa" },
      { quote: "Compared quotes from a few Stittsville deck builders — AMA United was the most detailed and the composite deck they built has held up perfectly since.", author: "Emily D.", loc: "Stittsville, Ottawa" },
    ],
    faqExtra: "Yes — we build decks throughout Stittsville including Jackson Trails, Fairwinds, Crossing Bridge Estates, Amberwood Village, Bryanston Gate, and Wyldewood. Travel within Stittsville is always included in your quote.",
  },
];

function page(c) {
  const title = `Deck Builder ${c.city} Ottawa | Custom Decks | AMA United Company`;
  const desc = `Top-rated deck builder in ${c.city}, Ottawa. Composite, wood & PVC decks. Multi-level designs, pergolas, railings. 150+ five-star reviews. Free quotes, 2-year warranty.`;

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
  <meta property="og:title" content="Deck Builder ${c.city} Ottawa | AMA United Company">
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
    "name": "Deck Builder ${c.city} Ottawa",
    "provider": {
      "@type": "GeneralContractor",
      "name": "AMA United Company",
      "telephone": "613-869-7775"
    },
    "areaServed": {"@type": "City", "name": "${c.city}, Ottawa, ON"},
    "description": "Custom deck construction in ${c.city}, Ottawa. Composite, PVC, and wood decks with 2-year workmanship warranty."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://amautdc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Decks", "item": "https://amautdc.com/decks"},
      {"@type": "ListItem", "position": 3, "name": "Deck Builder ${c.city}"}
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
        "name": "Do I need a permit to build a deck in ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes — in Ottawa, decks over 24 inches above grade or attached to the house require a building permit. AMA United handles the full permit application process for all ${c.city} clients, preparing drawings and managing inspections."}
      },
      {
        "@type": "Question",
        "name": "What deck material is best for ${c.city} winters?",
        "acceptedAnswer": {"@type": "Answer", "text": "Composite decking is the best long-term choice for Ottawa's climate. It won't absorb moisture, won't crack in freeze-thaw cycles, and doesn't require annual sealing or staining. PVC is also excellent. Pressure-treated wood is a cost-effective option when properly maintained."}
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a deck in ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "A standard single-level deck takes 3–5 days from footing pour to final board. Multi-level or larger decks take 5–10 days. Permit approval typically takes 2–4 weeks and we schedule your build to start as soon as the permit is in hand."}
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
    <p class="breadcrumb"><a href="/">Home</a> / <a href="/decks">Decks</a> / ${c.city}</p>
    <h1>Deck Builder<br><em style="color:var(--red)">${c.city}, Ottawa</em></h1>
    <p class="section-sub" style="margin-top:16px;">${c.city}'s highest-rated deck contractor — custom composite, wood, and multi-level decks built for Ottawa's climate.</p>
  </div>
</header>

<main>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Decks in ${c.city}</p>
      <h2 class="section-title">${c.city}'s Trusted<br><em>Deck Builder</em></h2>
    </div>
    <p class="service-intro" data-reveal>${c.intro}</p>
    <p class="service-intro" style="margin-top:20px;" data-reveal>${c.intro2}</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Deck Options</p>
      <h2 class="section-title">Build It Your<br><em>Way in ${c.city}</em></h2>
    </div>
    <div class="options-grid">
      <div class="option-card" data-reveal>
        <h3>Composite Decking</h3>
        <p>The top choice for ${c.city} homeowners. Composite boards are colour-stable, slip-resistant, and splinter-free. They won't fade, crack, or absorb moisture through Ottawa's harsh winters. Brands like Trex and TimberTech available.</p>
        <div class="price">Low maintenance &nbsp;|&nbsp; 25–30 year lifespan</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="1">
        <h3>Pressure-Treated Wood</h3>
        <p>The most affordable deck option. Properly installed PT lumber delivers a strong, traditional deck at the best price point. Ideal for budget-conscious ${c.city} homeowners who don't want to sacrifice structural quality.</p>
        <div class="price">Most affordable &nbsp;|&nbsp; 15–20 year lifespan</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="2">
        <h3>Multi-Level Decks</h3>
        <p>Many ${c.city} homes have walk-out basements and sloped yards — perfect for multi-level decks. We design connected platforms with integrated stairs, landings, and railings to maximize your outdoor living space.</p>
        <div class="price">Custom design &nbsp;|&nbsp; Engineered for your yard</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="3">
        <h3>PVC Decking</h3>
        <p>100% synthetic, completely waterproof decking with a lifetime manufacturer's warranty. Ideal for ${c.city} homes with pools or covered decks. Stays cool underfoot, resists staining, and cleans up with soap and water.</p>
        <div class="price">Lifetime warranty &nbsp;|&nbsp; Completely waterproof</div>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Our Work</p>
      <h2 class="section-title">Recent ${c.city} <em>Deck Projects</em></h2>
    </div>
    <div class="gallery-preview-grid">
      <div class="gallery-item"><img src="./assets/decks/deck-2-composite-lights.webp" alt="Composite deck with step lights built in ${c.city} Ottawa" loading="lazy" width="1200" height="1600"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-3-composite-multilevel.webp" alt="Multi-level composite deck ${c.city} Ottawa" loading="lazy" width="738" height="1600"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-4-composite-railings.webp" alt="Composite deck with black railings ${c.city} Ottawa" loading="lazy" width="1179" height="1484"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-6-composite.webp" alt="Custom composite deck ${c.city} Ottawa" loading="lazy" width="1600" height="1200"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-7-composite.webp" alt="Deck project ${c.city} Ottawa" loading="lazy" width="1600" height="1200"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-8-composite.webp" alt="Composite deck with railings ${c.city} Ottawa" loading="lazy" width="1200" height="1600"><div class="gallery-overlay"><span>⊕</span></div></div>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="/gallery" class="btn-outline">View Full Gallery</a></div>
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
      <p class="section-label">${c.city} Deck FAQ</p>
      <h2 class="section-title">Common <em>Questions</em></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do I need a permit to build a deck in ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Yes — in Ottawa, decks over 24 inches above grade or attached to the house require a building permit. AMA United handles the full permit application process for all ${c.city} clients, preparing drawings and managing inspections.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">What deck material is best for ${c.city} winters?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Composite decking is the best long-term choice for Ottawa's climate. It won't absorb moisture, won't crack in freeze-thaw cycles, and doesn't require annual sealing or staining. PVC is also excellent. Pressure-treated wood is a cost-effective option when properly maintained.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">How long does it take to build a deck in ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>A standard single-level deck takes 3–5 days from footing pour to final board. Multi-level or larger decks take 5–10 days. Permit approval typically takes 2–4 weeks and we schedule your build to start as soon as the permit is in hand.</p></div>
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
    <h2>Ready to Build Your Deck?<br><em style="color:var(--red)">Get Your Free Quote</em></h2>
    <p>We'll visit your ${c.city} property, measure your yard, and give you a transparent written quote — no pressure, no surprises.</p>
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
        <p class="footer-tagline">Ottawa's trusted deck builder — serving ${c.city} and all Ottawa communities.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=100090653326145" aria-label="Facebook" target="_blank" rel="noopener">f</a>
          <a href="https://www.instagram.com/amautdc/?hl=en" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
        </div>
      </div>
      <div class="footer-nav">
        <h4>Service Areas</h4>
        <ul>
          <li><a href="/decks">Custom Decks</a></li>
          <li><a href="/fencing-${c.slug.replace('decks-', '')}">Fencing in ${c.city}</a></li>
          <li><a href="/decks-barrhaven">Decks in Barrhaven</a></li>
          <li><a href="/decks-kanata">Decks in Kanata</a></li>
          <li><a href="/decks-orleans">Decks in Orléans</a></li>
          <li><a href="/decks-nepean">Decks in Nepean</a></li>
          <li><a href="/decks-stittsville">Decks in Stittsville</a></li>
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

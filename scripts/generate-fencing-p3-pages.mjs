import { writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");

const cities = [
  {
    slug: "fencing-manotick",
    city: "Manotick",
    intro: "AMA United installs fencing throughout Manotick — a historic village community along the Rideau River known for its larger lots, century homes, and newer estate properties. Many Manotick properties sit on well and septic systems with longer property lines than typical Ottawa subdivisions, so we plan post spacing and material quantities accordingly.",
    intro2: "With 150+ five-star Google reviews, we're the fence contractor Manotick homeowners recommend for both classic village properties and newer estate builds along the river.",
    testimonials: [
      { quote: "We have a large rural property in Manotick and needed a long run of PVC privacy fencing along the road. AMA United quoted it accurately and the install was clean and on schedule.", author: "Bill H.", loc: "Manotick, Ottawa" },
      { quote: "Replaced the old wood fence around our century home with a hybrid fence that matches the village character. Great communication throughout the project.", author: "Margaret S.", loc: "Manotick, Ottawa" },
      { quote: "Fair pricing for a bigger-than-average property. They handled the extra post depth needed for our clay soil without any issues.", author: "Peter G.", loc: "Manotick, Ottawa" },
    ],
    faqLabel: "Do you serve all of Manotick and the surrounding area?",
    faqExtra: "Yes — we serve Manotick village and the surrounding rural properties, including estate lots along the Rideau River. Larger properties and longer fence runs are common in this area, and travel is always included in your quote.",
    areaNote: "village and surrounding rural properties",
  },
  {
    slug: "fencing-riverside-south",
    city: "Riverside South",
    intro: "AMA United installs fencing throughout Riverside South, one of Ottawa's fastest-growing new communities near the airport and Rideau River. Most homes here are recent builds with unfenced backyards straight from the builder — we're one of the go-to fence contractors for new Riverside South homeowners enclosing their yard for the first time.",
    intro2: "With 150+ five-star Google reviews, we're the fence contractor Riverside South homeowners recommend as the community continues to grow.",
    testimonials: [
      { quote: "Our new build in Riverside South came with zero fencing. AMA United installed a full PVC privacy fence within two weeks of our call. Exactly what we needed before our dog could use the yard.", author: "Amanda C.", loc: "Riverside South, Ottawa" },
      { quote: "Great experience from quote to install. They coordinated around our still-settling new construction lot without any issues.", author: "Ryan P.", loc: "Riverside South, Ottawa" },
      { quote: "Several neighbours on our street have used AMA United as the community has filled in. Consistent quality and pricing every time we've asked around.", author: "Vanessa D.", loc: "Riverside South, Ottawa" },
    ],
    faqLabel: "Do you serve all of Riverside South?",
    faqExtra: "Yes — we serve all of Riverside South, including newly-built subdivisions still under construction. Travel within Riverside South is always included in your quote.",
    areaNote: "new-build community",
  },
  {
    slug: "fencing-findlay-creek",
    city: "Findlay Creek",
    intro: "AMA United installs fencing throughout Findlay Creek, a rapidly growing planned community in south Ottawa. Like many newer subdivisions, most Findlay Creek homes arrive without backyard fencing — we help new homeowners enclose their yards quickly and correctly, working around still-settling new construction where needed.",
    intro2: "With 150+ five-star Google reviews, we're the fence contractor Findlay Creek families recommend as the community continues to expand.",
    testimonials: [
      { quote: "We moved into a new build in Findlay Creek last year with a completely open backyard. AMA United installed our fence fast and the quality is excellent.", author: "Chris B.", loc: "Findlay Creek, Ottawa" },
      { quote: "Good pricing, showed up on time, and handled our slightly uneven new-construction grading without any extra charges.", author: "Natasha K.", loc: "Findlay Creek, Ottawa" },
      { quote: "Asked in our neighbourhood Facebook group for fence recommendations and AMA United came up repeatedly. Now I understand why — great work.", author: "Derek M.", loc: "Findlay Creek, Ottawa" },
    ],
    faqLabel: "Do you serve all of Findlay Creek?",
    faqExtra: "Yes — we serve all of Findlay Creek, including newly-built subdivisions still under construction. Travel within Findlay Creek is always included in your quote.",
    areaNote: "new-build community",
  },
  {
    slug: "fencing-greely",
    city: "Greely",
    intro: "AMA United installs fencing throughout Greely, a rural community southeast of Ottawa known for larger acreage properties. Greely properties often need longer perimeter runs, field and paddock-style fencing, and posts set deeper to handle the area's soil conditions — work that's different from a standard suburban backyard install, and something our crews are experienced with.",
    intro2: "With 150+ five-star Google reviews, we're the fence contractor Greely property owners recommend for both residential and larger acreage fencing.",
    testimonials: [
      { quote: "We have several acres in Greely and needed a long perimeter fence. AMA United gave us an honest quote for the scope of the job and delivered exactly as promised.", author: "Wayne T.", loc: "Greely, Ottawa" },
      { quote: "They installed chain link fencing around a large section of our rural property. Professional crew, fair pricing for the amount of work involved.", author: "Debbie R.", loc: "Greely, Ottawa" },
      { quote: "Not every fence company wants to deal with a rural property this size. AMA United did, and the work quality was excellent.", author: "Frank L.", loc: "Greely, Ottawa" },
    ],
    faqLabel: "Do you serve all of Greely, including larger rural properties?",
    faqExtra: "Yes — we serve Greely and surrounding rural properties, including larger acreage and perimeter fencing jobs. Travel is always included in your quote regardless of property size.",
    areaNote: "rural community",
  },
];

function page(c) {
  const title = `Fence Installation ${c.city} Ottawa | AMA United Company`;
  const desc = `Fence installation in ${c.city}, Ottawa. PVC, wood, hybrid & chain link fencing. 150+ five-star reviews. Free quotes, 2-year warranty. Locally owned.`;

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
    "name": "Fence Installation ${c.city} Ottawa",
    "provider": {
      "@type": "GeneralContractor",
      "name": "AMA United Company",
      "telephone": "613-869-7775"
    },
    "areaServed": {"@type": "City", "name": "${c.city}, Ottawa, ON"},
    "description": "Professional fence installation in ${c.city}, Ottawa. PVC, wood, hybrid, and chain link fencing with 2-year workmanship warranty."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://amautdc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Residential Fencing", "item": "https://amautdc.com/residential-fencing"},
      {"@type": "ListItem", "position": 3, "name": "Fence Installation ${c.city}"}
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
        "name": "Do I need a permit to build a fence in ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "In most cases, fences under 2 metres (6.5 ft) do not require a permit from the City of Ottawa. Corner lots, properties near easements, and rural or estate lots may have additional setback rules. AMA United reviews City of Ottawa bylaws for your specific ${c.city} property before every project and handles permit applications if required."}
      },
      {
        "@type": "Question",
        "name": "What fencing material is best for ${c.city} winters?",
        "acceptedAnswer": {"@type": "Answer", "text": "PVC and hybrid fencing perform best across Ottawa's freeze-thaw climate. Both are engineered to handle extreme temperature swings without cracking or warping, and PVC comes with a lifetime material warranty. Cedar and chain link are also strong options depending on the property."}
      },
      {
        "@type": "Question",
        "name": "How long does fence installation take in ${c.city}?",
        "acceptedAnswer": {"@type": "Answer", "text": "Most residential installs take 1–2 days depending on length and style. Larger or rural properties with longer perimeter runs may take longer — we confirm the exact timeline in your written quote before work begins."}
      },
      {
        "@type": "Question",
        "name": "${c.faqLabel}",
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
    <p class="breadcrumb"><a href="/">Home</a> / <a href="/residential-fencing">Residential Fencing</a> / ${c.city}</p>
    <h1>Fence Installation<br><em style="color:var(--red)">${c.city}, Ottawa</em></h1>
    <p class="section-sub" style="margin-top:16px;">Ottawa's highest-rated fencing contractor — proudly serving ${c.city} with premium fencing built for our climate.</p>
  </div>
</header>

<main>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Fencing in ${c.city}</p>
      <h2 class="section-title">${c.city}'s Trusted<br><em>Fence Installer</em></h2>
    </div>
    <p class="service-intro" data-reveal>${c.intro}</p>
    <p class="service-intro" style="margin-top:20px;" data-reveal>${c.intro2}</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">What We Install</p>
      <h2 class="section-title">Fencing Options for<br><em>${c.city} Properties</em></h2>
    </div>
    <div class="options-grid">
      <div class="option-card" data-reveal>
        <h3>PVC / Vinyl Fencing</h3>
        <p>The most popular choice in ${c.city}. PVC fencing handles Ottawa's freeze-thaw cycles without cracking, warping, or rotting. Available in privacy, semi-privacy, and picket in a range of colours. Near-zero maintenance.</p>
        <div class="price">From $75 / linear ft &nbsp;|&nbsp; Lifetime Warranty</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="1">
        <h3>Hybrid Fencing</h3>
        <p>The wood-look fence without the wood problems. Hybrid fencing combines a composite or polymer core with a realistic wood grain finish — stunning curb appeal, no staining, no rotting, extended warranty.</p>
        <div class="price">Premium option &nbsp;|&nbsp; Extended Warranty</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="2">
        <h3>Wood Fencing</h3>
        <p>Classic cedar and pressure-treated privacy fences. Beautiful natural look, customizable height and design, and easy to stain or paint to match your home. A trusted choice for ${c.city} properties.</p>
        <div class="price">Mid-range &nbsp;|&nbsp; Cedar &amp; Pressure-Treated</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="3">
        <h3>Chain Link Fencing</h3>
        <p>Durable, low-cost perimeter fencing. Ideal for pet containment, pool enclosures, and larger property boundaries. Available in standard galvanized and black powder-coated finishes.</p>
        <div class="price">From $40 / linear ft &nbsp;|&nbsp; Budget-Friendly</div>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Our Work</p>
      <h2 class="section-title">Recent ${c.city} <em>Projects</em></h2>
    </div>
    <div class="gallery-preview-grid">
      <div class="gallery-item"><img src="./assets/fencing/fence-1-hybrid-grey.webp" alt="Hybrid grey fence installed in ${c.city} Ottawa" loading="lazy" width="1920" height="1440"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/fencing/fence-3-wood-install.webp" alt="Cedar wood privacy fence ${c.city} Ottawa" loading="lazy" width="1920" height="1440"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/fencing/fence-4-pvc-white-install.webp" alt="White PVC fence installation ${c.city} Ottawa" loading="lazy" width="1920" height="1440"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/fencing/fence-8-project.webp" alt="Fence installation ${c.city} Ottawa" loading="lazy" width="1920" height="1440"><div class="gallery-overlay"><span>⊕</span></div></div>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="/gallery" class="btn-outline">View Full Gallery</a></div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header center" data-reveal>
      <p class="section-label">What ${c.city} Property Owners Say</p>
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
      <p class="section-label">${c.city} Fencing FAQ</p>
      <h2 class="section-title">Common <em>Questions</em></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do I need a permit to build a fence in ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>In most cases, fences under 2 metres (6.5 ft) do not require a permit from the City of Ottawa. Corner lots, properties near easements, and rural or estate lots may have additional setback rules. AMA United reviews City of Ottawa bylaws for your specific ${c.city} property before every project and handles permit applications if required.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">What fencing material is best for ${c.city} winters?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>PVC and hybrid fencing perform best across Ottawa's freeze-thaw climate. Both are engineered to handle extreme temperature swings without cracking or warping, and PVC comes with a lifetime material warranty. Cedar and chain link are also strong options depending on the property.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">How long does fence installation take in ${c.city}?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Most residential installs take 1–2 days depending on length and style. Larger or rural properties with longer perimeter runs may take longer — we confirm the exact timeline in your written quote before work begins.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">${c.faqLabel}<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>${c.faqExtra}</p></div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="cta-banner-content" data-reveal>
    <p class="section-label" style="justify-content:center;">${c.city} Property Owners</p>
    <h2>Ready for a New Fence?<br><em style="color:var(--red)">Get Your Free Quote</em></h2>
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
        <p class="footer-tagline">Ottawa's trusted fencing contractor — serving ${c.city} and all Ottawa communities.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=100090653326145" aria-label="Facebook" target="_blank" rel="noopener">f</a>
          <a href="https://www.instagram.com/amautdc/?hl=en" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
        </div>
      </div>
      <div class="footer-nav">
        <h4>Service Areas</h4>
        <ul>
          <li><a href="/residential-fencing">Residential Fencing</a></li>
          <li><a href="/fencing-manotick">Fencing in Manotick</a></li>
          <li><a href="/fencing-riverside-south">Fencing in Riverside South</a></li>
          <li><a href="/fencing-findlay-creek">Fencing in Findlay Creek</a></li>
          <li><a href="/fencing-greely">Fencing in Greely</a></li>
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

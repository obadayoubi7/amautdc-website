import { writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");

function headBlock(c) {
  return `<!-- Google tag (gtag.js) -->
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
  <title>${c.title}</title>
  <meta name="description" content="${c.desc}">
  <meta property="og:title" content="${c.title}">
  <meta property="og:description" content="${c.desc}">
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
  <link rel="stylesheet" href="./css/style.css">`;
}

function navBlock() {
  return `<div id="scroll-progress"></div>
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
</div>`;
}

function footerBlock(tagline, links) {
  return `<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="nav-logo" style="margin-bottom:16px;display:inline-flex;">
          <img src="./assets/logo.webp" alt="AMA United Company Logo" width="1179" height="1217">
          <div class="nav-logo-text"><span>AMA United</span><span>Company</span></div>
        </a>
        <p class="footer-tagline">${tagline}</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=100090653326145" aria-label="Facebook" target="_blank" rel="noopener">f</a>
          <a href="https://www.instagram.com/amautdc/?hl=en" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
        </div>
      </div>
      <div class="footer-nav">
        <h4>Service Areas</h4>
        <ul>
          ${links}
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
</script>`;
}

function testimonialsBlock(testimonials) {
  return testimonials.map((t, i) => `<div class="tcard" data-reveal${i ? ` data-reveal-delay="${i}"` : ""}>
        <div class="tcard-stars">★★★★★</div>
        <p class="tcard-quote">${t.quote}</p>
        <div class="tcard-author">${t.author}</div>
        <div class="tcard-location">${t.loc}</div>
      </div>`).join("\n      ");
}

// ---- interlock-stittsville ----
const interlockStittsville = {
  slug: "interlock-stittsville",
  city: "Stittsville",
  title: "Interlock Driveways & Patios Stittsville Ottawa | AMA United Company",
  desc: "Interlock driveway, patio & walkway installation in Stittsville, Ottawa. Durable paving stones built for our freeze-thaw climate. 150+ five-star reviews. Free quotes, 2-year warranty.",
};
interlockStittsville.html = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headBlock(interlockStittsville)}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Interlock Installation Stittsville Ottawa",
    "provider": { "@type": "GeneralContractor", "name": "AMA United Company", "telephone": "613-869-7775" },
    "areaServed": {"@type": "City", "name": "Stittsville, Ottawa, ON"},
    "description": "Interlock driveway, patio, and walkway installation in Stittsville, Ottawa with 2-year workmanship warranty."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://amautdc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Interlock & Renovations", "item": "https://amautdc.com/interlock-renovations"},
      {"@type": "ListItem", "position": 3, "name": "Interlock Stittsville"}
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "Do I need a permit for an interlock driveway in Stittsville?", "acceptedAnswer": {"@type": "Answer", "text": "Interlock driveways and patios generally do not require a City of Ottawa building permit since they are not structures, though driveway widening or curb cuts may need approval. AMA United reviews the specifics of your Stittsville property before every project."}},
      {"@type": "Question", "name": "Will interlock crack or heave in Stittsville winters?", "acceptedAnswer": {"@type": "Answer", "text": "Properly installed interlock resists Ottawa's freeze-thaw cycles far better than poured concrete or asphalt. The key is base preparation — we compact crushed stone to the correct depth beneath every installation."}},
      {"@type": "Question", "name": "How long does interlock installation take in Stittsville?", "acceptedAnswer": {"@type": "Answer", "text": "A standard driveway takes 3–5 days including removal of old material, base preparation, and paver installation. Patios and walkways are typically 1–3 days."}},
      {"@type": "Question", "name": "Do you serve all of Stittsville?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we install interlock throughout Stittsville including Jackson Trails, Fairwinds, Crossing Bridge Estates, Amberwood Village, Bryanston Gate, and Wyldewood. Travel within Stittsville is always included in your quote."}}
    ]
  }
  </script>
</head>
<body>
${navBlock()}

<header class="page-hero">
  <div class="page-hero-content">
    <p class="breadcrumb"><a href="/">Home</a> / <a href="/interlock-renovations">Interlock &amp; Renovations</a> / Stittsville</p>
    <h1>Interlock Driveways &amp; Patios<br><em style="color:var(--red)">Stittsville, Ottawa</em></h1>
    <p class="section-sub" style="margin-top:16px;">Stittsville's trusted interlock contractor — durable paving stones for driveways, patios, and walkways built for Ottawa's climate.</p>
  </div>
</header>

<main>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Interlock in Stittsville</p>
      <h2 class="section-title">Stittsville's Trusted<br><em>Interlock Contractor</em></h2>
    </div>
    <p class="service-intro" data-reveal>AMA United installs interlock driveways, patios, and walkways throughout Stittsville — one of Ottawa's fastest-growing communities. Many Stittsville homes sit on larger lots in Jackson Trails, Fairwinds, and Amberwood Village, and we build every project on a properly compacted crushed-stone base engineered for the area's soil and Ottawa's freeze-thaw cycles.</p>
    <p class="service-intro" style="margin-top:20px;" data-reveal>With 150+ five-star Google reviews, we're the interlock contractor Stittsville homeowners recommend to their neighbours.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">What We Install</p>
      <h2 class="section-title">Interlock Options for<br><em>Stittsville Properties</em></h2>
    </div>
    <div class="options-grid">
      <div class="option-card" data-reveal>
        <h3>Interlock Driveways</h3>
        <p>Replace cracked asphalt or dull concrete with a stunning interlock driveway. Paving stones handle Ottawa's freeze-thaw far better than monolithic surfaces.</p>
        <div class="price">Most popular application &nbsp;|&nbsp; Major curb appeal upgrade</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="1">
        <h3>Patios &amp; Outdoor Living</h3>
        <p>An interlock patio creates a durable, beautiful foundation for your outdoor living space in Stittsville. Pairs beautifully with our deck builds.</p>
        <div class="price">Custom patterns &nbsp;|&nbsp; Pairs with deck builds</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="2">
        <h3>Walkways &amp; Paths</h3>
        <p>We install front entry paths and side yard walkways throughout Stittsville — from simple straight runs to sweeping curved designs.</p>
        <div class="price">Any shape or pattern &nbsp;|&nbsp; Decorative options available</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="3">
        <h3>Steps &amp; Retaining Walls</h3>
        <p>Interlock steps and retaining walls solve grade changes beautifully while adding structure to your yard, common on Stittsville's larger newer lots.</p>
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
        <p>Individual paving stones flex independently through freeze-thaw cycles instead of developing stress cracks like concrete or asphalt.</p>
      </div>
      <div class="why-card" data-reveal data-reveal-delay="1">
        <div class="why-card-icon">🎨</div>
        <h3>Stunning Curb Appeal</h3>
        <p>Dozens of stone colours, textures, and laying patterns give Stittsville homeowners complete control over the look.</p>
      </div>
      <div class="why-card" data-reveal data-reveal-delay="2">
        <div class="why-card-icon">🔧</div>
        <h3>Easy to Repair</h3>
        <p>If a utility ever needs to dig up your driveway, the stones are simply lifted, the work is done, and the stones are relaid exactly as before.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header center" data-reveal>
      <p class="section-label">What Stittsville Homeowners Say</p>
      <h2 class="section-title">150+ Five-Star <em>Reviews</em></h2>
    </div>
    <div class="testimonials-grid">
      ${testimonialsBlock([
        { quote: "AMA United installed a full interlock driveway at our new build in Jackson Trails. Great communication and the base work has kept it perfectly flat.", author: "Kyle S.", loc: "Stittsville, Ottawa" },
        { quote: "They built a patio and retaining wall for our sloped lot in Fairwinds. Professional crew and the stonework is gorgeous.", author: "Tara M.", loc: "Stittsville, Ottawa" },
        { quote: "Compared a few interlock companies serving Stittsville. AMA United was the clearest about cost and timeline and delivered exactly as promised.", author: "Josh R.", loc: "Stittsville, Ottawa" },
      ])}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Stittsville Interlock FAQ</p>
      <h2 class="section-title">Common <em>Questions</em></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do I need a permit for an interlock driveway in Stittsville?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Interlock driveways and patios generally do not require a City of Ottawa building permit since they are not structures, though driveway widening or curb cuts may need approval. AMA United reviews the specifics of your Stittsville property before every project.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Will interlock crack or heave in Stittsville winters?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Properly installed interlock resists Ottawa's freeze-thaw cycles far better than poured concrete or asphalt. The key is base preparation — we compact crushed stone to the correct depth beneath every installation.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">How long does interlock installation take in Stittsville?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>A standard driveway takes 3–5 days including removal of old material, base preparation, and paver installation. Patios and walkways are typically 1–3 days.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do you serve all of Stittsville?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Yes — we install interlock throughout Stittsville including Jackson Trails, Fairwinds, Crossing Bridge Estates, Amberwood Village, Bryanston Gate, and Wyldewood. Travel within Stittsville is always included in your quote.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="cta-banner-content" data-reveal>
    <p class="section-label" style="justify-content:center;">Stittsville Homeowners</p>
    <h2>Ready for a New Driveway or Patio?<br><em style="color:var(--red)">Get Your Free Quote</em></h2>
    <p>We'll visit your Stittsville property, measure the job, and give you a transparent written quote — no pressure, no surprises.</p>
    <a href="/#contact" class="btn-primary">Request a Free Quote →</a>
  </div>
</section>

</main>

${footerBlock(
  "Ottawa's trusted interlock contractor — serving Stittsville and all Ottawa communities.",
  `<li><a href="/interlock-renovations">Interlock &amp; Renovations</a></li>
          <li><a href="/fencing-stittsville">Fencing in Stittsville</a></li>
          <li><a href="/interlock-kanata">Interlock in Kanata</a></li>
          <li><a href="/interlock-barrhaven">Interlock in Barrhaven</a></li>
          <li><a href="/interlock-orleans">Interlock in Orléans</a></li>
          <li><a href="/interlock-nepean">Interlock in Nepean</a></li>
          <li><a href="/interlock-stittsville">Interlock in Stittsville</a></li>
          <li><a href="/interlock-gloucester">Interlock in Gloucester</a></li>`
)}
</body>
</html>
`;

// ---- interlock-gloucester ----
const interlockGloucester = {
  slug: "interlock-gloucester",
  city: "Gloucester",
  title: "Interlock Driveways & Patios Gloucester Ottawa | AMA United Company",
  desc: "Interlock driveway, patio & walkway installation in Gloucester, Ottawa. Durable paving stones built for our freeze-thaw climate. 150+ five-star reviews. Free quotes, 2-year warranty.",
};
interlockGloucester.html = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headBlock(interlockGloucester)}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Interlock Installation Gloucester Ottawa",
    "provider": { "@type": "GeneralContractor", "name": "AMA United Company", "telephone": "613-869-7775" },
    "areaServed": {"@type": "City", "name": "Gloucester, Ottawa, ON"},
    "description": "Interlock driveway, patio, and walkway installation in Gloucester, Ottawa with 2-year workmanship warranty."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://amautdc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Interlock & Renovations", "item": "https://amautdc.com/interlock-renovations"},
      {"@type": "ListItem", "position": 3, "name": "Interlock Gloucester"}
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "Do I need a permit for an interlock driveway in Gloucester?", "acceptedAnswer": {"@type": "Answer", "text": "Interlock driveways and patios generally do not require a City of Ottawa building permit since they are not structures, though driveway widening or curb cuts may need approval. AMA United reviews the specifics of your Gloucester property before every project."}},
      {"@type": "Question", "name": "Will interlock crack or heave in Gloucester winters?", "acceptedAnswer": {"@type": "Answer", "text": "Properly installed interlock resists Ottawa's freeze-thaw cycles far better than poured concrete or asphalt. The key is base preparation — we compact crushed stone to the correct depth beneath every installation."}},
      {"@type": "Question", "name": "How long does interlock installation take in Gloucester?", "acceptedAnswer": {"@type": "Answer", "text": "A standard driveway takes 3–5 days including removal of old material, base preparation, and paver installation. Patios and walkways are typically 1–3 days."}},
      {"@type": "Question", "name": "Do you serve all of Gloucester?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we install interlock throughout Gloucester including Blackburn Hamlet, Beacon Hill, Cardinal Heights, Hunt Club, Riverview, and Greenboro. Travel within Gloucester is always included in your quote."}}
    ]
  }
  </script>
</head>
<body>
${navBlock()}

<header class="page-hero">
  <div class="page-hero-content">
    <p class="breadcrumb"><a href="/">Home</a> / <a href="/interlock-renovations">Interlock &amp; Renovations</a> / Gloucester</p>
    <h1>Interlock Driveways &amp; Patios<br><em style="color:var(--red)">Gloucester, Ottawa</em></h1>
    <p class="section-sub" style="margin-top:16px;">Gloucester's trusted interlock contractor — durable paving stones for driveways, patios, and walkways built for Ottawa's climate.</p>
  </div>
</header>

<main>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Interlock in Gloucester</p>
      <h2 class="section-title">Gloucester's Trusted<br><em>Interlock Contractor</em></h2>
    </div>
    <p class="service-intro" data-reveal>AMA United installs interlock driveways, patios, and walkways throughout Gloucester — from Blackburn Hamlet and Beacon Hill to Hunt Club and Greenboro. Many Gloucester properties have older concrete or asphalt that's now cracking; we remove the old surface and rebuild on a properly compacted base so your new interlock stays flat for decades.</p>
    <p class="service-intro" style="margin-top:20px;" data-reveal>With 150+ five-star Google reviews, we're the interlock contractor Gloucester homeowners trust for driveways, patios, and retaining walls.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">What We Install</p>
      <h2 class="section-title">Interlock Options for<br><em>Gloucester Properties</em></h2>
    </div>
    <div class="options-grid">
      <div class="option-card" data-reveal>
        <h3>Interlock Driveways</h3>
        <p>Replace cracked asphalt or dull concrete with a stunning interlock driveway. Paving stones handle Ottawa's freeze-thaw far better than monolithic surfaces.</p>
        <div class="price">Most popular application &nbsp;|&nbsp; Major curb appeal upgrade</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="1">
        <h3>Patios &amp; Outdoor Living</h3>
        <p>An interlock patio creates a durable, beautiful foundation for your outdoor living space in Gloucester. Pairs beautifully with our deck builds.</p>
        <div class="price">Custom patterns &nbsp;|&nbsp; Pairs with deck builds</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="2">
        <h3>Walkways &amp; Paths</h3>
        <p>We install front entry paths and side yard walkways throughout Gloucester — from simple straight runs to sweeping curved designs.</p>
        <div class="price">Any shape or pattern &nbsp;|&nbsp; Decorative options available</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="3">
        <h3>Steps &amp; Retaining Walls</h3>
        <p>Interlock steps and retaining walls solve grade changes beautifully while adding structure to your yard.</p>
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
        <p>Individual paving stones flex independently through freeze-thaw cycles instead of developing stress cracks like concrete or asphalt.</p>
      </div>
      <div class="why-card" data-reveal data-reveal-delay="1">
        <div class="why-card-icon">🎨</div>
        <h3>Stunning Curb Appeal</h3>
        <p>Dozens of stone colours, textures, and laying patterns give Gloucester homeowners complete control over the look.</p>
      </div>
      <div class="why-card" data-reveal data-reveal-delay="2">
        <div class="why-card-icon">🔧</div>
        <h3>Easy to Repair</h3>
        <p>If a utility ever needs to dig up your driveway, the stones are simply lifted, the work is done, and the stones are relaid exactly as before.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header center" data-reveal>
      <p class="section-label">What Gloucester Homeowners Say</p>
      <h2 class="section-title">150+ Five-Star <em>Reviews</em></h2>
    </div>
    <div class="testimonials-grid">
      ${testimonialsBlock([
        { quote: "Our cracked driveway in Blackburn Hamlet was replaced with interlock in under a week. Looks completely different — great work.", author: "Sandra P.", loc: "Gloucester, Ottawa" },
        { quote: "They built an interlock patio and steps for our backyard in Hunt Club. Professional, tidy, and finished on schedule.", author: "Marcus L.", loc: "Gloucester, Ottawa" },
        { quote: "Got quotes from a few companies in Greenboro. AMA United was the most transparent about cost and the finished work is excellent.", author: "Helen W.", loc: "Gloucester, Ottawa" },
      ])}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Gloucester Interlock FAQ</p>
      <h2 class="section-title">Common <em>Questions</em></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do I need a permit for an interlock driveway in Gloucester?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Interlock driveways and patios generally do not require a City of Ottawa building permit since they are not structures, though driveway widening or curb cuts may need approval. AMA United reviews the specifics of your Gloucester property before every project.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Will interlock crack or heave in Gloucester winters?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Properly installed interlock resists Ottawa's freeze-thaw cycles far better than poured concrete or asphalt. The key is base preparation — we compact crushed stone to the correct depth beneath every installation.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">How long does interlock installation take in Gloucester?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>A standard driveway takes 3–5 days including removal of old material, base preparation, and paver installation. Patios and walkways are typically 1–3 days.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do you serve all of Gloucester?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Yes — we install interlock throughout Gloucester including Blackburn Hamlet, Beacon Hill, Cardinal Heights, Hunt Club, Riverview, and Greenboro. Travel within Gloucester is always included in your quote.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="cta-banner-content" data-reveal>
    <p class="section-label" style="justify-content:center;">Gloucester Homeowners</p>
    <h2>Ready for a New Driveway or Patio?<br><em style="color:var(--red)">Get Your Free Quote</em></h2>
    <p>We'll visit your Gloucester property, measure the job, and give you a transparent written quote — no pressure, no surprises.</p>
    <a href="/#contact" class="btn-primary">Request a Free Quote →</a>
  </div>
</section>

</main>

${footerBlock(
  "Ottawa's trusted interlock contractor — serving Gloucester and all Ottawa communities.",
  `<li><a href="/interlock-renovations">Interlock &amp; Renovations</a></li>
          <li><a href="/fencing-gloucester">Fencing in Gloucester</a></li>
          <li><a href="/interlock-kanata">Interlock in Kanata</a></li>
          <li><a href="/interlock-barrhaven">Interlock in Barrhaven</a></li>
          <li><a href="/interlock-orleans">Interlock in Orléans</a></li>
          <li><a href="/interlock-nepean">Interlock in Nepean</a></li>
          <li><a href="/interlock-stittsville">Interlock in Stittsville</a></li>
          <li><a href="/interlock-gloucester">Interlock in Gloucester</a></li>`
)}
</body>
</html>
`;

// ---- decks-gloucester ----
const decksGloucester = {
  slug: "decks-gloucester",
  city: "Gloucester",
  title: "Deck Builder Gloucester Ottawa | Custom Decks | AMA United Company",
  desc: "Top-rated deck builder in Gloucester, Ottawa. Composite, wood & PVC decks. Multi-level designs, pergolas, railings. 150+ five-star reviews. Free quotes, 2-year warranty.",
};
decksGloucester.html = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headBlock(decksGloucester)}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Deck Builder Gloucester Ottawa",
    "provider": { "@type": "GeneralContractor", "name": "AMA United Company", "telephone": "613-869-7775" },
    "areaServed": {"@type": "City", "name": "Gloucester, Ottawa, ON"},
    "description": "Custom deck construction in Gloucester, Ottawa. Composite, PVC, and wood decks with 2-year workmanship warranty."
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://amautdc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Decks", "item": "https://amautdc.com/decks"},
      {"@type": "ListItem", "position": 3, "name": "Deck Builder Gloucester"}
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "Do I need a permit to build a deck in Gloucester?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — in Ottawa, decks over 24 inches above grade or attached to the house require a building permit. AMA United handles the full permit application process for all Gloucester clients."}},
      {"@type": "Question", "name": "What deck material is best for Gloucester winters?", "acceptedAnswer": {"@type": "Answer", "text": "Composite decking is the best long-term choice for Ottawa's climate. It won't absorb moisture, won't crack in freeze-thaw cycles, and doesn't require annual sealing or staining."}},
      {"@type": "Question", "name": "How long does it take to build a deck in Gloucester?", "acceptedAnswer": {"@type": "Answer", "text": "A standard single-level deck takes 3–5 days from footing pour to final board. Multi-level or larger decks take 5–10 days."}},
      {"@type": "Question", "name": "Do you serve all of Gloucester?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we build decks throughout Gloucester including Blackburn Hamlet, Beacon Hill, Cardinal Heights, Hunt Club, Riverview, and Greenboro. Travel within Gloucester is always included in your quote."}}
    ]
  }
  </script>
</head>
<body>
${navBlock()}

<header class="page-hero">
  <div class="page-hero-content">
    <p class="breadcrumb"><a href="/">Home</a> / <a href="/decks">Decks</a> / Gloucester</p>
    <h1>Deck Builder<br><em style="color:var(--red)">Gloucester, Ottawa</em></h1>
    <p class="section-sub" style="margin-top:16px;">Gloucester's highest-rated deck contractor — custom composite, wood, and multi-level decks built for Ottawa's climate.</p>
  </div>
</header>

<main>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Decks in Gloucester</p>
      <h2 class="section-title">Gloucester's Trusted<br><em>Deck Builder</em></h2>
    </div>
    <p class="service-intro" data-reveal>AMA United builds custom decks throughout Gloucester — from Blackburn Hamlet and Beacon Hill to Hunt Club and Greenboro. We engineer every deck footing for the area's soil and frost depth, so your deck stays solid through Ottawa winters without shifting.</p>
    <p class="service-intro" style="margin-top:20px;" data-reveal>With 150+ five-star Google reviews, we're the deck builder Gloucester homeowners recommend to their neighbours.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Deck Options</p>
      <h2 class="section-title">Build It Your<br><em>Way in Gloucester</em></h2>
    </div>
    <div class="options-grid">
      <div class="option-card" data-reveal>
        <h3>Composite Decking</h3>
        <p>The top choice for Gloucester homeowners. Composite boards are colour-stable, slip-resistant, and splinter-free. They won't fade, crack, or absorb moisture through Ottawa's harsh winters.</p>
        <div class="price">Low maintenance &nbsp;|&nbsp; 25–30 year lifespan</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="1">
        <h3>Pressure-Treated Wood</h3>
        <p>The most affordable deck option. Properly installed PT lumber delivers a strong, traditional deck at the best price point.</p>
        <div class="price">Most affordable &nbsp;|&nbsp; 15–20 year lifespan</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="2">
        <h3>Multi-Level Decks</h3>
        <p>Many Gloucester homes have walk-out basements and sloped yards — perfect for multi-level decks with integrated stairs and railings.</p>
        <div class="price">Custom design &nbsp;|&nbsp; Engineered for your yard</div>
      </div>
      <div class="option-card" data-reveal data-reveal-delay="3">
        <h3>PVC Decking</h3>
        <p>100% synthetic, completely waterproof decking with a lifetime manufacturer's warranty. Stays cool underfoot and resists staining.</p>
        <div class="price">Lifetime warranty &nbsp;|&nbsp; Completely waterproof</div>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Our Work</p>
      <h2 class="section-title">Recent Gloucester <em>Deck Projects</em></h2>
    </div>
    <div class="gallery-preview-grid">
      <div class="gallery-item"><img src="./assets/decks/deck-2-composite-lights.webp" alt="Composite deck with step lights built in Gloucester Ottawa" loading="lazy" width="1200" height="1600"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-3-composite-multilevel.webp" alt="Multi-level composite deck Gloucester Ottawa" loading="lazy" width="738" height="1600"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-4-composite-railings.webp" alt="Composite deck with black railings Gloucester Ottawa" loading="lazy" width="1179" height="1484"><div class="gallery-overlay"><span>⊕</span></div></div>
      <div class="gallery-item"><img src="./assets/decks/deck-7-composite.webp" alt="Deck project Gloucester Ottawa" loading="lazy" width="1600" height="1200"><div class="gallery-overlay"><span>⊕</span></div></div>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="/gallery" class="btn-outline">View Full Gallery</a></div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-header center" data-reveal>
      <p class="section-label">What Gloucester Homeowners Say</p>
      <h2 class="section-title">150+ Five-Star <em>Reviews</em></h2>
    </div>
    <div class="testimonials-grid">
      ${testimonialsBlock([
        { quote: "AMA United built a composite deck with a pergola for our home in Blackburn Hamlet. The design work upfront was excellent and matched the build exactly.", author: "Gary N.", loc: "Gloucester, Ottawa" },
        { quote: "Our old wood deck in Hunt Club was replaced with composite decking and new railings. No more splinters, no more staining every year.", author: "Cheryl D.", loc: "Gloucester, Ottawa" },
        { quote: "Fair pricing and the crew showed up exactly when they said they would. Our new deck in Greenboro has held up perfectly through two winters.", author: "Alan F.", loc: "Gloucester, Ottawa" },
      ])}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <p class="section-label">Gloucester Deck FAQ</p>
      <h2 class="section-title">Common <em>Questions</em></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do I need a permit to build a deck in Gloucester?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Yes — in Ottawa, decks over 24 inches above grade or attached to the house require a building permit. AMA United handles the full permit application process for all Gloucester clients.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">What deck material is best for Gloucester winters?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Composite decking is the best long-term choice for Ottawa's climate. It won't absorb moisture, won't crack in freeze-thaw cycles, and doesn't require annual sealing or staining.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">How long does it take to build a deck in Gloucester?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>A standard single-level deck takes 3–5 days from footing pour to final board. Multi-level or larger decks take 5–10 days.</p></div>
      </div>
      <div class="faq-item" data-reveal>
        <button class="faq-q" onclick="toggleFaq(this)">Do you serve all of Gloucester?<span class="faq-icon">+</span></button>
        <div class="faq-a"><p>Yes — we build decks throughout Gloucester including Blackburn Hamlet, Beacon Hill, Cardinal Heights, Hunt Club, Riverview, and Greenboro. Travel within Gloucester is always included in your quote.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="cta-banner-content" data-reveal>
    <p class="section-label" style="justify-content:center;">Gloucester Homeowners</p>
    <h2>Ready to Build Your Deck?<br><em style="color:var(--red)">Get Your Free Quote</em></h2>
    <p>We'll visit your Gloucester property, measure your yard, and give you a transparent written quote — no pressure, no surprises.</p>
    <a href="/#contact" class="btn-primary">Request a Free Quote →</a>
  </div>
</section>

</main>

${footerBlock(
  "Ottawa's trusted deck builder — serving Gloucester and all Ottawa communities.",
  `<li><a href="/decks">Custom Decks</a></li>
          <li><a href="/fencing-gloucester">Fencing in Gloucester</a></li>
          <li><a href="/decks-barrhaven">Decks in Barrhaven</a></li>
          <li><a href="/decks-kanata">Decks in Kanata</a></li>
          <li><a href="/decks-orleans">Decks in Orléans</a></li>
          <li><a href="/decks-nepean">Decks in Nepean</a></li>
          <li><a href="/decks-stittsville">Decks in Stittsville</a></li>
          <li><a href="/decks-gloucester">Decks in Gloucester</a></li>`
)}
</body>
</html>
`;

for (const p of [interlockStittsville, interlockGloucester, decksGloucester]) {
  writeFileSync(join(root, `${p.slug}.html`), p.html, "utf8");
  console.log(`Wrote ${p.slug}.html`);
}

const h = React.createElement;
const BrandMark = () =>
  h("span", { className: "brand-mark" },
    h("span", { className: "brand-main" }, "NEMO DESIGN"),
    h("span", { className: "brand-studios" }, "STUDIOS")
  );

const clientLogoSet = [
  ["/assets/client-logos/client-logo-01.png", "Client logo"],
  ["/assets/client-logos/client-logo-02.png", "Client logo"],
  ["/assets/client-logos/client-logo-03.png", "Client logo"],
  ["/assets/client-logos/client-logo-04.png", "Client logo"],
  ["/assets/client-logos/client-logo-05.png", "Client logo"],
  ["/assets/client-logos/client-logo-06.png", "Client logo"],
  ["/assets/client-logos/client-logo-07.png", "Client logo"],
  ["/assets/client-logos/client-logo-08.png", "Client logo"]
];
const projectImageSet = [
  "/assets/Project Images/1.png",
  "/assets/Project Images/BEHANCE ARTBOARDS-01 (1).png",
  "/assets/Project Images/Behance Artboards-01.png",
  "/assets/Project Images/fraser.png",
  "/assets/Project Images/Untitled-2-16.png"
];

const workImageSet = Array.from({ length: 11 }, (_, index) =>
  `/assets/Work Images/optimized/kozmetyx-${String(index + 1).padStart(2, "0")}.webp`
);

const heroCardImages = [
  "/assets/Work Images/hero-stack-optimized/yama-yoga-01.webp",
  "/assets/Work Images/hero-stack-optimized/fraser-studios-01.webp",
  "/assets/Work Images/hero-stack-optimized/kozmetyx-05.webp",
  "/assets/Work Images/hero-stack-optimized/kozmetyx-10.webp",
  "/assets/Work Images/hero-stack-optimized/farmers-mill-14.webp",
  "/assets/Work Images/hero-stack-optimized/fraser-studios-10.webp",
  "/assets/Work Images/hero-stack-optimized/soul-soup-10.webp"
];

const paradigmImageSet = Array.from({ length: 4 }, (_, index) =>
  `/assets/Work Images/paradigm-spaces-${String(index + 1).padStart(2, "0")}.webp`
);

const projectImageGroup = (slug, count) =>
  Array.from({ length: count }, (_, index) =>
    `/assets/Work Images/${slug}-${String(index + 1).padStart(2, "0")}.webp`
  );

const createImageProject = ({ slug, name, type, count, thumbIndex = 0, cover }) => {
  const images = projectImageGroup(slug, count);

  return {
    slug,
    name,
    type,
    year: "2026",
    img: cover || images[thumbIndex] || images[0],
    href: `/work/${slug}`,
    images
  };
};

const preloaderStorageKey = "nemo-preloader-seen";
const githubPagesBase = "/Nemo_design_website";
const siteBase = window.location.pathname === githubPagesBase || window.location.pathname.startsWith(`${githubPagesBase}/`)
  ? githubPagesBase
  : "";

function withBase(path) {
  if (!path || path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("#")) return path;
  if (path === "/") return siteBase || "/";
  return `${siteBase}${path}`;
}

function assetSrc(path) {
  return withBase(path);
}

function currentPath() {
  const pathname = window.location.pathname.startsWith(siteBase)
    ? window.location.pathname.slice(siteBase.length) || "/"
    : window.location.pathname;

  return pathname.replace(/\/$/, "") || "/";
}

function shouldShowPreloaderOnLoad() {
  if (currentPath() !== "/") return false;

  try {
    return sessionStorage.getItem(preloaderStorageKey) !== "true";
  } catch {
    return true;
  }
}

function markPreloaderSeen() {
  try {
    sessionStorage.setItem(preloaderStorageKey, "true");
  } catch {
    // Storage can be unavailable in some privacy modes; the page should still work.
  }
}

const initialPreloaderVisible = shouldShowPreloaderOnLoad();
markPreloaderSeen();

const state = {
  menuOpen: false,
  contactOpen: false,
  whatsappOpen: false,
  aboutCardFlipped: false,
  darkMode: localStorage.getItem("nemo-dark-mode") === "true",
  cookieVisible: localStorage.getItem("studio-cookies") !== "accepted",
  preloaderVisible: initialPreloaderVisible,
  preloaderStarted: false
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const whatsappUrl = "https://wa.me/917015016467?text=Hi%2C%20I%20want%20to%20talk%20to%20you%20regarding%20your%20services.";

const navItems = ["Home", "Work", "Services", "Approach"];

function StickyNote({ text, tone = "yellow", className = "" }) {
  return h(
    "span",
    { className: `sticky-note sticky-note-${tone} ${className}`, "aria-hidden": "true" },
    text
  );
}

function navHref(item) {
  const routes = {
    Home: "/",
    Work: "/work",
    Services: "/services",
    Approach: "/approach"
  };

  return withBase(routes[item] || "/");
}

const cities = [
  ["Paris, France", "Europe/Paris"],
  ["Los Angeles, CA", "America/Los_Angeles"],
  ["Barcelona, Spain", "Europe/Madrid"],
  ["Hong Kong, China", "Asia/Hong_Kong"]
];

const projects = [
  ["SOUL SOUP", "Branding | Packaging | Website Design", "", projectImageSet[0]],
  ["KOZMETYX", "Brand Strategy | Content | Packaging Design", "", projectImageSet[1]],
  ["MOXIE", "Brand Strategy | Brand Identity", "", projectImageSet[2]],
  ["FRASER STUDIOS", "Brand Strategy | Brand Identity | Website Design", "", projectImageSet[3]]
];

const projectHrefByName = {
  "SOUL SOUP": "/work/soul-soup",
  KOZMETYX: "/work/kozmetyx",
  MOXIE: "/work/moxie",
  "FRASER STUDIOS": "/work/fraser-studios"
};

const caseStudyProjects = [
  {
    slug: "kozmetyx",
    name: "Kozmetyx",
    type: "Branding and packaging design",
    year: "2026",
    img: "/assets/Work Images/work-listing-covers/kozmetyx.webp",
    href: "/work/kozmetyx",
    images: workImageSet
  },
  {
    slug: "paradigm-spaces",
    name: "Paradigm Spaces",
    type: "Rebrand and web design",
    year: "2026",
    img: "/assets/Work Images/work-listing-covers/paradigm-spaces.webp",
    href: "/work/paradigm-spaces",
    images: paradigmImageSet
  },
  createImageProject({
    slug: "farmers-mill",
    name: "Farmer's Mill",
    type: "Branding & packaging design",
    count: 14,
    cover: "/assets/Work Images/work-listing-covers/farmers-mill.webp"
  }),
  createImageProject({
    slug: "yama-yoga",
    name: "Yama Yoga",
    type: "Sustainable activewear",
    count: 2,
    cover: "/assets/Work Images/work-listing-covers/yama-yoga.webp"
  }),
  createImageProject({
    slug: "soul-soup",
    name: "Soul Soup",
    type: "Brand & web design",
    count: 16,
    cover: "/assets/Work Images/work-listing-covers/soul-soup.webp"
  }),
  createImageProject({
    slug: "physiotherapy-clinic",
    name: "Physiotherapy Clinic",
    type: "Website design",
    count: 2,
    cover: "/assets/Work Images/work-listing-covers/physiotherapy-clinic.webp"
  }),
  createImageProject({
    slug: "moxie",
    name: "Moxie",
    type: "Brand strategy & identity design",
    count: 16,
    cover: "/assets/Work Images/work-listing-covers/moxie.webp"
  }),
  createImageProject({
    slug: "fraser-studios",
    name: "Fraser Studios",
    type: "Rebrand identity",
    count: 14,
    cover: "/assets/Work Images/work-listing-covers/fraser-studios.webp"
  }),
  createImageProject({
    slug: "kiniva",
    name: "Kiniva",
    type: "Dry nuts brand identity & packaging",
    count: 5,
    cover: "/assets/Work Images/work-listing-covers/kiniva.webp"
  }),
  createImageProject({
    slug: "sustainable-mobility",
    name: "Sustainable Mobility",
    type: "Communication design",
    count: 23,
    cover: "/assets/Work Images/work-listing-covers/sustainable-mobility.webp"
  })
];

const services = [
  ["Brand Strategy", "Positioning brands through clarity, direction, and intentional thinking."],
  ["Brand Identity", "Crafting distinctive visual systems designed for recognition and long-term impact."],
  ["Website Design", "Building thoughtful websites that combine performance, functionality, and visual clarity."],
  ["Packaging Design", "Creating packaging systems that elevate perception and strengthen shelf presence."]
];

const testimonials = [
  {
    quote: "Nimar did really good quality work and was super cooperative during the whole project. I would definitely recommend Nimar for graphic design, website design, and product packaging.",
    author: "Emily Carter",
    role: "Support for UI/UX Design"
  },
  {
    quote: "She handled the iterations smoothly without any fuss and maintained clear communication throughout the process. Overall we are happy with the quality of work delivered.",
    author: "Nitish A.",
    role: "Packaging Designer"
  },
  {
    quote: "Nimar was brilliant to work with. She delivered high-quality designs for our brand Pleasure Merch, including our logo, website banner, email signature, and social media assets.",
    author: "Sash D.",
    role: "Logo, Social Media & Website Banner Design"
  },
  {
    quote: "It was great working with Nimar. She delivered to my expectation, was extremely cooperative, and displayed professionalism in her work. Her attention to detail is commendable.",
    author: "Kuldeep K.",
    role: "Graphic Designer for FMCG Website"
  },
  {
    quote: "Nimar was great, really responsive, would highly recommend.",
    author: "Michael Brooks",
    role: "Deck Design"
  },
  {
    quote: "Amazing designer, really appreciate all of her time.",
    author: "Sarah Mitchell",
    role: "Deck Redesign in New Branding"
  }
];

const servicePageServices = [
  {
    title: "Brand Strategy",
    kicker: "Direction",
    text: "Positioning brands through clarity, research, and intentional thinking. We define the foundation before anything visual is built, so every decision has a reason and every touchpoint moves in the same direction.",
    tags: ["Positioning", "Research & insights", "Brand platform", "Tone of voice", "Naming & tagline", "Audience clarity"]
  },
  {
    title: "Brand Identity",
    kicker: "Recognition",
    text: "Crafting distinctive visual systems designed for recognition and long-term impact. Logos, typography, color, layout rhythm, and guidelines are shaped into a brand world that feels clear, ownable, and ready to scale.",
    tags: ["Visual identity", "Art direction", "Logo system", "Brand book", "Visual assets", "Launch kit"]
  },
  {
    title: "Website Design",
    kicker: "Experience",
    text: "Building thoughtful websites that combine performance, functionality, and visual clarity. From structure and wireframes to crafted interfaces and smooth motion, the site is designed to feel premium and easy to use.",
    tags: ["UI / UX design", "Responsive design", "Wireframes", "GSAP motion", "CMS structure", "Conversion flow"]
  },
  {
    title: "Packaging Design",
    kicker: "Presence",
    text: "Creating packaging systems that elevate perception and strengthen shelf presence. Every label, surface, and hierarchy is designed to make the product feel memorable online, offline, and in hand.",
    tags: ["Packaging system", "Label design", "Product hierarchy", "Print-ready files", "Shelf impact", "Retail consistency"]
  }
];

const approachPrinciples = [
  {
    kicker: "Discover",
    title: "Find the edge",
    text: "We begin by understanding what makes the brand worth remembering. The market, audience, offer, tone, and ambition are studied closely so the work starts from a sharp point of difference."
  },
  {
    kicker: "Strategy",
    title: "Question the obvious",
    text: "Strong creative work comes from better questions. We challenge assumptions, simplify the brief, and turn scattered ideas into a clear direction that can guide every decision."
  },
  {
    kicker: "Design",
    title: "Shape the system",
    text: "Identity, website, packaging, and content are treated as one connected brand world. Every layout, word, image, and interaction is designed to feel consistent, premium, and useful."
  },
  {
    kicker: "Build",
    title: "Make it perform",
    text: "The experience needs to feel good and work hard. We build with clean structure, responsive behavior, smooth motion, and enough restraint to keep the brand fast and focused."
  }
];

const approachTimeline = [
  ["Kick-off", "Align goals, scope, timelines, and the exact outcome the brand needs."],
  ["Research", "Map the audience, competitors, references, and opportunities worth owning."],
  ["Direction", "Define the strategic idea, visual language, messaging rhythm, and experience logic."],
  ["Design", "Create the identity, key screens, packaging, or campaign system with precise detail."],
  ["Delivery", "Prepare final assets, handoff files, launch support, and guidance for the team."]
];

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function timeFor(zone) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: zone
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

function letters(text, offset = 0) {
  return text.split("").map((char, index) =>
    h(
      "span",
      {
        className: `hero-letter ${(index + offset) % 5 === 0 ? "is-accent" : ""}`,
        style: { "--delay": `${index * 0.018}s` },
        key: `${text}-${index}`
      },
      char === " " ? "\u00a0" : char
    )
  );
}

function PreloaderAnimation() {
  if (!state.preloaderVisible) return null;

  return h(
    "div",
    { className: "preloader-animation", "aria-label": "NEMO DESIGN STUDIOS intro animation" },
    h("div", { className: "preloader-stage" },
      h("div", { className: "preloader-type" },
        h("span", { className: "preloader-type-main" }, "NEMO DESIGN"),
        h("span", { className: "preloader-type-sub" }, "STUDIOS")
      )
    )
  );
}

function Header() {
  const toggleDarkMode = () => {
    const nextMode = !state.darkMode;
    localStorage.setItem("nemo-dark-mode", String(nextMode));
    setState({ darkMode: nextMode });
  };

  return h(
    "header",
    { className: "site-header" },
    h("a", { className: "brand", href: withBase("/"), "aria-label": "Home" },
      h(BrandMark)
    ),
    h("nav", { className: "desktop-nav", "aria-label": "Primary" },
      navItems.slice(0, 4).map((item) => h("a", { key: item, href: navHref(item) }, item))
    ),
    h("div", { className: "header-actions" },
      h("button", {
        className: "text-button menu-button",
        type: "button",
        "aria-label": "Open menu",
        onClick: () => setState({ menuOpen: true })
      },
        h("span", null),
        h("span", null),
        h("span", null)
      ),
      h("button", {
        className: "theme-toggle",
        type: "button",
        "aria-pressed": state.darkMode,
        onClick: toggleDarkMode
      }, state.darkMode ? "Light mode" : "Dark mode"),
      h("button", {
        className: "pill-button",
        "aria-label": "Open WhatsApp confirmation",
        onClick: () => setState({ whatsappOpen: true })
      }, "Let's talk")
    )
  );
}

function MenuOverlay() {
  return h(
    "div",
    { className: `overlay menu-overlay ${state.menuOpen ? "is-open" : ""}`, "aria-hidden": !state.menuOpen },
    h("button", { className: "overlay-close", onClick: () => setState({ menuOpen: false }) }, "Close"),
    h("div", { className: "menu-grid" },
      h("div", { className: "menu-intro" },
        h("p", null, "We craft bold design and precise web experiences."),
        h("button", {
          className: "pill-button inverse",
          "aria-label": "Open WhatsApp confirmation",
          onClick: () => setState({ menuOpen: false, whatsappOpen: true })
        }, "Let's talk")
      ),
      h("div", { className: "menu-links" },
        navItems.map((item, index) =>
          h("a", {
            key: item,
            href: navHref(item),
            onClick: () => setState({ menuOpen: false }),
            style: { "--delay": `${index * 0.04}s` }
          }, item)
        )
      ),
      h("div", { className: "clock-list" },
        cities.map(([city, zone]) =>
          h("div", { className: "clock-row", key: city },
            h("span", null, city),
            h("strong", null, timeFor(zone))
          )
        )
      )
    )
  );
}

function ContactModal() {
  return h(
    "div",
    { className: `overlay contact-overlay ${state.contactOpen ? "is-open" : ""}`, "aria-hidden": !state.contactOpen },
    h("button", { className: "overlay-close", onClick: () => setState({ contactOpen: false }) }, "Close"),
    h("section", { className: "contact-panel" },
      h("div", { className: "contact-copy" },
        h("p", { className: "eyebrow" }, "Contact us"),
        h("h2", null, "Let's work", h("br"), "together"),
        h("p", null, "Big project, wild thought, or a brand that needs sharper digital presence? Send the first note.")
      ),
      h("form", { className: "contact-form" },
        ["Name", "Email", "Phone"].map((label) =>
          h("label", { key: label }, h("span", null, label), h("input", { type: label === "Email" ? "email" : "text", placeholder: label === "Name" ? "Chuck Norris" : "" }))
        ),
        h("label", null,
          h("span", null, "Interest"),
          h("select", null,
            h("option", null, "Design"),
            h("option", null, "Webflow development"),
            h("option", null, "Full package")
          )
        ),
        h("label", { className: "wide" }, h("span", null, "Message"), h("textarea", { rows: "5" })),
        h("button", { className: "submit-button", type: "button" }, "Send")
      )
    )
  );
}

function WhatsAppModal() {
  if (!state.whatsappOpen) return null;

  return h(
    "div",
    {
      className: "whatsapp-modal-overlay",
      onClick: () => setState({ whatsappOpen: false }),
      "aria-hidden": false
    },
    h("section", {
      className: "whatsapp-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "whatsapp-modal-title",
      "aria-describedby": "whatsapp-modal-message",
      onClick: (event) => event.stopPropagation()
    },
      h("button", {
        className: "whatsapp-modal-close",
        "aria-label": "Close WhatsApp popup",
        onClick: () => setState({ whatsappOpen: false })
      }, "Close"),
      h("h3", { id: "whatsapp-modal-title" }, "Open WhatsApp?"),
      h("p", { id: "whatsapp-modal-message" }, "You will be redirected to WhatsApp to start a conversation with us."),
      h("div", { className: "whatsapp-modal-actions" },
        h("button", {
          className: "whatsapp-cancel",
          "aria-label": "Cancel WhatsApp redirect",
          onClick: () => setState({ whatsappOpen: false })
        }, "Cancel"),
        h("button", {
          className: "pill-button whatsapp-open",
          "aria-label": "Open WhatsApp chat in a new tab",
          onClick: () => {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            setState({ whatsappOpen: false });
          }
        }, "Open WhatsApp")
      )
    )
  );
}

function Hero() {
  return h(
    "section",
    { id: "top", className: "hero section-shell" },
    h("div", { className: "hero-copy" },
      h("h1", { className: "hero-title", "aria-label": "Thoughtful brands intentional experiences" },
        h("span", null, "THOUGHTFUL"),
        h("span", null, "BRANDS"),
        h("span", null, "INTENTIONAL"),
        h("span", null, "EXPERIENCES")
      )
    ),
    h(HeroCards)
  );
}

function HeroCards() {
  const rotations = [-8, 5, -3, 8, -6, 4, -10, 7];

  return h(
    "div",
    { className: "hero-card-stack", "aria-label": "Rotating project cards" },
    heroCardImages.map((src, index) =>
      h("figure", {
        className: "hero-stack-card",
        key: src,
        style: {
          "--card-index": index,
          "--card-rotate": `${rotations[index]}deg`
        }
      },
        h("img", {
          src: assetSrc(src),
          alt: `NEMO DESIGN STUDIOS project card ${index + 1}`,
          loading: index === 0 ? "eager" : "lazy"
        })
      )
    )
  );
}

function HeroMarquee() {
  const items = [
    "Food Brands",
    "Interior & Home Goods",
    "Cafe",
    "Restaurant",
    "Fashion",
    "SaaS companies",
    "Architecture"
  ];
  const marqueeItems = items.concat(items, items);

  return h(
    "section",
    { className: "hero-marquee", "aria-label": "Industries we work with" },
    h("div", { className: "hero-marquee-track" },
      marqueeItems.map((item, index) =>
        h("span", { key: `${item}-${index}` }, item)
      )
    )
  );
}

function ServicesBrandStrip() {
  const marqueeItems = Array.from({ length: 8 }, () => "BUILD A BRAND THAT TURNS HEAD");

  return h(
    "div",
    { className: "hero-marquee services-brand-strip", "aria-label": "Brand statement" },
    h("div", { className: "hero-marquee-track" },
      marqueeItems.map((item, index) =>
        h("span", { key: `${item}-${index}` }, item)
      )
    )
  );
}

function ApproachClarityStrip() {
  const marqueeItems = Array.from({ length: 8 }, () => "NO SECOND GUESSING, JUST CLARITY");

  return h(
    "div",
    { className: "hero-marquee approach-clarity-strip", "aria-label": "Approach statement" },
    h("div", { className: "hero-marquee-track" },
      marqueeItems.map((item, index) =>
        h("span", { key: `${item}-${index}` }, item)
      )
    )
  );
}

function Intro() {
  return h(
    "section",
    { id: "intro", className: "intro section-shell reveal" },
    h("div", { className: "intro-grid" },
      h("h2", null,
        h("span", { className: "intro-heading-line" }, "A Brand Is"),
        h("span", { className: "intro-heading-line" }, "Never Just"),
        h("span", { className: "intro-heading-line intro-logo-line" },
          "A Logo",
          h(StickyNote, { text: "Clarity before visuals", tone: "green", className: "note-intro" })
        )
      ),
      h("div", { className: "intro-lines" },
        h("p", null,
          "The strongest brands aren’t built through visuals alone.",
          h("br"),
          "They’re built through clarity, consistency, and intentional",
          h("br"),
          "experiences that shape how people feel, remember,",
          h("br"),
          "and trust a business."
        )
      )
    ),
    h("div", { className: "media-rail", "aria-label": "client logo display rail" },
      clientLogoSet.concat(clientLogoSet).map(([src, alt], index) =>
        h("div", { className: "client-logo-card", key: `${src}-${index}` },
          h("img", { src: assetSrc(src), alt, loading: "lazy" })
        )
      )
    )
  );
}

function Projects() {
  return h(
    "section",
    { id: "work", className: "projects section-shell reveal" },
    h("div", { className: "section-heading" },
      h("h2", null, "Selected projects")
    ),
    h("div", { className: "project-grid" },
      projects.map(([name, type, year, img], index) =>
        h("a", { className: "project-card project-card-link", href: withBase(projectHrefByName[name] || "/work"), key: name, style: { "--delay": `${index * 0.08}s` } },
          h("img", { src: assetSrc(img), alt: `${name} placeholder project visual`, loading: "lazy" }),
          h("div", { className: "video-label" }, h("span", null, "View case study")),
          h("footer", null,
            h("strong", null, name),
            h("span", null, year ? `${type}. ${year}.` : type)
          )
        )
      )
    ),
    h("div", { className: "project-actions" },
      h("a", { className: "pill-button project-view-more", href: withBase("/work") }, "View more")
    )
  );
}

function ApproachWorkPreview() {
  return h(
    "section",
    { className: "projects approach-work-preview section-shell reveal" },
    h("div", { className: "section-heading" },
      h("h2", null, "Selected projects")
    ),
    h("div", { className: "project-grid" },
      projects.slice(0, 2).map(([name, type, year, img], index) =>
        h("a", { className: "project-card project-card-link", href: withBase(projectHrefByName[name] || "/work"), key: name, style: { "--delay": `${index * 0.08}s` } },
          h("img", { src: assetSrc(img), alt: `${name} project visual`, loading: "lazy" }),
          h("div", { className: "video-label" }, h("span", null, "View case study")),
          h("footer", null,
            h("strong", null, name),
            h("span", null, year ? `${type}. ${year}.` : type)
          )
        )
      )
    ),
    h("div", { className: "project-actions" },
      h("a", { className: "pill-button project-view-more", href: withBase("/work") }, "View more")
    )
  );
}

function SocialIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  };

  if (type === "instagram") {
    return h("svg", common,
      h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "5" }),
      h("circle", { cx: "12", cy: "12", r: "3.5" }),
      h("circle", { cx: "16.5", cy: "7.5", r: "0.7", fill: "currentColor", stroke: "none" })
    );
  }

  if (type === "linkedin") {
    return h("svg", common,
      h("path", { d: "M7.2 10.2v7" }),
      h("path", { d: "M7.2 7.1h.01" }),
      h("path", { d: "M11.1 17.2v-7" }),
      h("path", { d: "M11.1 13.1c0-1.9 1.1-3 2.8-3 1.8 0 2.9 1.2 2.9 3.3v3.8" }),
      h("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "3.2" })
    );
  }

  return h("svg", common,
    h("rect", { x: "3.5", y: "6", width: "17", height: "12", rx: "2.2" }),
    h("path", { d: "m4.5 7 7.5 6 7.5-6" })
  );
}

function AboutMe() {
  return h(
    "section",
    { id: "about", className: "about-me section-shell reveal" },
    h("div", { className: "about-me-grid" },
      h("figure", { className: "about-me-media" },
        h("div", { className: `about-profile-card ${state.aboutCardFlipped ? "is-flipped" : ""}`, tabIndex: 0, "aria-label": "Nimar profile card" },
          h("div", { className: "about-card-inner" },
            h("div", { className: "about-card-face about-card-front" },
              h("div", { className: "about-orb about-orb-one", "aria-hidden": "true" }),
              h("div", { className: "about-orb about-orb-two", "aria-hidden": "true" }),
              h("img", {
                src: assetSrc("/assets/about/nimar-about-photo.jpeg"),
                alt: "Nimar Arora portrait",
                loading: "lazy"
              }),
              h("button", {
                className: "about-info-button",
                type: "button",
                "aria-label": "Flip profile card",
                "aria-pressed": state.aboutCardFlipped,
                onClick: (event) => {
                  event.stopPropagation();
                  setState({ aboutCardFlipped: !state.aboutCardFlipped });
                }
              }, "Flip Me"),
              h("span", { className: "about-demo-cursor", "aria-hidden": "true" })
            ),
            h("div", { className: "about-card-face about-card-back" },
              false && h("button", {
                className: "about-card-close",
                type: "button",
                "aria-label": "Show profile image",
                onClick: (event) => {
                  event.stopPropagation();
                  setState({ aboutCardFlipped: false });
                }
              }, "×"),
              h("p", { className: "about-card-kicker" }, "NEMO DESIGN STUDIOS"),
              h("h3", null, "Nimar Arora"),
              h("p", null, "Brand identity, packaging, and digital experiences shaped with clarity, consistency, and intent."),
              h("div", { className: "about-socials", "aria-label": "Social links" },
                h("a", { href: "https://www.instagram.com/nemodesignstudios?igsh=Y3cwNW5vYm5uOG5k", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram" }, h(SocialIcon, { type: "instagram" })),
                h("a", { href: "#", "aria-label": "LinkedIn" }, h(SocialIcon, { type: "linkedin" })),
                h("a", { href: "mailto:nemo.designn@gmail.com", "aria-label": "Gmail" }, h(SocialIcon, { type: "gmail" }))
              )
            )
          )
        )
      ),
      h("div", { className: "about-me-copy" },
        h("div", { className: "section-heading about-copy-heading" },
          h("div", { className: "heading-note-row" },
            h("h2", null, "The Human behind the studio"),
            h(StickyNote, { text: "Small studio,\nclose care", tone: "blue", className: "note-about" })
          )
        ),
        h("p", null,
          h("span", { className: "about-copy-first-line" }, "Hey, I’m Nimar, founder and creative lead at Nemo Design Studios."),
          h("br"),
          h("span", { className: "about-copy-rest" }, "What started as a solo design practice evolved into a small branding studio focused on building thoughtful, strategy-led brands for modern businesses. I believe branding should do more than just look good, it should create clarity, build trust, and leave a lasting impression. The studio stays intentionally small, which means every project stays collaborative, hands-on, and detail-focused. Somewhere between designer, strategist, and creative partner, that’s pretty much where you’ll find me.")
        )
      )
    )
  );
}

function Services() {
  return h(
    "section",
    { id: "services", className: "services section-shell reveal" },
    h("div", { className: "section-heading" },
      h("div", { className: "heading-note-row" },
        h("h2", null, "Services"),
        h(StickyNote, { text: "choose the path", tone: "yellow", className: "note-services" })
      ),
      h("a", { href: withBase("/services") }, "See all")
    ),
    h("div", { className: "service-list" },
      services.map(([title, text]) =>
        h("article", { className: "service-row", key: title },
          h("div", null, h("h3", null, title)),
          h("p", null, text)
        )
      )
    )
  );
}

function Testimonials() {
  const marqueeItems = testimonials.concat(testimonials);

  return h(
    "section",
    { className: "testimonials section-shell reveal" },
    h("div", { className: "section-heading testimonials-heading" },
      h("div", { className: "heading-note-row" },
        h("h2", null, "not just us", h("br"), "saying it"),
        h(StickyNote, { text: "client words", tone: "green", className: "note-testimonials" })
      ),
      h("button", {
        className: "testimonial-arrow",
        type: "button",
        "aria-label": "Scroll testimonials",
        onClick: () => document.querySelector(".testimonial-grid")?.scrollBy({ left: 380, behavior: "smooth" })
      }, "→")
    ),
    h("div", { className: "testimonial-grid" },
      marqueeItems.map((item, index) =>
        h("article", { className: "testimonial-card", key: `${item.author}-${index}`, style: { "--delay": `${(index % testimonials.length) * 0.08}s` } },
          h("p", null, item.quote),
          h("footer", null,
            h("strong", null, item.author),
            h("span", null, item.role)
          )
        )
      )
    )
  );
}

function ServicesPageContent() {
  return h(
    "section",
    { id: "services", className: "services services-studio section-shell reveal" },
    h("div", { className: "services-hero" },
      h("h2", null, "Build.", h("br"), "Launch.", h("br"), "Remember.")
    ),
    h(ServicesBrandStrip),
    h("div", { className: "service-list" },
      servicePageServices.map((service, index) =>
        h("article", { className: "service-row service-panel", key: service.title, style: { "--delay": `${index * 0.08}s` } },
          h("div", { className: "service-index" },
            h("span", null, String(index + 1).padStart(2, "0")),
            h("strong", null, service.kicker)
          ),
          h("div", { className: "service-body" },
            h("h3", null, service.title),
            h("p", null, service.text),
            h("div", { className: "service-tags" },
              service.tags.map((tag, tagIndex) =>
                h("span", { key: tag, style: { "--tag-delay": `${tagIndex * 0.035}s` } }, tag)
              )
            ),
            h("a", { className: "service-learn-more", href: "#contact" }, "Learn more")
          )
        )
      )
    )
  );
}

function ApproachPageContent() {
  return h(
    "div",
    { className: "approach-page-main" },
    h("section", { className: "approach-hero section-shell reveal" },
      h("h1", null,
        h("span", null, "Clear"),
        h("span", null, "Intentional"),
        h("span", null, "Built to last")
      )
    ),
    h(ApproachClarityStrip),
    h("section", { className: "approach-steps approach-process-showcase section-shell reveal" },
      h("div", { className: "approach-process-head" },
        h("h2", null, "A clear path from first call to launch-ready brand.")
      ),
      h("div", { className: "approach-step-list approach-process-list" },
        approachPrinciples.map((item, index) =>
          h("article", { className: "approach-step approach-process-card", key: item.title, style: { "--delay": `${index * 0.08}s` } },
            h("div", { className: "approach-step-meta" },
              h("span", null, String(index + 1).padStart(2, "0")),
              h("strong", null, item.kicker)
            ),
            h("div", { className: "approach-step-body" },
              h("h3", null, item.title),
              h("p", null, item.text)
            )
          )
        )
      )
    ),
    h(ApproachWorkPreview),
    h("section", { className: "approach-services-cta section-shell reveal" },
      h("div", { className: "approach-services-cta-inner" },
        h("h2", null, "Let's build a", h("br"), "strategic brand"),
        h("p", null, "Build a memorable brand where all your brand elements work in harmony so that your audience won't forget your lifestyle brand and form a deeper emotional connection."),
        h("a", { className: "pill-button approach-services-button", href: withBase("/services") }, "View services")
      )
    )
  );
}

function Footer() {
  return h(
    "footer",
    { id: "contact", className: "site-footer section-shell reveal" },
    h("div", { className: "cta-block" },
      h("h2", null, "Let's work", h("br"), "together"),
      h("p", null, "Work with us if average is not your thing. Drop it, we will build it."),
      h("button", { className: "pill-button inverse", onClick: () => setState({ whatsappOpen: true }) }, "say hello")
    ),
    h("div", { className: "footer-grid" },
      h("nav", null, navItems.slice(0, 4).map((item) => h("a", { key: item, href: navHref(item) }, item))),
      h("div", null, h("a", { href: "mailto:nemo.designn@gmail.com" }, "nemo.designn@gmail.com"), h("span", null, "Copyright 2026")),
      h("nav", null,
        h("a", { href: "#" }, "LinkedIn"),
        h("a", { href: "https://www.instagram.com/nemodesignstudios?igsh=Y3cwNW5vYm5uOG5k", target: "_blank", rel: "noopener noreferrer" }, "Instagram")
      )
    )
  );
}

function CookieBanner() {
  if (!state.cookieVisible) return null;
  return h(
    "div",
    { className: "cookie-banner" },
    h("p", null, "We use cookies only to improve the browsing experience."),
    h("button", {
      onClick: () => {
        localStorage.setItem("studio-cookies", "accepted");
        setState({ cookieVisible: false });
      }
    }, "Accept cookies")
  );
}

function ViewMoreProjectsButton() {
  return h("div", { className: "project-actions work-case-actions" },
    h("a", { className: "pill-button project-view-more", href: withBase("/work") }, "View More Projects")
  );
}

function WorkCaseStudy() {
  return h(
    "section",
    { id: "kozmetyx-case", className: "work-case section-shell" },
    h("figure", { className: "work-case-cover" },
      h("img", { src: assetSrc(workImageSet[0]), alt: "Kozmetyx campaign posters on a wall" })
    ),
    h("div", { className: "work-case-header" },
      h("div", { className: "work-case-intro" },
        h("div", { className: "project-overview" },
          h("h3", null, "Project Overview"),
          h("p", null, "Kozmetyx is a modern skincare brand built around one clear idea, formulations that actually work. The goal was to create a visual identity and packaging system that felt clean, science-backed, premium, and trustworthy while still standing out in the highly saturated skincare market."),
          h("p", null, "The challenge was to design a brand that balanced clinical credibility with a modern lifestyle aesthetic. Every visual decision was made to communicate clarity, confidence, and effectiveness.")
        )
      ),
      h("dl", null,
        h("div", null, h("dt", null, "Tools"), h("dd", null, "Adobe Illustrator, Adobe Photoshop, Figma")),
        h("div", null, h("dt", null, "Skills"), h("dd", null, "Brand design, brand strategy, packaging design")),
        h("div", null, h("dt", null, "Source"), h("dd", null, "Contra project reference"))
      )
    ),
    h("div", { className: "work-case-gallery" },
      workImageSet.slice(1).flatMap((image, index) => {
        const figure = h("figure", { key: image },
          h("img", { src: assetSrc(image), alt: `Kozmetyx case study visual ${index + 2}`, loading: "lazy" })
        );
        const items = [figure];

        if (index === 0) {
          items.push(
            h("article", { className: "work-case-text-break", key: "creative-direction" },
              h("h3", null, "Creative Direction"),
              h("div", null,
                h("p", null, "The creative direction focused on creating a refined and functional visual language. The branding system was built around simplicity and recognition."),
                h("p", null, "A strong typographic approach paired with carefully balanced spacing helped create a premium visual rhythm across all touchpoints. The logo and packaging layouts were intentionally designed to avoid unnecessary clutter, allowing the products to feel sophisticated and trustworthy.")
              )
            )
          );
        }

        if (index === 1) {
          items.push(
            h("article", { className: "work-case-text-break", key: "brand-messaging-concept" },
              h("h3", null, "Brand Messaging Concept"),
              h("div", null,
                h("p", null, "One of the core creative ideas behind the brand was building the messaging system around the name itself."),
                h("p", null,
                  "The brand name Kozmetyx was strategically divided into two parts ",
                  h("em", null, "KOZ"),
                  " and ",
                  h("em", null, "METYX"),
                  " allowing the identity to develop a distinctive verbal language. The word ",
                  h("em", null, "KOZ"),
                  " became the foundation for the brand's communication style and was used prominently across packaging and marketing copy."
                ),
                h("p", null, "This approach helped create a recognizable and ownable brand voice while making the communication feel more engaging, modern, and memorable."),
                h("p", null, "Using the brand name as a messaging device added personality to the otherwise minimal visual system and strengthened overall brand recall.")
              )
            )
          );
        }

        if (index === 3) {
          items.push(
            h("article", { className: "work-case-text-break", key: "packaging-design" },
              h("h3", null, "Packaging Design"),
              h("div", null,
                h("p", null, "The packaging design was developed to create strong shelf presence while maintaining a clean and modern aesthetic."),
                h("p", null, "Each product was designed with a structured layout system that improves readability and reinforces the brand's clinical yet approachable positioning. The packaging balances minimalism with enough visual distinction to remain memorable both online and offline.The result is a packaging system that feels modern, cohesive, and highly recognizable.")
              )
            )
          );
        }

        if (index === workImageSet.slice(1).length - 1) {
          items.push(
            h("article", { className: "work-case-text-break work-case-outcome", key: "design-outcome" },
              h("h3", null, "Design Outcome"),
              h("div", null,
                h("p", null, "The project resulted in a visually cohesive brand experience designed to perform across retail, digital, and social platforms.")
              )
            )
          );
        }

        return items;
      }),
      h(ViewMoreProjectsButton)
    )
  );
}

function ParadigmCaseStudy() {
  return h(
    "section",
    { id: "paradigm-spaces-case", className: "work-case section-shell is-vertical-case" },
    h("figure", { className: "work-case-cover" },
      h("img", { src: assetSrc(paradigmImageSet[0]), alt: "Paradigm Spaces rebrand and website presentation" })
    ),
    h("div", { className: "work-case-gallery" },
      paradigmImageSet.slice(1).map((image, index) =>
        h("figure", { key: image },
          h("img", { src: assetSrc(image), alt: `Paradigm Spaces case study visual ${index + 2}`, loading: "lazy" })
        )
      ),
      h(ViewMoreProjectsButton)
    )
  );
}

function ImageOnlyCaseStudy({ project }) {
  return h(
    "section",
    { id: `${project.slug}-case`, className: "work-case section-shell is-vertical-case is-image-only-case" },
    h("div", { className: "work-case-gallery" },
      project.images.map((image, index) =>
        h("figure", { key: image },
          h("img", { src: assetSrc(image), alt: `${project.name} case study visual ${index + 1}`, loading: index === 0 ? "eager" : "lazy" })
        )
      ),
      h(ViewMoreProjectsButton)
    )
  );
}

function ProjectsOverviewPage() {
  return h(
    "div",
    { className: "home-content work-page projects-overview-page" },
    h(Header),
    h("section", { className: "projects section-shell projects-overview" },
      h("div", { className: "section-heading" },
        h("h2", null, "All Projects")
      ),
      h("div", { className: "project-grid" },
        caseStudyProjects.map((project, index) =>
          h("a", {
            className: "project-card project-card-link",
            href: withBase(project.href),
            key: project.name,
            style: { "--delay": `${index * 0.08}s` }
          },
            h("img", {
              src: assetSrc(project.img),
              alt: `${project.name} project visual`,
              loading: index < 2 ? "eager" : "lazy",
              decoding: "async",
              fetchPriority: index < 2 ? "high" : "low"
            }),
            h("div", { className: "video-label" }, h("span", null, "View case study")),
            h("footer", null,
              h("strong", null, project.name),
              h("span", null, `${project.type}. ${project.year}.`)
            )
          )
        )
      )
    ),
    h(Footer),
    h(MenuOverlay),
    h(ContactModal),
    h(WhatsAppModal),
    h("div", { className: "scroll-progress", "aria-hidden": "true" })
  );
}

function WorkPage({ project, caseStudy = "kozmetyx" } = {}) {
  const CaseStudy = project
    ? () => h(ImageOnlyCaseStudy, { project })
    : caseStudy === "paradigm-spaces"
      ? ParadigmCaseStudy
      : WorkCaseStudy;

  return h(
    "div",
    { className: "home-content work-page" },
    h(Header),
    h(CaseStudy),
    h(Footer),
    h(MenuOverlay),
    h(ContactModal),
    h(WhatsAppModal),
    h("div", { className: "cursor-dot", "aria-hidden": "true" }),
    h("div", { className: "scroll-progress", "aria-hidden": "true" })
  );
}

function Home() {
  return h(
    "div",
    { className: "home-content" },
    h(Header),
    h(Hero),
    h(HeroMarquee),
    h(Intro),
    h(Projects),
    h(AboutMe),
    h(Services),
    h(Testimonials),
    h(Footer),
    h(MenuOverlay),
    h(ContactModal),
    h(WhatsAppModal),
    h("div", { className: "cursor-dot", "aria-hidden": "true" }),
    h("div", { className: "scroll-progress", "aria-hidden": "true" })
  );
}

function ServicesPage() {
  return h(
    "div",
    { className: "home-content services-page" },
    h(Header),
    h(ServicesPageContent),
    h(Testimonials),
    h(Footer),
    h(MenuOverlay),
    h(ContactModal),
    h(WhatsAppModal),
    h("div", { className: "cursor-dot", "aria-hidden": "true" }),
    h("div", { className: "scroll-progress", "aria-hidden": "true" })
  );
}

function ApproachPage() {
  return h(
    "div",
    { className: "home-content approach-page" },
    h(Header),
    h(ApproachPageContent),
    h(Testimonials),
    h(Footer),
    h(MenuOverlay),
    h(ContactModal),
    h(WhatsAppModal),
    h("div", { className: "cursor-dot", "aria-hidden": "true" }),
    h("div", { className: "scroll-progress", "aria-hidden": "true" })
  );
}

function App() {
  const path = currentPath();
  const isWorkIndexPage = path === "/work" || path === "/projects";
  const isKozmetyxCasePage = path === "/work/kozmetyx";
  const isServicesPage = path === "/services";
  const isApproachPage = path === "/approach";
  const routeClass = path === "/" ? "is-home-route" : "is-internal-route";
  const imageProject = caseStudyProjects.find((project) => project.href === path && project.slug !== "kozmetyx");

  return h(
    "main",
    { className: `app-frame ${routeClass} ${state.preloaderVisible ? "is-preloading" : "is-ready"}` },
    h(PreloaderAnimation),
    isApproachPage ? h(ApproachPage) : isServicesPage ? h(ServicesPage) : isWorkIndexPage ? h(ProjectsOverviewPage) : isKozmetyxCasePage ? h(WorkPage) : imageProject ? h(WorkPage, { project: imageProject }) : h(Home),
    h(CookieBanner)
  );
}

let observer;
let preloaderFallbackTimer;

function finishPreloader() {
  window.clearTimeout(preloaderFallbackTimer);
  markPreloaderSeen();
  document.body.classList.remove("is-preloading");
  setState({ preloaderVisible: false });
}

function runPreloaderAnimation() {
  if (!state.preloaderVisible || state.preloaderStarted) return;

  const overlay = document.querySelector(".preloader-animation");
  if (!overlay) {
    finishPreloader();
    return;
  }

  state.preloaderStarted = true;
  markPreloaderSeen();
  document.body.classList.add("is-preloading");

  const reduceMotion = prefersReducedMotion();
  if (window.gsap && !reduceMotion) {
    const { gsap } = window;
    gsap.set(overlay, { autoAlpha: 1, y: 0 });
    gsap.set(".preloader-type span", { autoAlpha: 0, y: 28, filter: "blur(8px)" });

    gsap.timeline({ onComplete: finishPreloader })
      .to(".preloader-type-main", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }, 0.05)
      .to(".preloader-type-sub", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }, 0.18)
      .to(".preloader-type", { y: -8, duration: 0.3, ease: "power2.inOut" }, 0.78)
      .to(overlay, { autoAlpha: 0, y: -24, duration: 0.34, ease: "power3.inOut" }, 0.98);

    preloaderFallbackTimer = window.setTimeout(finishPreloader, 1600);
    return;
  }

  overlay.classList.add("is-css-running");
  preloaderFallbackTimer = window.setTimeout(finishPreloader, reduceMotion ? 500 : 1500);
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let gsapContext;
let animatedRoute = "";

function initGsapAnimations() {
  if (state.preloaderVisible || prefersReducedMotion() || !window.gsap) return;

  const path = currentPath();
  if (animatedRoute === path) return;

  if (gsapContext && typeof gsapContext.revert === "function") {
    gsapContext.revert();
  }

  animatedRoute = path;
  const { gsap, ScrollTrigger } = window;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsapContext = gsap.context(() => {
    const scrollDefaults = ScrollTrigger
      ? { start: "top 84%", once: true }
      : null;

    gsap.fromTo(".hero-title > span",
      { yPercent: 105, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.09, ease: "power3.out", delay: 0.08 }
    );

    gsap.utils.toArray(".section-heading, .services-hero h2, .approach-copy h2, .approach-statement h2, .approach-roadmap-head h2, .cta-block h2, .work-case-text-break h3").forEach((element) => {
      gsap.fromTo(element,
        { y: 34, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: ScrollTrigger ? { trigger: element, ...scrollDefaults } : undefined
        }
      );
    });

    gsap.utils.toArray(".intro-lines p, .services-hero p:not(.eyebrow), .service-body p, .approach-hero-copy p, .approach-copy p, .approach-step-body p, .approach-roadmap-head p:not(.eyebrow), .approach-timeline-item p, .cta-block p, .project-overview p, .work-case-text-break p").forEach((element) => {
      gsap.fromTo(element,
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: ScrollTrigger ? { trigger: element, ...scrollDefaults } : undefined
        }
      );
    });

    gsap.utils.toArray(".project-grid").forEach((grid) => {
      gsap.fromTo(grid.querySelectorAll(".project-card"),
        { y: 54, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: ScrollTrigger ? { trigger: grid, start: "top 82%", once: true } : undefined
        }
      );
    });

    gsap.utils.toArray(".service-list").forEach((list) => {
      gsap.fromTo(list.querySelectorAll(".service-panel"),
        { y: 58, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.92,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: ScrollTrigger ? { trigger: list, start: "top 82%", once: true } : undefined
        }
      );
    });

    gsap.utils.toArray(".approach-step-list, .approach-timeline").forEach((list) => {
      gsap.fromTo(list.children,
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.88,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: ScrollTrigger ? { trigger: list, start: "top 82%", once: true } : undefined
        }
      );
    });

    gsap.utils.toArray(".work-case-cover img, .work-case-gallery img").forEach((image) => {
      gsap.fromTo(image,
        { scale: 1.08, autoAlpha: 0.72 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: ScrollTrigger ? { trigger: image, start: "top 88%", once: true } : undefined
        }
      );
    });
  });

  if (ScrollTrigger) window.setTimeout(() => ScrollTrigger.refresh(), 80);
}

function bindProjectParallax() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll(".project-card").forEach((card) => {
    if (card.dataset.parallaxBound) return;

    card.dataset.parallaxBound = "true";
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -16;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -16;
      card.style.setProperty("--card-img-x", `${x}px`);
      card.style.setProperty("--card-img-y", `${y}px`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--card-img-x", "0px");
      card.style.setProperty("--card-img-y", "0px");
    });
  });
}

let heroCardStackTimer = null;

function bindHeroCardStack() {
  if (heroCardStackTimer) {
    clearInterval(heroCardStackTimer);
    heroCardStackTimer = null;
  }

  const stack = document.querySelector(".hero-card-stack");
  if (!stack) return;

  const cards = Array.from(stack.querySelectorAll(".hero-stack-card"));
  if (!cards.length) return;

  let active = 0;
  const update = () => {
    cards.forEach((card, index) => {
      const depth = (index - active + cards.length) % cards.length;
      card.style.setProperty("--depth", depth);
      card.style.zIndex = String(cards.length - depth);
      card.classList.toggle("is-front", depth === 0);
    });
    active = (active + 1) % cards.length;
  };

  update();
  if (!prefersReducedMotion()) heroCardStackTimer = window.setInterval(update, 1100);
}

function bindPageTransitions() {
  // Navigation should happen immediately; no page-color transition overlay.
}

function afterRender() {
  document.body.classList.toggle("is-locked", state.menuOpen || state.contactOpen || state.whatsappOpen || state.preloaderVisible);
  document.body.classList.toggle("is-dark-mode", state.darkMode);
  runPreloaderAnimation();
  bindPageTransitions();
  bindProjectParallax();
  bindHeroCardStack();
  initGsapAnimations();

  if (state.whatsappOpen) {
    window.setTimeout(() => {
      document.querySelector(".whatsapp-open")?.focus();
    }, 0);
  }

  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

function render() {
  root.render(h(App));
  setTimeout(afterRender, 0);
}

window.__afterStudioRender = afterRender;

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.whatsappOpen) {
    setState({ whatsappOpen: false });
  }
});

window.addEventListener("scroll", () => {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty("--scroll-progress", `${window.scrollY / max}`);
});

window.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
});

setInterval(() => {
  if (state.menuOpen) render();
}, 60000);

render();

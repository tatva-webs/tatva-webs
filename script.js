// TATVA WEBS — editable business settings
const TATVA_CONFIG = {
  email: "hello@tatvawebs.com", // Replace with your real business email
  whatsapp: "",                // Add country code + number, digits only. Example: 919876543210
  instagram: "",               // Add your Instagram URL
  linkedin: ""                 // Add your LinkedIn URL
};

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  if (loader) window.addEventListener("load", () => setTimeout(() => loader.classList.add("done"), 550));
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Keep active navigation in sync with current page.
  const page = document.body.dataset.page;
  document.querySelectorAll(".main-nav a").forEach(a => {
    const target = a.getAttribute("href").replace(".html", "");
    if ((page === "home" && target === "index") || target === page) a.classList.add("active");
  });

  // Mobile navigation.
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Reveal elements as they enter the viewport.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
  if (document.body.dataset.page === "process") {
    document.querySelectorAll(".info-card").forEach((card, index) => card.setAttribute("data-stage", String(index + 1).padStart(2, "0")));
  }

  // Scroll progress.
  const progress = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true }); updateProgress();

  // Desktop cursor and magnetic buttons.
  const dot = document.querySelector(".cursor-dot"), ring = document.querySelector(".cursor-ring");
  if (window.matchMedia("(pointer:fine)").matches) {
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    document.addEventListener("mousemove", e => {
      x = e.clientX; y = e.clientY;
      document.documentElement.style.setProperty("--cursor-x", x + "px");
      document.documentElement.style.setProperty("--cursor-y", y + "px");
      if (dot) { dot.style.opacity = "1"; dot.style.left = x + "px"; dot.style.top = y + "px"; }
      if (ring) ring.style.opacity = "1";
    });
    const follow = () => {
      rx += (x - rx) * .16; ry += (y - ry) * .16;
      if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
      requestAnimationFrame(follow);
    }; follow();
    document.querySelectorAll("a,button,summary").forEach(el => {
      el.addEventListener("mouseenter", () => ring?.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring?.classList.remove("hover"));
    });
    document.addEventListener("mousedown", () => {
      if (ring) { ring.style.width = "22px"; ring.style.height = "22px"; }
    });
    document.addEventListener("mouseup", () => {
      if (ring) { ring.style.width = ""; ring.style.height = ""; }
    });
    document.querySelectorAll(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width/2), dy = e.clientY - (r.top + r.height/2);
        el.style.transform = `translate(${dx*.12}px,${dy*.18}px)`;
      });
      el.addEventListener("mouseleave", () => el.style.transform = "");
    });
    // Subtle 3D tilt for glass cards.
    document.querySelectorAll(".tilt-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect(), px = (e.clientX-r.left)/r.width, py = (e.clientY-r.top)/r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5-py)*5}deg) rotateY(${(px-0.5)*7}deg) translateY(-3px)`;
        card.style.setProperty("--mx", `${px*100}%`); card.style.setProperty("--my", `${py*100}%`);
      });
      card.addEventListener("mouseleave", () => card.style.transform = "");
    });
    // Cursor-following hero glow.
    const art = document.querySelector(".hero-art");
    if (art) art.addEventListener("mousemove", e => {
      const r = art.getBoundingClientRect();
      art.style.setProperty("--spot-x", `${e.clientX-r.left}px`);
      art.style.setProperty("--spot-y", `${e.clientY-r.top}px`);
    });
  }

  // Contact details and honest mailto-based form fallback (no backend implied).
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = TATVA_CONFIG.email);
  document.querySelectorAll("[data-email-link]").forEach(el => el.href = "mailto:" + TATVA_CONFIG.email);
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    if (TATVA_CONFIG.whatsapp) { el.textContent = "Chat with us"; el.href = "https://wa.me/" + TATVA_CONFIG.whatsapp; }
  });
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Tatva Webs project enquiry — " + data.get("name"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\\nEmail: ${data.get("email")}\\nCompany: ${data.get("company")}\\nProject type: ${data.get("project")}\\n\\nProject details:\\n${data.get("details")}`
    );
    window.location.href = `mailto:${TATVA_CONFIG.email}?subject=${subject}&body=${body}`;
    const note = document.getElementById("form-note");
    if (note) note.textContent = "Your email app should open with the enquiry prepared. Please send it from your email app to complete the enquiry.";
  });
});

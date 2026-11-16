
/* =========================================================
   TATVA WEBS — ADVANCED INTERACTIONS
   MIDNIGHT BLUE × ELECTRIC CYAN
========================================================= */

"use strict";

/* =========================
   CONFIGURATION
========================= */

const TATVA_CONFIG = {
  email: "tatvawebs@gmail.com",
  instagram: "https://www.instagram.com/tatva_webs/",
  whatsapp: "",
  linkedin: "",
  logo: "tatva-webs-logo.png"
};

/* =========================
   HELPERS
========================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const hasFinePointer = window.matchMedia(
  "(pointer: fine)"
).matches;

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

/* =========================
   MAIN INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-enabled");

  document.documentElement.style.setProperty(
    "--accent",
    "#00D9FF"
  );

  initializeYear();
  initializeFavicon();
  initializeSocialLinks();
  initializePreloader();
  initializeAmbientBackground();
  initializeMobileNavigation();
  initializeActiveNavigation();
  initializeScrollEffects();
  initializeRevealAnimations();
  initializeStaggerAnimations();
  initializeFAQ();
  initializeContactForm();
  initializeBackToTop();
  initializeImageEffects();
  initializeSmoothScrolling();
  initializePageTransitions();

  if (!prefersReducedMotion) {
    initializeHeroParallax();
    initializeMagneticButtons();
    initializeTiltCards();

    if (hasFinePointer) {
      initializeCustomCursor();
    }
  }

  console.log(
    "%c TATVA WEBS ",
    "background:#00D9FF;color:#070B18;font-weight:900;padding:8px 14px;border-radius:5px;"
  );

  console.log(
    "%cDigital experiences. Built with purpose.",
    "color:#8CEBFF;font-size:12px;"
  );
});

/* =========================
   CURRENT YEAR
========================= */

function initializeYear() {
  $$("[data-year], #year, .current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}

/* =========================
   FAVICON
========================= */

function initializeFavicon() {
  if ($('link[rel="icon"]')) return;

  const favicon = document.createElement("link");

  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = TATVA_CONFIG.logo;

  document.head.appendChild(favicon);
}

/* =========================
   SOCIAL LINKS
========================= */

function initializeSocialLinks() {
  $$("[data-instagram]").forEach(link => {
    link.href = TATVA_CONFIG.instagram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  $$("[data-email]").forEach(link => {
    link.href = `mailto:${TATVA_CONFIG.email}`;
  });

  $$("[data-whatsapp]").forEach(link => {
    if (TATVA_CONFIG.whatsapp) {
      link.href = TATVA_CONFIG.whatsapp;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  $$("[data-linkedin]").forEach(link => {
    if (TATVA_CONFIG.linkedin) {
      link.href = TATVA_CONFIG.linkedin;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

/* =========================
   PRELOADER
========================= */

function initializePreloader() {
  const loader = $(
    ".preloader, #preloader, .page-loader"
  );

  let loaderRemoved = false;

  function removeLoader() {
    if (loaderRemoved) return;

    loaderRemoved = true;

    document.body.classList.add("loaded");
    document.documentElement.classList.add("page-loaded");

    if (!loader) return;

    loader.classList.add("loaded");

    window.setTimeout(() => {
      loader.remove();
    }, 700);
  }

  if (document.readyState === "complete") {
    removeLoader();
  } else {
    window.addEventListener("load", removeLoader, {
      once: true
    });
  }

  // Fallback if the load event takes too long.
  window.setTimeout(removeLoader, 4500);
}

/* =========================
   AMBIENT BACKGROUND
========================= */

function initializeAmbientBackground() {
  const ambient = $(".ambient-3d");

  if (!ambient || ambient.dataset.initialized === "true") {
    return;
  }

  ambient.dataset.initialized = "true";

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3; i++) {
    const orb = document.createElement("div");

    orb.className = `ambient-orb ambient-orb-${i + 1}`;

    fragment.appendChild(orb);
  }

  ambient.appendChild(fragment);
}

/* =========================
   MOBILE NAVIGATION
========================= */

function initializeMobileNavigation() {
  const toggle = $(
    ".menu-toggle, .nav-toggle, [data-menu-toggle]"
  );

  const navigation = $(
    ".main-nav, .nav-links, #main-navigation"
  );

  if (!toggle || !navigation) return;

  toggle.setAttribute("aria-controls", navigation.id || "main-navigation");
  navigation.id ||= "main-navigation";

  function setMenuState(open) {
    toggle.classList.toggle("active", open);
    navigation.classList.toggle("active", open);
    navigation.classList.toggle("open", open);

    toggle.setAttribute("aria-expanded", String(open));

    document.body.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", event => {
    event.stopPropagation();

    const isOpen =
      toggle.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  $$(".main-nav a, .nav-links a, #main-navigation a").forEach(link => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", event => {
    if (
      !navigation.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setMenuState(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      setMenuState(false);
    }
  });
}

/* =========================
   ACTIVE NAVIGATION
========================= */

function initializeActiveNavigation() {
  const currentPath = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  const currentPage = currentPath || "index.html";

  $$("nav a, .main-nav a, .nav-links a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) return;

    try {
      const linkURL = new URL(href, window.location.href);

      if (linkURL.origin !== window.location.origin) return;

      const linkPage = linkURL.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

      const isActive = linkPage === currentPage;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    } catch {
      // Ignore invalid URLs.
    }
  });
}

/* =========================
   SCROLL PROGRESS + HEADER
========================= */

function initializeScrollEffects() {
  const progress = $(
    ".scroll-progress, #scroll-progress"
  );

  const header = $(
    ".site-header, header"
  );

  let ticking = false;

  function updateScroll() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    if (progress) {
      progress.style.width = `${percentage}%`;
    }

    if (header) {
      header.classList.toggle(
        "scrolled",
        scrollTop > 40
      );
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  updateScroll();
}

/* =========================
   REVEAL ANIMATIONS
========================= */

function initializeRevealAnimations() {
  const elements = $$(
    ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale"
  );

  if (!elements.length) return;

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach(element => {
      element.classList.add("visible", "revealed");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "visible",
            "revealed"
          );

          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  elements.forEach(element => {
    observer.observe(element);
  });
}

/* =========================
   STAGGER ANIMATIONS
========================= */

function initializeStaggerAnimations() {
  const groups = $$(
    ".service-card, .project-card, .pricing-card, .value-card"
  );

  groups.forEach((element, index) => {
    const delay = Math.min(index % 6, 5) * 100;

    element.style.setProperty(
      "--stagger-delay",
      `${delay}ms`
    );
  });
}

/* =========================
   CUSTOM CURSOR
========================= */

function initializeCustomCursor() {
  const cursor = $(".custom-cursor, #custom-cursor");
  const follower = $(".cursor-follower, #cursor-follower");

  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  let animationFrame = null;
  let active = true;

  document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  function animateFollower() {
    if (!active) return;

    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    animationFrame = requestAnimationFrame(
      animateFollower
    );
  }

  animateFollower();

  const interactiveElements = $$(
    "a, button, input, textarea, select, [role='button']"
  );

  interactiveElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      follower.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      follower.classList.remove("active");
    });
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.add("hidden");
    follower.classList.add("hidden");
  });

  document.addEventListener("mouseenter", () => {
    cursor.classList.remove("hidden");
    follower.classList.remove("hidden");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      active = false;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    } else if (!active) {
      active = true;
      animateFollower();
    }
  });
}

/* =========================
   MAGNETIC BUTTONS
========================= */

function initializeMagneticButtons() {
  if (!hasFinePointer) return;

  $$("[data-magnetic], .magnetic").forEach(button => {
    button.addEventListener("mousemove", event => {
      const rect = button.getBoundingClientRect();

      const x =
        event.clientX - rect.left - rect.width / 2;

      const y =
        event.clientY - rect.top - rect.height / 2;

      const strength = 0.16;

      button.style.translate =
        `${x * strength}px ${y * strength}px`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.translate = "";
    });
  });
}

/* =========================
   3D TILT CARDS
========================= */

function initializeTiltCards() {
  if (!hasFinePointer) return;

  $$("[data-tilt], .tilt-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 8;
      const rotateY = (x - 0.5) * 8;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================
   HERO PARALLAX
========================= */

function initializeHeroParallax() {
  if (!hasFinePointer) return;

  const scenes = $$(
    ".hero-scene, .hero-visual, .hero-scene-glow, .hero-orbit, .hero-core, .core-sphere, .hero-interface, .hero-spark"
  );

  if (!scenes.length) return;

  let frame = null;
  let pointerX = 0;
  let pointerY = 0;

  document.addEventListener("mousemove", event => {
    pointerX =
      (event.clientX / window.innerWidth - 0.5) * 2;

    pointerY =
      (event.clientY / window.innerHeight - 0.5) * 2;

    if (frame) return;

    frame = requestAnimationFrame(() => {
      scenes.forEach((scene, index) => {
        const depth = (index % 5 + 1) * 3;

        scene.style.setProperty(
          "--parallax-x",
          `${pointerX * depth}px`
        );

        scene.style.setProperty(
          "--parallax-y",
          `${pointerY * depth}px`
        );
      });

      frame = null;
    });
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    scenes.forEach(scene => {
      scene.style.setProperty("--parallax-x", "0px");
      scene.style.setProperty("--parallax-y", "0px");
    });
  });
}

/* =========================
   FAQ ACCORDION
========================= */

function initializeFAQ() {
  const items = $$(".faq-item");

  items.forEach((item, index) => {
    const question = $(
      ".faq-question, .faq-header, button",
      item
    );

    const answer = $(".faq-answer", item);

    if (!question || !answer) return;

    if (!answer.id) {
      answer.id = `faq-answer-${index + 1}`;
    }

    question.setAttribute("aria-controls", answer.id);

    const initiallyOpen =
      item.classList.contains("active");

    question.setAttribute(
      "aria-expanded",
      String(initiallyOpen)
    );

    answer.style.maxHeight = initiallyOpen
      ? `${answer.scrollHeight}px`
      : "0px";

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close other FAQ items.
      items.forEach(otherItem => {
        if (otherItem === item) return;

        otherItem.classList.remove("active");

        const otherQuestion = $(
          ".faq-question, .faq-header, button",
          otherItem
        );

        const otherAnswer = $(
          ".faq-answer",
          otherItem
        );

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        if (otherAnswer) {
          otherAnswer.style.maxHeight = "0px";
        }
      });

      item.classList.toggle("active", !isOpen);

      question.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      answer.style.maxHeight = !isOpen
        ? `${answer.scrollHeight}px`
        : "0px";
    });
  });
}

/* =========================
   CONTACT FORM
========================= */

function initializeContactForm() {
  const form = $(
    "#contact-form, .contact-form"
  );

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(form);

    const name =
      formData.get("name")?.toString().trim() || "";

    const email =
      formData.get("email")?.toString().trim() || "";

    const subject =
      formData.get("subject")?.toString().trim() ||
      "New Website Enquiry";

    const message =
      formData.get("message")?.toString().trim() || "";

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    const mailto =
      `mailto:${TATVA_CONFIG.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}

/* =========================
   BACK TO TOP
========================= */

function initializeBackToTop() {
  const button = $(
    ".back-to-top, #back-to-top, [data-back-to-top]"
  );

  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth"
    });
  });

  window.addEventListener("scroll", () => {
    button.classList.toggle(
      "visible",
      window.scrollY > 450
    );
  }, { passive: true });
}

/* =========================
   IMAGE EFFECTS
========================= */

function initializeImageEffects() {
  const images = $$(
    ".project-image img, .service-image img, .image-reveal img"
  );

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    images.forEach(image => {
      image.classList.add("visible", "revealed");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "visible",
            "revealed"
          );

          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  images.forEach(image => observer.observe(image));
}

/* =========================
   SMOOTH ANCHOR SCROLLING
========================= */

function initializeSmoothScrolling() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const hash = link.getAttribute("href");

      if (!hash || hash === "#") return;

      const target = document.getElementById(
        decodeURIComponent(hash.slice(1))
      );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "start"
      });

      if (history.pushState) {
        history.pushState(null, "", hash);
      }
    });
  });
}

/* =========================
   PAGE TRANSITIONS
========================= */

function initializePageTransitions() {
  $$("a[href]").forEach(link => {
    link.addEventListener("click", event => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      let destination;

      try {
        destination = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (destination.origin !== window.location.origin) {
        return;
      }

      if (!destination.pathname.toLowerCase().endsWith(".html")) {
        return;
      }

      const currentURL = new URL(window.location.href);

      const samePage =
        destination.pathname === currentURL.pathname &&
        destination.search === currentURL.search;

      if (samePage) return;

      event.preventDefault();

      if (prefersReducedMotion) {
        window.location.href = destination.href;
        return;
      }

      document.body.classList.add("page-leaving");

      window.setTimeout(() => {
        window.location.href = destination.href;
      }, 300);
    });
  });
}

/* =========================
   REDUCED MOTION CLASS
========================= */

if (prefersReducedMotion) {
  document.documentElement.classList.add(
    "reduce-motion"
  );
}

/* =========================
   END OF TATVA WEBS SCRIPT
========================= */

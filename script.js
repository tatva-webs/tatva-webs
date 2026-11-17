/* =========================================
   TATVA WEBS — ADVANCED INTERACTIONS
   MIDNIGHT CYAN EDITION
========================================= */

const TATVA_CONFIG = {
  email: "tatvawebs@gmail.com",
  instagram: "https://www.instagram.com/tatva_webs/",
  whatsapp: "",
  linkedin: "",
  logo: "tatva-webs-logo.png"
};

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================
     HELPERS
  ========================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;

  const isMobile = () => window.innerWidth <= 850;

  /* =========================================
     GLOBAL SETTINGS
  ========================================= */

  document.documentElement.style.setProperty(
    "--accent",
    "#00D9FF"
  );

  $$("[data-year], .current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  /* =========================================
     LOGO + FAVICON
  ========================================= */

  const favicon = document.querySelector(
    'link[rel="icon"]'
  );

  if (favicon) {
    favicon.href = TATVA_CONFIG.logo;
  } else {
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = TATVA_CONFIG.logo;
    document.head.appendChild(icon);
  }

  $$("[data-logo]").forEach(image => {
    image.src = TATVA_CONFIG.logo;
  });

  /* =========================================
     SOCIAL LINKS
  ========================================= */

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
    } else {
      link.style.display = "none";
    }
  });

  $$("[data-linkedin]").forEach(link => {
    if (TATVA_CONFIG.linkedin) {
      link.href = TATVA_CONFIG.linkedin;
    } else {
      link.style.display = "none";
    }
  });

  /* =========================================
     PRELOADER — SAFE SINGLE EXECUTION
  ========================================= */

  const preloader = $(".site-preloader");
  let loaderRemoved = false;

  function removeLoader() {
    if (loaderRemoved || !preloader) return;

    loaderRemoved = true;

    preloader.classList.add("is-hidden");

    document.body.classList.add("page-loaded");

    window.setTimeout(() => {
      preloader.remove();
    }, 900);
  }

  if (document.readyState === "complete") {
    removeLoader();
  } else {
    window.addEventListener("load", removeLoader, {
      once: true
    });

    // Fallback if the load event takes too long.
    window.setTimeout(removeLoader, 4500);
  }

  /* =========================================
     AMBIENT BACKGROUND
  ========================================= */

  const ambientContainer = $(".ambient-3d");

  if (ambientContainer && !$(".ambient-object", ambientContainer)) {
    const ambientObjects = [
      ["sphere", "one"],
      ["cube", "two"],
      ["ring", "three"],
      ["orb-small", "four"],
      ["sphere", "five"],
      ["cube", "six"]
    ];

    ambientObjects.forEach(([type, position]) => {
      const object = document.createElement("div");

      object.className =
        `ambient-object ${type} ${position}`;

      ambientContainer.appendChild(object);
    });
  }

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = $(
    ".menu-toggle, .nav-toggle, [data-menu-toggle]"
  );

  const mainNav = $(
    ".main-nav, .nav-links, #main-navigation"
  );

  function closeMobileMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("open", "active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    if (!mainNav || !menuToggle) return;

    const isOpen = mainNav.classList.contains("open");

    mainNav.classList.toggle("open", !isOpen);

    menuToggle.classList.toggle("active", !isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      !isOpen
    );
  }

  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", event => {
      event.stopPropagation();
      toggleMobileMenu();
    });

    mainNav.addEventListener("click", event => {
      if (event.target.closest("a")) {
        closeMobileMenu();
      }
    });

    document.addEventListener("click", event => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (!isMobile()) {
        closeMobileMenu();
      }
    });
  }

  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase() || "index.html";

  $$(".main-nav a, .nav-links a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href) return;

    try {
      const linkPage = new URL(
        href,
        window.location.href
      ).pathname.split("/").pop().toLowerCase();

      const isActive = linkPage === currentPage;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    } catch {
      // Ignore invalid navigation URLs.
    }
  });

  /* =========================================
     SCROLL PROGRESS + HEADER
  ========================================= */

  const scrollProgress = $(
    ".scroll-progress, #scroll-progress"
  );

  const header = $(
    ".site-header, header"
  );

  let scrollTicking = false;

  function updateScrollEffects() {
    const scrollTop = window.scrollY;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress = scrollHeight > 0
      ? scrollTop / scrollHeight
      : 0;

    document.documentElement.style.setProperty(
      "--scroll-progress",
      progress
    );

    if (header) {
      header.classList.toggle(
        "scrolled",
        scrollTop > 35
      );
    }

    if (scrollProgress) {
      scrollProgress.setAttribute(
        "aria-valuenow",
        Math.round(progress * 100)
      );
    }

    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }
  }, { passive: true });

  updateScrollEffects();

  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

  const revealElements = $$(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  /* =========================================
     STAGGERED CARD ANIMATIONS
  ========================================= */

  const staggerGroups = $$(
    ".service-grid, .feature-grid, .info-grid, " +
    ".project-grid, .pricing-grid, .stats-grid"
  );

  staggerGroups.forEach(group => {
    const cards = $$(
      ".service-card, .feature-card, .info-card, " +
      ".project-card, .pricing-card, .stat-card",
      group
    );

    cards.forEach((card, index) => {
      card.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 100, 500)}ms`
      );
    });
  });



/* =====================================================
   TATVA WEBS — OPTIMIZED CUSTOM CURSOR
===================================================== */

(() => {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!finePointer || reducedMotion) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!dot || !ring) return;

  if (document.body.dataset.cursorReady === "true") return;
  document.body.dataset.cursorReady = "true";

  document.body.classList.add("custom-cursor");

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  let visible = false;
  let animationFrame = null;

  const hoverSelector =
    "a, button, input, textarea, select, summary, " +
    "[role='button'], [data-cursor-hover]";

  function positionDot(x, y) {
    dot.style.transform =
      `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }

  function positionRing(x, y) {
    ring.style.transform =
      `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }

  function showCursor(x, y) {
    mouseX = x;
    mouseY = y;

    if (!visible) {
      visible = true;
      ringX = x;
      ringY = y;

      positionRing(x, y);
      positionDot(x, y);

      document.body.classList.add("cursor-ready");
    }
  }

  function hideCursor() {
    visible = false;
    document.body.classList.remove("cursor-ready");
    ring.classList.remove("cursor-hover", "cursor-click");
  }

  function animateRing() {
    if (!visible) {
      animationFrame = null;
      return;
    }

    const dx = mouseX - ringX;
    const dy = mouseY - ringY;

    ringX += dx * 0.22;
    ringY += dy * 0.22;

    positionRing(ringX, ringY);

    if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
      animationFrame = requestAnimationFrame(animateRing);
    } else {
      ringX = mouseX;
      ringY = mouseY;
      positionRing(ringX, ringY);
      animationFrame = null;
    }
  }

  function moveCursor(event) {
    if (event.pointerType === "touch") return;

    mouseX = event.clientX;
    mouseY = event.clientY;

    showCursor(mouseX, mouseY);
    positionDot(mouseX, mouseY);

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(animateRing);
    }

    const target = event.target instanceof Element
      ? event.target.closest(hoverSelector)
      : null;

    ring.classList.toggle("cursor-hover", Boolean(target));
  }

  document.addEventListener("pointermove", moveCursor, {
    passive: true
  });

  document.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch") return;

    ring.classList.add("cursor-click");
  });

  document.addEventListener("pointerup", () => {
    ring.classList.remove("cursor-click");
  });

  document.addEventListener("pointercancel", () => {
    ring.classList.remove("cursor-click");
  });

  window.addEventListener("mouseout", event => {
    if (!event.relatedTarget) {
      hideCursor();
    }
  });

  window.addEventListener("blur", hideCursor);

  window.addEventListener("focus", () => {
    visible = false;
  });

})();



  /* =========================================
     MAGNETIC BUTTONS
  ========================================= */

  if (finePointer && !reducedMotion) {
    $$("[data-magnetic], .magnetic").forEach(element => {
      element.addEventListener("mousemove", event => {
        const rect = element.getBoundingClientRect();

        const x =
          event.clientX - rect.left - rect.width / 2;

        const y =
          event.clientY - rect.top - rect.height / 2;

        element.style.translate =
          `${x * 0.12}px ${y * 0.12}px`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.translate = "";
      });
    });
  }

  /* =========================================
     3D TILT CARDS
  ========================================= */

  if (finePointer && !reducedMotion) {
    $$("[data-tilt], .tilt-card").forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width;

        const y =
          (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =========================================
     CARD LIGHT REFLECTION
  ========================================= */

  if (finePointer && !reducedMotion) {
    $$(
      ".info-card, .pricing-card, .service-card, .feature-card"
    ).forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();

        const x = (
          (event.clientX - rect.left) / rect.width
        ) * 100;

        const y = (
          (event.clientY - rect.top) / rect.height
        ) * 100;

        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
      });
    });
  }

  /* =========================================
     HERO PARALLAX
     Does not overwrite CSS transforms.
  ========================================= */

  if (finePointer && !reducedMotion) {
    const heroArt = $(".hero-art");

    const heroCore = $(".hero-core", heroArt || document);
    const heroGlow = $(".hero-scene-glow", heroArt || document);

    if (heroArt) {
      heroArt.addEventListener("mousemove", event => {
        const rect = heroArt.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        if (heroCore) {
          heroCore.style.translate =
            `${x * 12}px ${y * 12}px`;
        }

        if (heroGlow) {
          heroGlow.style.translate =
            `${x * -15}px ${y * -15}px`;
        }
      });

      heroArt.addEventListener("mouseleave", () => {
        if (heroCore) heroCore.style.translate = "";
        if (heroGlow) heroGlow.style.translate = "";
      });
    }
  }

  /* =========================================
     FAQ
     Native <details> and <summary> support.
  ========================================= */

  $$(".faq-item").forEach(item => {
    if (item.tagName.toLowerCase() === "details") {
      item.addEventListener("toggle", () => {
        const summary = $("summary", item);

        if (summary) {
          summary.setAttribute(
            "aria-expanded",
            String(item.open)
          );
        }
      });

      const summary = $("summary", item);

      if (summary) {
        summary.setAttribute(
          "aria-expanded",
          String(item.open)
        );
      }
    }
  });

  /* =========================================
     CONTACT FORM
  ========================================= */

  const contactForm = $(
    "#contact-form, .contact-form"
  );

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);

      const name =
        formData.get("name")?.toString().trim() || "";

      const email =
        formData.get("email")?.toString().trim() || "";

      const subject =
        formData.get("subject")?.toString().trim() ||
        "Website Enquiry";

      const message =
        formData.get("message")?.toString().trim() || "";

      if (!name || !email || !message) {
        return;
      }

      const mailSubject = encodeURIComponent(subject);

      const mailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
      );

      const mailto =
        `mailto:${TATVA_CONFIG.email}` +
        `?subject=${mailSubject}` +
        `&body=${mailBody}`;

      const note = $(
        "#form-note, .form-note"
      );

      if (note) {
        note.textContent =
          "Opening your email application...";
      }

      window.location.href = mailto;
    });
  }

  /* =========================================
     BACK TO TOP
  ========================================= */

  const backToTop = $(
    "#back-to-top, .back-to-top, [data-back-to-top]"
  );

  if (backToTop) {
    backToTop.addEventListener("click", event => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    });
  }

  /* =========================================
     SMOOTH INTERNAL ANCHORS
  ========================================= */

  $$('a[href*="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let url;

      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      ) {
        return;
      }

      const targetId = decodeURIComponent(
        url.hash.slice(1)
      );

      const target = document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(null, "", url.hash);

      closeMobileMenu();
    });
  });

  /* =========================================
     PAGE TRANSITIONS
  ========================================= */

  if (!reducedMotion) {
    $$("a[href]").forEach(link => {
      link.addEventListener("click", event => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        if (
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
          destination = new URL(
            href,
            window.location.href
          );
        } catch {
          return;
        }

        if (
          destination.origin !== window.location.origin ||
          !destination.pathname.toLowerCase().endsWith(".html")
        ) {
          return;
        }

        if (
          destination.pathname === window.location.pathname &&
          destination.search === window.location.search
        ) {
          return;
        }

        event.preventDefault();

        document.body.classList.add("page-leaving");

        window.setTimeout(() => {
          window.location.href = destination.href;
        }, 300);
      });
    });
  }

  /* =========================================
     IMAGE REVEAL
  ========================================= */

  if ("IntersectionObserver" in window && !reducedMotion) {
    const imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("image-visible");

            imageObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    $$("img[data-reveal], .image-reveal").forEach(image => {
      imageObserver.observe(image);
    });
  }

  /* =========================================
     ACCESSIBILITY
  ========================================= */

  if (reducedMotion) {
    document.body.classList.add("reduce-motion");

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  }

  document.documentElement.classList.add("js-enabled");

  /* =========================================
     CONSOLE BRANDING
  ========================================= */

  console.log(
    "%c TATVA WEBS ",
    "background:#00D9FF;color:#06101B;padding:9px 15px;font-weight:900;border-radius:5px;"
  );

  console.log(
    "%cBuilding digital experiences.",
    "color:#8CEBFF;font-size:12px;"
  );

});

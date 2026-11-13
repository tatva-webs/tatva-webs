
/* =========================================
   TATVA WEBS — MASTER INTERACTIONS
   Shared across all 8 website pages
========================================= */

"use strict";

/* =========================================
   CONFIGURATION
========================================= */

const TATVA_CONFIG = {
  email: "hello@tatvawebs.com",
  whatsapp: "",
  instagram: "",
  linkedin: ""
};


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const page = body.dataset.page || "home";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================
     REMOVE OLD LOADER OVERLAYS
     Prevents the full-screen logo issue.
  ========================================= */

  document.querySelectorAll(
    ".loader, .preloader, #loader, #preloader, .loading-screen"
  ).forEach(loader => {
    loader.classList.add("done");
    loader.style.display = "none";
    loader.style.pointerEvents = "none";
  });


  /* =========================================
     COPYRIGHT YEAR
  ========================================= */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href) return;

    const filename = href.split("/").pop().replace(".html", "");

    const currentPage = page === "home" ? "index" : page;

    if (filename === currentPage) {
      link.classList.add("active");
    }
  });


  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }


  /* =========================================
     SCROLL PROGRESS
  ========================================= */

  let scrollTicking = false;

  function updateScrollProgress() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    body.style.setProperty(
      "--scroll-progress",
      `${Math.min(100, Math.max(0, progress))}%`
    );

    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollProgress);
      scrollTicking = true;
    }
  }, { passive: true });

  updateScrollProgress();


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();


  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  /* =========================================
     PROCESS STAGE NUMBERS
  ========================================= */

  if (page === "process") {
    document.querySelectorAll(".process-grid .info-card").forEach((card, index) => {
      card.dataset.stage = String(index + 1).padStart(2, "0");
    });
  }


  /* =========================================
     FAQ ACCORDION
  ========================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {

      if (!item.open) return;

      const parent = item.closest(".faq-content");

      if (!parent) return;

      parent.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });

    });
  });


  /* =========================================
     ADVANCED CUSTOM CURSOR
     Dual-layer orange cursor.
     Works across all pages.
  ========================================= */

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (cursorDot && cursorRing && finePointer && !reduceMotion) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let cursorVisible = false;
    let cursorFrame = null;

    body.classList.add("custom-cursor-enabled");

    function showCursor() {
      if (cursorVisible) return;

      cursorVisible = true;
      body.classList.add("cursor-active");
    }

    function hideCursor() {
      cursorVisible = false;
      body.classList.remove("cursor-active");
    }

    function moveCursor(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      showCursor();

      if (!cursorFrame) {
        cursorFrame = requestAnimationFrame(animateRing);
      }
    }

    function animateRing() {

      const ease = 0.16;

      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      cursorRing.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0)`;

      const distance = Math.hypot(
        mouseX - ringX,
        mouseY - ringY
      );

      if (distance > 0.15) {
        cursorFrame = requestAnimationFrame(animateRing);
      } else {
        cursorFrame = null;
      }
    }

    window.addEventListener("pointermove", moveCursor, {
      passive: true
    });

    window.addEventListener("pointerout", event => {
      if (!event.relatedTarget) hideCursor();
    });

    window.addEventListener("blur", hideCursor);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) hideCursor();
    });

    /* Cursor hover states */

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, summary, .magnetic, .tilt-card"
    );

    interactiveElements.forEach(element => {

      element.addEventListener("pointerenter", () => {
        body.classList.add("cursor-hover");
      });

      element.addEventListener("pointerleave", () => {
        body.classList.remove("cursor-hover");
      });

    });

    /* Text selection cursor state */

    document.addEventListener("selectionchange", () => {
      body.classList.toggle(
        "cursor-selecting",
        Boolean(window.getSelection()?.toString())
      );
    });

  } else {
    body.classList.remove("custom-cursor-enabled");
  }


  /* =========================================
     MAGNETIC BUTTONS
  ========================================= */

  if (finePointer && !reduceMotion) {

    document.querySelectorAll(".magnetic").forEach(button => {

      button.addEventListener("pointermove", event => {

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform =
          `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;

      });

      button.addEventListener("pointerleave", () => {
        button.style.transform = "";
      });

    });

  }


  /* =========================================
     3D TILT CARDS
  ========================================= */

  if (finePointer && !reduceMotion) {

    document.querySelectorAll(".tilt-card").forEach(card => {

      card.addEventListener("pointermove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });

    });

  }


  /* =========================================
     HOMEPAGE HERO PARALLAX
  ========================================= */

  const heroScene = document.querySelector("[data-hero-scene]");

  if (heroScene && finePointer && !reduceMotion) {

    heroScene.addEventListener("pointermove", event => {

      const rect = heroScene.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroScene.style.setProperty("--mouse-x", `${x * 30}px`);
      heroScene.style.setProperty("--mouse-y", `${y * 30}px`);

    });

    heroScene.addEventListener("pointerleave", () => {
      heroScene.style.setProperty("--mouse-x", "0px");
      heroScene.style.setProperty("--mouse-y", "0px");
    });

  }


  /* =========================================
     CONTACT DETAILS
  ========================================= */

  document.querySelectorAll("[data-email]").forEach(element => {
    element.textContent = TATVA_CONFIG.email;
    element.href = `mailto:${TATVA_CONFIG.email}`;
  });

  document.querySelectorAll("[data-whatsapp]").forEach(element => {
    if (TATVA_CONFIG.whatsapp) {
      element.href = `https://wa.me/${TATVA_CONFIG.whatsapp}`;
    } else {
      element.hidden = true;
    }
  });

  document.querySelectorAll("[data-instagram]").forEach(element => {
    if (TATVA_CONFIG.instagram) {
      element.href = TATVA_CONFIG.instagram;
    } else {
      element.hidden = true;
    }
  });

  document.querySelectorAll("[data-linkedin]").forEach(element => {
    if (TATVA_CONFIG.linkedin) {
      element.href = TATVA_CONFIG.linkedin;
    } else {
      element.hidden = true;
    }
  });


  /* =========================================
     CONTACT FORM
     Opens the visitor's email application.
     No backend required.
  ========================================= */

  const contactForm = document.querySelector("#contact-form");
  const formNote = document.querySelector("#form-note");

  if (contactForm) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);

      const name = formData.get("name")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim() || "";
      const projectType = formData.get("project-type")?.toString() || "";
      const budget = formData.get("budget")?.toString() || "Not specified";
      const message = formData.get("message")?.toString().trim() || "";

      const subject = encodeURIComponent(
        `New Project Enquiry — ${projectType}`
      );

      const bodyText = [
        "NEW PROJECT ENQUIRY",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Project Type: ${projectType}`,
        `Budget: ${budget}`,
        "",
        "PROJECT DETAILS:",
        message
      ].join("\n");

      const mailtoLink =
        `mailto:${TATVA_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      if (formNote) {
        formNote.textContent =
          "Opening your email application. Please send the prepared message to complete your enquiry.";
      }

      window.location.href = mailtoLink;

    });

  }


  /* =========================================
     BACK TO TOP
  ========================================= */

  document.querySelectorAll(".back-top").forEach(link => {

    link.addEventListener("click", event => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });

    });

  });


  /* =========================================
     EXTERNAL LINKS
     Open configured social links safely.
  ========================================= */

  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.setAttribute("aria-label", link.getAttribute("aria-label") || "Send an email");
  });


  /* =========================================
     PAGE READY
  ========================================= */

  body.classList.add("page-loaded");

  console.log(
    `%c TATVA WEBS %c ${page.toUpperCase()} `,
    "background:#ff6a00;color:#080808;font-weight:800;padding:7px 10px;",
    "background:#111;color:#f5f3ef;padding:7px 10px;"
  );

});

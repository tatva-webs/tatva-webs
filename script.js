
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

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =========================================
     1. GLOBAL SETTINGS
  ========================================= */

  document.documentElement.style.setProperty(
    "--accent",
    "#00D9FF"
  );

  const year = $("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  /* =========================================
     2. FAVICON
  ========================================= */

  if (TATVA_CONFIG.logo) {
    let favicon = $('link[rel="icon"]');

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.href = TATVA_CONFIG.logo;
  }

  /* =========================================
     3. SOCIAL LINKS
  ========================================= */

  $$('a[href*="instagram.com"]').forEach(link => {
    link.href = TATVA_CONFIG.instagram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Visit Tatva Webs on Instagram");
  });

  $$('a[href^="mailto:"]').forEach(link => {
    link.href = `mailto:${TATVA_CONFIG.email}`;
  });

  $$("[data-social='instagram']").forEach(link => {
    link.href = TATVA_CONFIG.instagram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  $$("[data-social='email']").forEach(link => {
    link.href = `mailto:${TATVA_CONFIG.email}`;
  });

  $$("[data-social='whatsapp']").forEach(link => {
    if (TATVA_CONFIG.whatsapp) {
      link.href = TATVA_CONFIG.whatsapp;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  $$("[data-social='linkedin']").forEach(link => {
    if (TATVA_CONFIG.linkedin) {
      link.href = TATVA_CONFIG.linkedin;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  /* =========================================
     4. CINEMATIC PRELOADER
  ========================================= */

  const loader = $("#preloader");

  function removeLoader() {
    if (!loader) {
      document.body.classList.add("page-loaded");
      return;
    }

    loader.classList.add("loaded");

    setTimeout(() => {
      loader.remove();
      document.body.classList.add("page-loaded");
    }, 700);
  }

  if (loader) {
    window.addEventListener("load", removeLoader, {
      once: true
    });

    setTimeout(removeLoader, 4500);
  } else {
    document.body.classList.add("page-loaded");
  }

  /* =========================================
     5. AMBIENT 3D BACKGROUND
  ========================================= */

  const ambient = $(".ambient-3d");

  if (ambient && !$(".ambient-orb", ambient)) {
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement("span");
      orb.className = `ambient-orb ambient-orb-${i + 1}`;
      ambient.appendChild(orb);
    }
  }

  /* =========================================
     6. MOBILE NAVIGATION
  ========================================= */

  const menuToggle = $(
    ".menu-toggle, .nav-toggle, [data-menu-toggle]"
  );

  const mainNav = $(
    ".main-nav, .nav-links, #main-navigation"
  );

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("active", "open");

    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("active");

      menuToggle.classList.toggle("active", !isOpen);
      mainNav.classList.toggle("active", !isOpen);
      mainNav.classList.toggle("open", !isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      document.body.classList.toggle("menu-open", !isOpen);
    });

    $$(".main-nav a, .nav-links a", mainNav).forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !menuToggle.contains(event.target) &&
        !mainNav.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeMenu();
    });
  }

  /* =========================================
     7. ACTIVE NAVIGATION
  ========================================= */

  const currentPage =
    location.pathname.split("/").pop() || "index.html";

  $$(".main-nav a, .nav-links a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* =========================================
     8. SCROLL PROGRESS + HEADER
  ========================================= */

  const progressBar = $(
    ".scroll-progress, #scroll-progress"
  );

  const header = $(
    ".site-header, header"
  );

  let scrollTicking = false;

  function updateScroll() {
    const scrollTop = window.scrollY;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 40);
    }

    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  updateScroll();

  /* =========================================
     9. ADVANCED REVEAL ANIMATIONS
  ========================================= */

  const revealElements = $$(
    ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible", "revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible", "revealed");
    });
  }

  /* =========================================
     10. STAGGERED CARD ANIMATIONS
  ========================================= */

  $$(".service-card, .project-card, .pricing-card, .value-card")
    .forEach((card, index) => {
      card.style.setProperty(
        "--stagger-delay",
        `${(index % 5) * 100}ms`
      );
    });

  /* =========================================
     11. CUSTOM CURSOR
  ========================================= */

  const canUseCustomCursor =
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canUseCustomCursor) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";

    const follower = document.createElement("div");
    follower.className = "cursor-follower";

    document.body.append(cursor, follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      follower.style.transform =
        `translate3d(${followerX}px, ${followerY}px, 0)`;

      requestAnimationFrame(animateFollower);
    }

    animateFollower();

    $$("a, button, input, textarea, select").forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
        follower.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
        follower.classList.remove("cursor-hover");
      });
    });
  }

  /* =========================================
     12. MAGNETIC BUTTONS
  ========================================= */

  if (canUseCustomCursor) {
    $$("[data-magnetic], .magnetic").forEach(button => {
      button.addEventListener("mousemove", event => {
        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.translate =
          `${x * 0.12}px ${y * 0.12}px`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.translate = "0px 0px";
      });
    });
  }

  /* =========================================
     13. 3D TILT CARDS
  ========================================= */

  if (canUseCustomCursor) {
    $$("[data-tilt], .tilt-card").forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY =
          ((x / rect.width) - 0.5) * 8;

        const rotateX =
          ((0.5 - y / rect.height)) * 8;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  /* =========================================
     14. HERO PARALLAX
  ========================================= */

  const heroScene = $(
    ".hero-scene, .hero-visual, .hero-orbit"
  );

  if (heroScene && canUseCustomCursor) {
    const heroSection = $(".hero");

    if (heroSection) {
      heroSection.addEventListener("mousemove", event => {
        const rect = heroSection.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        heroScene.style.setProperty(
          "--parallax-x",
          `${x * 12}px`
        );

        heroScene.style.setProperty(
          "--parallax-y",
          `${y * 12}px`
        );
      });

      heroSection.addEventListener("mouseleave", () => {
        heroScene.style.setProperty("--parallax-x", "0px");
        heroScene.style.setProperty("--parallax-y", "0px");
      });
    }
  }

  /* =========================================
     15. FAQ ACCORDION
  ========================================= */

  const faqItems = $$(".faq-item");

  faqItems.forEach(item => {
    const question = $(
      ".faq-question, .faq-header, button",
      item
    );

    const answer = $(
      ".faq-answer",
      item
    );

    if (!question || !answer) return;

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");

        const otherQuestion = $(
          ".faq-question, .faq-header, button",
          otherItem
        );

        const otherAnswer = $(".faq-answer", otherItem);

        if (otherQuestion) {
          otherQuestion.setAttribute("aria-expanded", "false");
        }

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");

        answer.style.maxHeight =
          `${answer.scrollHeight}px`;
      }
    });
  });

  /* =========================================
     16. CONTACT FORM
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
        formData.get("name") ||
        $('[name="name"]', contactForm)?.value ||
        "";

      const email =
        formData.get("email") ||
        $('[name="email"]', contactForm)?.value ||
        "";

      const subject =
        formData.get("subject") ||
        "Website enquiry";

      const message =
        formData.get("message") ||
        $('[name="message"]', contactForm)?.value ||
        "";

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

  /* =========================================
     17. BACK TO TOP
  ========================================= */

  const backToTop = $(
    "#back-to-top, .back-to-top"
  );

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================================
     18. IMAGE REVEAL
  ========================================= */

  const imageContainers = $$(
    ".image-reveal, .project-image, .about-image"
  );

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("image-visible");
            imageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    imageContainers.forEach(element => {
      imageObserver.observe(element);
    });
  }

  /* =========================================
     19. SMOOTH ANCHOR SCROLLING
  ========================================= */

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = $(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* =========================================
     20. PAGE TRANSITION
  ========================================= */

  $$('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", event => {
      const destination = new URL(link.href, location.href);

      if (
        destination.origin !== location.origin ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) return;

      if (destination.pathname === location.pathname) return;

      event.preventDefault();

      document.body.classList.add("page-leaving");

      setTimeout(() => {
        location.href = destination.href;
      }, 300);
    });
  });

  /* =========================================
     21. REDUCED MOTION SUPPORT
  ========================================= */

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduce-motion");
  }

  /* =========================================
     22. FINAL INITIALIZATION
  ========================================= */

  document.body.classList.add("js-enabled");

  console.log(
    "%cTATVA WEBS",
    "color:#00D9FF;font-size:22px;font-weight:900;"
  );

  console.log(
    "%cDigital Experiences That Matter.",
    "color:#9AAFC5;font-size:12px;"
  );

});

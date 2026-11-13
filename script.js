/* =========================================
   TATVA WEBS — CINEMATIC INTERACTIONS
========================================= */

const TATVA_CONFIG = {
  email: "hello@tatvawebs.com",
  whatsapp: "",
  instagram: "",
  linkedin: ""
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const page = body.dataset.page || "home";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* =====================================
     FAVICON — GENERATED INLINE
  ===================================== */

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="15" fill="#080808"/>
      <path d="M15 17h34v8H36v23h-8V25H15z" fill="#ff6a00"/>
      <circle cx="47" cy="46" r="5" fill="#ffad42"/>
    </svg>
  `);
  document.head.appendChild(favicon);

  /* =====================================
     PRELOADER
  ===================================== */

  let preloader = document.querySelector(".site-preloader");

  if (!preloader) {
    preloader = document.createElement("div");
    preloader.className = "site-preloader";
    preloader.innerHTML = `
      <div class="preloader-inner">
        <div class="preloader-logo-mark">T</div>
        <div class="preloader-wordmark">TATVA <span>WEBS</span></div>
        <div class="preloader-track"><span class="preloader-progress"></span></div>
        <div class="preloader-caption">Crafting digital experiences</div>
      </div>
    `;
    body.prepend(preloader);
  }

  const existingLogo = document.querySelector(".brand img, .footer-brand img");

  if (existingLogo) {
    const logoSrc = existingLogo.currentSrc || existingLogo.src;
    const logoMark = preloader.querySelector(".preloader-logo-mark");

    if (logoMark && logoSrc) {
      const image = document.createElement("img");
      image.className = "preloader-logo";
      image.src = logoSrc;
      image.alt = "Tatva Webs";
      logoMark.replaceWith(image);
    }
  }

  const hidePreloader = () => {
    if (!preloader || preloader.classList.contains("is-hidden")) return;

    preloader.classList.add("is-hidden");

    window.setTimeout(() => {
      preloader.remove();
    }, 1000);
  };

  window.addEventListener("load", () => {
    window.setTimeout(hidePreloader, reduceMotion ? 0 : 650);
  }, { once: true });

  // Safety fallback if an asset takes too long to load.
  window.setTimeout(hidePreloader, 4500);

  /* =====================================
     CURRENT YEAR
  ===================================== */

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =====================================
     ACTIVE NAVIGATION
  ===================================== */

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const target = href.split("/").pop().replace(".html", "");

    if (
      target === page ||
      (page === "home" && (href === "/" || href.includes("index")))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* =====================================
     MOBILE MENU
  ===================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  /* =====================================
     SCROLL PROGRESS + HEADER
  ===================================== */

  let scrollTicking = false;

  const updateScrollEffects = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? scrollTop / scrollable : 0;

    body.style.setProperty("--scroll-progress", progress);
    document.querySelector(".site-header")?.classList.toggle("scrolled", scrollTop > 35);

    scrollTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }
  }, { passive: true });

  updateScrollEffects();

  /* =====================================
     REVEAL ANIMATIONS + STAGGER
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  revealElements.forEach((element, index) => {
    if (element.closest(".hero-content")) {
      element.classList.add("is-visible");
      return;
    }

    const parent = element.parentElement;
    const siblings = parent
      ? Array.from(parent.children).filter((child) =>
          child.matches(".reveal, .reveal-left, .reveal-right, .reveal-scale")
        )
      : [];

    const siblingIndex = Math.max(0, siblings.indexOf(element));
    element.style.setProperty("--reveal-delay", `${Math.min(siblingIndex * 100, 450)}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    });

    revealElements.forEach((element) => {
      if (!element.classList.contains("is-visible")) {
        revealObserver.observe(element);
      }
    });
  }

  /* =====================================
     CUSTOM CURSOR — DOT + RING LOCKED
  ===================================== */

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (finePointer && !reduceMotion && cursorDot && cursorRing) {
    body.classList.add("custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let cursorVisible = false;

    const setCursorPosition = (element, x, y) => {
      element.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const showCursor = () => {
      cursorVisible = true;
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    };

    const hideCursor = () => {
      cursorVisible = false;
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
    };

    document.addEventListener("pointermove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      showCursor();
      setCursorPosition(cursorDot, mouseX, mouseY);
    }, { passive: true });

    document.addEventListener("pointerover", (event) => {
      if (event.target.closest("a, button, input, textarea, select, summary, [data-cursor-hover]")) {
        cursorRing.classList.add("cursor-hover");
      } else {
        cursorRing.classList.remove("cursor-hover");
      }
    });

    document.addEventListener("pointerdown", () => {
      cursorRing.classList.add("cursor-click");
    });

    document.addEventListener("pointerup", () => {
      cursorRing.classList.remove("cursor-click");
    });

    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) hideCursor();
    });

    window.addEventListener("blur", hideCursor);
    window.addEventListener("focus", showCursor);

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      setCursorPosition(cursorRing, ringX, ringY);
      requestAnimationFrame(animateRing);
    };

    animateRing();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) hideCursor();
    });
  }

  /* =====================================
     MAGNETIC BUTTONS
  ===================================== */

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".magnetic, [data-magnetic]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        element.style.transform =
          `translate3d(${x * 0.12}px, ${y * 0.16}px, 0)`;
      });

      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });
  }

  /* =====================================
     3D TILT CARDS
  ===================================== */

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =====================================
     HERO PARALLAX
  ===================================== */

  const heroScene = document.querySelector("[data-hero-scene]");

  if (heroScene && finePointer && !reduceMotion) {
    heroScene.addEventListener("pointermove", (event) => {
      const rect = heroScene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroScene.style.setProperty("--scene-x", `${x * 18}px`);
      heroScene.style.setProperty("--scene-y", `${y * 18}px`);

      const sphere = heroScene.querySelector(".core-sphere");
      const orbit = heroScene.querySelector(".hero-orbit");

      if (sphere) {
        sphere.style.marginLeft = `${x * 12}px`;
        sphere.style.marginTop = `${y * 12}px`;
      }

      if (orbit) {
        orbit.style.marginLeft = `${-x * 10}px`;
        orbit.style.marginTop = `${-y * 10}px`;
      }
    });

    heroScene.addEventListener("pointerleave", () => {
      const sphere = heroScene.querySelector(".core-sphere");
      const orbit = heroScene.querySelector(".hero-orbit");

      if (sphere) {
        sphere.style.marginLeft = "";
        sphere.style.marginTop = "";
      }

      if (orbit) {
        orbit.style.marginLeft = "";
        orbit.style.marginTop = "";
      }
    });
  }

  /* =====================================
     FAQ ACCORDION
  ===================================== */

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      const group = item.parentElement;

      group?.querySelectorAll(".faq-item[open]").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* =====================================
     CONTACT LINKS
  ===================================== */

  document.querySelectorAll("[data-email]").forEach((link) => {
    link.href = `mailto:${TATVA_CONFIG.email}`;
  });

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    if (TATVA_CONFIG.whatsapp) {
      link.href = `https://wa.me/${TATVA_CONFIG.whatsapp}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  document.querySelectorAll("[data-instagram]").forEach((link) => {
    if (TATVA_CONFIG.instagram) {
      link.href = TATVA_CONFIG.instagram;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  document.querySelectorAll("[data-linkedin]").forEach((link) => {
    if (TATVA_CONFIG.linkedin) {
      link.href = TATVA_CONFIG.linkedin;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  /* =====================================
     CONTACT FORM — EMAIL DRAFT
  ===================================== */

  const contactForm = document.querySelector("#contact-form");
  const formNote = document.querySelector("#form-note");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);

      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const project = data.get("project") || "";
      const budget = data.get("budget") || "";
      const message = data.get("message") || "";

      const subject = encodeURIComponent(`New website enquiry from ${name}`);

      const bodyText = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${project}`,
        `Budget: ${budget}`,
        "",
        "Message:",
        message
      ].join("\n");

      const mailto =
        `mailto:${TATVA_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      if (formNote) {
        formNote.textContent =
          "Your email app will open with your enquiry ready. Please press Send there.";
      }

      window.location.href = mailto;
    });
  }

  /* =====================================
     BACK TO TOP
  ===================================== */

  document.querySelectorAll("[data-back-to-top]").forEach((button) => {
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  });

  /* =====================================
     IMAGE REVEAL
  ===================================== */

  if (!reduceMotion && "IntersectionObserver" in window) {
    const images = document.querySelectorAll(".project-visual img, .image-reveal");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("image-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    images.forEach((image) => imageObserver.observe(image));
  }

  /* =====================================
     READY
  ===================================== */

  requestAnimationFrame(() => {
    body.classList.add("page-loaded");
  });
});

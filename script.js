
/* =========================================
   TATVA WEBS — CINEMATIC INTERACTIONS
   Midnight Cyan Edition
   Original logo: tatva-webs-logo.png
========================================= */

const TATVA_CONFIG = {
  email: "hello@tatvawebs.com",
  whatsapp: "",
  instagram: "",
  linkedin: "",
  logo: "tatva-webs-logo.png"
};

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const page = body.dataset.page || "home";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;

  /* =====================================
     FAVICON — ORIGINAL LOGO
  ===================================== */

  document.querySelectorAll(
    'link[rel="icon"], link[rel="shortcut icon"]'
  ).forEach(element => element.remove());

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = TATVA_CONFIG.logo;

  document.head.appendChild(favicon);

  /* =====================================
     AMBIENT 3D ENVIRONMENT
  ===================================== */

  if (!document.querySelector(".ambient-3d")) {
    const ambient = document.createElement("div");

    ambient.className = "ambient-3d";
    ambient.setAttribute("aria-hidden", "true");

    ambient.innerHTML = `
      <span class="ambient-object sphere one"></span>
      <span class="ambient-object orb-small two"></span>
      <span class="ambient-object ring three"></span>
      <span class="ambient-object cube four"></span>
      <span class="ambient-object orb-small five"></span>
      <span class="ambient-object sphere six"></span>
    `;

    body.prepend(ambient);
  }

  /* =====================================
     PRELOADER
  ===================================== */

  let preloader = document.querySelector(".site-preloader");

  if (!preloader) {
    preloader = document.createElement("div");

    preloader.className = "site-preloader";

    preloader.innerHTML = `
      <div class="preloader-inner">

        <img
          class="preloader-logo"
          src="${TATVA_CONFIG.logo}"
          alt="Tatva Webs"
        >

        <div class="preloader-wordmark">
          TATVA <span>WEBS</span>
        </div>

        <div class="preloader-track">
          <span class="preloader-progress"></span>
        </div>

        <div class="preloader-caption">
          Crafting digital experiences
        </div>

      </div>
    `;

    body.prepend(preloader);
  }

  let preloaderHidden = false;

  const hidePreloader = () => {
    if (preloaderHidden || !preloader) return;

    preloaderHidden = true;
    preloader.classList.add("is-hidden");

    window.setTimeout(() => {
      preloader?.remove();
    }, 1000);
  };

  if (document.readyState === "complete") {
    window.setTimeout(
      hidePreloader,
      reduceMotion ? 0 : 400
    );
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(
        hidePreloader,
        reduceMotion ? 0 : 500
      );
    }, { once: true });
  }

  // Never allow the loader to cover the website indefinitely.
  window.setTimeout(hidePreloader, 4500);

  /* =====================================
     CURRENT YEAR
  ===================================== */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  /* =====================================
     ACTIVE NAVIGATION
  ===================================== */

  const normalisePage = value => {
    return value
      .replace(/\/$/, "")
      .split("/")
      .pop()
      .replace(/\.html$/, "")
      .replace(/^index$/, "home")
      .toLowerCase();
  };

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href") || "";
    const target = normalisePage(href);

    if (target === page.toLowerCase()) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* =====================================
     MOBILE NAVIGATION
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
      const isOpen = !mainNav.classList.contains("open");

      mainNav.classList.toggle("open", isOpen);
      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeMenu();
    });
  }

  /* =====================================
     SCROLL PROGRESS + HEADER
  ===================================== */

  let scrollTicking = false;

  const updateScrollEffects = () => {
    const scrollTop = window.scrollY;

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress = scrollable > 0
      ? Math.min(scrollTop / scrollable, 1)
      : 0;

    body.style.setProperty(
      "--scroll-progress",
      progress
    );

    document
      .querySelector(".site-header")
      ?.classList.toggle("scrolled", scrollTop > 35);

    scrollTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    scrollTicking = true;
    requestAnimationFrame(updateScrollEffects);
  }, { passive: true });

  updateScrollEffects();

  /* =====================================
     SCROLL REVEAL + STAGGER
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  revealElements.forEach(element => {
    const parent = element.parentElement;

    const siblings = parent
      ? Array.from(parent.children).filter(child =>
          child.matches(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
          )
        )
      : [];

    const siblingIndex = Math.max(
      0,
      siblings.indexOf(element)
    );

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(siblingIndex * 100, 450)}ms`
    );
  });

  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
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
  }

  /* =====================================
     ADVANCED CUSTOM CURSOR
     Dot and ring use identical coordinates.
  ===================================== */

  let cursorDot = document.querySelector(".cursor-dot");
  let cursorRing = document.querySelector(".cursor-ring");

  if (finePointer && !reduceMotion) {

    // Create cursor elements if missing.
    if (!cursorDot) {
      cursorDot = document.createElement("div");
      cursorDot.className = "cursor-dot";
      body.appendChild(cursorDot);
    }

    if (!cursorRing) {
      cursorRing = document.createElement("div");
      cursorRing.className = "cursor-ring";
      body.appendChild(cursorRing);
    }

    cursorDot.setAttribute("aria-hidden", "true");
    cursorRing.setAttribute("aria-hidden", "true");

    body.classList.add("custom-cursor");

    const moveCursor = (x, y) => {
      const position =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      cursorDot.style.transform = position;
      cursorRing.style.transform = position;
    };

    const showCursor = () => {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    };

    const hideCursor = () => {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
    };

    document.addEventListener("pointermove", event => {
      moveCursor(event.clientX, event.clientY);
      showCursor();
    }, { passive: true });

    document.addEventListener("pointerover", event => {
      const target = event.target.closest(
        "a, button, input, textarea, select, summary, [data-cursor-hover]"
      );

      cursorRing.classList.toggle(
        "cursor-hover",
        Boolean(target)
      );
    });

    document.addEventListener("pointerdown", () => {
      cursorRing.classList.add("cursor-click");
    });

    document.addEventListener("pointerup", () => {
      cursorRing.classList.remove("cursor-click");
    });

    document.addEventListener("pointerout", event => {
      if (!event.relatedTarget) hideCursor();
    });

    window.addEventListener("blur", hideCursor);
    window.addEventListener("focus", showCursor);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) hideCursor();
    });
  }

  /* =====================================
     MAGNETIC BUTTONS
     Uses individual translate property
     to preserve existing CSS transforms.
  ===================================== */

  if (finePointer && !reduceMotion) {
    document
      .querySelectorAll(".magnetic, [data-magnetic]")
      .forEach(element => {

        element.addEventListener("pointermove", event => {
          const rect = element.getBoundingClientRect();

          const x =
            event.clientX - rect.left - rect.width / 2;

          const y =
            event.clientY - rect.top - rect.height / 2;

          element.style.translate =
            `${x * 0.12}px ${y * 0.16}px`;
        });

        element.addEventListener("pointerleave", () => {
          element.style.translate = "";
        });
      });
  }

  /* =====================================
     3D TILT CARDS
  ===================================== */

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".tilt-card").forEach(card => {

      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

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
     HERO 3D PARALLAX
     Does not overwrite the sphere's
     original CSS transform.
  ===================================== */

  const heroScene = document.querySelector(
    "[data-hero-scene]"
  );

  if (heroScene && finePointer && !reduceMotion) {
    const sphere = heroScene.querySelector(".core-sphere");
    const orbit = heroScene.querySelector(".hero-orbit");

    heroScene.addEventListener("pointermove", event => {
      const rect = heroScene.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      if (sphere) {
        sphere.style.translate =
          `${x * 12}px ${y * 12}px`;
      }

      if (orbit) {
        orbit.style.translate =
          `${-x * 10}px ${-y * 10}px`;
      }
    });

    heroScene.addEventListener("pointerleave", () => {
      if (sphere) sphere.style.translate = "";
      if (orbit) orbit.style.translate = "";
    });
  }

  /* =====================================
     FAQ ACCORDION
  ===================================== */

  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      const group = item.parentElement;

      group?.querySelectorAll(".faq-item[open]").forEach(other => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });

  /* =====================================
     CONTACT LINKS
  ===================================== */

  document.querySelectorAll("[data-email]").forEach(link => {
    link.href = `mailto:${TATVA_CONFIG.email}`;
  });

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    if (!TATVA_CONFIG.whatsapp) return;

    link.href = `https://wa.me/${TATVA_CONFIG.whatsapp}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-instagram]").forEach(link => {
    if (!TATVA_CONFIG.instagram) return;

    link.href = TATVA_CONFIG.instagram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-linkedin]").forEach(link => {
    if (!TATVA_CONFIG.linkedin) return;

    link.href = TATVA_CONFIG.linkedin;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  /* =====================================
     CONTACT FORM
     Opens the visitor's email application.
  ===================================== */

  const contactForm = document.querySelector("#contact-form");
  const formNote = document.querySelector("#form-note");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);

      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const project = data.get("project") || "";
      const budget = data.get("budget") || "";
      const message = data.get("message") || "";

      const subject = encodeURIComponent(
        `New website enquiry from ${name}`
      );

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
        `mailto:${TATVA_CONFIG.email}` +
        `?subject=${subject}` +
        `&body=${encodeURIComponent(bodyText)}`;

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

  document
    .querySelectorAll("[data-back-to-top]")
    .forEach(button => {
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

  if (
    !reduceMotion &&
    "IntersectionObserver" in window
  ) {
    const images = document.querySelectorAll(
      ".project-visual img, .image-reveal"
    );

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("image-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15
      }
    );

    images.forEach(image => {
      imageObserver.observe(image);
    });
  }

  /* =====================================
     REMOVE OLD BROKEN LOADERS
  ===================================== */

  document.querySelectorAll(
    ".loader, .preloader:not(.site-preloader), #loader, #preloader, .loading-screen"
  ).forEach(oldLoader => {
    oldLoader.style.display = "none";
    oldLoader.style.pointerEvents = "none";
  });

  /* =====================================
     PAGE READY
  ===================================== */

  requestAnimationFrame(() => {
    body.classList.add("page-loaded");
  });

});

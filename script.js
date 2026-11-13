
/* =========================================
   TATVA WEBS
   Website Interactions
   ========================================= */

const TATVA_CONFIG = {
  email: "hello@tatvawebs.com",
  whatsapp: "",
  instagram: "",
  linkedin: ""
};

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     LOADER
     ========================================= */

  const loader = document.querySelector(".loader");

  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");

    if (loader) {
      loader.classList.add("loader-hidden");

      setTimeout(() => {
        loader.remove();
      }, 900);
    }
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

  const currentPage = document.body.dataset.page;

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");

    if (
      href &&
      (
        href === `${currentPage}.html` ||
        (currentPage === "home" && href === "index.html")
      )
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
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
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
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
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }


  /* =========================================
     SCROLL REVEAL
     ========================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
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
      element.classList.add("visible");
    });
  }


  /* =========================================
     PROCESS TIMELINE
     ========================================= */

  document.querySelectorAll(".info-card").forEach((card, index) => {
    if (document.body.dataset.page === "process") {
      card.dataset.stage = String(index + 1).padStart(2, "0");
    }
  });


  /* =========================================
     SCROLL PROGRESS
     ========================================= */

  const progressBar = document.querySelector(".scroll-progress");

  function updateScrollProgress() {
    if (!progressBar) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();


  /* =========================================
     CUSTOM CURSOR
     ========================================= */

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  const canUseCustomCursor =
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (cursorDot && cursorRing && canUseCustomCursor) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let cursorVisible = false;

    document.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      if (!cursorVisible) {
        cursorDot.classList.add("visible");
        cursorRing.classList.add("visible");
        cursorVisible = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("visible");
      cursorRing.classList.remove("visible");
      cursorVisible = false;
    });

    document.addEventListener("mouseenter", () => {
      cursorDot.classList.add("visible");
      cursorRing.classList.add("visible");
      cursorVisible = true;
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, .tilt-card, .project-card, summary"
    );

    interactiveElements.forEach(element => {

      element.addEventListener("mouseenter", () => {
        cursorDot.classList.add("cursor-hover");
        cursorRing.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("cursor-hover");
        cursorRing.classList.remove("cursor-hover");
      });

    });

    document.addEventListener("mousedown", () => {
      cursorDot.classList.add("cursor-click");
      cursorRing.classList.add("cursor-click");
    });

    document.addEventListener("mouseup", () => {
      cursorDot.classList.remove("cursor-click");
      cursorRing.classList.remove("cursor-click");
    });
  }


  /* =========================================
     CURSOR REACTIVE LIGHTING
     ========================================= */

  if (canUseCustomCursor) {

    document.addEventListener("mousemove", event => {

      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      document.body.style.setProperty("--mouse-x", `${x}%`);
      document.body.style.setProperty("--mouse-y", `${y}%`);

    });

  }


  /* =========================================
     MAGNETIC BUTTONS
     ========================================= */

  const magneticButtons = document.querySelectorAll(".magnetic");

  if (canUseCustomCursor) {

    magneticButtons.forEach(button => {

      button.addEventListener("mousemove", event => {

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;

      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });

    });

  }


  /* =========================================
     3D TILT CARDS
     ========================================= */

  const tiltCards = document.querySelectorAll(".tilt-card");

  if (canUseCustomCursor) {

    tiltCards.forEach(card => {

      card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        card.style.setProperty("--card-mouse-x", `${x}px`);
        card.style.setProperty("--card-mouse-y", `${y}px`);

      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

    });

  }


  /* =========================================
     HERO LIGHTING
     ========================================= */

  const heroArt = document.querySelector("[data-hero-scene]");

  if (heroArt && canUseCustomCursor) {

    heroArt.addEventListener("mousemove", event => {

      const rect = heroArt.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      heroArt.style.setProperty("--scene-x", `${(x - 0.5) * 22}px`);
      heroArt.style.setProperty("--scene-y", `${(y - 0.5) * 22}px`);

      heroArt.style.setProperty("--light-x", `${x * 100}%`);
      heroArt.style.setProperty("--light-y", `${y * 100}%`);

    });

    heroArt.addEventListener("mouseleave", () => {
      heroArt.style.setProperty("--scene-x", "0px");
      heroArt.style.setProperty("--scene-y", "0px");
      heroArt.style.setProperty("--light-x", "50%");
      heroArt.style.setProperty("--light-y", "50%");
    });

  }


  /* =========================================
     CONTACT DETAILS
     ========================================= */

  document.querySelectorAll("[data-contact-email]").forEach(element => {
    element.textContent = TATVA_CONFIG.email;

    if (TATVA_CONFIG.email) {
      element.href = `mailto:${TATVA_CONFIG.email}`;
    }
  });

  document.querySelectorAll("[data-whatsapp]").forEach(element => {

    if (TATVA_CONFIG.whatsapp) {
      element.href =
        `https://wa.me/${TATVA_CONFIG.whatsapp.replace(/\D/g, "")}`;
    } else {
      element.style.display = "none";
    }

  });

  document.querySelectorAll("[data-instagram]").forEach(element => {

    if (TATVA_CONFIG.instagram) {
      element.href = TATVA_CONFIG.instagram;
    } else {
      element.style.display = "none";
    }

  });

  document.querySelectorAll("[data-linkedin]").forEach(element => {

    if (TATVA_CONFIG.linkedin) {
      element.href = TATVA_CONFIG.linkedin;
    } else {
      element.style.display = "none";
    }

  });


  /* =========================================
     CONTACT FORM
     ========================================= */

  const contactForm = document.querySelector("#contact-form");
  const formNote = document.querySelector("#form-note");

  if (contactForm) {

    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(contactForm);

      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const service = formData.get("service") || "Not specified";
      const budget = formData.get("budget") || "Not specified";
      const message = formData.get("message") || "";

      if (!name.trim() || !email.trim() || !message.trim()) {

        if (formNote) {
          formNote.textContent =
            "Please complete all required fields.";
        }

        return;
      }

      const subject = encodeURIComponent(
        `New project enquiry from ${name}`
      );

      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Service: ${service}\n` +
        `Budget: ${budget}\n\n` +
        `Message:\n${message}`
      );

      if (formNote) {
        formNote.textContent =
          "Opening your email app. Please send the prepared message to complete your enquiry.";
      }

      window.location.href =
        `mailto:${TATVA_CONFIG.email}?subject=${subject}&body=${body}`;

    });

  }


  /* =========================================
     FAQ ACCORDION
     ========================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });

    });

  });

});


/* =========================================
   HERO PARALLAX
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const heroScene = document.querySelector("[data-hero-scene]");

  if (!heroScene) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;

  if (reduceMotion || !finePointer) return;

  const heroCore = heroScene.querySelector(".hero-core");
  const heroPanel = heroScene.querySelector(".hero-interface");

  heroScene.addEventListener("mousemove", event => {

    const rect = heroScene.getBoundingClientRect();

    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

    if (heroCore) {
      heroCore.style.setProperty(
        "--parallax-x",
        `${mouseX * 14}px`
      );

      heroCore.style.setProperty(
        "--parallax-y",
        `${mouseY * 14}px`
      );
    }

    if (heroPanel) {
      heroPanel.style.setProperty(
        "--panel-x",
        `${mouseX * -10}px`
      );

      heroPanel.style.setProperty(
        "--panel-y",
        `${mouseY * -10}px`
      );
    }

  });

  heroScene.addEventListener("mouseleave", () => {

    if (heroCore) {
      heroCore.style.setProperty("--parallax-x", "0px");
      heroCore.style.setProperty("--parallax-y", "0px");
    }

    if (heroPanel) {
      heroPanel.style.setProperty("--panel-x", "0px");
      heroPanel.style.setProperty("--panel-y", "0px");
    }

  });

});
/* =========================================
   TATVA WEBS — ADVANCED CURSOR ENGINE
========================================= */

(() => {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!finePointer || reducedMotion) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!dot || !ring) return;

  const state = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    ringX: window.innerWidth / 2,
    ringY: window.innerHeight / 2,
    active: false,
    hovering: false
  };

  const interactive = [
    "a",
    "button",
    "input",
    "textarea",
    "select",
    "summary",
    "[role='button']",
    ".magnetic",
    ".tilt-card"
  ].join(",");

  const textFields = "input, textarea, [contenteditable='true']";

  function updatePosition(element, x, y, size) {
    element.style.transform =
      `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
  }

  function animate() {
    state.ringX += (state.mouseX - state.ringX) * 0.16;
    state.ringY += (state.mouseY - state.ringY) * 0.16;

    updatePosition(dot, state.mouseX, state.mouseY, 6);
    updatePosition(ring, state.ringX, state.ringY, 34);

    requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", (event) => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;

    if (!state.active) {
      state.active = true;
      document.body.classList.add("cursor-active");
    }
  });

  document.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const isInteractive = target.closest(interactive);
    const isText = target.closest(textFields);

    document.body.classList.toggle("cursor-hover", !!isInteractive);
    document.body.classList.toggle("cursor-text", !!isText);
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-click");
  });

  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-active");
  });

  document.addEventListener("mouseenter", () => {
    if (state.active) {
      document.body.classList.add("cursor-active");
    }
  });

  window.addEventListener("blur", () => {
    document.body.classList.remove(
      "cursor-active",
      "cursor-hover",
      "cursor-click",
      "cursor-text"
    );
  });

  animate();
})();

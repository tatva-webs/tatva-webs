
/* =========================================
   TATVA WEBS — MAIN INTERACTIONS
   Shared across all website pages
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
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  /* -----------------------------------------
     LOADER
  ----------------------------------------- */

  const loader = document.querySelector(".loader");

  const hideLoader = () => {
    if (loader) loader.classList.add("done");
  };

  if (loader) {
    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    // Safety fallback if a resource takes too long.
    window.setTimeout(hideLoader, 3500);
  }

  /* -----------------------------------------
     COPYRIGHT YEAR
  ----------------------------------------- */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  /* -----------------------------------------
     ACTIVE NAVIGATION
  ----------------------------------------- */

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href") || "";
    const target = href.split("/").pop().replace(".html", "");

    const isActive =
      (page === "home" && (target === "index" || target === "")) ||
      target === page;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  /* -----------------------------------------
     MOBILE NAVIGATION
  ----------------------------------------- */

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  const closeMenu = () => {
    if (!toggle || !nav) return;

    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", event => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* -----------------------------------------
     SCROLL REVEAL
  ----------------------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  /* -----------------------------------------
     PROCESS PAGE NUMBERING
  ----------------------------------------- */

  if (page === "process") {
    document.querySelectorAll(".info-card").forEach((card, index) => {
      card.setAttribute(
        "data-stage",
        String(index + 1).padStart(2, "0")
      );
    });
  }

  /* -----------------------------------------
     SCROLL PROGRESS
  ----------------------------------------- */

  const progress = document.querySelector(".scroll-progress");
  let scrollTicking = false;

  const updateProgress = () => {
    if (!progress) return;

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

    progress.style.width = `${percentage}%`;
    scrollTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateProgress);
      scrollTicking = true;
    }
  }, { passive: true });

  updateProgress();

  /* -----------------------------------------
     DESKTOP CURSOR
  ----------------------------------------- */

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (finePointer && !reduceMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
        dot.style.opacity = "1";
      }

      if (ring) ring.style.opacity = "1";

      body.style.setProperty("--cursor-x", `${mouseX}px`);
      body.style.setProperty("--cursor-y", `${mouseY}px`);
    }, { passive: true });

    const followCursor = () => {
      ringX += (mouseX - ringX) * 0.32;
      ringY += (mouseY - ringY) * 0.32;

      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }

      requestAnimationFrame(followCursor);
    };

    if (ring) requestAnimationFrame(followCursor);

    document.querySelectorAll("a, button, summary").forEach(element => {
      element.addEventListener("mouseenter", () => {
        ring?.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        ring?.classList.remove("hover");
      });
    });

    document.addEventListener("mousedown", () => {
      if (ring) {
        ring.style.width = "22px";
        ring.style.height = "22px";
      }
    });

    document.addEventListener("mouseup", () => {
      if (ring) {
        ring.style.width = "";
        ring.style.height = "";
      }
    });

    /* -----------------------------------------
       MAGNETIC BUTTONS
    ----------------------------------------- */

    if (!reduceMotion) {
      document.querySelectorAll(".magnetic").forEach(element => {
        element.addEventListener("mousemove", event => {
          const rect = element.getBoundingClientRect();

          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);

          element.style.transform =
            `translate(${dx * 0.10}px, ${dy * 0.14}px)`;
        });

        element.addEventListener("mouseleave", () => {
          element.style.transform = "";
        });
      });

      /* -----------------------------------------
         3D TILT CARDS
      ----------------------------------------- */

      document.querySelectorAll(".tilt-card").forEach(card => {
        card.addEventListener("mousemove", event => {
          const rect = card.getBoundingClientRect();

          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;

          const rotateX = (0.5 - py) * 5;
          const rotateY = (px - 0.5) * 7;

          card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;

          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
    }

    /* -----------------------------------------
       HERO LIGHTING
    ----------------------------------------- */

    const heroArt = document.querySelector(".hero-art");

    if (heroArt) {
      heroArt.addEventListener("pointermove", event => {
        const rect = heroArt.getBoundingClientRect();

        heroArt.style.setProperty(
          "--spot-x",
          `${event.clientX - rect.left}px`
        );

        heroArt.style.setProperty(
          "--spot-y",
          `${event.clientY - rect.top}px`
        );
      }, { passive: true });
    }
  }

  /* -----------------------------------------
     CONTACT DETAILS
  ----------------------------------------- */

  document.querySelectorAll("[data-email]").forEach(element => {
    element.textContent = TATVA_CONFIG.email;
  });

  document.querySelectorAll("[data-email-link]").forEach(element => {
    element.href = `mailto:${TATVA_CONFIG.email}`;
  });

  document.querySelectorAll("[data-whatsapp]").forEach(element => {
    if (TATVA_CONFIG.whatsapp) {
      element.textContent = "Chat with us";
      element.href = `https://wa.me/${TATVA_CONFIG.whatsapp}`;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  });

  /* -----------------------------------------
     CONTACT FORM
  ----------------------------------------- */

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      const subject = encodeURIComponent(
        `Tatva Webs project enquiry — ${data.get("name") || ""}`
      );

      const bodyText = [
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Company: ${data.get("company") || ""}`,
        `Project type: ${data.get("project") || ""}`,
        "",
        "Project details:",
        data.get("details") || ""
      ].join("\n");

      const mailto =
        `mailto:${TATVA_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      const note = document.getElementById("form-note");

      if (note) {
        note.textContent =
          "Your email app should open with the enquiry prepared. Send the email to complete your enquiry.";
      }

      window.location.href = mailto;
    });
  }

  /* -----------------------------------------
     FAQ ACCORDION
     Allows one open item at a time
  ----------------------------------------- */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });

});

/* =========================================
   TATVA WEBS — CINEMATIC HERO PARALLAX
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const heroScene = document.querySelector("[data-hero-scene]");

  if (!heroScene) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (reduceMotion || !finePointer) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame = null;

  const animateScene = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    heroScene.style.setProperty("--scene-x", `${currentX}px`);
    heroScene.style.setProperty("--scene-y", `${currentY}px`);

    if (
      Math.abs(targetX - currentX) > 0.05 ||
      Math.abs(targetY - currentY) > 0.05
    ) {
      animationFrame = requestAnimationFrame(animateScene);
    } else {
      currentX = targetX;
      currentY = targetY;
      animationFrame = null;
    }
  };

  const scheduleAnimation = () => {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateScene);
    }
  };

  heroScene.addEventListener("pointermove", event => {
    const rect = heroScene.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    targetX = x * 20;
    targetY = y * 16;

    scheduleAnimation();
  }, { passive: true });

  heroScene.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    scheduleAnimation();
  });
});

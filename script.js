
// TATVA WEBS — editable business settings
const TATVA_CONFIG = {
  email: "hello@tatvawebs.com",
  whatsapp: "",
  instagram: "",
  linkedin: ""
};

document.addEventListener("DOMContentLoaded", () => {

  // LOADER
  const loader = document.querySelector(".loader");

  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("done"), 550);
    });
  }

  // COPYRIGHT YEAR
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ACTIVE NAVIGATION
  const page = document.body.dataset.page;

  document.querySelectorAll(".main-nav a").forEach(a => {
    const target = a.getAttribute("href").replace(".html", "");

    if (
      (page === "home" && target === "index") ||
      target === page
    ) {
      a.classList.add("active");
    }
  });

  // MOBILE NAVIGATION
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  // CLOSE MENU WITH ESCAPE KEY
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }
});

// CLOSE MENU WHEN CLICKING OUTSIDE
document.addEventListener("click", e => {
  if (
    nav.classList.contains("open") &&
    !nav.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

  // REVEAL ANIMATIONS
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });

  if (page === "process") {
    document.querySelectorAll(".info-card").forEach((card, index) => {
      card.setAttribute(
        "data-stage",
        String(index + 1).padStart(2, "0")
      );
    });
  }

  // SCROLL PROGRESS
  const progress = document.querySelector(".scroll-progress");

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) {
      progress.style.width =
        (max > 0 ? window.scrollY / max * 100 : 0) + "%";
    }
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // DESKTOP CURSOR
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (window.matchMedia("(pointer: fine)").matches) {

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;

    // INSTANT DOT MOVEMENT
    document.addEventListener("mousemove", e => {
      x = e.clientX;
      y = e.clientY;

      if (dot) {
        dot.style.opacity = "1";
        dot.style.left = x + "px";
        dot.style.top = y + "px";
      }

      if (ring) {
        ring.style.opacity = "1";
      }
    }, { passive: true });

    // FASTER AND SMOOTHER RING
    const follow = () => {

      rx += (x - rx) * 0.38;
      ry += (y - ry) * 0.38;

      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }

      requestAnimationFrame(follow);
    };

    follow();

    // CURSOR HOVER EFFECT
    document.querySelectorAll("a, button, summary").forEach(el => {

      el.addEventListener("mouseenter", () => {
        ring?.classList.add("hover");
      });

      el.addEventListener("mouseleave", () => {
        ring?.classList.remove("hover");
      });

    });

    // CLICK EFFECT
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

    // MAGNETIC BUTTONS
    document.querySelectorAll(".magnetic").forEach(el => {

      el.addEventListener("mousemove", e => {

        const r = el.getBoundingClientRect();

        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);

        el.style.transform =
          `translate(${dx * 0.12}px, ${dy * 0.18}px)`;

      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });

    });

    // 3D TILT CARDS
    document.querySelectorAll(".tilt-card").forEach(card => {

      card.addEventListener("mousemove", e => {

        const r = card.getBoundingClientRect();

        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;

        card.style.transform =
          `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 7}deg) translateY(-3px)`;

        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);

      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

    });

    // HERO CURSOR GLOW
    const art = document.querySelector(".hero-art");

    if (art) {

      art.addEventListener("mousemove", e => {

        const r = art.getBoundingClientRect();

        art.style.setProperty(
          "--spot-x",
          `${e.clientX - r.left}px`
        );

        art.style.setProperty(
          "--spot-y",
          `${e.clientY - r.top}px`
        );

      });

    }
  }

  // CONTACT DETAILS
  document.querySelectorAll("[data-email]").forEach(el => {
    el.textContent = TATVA_CONFIG.email;
  });

  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = "mailto:" + TATVA_CONFIG.email;
  });

  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    if (TATVA_CONFIG.whatsapp) {
      el.textContent = "Chat with us";
      el.href = "https://wa.me/" + TATVA_CONFIG.whatsapp;
    }
  });

  // CONTACT FORM
  const form = document.getElementById("contact-form");

  if (form) {

    form.addEventListener("submit", e => {

      e.preventDefault();

      const data = new FormData(form);

      const subject = encodeURIComponent(
        "Tatva Webs project enquiry — " + data.get("name")
      );

      const body = encodeURIComponent(
        `Name: ${data.get("name")}\n` +
        `Email: ${data.get("email")}\n` +
        `Company: ${data.get("company")}\n` +
        `Project type: ${data.get("project")}\n\n` +
        `Project details:\n${data.get("details")}`
      );

      window.location.href =
        `mailto:${TATVA_CONFIG.email}?subject=${subject}&body=${body}`;

      const note = document.getElementById("form-note");

      if (note) {
        note.textContent =
          "Your email app should open with the enquiry prepared. Please send it from your email app to complete the enquiry.";
      }

    });

  }

});
// ========================================
// TATVA WEBS — CINEMATIC HERO PARALLAX
// ========================================

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

      heroScene.style.setProperty("--scene-x", `${currentX}px`);
      heroScene.style.setProperty("--scene-y", `${currentY}px`);

      animationFrame = null;
    }
  };

  const scheduleAnimation = () => {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateScene);
    }
  };

  heroScene.addEventListener("pointermove", (event) => {
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

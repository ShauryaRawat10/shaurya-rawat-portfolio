const EMAIL = "shauryarawatrwt10@gmail.com";

const STUDIO_PROFILES = {
  Instagram: "https://www.instagram.com/shaurya_rawat_rwt/",
  Behance: "https://www.behance.net/shauryarawat",
  GitHub: "https://github.com/ShauryaRawat10",
};

const STUDIO_WORKS = [
  {
    src: "./studio/Sketching-cheetah.webp",
    title: "Sketching Cheetah",
    tag: "Painting",
    source: "Instagram",
    span: "wide",
  },
  {
    src: "./studio/marathon-shaurya.webp",
    title: "Marathon",
    tag: "Stage",
    source: "Event",
    span: "tall",
  },
  {
    src: "./studio/Matte-painting.webp",
    title: "Matte Painting",
    tag: "Painting",
    source: "Behance",
    span: "tall",
  },
  {
    src: "./studio/mandala.webp",
    title: "Mandala",
    tag: "Painting",
    source: "Behance",
    span: "sq",
  },
  {
    src: "./studio/native-american-graphics.webp",
    title: "Graphics",
    tag: "Graphics",
    source: "Behance",
    span: "sq",
  },
  /*
  {
    src: "./studio/Modeling-shaurya-01.webp",
    title: "Photoshoot",
    tag: "Modeling",
    source: "Instagram",
    span: "tall",
  },
  */
  {
    src: "./studio/UKG-BrandingCeremony.webp",
    title: "UKG Rebranding Ceremony",
    tag: "Stage",
    source: "Event",
    span: "tall",
  },
];

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Studio external profile links
Object.entries(STUDIO_PROFILES).forEach(([name, href]) => {
  const link = document.querySelector(`[data-studio-profile="${name}"]`);
  if (link) {
    link.href = href;
  }
});

// Mobile Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      siteNav.classList.contains("is-open") &&
      !siteNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Studio gallery & Lightbox
const studioGrid = document.getElementById("studio-grid");
const lightbox = document.getElementById("studio-lightbox");
const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxClose = document.getElementById("lightbox-close");

let currentFilteredWorks = [...STUDIO_WORKS];
let activeLightboxIndex = 0;

function updateLightboxContent(index) {
  if (!lightbox || currentFilteredWorks.length === 0) return;
  activeLightboxIndex = (index + currentFilteredWorks.length) % currentFilteredWorks.length;
  const work = currentFilteredWorks[activeLightboxIndex];
  if (lightboxImg) {
    lightboxImg.src = work.src;
    lightboxImg.alt = work.title;
  }
  if (lightboxCaption) {
    lightboxCaption.textContent = `${work.title} · ${work.tag} · ${work.source}`;
  }
}

function openLightbox(index) {
  updateLightboxContent(index);
  if (lightbox && typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function renderStudio(filter = "all") {
  if (!studioGrid) return;
  studioGrid.innerHTML = "";

  currentFilteredWorks = STUDIO_WORKS.filter(
    (work) => filter === "all" || work.tag === filter
  );

  currentFilteredWorks.forEach((work, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `studio-card span-${work.span || "sq"}`;
    card.setAttribute("aria-label", `View ${work.title}`);

    card.innerHTML = `
      <img
        src="${work.src}"
        alt="${work.title}"
        loading="lazy"
      />
      <figcaption>
        <h3>${work.title}</h3>
        <span class="source">${work.source}</span>
      </figcaption>
    `;

    card.addEventListener("click", () => {
      openLightbox(index);
    });

    studioGrid.appendChild(card);
  });
}

renderStudio();

// Studio category filters
document.querySelectorAll(".studio-filters .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".studio-filters .chip").forEach((btn) => {
      btn.classList.remove("is-on");
      btn.setAttribute("aria-pressed", "false");
    });

    chip.classList.add("is-on");
    chip.setAttribute("aria-pressed", "true");
    renderStudio(chip.dataset.filter);
  });
});

// Lightbox navigation controls
if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    updateLightboxContent(activeLightboxIndex - 1);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    updateLightboxContent(activeLightboxIndex + 1);
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    if (lightbox) lightbox.close();
  });
}

if (lightbox) {
  // Backdrop click only closes if clicking outside the dialog content
  lightbox.addEventListener("click", (event) => {
    const rect = lightbox.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;
    if (!isInDialog) {
      lightbox.close();
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowRight") {
      updateLightboxContent(activeLightboxIndex + 1);
    } else if (event.key === "ArrowLeft") {
      updateLightboxContent(activeLightboxIndex - 1);
    }
  });
}

// Copy email to clipboard
const copyEmailBtn = document.getElementById("copy-email-btn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    const copyText = copyEmailBtn.querySelector(".copy-text");
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyEmailBtn.classList.add("copied");
      if (copyText) copyText.textContent = "Copied! ✓";
      setTimeout(() => {
        copyEmailBtn.classList.remove("copied");
        if (copyText) copyText.textContent = "Copy";
      }, 2400);
    } catch {
      if (copyText) copyText.textContent = "Copy failed";
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copy";
      }, 2400);
    }
  });
}

// Contact form submission via Formspree
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const contactSubmit = document.getElementById("contact-submit");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (contactSubmit) {
      contactSubmit.disabled = true;
      contactSubmit.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.textContent = "";
      formStatus.classList.remove("is-visible");
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        contactForm.reset();

        if (formStatus) {
          formStatus.textContent =
            "Message sent successfully. Thank you!";
          formStatus.classList.add("is-visible");
        }
      } else {
        const errorMessage =
          data?.errors?.map(error => error.message).join(", ") ||
          "Something went wrong. Please try again.";

        if (formStatus) {
          formStatus.textContent = errorMessage;
          formStatus.classList.add("is-visible");
        }
      }

    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          "Unable to send the message right now. Please try again.";
        formStatus.classList.add("is-visible");
      }

    } finally {
      if (contactSubmit) {
        contactSubmit.disabled = false;
        contactSubmit.textContent = "Send a note";
      }
    }
  });
}

// Back to Top button
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    },
    { passive: true }
  );

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Path — snake career board + selected-work hover cards
const pathChips = document.querySelectorAll(".path-filters .chip");
const careerSnake = document.getElementById("career-snake");
const educationPath = document.getElementById("education-path");
const pathNodes = document.querySelectorAll(".path-node[data-company]");

function getSelectedWorkForCompany(company) {
  if (!company) return [];

  return [...document.querySelectorAll(".project-timeline-item .project-featured")].filter((project) => {
    const employerLogo = project.querySelector(".project-left-brand img");
    return employerLogo && employerLogo.alt.trim().toLowerCase() === company.toLowerCase();
  });
}

function buildPathProjectCard(project) {
  const link = project.querySelector(".project-details-link");
  const title = link?.textContent.trim() || "Selected work";
  const href = link?.getAttribute("href") || "#work";
  const tag = project.querySelector(".tag")?.textContent.trim() || "";
  const logo = project.querySelector(".project-right-brand img") || project.querySelector(".project-left-brand img");
  const logoSrc = logo?.getAttribute("src") || "";
  const clientLogoAlt = logo?.getAttribute("alt") || "";

  const card = document.createElement("a");
  card.className = "path-project-card";
  card.href = href;
  card.innerHTML = `
    <img class="path-project-logo" src="${logoSrc}" alt="${clientLogoAlt}">
    <span class="path-project-copy">
      <strong>${title}</strong>
      <span>${tag}</span>
    </span>
    <span class="path-project-arrow" aria-hidden="true">↗</span>
  `;
  return card;
}

function populatePathWorkCards() {
  pathNodes.forEach((node) => {
    const company = node.dataset.company;
    const popover = node.querySelector(".path-work-popover");
    if (!popover) return;

    popover.innerHTML = "";
    const projects = getSelectedWorkForCompany(company);

    if (!projects.length) {
      popover.innerHTML = `<div class="path-empty">No selected-work cards linked to ${company} yet.</div>`;
      return;
    }

    projects.forEach((project) => popover.appendChild(buildPathProjectCard(project)));
  });
}

function setPathFilter(filter) {
  const isEducation = filter === "education";
  const showExperience = filter === "experience" || filter === "all";

  if (careerSnake) careerSnake.hidden = !showExperience;
  if (educationPath) educationPath.hidden = !isEducation && filter !== "all";

  if (filter === "all" && careerSnake && educationPath) {
    careerSnake.hidden = false;
    educationPath.hidden = false;
  }
}

if (pathChips.length) {
  populatePathWorkCards();

  const activeChip = document.querySelector(".path-filters .chip.is-on");
  if (activeChip) setPathFilter(activeChip.dataset.pathFilter);

  pathChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      pathChips.forEach((btn) => {
        btn.classList.remove("is-on");
        btn.setAttribute("aria-pressed", "false");
      });

      chip.classList.add("is-on");
      chip.setAttribute("aria-pressed", "true");
      setPathFilter(chip.dataset.pathFilter);
    });
  });
}

// Live experience counter — calculated from the start of the first role to today.
const experienceTotalValue = document.getElementById("experience-total-value");
const experienceStartNode = document.querySelector('.path-node[data-start]');

function getLiveExperienceYears() {
  const startValue = experienceStartNode?.dataset.start || "2020-08";
  const [year, month] = startValue.split("-").map(Number);
  const startDate = new Date(year, (month || 1) - 1, 1);
  const now = new Date();
  const millisecondsPerYear = 365.2425 * 24 * 60 * 60 * 1000;
  return Math.max(0, (now - startDate) / millisecondsPerYear);
}

function animateExperienceTotal() {
  if (!experienceTotalValue) return;

  const target = getLiveExperienceYears();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    experienceTotalValue.textContent = target.toFixed(1);
    return;
  }

  const duration = 1100;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    experienceTotalValue.textContent = (target * eased).toFixed(1);

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

if (experienceTotalValue) {
  const counterSection = document.querySelector("#notes");
  if (counterSection && "IntersectionObserver" in window) {
    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting) && !hasAnimated) {
        hasAnimated = true;
        animateExperienceTotal();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(counterSection);
  } else {
    animateExperienceTotal();
  }
}

// Desktop interaction: the nearest company responds continuously to cursor proximity.
// The effect is intentionally subtle: cards stay quiet at rest and become larger as
// the pointer enters their local field, without rearranging the composition.
if (careerSnake && pathNodes.length) {
  const supportsPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let pointerFrame = null;

  const resetPathProximity = () => {
    pathNodes.forEach((node) => {
      const card = node.querySelector(".path-node-card");
      if (!card) return;
      card.style.setProperty("--proximity", "0");
      card.style.setProperty("--card-x", "0px");
      card.style.setProperty("--card-y", "0px");
    });
  };

  const updatePathProximity = (event) => {
    if (!supportsPointer) return;
    if (pointerFrame) cancelAnimationFrame(pointerFrame);

    pointerFrame = requestAnimationFrame(() => {
      const boardRect = careerSnake.getBoundingClientRect();
      const px = event.clientX;
      const py = event.clientY;
      const influenceRadius = Math.max(230, Math.min(310, boardRect.width * 0.32));

      pathNodes.forEach((node) => {
        const card = node.querySelector(".path-node-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const distance = Math.hypot(dx, dy);
        const proximity = Math.max(0, Math.min(1, 1 - distance / influenceRadius));

        // Only a tiny magnetic nudge; scale remains the dominant effect.
        const pull = proximity * 5;
        const x = distance ? (dx / distance) * pull : 0;
        const y = distance ? (dy / distance) * pull : 0;

        card.style.setProperty("--proximity", proximity.toFixed(3));
        card.style.setProperty("--card-x", `${x.toFixed(2)}px`);
        card.style.setProperty("--card-y", `${y.toFixed(2)}px`);
      });

      pointerFrame = null;
    });
  };

  careerSnake.addEventListener("pointermove", updatePathProximity, { passive: true });
  careerSnake.addEventListener("pointerleave", resetPathProximity, { passive: true });
}

// On touch/mobile, tap a company node to reveal its work cards.
pathNodes.forEach((node) => {
  node.addEventListener("click", (event) => {
    if (window.matchMedia("(max-width: 600px)").matches && !event.target.closest("a")) {
      pathNodes.forEach((other) => {
        if (other !== node) other.classList.remove("is-active");
      });
      node.classList.toggle("is-active");
    }
  });

  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      node.classList.toggle("is-active");
    }
  });
});


/* =========================================================
   SELECTED WORK — motion layer only
   Scoped exclusively to #work. Path logic above is untouched.
   ========================================================= */
(() => {
  const workSection = document.getElementById("work");
  if (!workSection) return;

  const workItems = [...workSection.querySelectorAll(".project-timeline-item")];
  const workCards = [...workSection.querySelectorAll(".project-featured")];
  if (!workItems.length) return;

  workItems.forEach((item, index) => {
    item.style.setProperty("--work-index", index);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");

  const revealWork = () => {
    workItems.forEach((item) => item.classList.add("is-work-visible"));
  };

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealWork();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-work-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    workItems.forEach((item) => observer.observe(item));
  }

  if (reduceMotion.matches || !finePointer.matches) return;

  const resetCard = (card) => {
    card.style.setProperty("--work-x", "0px");
    card.style.setProperty("--work-y", "0px");
    card.style.setProperty("--work-rx", "0deg");
    card.style.setProperty("--work-ry", "0deg");
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
  };

  workCards.forEach((card) => {
    let frame = null;
    let latestEvent = null;

    card.addEventListener("pointermove", (event) => {
      latestEvent = event;
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = null;
        if (!latestEvent) return;

        const rect = card.getBoundingClientRect();
        const x = (latestEvent.clientX - rect.left) / rect.width - 0.5;
        const y = (latestEvent.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--work-x", `${(x * 7).toFixed(2)}px`);
        card.style.setProperty("--work-y", `${(y * 5).toFixed(2)}px`);
        card.style.setProperty("--work-rx", `${(-y * 3.2).toFixed(2)}deg`);
        card.style.setProperty("--work-ry", `${(x * 4.2).toFixed(2)}deg`);
        card.style.setProperty("--spot-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty("--spot-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    }, { passive: true });

    card.addEventListener("pointerleave", () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      latestEvent = null;
      resetCard(card);
    });

    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) resetCard(card);
    });
  });
})();

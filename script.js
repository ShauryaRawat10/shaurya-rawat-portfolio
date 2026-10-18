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
  {
    src: "./studio/Modeling-shaurya-01.webp",
    title: "Photoshoot",
    tag: "Modeling",
    source: "Instagram",
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

// Path category filters (All vs Experience vs Education)
const pathChips = document.querySelectorAll(".path-filters .chip");
const pathItems = document.querySelectorAll(".timeline > li[data-path-type]");

function setPathFilter(filter) {
  pathItems.forEach((item) => {
    if (filter === "all" || item.dataset.pathType === filter) {
      item.classList.remove("is-hidden");
    } else {
      item.classList.add("is-hidden");
    }
  });
}

if (pathChips.length && pathItems.length) {
  const activeChip = document.querySelector(".path-filters .chip.is-on");
  if (activeChip) {
    setPathFilter(activeChip.dataset.pathFilter);
  }

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
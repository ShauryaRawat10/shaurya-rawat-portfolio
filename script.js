const EMAIL = "shauryarawatrwt10@gmail.com";

const STUDIO_PROFILES = {
  Instagram: "https://www.instagram.com/shaurya_rawat_rwt/",
  Behance: "https://www.behance.net/shauryarawat",
  GitHub: "https://github.com/ShauryaRawat10",
};

const STUDIO_WORKS = [
  {
    src: "./studio/Sketching-cheetah.png",
    title: "Sketching Cheetah",
    tag: "Painting",
    source: "Instagram",
    span: "wide",
  },
  {
    src: "./studio/marathon-shaurya.png",
    title: "Marathon",
    tag: "Stage",
    source: "All",
    span: "tall",
  },
  {
    src: "./studio/Matte-painting.png",
    title: "Matte Painting",
    tag: "Painting",
    source: "Behance",
    span: "tall",
  },
  {
    src: "./studio/mandala.png",
    title: "Mandala",
    tag: "Painting",
    source: "Behance",
    span: "sq",
  },
  {
    src: "./studio/native-american-graphics.png",
    title: "Graphics",
    tag: "Graphics",
    source: "Behance",
    span: "sq",
  },
  {
    src: "./studio/Modeling-shaurya-01.png",
    title: "photoshoot",
    tag: "Stage",
    source: "Instagram",
    span: "tall",
  },
];

document.getElementById("year").textContent = new Date().getFullYear();

Object.entries(STUDIO_PROFILES).forEach(([name, href]) => {
  const link = document.querySelector(
    `[data-studio-profile="${name}"]`
  );

  if (link) {
    link.href = href;
  }
});

const studioGrid = document.getElementById("studio-grid");
const lightbox = document.getElementById("studio-lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");

function renderStudio(filter = "all") {
  studioGrid.innerHTML = "";

  STUDIO_WORKS
    .filter(
      (work) =>
        filter === "all" || work.tag === filter
    )
    .forEach((work) => {
      const card = document.createElement("button");

      card.type = "button";
      card.className = `studio-card span-${work.span || "sq"}`;

      card.innerHTML = `
        <img
          src="${work.src}"
          alt="${work.title}"
          loading="lazy"
        />

        <div class="card-details">
          <h3>${work.title}</h3>
          <span class="platform">${work.source}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        lightboxImg.src = work.src;
        lightboxImg.alt = work.title;
        lightboxCaption.textContent =
          `${work.title} · ${work.tag} · ${work.source}`;

        lightbox.showModal();
      });

      studioGrid.appendChild(card);
    });
}

renderStudio();

document
  .querySelectorAll(".studio-filters .chip")
  .forEach((chip) => {
    chip.addEventListener("click", () => {
      document
        .querySelectorAll(".studio-filters .chip")
        .forEach((btn) => {
          btn.classList.remove("is-on");
        });

      chip.classList.add("is-on");

      renderStudio(chip.dataset.filter);
    });
  });

lightbox
  .querySelector(".lightbox-close")
  .addEventListener("click", () => {
    lightbox.close();
  });

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = form.get("name") || "";
    const email = form.get("email") || "";
    const message = form.get("message") || "";

    const subject = encodeURIComponent(
      `Hello from ${name}`
    );

    const body = encodeURIComponent(
      `${message}\n\n— ${name} (${email})`
    );

    window.location.href =
      `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  });
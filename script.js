/* =========================================================
   Data (edit here to customize your projects / skills)
========================================================= */
const PROJECTS = [
  { title: "URUS project", desc: "This project was created at the beginning of learning C++ in order to demonstrate the possibilities of web design through straightforward and simple code, without unnecessary scripts and fluff.", tags: ["Html", "CSS"], cat: "web", link: "https://ulanovichdavid.github.io/Urus/" },
];

const SKILLS = [
  { name: "HTML5 / CSS3", level: 95 },
  { name: "JavaScript", level: 60 },
  { name: "React", level: 25 },
  { name: "Acessibilidade", level: 78 },
  { name: "Git / GitHub", level: 75 },
  { name: "UI Design", level: 80 },
  { name: "UX Design", level: 80 },
  { name: "TypeScript ", level: 10 },
  { name: "Vite ", level: 15 },
  { name: "Adaptive layouts", level: 65 },
  { name: "Form validation", level: 50 },
  { name: "Client-side logic", level: 45 },
  { name: "Node.js", level: 75 },
  { name: "REST API", level: 60 },
];

const TYPED_WORDS = ["that work.", "with purpose.", "that load fast.", "accessible to everyone."];

/* =========================================================
   YEAR IN THE FOOTER
========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   LIGHT / DARK THEME
========================================================= */
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.setAttribute("aria-pressed", "true");
    themeLabel.textContent = "dark mode";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", "false");
    themeLabel.textContent = "Light mode";
  }
}

const savedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

/* =========================================================
   MENU MOBILE
========================================================= */
const navBurger = document.getElementById("navBurger");
const nav = document.getElementById("nav");

navBurger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navBurger.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navBurger.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   CROSSHAIR ESTILO "PRANCHETA CAD"
========================================================= */
const crosshair = document.getElementById("crosshair");
const crosshairH = document.querySelector(".crosshair-h");
const crosshairV = document.querySelector(".crosshair-v");
const coords = document.getElementById("coords");

window.addEventListener("mousemove", (e) => {
  crosshairH.style.top = e.clientY + "px";
  crosshairV.style.left = e.clientX + "px";
  coords.style.top = e.clientY + "px";
  coords.style.left = e.clientX + "px";
  coords.textContent = `X:${String(e.clientX).padStart(3, "0")} Y:${String(e.clientY).padStart(3, "0")}`;
});

/* =========================================================
   TYPING EFFECT IN HERO
========================================================= */
const typedEl = document.getElementById("typed");
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = TYPED_WORDS[wordIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % TYPED_WORDS.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 75);
}
typeLoop();

/* =========================================================
   ANIMATED COUNTERS
========================================================= */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* =========================================================
   PROJECTS: RENDER + FILTER
========================================================= */
const projectGrid = document.getElementById("projectGrid");

function renderProjects() {
  projectGrid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card reveal" data-cat="${p.cat}">
      <div class="project-card-top">
        <span class="project-index">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <a class="project-link" href="${p.link}" target="_blank" rel="noopener">View Project →</a>
    </article>
  `).join("");
  observeReveals();
}
renderProjects();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const match = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("is-hidden", !match);
    });
  });
});

/* =========================================================
   SKILLS: RENDER
========================================================= */
const skillsGrid = document.getElementById("skillsGrid");
skillsGrid.innerHTML = SKILLS.map(s => `
  <div class="skill-card reveal">
    <div class="skill-top">
      <span class="skill-name">${s.name}</span>
      <span class="skill-level">${s.level}%</span>
    </div>
    <div class="skill-bar">
      <div class="skill-fill" data-level="${s.level}"></div>
    </div>
  </div>
`).join("");

/* =========================================================
   SCROLL REVEAL (IntersectionObserver)
========================================================= */
function observeReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        // ativa contadores do hero
        entry.target.querySelectorAll(".meta-num").forEach(animateCount);
        if (entry.target.classList.contains("meta-num")) animateCount(entry.target);

        // ativa barras de skill
        entry.target.querySelectorAll(".skill-fill").forEach(fill => {
          fill.style.width = fill.dataset.level + "%";
        });

        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => io.observe(el));
}
observeReveals();

// 
const heroMeta = document.querySelector(".hero-meta");
if (heroMeta) {
  const heroIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".meta-num").forEach(animateCount);
        heroIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  heroIo.observe(heroMeta);
}

/* =========================================================
   CONTACT FORM WITH VALIDATION
========================================================= */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setError(fieldId, message) {
  const field = document.getElementById(fieldId).closest(".field");
  const errorEl = document.getElementById(fieldId + "Error");
  if (message) {
    field.classList.add("has-error");
    errorEl.textContent = message;
  } else {
    field.classList.remove("has-error");
    errorEl.textContent = "";
  }
}

function validate() {
  let valid = true;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2) {
    setError("name", "Enter your full name.");
    valid = false;
  } else setError("name", "");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    setError("email", "Please enter a valid email.");
    valid = false;
  } else setError("email", "");

  if (message.length < 10) {
    setError("message", "Write a message with at least 10 characters.");
    valid = false;
  } else setError("message", "");

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.classList.remove("is-error");

  if (!validate()) {
    formStatus.textContent = "Please correct the highlighted fields before submitting.";
    formStatus.classList.add("is-error");
    return;
  }

  const submitBtn = form.querySelector(".btn-submit");
  submitBtn.classList.add("is-loading");
  formStatus.textContent = "";

  // Push simulation (swap for fetch for a real backend / service, ex: Formspree)
  setTimeout(() => {
    submitBtn.classList.remove("is-loading");
    formStatus.textContent = "Message sent! Thank you for contacting me — I will reply soon.";
    form.reset();
  }, 1200);
});

/* =========================================================
   BACK TO TOP BUTTON
========================================================= */
document.getElementById("toTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

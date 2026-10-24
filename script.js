// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile menu =====
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => navbar.classList.toggle("open"));
navbar.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navbar.classList.remove("open"))
);

// ===== Pixel-art sprite loader =====
// Any element with data-sprite="path1 path2" tries each path in order.
// - <img>: swaps in the first file that loads (otherwise keeps its placeholder src)
// - anything else (icon slot): replaces the temporary icon with the PNG
function loadSprite(el) {
  const urls = el.dataset.sprite.trim().split(/\s+/);
  let i = 0;

  const next = () => {
    if (i >= urls.length) return; // nothing found: keep the placeholder
    const url = urls[i++];
    const probe = new Image();

    probe.onload = () => {
      if (el.tagName === "IMG") {
        el.src = url;
      } else {
        const img = document.createElement("img");
        img.className = "sprite";
        img.alt = "";
        img.src = url;
        el.textContent = "";
        el.appendChild(img);
        el.classList.add("has-sprite");
      }
    };
    probe.onerror = next;
    probe.src = url;
  };

  next();
}
document.querySelectorAll("[data-sprite]").forEach(loadSprite);

// ===== Typing effect =====
const roles = ["Unity Developer", "Game Developer", "Pixel Artist", "CS Student"];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  typedEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 350);
  }
}
type();

// ===== Highlight active nav link while scrolling =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile menu =====
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => navbar.classList.toggle("open"));
navbar.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navbar.classList.remove("open"))
);

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

// ===== Floating dots background =====
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let dots = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 22000));
  dots = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.6,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.5 + 0.15,
  }));
}

function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const d of dots) {
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0) d.x = canvas.width;
    if (d.x > canvas.width) d.x = 0;
    if (d.y < 0) d.y = canvas.height;
    if (d.y > canvas.height) d.y = 0;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(10, 92, 255, ${d.a})`;
    ctx.fill();
  }
  requestAnimationFrame(drawDots);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  drawDots();
}

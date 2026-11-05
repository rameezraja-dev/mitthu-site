// Eyes follow the pointer on every face.
document.addEventListener("pointermove", (e) => {
  document.querySelectorAll("[data-face]").forEach((face) => {
    const r = face.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    face.style.setProperty("--look-x", `${Math.max(-1, Math.min(1, dx * 2)) * 9}px`);
    face.style.setProperty("--look-y", `${Math.max(-1, Math.min(1, dy * 2)) * 9}px`);
  });
});

// Demo state switcher.
const demo = document.querySelector("[data-demo]");
const label = demo.querySelector("[data-label]");
const bubble = demo.querySelector(".bubble");
const lines = {
  sleeping: "",
  idle: "Hi! Anything on your list today?",
  listening: "I'm listening…",
  thinking: "Drafting a reminder for Sunday, 9:00…",
  speaking: "Done. Water the plants, every Sunday at 9. Want to check it?",
};

document.querySelectorAll("[data-state]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const state = btn.dataset.state;
    document.querySelectorAll("[data-state]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    demo.className = demo.className.replace(/\bis-\w+/g, "").trim() + ` is-${state}`;
    label.textContent = btn.textContent;
    bubble.textContent = lines[state];
    bubble.classList.toggle("show", Boolean(lines[state]));
  });
});

// Reveal sections as they scroll in.
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("in");
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".section > *, .cta > *").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

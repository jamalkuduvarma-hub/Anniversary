
/* =========================================================
   Private access
   Password: 26092025
   ========================================================= */
(() => {
  const ACCESS_CODE = "26092025";
  const lockScreen = document.getElementById("lockScreen");
  const unlockForm = document.getElementById("unlockForm");
  const accessCode = document.getElementById("accessCode");
  const lockError = document.getElementById("lockError");
  const siteContent = document.getElementById("siteContent");

  document.body.classList.add("locked");
  siteContent.classList.add("locked-content");

  unlockForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const entered = accessCode.value.trim();

    if (entered === ACCESS_CODE) {
      lockError.textContent = "";
      siteContent.classList.remove("locked-content");
      siteContent.setAttribute("aria-hidden", "false");
      document.body.classList.remove("locked");

      lockScreen.classList.add("unlocked");

      // Remove the lock screen after its fade-out.
      setTimeout(() => {
        lockScreen.remove();
      }, 650);

      // Don't store the password or unlock state.
      // Refreshing the page will show the lock again.
    } else {
      lockError.textContent = "That isn't our date ❤️ Try again.";
      accessCode.value = "";
      accessCode.focus();
    }
  });

  accessCode.focus();
})();

const openBtn = document.getElementById("openBtn");
const story = document.getElementById("story");
const hearts = document.getElementById("hearts");

openBtn.addEventListener("click", () => {
  story.classList.remove("hidden");
  document.body.classList.add("story-open");
  setTimeout(() => {
    document.getElementById("story").scrollIntoView({ behavior: "smooth" });
  }, 80);
  startHearts();
  observeReveals();
});

function observeReveals() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function startHearts() {
  setInterval(() => {
    createHeart();
  }, 900);
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.35 ? "♡" : "♥";

  const size = 12 + Math.random() * 18;
  const duration = 7 + Math.random() * 7;

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000 + 500);
}

document.querySelectorAll(".reveal").forEach((el) => {
  if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
    el.classList.add("visible");
  }
});

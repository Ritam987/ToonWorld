import { cartoons } from "./cartoonsData.js";
import { renderCards, setupCardReveal } from "./renderCards.js";
import { initPreloader } from "./preloader.js";
import { initThemeToggle } from "./theme.js";
import { initSearch } from "./search.js";
import { initReviews } from "./reviews.js";
import { initScrollButton } from "./scrollButton.js";

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initHeaderParallax() {
  const header = document.querySelector("header");
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initThemeToggle();
  initReviews();
  initScrollButton();
  initSmoothScroll();
  initHeaderParallax();

  const containerEl = document.querySelector(".card-container");
  let disconnectReveal = null;

  const render = (list) => {
    const cards = renderCards({ cartoons: list, containerEl });
    if (disconnectReveal) disconnectReveal();
    disconnectReveal = setupCardReveal(cards);
  };

  render(cartoons);
  initSearch({ cartoons, onResults: render });
});


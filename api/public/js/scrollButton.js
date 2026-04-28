export function initScrollButton() {
  const scrollBtn = document.getElementById("scroll-btn");
  if (!scrollBtn) return;

  const upIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/>
    </svg>`;

  const downIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
    </svg>`;

  const updateIcon = () => {
    if (window.scrollY < 100) {
      scrollBtn.innerHTML = downIcon;
      scrollBtn.setAttribute("aria-label", "Scroll to bottom");
    } else {
      scrollBtn.innerHTML = upIcon;
      scrollBtn.setAttribute("aria-label", "Scroll to top");
    }
  };

  window.addEventListener("scroll", updateIcon);
  updateIcon();

  scrollBtn.addEventListener("click", () => {
    if (window.scrollY < 100) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}


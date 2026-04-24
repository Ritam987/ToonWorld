export function initPreloader() {
  const preloader = document.getElementById("preloader-overlay");
  if (!preloader) return;

  const orderButton = preloader.querySelector(".order");
  if (!orderButton) return;

  document.body.style.overflow = "hidden";
  if (!orderButton.classList.contains("animate")) {
    orderButton.classList.add("animate");
  }

  let isHidden = false;
  let hideTimerId = null;

  const hidePreloader = () => {
    if (isHidden) return;
    isHidden = true;
    if (hideTimerId) clearTimeout(hideTimerId);

    preloader.style.transition = "opacity 0.5s ease";
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      document.body.style.overflow = "auto";
    }, 500);
  };

  // Hide after load (let user see animation briefly), with a max wait fallback.
  const MIN_VISIBLE_AFTER_LOAD_MS = 4000;
  const MAX_WAIT_MS = 15000;

  const maxWaitId = setTimeout(hidePreloader, MAX_WAIT_MS);

  window.addEventListener(
    "load",
    () => {
      clearTimeout(maxWaitId);
      hideTimerId = setTimeout(hidePreloader, MIN_VISIBLE_AFTER_LOAD_MS);
    },
    { once: true }
  );
}


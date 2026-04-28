export function initThemeToggle() {
  const toggleBtn = document.getElementById("darkmode");
  const iconSpan = document.getElementById("darkmode-icon");

  if (!toggleBtn || !iconSpan) return;

  function setMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    iconSpan.textContent = isDark ? "🌙" : "☀️";
    iconSpan.style.transform = "rotate(360deg)";
    setTimeout(() => {
      iconSpan.style.transform = "rotate(0deg)";
    }, 300);
  }

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    setMode(true);
  } else {
    setMode(false);
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    setMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}


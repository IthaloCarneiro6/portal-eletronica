const button = document.querySelector("#theme-toggle");
function setDarkMode(enabled) {
  document.documentElement.classList.toggle("dark-mode", enabled);
  if (button) button.setAttribute("aria-pressed", String(enabled));
}
try {
  setDarkMode(localStorage.getItem("darkMode") === "true");
} catch (_) {
  setDarkMode(false);
}
if (button)
  button.addEventListener("click", () => {
    const enabled = !document.documentElement.classList.contains("dark-mode");
    setDarkMode(enabled);
    try {
      localStorage.setItem("darkMode", String(enabled));
    } catch (_) {}
  });

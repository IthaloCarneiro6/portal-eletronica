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

const contrastButton = document.querySelector('#contrast-toggle');
function setHighContrast(enabled) {
  document.documentElement.classList.toggle('high-contrast', enabled);
  if (contrastButton) contrastButton.setAttribute('aria-pressed', String(enabled));
}
try { setHighContrast(localStorage.getItem('highContrast') === 'true'); } catch (_) { setHighContrast(false); }
if (contrastButton) contrastButton.addEventListener('click', () => {
  const enabled = !document.documentElement.classList.contains('high-contrast');
  setHighContrast(enabled);
  try { localStorage.setItem('highContrast', String(enabled)); } catch (_) {}
});

const deleteDialog = document.querySelector('#delete-dialog');
if (deleteDialog) {
  document.querySelectorAll('.delete-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      document.querySelector('#delete-name').textContent = trigger.dataset.name;
      deleteDialog.showModal();
    });
  });
  document.querySelector('#cancel-delete').addEventListener('click', () => deleteDialog.close());
  document.querySelector('#confirm-delete').addEventListener('click', () => {
    deleteDialog.close();
    const message = document.querySelector('#delete-result');
    message.hidden = false;
    message.textContent = 'Demonstração concluída: nenhum componente foi excluído.';
    message.focus();
  });
}
const demoForm = document.querySelector('#demo-form');
if (demoForm) demoForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = document.querySelector('#demo-message');
  message.hidden = false;
  message.textContent = 'Demonstração concluída: os dados não foram salvos.';
});

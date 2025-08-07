// Script para controlar o Dark Mode com animação avançada
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector('.toggle input[type="checkbox"]');
  const html = document.documentElement;

  // Função para aplicar o tema
  const applyTheme = (isDark) => {
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  // Inicia sempre no modo claro
  toggle.checked = false;
  applyTheme(false);

  // Event listener para o toggle
  toggle.addEventListener("change", function () {
    const isDark = this.checked;

    // Calcula posição do toggle para animação
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const toggleElement = document.querySelector(".toggle");
    if (toggleElement) {
      const rect = toggleElement.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Verifica se suporta View Transition API
    if (!document.startViewTransition) {
      // Fallback simples
      applyTheme(isDark);
      return;
    }

    // Animação avançada com View Transition API
    const transition = document.startViewTransition(() => {
      applyTheme(isDark);
    });

    transition.ready
      .then(() => {
        html.style.setProperty("--x", `${x}px`);
        html.style.setProperty("--y", `${y}px`);
      })
      .catch((error) => {
        console.error("Erro na View Transition:", error);
      });
  });
});

// js/scroll-nav.js

/**
 * Limita a frequência com que uma função pode ser chamada.
 * @param {Function} func A função a ser limitada.
 * @param {number} limit O intervalo de tempo em milissegundos.
 * @returns {Function} A nova função com throttle.
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Seletores de DOM cacheados para melhor performance.
  const sections = Array.from(document.querySelectorAll("scroll-page[id]"));
  const navLinks = Array.from(document.querySelectorAll(".menu a"));
  const header = document.querySelector(".header-container");
  const headerHeight = header ? header.offsetHeight : 0;

  if (!sections.length || !navLinks.length) {
    return;
  }

  /**
   * Ativa o link de navegação correspondente à seção visível.
   * @param {string | null} id O ID da seção ativa, ou null para desativar todos.
   */
  function setActive(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /**
   * Verifica qual seção está atualmente na viewport e ativa o link correspondente.
   */
  function checkActiveSection() {
    // Adiciona a altura do header e um pequeno buffer para o cálculo.
    const scrollPosition = window.scrollY + headerHeight + 50;

    let activeSectionId = null;

    // Itera sobre as seções para encontrar a última que está visível na tela.
    for (const section of sections) {
      if (section.offsetTop <= scrollPosition) {
        activeSectionId = section.id;
      } else {
        break; // Otimização: seções são ordenadas, não precisa checar as demais.
      }
    }

    setActive(activeSectionId);
  }

  // 2. Aplica throttle ao evento de scroll para otimizar a performance.
  window.addEventListener("scroll", throttle(checkActiveSection, 200));

  // Executa a função uma vez no carregamento para definir o estado inicial correto.
  checkActiveSection();

  // Mantém o smooth scroll para cliques nos links de navegação.
  navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

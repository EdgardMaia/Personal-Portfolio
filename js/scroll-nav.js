// js/scroll-nav.js
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('scroll-page[id]')); // seus elementos customizados
  const navLinks = Array.from(document.querySelectorAll('.menu a'));

  if (!sections.length || !navLinks.length) return;

  // Observador com vários thresholds para nos dar intersectionRatio
  const observer = new IntersectionObserver((entries) => {
    // pegamos as entradas que estão intersectando
    const visible = entries.filter(e => e.isIntersecting);

    if (visible.length) {
      // escolhe a seção com maior intersectionRatio (mais visível)
      const top = visible.reduce((max, cur) => (cur.intersectionRatio > max.intersectionRatio ? cur : max), visible[0]);
      setActive(top.target.id);
      return;
    }

    // fallback: quando nenhuma está "isIntersecting", escolhemos a mais próxima do centro da viewport
    let nearest = null;
    let minDist = Infinity;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - window.innerHeight / 2);
      if (dist < minDist) { minDist = dist; nearest = sec; }
    });
    if (nearest) setActive(nearest.id);
  }, {
    threshold: [0.25, 0.5, 0.75, 1.0], // ajusta sensibilidade
    rootMargin: '0px 0px -10% 0px' // você pode deslocar o "gatilho" para cima/baixo
  });

  sections.forEach(s => observer.observe(s));

  function setActive(id) {
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === `#${id}`) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  // opcional: smooth scroll para os cliques na nav
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

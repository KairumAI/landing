(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map();
  document.querySelectorAll('.evidence-case details').forEach((details) => {
    const summary = details.querySelector('summary');
    summary.addEventListener('click', (event) => {
      if (preference.matches || typeof details.animate !== 'function') return;
      event.preventDefault();
      const wasOpen = details.dataset.expanded === undefined ? details.open : details.dataset.expanded === 'true';
      const willOpen = !wasOpen;
      const start = details.getBoundingClientRect().height;
      active.get(details)?.cancel();
      details.dataset.expanded = String(willOpen);
      details.style.height = '';
      details.open = true;
      const end = willOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
      details.style.overflow = 'hidden';
      const animation = details.animate({height: [start + 'px', end + 'px']}, {duration: 280, easing: 'cubic-bezier(.22,1,.36,1)'});
      active.set(details, animation);
      animation.onfinish = () => {
        details.open = willOpen;
        details.style.overflow = '';
        delete details.dataset.expanded;
        active.delete(details);
      };
    });
  });
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    active.forEach((animation, details) => {
      const open = details.dataset.expanded === 'true';
      animation.cancel();
      details.open = open;
      details.style.overflow = '';
      delete details.dataset.expanded;
    });
    active.clear();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        if (!preference.matches) target.animate({transform: ['scaleX(0)', 'scaleX(1)']}, {duration: 500, easing: 'cubic-bezier(.22,1,.36,1)'});
        observer.unobserve(target);
      });
    }, {threshold: 0.5});
    document.querySelectorAll('.competitive-bar > i > span').forEach((bar) => observer.observe(bar));
  }
})();

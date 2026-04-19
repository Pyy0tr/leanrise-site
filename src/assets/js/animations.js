(function () {
  'use strict';

  // ── Hero entrance (staggered on load) ─────────────────────
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.classList.add('hero-ready');
  }

  // ── Parallax on hero background ───────────────────────────
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Limit parallax to hero height
          if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Scroll reveal via IntersectionObserver ─────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ── Counter animation ──────────────────────────────────────
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.countSuffix || '';
    const prefix = el.dataset.countPrefix || '';
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(target * easeOutCubic(progress));
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ── Nav: add shadow on scroll ──────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    }, { passive: true });
  }
})();

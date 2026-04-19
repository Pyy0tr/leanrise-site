(function () {
  'use strict';

  const gallery      = document.querySelector('.gallery');
  const stage        = gallery && gallery.querySelector('.gallery__stage');
  const dotsContainer = gallery && gallery.querySelector('.gallery__dots');
  const items        = stage ? Array.from(stage.querySelectorAll('.gallery__item')) : [];
  const total        = items.length;

  const lightbox    = document.getElementById('galleryLightbox');
  const lightboxImg = lightbox && lightbox.querySelector('.gallery__lightbox-img');
  const closeBtn    = lightbox && lightbox.querySelector('.gallery__lightbox-close');

  if (!stage || total === 0) return;

  let current = 0;
  let timer   = null;

  // ── Dots ──────────────────────────────────────────────────
  const dots = dotsContainer ? items.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'gallery__dot';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Transformation ${i + 1}`);
    btn.addEventListener('click', () => { goTo(i); resetAutoplay(); });
    dotsContainer.appendChild(btn);
    return btn;
  }) : [];

  // ── Render ────────────────────────────────────────────────
  function wrap(n) { return (total + n) % total; }

  function render() {
    items.forEach(item => item.classList.remove('is-current', 'is-prev', 'is-next'));
    dots.forEach(d => d.classList.remove('is-active'));

    items[wrap(current - 1)].classList.add('is-prev');
    items[current].classList.add('is-current');
    items[wrap(current + 1)].classList.add('is-next');

    if (dots[current]) dots[current].classList.add('is-active');
  }

  // ── Navigation ────────────────────────────────────────────
  function goTo(n)  { current = wrap(n); render(); }
  function goNext() { goTo(current + 1); }
  function goPrev() { goTo(current - 1); }

  // ── Autoplay ──────────────────────────────────────────────
  function startAutoplay() { timer = setInterval(goNext, 4500); }
  function stopAutoplay()  { clearInterval(timer); }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  // ── Interactions sur le stage ─────────────────────────────
  stage.addEventListener('click', e => {
    const item = e.target.closest('.gallery__item');
    if (!item) return;

    if (item.classList.contains('is-prev')) {
      goPrev(); resetAutoplay();
    } else if (item.classList.contains('is-next')) {
      goNext(); resetAutoplay();
    } else if (item.classList.contains('is-current') && lightbox && lightboxImg) {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    }
  });

  // Swipe touch
  let touchStartX = 0;
  stage.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  stage.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? goNext() : goPrev(); }
    startAutoplay();
  }, { passive: true });

  // Flèches clavier
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { goNext(); resetAutoplay(); }
    if (e.key === 'ArrowLeft')  { goPrev(); resetAutoplay(); }
  });

  // ── Init ──────────────────────────────────────────────────
  render();
  startAutoplay();

  // ── Lightbox ──────────────────────────────────────────────
  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    stopAutoplay();
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    startAutoplay();
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 350);
  }

  closeBtn && closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();

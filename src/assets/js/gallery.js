(function () {
  'use strict';

  const lightbox    = document.getElementById('galleryLightbox');
  const lightboxImg = lightbox && lightbox.querySelector('.gallery__lightbox-img');
  const closeBtn    = lightbox && lightbox.querySelector('.gallery__lightbox-close');
  const tracks      = document.querySelectorAll('.gallery__track');

  if (!lightbox || !lightboxImg) return;

  // ── Open lightbox ──────────────────────────────────────────
  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    tracks.forEach(t => t.classList.add('is-paused'));
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  // ── Close lightbox ─────────────────────────────────────────
  function close() {
    lightbox.classList.remove('is-open');
    tracks.forEach(t => t.classList.remove('is-paused'));
    document.body.style.overflow = '';
    // Vider le src après la transition pour éviter un flash au prochain open
    setTimeout(() => { lightboxImg.src = ''; }, 350);
  }

  // ── Clicks sur les items de galerie ───────────────────────
  // On cible uniquement les items non-dupliqués pour éviter le double déclenchement
  document.querySelectorAll('.gallery__item:not([aria-hidden])').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) open(img.src, img.alt);
    });
  });

  // ── Fermeture ─────────────────────────────────────────────
  closeBtn && closeBtn.addEventListener('click', close);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
})();

(function () {
  const track = document.querySelector('.carousel__track');
  const dotsContainer = document.querySelector('.carousel__dots');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll('.carousel__slide'));
  let current = 0;
  let timer = null;

  // Generate dots
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Transformation ${i + 1}`);
    dot.addEventListener('click', () => {
      stopAutoplay();
      goTo(i);
      setTimeout(startAutoplay, 1500);
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function setActive(index) {
    slides.forEach(s => s.classList.remove('is-active'));
    dots.forEach(d => d.classList.remove('is-active'));
    slides[index].classList.add('is-active');
    dots[index].classList.add('is-active');
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    setActive(current);
    const slide = slides[current];
    const targetLeft = slide.offsetLeft - (track.offsetWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => goTo(current + 1), 3500);
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  // Mouse drag
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    stopAutoplay();
  });

  track.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    setTimeout(startAutoplay, 1500);
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('is-dragging');
    setTimeout(startAutoplay, 1500);
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch
  track.addEventListener('touchstart', stopAutoplay, { passive: true });
  track.addEventListener('touchend', () => setTimeout(startAutoplay, 1500), { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        current = slides.indexOf(entry.target);
        setActive(current);
      }
    });
  }, { root: track, threshold: 0.6 });

  slides.forEach(slide => observer.observe(slide));

  goTo(0);
  startAutoplay();
})();

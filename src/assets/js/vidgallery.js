(function () {
  'use strict';
  var videos = window.__VIDEOS__ || [];

  var current     = 0;
  var firstRender = true;
  var screen      = document.getElementById('vidgalleryScreen');
  var thumbsCt = document.getElementById('vidgalleryThumbs');
  var countEl  = document.getElementById('vidgalleryCount');
  var prevBtn  = document.querySelector('.vidgallery__nav--prev');
  var nextBtn  = document.querySelector('.vidgallery__nav--next');

  if (!screen) return;

  var thumbs = videos.map(function (id, i) {
    var btn = document.createElement('button');
    btn.className = 'vidgallery__thumb';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', 'Témoignage ' + (i + 1));
    var img = document.createElement('img');
    img.src = 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg';
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    btn.appendChild(img);
    btn.addEventListener('click', function () { goTo(i); });
    thumbsCt.appendChild(btn);
    return btn;
  });

  function render() {
    countEl.textContent = (current + 1) + ' / ' + videos.length;
    thumbs.forEach(function (t, i) {
      t.classList.toggle('is-active', i === current);
    });
    if (!firstRender) {
      thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    screen.innerHTML = '';
    var img = document.createElement('img');
    img.className = 'vidgallery__screen-img';
    img.src = 'https://img.youtube.com/vi/' + videos[current] + '/hqdefault.jpg';
    img.alt = 'Témoignage ' + (current + 1);
    img.decoding = 'async';

    var playBtn = document.createElement('button');
    playBtn.className = 'vidgallery__play-btn';
    playBtn.setAttribute('aria-label', 'Lire le témoignage');
    playBtn.addEventListener('click', loadVideo);

    screen.appendChild(img);
    screen.appendChild(playBtn);
  }

  function loadVideo() {
    screen.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.className = 'vidgallery__iframe';
    iframe.src = 'https://www.youtube.com/embed/' + videos[current] + '?autoplay=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    screen.appendChild(iframe);
  }

  function goTo(n) {
    current = (videos.length + n) % videos.length;
    render();
  }

  prevBtn && prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn && nextBtn.addEventListener('click', function () { goTo(current + 1); });

  render();
  firstRender = false;
})();

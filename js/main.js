
// Año dinámico en footer
const yEl = document.getElementById('y');
if (yEl) yEl.textContent = new Date().getFullYear();

// Burger menú móvil
const burger = document.getElementById('burger');
const nav = document.getElementById('navLinks');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
} else {
  // Opcional: ayuda para depurar si alguna ID cambia en el HTML
  // console.warn('Navegación móvil: no se encontró #burger o #navLinks');
}


// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav) nav.classList.remove('open');
        if (burger) burger.setAttribute('aria-expanded', 'false');

      }
    }
  });
});
// === Slideshow para #quienes ===
(function initSlideshows() {
  document.querySelectorAll('.slideshow').forEach((root) => {
    const track = root.querySelector('.slides');
    const slides = Array.from(root.querySelectorAll('.slide'));
    const prev = root.querySelector('.prev');
    const next = root.querySelector('.next');
    const dotsWrap = root.querySelector('.dots');
    if (!track || slides.length === 0) return;

    let index = 0, timer;

    // Dots
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'dot' + (i === 0 ? ' is-active' : '');
      b.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsWrap.querySelectorAll('.dot').forEach((d, di) => {
        d.classList.toggle('is-active', di === index);
      });
    }

    // Controles
    prev?.addEventListener('click', () => goTo(index - 1));
    next?.addEventListener('click', () => goTo(index + 1));

    // Autoplay con pausa al hover/focus
    const start = () => { 
    stop();                             // <- evita múltiples intervalos
    timer = setInterval(() => goTo(index + 1), 5000);
};
    const stop = () => timer && clearInterval(timer);
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    // Teclado
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    // Swipe táctil
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    });

    // Init
    goTo(0);
    start();
  });
})();

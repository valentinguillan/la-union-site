
// Año dinámico en footer
const yEl = document.getElementById('y');
if (yEl) yEl.textContent = new Date().getFullYear();

// Burger menú móvil
const burger = document.getElementById('burger');
const nav = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

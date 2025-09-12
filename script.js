// script.js (actualizado)
// Muestra el contenido de las .card en un modal cuando se hace click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.modal-close');
  const container = document.querySelector('.container');

  // tarjetas que abren el modal al hacer click (las que ya tenías)
  const cards = document.querySelectorAll('#about .card, #projects .card, #skills .card');

  // enlaces del nav que deben abrir el modal (About-Me y Projects)
  const navModalLinks = document.querySelectorAll('a.nav-link[href="#about"], a.nav-link[href="#projects"]');

  let lastFocused = null;

  function openModal(htmlContent) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = htmlContent;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    container.classList.add('blurred');

    // bloquear scroll del body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // focus en cerrar por accesibilidad
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    container.classList.remove('blurred');

    // restaurar scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // devolver foco al último elemento
    if (lastFocused) lastFocused.focus();
  }

  // listener para las cards (clic directo en el recuadro)
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const content = card.innerHTML;
      openModal(content);
    });
  });

  // listener para los links del nav (evitamos el comportamiento por defecto y abrimos modal)
  navModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // evita el salto por hash
      const targetSelector = link.getAttribute('href'); // e.g. "#about"
      const targetSection = document.querySelector(targetSelector);
      if (!targetSection) return;

      const targetCard = targetSection.querySelector('.card');
      // si existe la .card, mostramos su contenido; si no, mostramos la sección completa
      const content = targetCard ? targetCard.innerHTML : targetSection.innerHTML;
      openModal(content);
    });
  });

  // cerrar modal: botón, clic fuera (overlay) y tecla Escape
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
});

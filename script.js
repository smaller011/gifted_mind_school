// Scroll fade-up
const sections = document.querySelectorAll('.fade-section');
const revealSection = () => {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealSection);
window.addEventListener('load', revealSection);

// Mobile menu slide
const toggleButton = document.getElementById('mobile-toggle');
const nav = document.getElementById('navbarNav');
const overlay = document.querySelector('.mobile-menu-overlay');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('show');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  nav.classList.remove('show');
  overlay.classList.remove('active');
});

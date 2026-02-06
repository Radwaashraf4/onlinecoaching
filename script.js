// Simple front-end form handling (no backend)
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  alert('Thank you for reaching out! I will get back to you soon.');

  form.reset();
});

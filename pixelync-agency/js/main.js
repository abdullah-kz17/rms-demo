// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navLinks.classList.remove('mobile-open')));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Contact form fake-submit
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactSuccess.hidden = false;
  contactSuccess.classList.add('visible');
  contactForm.reset();
  contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Back to top + bounded parallax, batched into one rAF scroll handler
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const parallaxEls = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

function onScroll() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
  if (!prefersReducedMotion) {
    parallaxEls.forEach((el) => {
      const parent = el.parentElement;
      const rect = parent.getBoundingClientRect();
      const offset = rect.top * -0.15;
      el.style.transform = `translateY(${offset}px)`;
    });
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
});

// Service card cursor spotlight + tilt, work card tilt — skipped for touch/coarse pointers and reduced-motion preference
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.work-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.transform = '';
    });
  });
}

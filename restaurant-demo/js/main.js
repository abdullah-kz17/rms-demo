const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

const backToTop = document.getElementById('backToTop');

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-links a').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    navLinks.classList.remove('open');
  });
});

// Nav dropdown ("More") — click/tap toggle so it works on touch, keyboard, and desktop
const navDropdown = document.querySelector('.nav-dropdown');
const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');

navDropdownToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navDropdown.classList.toggle('open');
  navDropdownToggle.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (e) => {
  if (!navDropdown.contains(e.target)) {
    navDropdown.classList.remove('open');
    navDropdownToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navDropdown.classList.remove('open');
    navDropdownToggle.setAttribute('aria-expanded', 'false');
  }
});

// Scroll-triggered reveal animations
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Animated stat counters
const statNumbers = document.querySelectorAll('.stat-number');
const animateCount = (el) => {
  const raw = el.textContent.trim();
  const target = parseInt(raw, 10);
  if (Number.isNaN(target)) return;
  const suffix = raw.replace(/[0-9]/g, '');
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
statNumbers.forEach((el) => statObserver.observe(el));

// Sticky header shrink on scroll
const header = document.querySelector('.site-header');

// Parallax hero background — moves slower than the page scroll
const parallaxEl = document.querySelector('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ticking = false;
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 500);

  if (parallaxEl && !prefersReducedMotion) {
    const offset = window.scrollY * 0.35;
    parallaxEl.style.transform = `translateY(${offset}px)`;
  }
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
});

// Testimonial slider
const slider = document.querySelector('.testimonial-slider');
if (slider) {
  const track = slider.querySelector('.testimonial-track');
  const slides = Array.from(track.children);
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsWrap = slider.querySelector('.slider-dots');
  let current = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    autoplayTimer = setInterval(next, 6000);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  nextBtn.addEventListener('click', () => { next(); stopAutoplay(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); startAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? prev() : next();
      stopAutoplay();
      startAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

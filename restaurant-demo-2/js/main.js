// Off-canvas menu
const menuOpenBtn = document.getElementById('menuOpenBtn');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const offcanvasMenu = document.getElementById('offcanvasMenu');
const offcanvasOverlay = document.getElementById('offcanvasOverlay');

function openMenu() {
  offcanvasMenu.classList.add('open');
  offcanvasOverlay.classList.add('open');
}
function closeMenu() {
  offcanvasMenu.classList.remove('open');
  offcanvasOverlay.classList.remove('open');
}
menuOpenBtn.addEventListener('click', openMenu);
menuCloseBtn.addEventListener('click', closeMenu);
offcanvasOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.offcanvas-menu nav a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Back to top
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Sticky header + parallax, batched into one rAF scroll handler
const header = document.getElementById('siteHeader');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const footerEl = document.querySelector('.site-footer');
let ticking = false;

function dockBackToTopAboveFooter() {
  if (!footerEl) return;
  const overlap = window.innerHeight - footerEl.getBoundingClientRect().top;
  if (overlap > -26) {
    backToTop.style.position = 'absolute';
    backToTop.style.top = `${footerEl.offsetTop - 74}px`;
    backToTop.style.bottom = 'auto';
  } else {
    backToTop.style.position = 'fixed';
    backToTop.style.top = 'auto';
    backToTop.style.bottom = '26px';
  }
}

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 500);
  dockBackToTopAboveFooter();
  if (!prefersReducedMotion) {
    // Offset is relative to each layer's own container position in the
    // viewport (not raw page scrollY), so it stays bounded regardless of
    // how far down the page the section sits.
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

// Scroll reveal animations
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
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Animated stat counters (About section)
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
document.querySelectorAll('.about-stat .stat-number').forEach((el) => statObserver.observe(el));

// Generic slider builder — used for the Order Online carousel (multi-item)
function createCarousel({ track, prevBtn, nextBtn, dotsWrap, perView }) {
  const cards = Array.from(track.children);
  const getPerView = () => (window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : window.innerWidth <= 992 ? 3 : perView);
  let index = 0;

  function maxIndex() {
    return Math.max(0, cards.length - getPerView());
  }
  function render() {
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0');
    const step = cards[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${index * step}px)`;
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      const dotCount = maxIndex() + 1;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === index) dot.classList.add('active');
        dot.addEventListener('click', () => { index = i; render(); });
        dotsWrap.appendChild(dot);
      }
    }
  }
  function next() { index = index >= maxIndex() ? 0 : index + 1; render(); }
  function prev() { index = index <= 0 ? maxIndex() : index - 1; render(); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  window.addEventListener('resize', () => { index = Math.min(index, maxIndex()); render(); });
  render();
}

const orderTrack = document.getElementById('orderTrack');
if (orderTrack) {
  createCarousel({
    track: orderTrack,
    prevBtn: document.getElementById('orderPrev'),
    nextBtn: document.getElementById('orderNext'),
    dotsWrap: document.getElementById('orderDots'),
    perView: 4,
  });
}

// Promo fade slider (Weekday Lunch Delight banner)
const promoSlider = document.getElementById('promoSlider');
if (promoSlider) {
  const slides = Array.from(promoSlider.querySelectorAll('.promo-slide'));
  const prevBtn = promoSlider.querySelector('.promo-prev');
  const nextBtn = promoSlider.querySelector('.promo-next');
  let current = 0;
  let timer = null;

  function goTo(i) {
    slides[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function start() { timer = setInterval(next, 7000); }
  function stop() { clearInterval(timer); }

  nextBtn.addEventListener('click', () => { next(); stop(); start(); });
  prevBtn.addEventListener('click', () => { prev(); stop(); start(); });
  promoSlider.addEventListener('mouseenter', stop);
  promoSlider.addEventListener('mouseleave', start);
  start();
}

// Testimonial slider (single-card fade/slide with dots + autoplay + swipe)
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
  function startAutoplay() { autoplayTimer = setInterval(next, 6000); }
  function stopAutoplay() { clearInterval(autoplayTimer); }

  nextBtn.addEventListener('click', () => { next(); stopAutoplay(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); startAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

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

// Reservation form
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  const dateInput = document.getElementById('res-date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  const submitBtn = reservationForm.querySelector('.reservation-submit');
  const successMsg = document.getElementById('reservationSuccess');

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!reservationForm.checkValidity()) {
      reservationForm.reportValidity();
      return;
    }
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successMsg.hidden = false;
      reservationForm.reset();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

// Magnetic buttons + tilt cards — skipped for touch/coarse pointers and reduced-motion preference
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const magnetStrength = 14;
  document.querySelectorAll('.btn-primary, .btn-outline, .btn-outline-light').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      btn.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  document.querySelectorAll('.favorite-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'none';
      card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      card.style.transform = '';
    });
  });
}

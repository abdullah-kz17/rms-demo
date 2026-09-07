// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
function openNav() { navLinks.classList.add('open'); navOverlay.classList.add('open'); }
function closeNav() { navLinks.classList.remove('open'); navOverlay.classList.remove('open'); }
navToggle.addEventListener('click', () => (navLinks.classList.contains('open') ? closeNav() : openNav()));
navOverlay.addEventListener('click', closeNav);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-links a').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    closeNav();
  });
});

// Back to top + bounded parallax, batched into one rAF scroll handler
const backToTop = document.getElementById('backToTop');
const footerEl = document.querySelector('.site-footer');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  backToTop.classList.toggle('visible', window.scrollY > 500);
  dockBackToTopAboveFooter();
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
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => revealObserver.observe(el));

// Animated stat counters
const animateCount = (el) => {
  const raw = el.textContent.trim();
  const target = parseInt(raw, 10);
  if (Number.isNaN(target)) return;
  const suffix = raw.replace(/^[0-9]+/, '');
  const duration = 1300;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('en-US') + suffix;
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
document.querySelectorAll('.stat-number').forEach((el) => statObserver.observe(el));

// Generic slider builder — used for the testimonial carousel
function buildSlider(root) {
  const track = root.querySelector('.testimonial-track');
  const slides = Array.from(track.children);
  const prevBtn = root.querySelector('.slider-prev');
  const nextBtn = root.querySelector('.slider-next');
  const dotsWrap = root.querySelector('.slider-dots');
  let current = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
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

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAutoplay(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); startAutoplay(); });
  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);

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
document.querySelectorAll('.testimonial-slider').forEach((el) => buildSlider(el));

// Play button — visual only, no video source wired up in this demo
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    playBtn.querySelector('i').className = playBtn.querySelector('i').className.includes('fa-play') ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  });
}

// Consultation form — simulated submit, no backend
const consultForm = document.getElementById('consultForm');
if (consultForm) {
  const submitBtn = consultForm.querySelector('.form-submit');
  const successMsg = document.getElementById('consultSuccess');
  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!consultForm.checkValidity()) {
      consultForm.reportValidity();
      return;
    }
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successMsg.hidden = false;
      consultForm.reset();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

// Newsletter form — simulated submit
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const icon = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    newsletterForm.reset();
    setTimeout(() => { btn.innerHTML = icon; }, 2200);
  });
}

// Magnetic buttons + tilt cards — skipped for touch/coarse pointers and reduced-motion preference
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const magnetStrength = 12;
  document.querySelectorAll('.btn-primary, .btn-outline, .btn-outline-light').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      btn.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  document.querySelectorAll('.practice-card, .case-card, .team-media').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'none';
      card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      card.style.transform = '';
    });
  });
}

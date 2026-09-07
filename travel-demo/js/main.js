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

// Hero search — scrolls to packages (no backend to query)
const heroSearch = document.getElementById('heroSearch');
if (heroSearch) {
  heroSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = document.getElementById('packages');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

// Sticky header + back to top + bounded parallax, batched into one rAF scroll handler
const header = document.getElementById('siteHeader');
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
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);
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
  const suffix = raw.replace(/[0-9]/g, '');
  const duration = 1200;
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

// Tilt effect on hover — exposed globally so package.js/tour.js can apply it to
// cards rendered dynamically after this script has run
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function applyTiltEffect(card) {
  if (!canHover) return;
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
}

// Shared package card renderer
function fmtPrice(n) { return n.toLocaleString('en-US'); }
function renderPackageCard(tour, index) {
  const card = document.createElement('a');
  card.href = `tour.html?id=${tour.id}`;
  card.className = `package-card reveal stagger-${(index % 4) + 1}`;
  card.innerHTML = `
    <div class="package-media">
      <img src="${tour.image}" alt="${tour.name}">
      <span class="package-badge">${tour.category}</span>
      <span class="package-duration">${tour.duration} Days</span>
    </div>
    <div class="package-body">
      <div class="package-price">$${fmtPrice(tour.price)}<span>${tour.priceSuffix}</span></div>
      <h3>${tour.name}</h3>
      <p><i class="fa-solid fa-location-dot"></i> ${tour.destination}</p>
      <div class="package-meta"><span><i class="fa-solid fa-star"></i> ${tour.rating} (${tour.reviews})</span><span><i class="fa-solid fa-user-group"></i> ${tour.groupSize}</span></div>
    </div>
  `;
  applyTiltEffect(card);
  revealObserver.observe(card);
  return card;
}
if (typeof TOURS !== 'undefined') {
  const packageGrid = document.getElementById('packageGrid');
  if (packageGrid) {
    TOURS.slice(0, 6).forEach((tour, i) => packageGrid.appendChild(renderPackageCard(tour, i)));
  }
}

// Trip style quiz (wow section)
const QUIZ_RESULTS = {
  Beach: { title: 'Beach & Island Escapes', desc: 'Slow mornings, warm water and very little on the agenda — exactly how a real vacation should feel.', tags: ['Bali Beach Escape', 'Santorini Island Getaway', 'Maldives Overwater Retreat'] },
  Adventure: { title: 'Adventure & Trekking', desc: 'Trails, altitude and views you have to earn — built for travellers who come home a little tired and very happy.', tags: ['Swiss Alps Adventure', 'Machu Picchu Trek'] },
  Culture: { title: 'Culture & Heritage', desc: 'Temples, food markets and living history, paced so you actually get to absorb it.', tags: ['Kyoto Cultural Journey', 'Santorini Island Getaway'] },
  Wildlife: { title: 'Wildlife & Safari', desc: 'Dawn game drives and genuinely dark skies — nature on its own schedule, not yours.', tags: ['Kenya Safari Expedition'] }
};
const quizChips = document.getElementById('quizChips');
const quizResult = document.getElementById('quizResult');
function renderQuizResult(key) {
  const data = QUIZ_RESULTS[key];
  if (!quizResult || !data) return;
  quizResult.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.desc}</p>
    <div class="quiz-tags">${data.tags.map((t) => `<span>${t}</span>`).join('')}</div>
    <a href="#packages" class="btn btn-primary">See Matching Trips <i class="fa-solid fa-arrow-right"></i></a>
  `;
}
if (quizChips) {
  quizChips.querySelectorAll('.quiz-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      quizChips.querySelectorAll('.quiz-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderQuizResult(chip.dataset.style);
    });
  });
  renderQuizResult('Beach');
}

// Plan Your Trip form — simulated submit, no backend
const askForm = document.getElementById('askForm');
if (askForm) {
  const submitBtn = askForm.querySelector('.ask-submit');
  const successMsg = document.getElementById('askSuccess');
  askForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!askForm.checkValidity()) {
      askForm.reportValidity();
      return;
    }
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successMsg.hidden = false;
      askForm.reset();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

// Magnetic buttons — skipped for touch/coarse pointers and reduced-motion preference
if (canHover) {
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
}

document.querySelectorAll('.package-card').forEach((card) => applyTiltEffect(card));
